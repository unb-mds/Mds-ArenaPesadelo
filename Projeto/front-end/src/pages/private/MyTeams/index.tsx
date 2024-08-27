import { useLocation, useNavigate } from "react-router-dom";
import { Header } from "../../../components/Header";
import { Container, Content, LoaderContainer, Table } from "./styles";
import { Select } from "../../../components/Select";
import { Input } from "../../../components/Input";
import { useCallback, useEffect, useMemo, useState } from "react";
import { IOption } from "../../../components/Select/interfaces";
import { api } from "../../../services/api";
import { SingleValue } from "react-select";
import { IAddTeamMemberForm, ITeam, ITeamMember } from "./interfaces";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { Controller, useForm } from "react-hook-form";
import { FaCirclePlus } from "react-icons/fa6";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { TailSpin } from "react-loader-spinner";
import { Navigator } from "../../../components/Navigator";

export const MyTeams = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const formValidation = useMemo(() => {
    return Yup.object().shape({
      name: Yup.string().required("Campo obrigatório!"),
      registration: Yup.string().required("Campo obrigatório!"),
    });
  }, []);

  const addTeamMemberForm = useForm<IAddTeamMemberForm>({
    resolver: yupResolver(formValidation),
  });

  const [modalities, setModalities] = useState<IOption[]>([]);
  const [teams, setTeams] = useState<ITeam[]>([]);
  const [teamMembers, setTeamMembers] = useState<ITeamMember[]>([]);
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadModalities() {
      const { data } = await api.get("/constants/modalities");

      setModalities(data);
    }

    loadModalities();
  }, []);

  const handleModalitySelection = useCallback(
    async (option: SingleValue<IOption>) => {
      if (!option?.value) return;

      const { data: teams } = await api.get("/teams/leaders/list/filter", {
        params: {
          modality: option.value,
        },
      });

      setTeams(teams);
      setSelectedTeam(null);
      setTeamMembers([]);
    },
    []
  );

  const getTeamMembers = useCallback(async (option: SingleValue<IOption>) => {
    if (!option?.value) return;

    setSelectedTeam(option.value as string);
    setLoading(true);

    const { data: teamMembers } = await api.get(
      `/team-members/teams/${option.value}`
    );

    setTeamMembers(teamMembers);
    setLoading(false);
  }, []);

  const teamsOptions = useMemo(() => {
    return teams.map((team) => ({
      label: team.name,
      value: team.id,
    }));
  }, [teams]);

  const handleDeleteTeamMember = useCallback(async (member: ITeamMember) => {
    const confirmed = confirm(
      `Você quer mesmo remover ${member.name} da sua equipe?`
    );

    if (!confirmed) return;

    await api.delete(`/team-members/${member.id}`);

    setTeamMembers((oldState) =>
      oldState.filter((item) => item.id !== member.id)
    );
    toast(`${member.name} foi removido da sua equipe com sucesso!`, {
      type: "success",
    });
  }, []);

  const tableData = useMemo(() => {
    return teamMembers.map((member) => {
      return (
        <>
          <span>{member.name}</span>

          <span>{member.registration}</span>

          <div>
            <button type="button" onClick={() => navigate(`/team-members/${member.id}`)}>
              <FiEdit size={18} color="#DA1F4F" strokeWidth={2.5} />
            </button>

            <button
              type="button"
              onClick={() => handleDeleteTeamMember(member)}
            >
              <FiTrash2 size={18} color="#DA1F4F" strokeWidth={2.5} />
            </button>
          </div>
        </>
      );
    });
  }, [teamMembers, handleDeleteTeamMember, navigate]);

  const handleAddTeamMember = useCallback(async (data: IAddTeamMemberForm) => {
    try {
      const body = {
        ...data,
        teamId: selectedTeam,
      };

      const { data: addedTeamMember } = await api.post('/team-members', body);

      setTeamMembers(oldState => [...oldState, addedTeamMember]);

      addTeamMemberForm.reset();
    } catch (err: any) {
      console.log(err);

      if (err?.response?.data?.message) {
        toast(err.response.data.message, {
          type: 'error',
        })
      }
    }
  }, [selectedTeam, addTeamMemberForm]);

  return (
    <Container>
      <Header shadow />

      <Content>
        <Navigator
          title="Gerenciamento de equipes"
          active={pathname}
          links={[
            { to: '/my-teams', text: 'Times', },
            { to: '/new-team', text: 'Criar novo time', },
          ]}
        />

        <main>
          <div>
            <Select
              label="Modalidade"
              name="modality"
              options={modalities}
              onChange={handleModalitySelection}
            />

            <strong>Times</strong>

            <Select
              name="teams"
              label=""
              value={!selectedTeam ? null : teamsOptions.find(team => team.value === selectedTeam)}
              placeholder="Selecione o seu time"
              options={teamsOptions}
              onChange={getTeamMembers}
            />
          </div>

          <div>
            <h1>Jogadores</h1>

            <form
              onSubmit={addTeamMemberForm.handleSubmit(handleAddTeamMember)}
            >
              <Controller
                name="name"
                control={addTeamMemberForm.control}
                render={({
                  field: { name, onChange, value },
                  fieldState: { error },
                }) => (
                  <Input
                    name={name}
                    id="teamMemberName"
                    label="Nome"
                    onChange={onChange}
                    value={value}
                    error={error?.message}
                  />
                )}
              />

              <Controller
                name="registration"
                control={addTeamMemberForm.control}
                render={({
                  field: { name, onChange, value },
                  fieldState: { error },
                }) => (
                  <Input
                    name={name}
                    id="teamMemberRegistration"
                    label="Matrícula"
                    onChange={onChange}
                    value={value}
                    error={error?.message}
                  />
                )}
              />

              <button
                type="submit"
                disabled={!selectedTeam}
                title={!selectedTeam ? 'Selecione um time primeiro!' : ''}
              >
                <FaCirclePlus size={18} color="#DA1F4F" />
              </button>
            </form>

            {loading ? (
              <LoaderContainer>
                <TailSpin width={24} height={24} color="#DA1F4F" />
              </LoaderContainer>
            ) : (
              <Table data={tableData} />
            )}
          </div>
        </main>
      </Content>
    </Container>
  );
};
