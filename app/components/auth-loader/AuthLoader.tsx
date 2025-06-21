// AuthLoader.tsx
import { useCheckAuthQuery } from "~/services.ts/api";
import { useEffect, type PropsWithChildren, type ReactNode } from "react";
import { useDispatch } from "react-redux";
import {
  AUTH_FAILED,
  SET_BATTLES,
  SET_USER,
  START_USER_LOADING,
} from "~/store/user/userSlice";
import Spinner from "../spinner/Spinner";
import type { SerializedError } from "@reduxjs/toolkit";

//wrap navbar component and react router Outlet
export default function AuthLoader(props: PropsWithChildren) {
  const dispatch = useDispatch();

  const {
    data: authData,
    error: authError,
    isLoading: authIsLoading,
  } = useCheckAuthQuery();

  useEffect(() => {
    //begin loading user
    dispatch(START_USER_LOADING());

    if (authError) {
      dispatch(AUTH_FAILED());
    }
    if (authData) {
      dispatch(SET_USER(authData)); // optional
    }
  }, [authData, dispatch, authError]);

  if (authIsLoading) {
    return <Spinner />;
  }
  return props.children;
}
