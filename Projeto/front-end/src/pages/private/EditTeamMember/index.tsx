import { Link, useNavigate, useParams } from "react-router-dom";
import { Header } from "../../../components/Header";
import { Container, Content, Button } from "./styles";
import { useCallback, useEffect, useMemo, useState } from "react";
import { api } from "../../../services/api";
import { Input } from "../../../components/Input";
import { Controller, useForm } from "react-hook-form";
import { IEditTeamMember, ITeamMember } from "./interfaces";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { IOption } from "../../../components/Select/interfaces";

export const EditTeamMember = () => {
  const editTeamMemberValidation = useMemo(() => {
    return Yup.object().shape({
      name: Yup.string().required("Este campo é obrigatório!"),
      registration: Yup.string().required("Este campo é obrigatório!"),
    });
  }, []);

  const navigate = useNavigate();
  const { teamMemberId } = useParams();
  const editTeamMemberForm = useForm<IEditTeamMember>({
    resolver: yupResolver(editTeamMemberValidation),
  });

  const [teamMember, setTeamMember] = useState<ITeamMember | null>(null);
  const [loading, setLoading] = useState(false);
  const [modalities, setModalities] = useState<IOption[]>([]);

  useEffect(() => {
    async function loadTeamMember() {
      const [
        { data: teamMemberResponse },
        { data: modalitiesResponse },
      ] = await Promise.all([
        await api.get(`/team-members/${teamMemberId}`),
        await api.get(`/constants/modalities`),
      ]);

      editTeamMemberForm.setValue('name', teamMemberResponse.name);
      editTeamMemberForm.setValue('registration', teamMemberResponse.registration);

      setModalities(modalitiesResponse);
      setTeamMember(teamMemberResponse);
    }

    loadTeamMember();
  }, [teamMemberId]);

  console.log(teamMember);

  const handleEditTeamMember = useCallback(async (data: IEditTeamMember) => {
    try {
      setLoading(true);

      await api.put(`/team-members/${teamMemberId}`, data);

      toast('Membro da equipe atualizado com sucesso!', {
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
  }, [navigate, teamMemberId]);

  const teamModality = useMemo(() => {
    if (!teamMember) return '';

    const modality = modalities.find(m => m.value === teamMember.team.modality);

    return modality?.label || 'Desconhecido';
  }, [teamMember, modalities]);

  return (
    <Container>
      <Header shadow />

      <Content>
        <header>
          <h1>GERENCIAMENTO DE EQUIPES</h1>

          <div>
            <Link to="/my-teams">Times</Link>

            <Link to="/new-team">
              Criar novo time
            </Link>

            <Link to={`/team-members/${teamMemberId}`} className="active">
              Editar membro da equipe
            </Link>
          </div>
        </header>

        <main>
          <form onSubmit={editTeamMemberForm.handleSubmit(handleEditTeamMember)}>
              <div>
                <Input
                  name="teamName"
                  id="teamName"
                  label="Time"
                  disabled
                  value={teamMember?.team.name}
                  readOnly
                />

                <Input
                  name="teamModality"
                  id="teamModality"
                  label="Modalidade do time"
                  disabled
                  value={teamModality}
                  readOnly
                />

                <Controller
                  name="name"
                  control={editTeamMemberForm.control}
                  render={({
                    field: { name, onChange, value },
                    fieldState: { error },
                  }) => (
                    <Input
                      label="Nome"
                      name={name}
                      id={name}
                      value={value}
                      onChange={onChange}
                      error={error?.message}
                    />
                  )}
                />

                <Controller
                  name="registration"
                  control={editTeamMemberForm.control}
                  render={({
                    field: { name, onChange, value },
                    fieldState: { error },
                  }) => (
                    <Input
                      label="Matrícula"
                      name={name}
                      id={name}
                      value={value}
                      onChange={onChange}
                      error={error?.message}
                    />
                  )}
                />
              </div>

            <Button type="submit" loading={loading}>Salvar alterações</Button>
          </form>
        </main>
      </Content>
    </Container>
  );
};
