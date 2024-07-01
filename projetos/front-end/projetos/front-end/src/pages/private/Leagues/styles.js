import styled from "styled-components";

export const Container = styled.div`
  padding-bottom: 100px;
`;

export const Content = styled.div`
  padding: 0 40px;
  padding-top: 60px;

  > button {
    max-width: max-content;

    padding-left: 30px;
    padding-right: 30px;

    margin: 0 auto;
  }

  > button:nth-last-child(1) {
    margin-top: 100px;
  }
`;

export const Carousel = styled.div`
  display: flex;

  align-items: center;
  gap: 46px;

  scroll-behavior: smooth;
  max-width: 90%;

  margin: 0 auto;

  margin-top: 30px;

  flex-wrap: wrap;
`;

export const Item = styled.div`
  border: 1px solid #D92856;
  border-radius: 20px;

  width: calc((100% / 3) - 46px);

  > img {
    width: 100%;
    height: auto;
  }

  > div {
    padding: 24px;

    color: #D92856;

    display: flex;
    flex-direction: column;

    gap: 8px;

    > span:nth-child(1) {
      position: relative;

      display: block;

      padding-left: calc(9px + 13px);

      &::before {
        content: '';

        width: 9px;
        height: 9px;

        position: absolute;

        top: 50%;
        left: 0;

        transform: translateY(-50%);

        background-color: #28C90E;

        border-radius: 50%;
      }
    }

    > span {
      font-size: 15px;

      font-family: 'Mate', sans-serif;
    }

    > button {
      align-self: center;

      margin-top: 38px;
    }
  }
`;
