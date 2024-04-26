import styled from "styled-components";

export const Container = styled.div`
  height: 100vh;
  width: 100vw;

  display: flex;
  flex-direction: column;
`;

export const Content = styled.div`
  flex: 1;

  display: flex;
  align-items: center;
  justify-content: center;

  > div {
    display: flex;
    flex-direction: column;

    max-width: 763px;
    width: 100%;
    gap: 102px;

    > div {
      display: flex;
      align-items: center;
      justify-content: space-between;

      > button {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        > img {
          max-width: 100%;
          height: auto;

          margin-bottom: 10px;
        }

        > h1 {
          font-size: 20;
          font-weight: 700;
          font-family: 'Roboto Slab';
          color: var(--pink);

          margin-bottom: 13px;
        }

        > p {
          font-size: 12px;
          font-weight: 400;
          font-family: 'Roboto Slab';

          color: #7D7D7D;

          max-width: 125px;

          text-align: center;
        }
      }
    }
  }
`;