import styled from "styled-components";

export const Container = styled.div`
  position: relative;

  z-index: 6;
`;

export const Content = styled.div`
  position: absolute;
  top: 100%;
  right: 0;

  background-color: var(--white);
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;

  width: 344px;
  
  padding: 20px 40px;

  z-index: 6;

  > ul {
    list-style-type: none;

    > li {
      & + * {
        margin-top: 20px;
      }

      > button {
        height: 30px;
        width: 100%;

        display: flex;
        align-items: center;
        justify-content: flex-start;

        > span {
          color: #000;

          font-family: 'Mate';
          font-weight: 400;
          font-size: 20px;

          margin-left: 10px;
        }
      }
    }
  }
`;

export const Background = styled.div`
  background-color: #928D8D43;

  width: 100vw;
  height: 100vh;

  position: fixed;
  top: 0;
  left: 0;

  z-index: 5;
`;
