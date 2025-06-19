// AuthLoader.tsx
import {
  useCheckAuthQuery,
  useGetAllUserBattlesQuery,
} from "~/services.ts/api";
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

export default function AuthLoader(props: PropsWithChildren) {
  const dispatch = useDispatch();

  const {
    data: authData,
    error: authError,
    isLoading: authIsLoading,
  } = useCheckAuthQuery();

  // const {
  //   data: battlesData,
  //   isLoading: battlesLoading,
  //   error: battlesError,
  // } = useGetAllUserBattlesQuery(userId as string, { skip: !userId });

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

  // useEffect(() => {
  //   // if (battlesData) {
  //   //   dispatch(SET_BATTLES(battlesData)); // Save to Redux if needed#
  //   // }
  // }, [battlesData, dispatch]);

  if (authIsLoading) {
    return <Spinner />;
  }
  return props.children;
}
