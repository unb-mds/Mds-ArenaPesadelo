import styled from "styled-components";

interface IGameTeam {
  winner?: boolean;
}

export const Container = styled.div`
  height: 100vh;
  padding: 0 84px;
  padding-top: calc(79px + 77px);
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

    > main {

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
`;

export const GamesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;

  margin-top: 80px;
`;

export const NoDataText = styled.span`
  margin-top: 74px;

  display: block;

  text-align: center;

  font-style: italic;
  font-size: 20px;
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

  background-color: ${props => !props.winner ? 'var(--light-gray)' : 'transparent'};
  border: 1px solid ${props => props.winner ? 'var(--medium-gray)' : 'transparent'};

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
`;
