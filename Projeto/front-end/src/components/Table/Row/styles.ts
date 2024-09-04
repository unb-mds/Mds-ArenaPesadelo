import styled from "styled-components";

interface IContainer {
  length: number;
}

export const Container = styled.div<IContainer>`
  display: flex;
  justify-content: space-between;
  align-items: center;

  min-height: 47px;
  padding: 8px 0;

  border-top: 1px solid var(--light-gray);

  > * {
    &:nth-last-child(1) {
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }

    width: ${props => `calc(100% / ${props.length})`};
  }
`;
