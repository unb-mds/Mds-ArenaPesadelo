import { useCallback, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { Container, Content } from "./styles";
import { IoPersonCircle, IoPersonSharp } from "react-icons/io5";
import { MdManageAccounts, MdLogout, MdOutlineSettings } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { UserAccess } from "../../../utils/enums";

export const Dropdown = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [visible, setVisible] = useState(false);

  const handleShowModalContent = useCallback(() => {
    setVisible(oldState => !oldState);
  }, []);

  return (
    <Container>
      <button onClick={handleShowModalContent}>
        <IoPersonSharp size={20} color="#DA1F4F" />
      </button>

      {visible && (
        <Content>
          <header>
            <IoPersonCircle size={40} color="#fff" />

            <strong>{user?.full_name.split(" ")[0]}</strong>
          </header>

          <main>
            {user?.access === UserAccess.ADMIN && (
              <button type="button" onClick={() => navigate('/management')}>
                <MdManageAccounts color="#fff" size={24} />
                Gerenciar
              </button>
            )}

            <button type="button" onClick={() => navigate('/me')}>
              <MdOutlineSettings color="#fff" size={24} />
              Configuração
            </button>

            <button type="button" onClick={logout}>
              <MdLogout color="#fff" size={24} />
              Sair
            </button>
          </main>
        </Content>
      )}
    </Container>
  );
};
