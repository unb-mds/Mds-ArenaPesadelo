import { Button } from "../../../components/Button";
import { Card, Container } from './styles';
import logo from '../../../assets/img/logo.png';
import { Input } from "../../../components/Input";
import { useCallback, useState } from "react";
import getFormFields from "../../../utils/getFormFields";
import { FiMail, FiLock } from 'react-icons/fi';
import useAuth from "../../../hooks/useAuth";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [user, setUser] = useState(null);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleFormSubmit = useCallback(async event => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/api/login',
        { email, password },
        {
          headers: { 'Content-Type': 'application/json' }
        }
      );
      console.log(response.data);
      setUser(response.data);

      if (response.status === 200) {
        // Chamar a função login do contexto de autenticação
        await login(email, password);

        // Redirecionar para o dashboard após login bem-sucedido
        navigate('/dashboard');
      } else {
        setError('Erro ao acessar o servidor');
      }

    } catch (error) {
      if (error?.response) {
        console.log(error.response);
        if (error.response.status === 401) {
          setError('Usuário ou senha inválidos');
        } else {
          setError('Erro ao acessar o servidor');
        }
      } else {
        console.log(error);
        setError('Erro desconhecido');
      }
    }

  }, [login, email, password, navigate]);

  return (
    <Container>
      <img src={logo} alt="Logo" />
      <div>
        <span>Login</span>
        <Card>
          <form onSubmit={handleFormSubmit}>
            <Input
              name="email"
              type="email"
              required
              icon={FiMail}
              placeholder="E-mail"
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input
              name="password"
              type="password"
              required
              icon={FiLock}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button type="submit">Login</Button>
          </form>
          <p>{error}</p>
        </Card>
      </div>
    </Container>
  );
}
