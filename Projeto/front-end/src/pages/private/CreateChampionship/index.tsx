import { useLocation, useNavigate } from "react-router-dom";
import { Header } from "../../../components/Header";
import { Navigator } from "../../../components/Navigator";
import { ChampionshipHours, Container, Content } from "./styles";
import { useCallback, useEffect, useMemo, useState } from "react";
import { IOption } from "../../../components/Select/interfaces";
import { api } from "../../../services/api";
import * as Yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { IForm } from "./interfaces";
import { Select } from "../../../components/Select";
import { Input } from "../../../components/Input";
import { Button } from "../../../components/Button";
import { ImagePicker } from "../../../components/ImagePicker";
import { toast } from "react-toastify";

export const CreateChampionship = () => {
  const formValidation = useMemo(() => {
    return Yup.object().shape({
      date: Yup.string()
        .required("Campo obrigatório!")
        .matches(
          /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/,
          "Deve seguir o seguinte formato: dd/mm/aaaa"
        ),
      from: Yup.string()
        .required("Campo obrigatório!")
        .matches(
          /^(?:[01]\d|2[0-3]):[0-5]\d$/,
          "Deve seguir o seguinte formato: hh:mm"
        ),
      name: Yup.string().required("Campo obrigatório!"),
      modality: Yup.number()
        .typeError("Inválido!")
        .required("Campo obrigatório!"),
      location: Yup.string().required("Campo obrigatório!"),
      participants: Yup.number()
        .typeError("Inválido!")
        .required("Campo obrigatório!"),
      to: Yup.string().matches(
        /^(?:[01]\d|2[0-3]):[0-5]\d$/,
        "Valor inválido!"
      ),
      description: Yup.string(),
      locationLat: Yup.number().typeError("Inválido!"),
      locationLng: Yup.number().typeError("Inválido!"),
    });
  }, []);

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { control, handleSubmit, reset } = useForm<IForm>({
    resolver: yupResolver(formValidation),
  });

  const [modalities, setModalities] = useState<IOption[]>([]);
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    async function loadModalities() {
      const { data } = await api.get(`/constants/modalities`);

      setModalities(data);
    }

    loadModalities();
  }, []);

  const participantsOptions = useMemo(() => {
    return [
      { label: "2", value: 2 },
      { label: "4", value: 4 },
      { label: "6", value: 6 },
      { label: "8", value: 8 },
    ];
  }, []);

  const handleCreateNewChampionship = useCallback(
    async (data: IForm) => {
      try {
        const formData = new FormData();

        if (file) formData.append('image', file);

        if (data.description) formData.append(`description`, data.description);
        if (data.locationLat) formData.append(`locationLat`, data.locationLat.toString());
        if (data.locationLng) formData.append(`locationLng`, data.locationLng.toString());
        if (data.to) formData.append(`to`, data.to);

        formData.append('date', data.date);
        formData.append('from', data.from);
        formData.append('name', data.name);
        formData.append('modality', data.modality.toString());
        formData.append('location', data.location);
        formData.append('participants', data.participants.toString());

        await api.post('/championships', formData);

        reset();
        toast('Campeonato criado com sucesso!', {
          type: 'success',
        });
        navigate('/championships');
      } catch (err: any) {
        if (err?.response?.data?.message) {
          toast(err?.response?.data?.message, {
            type: 'error',
          });
        }
      }
    },
    [file, navigate, reset]
  );

  return (
    <Container>
      <Header shadow />

      <Content>
        <Navigator
          title="Campeonatos"
          active={pathname}
          links={[
            { to: "/games", text: "Jogos" },
            { to: "/create-championship", text: "Novo campeonato" },
            { to: "/manage-championships", text: "Gerenciar campeonatos" },
            { to: `/administration`, text: "Gerenciar permissões" },
          ]}
        />

        <main>
          <form onSubmit={handleSubmit(handleCreateNewChampionship)}>
            <div>
              <ImagePicker
                type="square"
                onPick={async (file) => setFile(file)}
              />

              <Controller
                name="modality"
                control={control}
                render={({
                  field: { name, onChange },
                  fieldState: { error },
                }) => (
                  <Select
                    label="Modalidade"
                    name={name}
                    options={modalities}
                    error={error?.message}
                    onChange={(option) => {
                      onChange({ target: { value: option?.value || "" } });
                    }}
                  />
                )}
              />

              <Controller
                name="name"
                control={control}
                render={({
                  field: { name, value, onChange },
                  fieldState: { error },
                }) => (
                  <Input
                    label="Nome do campeonato"
                    name={name}
                    onChange={onChange}
                    value={value}
                    id={name}
                    error={error?.message}
                  />
                )}
              />

              <Controller
                name="date"
                control={control}
                render={({
                  field: { name, value, onChange },
                  fieldState: { error },
                }) => (
                  <Input
                    label="Data do campeonato"
                    name={name}
                    onChange={onChange}
                    value={value}
                    type="date"
                    id={name}
                    error={error?.message}
                  />
                )}
              />

              <Controller
                name="participants"
                control={control}
                render={({
                  field: { name, onChange },
                  fieldState: { error },
                }) => (
                  <Select
                    label="Quantidade de times"
                    name={name}
                    options={participantsOptions}
                    onChange={(option) => {
                      onChange({ target: { value: option?.value || "" } });
                    }}
                    error={error?.message}
                  />
                )}
              />
            </div>

            <div>
              <Controller
                name="location"
                control={control}
                render={({
                  field: { name, value, onChange },
                  fieldState: { error },
                }) => (
                  <Input
                    label="Localização"
                    name={name}
                    onChange={onChange}
                    value={value}
                    id={name}
                    error={error?.message}
                  />
                )}
              />

              <span>Horário dos jogos</span>

              <ChampionshipHours>
                <Controller
                  name="from"
                  control={control}
                  render={({
                    field: { name, value, onChange },
                    fieldState: { error },
                  }) => (
                    <Input
                      type="time"
                      label="Início"
                      name={name}
                      onChange={onChange}
                      value={value}
                      id={name}
                      error={error?.message}
                    />
                  )}
                />

                <Controller
                  name="to"
                  control={control}
                  render={({
                    field: { name, value, onChange },
                    fieldState: { error },
                  }) => (
                    <Input
                      type="time"
                      label="Fim"
                      name={name}
                      onChange={onChange}
                      value={value}
                      id={name}
                      error={error?.message}
                    />
                  )}
                />
              </ChampionshipHours>

              <Button>Salvar</Button>
            </div>
          </form>
        </main>
      </Content>
    </Container>
  );
};
