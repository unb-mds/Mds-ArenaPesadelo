import styled from "styled-components";
import { Table as TableComponent } from '../../../components/Table';

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
    padding-top: 80px;

    display: flex;
    justify-content: space-between;

    > div:nth-child(1) {
      max-width: 371px;
      width: 100%;

      > strong {
        display: block;

        font-size: 24px;
        font-weight: 500;

        margin-top: 47px;
        margin-bottom: 33px;
      }
    }

    > div:nth-child(2) {
      > form {
        display: flex;
        gap: 20px;

        margin-top: 27px;

        > button {
          display: flex;
          align-items: center;
          justify-content: center;

          cursor: pointer;

          &:disabled {
            cursor: help;
            opacity: .5;
          }
        }
      }
    }
  }
`;

export const Table = styled(TableComponent)`
  margin-top: 48px;
`;

export const LoaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  padding-top: 48px;
`;
