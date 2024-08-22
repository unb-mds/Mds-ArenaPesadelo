import styled from "styled-components";

export const Container = styled.div`
  padding-top: 79px;
`;

export const Content = styled.div`
  max-width: 85%;
  margin: 59px auto 0;

  > h1 {
    border-bottom: 2px solid var(--light-gray);

    padding-bottom: 46px;

    text-transform: uppercase;
    font-size: 24px;
    font-weight: 600;
  }

  > div {
    display: flex;
    flex-direction: column;
    gap: 31px;

    margin-top: 59px;
  }
`;

export const Championship = styled.div`
  display: flex;
  align-items: flex-start;

  min-height: 210px;

  border: 1px solid var(--light-gray);
  border-radius: 5px;

  > header {
    > img {
      width: 370px;
      min-height: 210px;

      border-radius: 4px 0 0 4px;

      object-fit: cover;
      object-position: center;
    }
  }

  > main {
    padding: 0 30px;

    height: 100%;

    flex: 1;

    > h1 {
      font-size: 24px;
      color: var(--heavy-gray);
      font-weight: 600;

      margin-top: 9px;
    }

    > p {
      font-size: 14px;
      color: var(--black);
      font-weight: 400;
      margin-top: 13px;
    }
  }

  > footer {
    padding-right: 31px;
    padding-top: 31px;

    > button {
      padding-left: 50px;
      padding-right: 50px;
    }
  }
`;

export const ChampionshipInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 13px;

  margin-top: 16px;

  > div {
    display: flex;
    align-items: center;
    gap: 5px;

    > span {
      font-size: 14px;
      font-weight: 600;
    }

    > span:nth-child(1) {
      color: var(--medium-gray);
    }

    > span:nth-child(2) {
      color: var(--black);
    }
  }
`;

export const ChampionshipParticipants = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;

  margin-top: 13px;

  > span {
    font-size: 14px;
    font-weight: 600;
  }

  > span:nth-child(1) {
    color: var(--salmon);
  }

  > span:nth-child(2) {
    color: var(--black);
  }
`;
