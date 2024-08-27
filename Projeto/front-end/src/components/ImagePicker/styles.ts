import styled, { css } from "styled-components";

interface IContainer {
  type?: 'square' | 'circle';
}

export const Container = styled.div<IContainer>`
  ${props => props.type === 'circle' ? css`
    width: 70px;
    height: 70px;
  ` : css`
    width: 320px;
    height: 200px;
  `}

  border-radius: 50%;

  position: relative;

  cursor: pointer;

  > div:nth-child(1) {
    border-radius: ${props => props.type === 'circle' ? '50%' : '8px'};
  }

  > img {
    border-radius: ${props => props.type === 'circle' ? '50%' : '8px'};

    object-fit: cover;
    object-position: center;

    width: 100%;
    height: 100%;
  }

  ::-webkit-file-upload-button {
    display: none;
  }

  > input {
    position: absolute;
    opacity: 0;

    width: 100%;
    height: 100%;

    border-radius: 50%;

    top: 0;
    left: 0;

    z-index: 5;

    cursor: pointer;
  }

  > .icon {
    width: 21px;
    height: 21px;

    border-radius: 50%;

    z-index: 4;

    display: flex;
    align-items: center;
    justify-content: center;

    position: absolute;
    top: ${props => props.type === 'circle' ? '0' : '-10px'};
    right: ${props => props.type === 'circle' ? '0' : '-10px'};

    background-color: var(--pink);
  }
`;

export const MissingImage = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  border: 1px solid #282828;
`;
