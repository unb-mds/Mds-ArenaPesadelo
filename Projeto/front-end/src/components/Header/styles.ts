import styled, { css } from "styled-components";

interface IContainer {
  shadow: boolean;
  show: boolean;
}

export const Container = styled.div<IContainer>`
  background-color: var(--heavy-gray);

  height: 79px;

  position: absolute;
  top: 0;
  left: 0;

  width: 100%;

  /* transition: height .2s; */

  @media (max-width: 614px) {
    /* overflow: hidden; */

    z-index: 100;

    ${props => !props.show ? css`
      > div {
        > div:nth-child(1) {
          height: 100%;
        }

        > ul, > div:nth-last-child(1) {
          display: none;
        }
      }
    ` : css`
      height: 212px;

      padding: 16px 0;
    `}
  }

  ${props => props.shadow && css`box-shadow: 0px 2px 4px 0px #0A0A0A40;`}
`;

export const Content = styled.div`
  max-width: 75%;
  height: 100%;

  margin: 0 auto;

  display: flex;
  align-items: center;
  justify-content: space-between;

  > div:nth-child(1) {
    > button {
      display: none;
    }
  }

  > ul {
    display: flex;
    align-items: center;

    gap: 71px;

    height: 100%;

    list-style: none;

    > li {
      line-height: 79px;

      > a {
        display: block;

        color: var(--white);
        font-weight: 500;

        text-decoration: none;

        position: relative;

        &:hover {
          &::before {
            width: 100%;
          }
        }

        &::before {
          content: '';

          height: 2px;
          width: 0;

          top: calc(50% + 8px);
          left: 50%;

          transform: translateX(-50%);

          position: absolute;

          background-color: var(--pink);

          transition: width .2s;
        }

        &.active::before {
          width: 100%;
        }
      }
    }
  }

  > div:nth-last-child(1) {
    display: flex;
    align-items: center;

    gap: 40px;

    height: 100%;

    > button {
      color: var(--white);

      text-transform: uppercase;

      border: 1px solid transparent;
      border-radius: 20px;

      padding: 0 15px;

      height: 41px;

      &.login {
        border-color: var(--pink);
        background-color: var(--pink);

        box-shadow: 0px 2px 2px 0px #00000040;
      }

      &.sign-up {
        border-color: var(--white);
      }
    }
  }

  @media (max-width: 1024px) {
    max-width: 95%;
  }

  @media (max-width: 846px) {
    > ul {
      gap: 16px;
    }

    > div:nth-last-child(1) {
      gap: 16px;
    }
  }

  @media (max-width: 766px) {
    > ul {
      font-size: 12px;

      gap: 8px;
    }

    > div:nth-last-child(1) {
      gap: 8px;

      > button {
        font-size: 12px;
      }
    }
  }

  @media (max-width: 614px) {
    flex-direction: column;
    gap: 16px;

    > div:nth-child(1) {
      display: flex;
      align-items: center;
      justify-content: space-between;

      width: 100%;

      > button {
        display: block;
      }
    }

    > ul {
      flex-direction: column;

      > li {
        line-height: 25px;
      }
    }

    > div:nth-last-child(1) {
      flex-direction: column;

      width: 100%;
    }
  }
`;
