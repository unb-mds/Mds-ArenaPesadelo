import { FC } from "react";
import { ITable } from "./interfaces";
import { Container, Content, Counter } from "./styles";
import { Row } from "./Row";
import { v4 } from "uuid";

export const Table: FC<ITable> = ({ data, className, ...rest }) => {
  return (
    <Container>
      <Content className={className} {...rest}>
        {data.map((item) => {
          const {
            props: {
              children: { length },
            },
          } = item as any;

          console.log();

          return (
            <Row length={length} key={v4()}>
              {item}
            </Row>
          );
        })}
      </Content>

      <Counter>{data.length} resultados</Counter>
    </Container>
  );
};
