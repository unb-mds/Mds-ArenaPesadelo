import { Header } from "../../../components/Header";
import { Container, Content } from "./styles";
import calculator from '../../../assets/img/calculator.png';
import calendar from '../../../assets/img/calendar.png';
import cart from '../../../assets/img/cart.png';
import people from '../../../assets/img/people.png';
import sportsShirts from '../../../assets/img/sports-shirts.png';
import trophy from '../../../assets/img/trophy.png';
import { useNavigate } from "react-router-dom";

export const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Header />

      <Content>
        <div>
          <div>
            <button onClick={() => navigate('/dashboard')}>
              <img src={people} alt="Associados" />

              <h1>Associados</h1>

              <p>
                Registro e controle de
                associados
              </p>
            </button>

            <button onClick={() => navigate('/dashboard')}>
              <img src={calculator} alt="Vendas" />

              <h1>Vendas</h1>

              <p>
                Registro e controle de
                venda
              </p>
            </button>

            <button onClick={() => navigate('/dashboard')}>
              <img src={cart} alt="Estoque" />

              <h1>Estoque</h1>

              <p>
                Registro e controle de
                estoque
              </p>
            </button>
          </div>

          <div>
            <button onClick={() => navigate('/leagues')}>
              <img src={trophy} alt="Campeonatos" />

              <h1>Campeonatos</h1>

              <p>
                Organização e controle de
                campeonato.
              </p>
            </button>

            <button onClick={() => navigate('/dashboard')}>
              <img src={calendar} alt="Eventos" />

              <h1>Eventos</h1>

              <p>
                Organização e controle de
                eventos e datas.
              </p>
            </button>

            <button onClick={() => navigate('/dashboard')}>
              <img src={sportsShirts} alt="Esporte" />

              <h1>Esporte</h1>

              <p>
                Organização e controle de
                times.
              </p>
            </button>
          </div>
        </div>
      </Content>
    </Container>
  )
}