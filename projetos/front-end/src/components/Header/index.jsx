import { Link } from "react-router-dom"
import { Container } from "./styles"
import { FiMenu } from 'react-icons/fi';
import { IoLogOut, IoCall, IoHelpCircle  } from 'react-icons/io5';

import logo from '../../assets/img/logo-horse.png';
import { Dropdown } from "../Dropdown";
import { useMemo } from "react";
import useAuth from "../../hooks/useAuth";

export const Header = () => {
  const { logout } = useAuth();

  const dropdownOptions = useMemo(() => {
    return [
      {
        icon: <IoCall size={30} color="#D92856" />,
        text: 'Contato',
        action: () => console.log('Contact...'),
      },
      {
        icon: <IoHelpCircle size={30} color="#D92856" />,
        text: 'Problemas',
        action: () => console.log('Problems?'),
      },
      {
        icon: <IoLogOut size={30} color="#D92856" />,
        text: 'Sair',
        action: logout,
      },
    ];
  }, [logout]);

  return (
    <Container>
      <Link to="/dashboard">
        <img src={logo} alt="Logo" />
      </Link>

      <Dropdown options={dropdownOptions}>
        <FiMenu size={24} color="#fff" />
      </Dropdown>
    </Container>
  )
}