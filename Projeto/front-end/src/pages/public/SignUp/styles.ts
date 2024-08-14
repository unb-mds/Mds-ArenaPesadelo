import styled from "styled-components";

export const Container = styled.div`
  background-color: var(--heavy-gray);
`;

export const Content = styled.div`
  width: 100%;
  height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Form = styled.form`
  max-width: 225px;
  width: 100%;

  > h1 {
    margin-bottom: 95px;

    font-size: 24px;
    text-align: center;

    color: var(--white);
  }

  > button {
    margin: 0 auto;

    background-color: var(--pink);
    color: #fff;

    border-radius: 8px;

    padding: 15px 0;

    text-transform: uppercase;

    width: 100%;

    margin-top: 31px;
  }
`;
