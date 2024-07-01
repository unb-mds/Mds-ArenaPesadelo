import { Container } from "./styled";

export const Radio = ({ ...rest }) => {
  return (
    <Container checked={!!rest.checked}>
      <input {...rest} type="radio" />
    </Container>
  );
}