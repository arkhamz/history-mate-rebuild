import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AuthenticatedUser, Battle } from "../../types/types";

interface userState {
  user: AuthenticatedUser | null;
  isAuthenticated: boolean;
  userLoading: boolean;
  userBattles: Battle[] | [];
  authChecked: boolean;
}

const initialState: userState = {
  user: null,
  isAuthenticated: false,
  userLoading: false,
  userBattles: [],
  authChecked: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    //reducer functions to define how the state is updated

    START_USER_LOADING(state) {
      state.userLoading = true;
      state.authChecked = false;
    },
    AUTH_FAILED(state) {
      state.user = null;
      state.isAuthenticated = false;
      state.userLoading = false;
      state.authChecked = true;
    },
    SET_USER(
      state,
      action: PayloadAction<{ username: string; userId: string }>
    ) {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.userLoading = false;
      state.authChecked = true;
    },

    LOGIN(state, action: PayloadAction<{ username: string; userId: string }>) {
      //this will also be used for signup, firebase auth signup auto logs in
      state.isAuthenticated = true;
      state.user = action.payload;
      state.userLoading = false;
    },
    LOGOUT(state) {
      state.user = null;
      state.isAuthenticated = false;
      state.userLoading = false;
    },

    SET_BATTLES(state, action: PayloadAction<Battle[]>) {
      state.userBattles = action.payload;
      state.userLoading = false;
    },
  },
});

export const {
  LOGIN,
  LOGOUT,
  SET_USER,
  START_USER_LOADING,
  SET_BATTLES,
  AUTH_FAILED,
} = userSlice.actions;
export default userSlice.reducer;
