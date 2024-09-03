import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/img/logo.png";
import { Container, Content } from "./styles";
import { FC } from "react";
import useAuth from "../../hooks/useAuth";
import { Dropdown } from "./Dropdown";

interface IHeader {
  shadow?: boolean;
}

export const Header: FC<IHeader> = ({ shadow = false }) => {
  const { toggleLoginModal, user } = useAuth();
  const navigate = useNavigate();

  return (
    <Container shadow={shadow}>
      <Content>
        <div>
          <img src={logo} alt="Logo" />
        </div>

        <ul>
          <li>
            <Link to="/home">TABELA</Link>
          </li>
          <li>
            <Link to="/championships">CAMPEONATOS PARA INSCRIÇÃO</Link>
          </li>
        </ul>

        <div>
          {user ? (
            <Dropdown />
          ) : (
            <>
              <button className="login" onClick={toggleLoginModal}>
                Login
              </button>

              <button className="sign-up" onClick={() => navigate("/sign-up")}>
                CADASTRE-SE
              </button>
            </>
          )}
        </div>
      </Content>
    </Container>
  );
};
