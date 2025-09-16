import { styled } from "styled-components";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import useToDos from "../hooks/hook";

const SCard = styled.div`
  background-color: #dcdede;
  height: 448.993px;
  color: black;
  padding: 10px;
  border-radius: 10px;
  width: 300px;
  margin: 20px;
  &:hover {
    box-shadow: 4px 4px 3px grey;
  }
`;

const LineStackedDatas = () => {
  let countFinished = 0;
  let countTask = 0;
  const toDos = useToDos();
  toDos.map((task) => {
    countTask++;
    if (task.isDone) {
      countFinished++;
    }
  });
  const data = [
    {
      name: "All Tasks",
      Finished: countFinished,
      InProgress: countTask - countFinished,
      amt: countTask,
    },
  ];

  return (
    <ResponsiveContainer width="90%" height="75%">
      <BarChart
        width={50}
        height={300}
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 1,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="Finished" stackId="a" fill="#82ca9d" />
        <Bar dataKey="InProgress" stackId="a" fill="#ca829d" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default function Dashboard() {
  return (
    <SCard>
      <h1>Dashboard</h1>
      <LineStackedDatas />
    </SCard>
  );
}

export { LineStackedDatas };
