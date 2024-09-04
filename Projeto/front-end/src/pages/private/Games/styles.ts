import styled from "styled-components";

interface IGameTeam {
  winner?: boolean;
}

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
    > header {
      margin-top: 44px;

      display: flex;
      align-items: center;
      justify-content: space-between;

      > div {
        display: flex;
        align-items: center;
        gap: 16px;

        > div {
          min-width: 230px;
        }
      }

      > h1 {
        color: var(--heavy-gray);

        font-size: 24px;
        font-weight: 600;

        text-transform: uppercase;
      }
    }
  }

  @media (max-width: 797px) {
    > main {
      > header {
        flex-direction: column;
        gap: 24px;

        > div {
          width: 100%;

          > div {
            min-width: unset;
            max-width: 100%;
            width: 100%;
          }
        }

        > h1 {
          font-size: 20px;
        }
      }
    }
  }

  @media (max-width: 425px) {
    > main {
      > header {
        > div {
          flex-direction: column;
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

export const Controls = styled.div`
  display: flex;
  align-items: center;

  margin-top: 74px;

  > div {
    flex: 1;

    text-align: left;

    > span {
      color: var(--heavy-gray);

      font-size: 24px;
      font-weight: 600;

      text-transform: uppercase;
    }
  }

  > div:nth-child(2) {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  @media (max-width: 797px) {
    > div {
      > span {
        font-size: 18px;
      }
    }
  }
`;

export const GamesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;

  margin-top: 80px;

  @media (max-width: 541px) {
    overflow-x: auto;
  }
`;

export const NoDataText = styled.span`
  margin-top: 74px;

  display: block;

  text-align: center;

  font-style: italic;
  font-size: 20px;

  @media (max-width: 797px) {
    font-size: 16px;
  }
`;

export const Game = styled.div`
  display: flex;
  align-items: center;

  gap: 12px;

  > span {
    font-size: 16px;
    font-weight: 300;
    color: var(--black);
  }

  @media (max-width: 757px) {
    > span {
      font-size: 14px;
    }
  }


`;

export const GameTeam = styled.div<IGameTeam>`
  &:nth-child(1) {
    padding-left: 74px;
    padding-right: 25px;
  }

  &:nth-last-child(1) {
    padding-right: 74px;
    padding-left: 25px;

    text-align: right;
  }

  flex: 1;

  height: 135px;

  display: flex;
  align-items: center;

  background-color: ${(props) => !props.winner ? "var(--light-gray)" : "transparent"};
  border: 1px solid ${(props) => (props.winner ? "var(--medium-gray)" : "transparent")};

  border-radius: 5px;

  > b {
    display: block;

    flex: 1;

    font-size: 24px;
    font-weight: 500;
    color: var(--black);
  }

  > div {
    display: flex;
    align-items: center;

    > span {
      font-size: 20px;
      font-weight: 300;

      color: var(--black);
    }
  }

  @media (max-width: 757px) {
    &:nth-child(1) {
      padding-left: 34px;
      padding-right: 14px;

      > b {
        font-size: 18px;
      }

      > div > span {
        font-size: 14px;
      }
    }

    &:nth-last-child(1) {
      padding-right: 34px;
      padding-left: 14px;

      text-align: right;

      > b {
        font-size: 18px;
      }

      > div > span {
        font-size: 14px;
      }
    }
  }

  @media (max-width: 541px) {
    gap: 8px;
  }
`;

export const GameControls = styled.div`
  margin-left: 25px;
  margin-right: 8px;

  display: flex;
  flex-direction: column;
`;

export const GameScore = styled.div`
  width: 35px;
  height: 35px;

  display: flex;
  align-items: center;
  justify-content: center;

  border: 2px solid var(--medium-gray);
  border-radius: 2px;

  > span {
    font-size: 20px;
    font-weight: 600;
    color: var(--black);
  }

  @media (max-width: 757px) {
    > span {
      font-size: 18px;
    }
  }
`;
