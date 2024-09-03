import styled from "styled-components";

export const Container = styled.header`
  > h1 {
    color: var(--black);
    font-size: 24px;
    margin-bottom: 40px;
    text-transform: uppercase;
  }

  > div {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 45px;

    border-bottom: 1px solid var(--black);

    > a {
      color: var(--black);
      text-decoration: none;
      font-size: 16px;
      font-weight: 500;

      padding-bottom: 10px;

      &.active {
        color: var(--pink);
      }
    }
  }

  @media (max-width: 758px) {
    > h1 {
      font-size: 20px;
      margin-bottom: 30px;
    }

    > div {
      gap: 16px;

      > a {
        font-size: 14px;
      }
    }
  }

  @media (max-width: 394px) {
    > div {
      gap: 8px;

      > a {
        font-size: 12px;
      }
    }
  }
`;
