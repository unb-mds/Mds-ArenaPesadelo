import { useLocation } from "react-router-dom"
import { Header } from "../../../components/Header"
import { Navigator } from "../../../components/Navigator"
import { Container, Content } from "./styles"

export const Games = () => {
  const { pathname } = useLocation();

  return (
    <Container>
      <Header shadow />

      <Content>
        <Navigator
          title="Administração de usuarios"
          active={pathname}
          links={[
            { to: "/games", text: "Campeonatos"},
            { to: "/create-championship", text: "Novo campeonato" },
            { to: `/administration`, text: "Gerenciar permissões" },
          ]}
        />
      </Content>
    </Container>
  )
}
