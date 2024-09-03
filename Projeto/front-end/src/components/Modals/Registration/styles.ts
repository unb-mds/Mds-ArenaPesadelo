import styled, { css, keyframes } from "styled-components";

interface IContainer {
  loaded: boolean;
  shown: boolean;
}

interface IBackdrop {
  shown: boolean;
}

const squareAnimationLarge = keyframes`
  from {
    width: 50px;
    height: 50px;
  }

  to {
    width: 400px;
    height: 400px;

    @media (max-width: 530px) {
      width: 300px;
      height: 300px;
    }
  }
`;

const squareAnimationMedium = keyframes`
  from {
    width: 50px;
    height: 50px;
  }

  to {
    width: 300px;
    height: 300px;
  }
`;

const squareAnimationSmall = keyframes`
  from {
    width: 50px;
    height: 50px;
  }

  to {
    width: 250px;
    height: 250px;
  }
`;

const fadeInAnimation = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

export const Container = styled.div<IContainer>`
  width: 50px;
  height: 50px;

  padding: 16px;

  visibility: ${props => props.shown ? 'visible' : 'hidden'};
  opacity: ${props => props.shown ? '1' : '0'};

  transition: visibility .4s, opacity .4s;

  background-color: #1B1B1B;

  box-shadow: 0 4px 4px rgba(0, 0, 0, .25);

  position: absolute;

  top: 50%;
  left: 50%;

  transform: translate(-50%, -50%);

  z-index: 3;

  border-radius: 10px;

  ${props => props.loaded ? css`
    animation: ${squareAnimationLarge} forwards .4s;

    @media (max-width: 530px) {
      animation: ${squareAnimationMedium} forwards .4s;
    }

    @media (max-width: 410px) {
      animation: ${squareAnimationSmall} forwards .4s;
    }

    .content {
      animation: ${fadeInAnimation} forwards .4s;
      animation-delay: .4s;
    }
  ` : css`
    display: flex;
    align-items: center;
    justify-content: center;
  `}

  .content {
    opacity: 0;

    > span {
      font-size: 18px;

      color: #fff;

      text-align: center;

      display: block;
    }

    > h1 {
      font-size: 20px;
      color: #fff;
      font-weight: 500;

      margin-top: 47px;
      margin-bottom: 104px;

      text-align: center;
    }

    > div {
      max-width: 60%;

      margin: 0 auto;

      display: flex;
      flex-direction: column;
      gap: 75px;

      > div {
        display: flex;
        flex-direction: column;
        align-items: flex-end;

        > div {
          width: 100%;
        }

        > a {
          color: #fff;
        }
      }
    }
  }

  @media (max-width: 530px) {
    > .content {
      > h1 {
        margin: 20px 0;

        font-size: 18px;
      }

      > div {
        gap: 24px;
        margin: 0;

        max-width: 100%;
      }
    }
  }

  @media (max-width: 410px) {
    > .content {
      > div {
        > div {

        }
      }
    }
  }
`;

export const Backdrop = styled.div<IBackdrop>`
  visibility: ${props => props.shown ? 'visible' : 'hidden'};
  opacity: ${props => props.shown ? '1' : '0'};

  background-color: rgba(0, 0, 0, .85);

  z-index: 2;

  width: 100%;
  height: 100%;

  position: fixed;

  top: 0;
  left: 0;

  transition: all .4s;
`;
