import React from "react";
import { styled } from "styled-components";

const SButton = styled.button`
  border: 3px solid #dcdede;
  text-align: center;
  border-radius: 9999px;
  padding: 15px;
  margin: 15px 10px 15px 15px;
  background-color: white;
  color: black;
  text-decoration: none;
  white-space: nowrap;
  &:hover {
    background-color: #dcdede;
    color: #1d1c1c;
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
