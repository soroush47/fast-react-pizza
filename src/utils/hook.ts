import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../store";

// نسخه تایپ‌شده‌ی useDispatch
export const useAppDispatch: () => AppDispatch = useDispatch;

// نسخه تایپ‌شده‌ی useSelector
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
