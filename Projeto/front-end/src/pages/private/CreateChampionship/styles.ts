import styled from "styled-components";

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
      margin-top: 54px;

      display: flex;
      align-items: flex-start;
      justify-content: space-between;

      > div {
        display: flex;
        flex-direction: column;
        gap: 45px;

        min-width: 341px;

        > span {
          font-size: 20px;
          color: var(--heavy-gray);
          font-weight: 500;
        }
      }
    }
  }

  @media (max-width: 750px) {
    > main {
      > form {
        margin-top: 40px;

        > div {
          gap: 20px;

          min-width: 250px;
        }
      }
    }
  }

  @media (max-width: 642px) {
    > main {
      > form {
        display: block;
      }
    }
  }
`;

export const ChampionshipHours = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  > div {
    flex: 1;
  }
`;
