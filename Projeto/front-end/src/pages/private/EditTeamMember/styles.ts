import styled from "styled-components";
import { Button as ComponentButton } from "../../../components/Button";

export const Container = styled.div`
  height: 100vh;
  padding: 0 84px;
  padding-top: calc(79px + 77px);
`;

export const Content = styled.div`
  > header {
    > h1 {
      color: var(--black);
      font-size: 24px;
      margin-bottom: 40px;
    }

    > div {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      gap: 45px;

      padding-bottom: 10px;

      border-bottom: 1px solid var(--black);

      > a {
        color: var(--black);
        text-decoration: none;
        font-size: 16px;
        font-weight: 500;

        &.active {
          color: var(--pink);
        }
      }
    }
  }

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
