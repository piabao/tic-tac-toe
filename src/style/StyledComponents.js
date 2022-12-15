import styled from "styled-components";

export const Label = styled.span`
  display: flex;
  align-items: center;
  line-height: 1.2;
  color: #e50000;
  min-height: 5vh;
  display: flex;
  height: 20px;
`;

export const Button = styled.button`
  background: transparent;
  border-radius: 3px;
  border: 2px solid #e50000;
  cursor: pointer;
  color: #330808;
  margin: 0 1em;
  padding: 0.25em 1em;
  &:hover {
    background-color: #ffd162;
  }
  &:active {
    background: #f1fba6;
  }
  &:after {
    background: #f1fba6;
  }
  &:disabled {
    opacity: 0.4;
  }
`;

export const StyledSelect = styled.select`
  height: 40px;
  width: 100%;
  border: 2px solid #e50000;
  border-radius: 5px;
  margin: 0 1em;
  padding: 0.25em 1em;
  cursor: pointer;
  color: #330808;
`;

export const Container = styled.div`
  display: grid;
  grid-gap: 5px;
  align-self: center;
  grid-template-columns: repeat(
    ${(props) => props.cols || "3"},
    ${(props) => props.rows || "30%"}
  );
`;
