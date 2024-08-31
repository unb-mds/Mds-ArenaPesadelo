import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { Backdrop, Container } from "./styles";
import { IChampionship, IRegistrationModal, ITeam } from "./interfaces";
import { api } from "../../../services/api";
import { TailSpin } from "react-loader-spinner";
import { Select } from "../../Select";
import { Button } from "../../Button";
import { Link } from "react-router-dom";
import { IOption } from "../../Select/interfaces";
import { toast } from "react-toastify";

export const RegistrationModal: FC<IRegistrationModal> = ({
  championshipId,
  shown,
  onDismiss,
}) => {
  const [teams, setTeams] = useState<ITeam[]>([]);
  const [championship, setChampionship] = useState<IChampionship | null>(null);
  const [chosenTeam, setChosenTeam] = useState('');

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(false);

    async function loadChampionship() {
      const { data: loadedChampionship } = await api.get(
        `/championships/${championshipId}`
      );
      const { data: loadedTeams } = await api.get(
        `/teams/leaders/list/filter`,
        {
          params: { modality: loadedChampionship.modality },
        }
      );

      setTeams(loadedTeams);
      setChampionship(loadedChampionship);
      setLoaded(true);
    }

    const timer = setTimeout(() => loadChampionship(), 1500);

    return () => clearInterval(timer);
  }, [championshipId]);

  const teamsOptions = useMemo(() => {
    if (!teams?.length) return [];

    return teams.map(team => ({ label: team.name, value: team.id }));
  }, [teams]);

  const handleChooseTeam = useCallback((option: IOption | null) => {
    if (!option?.value) return;

    const { value } = option;

    setChosenTeam(value as string);
  }, []);

  const handleRegistration = useCallback(async () => {
    try {
      if (!chosenTeam) {
        toast('Selecione um time!', {
          type: 'info',
        });
        return;
      }

      if (!championship) return;

      await api.post(`/championship-registrations`, {
        teamId: chosenTeam,
        championshipId: championship.id,
      });

      toast('Seu time foi inscrito com sucesso!', {
        type: 'success',
      });

      onDismiss();
    } catch (err: any) {
      console.log(err);

      if (err?.response?.data?.message) {
        toast(err?.response?.data?.message, {
          type: 'error',
        });
      }
    }
  }, [chosenTeam, championship, onDismiss]);

  return (
    <>
      <Container loaded={loaded} shown={shown}>
        {!loaded ? (
          <TailSpin width={24} height={24} color="#fff" strokeWidth={2} />
        ) : (
          <div className="content">
            <h1>{championship?.name}</h1>

            <div>
              <div>
                <Select
                  name="team"
                  label="Escolha seu time"
                  options={teamsOptions}
                  onChange={handleChooseTeam}
                />
                <Link to="/new-team">crie seu time clicando aqui!</Link>
              </div>

              <Button onClick={handleRegistration}>Confirmar</Button>
            </div>
          </div>
        )}
      </Container>

      <Backdrop shown={shown} onClick={onDismiss} />
    </>
  );
};
