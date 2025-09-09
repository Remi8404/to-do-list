import React from "react";
import { styled } from "styled-components";

const SButton = styled.button`
  border: 3px solid white;
  text-align: center;
  border-radius: 9999px;
  padding: 15px;
  margin: 15px;
  background-color: white;
  color: black;
  text-decoration: none;
  &:hover {
    background-color: black;
    color: white;
    border: 3px solid white;
  }
`;

export default function Button({
  onClick = () => {},
  children,
}: {
  onClick: () => void;
  children: React.ReactNode;
}) {
  return <SButton onClick={onClick}>{children}</SButton>;
}
