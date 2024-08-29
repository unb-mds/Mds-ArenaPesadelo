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
          title="Tabela de jogos"
          active={pathname}
          links={[
            { to: "/games", text: "Jogos"},
            { to: "/create-championship", text: "Novo campeonato" },
            { to: "/manage-championships", text: "Gerenciar campeonatos" },
            { to: `/administration`, text: "Gerenciar permissões" },
          ]}
        />
      </Content>
    </Container>
  )
}
