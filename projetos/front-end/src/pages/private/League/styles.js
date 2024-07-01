import styled from "styled-components";

export const Container = styled.div``;

export const Content = styled.div`
  padding: 0 40px;
  padding-top: 60px;

  display: flex;
  align-items: flex-start;

  > button {
    max-width: max-content;

    padding-left: 30px;
    padding-right: 30px;

    margin: 0 auto;
  }

  > div {
    flex: 1;

    > header {
      color: var(--pink);

      display: flex;
      align-items: flex-start;
      gap: 36px;

      p, span {
        font-size: 24px;
        font-family: 'Mate', sans-serif;
      }

      > div {
        > * + * {
          margin-top: 16px;
        }

        > h1 {
          font-size: 32px;
          font-weight: 400;

          margin-bottom: 34px;

          text-shadow: 0 4px 2px #00000025;
        }

        > div {
          display: flex;
          align-items: center;
          gap: 43px;
        }
      }
    }

    > main {
      margin-top: 21px;

      > div:nth-child(1) {
        margin-bottom: 16px;

        display: flex;
        align-items: center;
        justify-content: space-between;

        > strong {
          font-size: 32px;
          font-weight: 400;

          text-shadow: 0 4px 2px #00000025;

          color: var(--pink);
        }
      }
    }

    > footer {
      margin-top: 24px;

      display: flex;
      align-items: center;
      justify-content: flex-end;

      > button {
        max-width: max-content;

        padding: 0 35px;
      }
    }
  }
`;

export const Table = styled.div`
  border-radius: 20px;
  border: 2px solid var(--pink);

  > div.row {
    padding: 8px 0;

    display: flex;
    align-items: center;
    justify-content: space-between;

    > div.column {
      flex: 1;

      text-align: center;

      > span {
        font-size: 24px;
        color: var(--pink);
        font-weight: 400;
      }
    }
  }

  > div.heading {
    background-color: var(--pink);

    border-top-left-radius: 15px;
    border-top-right-radius: 15px;

    > div.column > span { color: #fff }
  }

`;

export const Status = styled.div`
  font-size: 24px;
  font-family: 'Mate', sans-serif;
  color: var(--pink);

  display: flex;
  align-items: center;
  gap: 14px !important;

  > span:nth-child(2) {
    position: relative;

    display: block;
    padding-left: calc(11px + 14px);

    &::before {
      content: '';

      position: absolute;
      top: 50%;
      left: 0;
      transform: translateY(-50%);

      width: 14px;
      height: 14px;

      border-radius: 50%;

      background-color: #28C90E;
    }
  }
`;
