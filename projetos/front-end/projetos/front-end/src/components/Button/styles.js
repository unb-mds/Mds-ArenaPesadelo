import styled from 'styled-components';

export const Container = styled.button`
  background-color: var(--pink);
  color: var(--white);

  height: 34px;
  width: 100%;

  border-radius: 20px;

  display: flex;
  align-items: center;
  justify-content: center;
  
  font-family: 'Mate';
  font-weight: 400;
  font-size: 20px;

  &:active {
    opacity: .5;
  }

  &:disabled {
    opacity: .1;
  }
`;
