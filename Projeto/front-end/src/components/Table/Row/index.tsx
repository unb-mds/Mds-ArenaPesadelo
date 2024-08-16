import { FC } from "react";
import { IRow } from "./interfaces";
import { Container } from "./styles";

export const Row: FC<IRow> = ({ children }) => {
  return (
    <Container>
      {children}
    </Container>
  );
}
