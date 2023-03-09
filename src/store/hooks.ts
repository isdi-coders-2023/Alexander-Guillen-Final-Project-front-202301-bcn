import {
  type TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from "react-redux";
import type { RootState, AppDispatch } from "./store";

export const lingoDeckDispatch: () => AppDispatch = useDispatch;
export const lingoDeckSelector: TypedUseSelectorHook<RootState> = useSelector;
