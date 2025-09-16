import { styled } from "styled-components";
const SH1 = styled.h1`
  text-align: center;
  margin-top: 110px;
`;

export default function Home() {
  return (
    <>
      <title>ToDoList - Home</title>
      <main>
        <SH1>Bienvenue !</SH1>
      </main>
    </>
  );
}
