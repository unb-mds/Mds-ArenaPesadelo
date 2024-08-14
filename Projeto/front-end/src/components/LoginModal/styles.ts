import styled from "styled-components";

interface IContainer {
  visible: boolean;
}

interface IBackdrop {
  visible: boolean;
}

export const Container = styled.div<IContainer>`
  background-color: var(--heavy-gray);

  padding: 0 64px;

  position: fixed;
  top: 0;
  right: 0;

  transform: ${props => props.visible ? 'translateX(0)' : 'translateX(400px)'};

  height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 122px;

  transition: transform .4s;
`;

export const Backdrop = styled.div<IBackdrop>`
  position: fixed;

  top: 0;
  left: 0;

  width: 100vw;
  height: 100vh;

  background-color: rgba(0, 0, 0, .5);

  opacity: ${props => props.visible ? '1' : '0'};
  visibility: ${props => props.visible ? 'visible' : 'hidden'};

  transition: visibility .4s, opacity .4s;
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
