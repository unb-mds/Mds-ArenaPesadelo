import { useEffect, useState } from "react";
import { Header } from "../../../components/Header";
import { Championship, ChampionshipInfo, ChampionshipParticipants, Container, Content } from "./styles";
import { api } from "../../../services/api";
import { Button } from "../../../components/Button";
import { IChampionship } from "./interfaces";
import parseToBSBTime from "../../../utils/parseToBSBTime";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export const Championships = () => {
  const [championships, setChampionships] = useState<IChampionship[]>([]);

  useEffect(() => {
    async function loadChampionships() {
      const { data } = await api.get('/championships/upcoming');

      setChampionships(data);
    }

    loadChampionships();
  }, []);

  console.log(championships);

  return (
    <Container>
      <Header shadow />

      <Content>
        <h1>CAMPEONATOS ABERTOS PARA INSCRIÇÃO</h1>

        <div>
          {championships.map((championship) => {
            const dateStart = format(
              parseToBSBTime(Number(championship.date_start)),
              "dd 'de' LLLL yyyy",
              { locale: ptBR }
            );
            const hourStart = format(
              parseToBSBTime(Number(championship.date_start)),
              "HH:mm 'horas'",
            );

            return (
              <Championship>
                <header>
                  {championship.photo_url ? <img src={championship.photo_url} alt="" /> : null}
                </header>

                <main>
                  <h1>{championship.name}</h1>

                  <ChampionshipInfo>
                    <div>
                      <span>LOCAL:</span>
                      <span>{championship.location}</span>
                    </div>

                    <div>
                      <span>DATA:</span>
                      <span>{dateStart}</span>
                    </div>

                    <div>
                      <span>HORA:</span>
                      <span>{hourStart}</span>
                    </div>
                  </ChampionshipInfo>

                  <ChampionshipParticipants>
                    <span>Vagas restantes:</span>
                    <span>{championship.participants}</span>
                  </ChampionshipParticipants>

                  <p>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Omnis magni adipisci, minus possimus doloremque distinctio, sed ipsam magnam delectus perferendis nobis quasi cumque laboriosam fugit voluptatum impedit, deleniti neque veniam!
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Mollitia aut in, odit quam sequi porro natus laboriosam modi labore excepturi est laborum dolore corporis harum eum. Repudiandae modi nihil delectus.
                  </p>
                </main>

                <footer>
                  <Button>INSCREVA - SE</Button>
                </footer>
              </Championship>
            )
          })}
        </div>
      </Content>
    </Container>
  );
}
