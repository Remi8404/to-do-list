import { styled } from "styled-components";
import { Link } from "react-router";

const SLink = styled(Link)`
  border: 3px solid #dcdede;
  text-align: center;
  border-radius: 9999px;
  padding: 15px;
  margin: 15px;
  background-color: white;
  color: black;
  text-decoration: none;
  &:hover {
    background-color: #dcdede;
    color: black;
  }
`;

const STopBar = styled.div`
  background-color: #201f1f;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  heigth: 60px;
  width: 100%;
  position: fixed;
  z-index: 10;
`;

export default function NavBar() {
  return (
    <STopBar>
      <SLink
        to={{
          pathname: "/",
        }}
      >
        Home
      </SLink>
      <SLink
        to={{
          pathname: "/toDo",
        }}
      >
        To Dos
      </SLink>
      <SLink
        to={{
          pathname: "/Map",
        }}
      >
        Map
      </SLink>
      <SLink
        to={{
          pathname: "/PDF",
        }}
      >
        PDF
      </SLink>
    </STopBar>
  );
}
