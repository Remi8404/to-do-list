import { styled } from "styled-components";
import { Link } from "react-router";

const SLink = styled(Link)`
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

const STopBar = styled.div`
  background-color: black;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  width: 100%;
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
        Create a ToDoList
      </SLink>
    </STopBar>
  );
}
