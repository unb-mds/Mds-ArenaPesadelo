import { useCallback, useMemo } from "react";
import { Header } from "../../../components/Header";
import useAuth from "../../../hooks/useAuth";
import { Container, Content, InputWrapper } from "./styles";
import { Controller, useForm } from "react-hook-form";
import { IForm } from "./insterfaces";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { Input } from "../../../components/Input";
import { Button } from "../../../components/Button";

export const Me = () => {
  const validation = useMemo(() => {
    return Yup.object().shape({
      fullName: Yup.string().required("Este campo é obrigatório!"),
      email: Yup.string().required("Este campo é obrigatório!"),
      registration: Yup.string().required("Este campo é obrigatório!"),
      oldPassword: Yup.string(),
      password: Yup.string(),
      confirmPassword: Yup.string().oneOf(
        [Yup.ref("password")],
        "As senhas não coincidem!"
      ),
    });
  }, []);

  const { user, update } = useAuth();
  const updateUserDataForm = useForm<IForm>({
    resolver: yupResolver(validation),
  });

  const handleUpdateProfile = useCallback(
    async (data: IForm) => {
      try {
        await update({
          email: data.email,
          fullName: data.fullName,
          oldPassword: data.oldPassword,
          password: data.password,
          registration: data.registration,
        });

        toast('Dados atualizados com sucesso!', {
          type: 'success',
        });
      } catch (err: any) {
        if (err?.response?.data?.message) {
          toast(err?.response?.data?.message, {
            type: "error",
          });
        }
      }
    },
    [update]
  );

  return (
    <Container>
      <Header shadow />

      <Content>
        <form onSubmit={updateUserDataForm.handleSubmit(handleUpdateProfile)}>
          <div>
            <Controller
              control={updateUserDataForm.control}
              name="fullName"
              defaultValue={user?.full_name}
              render={({
                field: { name, onChange, value },
                fieldState: { error },
              }) => (
                <InputWrapper>
                  <Input
                    label="Nome completo"
                    name={name}
                    onChange={onChange}
                    value={value}
                    id="fullName"
                    error={error?.message}
                  />
                </InputWrapper>
              )}
            />

            <Controller
              control={updateUserDataForm.control}
              name="email"
              defaultValue={user?.email}
              render={({
                field: { name, onChange, value },
                fieldState: { error },
              }) => (
                <InputWrapper>
                  <Input
                    label="E-mail"
                    name={name}
                    onChange={onChange}
                    value={value}
                    id="email"
                    error={error?.message}
                  />
                </InputWrapper>
              )}
            />

            <Controller
              control={updateUserDataForm.control}
              name="registration"
              defaultValue={user?.registration}
              render={({
                field: { name, onChange, value },
                fieldState: { error },
              }) => (
                <InputWrapper>
                  <Input
                    label="Matrícula"
                    name={name}
                    onChange={onChange}
                    value={value}
                    id="registration"
                    error={error?.message}
                  />
                </InputWrapper>
              )}
            />
          </div>

          <div>
            <Controller
              control={updateUserDataForm.control}
              name="oldPassword"
              render={({
                field: { name, onChange, value },
                fieldState: { error },
              }) => (
                <InputWrapper>
                  <Input
                    type="password"
                    label="Senha atual"
                    name={name}
                    onChange={onChange}
                    value={value}
                    id="oldPassword"
                    error={error?.message}
                  />
                </InputWrapper>
              )}
            />

            <Controller
              control={updateUserDataForm.control}
              name="password"
              render={({
                field: { name, onChange, value },
                fieldState: { error },
              }) => (
                <InputWrapper>
                  <Input
                    label="Nova senha"
                    type="password"
                    name={name}
                    onChange={onChange}
                    value={value}
                    id="password"
                    error={error?.message}
                  />
                </InputWrapper>
              )}
            />

            <Controller
              control={updateUserDataForm.control}
              name="confirmPassword"
              render={({
                field: { name, onChange, value },
                fieldState: { error },
              }) => (
                <InputWrapper>
                  <Input
                    label="Confirme a nova senha"
                    name={name}
                    type="password"
                    onChange={onChange}
                    value={value}
                    id="confirmPassword"
                    error={error?.message}
                  />
                </InputWrapper>
              )}
            />

            <InputWrapper>
              <Button type="submit">Confirmar</Button>
            </InputWrapper>
          </div>
        </form>
      </Content>
    </Container>
  );
};