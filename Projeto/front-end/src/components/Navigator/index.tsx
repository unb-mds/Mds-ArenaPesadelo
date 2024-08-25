import { FC } from "react"
import { INavigator } from "./interfaces"
import { Link } from "react-router-dom"
import { Container } from "./styles"

export const Navigator: FC<INavigator> = ({ links, title, active }) => {
  return (
    <Container>
      <h1>{title}</h1>

      <div>
        {links.map(link => (
          <Link to={link.to} key={link.text} className={link.to === active ? 'active' : ''}>
            {link.text}
          </Link>
        ))}
      </div>
    </Container>
  )
}
