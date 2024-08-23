import { useLocation, useNavigate } from "react-router-dom";
import { Header } from "../../../components/Header";
import { Container, Content, Button, Table } from "./styles";
import { ImagePicker } from "../../../components/ImagePicker";
import { useCallback, useEffect, useMemo, useState } from "react";
import { IOption } from "../../../components/Select/interfaces";
import { api } from "../../../services/api";
import { Select } from "../../../components/Select";
import { Input } from "../../../components/Input";
import { FiTrash2 } from "react-icons/fi";
import { FaCirclePlus } from "react-icons/fa6";
import useAuth from "../../../hooks/useAuth";
import { Controller, useForm } from "react-hook-form";
import { INewTeamForm, ITeamMember, ITeamMemberForm } from "./interfaces";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { v4 } from "uuid";
import { toast } from "react-toastify";
import { Navigator } from "../../../components/Navigator";

export const CreateNewTeam = () => {
  const { pathname } = useLocation();

  const validateTeamMemberInfo = useCallback(async (data: ITeamMember) => {
    const shape = Yup.object().shape({
      name: Yup.string().required("Este campo é obrigatório!"),
      registration: Yup.string().required("Este campo é obrigatório!"),
    });

    await shape.validate(data, {
      abortEarly: false,
    });
  }, []);

  const newTeamFormValidation = useMemo(() => {
    return Yup.object().shape({
      name: Yup.string().required("Este campo é obrigatório!"),
      modality: Yup.number()
        .required("Este campo é obrigatório!")
        .typeError("Opção inválida!"),
    });
  }, []);

  const navigate = useNavigate();
  const { user } = useAuth();
  const teamMemberForm = useForm<ITeamMemberForm>();
  const newTeamForm = useForm<INewTeamForm>({
    resolver: yupResolver(newTeamFormValidation),
  });

  const [image, setImage] = useState<File | null>(null);
  const [modalities, setModalities] = useState<IOption[]>([]);
  const [teamMembers, setTeamMembers] = useState<ITeamMember[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadModalities() {
      const { data } = await api.get("/constants/modalities");

      setModalities(data);
    }

    loadModalities();
  }, []);

  const handlePickImage = useCallback(async (file: File | null) => {
    if (!file) return;

    setImage(file);
  }, []);

  const handleAddTeamMember = useCallback(
    async () => {
      try {
        const data = teamMemberForm.getValues();

        const teamMember = {
          id: v4(),
          name: data.name,
          registration: data.registration,
        };

        await validateTeamMemberInfo(teamMember);

        setTeamMembers((oldState) => [...oldState, teamMember]);

        teamMemberForm.reset();
      } catch (err) {
        console.log(err);

        if (err instanceof Yup.ValidationError) {
          err.inner.forEach((error) => {
            const { path, message } = error;

            teamMemberForm.setError(path as any, { message });
          });
        }
      }
    },
    [teamMemberForm, validateTeamMemberInfo]
  );

  const tableData = useMemo(() => {
    return teamMembers.map((member) => {
      return (
        <>
          <span>{member.name}</span>

          <span>{member.registration}</span>

          <div>
            <button
              type="button"
              onClick={() =>
                setTeamMembers((oldState) =>
                  oldState.filter((item) => item.id !== member.id)
                )
              }
            >
              <FiTrash2 size={18} color="#DA1F4F" strokeWidth={2.5} />
            </button>
          </div>
        </>
      );
    });
  }, [teamMembers]);

  const handleCreateNewTeam = useCallback(async (data: INewTeamForm) => {
    try {
      setLoading(true);

      const formData = new FormData();

      if (image) formData.append('image', image);

      formData.append('name', data.name);
      formData.append('modality', data.modality.toString());

      const { data: createdTeam } = await api.post("/teams", formData);

      await Promise.all(teamMembers.map(async member => {
        await api.post('/team-members', {
          name: member.name,
          registration: member.registration,
          teamId: createdTeam.id,
        });
      }));

      toast('Time criado com sucesso!', {
        type: 'success',
      });

      navigate('/my-teams');
    } catch (err: any) {
      if (err?.response?.data?.message) {
        toast(err?.response?.data?.message, {
          type: "error",
        });
      }
    } finally {
      setLoading(false);
    }
  }, [image, navigate, teamMembers]);

  return (
    <Container>
      <Header shadow />

      <Content>
        <Navigator
          title="Criar novo time"
          active={pathname}
          links={[
            { to: '/my-teams', text: 'Times', },
            { to: '/new-team', text: 'Criar novo time', },
          ]}
        />

        <main>
          <form onSubmit={newTeamForm.handleSubmit(handleCreateNewTeam)}>
            <div>
              <ImagePicker onPick={handlePickImage} />

              <div>
                <Controller
                  name="name"
                  control={newTeamForm.control}
                  render={({
                    field: { name, onChange, value },
                    fieldState: { error },
                  }) => (
                    <Input
                      label="Nome do time"
                      name={name}
                      id={name}
                      value={value}
                      onChange={onChange}
                      error={error?.message}
                    />
                  )}
                />

                <Controller
                  name="modality"
                  control={newTeamForm.control}
                  render={({
                    field: { name, onChange },
                    fieldState: { error },
                  }) => (
                    <Select
                      label="Modalidade"
                      name={name}
                      options={modalities}
                      error={error?.message}
                      onChange={(option) => {
                        onChange({ target: { value: option?.value || "" } });
                      }}
                    />
                  )}
                />

                <Input
                  name="leaderName"
                  id="leaderName"
                  label="Líder do time"
                  disabled
                  value={`${user?.full_name} (você)`}
                  readOnly
                />

                <Input
                  name="leaderEmail"
                  id="leaderEmail"
                  label="E-mail do líder"
                  disabled
                  value={`${user?.email} (seu e-mail)`}
                  readOnly
                />
              </div>
            </div>

            <div>
              <h1>Adicionar membros</h1>

              <div>
                <Controller
                  name="name"
                  control={teamMemberForm.control}
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
                  control={teamMemberForm.control}
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

                <button type="button" onClick={handleAddTeamMember}>
                  <FaCirclePlus size={18} color="#DA1F4F" />
                </button>
              </div>

              <Table data={tableData} />

              <Button loading={loading}>Criar novo time</Button>
            </div>
          </form>
        </main>
      </Content>
    </Container>
  );
};
