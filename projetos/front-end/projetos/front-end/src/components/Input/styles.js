import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;

  height: 47px;

  border: 1px solid;
  border-color: ${props => props.isFocused ? 'var(--pink)' : 'var(--pink)'};

  border-radius: 20px;

  padding: 0 13px;

  > button {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const Input = styled.input`
  flex: 1;

  height: 100%;

  border: 0;
  outline: 0;

  border-radius: 20px;

  background-color: transparent;
  border-color: transparent;

  padding-left: 16px;

  font-size: 20px;
  font-family: 'Mate';
  font-weight: 400;

  &::placeholder {
    color: #D9285667;
  }
`;
