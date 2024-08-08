import { FC, ReactNode, ButtonHTMLAttributes } from "react"
import { Container } from "./styles"

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
}

export const Button: FC<IButton> = ({ children, ...rest }) => {
  return <Container {...rest}>{children}</Container>
}
