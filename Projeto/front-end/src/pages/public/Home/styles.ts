import styled from "styled-components";

export const Container = styled.div`
  height: 100vh;
  padding-top: calc(79px);
`;

export const Wrapper = styled.div`
  max-width: 90%;
  width: 100%;

  display: flex;
  align-items: flex-start;

  margin: 0 auto;

  border-left: 1px solid var(--light-gray);
  border-right: 1px solid var(--light-gray);

  height: 100%;

  > * {
    padding: 0 32px;
    padding-top: 80px;
  }
`;

export const Content = styled.div`
  flex: 2;

  height: 100%;

  border-right: 1px solid var(--light-gray);

  overflow-y: auto;

  > header {
    display: flex;
    align-items: center;
    justify-content: flex-start;

    gap: 20px;

    > div {
      min-width: 230px;
    }
  }

  > main {
    margin-top: 57px;
  }
`;

export const Games = styled.div`
  flex: 1;

  height: 100%;

  overflow-y: auto;

  > header {
    > h1 {
      text-transform: uppercase;

      color: var(--heavy-gray);

      font-size: 24px;
      font-weight: 500;

      text-align: center;
    }
  }

  > main {
    margin-top: 100px;
  }
`;

export const Game = styled.div`
  border-top: 1px solid var(--light-gray);

  padding: 34px 44px;

  > header {
    > span {
      color: var(--light-gray);

      text-align: center;

      font-size: 16px;

      display: block;

      margin-bottom: 8px;
    }
  }

  > main {
    display: flex;
    align-items: center;
    justify-content: space-between;

    margin: 18px 0;

    > * {
      flex: 1;

      display: block;

      text-align: center;
    }

    > span {
      color: var(--heavy-gray);
      font-weight: 600;
      font-size: 16px;

      &:nth-child(1) {
        color: var(--light-gray);

        font-weight: 400;
      }
    }
  }

  > footer {
    display: flex;
    align-items: flex-start;
    justify-content: center;

    gap: 21px;

    text-align: center;

    > span {
      flex: 1;
    }

    > span {
      font-size: 18px;
    }

    > div {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 4px;

      align-self: center;

      > b {
        font-size: 20px;
      }

      > span {
        font-size: 12px;
      }
    }
  }
`;

export const NoDataText = styled.span`
  display: block;

  text-align: center;

  font-style: italic;
  font-size: 20px;
`;
