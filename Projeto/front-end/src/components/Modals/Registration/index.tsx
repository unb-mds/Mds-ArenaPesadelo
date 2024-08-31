import { FC, useEffect, useState } from "react";
import { Backdrop, Container } from "./styles";
import { IChampionship, IRegistrationModal, ITeam } from "./interfaces";
import { api } from "../../../services/api";
import { TailSpin } from "react-loader-spinner";
import { Select } from "../../Select";
import { Button } from "../../Button";
import { Link } from "react-router-dom";

export const RegistrationModal: FC<IRegistrationModal> = ({
  championshipId,
  shown,
  onDismiss,
}) => {
  const [teams, setTeams] = useState<ITeam[]>([]);
  const [championship, setChampionship] = useState<IChampionship | null>(null);
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

  console.log({
    teams,
    championship,
  });

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
                  name=""
                  label="Escolha seu time"
                  options={[]}
                />
                <Link to="/new-team">crie seu time clicando aqui!</Link>
              </div>

              <Button>Confirmar</Button>
            </div>
          </div>
        )}
      </Container>

      <Backdrop shown={shown} onClick={onDismiss} />
    </>
  );
};
