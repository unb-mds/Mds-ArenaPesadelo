import { useCallback, useEffect, useMemo, useState } from "react";
import { Header } from "../../../components/Header";
import { Select } from "../../../components/Select";
import { Container, Content, Game, Games, NoDataText, Wrapper } from "./styles";
import { IChampionship, IGame, IResult } from "./interfaces";
import { IOption } from "../../../components/Select/interfaces";
import { api } from "../../../services/api";
import DataTable, { TableColumn } from "react-data-table-component";

export const Home = () => {
  const [results, setResults] = useState<IResult[]>([]);
  const [modalities, setModalities] = useState<IOption[]>([]);
  const [championships, setChampionships] = useState<IOption[]>([]);
  const [games, setGames] = useState<IGame[]>([]);
  const [championship, setChampionship] = useState<IChampionship | null>(null);

  useEffect(() => {
    const body = document.getElementsByTagName("body")[0];

    if (!body) return;

    body.style.overflow = "hidden";
  }, []);

  useEffect(() => {
    async function loadModality() {
      const { data: modalities } = await api.get(`/constants/modalities`);

      setModalities(modalities);
    }

    loadModality();
  }, []);

  const handleModalitySelectChange = useCallback(
    async (option: IOption | null) => {
      if (!option?.value) return;

      const { value } = option;

      const { data: championships } = await api.get<IChampionship[]>(
        `/championships/modality/${value}`
      );

      const options = championships.map((championship) => ({
        value: championship.id,
        label: championship.name,
      }));

      setChampionships(options);
    },
    []
  );

  const handleChampionshipSelectChange = useCallback(
    async (option: IOption | null) => {
      if (!option?.value) return;

      const { value } = option;

      const [{ data: results }, { data: games }, { data: championship }] =
        await Promise.all([
          await api.get(`/games/results/${value}`),
          await api.get(`/games/${value}`),
          await api.get(`/championships/${value}`),
        ]);

      setResults(results);
      setGames(games);
      setChampionship(championship);
    },
    []
  );

  const gamePhasesLabel = useCallback(
    (phase: number) => {
      if (!championship) return "";

      const { participants } = championship;
      const phases = participants / 2;

      const allLabels = [
        "Oitavas de final",
        "Quartas de final",
        "Semi-final",
        "Final",
      ];

      const possibleLabels = allLabels.splice(phases);

      console.log(possibleLabels);

      return possibleLabels[phase - 1];
    },
    [championship]
  );

  const championshipDate = useMemo(() => {
    if (!championship?.date) return "TBA";

    return championship.date.split("-").reverse().join("/");
  }, [championship]);

  const tableColumns = useMemo<TableColumn<IResult>[]>(() => {
    return [
      {
        name: "Classificação",
        selector: (row) => row.rank,
      },
      {
        name: "Times",
        selector: (row) => row.team_name,
      },
      {
        name: "vitória",
        selector: (row) => row.wins,
      },
      {
        name: "derrota",
        selector: (row) => row.losses,
      },
      {
        name: "empate",
        selector: (row) => row.draws,
      },
      {
        name: "pontos",
        selector: (row) => row.points,
      },
    ];
  }, []);

  return (
    <Container>
      <Header />

      <Wrapper>
        <Content>
          <header>
            <h1>Tabela</h1>

            <Select
              label="Modalidade"
              name="modality"
              options={modalities}
              onChange={handleModalitySelectChange}
            />

            <Select
              label="Campeonato"
              name="championship"
              options={championships}
              onChange={handleChampionshipSelectChange}
            />
          </header>

          <main>
            <DataTable
              data={results}
              columns={tableColumns}
              dense
              striped
              noDataComponent={
                <NoDataText>
                  {championship
                    ? `Ainda não há dados de resultados para este campeonato`
                    : "Selecione um campeonato para buscar seus resultados"}
                </NoDataText>
              }
            />
          </main>
        </Content>

        <Games>
          <header>
            <h1>Jogos</h1>
          </header>

          <main>
            {games.map((game) => (
              <Game>
                <header>
                  <span>{gamePhasesLabel(game.phase)}</span>
                </header>

                <main>
                  <span>{championship?.location}</span>

                  <span>{championshipDate}</span>

                  <span>{championship?.from}</span>
                </main>

                <footer>
                  <span>{game.host?.name || "TBA"}</span>

                  <div>
                    <b>{game.home_score}</b>
                    <span>x</span>
                    <b>{game.visitor_score}</b>
                  </div>

                  <span>{game.visiting?.name || "TBA"}</span>
                </footer>
              </Game>
            ))}
          </main>
        </Games>
      </Wrapper>
    </Container>
  );
};
