import { Link } from "react-router-dom";
import { Header } from "../../../components/Header";
import { Container, Content, Table} from "./styles";
import { Select } from "../../../components/Select";
import { useCallback, useEffect, useMemo, useState } from "react";
import { IOption } from "../../../components/Select/interfaces";
import { api } from "../../../services/api";
import { SingleValue } from "react-select";
import { ITeam, ITeamMember } from "./interfaces";

export const MyTeams = () => {
  const [modalities, setModalities] = useState<IOption[]>([]);
  const [teams, setTeams] = useState<ITeam[]>([]);
  const [teamMembers, setTeamMembers] = useState<ITeamMember[]>([]);

  useEffect(() => {
    async function loadModalities() {
      const { data } = await api.get('/constants/modalities');

      setModalities(data);
    }

    loadModalities();
  }, []);

  const handleModalitySelection = useCallback(async (option: SingleValue<IOption>) => {
    if (!option?.value) return;

    const { data: teams } = await api.get('/teams/leaders/list/filter', {
      params: {
        modality: option.value,
      }
    });

    setTeams(teams);
  }, []);

  const getTeamMembers = useCallback(async (option: SingleValue<IOption>) => {
    if (!option?.value) return;

    // const { data: teamMembers } = await api.get('/teams/leaders/list/filter', {
    //   params: {
    //     modality: option.value,
    //   }
    // });

    const teamMembers: ITeamMember[] = [];

    setTeamMembers(teamMembers);
  }, []);

  const teamsOptions = useMemo(() => {
    return teams.map(team => ({
      label: team.name,
      value: team.id,
    }))
  }, [teams]);

  const tableData = useMemo(() => {
    return teamMembers.map(() => <div />);
  }, [teamMembers]);

  return (
    <Container>
      <Header shadow />

      <Content>
        <header>
          <h1>GERENCIAMENTO DE EQUIPES</h1>

          <div>
            <Link to="/my-teams" className="active">Times</Link>

            <Link to="/new-team">Criar novo time</Link>
          </div>
        </header>

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
              placeholder="Selecione o seu time"
              options={teamsOptions}
              onChange={getTeamMembers}
            />
          </div>

          <div>
            <h1>Jogadores</h1>

            <Table data={tableData} />
          </div>
        </main>
      </Content>
    </Container>
  );
}
