import styled, { css } from "styled-components";

interface IContainer {
  active: boolean;
}

export const Container = styled.div<IContainer>`
  background-color: var(--white-smoke);

  height: 41px;
  max-width: 100%;

  border-radius: 5px;

  padding-left: 8px;

  position: relative;

  border: 1px solid var(--pink);

  margin-top: 8px;

  display: flex;
  align-items: center;

  > label {
    position: absolute;

    left: 8px;

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
          `
        : css`
            top: 50%;
            transform: translateY(-50%);
            font-size: 14px;
            color: var(--light-gray);
          `}

    transition: top .2s, transform .2s, font-size .2s, color .2s;
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
