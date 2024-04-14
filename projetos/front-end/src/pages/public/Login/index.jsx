import { Button } from "../../../components/Button";
import { Card, Container } from './styles'
import logo from '../../../assets/img/logo.png';
import { Input } from "../../../components/Input";
import { useCallback } from "react";
import getFormFields from "../../../utils/getFormFields";
import { FiMail, FiLock } from 'react-icons/fi';
import useAuth from "../../../hooks/useAuth";

export const Login = () => {
  const { login } = useAuth();

  const handleFormSubmit = useCallback(async event => {
    event.preventDefault();

    const formData = getFormFields(event);

    await login(formData.email, formData.password);
  }, [login]);

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
            />

            <Input
              name="password"
              type="password"
              required
              icon={FiLock}
              placeholder="Password"
            />

            <Button type="submit">Login</Button>
          </form>
        </Card>
      </div>
    </Container>
  );
}