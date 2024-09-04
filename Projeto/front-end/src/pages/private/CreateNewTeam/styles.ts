import styled from "styled-components";
import { Button as ComponentButton } from "../../../components/Button";
import { Table as TableComponent } from "../../../components/Table";

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
      display: flex;
      justify-content: space-between;
      align-items: flex-start;

      > div:nth-child(1) {
        padding-top: 17px;
        width: 371px;

        gap: 55px;

        > div:nth-child(2) {
          margin-top: 61px;

          display: flex;
          flex-direction: column;
          gap: 45px;
        }
      }

      > div:nth-child(2) {
        padding-top: 95px;

        display: flex;
        flex-direction: column;

        > h1 {
          font-size: 20px;
          font-weight: 500;
          color: var(--black);

          margin-bottom: 27px;
        }

        > div {
          display: flex;
          gap: 20px;

          > button {
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }
      }
    }
  }

  @media (max-width: 948px) {
    > main {
      > form {
        display: block;

        > div {
          width: 100% !important;
        }

        > div:nth-child(2) {
          > div > div {
            width: 100%  !important;
          }
        }
      }
    }
  }
`;

export const Button = styled(ComponentButton)`
  width: max-content;
  margin: 0;
  margin-top: 50px;
  padding-right: 20px;
  padding-left: 20px;
  align-self: flex-end;
`;

export const EditTeamMemberForm = styled.form`
  flex: 1;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Table = styled(TableComponent)`
  margin-top: 48px;
`;
