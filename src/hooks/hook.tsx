import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../stores/store";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

const useToDos = () => {
  const toDos = useAppSelector((state) => state.toDos);
  return toDos;
};

export default useToDos;
