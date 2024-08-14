import { useCallback, useMemo } from "react";
import { Header } from "../../../components/Header";
import { Input } from "../../../components/Input";
import { Container, Content, Form } from "./styles";
import { Controller, useForm } from "react-hook-form";
import { IForm } from "./interfaces";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "../../../components/Button";
import { toast } from "react-toastify";
import { api } from "../../../services/api";

export const SingUp = () => {
  const validation = useMemo(() => {
    return Yup.object().shape({
      fullName: Yup.string().required("Este campo é obrigatório!"),
      email: Yup.string()
        .required("Este campo é obrigatório!")
        .email("Insira um email válido!"),
      password: Yup.string().required("Este campo é obrigatório!"),
      confirmPassword: Yup.string()
        .required("Este campo é obrigatório!")
        .oneOf([Yup.ref("password")], "As senhas não coincidem!"),
      registration: Yup.string().required("Este campo é obrigatório!"),
    });
  }, []);

  const { control, handleSubmit, reset } = useForm<IForm>({
    resolver: yupResolver(validation),
  });

  const handleSignUp = useCallback(
    async (data: IForm) => {
      try {
        await api.post(`/users`, {
          fullName: data.fullName,
          email: data.email,
          password: data.password,
          registration: data.registration,
        });

        toast("Dados cadastrados com sucesso!", {
          type: "success",
        });

        reset();
      } catch (err: any) {
        if (err?.response?.data?.message) {
          toast(err?.response?.data?.message, {
            type: "error",
          });
        }
      }
    },
    [reset]
  );

  return (
    <Container>
      <Header shadow />

      <Content>
        <Form onSubmit={handleSubmit(handleSignUp)}>
          <h1>Crie sua conta</h1>

          <Controller
            control={control}
            name="fullName"
            render={({
              field: { name, onChange, value },
              fieldState: { error },
            }) => (
              <Input
                name={name}
                label="Nome completo"
                id="fullName"
                onChange={onChange}
                error={error?.message}
                value={value}
              />
            )}
          />

          <Controller
            control={control}
            name="email"
            render={({
              field: { name, onChange, value },
              fieldState: { error },
            }) => (
              <Input
                name={name}
                label="E-mail"
                id="email"
                type="email"
                style={{ marginTop: 45 }}
                onChange={onChange}
                error={error?.message}
                value={value}
              />
            )}
          />

          <Controller
            control={control}
            name="registration"
            render={({
              field: { name, onChange, value },
              fieldState: { error },
            }) => (
              <Input
                name={name}
                id="registration"
                label="Matrícula"
                style={{ marginTop: 45 }}
                onChange={onChange}
                error={error?.message}
                value={value}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({
              field: { name, onChange, value },
              fieldState: { error },
            }) => (
              <Input
                name={name}
                label="Senha"
                id="password"
                type="password"
                style={{ marginTop: 45 }}
                onChange={onChange}
                error={error?.message}
                value={value}
              />
            )}
          />

          <Controller
            control={control}
            name="confirmPassword"
            render={({
              field: { name, onChange, value },
              fieldState: { error },
            }) => (
              <Input
                name={name}
                label="Confirme sua senha"
                id="confirmPassword"
                type="password"
                style={{ marginTop: 45 }}
                onChange={onChange}
                error={error?.message}
                value={value}
              />
            )}
          />

          <Button type="submit">Confirmar</Button>
        </Form>
      </Content>
    </Container>
  );
};
