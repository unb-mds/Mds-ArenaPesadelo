import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Content = styled.div`
  width: 422px;

  border-bottom: 1px solid var(--light-gray);
`;

export const Counter = styled.span`
  display: block;
  margin-top: 20px;
  color: var(--light-gray);
  margin-left: auto;
`;
