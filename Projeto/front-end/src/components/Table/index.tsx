import { FC } from "react";
import { ITable } from "./interfaces";
import { Container, Content, Counter } from "./styles";
import { Row } from "./Row";

export const Table: FC<ITable> = ({ data, className }) => {
  return (
    <Container>
      <Content className={className}>
        {data.map((item) => (
          <Row key={Math.floor(Math.random() * 1).toString()}>{item}</Row>
        ))}
      </Content>

      <Counter>{data.length} resultados</Counter>
    </Container>
  );
};
