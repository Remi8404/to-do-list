// ** Import ** //
import { styled } from "styled-components";
import Card from "../components/Card";
import Button from "../components/Button";
import useToDos from "../hooks/hook";
import { useAppDispatch } from "../hooks/hook";
import { useState, useEffect, useRef } from "react";
import { add, reset, reorder } from "../stores/toDoSlice";
import AddForm from "../components/Form";
import {
  draggable,
  dropTargetForElements,
} from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { type IToDo } from "../stores/toDoSlice";
import Dashboard from "../components/DashBoard";

// ** Styled-components ** //
const SButs = styled.div`
  text-align: center;
  margin-top: 110px;
`;
const SLi = styled.li`
  list-style: none;
  margin: 0.5rem;
`;
const SUl = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
  gap: 1rem;
  margin: 0;
  padding: 0;
  list-style-type: none;
`;
const SCardForm = styled.div`
  background-color: #dcdede;
  color: black;
  border-radius: 10px;
  width: 320px;
  padding: 10px;
  margin: 20px;
  &:hover {
    box-shadow: 4px 4px 3px grey;
  }
`;

// ** React Elements ** //
export default function ToDoApp() {
  const dispatch = useAppDispatch();
  const toDoList = useToDos();

  const [isShowForm, setShowForm] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const [cards, setCards] = useState<IToDo[]>(toDoList);
  const [showFinish, setShowFinish] = useState(true);

  useEffect(() => {
    setCards(toDoList);
  }, [toDoList]);

  const cardRefs = useRef<Map<string, HTMLLIElement>>(new Map());

  useEffect(() => {
    const cleanups: (() => void)[] = [];

    cards.forEach((card) => {
      const el = cardRefs.current.get(card.id);
      if (!el) return;

      cleanups.push(
        draggable({
          element: el,
          getInitialData: () => ({ id: card.id }),
        })
      );

      cleanups.push(
        dropTargetForElements({
          element: el,
          getData: () => ({ id: card.id }),
          onDrop: ({ source, self }) => {
            if (!source?.data?.id || !self?.data?.id) return;
            if (source.data.id === self.data.id) return;

            const newItems = [...cards];
            const fromIndex = newItems.findIndex(
              (c) => c.id === source.data.id
            );
            const toIndex = newItems.findIndex((c) => c.id === self.data.id);

            const [moved] = newItems.splice(fromIndex, 1);
            newItems.splice(toIndex, 0, moved);

            setCards(newItems);
            dispatch(reorder(newItems));
          },
        })
      );
    });

    return () => cleanups.forEach((cleanup) => cleanup());
  }, [cards]);

  const isValidDateString = (dateStr: string): boolean => {
    const parsedDate = Date.parse(dateStr);
    return !isNaN(parsedDate);
  };

  return (
    <>
      <title>ToDoList - My List</title>
      <main>
        <SButs>
          <Button
            onClick={() =>
              dispatch(
                add({
                  name: "New Task",
                  description: "Description",
                  isDone: false,
                  limitDate: "",
                  lat: 0,
                  lng: 0,
                  address: "",
                })
              )
            }
          >
            Quick Add
          </Button>
          <Button onClick={() => setShowForm(!isShowForm)}>
            {!isShowForm ? "Add a New" : "Close Form"}
          </Button>
          <Button onClick={() => setShowFinish(!showFinish)}>
            {showFinish ? "Hide Done Tasks" : "Show All Tasks"}
          </Button>
          <Button onClick={() => setShowDashboard(!showDashboard)}>
            {!showDashboard ? "See Dashboard" : "Hide Dashboard"}
          </Button>
          <Button onClick={() => dispatch(reset())}>Reset your List</Button>
        </SButs>
        <SUl>
          {isShowForm && (
            <SLi>
              <SCardForm>
                <AddForm setShowForm={setShowForm} />
              </SCardForm>
            </SLi>
          )}
          {showDashboard && (
            <SLi>
              <Dashboard />
            </SLi>
          )}
        </SUl>
        <SUl>
          {cards
            .filter((task) => !task.isDone || showFinish)
            .map((task) => (
              <SLi
                key={task.id}
                ref={(el) => {
                  if (el) cardRefs.current.set(task.id, el);
                  else cardRefs.current.delete(task.id);
                }}
              >
                <Card
                  id={task.id}
                  name={task.name}
                  description={task.description}
                  isDone={task.isDone}
                  limitDate={task.limitDate}
                  showDate={isValidDateString(task.limitDate)}
                  otherInfo={task.otherInfo}
                  lat={task.lat}
                  lng={task.lng}
                  address={task.address}
                />
              </SLi>
            ))}
        </SUl>
      </main>
    </>
  );
}
