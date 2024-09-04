import styled from "styled-components";

interface ILabel {
  focused: boolean;
}

export const Container = styled.div`
  position: relative;
  margin-top: 8px;
`;

export const Label = styled.label<ILabel>`
  position: absolute;

  top: ${props => props.focused ? '-3%' : '50%'};
  left: ${props => props.focused ? '8px' : '4px'};

  transform: translateY(-50%);

  font-size: ${props => props.focused ? '12px' : '14px'};
  color: var(${props => props.focused ? '--black' : '--light-gray'});

  z-index: 99;

  background-color: #fff;
  padding: 0 6px;

  transition: all .2s;
`;
