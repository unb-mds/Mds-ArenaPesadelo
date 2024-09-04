import styled from "styled-components";

export const Container = styled.div`
  background-color: var(--heavy-gray);
  height: 100vh;
  padding-top: calc(79px + 90px);
`;

export const Content = styled.div`
  width: 100%;

  margin: 0 auto;
  padding: 35px 100px;

  max-width: 80%;

  background-color: #1B1B1B;

  border-radius: 10px;

  display: flex;
  align-items: flex-start;

  > form {
    flex: 1;

    display: flex;
    justify-content: space-between;
  }

  @media (max-width: 1248px) {
    padding: 35px 50px;
  }

  @media (max-width: 956px) {
    padding: 20px;

    > form {
      flex-direction: column;
    }
  }
`;

export const InputWrapper = styled.div`
  max-width: 370px;
  width: 370px;

  margin-top: 23px;

  @media (max-width: 956px) {
    max-width: 100%;
    width: 100%;
  }
`;
