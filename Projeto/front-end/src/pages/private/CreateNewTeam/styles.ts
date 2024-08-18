import styled from "styled-components";
import { Button as ComponentButton } from "../../../components/Button";
import { Table as TableComponent } from "../../../components/Table";

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
