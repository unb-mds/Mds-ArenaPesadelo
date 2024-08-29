import { useLocation } from "react-router-dom";
import { Header } from "../../../components/Header";
import { Navigator } from "../../../components/Navigator";
import {
  ChampionshipHours,
  Container,
  Content,
  EditChampionshipForm,
  SelectChampionshipWrapper,
} from "./styles";
import { useCallback, useEffect, useMemo, useState } from "react";
import { api } from "../../../services/api";
import { IOption } from "../../../components/Select/interfaces";
import { IChampionship, IForm } from "./interfaces";
import { Select } from "../../../components/Select";
import { Input } from "../../../components/Input";
import { FiTrash2 } from "react-icons/fi";
import { Controller, useForm } from "react-hook-form";
import { ImagePicker } from "../../../components/ImagePicker";
import { Button } from "../CreateNewTeam/styles";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";

export const ChampionshipManagement = () => {
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

  const { pathname } = useLocation();

  const [championships, setChampionships] = useState<IOption[]>([]);
  const [championship, setChampionship] = useState<IChampionship | null>(null);
  const [modalities, setModalities] = useState<IOption[]>([]);
  const [file, setFile] = useState<File | null>(null);

  const { control, handleSubmit, reset, setValue } = useForm<IForm>({
    resolver: yupResolver(formValidation),
  });

  useEffect(() => {
    async function loadChampionships() {
      const [{ data: championships }, { data: modalities }] = await Promise.all(
        [
          await api.get<IChampionship[]>("/championships"),
          await api.get(`/constants/modalities`),
        ]
      );

      setChampionships(
        championships.map((item) => ({ label: item.name, value: item.id }))
      );
      setModalities(modalities);
    }

    loadChampionships();
  }, []);

  const handleSelectChampionship = useCallback(
    async (option: IOption | null) => {
      if (!option?.value) return;

      const { data } = await api.get<IChampionship>(
        `/championships/${option.value}`
      );

      if (data.date) setValue('date', data.date);
      if (data.from) setValue('from', data.from);
      if (data.name) setValue('name', data.name);
      if (data.modality) setValue('modality', Number(data.modality));
      if (data.location) setValue('location', data.location);
      if (data.participants) setValue('participants', Number(data.participants));
      if (data.to) setValue('to', data.to);
      if (data.description) setValue('description', data.description);

      setChampionship(data);
    },
    [setValue]
  );

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
        if (!championship?.id) {
          toast('Selecione um campeonato para edição!', {
            type: 'info',
          });
          return;
        }

        const formData = new FormData();

        if (file) formData.append("image", file);

        if (data.description) formData.append(`description`, data.description);
        if (data.locationLat)
          formData.append(`locationLat`, data.locationLat.toString());
        if (data.locationLng)
          formData.append(`locationLng`, data.locationLng.toString());
        if (data.to) formData.append(`to`, data.to);

        formData.append("date", data.date);
        formData.append("from", data.from);
        formData.append("name", data.name);
        formData.append("modality", data.modality.toString());
        formData.append("location", data.location);
        formData.append("participants", data.participants.toString());

        await api.put(`/championships/${championship.id}`, formData);

        reset();
        toast("Campeonato criado com sucesso!", {
          type: 'success',
        });

        setChampionship(null);
      } catch (err: any) {
        if (err?.response?.data?.message) {
          toast(err?.response?.data?.message, {
            type: "error",
          });
        }
      }
    },
    [file, reset, championship]
  );

  return (
    <Container>
      <Header shadow />

      <Content>
        <Navigator
          title="Administração de usuarios"
          active={pathname}
          links={[
            { to: "/games", text: "Campeonatos" },
            { to: "/create-championship", text: "Novo campeonato" },
            { to: "/manage-championships", text: "Gerenciar campeonatos" },
            { to: `/administration`, text: "Gerenciar permissões" },
          ]}
        />

        <SelectChampionshipWrapper>
          <Select
            name="selectedChampionship"
            label="Campeonato"
            options={championships}
            onChange={handleSelectChampionship}
          />

          {championship && (
            <div className="icons">
              <button type="button">
                <FiTrash2 size={24} color="#DA1F4F" strokeWidth={2} />
              </button>
            </div>
          )}
        </SelectChampionshipWrapper>

        {championship && (
          <EditChampionshipForm
            onSubmit={handleSubmit(handleCreateNewChampionship)}
          >
            <div>
              <ImagePicker
                type="square"
                onPick={async (file) => setFile(file)}
                defaultImage={championship?.photo_url}
              />

              <Controller
                name="modality"
                control={control}
                render={({
                  field: { name, onChange, value },
                  fieldState: { error },
                }) => (
                  <Select
                    label="Modalidade"
                    name={name}
                    options={modalities}
                    error={error?.message}
                    value={modalities.find(item => item.value === value)}
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
                  field: { name, onChange, value },
                  fieldState: { error },
                }) => (
                  <Select
                    label="Quantidade de times"
                    value={participantsOptions.find(item => item.value === value)}
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
          </EditChampionshipForm>
        )}
      </Content>
    </Container>
  );
};
