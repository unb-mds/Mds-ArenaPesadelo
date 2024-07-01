import { useNavigate } from "react-router-dom";
import { Header } from "../../../components/Header";
import { Container, Content, Status, Table } from "./styles";
import back from '../../../assets/img/back.png';
import league from '../../../assets/img/copa.png';
import Hierarchy from '../../../assets/img/Hierarchy.png';
import { Button } from "../../../components/Button";

export const League = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Header />

      <Content>
        <button onClick={() => navigate('/dashboard')}>
          <img src={back} alt="Go back" />
        </button>

        <div>
          <header>
            <img src={league} alt="Foto" />

            <div>
              <h1>COPA PESA 2024</h1>

              <Status active>
                <span>Status: </span>
                <span>Ativo</span>
              </Status>

              <p>Modalidade: Futsal Masculino</p>

              <p>Times: 10</p>

              <div>
                <span>Início: 10/06/2024</span>

                <span>Fim: 20/06/2024 </span>
              </div>
            </div>
          </header>

          <main>
            <div>
              <strong>Times incritos</strong>

              <button>
                <img src={Hierarchy} alt="Hierarchy" />
              </button>
            </div>

            <Table>
              <div className="row heading">
                <div className="column"><span>Nome</span></div>
                <div className="column"><span>ID</span></div>
                <div className="column"><span>Nº de Jogadores</span></div>
                <div className="column"><span>Status</span></div>
              </div>

              <div className="row">
                <div className="column"><span>Pesadelo</span></div>
                <div className="column"><span>001</span></div>
                <div className="column"><span>10</span></div>
                <div className="column"><span>Pago</span></div>
              </div>

              <div className="row">
                <div className="column"><span>Pesadelo</span></div>
                <div className="column"><span>001</span></div>
                <div className="column"><span>10</span></div>
                <div className="column"><span>Pago</span></div>
              </div>

              <div className="row">
                <div className="column"><span>Pesadelo</span></div>
                <div className="column"><span>001</span></div>
                <div className="column"><span>10</span></div>
                <div className="column"><span>Pago</span></div>
              </div>

              <div className="row">
                <div className="column"><span>Pesadelo</span></div>
                <div className="column"><span>001</span></div>
                <div className="column"><span>10</span></div>
                <div className="column"><span>Pago</span></div>
              </div>

              <div className="row">
                <div className="column"><span>Pesadelo</span></div>
                <div className="column"><span>001</span></div>
                <div className="column"><span>10</span></div>
                <div className="column"><span>Pago</span></div>
              </div>
            </Table>
          </main>

          <footer>
            <Button>Finalizar</Button>
          </footer>
        </div>
      </Content>
    </Container>
  );
}