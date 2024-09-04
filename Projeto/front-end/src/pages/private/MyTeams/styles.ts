import styled from "styled-components";
import { Table as TableComponent } from '../../../components/Table';

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

  @media (max-width: 924px) {
    > main {
      padding-top: 40px;
      display: block;

      > div:nth-child(1) {
        > strong {
          margin: 20px 0;
        }
      }

      > div:nth-child(2) {
        margin-top: 40px;

        > form {
          margin-top: 16px;

          > div {
            flex: 1;
          }
        }

        > div {
          > div {
            width: 100%  !important;
          }
        }
      }
    }
  }

  @media (max-width: 425px) {
    > main {
      > div:nth-child(2) {
        > form {
          display: block;

          > button {
            margin: 0 auto;
            margin-top: 16px;

            width: 40px;
            height: 40px;
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
