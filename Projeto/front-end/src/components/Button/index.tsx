import { FC, ReactNode, ButtonHTMLAttributes } from "react"
import { Container } from "./styles"
import { TailSpin } from "react-loader-spinner";

export interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  loading?: boolean;
}

export const Button: FC<IButton> = ({ children, loading, ...rest }) => {
  return (
    <Container {...rest}>
      {loading ? <TailSpin width={16} height={16} color="#fff" /> : children}
    </Container>
  );
}
