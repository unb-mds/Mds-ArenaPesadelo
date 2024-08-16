import styled from "styled-components";

export const Container = styled.div`
  width: 70px;
  height: 70px;

  border-radius: 50%;

  position: relative;

  cursor: pointer;

  > img {
    border-radius: 50%;

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
    top: 0;
    right: 0;

    background-color: var(--pink);
  }
`;

export const MissingImage = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 50%;

  border: 1px solid #282828;
`;
