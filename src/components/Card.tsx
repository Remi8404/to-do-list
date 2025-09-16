import { styled } from "styled-components";
import { useAppDispatch } from "../hooks/hook";
import { remove, update } from "../stores/toDoSlice";
import Button from "./Button";
import { useState } from "react";
import TaskForm from "./Form";

export interface ICard {
  id: string;
  name: string;
  description: string;
  isDone: boolean;
  limitDate: string;
  showDate: boolean;
  otherInfo?: string[];
  lat: number;
  lng: number;
  address: string;
}

const SCard = styled.div`
  background-color: #4f4e4e;
  color: white;
  border-radius: 10px;
  width: 300px;
  padding: 10px;
  margin: 20px;
  &:hover {
    box-shadow: 4px 4px 3px grey;
  }
`;
const SCardForm = styled.div`
  background-color: #4f4e4e;
  color: white;
  border-radius: 10px;
  width: 320px;
  padding: 10px;
  margin: 20px;
  &:hover {
    box-shadow: 4px 4px 3px grey;
  }

  & li {
    color: black;
  }
  & .css-13avqnh {
    color: black;
  }
`;

const SCardDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  text-align: justify;
  border-bottom: 1px solid white;
  margin-bottom: 5px;
  padding-top: 0px;
`;

const STitle = styled.h1`
  font-size: 2em;
  background-color: #4f4e4e;
  color: white;
  max-width: 165px;
  border: none;
  overflow: hidden;
  &:focus {
    outline: none;
  }
`;

const SDesc = styled.p`
  background-color: #4f4e4e;
  color: white;
  width: 100%;
  border: none;
  overflow: auto;
  margin-bottom: 10px;
  text-align: justify;
  white-space: normal;
  height: auto;
  resize: none;
  min-height: 150px;
  &:focus {
    outline: none;
  }
`;

const SGenericInput = styled.input`
  background-color: #4f4e4e;
  font-size: 1em;
  color: white;
  width: 100%;
  border: none;
  overflow: auto;
  margin-bottom: 10px;
  text-align: justify;
  white-space: normal;
  height: auto;
  resize: none;
  min-height: 15px;
  &:focus {
    outline: none;
  }
`;

const SText = styled.p`
  font-size: 1em;
  color: white;
  width: 100%;
  border: none;
  overflow: auto;
  margin-bottom: 10px;
  text-align: justify;
  white-space: normal;
  height: auto;
  resize: none;
  min-height: 15px;
`;

const SButtonDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

export default function Card({
  id,
  name,
  description,
  isDone,
  limitDate,
  showDate,
  otherInfo,
  lat,
  lng,
  address,
}: ICard) {
  const dispatch = useAppDispatch();
  const [isUpdating, setUpdating] = useState(false);

  if (!isUpdating) {
    return (
      <SCard>
        <SCardDiv>
          <STitle>{name}</STitle>
          <SButtonDiv>
            <Button onClick={() => setUpdating(true)}>
              <img src="/edit.png" />
            </Button>
            <Button onClick={() => dispatch(remove(id))}>
              <img src="/delete.png" />
            </Button>
          </SButtonDiv>
        </SCardDiv>
        <SCardDiv>
          <SDesc>{description}</SDesc>
        </SCardDiv>
        {showDate && (
          <SCardDiv>
            <label>
              Expiration Date : <br />
              <SGenericInput
                id={id + "lD"}
                type="date"
                value={limitDate}
                onChange={(e) => {
                  dispatch(update({ id, limitDate: e.target.value }));
                }}
              />
            </label>
          </SCardDiv>
        )}
        {otherInfo &&
          otherInfo.map((info) => {
            return (
              <SCardDiv key={info}>
                <SText>{info}</SText>
              </SCardDiv>
            );
          })}
        <label>
          Finished :
          <input
            type="checkbox"
            id={id + "done"}
            onChange={() => {
              dispatch(update({ id, isDone: !isDone }));
            }}
            checked={isDone}
          />
        </label>
      </SCard>
    );
  } else {
    return (
      <SCardForm>
        {/* <Form
          id={id}
          schema={schema}
          uiSchema={uiSchema}
          validator={validator}
          onSubmit={onSubmit}
          widgets={widgets}
          formContext={{ setLat, setLong, setSelectedAddress }}
          formData={formData}
          onChange={(form) => {
            setFormData(form.formData);
          }}
        >
          <button className="chakra-button css-4xx2wk" type="submit">
            valider
          </button>
        </Form> */}
        <TaskForm
          setShowForm={setUpdating}
          type="update"
          todoValue={{
            id: id,
            name: name,
            description: description,
            limitDate: limitDate ? limitDate : "",
            isDone: isDone,
            otherInfo: otherInfo ? otherInfo : [],
            lat: lat,
            lng: lng,
            address: address,
          }}
        />
      </SCardForm>
    );
  }
}
