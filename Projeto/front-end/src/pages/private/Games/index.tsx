import { useLocation } from "react-router-dom";
import { Header } from "../../../components/Header";
import { Navigator } from "../../../components/Navigator";
import {
  Container,
  Content,
  Controls,
  Game,
  GameControls,
  GamesContainer,
  GameScore,
  GameTeam,
  NoDataText,
} from "./styles";
import { Select } from "../../../components/Select";
import { IOption } from "../../../components/Select/interfaces";
import { useCallback, useEffect, useState } from "react";
import { api } from "../../../services/api";
import { IChampionship, IGame } from "./interfaces";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";

export const Games = () => {
  const { pathname } = useLocation();

  const [modalities, setModalities] = useState<IOption[]>([]);
  const [championships, setChampionships] = useState<IOption[]>([]);
  const [games, setGames] = useState<IGame[]>([]);
  const [championship, setChampionship] = useState<IChampionship | null>(null);
  const [currentPhase, setCurrentPhase] = useState(1);

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

      const [{ data: games }, { data: championship }] = await Promise.all([
        await api.get(`/games/phases/${value}`, { params: { phase: 1 } }),
        await api.get(`/championships/${value}`),
      ]);

      setGames(games);
      setChampionship(championship);
    },
    []
  );

  const gamePhasesLabel = useCallback(
    (phase: number) => {
      if (!championship) return "";

      const { participants } = championship;
      const games = participants / 2;

      const allLabels = [
        "Final",
        "Semi-final",
        "Quartas de final",
        "Oitavas de final",
      ];
      const possibleLabels: string[] = [];

      for (let i = games; i >= 1; i /= 2) {
        const [label] = allLabels.splice(0, 1);

        possibleLabels.push(label);
      }

      const usefulLabels = possibleLabels.reverse();

      console.log({ usefulLabels });

      return usefulLabels[phase - 1];
    },
    [championship]
  );

  const handleChangeTeamScore = useCallback(
    async (gameId: string, score: number, type: "homeScore" | "visitorScore") => {
      if (score < 0) return;

      const { data: updatedGame } = await api.put(`/games/${gameId}`, {
        [type]: score,
      });

      setGames(oldState => {
        const updatedGames = oldState.map(state => {
          if (state.id === gameId) return updatedGame;

          return state;
        });

        return updatedGames;
      });
    },
    []
  );

  const handleGoToPreviousPhase = useCallback(async () => {
    if (!championship) return;

    const phase = currentPhase - 1;

    if (phase < 1) return;

    const { data: games } = await api.get(
      `/games/phases/${championship.id}`,
      { params: { phase } },
    );

    setGames(games);
    setCurrentPhase(phase);
  }, [currentPhase, championship]);

  const handleGoToNextPhase = useCallback(async () => {
    if (!championship) return;

    const phase = currentPhase + 1;

    const { data: games } = await api.get(
      `/games/phases/${championship.id}`,
      { params: { phase } },
    );

    setGames(games);
    setCurrentPhase(phase);
  }, [currentPhase, championship]);

  return (
    <Container>
      <Header shadow />

      <Content>
        <Navigator
          title="Tabela de jogos"
          active={pathname}
          links={[
            { to: "/games", text: "Jogos" },
            { to: "/create-championship", text: "Novo campeonato" },
            { to: "/manage-championships", text: "Gerenciar campeonatos" },
            { to: `/administration`, text: "Gerenciar permissões" },
          ]}
        />

        <main>
          <header>
            <div>
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
            </div>

            {championship?.name && <h1>{championship?.name}</h1>}
          </header>

          <main>
            {!games.length ? (
              <NoDataText>Não há jogos para este campeonato!</NoDataText>
            ) : (
              <>
                <Controls>
                  <div>
                    <span>{gamePhasesLabel(currentPhase)}</span>
                  </div>

                  <div>
                    <button type="button" onClick={handleGoToPreviousPhase}>
                      <FiChevronLeft
                        color="#BA153F"
                        strokeWidth={3}
                        size={54}
                      />
                    </button>

                    <button type="button" onClick={handleGoToNextPhase}>
                      <FiChevronRight
                        color="#BA153F"
                        strokeWidth={3}
                        size={54}
                      />
                    </button>
                  </div>

                  <div></div>
                </Controls>

                <GamesContainer>
                  {games.map((game) => {
                    const homeWins = game.home_score > game.visitor_score;
                    const visitorWins = game.visitor_score > game.home_score;

                    const gameId = game.id;

                    const homeUpScore = game.home_score + 1;
                    const homeDownScore = game.home_score - 1;

                    const visitorUpScore = game.visitor_score + 1;
                    const visitorDownScore = game.visitor_score - 1;

                    const draw = !homeWins && !visitorWins;

                    return (
                      <Game key={game.id}>
                        <GameTeam winner={draw || homeWins}>
                          <b>{game.host?.name || "TBA"}</b>

                          <div>
                            <span>PONTOS</span>

                            <GameControls>
                              <button
                                type="button"
                                onClick={() =>
                                  handleChangeTeamScore(
                                    gameId,
                                    homeUpScore,
                                    "homeScore"
                                  )
                                }
                              >
                                <FaCaretUp size={24} color="#000" />
                              </button>

                              <button
                                onClick={() =>
                                  handleChangeTeamScore(
                                    gameId,
                                    homeDownScore,
                                    "homeScore"
                                  )
                                }
                                type="button"
                              >
                                <FaCaretDown size={24} color="#000" />
                              </button>
                            </GameControls>

                            <GameScore>
                              <span>{game.home_score}</span>
                            </GameScore>
                          </div>
                        </GameTeam>

                        <span>x</span>

                        <GameTeam winner={draw || visitorWins}>
                          <div>
                            <GameScore>
                              <span>{game.visitor_score}</span>
                            </GameScore>

                            <GameControls>
                              <button
                                onClick={() =>
                                  handleChangeTeamScore(
                                    gameId,
                                    visitorUpScore,
                                    "visitorScore"
                                  )
                                }
                                type="button"
                              >
                                <FaCaretUp size={24} color="#000" />
                              </button>

                              <button
                                onClick={() =>
                                  handleChangeTeamScore(
                                    gameId,
                                    visitorDownScore,
                                    "visitorScore"
                                  )
                                }
                                type="button"
                              >
                                <FaCaretDown size={24} color="#000" />
                              </button>
                            </GameControls>

                            <span>PONTOS</span>
                          </div>

                          <b>{game.visiting?.name || "TBA"}</b>
                        </GameTeam>
                      </Game>
                    );
                  })}
                </GamesContainer>
              </>
            )}
          </main>
        </main>
      </Content>
    </Container>
  );
};
