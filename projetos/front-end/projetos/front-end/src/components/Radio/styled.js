import styled from "styled-components";

export const Container = styled.div`
  width: 25px;
  height: 25px;

  background-color: white;
  
  border: 1px solid #D92856;

  position: relative;

  background-color: ${props => props.checked ? '#D92856' : 'white'};
  
  &, > input {
    border-radius: 50%;
  }

  > input {
    opacity: 0;

    width: 25px;
    height: 25px;

    position: absolute;
    top: 0;
    left: 0;

    cursor: pointer;
  }
`;