import { Content } from "../Inicial/styles";
import horse from '../../../assets/img/horse.png';
import { useNavigate } from "react-router-dom";

export const Inicial = () => {
    const navigate = useNavigate();
    return(
        <Content>
            <div>
                <img src={horse} alt="horse" />
                <div>
                    <button onClick={() => navigate('/user')}>Atleta</button>
                    <button onClick={() => navigate('/login')}>Gestor</button>
                </div>
                
            </div>
        </Content>
    )
}