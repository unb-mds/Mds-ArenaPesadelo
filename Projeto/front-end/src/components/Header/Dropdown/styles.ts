import styled from "styled-components";

export const Container = styled.div`
  position: relative;

  height: 100%;

  > button {
    width: 50px;
    height: 100%;

    display: flex;
    align-items: center;
    justify-content: center;
  }

  @media (max-width: 614px) {
    width: 100%;

    > button {
      width: 100%;
    }
  }
`;

export const Content = styled.div`
  position: absolute;

  z-index: 99;

  box-shadow: 0px 2px 2px 0px #00000040;

  top: calc(100% + 6px);
  right: 0;

  width: 250px;

  background-color: var(--heavy-gray);

  border-radius: 7px;

  &::before {
    content: '';

    position: absolute;
    bottom: 100%;
    right: 20px;

    background-color: transparent;

    border: 5px solid transparent;
    border-bottom-color: var(--heavy-gray);

    width: 0;
    height: 0;
  }

  > header {
    display: flex;
    align-items: center;
    gap: 12px;

    padding: 10px 30px;

    box-shadow: 0px 2px 2px 0px #00000040;
    border-radius: 7px 7px 0 0;

    background-color: var(--heavy-gray);

    > strong {
      font-weight: 600;
      font-size: 16px;

      color: var(--white);
    }
  }

  > main {
    padding: 20px 0;

    display: flex;
    flex-direction: column;

    > button {
      padding: 0 30px;

      width: 100%;
      line-height: 40px;

      display: flex;
      align-items: center;
      justify-content: flex-start;

      gap: 16px;

      font-size: 14px;
      font-weight: 400;
      color: white;

      &:hover {
        background-color: rgba(255, 255, 255, .1);

        transition: background-color .2s;
      }
    }
  }

  @media (max-width: 614px) {
    top: calc(100% + 25px);
  }
`;
