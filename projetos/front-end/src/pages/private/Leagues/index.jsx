import { Header } from "../../../components/Header";
import { Carousel, Container, Content, Item } from "./styles";
import back from '../../../assets/img/back.png';
import league from '../../../assets/img/campeonatos.png';
import { useNavigate } from "react-router-dom";
import { Button } from "../../../components/Button";

const data = [
  {
    status: 'Ativo',
    title: 'COPA PESA 2024',
    type: 'Futsal Masculino',
    teams: 10,
  },
  {
    status: 'Ativo',
    title: 'COPA PESA 2024',
    type: 'Futsal Masculino',
    teams: 10,
  },
  {
    status: 'Ativo',
    title: 'COPA PESA 2024',
    type: 'Futsal Masculino',
    teams: 10,
  },
  {
    status: 'Ativo',
    title: 'COPA PESA 2024',
    type: 'Futsal Masculino',
    teams: 10,
  },
  {
    status: 'Ativo',
    title: 'COPA PESA 2024',
    type: 'Futsal Masculino',
    teams: 10,
  },
  {
    status: 'Ativo',
    title: 'COPA PESA 2024',
    type: 'Futsal Masculino',
    teams: 10,
  },
  {
    status: 'Ativo',
    title: 'COPA PESA 2024',
    type: 'Futsal Masculino',
    teams: 10,
  },
  {
    status: 'Ativo',
    title: 'COPA PESA 2024',
    type: 'Futsal Masculino',
    teams: 10,
  },
  {
    status: 'Ativo',
    title: 'COPA PESA 2024',
    type: 'Futsal Masculino',
    teams: 10,
  },
]

export const Leagues = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Header />

      <Content>
        <button onClick={() => navigate('/dashboard')}>
          <img src={back} alt="Go back" />
        </button>

        <Carousel>
          {data.map(item => {
            return (
              <Item key={Math.floor(Math.random() * 1E9).toString()}>
                <img src={league} alt="Background" />

                <div>
                  <span>{item.status}</span>

                  <span>{item.title}</span>

                  <span>Modalidade: {item.type}</span>

                  <span>Times: {item.teams}</span>

                  <Button onClick={() => navigate('/league/0')}>Visualizar</Button>
                </div>
              </Item>
            )
          })}
        </Carousel>

        <Button onClick={() => navigate('/create-league')}>Adicionar</Button>
      </Content>
    </Container>
  );
}