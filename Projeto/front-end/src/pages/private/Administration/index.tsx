import { useLocation } from "react-router-dom"
import { Header } from "../../../components/Header"
import { Navigator } from "../../../components/Navigator"
import { Container, Content } from "./styles"
import { useCallback, useEffect, useMemo, useState } from "react"
import { IUser } from "./interfaces"
import { api } from "../../../services/api"
import { Table } from "../../../components/Table"
import { Select } from "../../../components/Select"
import { IOption } from "../../../components/Select/interfaces"

export const Administration = () => {
  const { pathname } = useLocation();

  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    async function getUsers() {
      const { data } = await api.get('/users');

      setUsers(data);
    }

    getUsers();
  }, []);

  const accessOptions = useMemo<IOption[]>(() => {
    return [
      { label: 'Atleta', value: 1 },
      { label: 'Administrador', value: 2 },
    ];
  }, []);

  const handleChangeAccess = useCallback(async (userId: string, access: number) => {
    const { data: updatedUser } = await api.patch(`/users/accesses/${userId}`, { access });

    setUsers(oldState => {
      const updatedState = oldState.map(user => {
        if (user.id === userId) {
          return { ...user, access: updatedUser.access };
        }

        return user;
      });

      return updatedState;
    })
  }, []);

  const tableData = useMemo(() => {
    return users.map(user => {
      return (
        <>
          <span>{user.full_name}</span>

          <span>{user.email}</span>

          <Select
            label=""
            name="access"
            options={accessOptions}
            value={accessOptions.find(item => item.value === user.access)}
            styles={{ container: style => ({ ...style, width: 300 }) }}
            onChange={(opt) => handleChangeAccess(user.id, opt!.value as number)}
          />
        </>
      );
    });
  }, [users, accessOptions, handleChangeAccess]);

  return (
    <Container>
      <Header shadow />

      <Content>
        <Navigator
          title="Administração de usuarios"
          active={pathname}
          links={[
            { to: "/games", text: "Jogos" },
            { to: "/create-championship", text: "Novo campeonato" },
            { to: "/manage-championships", text: "Gerenciar campeonatos" },
            { to: `/administration`, text: "Gerenciar permissões" },
          ]}
        />

        <Table data={tableData} style={{ width: '100%', marginTop: 56 }} />
      </Content>
    </Container>
  )
}
