import styled from "styled-components";
import { Button as ComponentButton } from "../../../components/Button";

export const Container = styled.div`
  height: 100vh;
  padding: calc(79px + 77px) 84px;

  @media (max-width: 953px) {
    padding: calc(79px + 77px) 40px;
  }

  @media (max-width: 833px) {
    padding: calc(79px + 77px) 20px;
  }
`;

export const Content = styled.div`
  > main {
    > form {
      margin-top: 61px;

      > div {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        flex-direction: column;

        gap: 45px;

        > div {
          width: 330px;
        }
      }
    }
  }
`;

export const Button = styled(ComponentButton)`
  width: max-content;
  margin: 0;
  margin-top: 50px;
  padding-right: 20px;
  padding-left: 20px;
  align-self: flex-end;
`;
