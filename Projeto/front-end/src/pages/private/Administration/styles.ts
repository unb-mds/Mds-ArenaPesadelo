import styled from "styled-components";

export const Container = styled.div`
  height: 100vh;
  padding: 0 84px;
  padding-top: calc(79px + 77px);
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
`;

export const ChampionshipHours = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  > div {
    flex: 1;
  }
`;
