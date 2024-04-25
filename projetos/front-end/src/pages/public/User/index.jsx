import { Header } from "../../../components/Header";
import { Container, Content } from "./styles";
import players from '../../../assets/img/players.png';
import switching from '../../../assets/img/switching.png';
import time from '../../../assets/img/time.png';
import { useNavigate } from "react-router-dom";

export const User = () =>{
    const navigate = useNavigate();

    return (
        <Container>
            <Header />

            <Content>
                <div>
                    <div>
                        <button onClick={() => navigate('/user')}>
                            <img src={players} alt="Jogadores" />

                            <h1>Jogadores</h1>

                            <p>
                            Registro e controle de 
                            times e jogadores
                            </p>
                        </button>
                        <button onClick={() => navigate('/user')}>
                            <img src={switching} alt="Chaveamento" />

                            <h1>Chaveamento</h1>

                            <p>
                            Chaveamento de jogos
                            </p>
                        </button>
                        <button onClick={() => navigate('/user')}>
                            <img src={time} alt="horario" />

                            <h1>Horario</h1>

                            <p>
                            Horário dos jogos
                            </p>
                        </button>
                    </div>
                </div>
            </Content>
        </Container>
    )
}
