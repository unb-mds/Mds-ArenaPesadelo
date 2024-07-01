import styled from "styled-components";

export const Container = styled.div``;

export const Content = styled.div`
  padding: 0 40px;
  padding-top: 60px;

  display: flex;
  align-items: flex-start;
  gap: 68px;

  > button {
    max-width: max-content;

    padding-left: 30px;
    padding-right: 30px;
  }
`;

export const Form = styled.form`
  border: 1px solid #D92856;
  border-radius: 20px;

  margin-right: 124px;

  flex: 1;

  padding: 42px 72px;

  display: flex;
  flex-direction: column;
  gap: 30px;

  label {
    font-size: 20px;
    font-weight: 400;
    font-family: 'Mate', sans-serif;

    margin-bottom: 20px;

    color: #D92856;
  }

  .row {
    display: flex;

    gap: 100px;

    flex: 1;

    .column {
      display: flex;
      flex-direction: column;

      flex: 1;
    }
  }

  .radio {
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;

    gap: 29px;

    > label {
      margin-bottom: 0px;
    }
  }

  > button {
    margin-top: 75px;
  }
`;
