import styled, { css } from "styled-components";

interface IContainer {
  active: boolean;
}

export const Container = styled.div<IContainer>`
  background-color: var(--white);

  height: 40px;
  max-width: 100%;

  border-radius: 3px;

  padding-left: 8px;

  position: relative;

  border: 1px solid var(--heavy-gray);

  margin-top: 8px;

  display: flex;
  align-items: center;

  > label {
    position: absolute;

    left: 0;

    background-color: inherit;

    padding: 0 6px;

    border-radius: 4px 4px 0 0;

    ${(props) =>
      props.active
        ? css`
            top: -8px;
            transform: translateY(0);
            font-size: 12px;
            color: var(--black);
            left: 4px;
          `
        : css`
            top: 50%;
            transform: translateY(-50%);
            font-size: 14px;
            color: var(--light-gray);
          `}

    transition: all .2s;
  }

  > input {
    border: none;

    background-color: inherit;

    height: 100%;
    width: 100%;

    border-radius: inherit;

    flex: 1;
  }

  > button {
    width: 30px;
    height: 30px;

    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const Error = styled.span`
  margin-top: 4px;

  color: red;

  position: absolute;

  top: 100%;
  left: 0;
`;
