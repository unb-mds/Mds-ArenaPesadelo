import styled from "styled-components";

export const Container = styled.div`  
  height: 98px;

  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;

  background-color: var(--pink);

  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 0 30px;

  > div {
    height: 100%;

    display: flex;
    align-items: center;
    justify-content: center;
  }
`