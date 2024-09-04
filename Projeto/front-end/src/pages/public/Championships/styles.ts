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

    color: var(--heavy-gray);
  }

  > div {
    display: flex;
    flex-direction: column;
    gap: 31px;

    margin-top: 59px;
  }

  @media (max-width: 1146px) {
    max-width: 90%;

    > h1 {
      padding-bottom: 16px;
    }

    > div {
      margin-top: 40px;
    }
  }

  @media (max-width: 766px) {
    > h1 {
      font-size: 20px;
    }
  }

  @media (max-width: 482px) {
    > h1 {
      font-size: 18px;

      padding-bottom: 8px;

      text-align: center;
    }
  }
`;

export const Championship = styled.div`
  display: flex;
  align-items: flex-start;

  height: 210px;

  border: 1px solid var(--light-gray);
  border-radius: 5px;

  > header {
    height: 100%;

    > img {
      width: 370px;
      height: 100%;

      border-radius: 4px 0 0 4px;

      object-fit: cover;
      object-position: center;
    }

    > div {
      width: 370px;
      height: 100%;

      border-radius: 4px 0 0 4px;

      display: flex;
      align-items: center;
      justify-content: center;

      background-color: var(--heavy-gray);
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

  @media (max-width: 1146px) {
    > main {
      padding: 0 16px;
    }

    > footer {
      padding-right: 24px;
      padding-top: 24px;

      > button {
        padding-left: 20px;
        padding-right: 20px;
      }
    }
  }

  @media (max-width: 936px) {
    height: 190px;

    > header {
      > div {
        width: 280px;
      }
    }

    > main {
      > div {
        gap: 8px;
      }
    }
  }

  @media (max-width: 766px) {
    height: 160px;

    > header {
      > h1 {
        font-size: 20px;
      }

      > div {
        width: 230px;
      }
    }

    > main {
      > h1 {
        font-size: 16px;
      }

      > div {
        gap: 4px;
      }
    }

    > footer {
      padding-right: 16px;
      padding-top: 16px;

      > button {
        padding: 10px;

        font-size: 11px;
      }
    }
  }

  @media (max-width: 614px) {
    flex-direction: column;
    height: auto;

    > header {
      width: 100%;

      > div {
        height: 120px;
        width: 100%;

        border-radius: 4px 4px 0 0;
      }
    }

    > footer {
      padding: 0;

      width: 100%;

      display: flex;
      align-items: center;
      justify-content: center;

      > button {
        margin: 8px;

        width: auto;

        flex: 1;
      }
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

  @media (max-width: 766px) {
    > div {
      > span {
        font-size: 12px;
      }
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

  @media (max-width: 766px) {
    > span {
      font-size: 12px;
    }
  }
`;
