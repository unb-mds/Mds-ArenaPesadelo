import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;

  height: 100vh;
  width: 100vw;

  > img {
    max-width: 100%;
    height: auto;

    margin-top: 59px;
  }

  > div {
    position: absolute;
    top: 50%;
    left: 50%;

    width: 100%;

    transform: translate(-50%, -50%);

    display: flex;
    flex-direction: column;
    align-items: center;

    > span {
      font-size: 20px;
      font-family: 'Mate';
      color: var(--pink);
      margin-bottom: 10px;
    }
  }
`;

export const Card = styled.div`
  max-width: 330px;
  width: 100%;

  background-color: var(--white);

  padding: 23px;

  border: 1px solid var(--pink);
  border-radius: 20px;

  > form {
    display: flex;
    flex-direction: column;
    align-items: center;

    > div {
      width: 100%;
    }

    > div + div {
      margin-top: 20px;
    }

    > button {
      margin-top: 62px;
      max-width: 179px;
    }
  }
`;