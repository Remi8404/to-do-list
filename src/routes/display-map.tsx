import { styled } from "styled-components";
import Map from "../components/Map";

const SH1 = styled.h1`
  text-align: center;
  margin-top: 110px;
`;

const SDiv = styled.div`
  width: 100%;
`;

export default function DisplayMap() {
  return (
    <>
      <title>ToDoList - Map</title>
      <main>
        <SH1>Your Geolocated ToDos</SH1>
        <SDiv>
          <Map />
        </SDiv>
      </main>
    </>
  );
}
