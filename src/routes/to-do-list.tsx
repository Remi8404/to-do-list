import { styled } from "styled-components";
import Card from "../components/Card";
import Button from "../components/Button";
import useToDos from "../hooks/hook";
import { useAppDispatch } from "../hooks/hook";
import { add, reset } from "../stores/toDoSlice";

const SButs = styled.div`
  text-align: center;
`;
const SLi = styled.li`
  list-style: none;
`;
const SUl = styled.ul`
  margin: 0;
  padding: 0;
`;

export default function ToDoApp() {
  const dispatch = useAppDispatch();
  const toDoList = useToDos();
  return (
    <>
      <title>ToDoList - My List</title>
      <main>
        <SButs>
          <Button
            onClick={() =>
              dispatch(
                add({
                  name: "Test",
                  description:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                  isDone: false,
                })
              )
            }
          >
            Add a new Task
          </Button>
          <Button onClick={() => dispatch(reset())}>Reset your List</Button>
        </SButs>
        <SUl>
          {toDoList.map((task) => {
            return (
              <SLi key={task.id}>
                <Card
                  id={task.id}
                  name={task.name}
                  description={task.description}
                  isDone={task.isDone}
                />
              </SLi>
            );
          })}
        </SUl>
      </main>
    </>
  );
}
