import styled from "styled-components";

export const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;


  > div {
    display: flex;
    flex-direction: column;
    align-items: center;

    > img {
      width: 300px;
      height: 521.54px;
      margin-top: 75px;
      
    }
    > div {
        flex-direction: column;
        align-items: center;
        padding: 30px;
        > button {
            width: 218px;
            padding: 10px;
            margin-bottom: 20px;
            margin-right: 150px;
            margin-left: 150px;
            font-size: 20px;
            font-weight: 400;
            font-family: 'Mate';
            color: white;
            background-color: var(--pink);
            border-radius: 100px;
            &:active {
                opacity: .5;
            }
            
            &:disabled {
                opacity: .1;
            }
        }
    }    
`