import { Input } from "../Input";
import { Backdrop, Container, Form } from "./styles";
import logo from "../../assets/img/logo-2.png";
import useAuth from "../../hooks/useAuth";
import { useCallback, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { IForm } from "./interfaces";
import * as Yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";

export const LoginModal = () => {
  const validation = useMemo(() => {
    return Yup.object().shape({
      email: Yup.string().required('Insira seu email!').email('Insira um email válido!'),
      password: Yup.string().required('Insira sua senha!')
    });
  }, []);

  const { control, handleSubmit } = useForm<IForm>({
    resolver: yupResolver(validation)
  });
  const { toggleLoginModal, showLoginModal, login } = useAuth();

  const handleLogin = useCallback(async (credentials: IForm) => {
    try {
      await login(credentials);

      toggleLoginModal();
    } catch (err: any) {
      if (err?.response?.data?.message) {
        toast(err?.response?.data?.message, {
          type: 'error',
        });
      }
    }
  }, [login, toggleLoginModal]);

  return (
    <>
      <Backdrop onClick={toggleLoginModal} visible={showLoginModal} />

      <Container visible={showLoginModal}>
        <Form onSubmit={handleSubmit(handleLogin)}>
          <h1>Login</h1>

          <Controller
            control={control}
            name="email"
            render={({ field: { name, onChange, value }, fieldState: { error } }) => (
              <Input
                name={name}
                label="Email"
                id="loginEmail"
                type="email"
                onChange={onChange}
                error={error?.message}
                value={value}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field: { name, onChange, value }, fieldState: { error } }) => (
              <Input
                name={name}
                label="Senha"
                id="loginPassword"
                type="password"
                style={{ marginTop: 45 }}
                onChange={onChange}
                error={error?.message}
                value={value}
              />
            )}
          />

          <button type="submit">Entrar</button>
        </Form>

        <img src={logo} alt="Logo" />
      </Container>
    </>
  );
};
