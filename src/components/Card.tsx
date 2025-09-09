import { styled } from "styled-components";
import { useAppDispatch } from "../hooks/hook";
import { remove } from "../stores/toDoSlice";
import Button from "./Button";

export interface ICard {
  id: string;
  name?: string;
  description: string;
  isDone: boolean;
}
const SCard = styled.div`
  background-color: black;
  color: white;
  border-radius: 10px;
  width: 300px;
  padding: 10px;
  margin: 20px;
`;
const SCardDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  text-align: justify;
  border-bottom: 1px solid white;
  margin-bottom: 5px;
`;
const SH2 = styled.h2`
  font-size: 2em;
`;

export default function Card({ id, name, description, isDone }: ICard) {
  const dispatch = useAppDispatch();
  return (
    <SCard>
      <SCardDiv>
        <SH2>{name}</SH2>
        <Button onClick={() => dispatch(remove(id))}>Remove Task</Button>
      </SCardDiv>
      <SCardDiv>
        <p>{description}</p>
      </SCardDiv>
      <label>
        Finished :
        <input type="checkbox" onChange={() => {}} checked={isDone} />
      </label>
    </SCard>
  );
}
