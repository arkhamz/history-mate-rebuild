import type { RootState } from "../store";

export function selectMessage(reduxState: RootState) {
  return reduxState.appState.message;
}

export function selectLoading(reduxState: RootState) {
  return reduxState.appState.loading;
}

export function selectLevel(reduxState: RootState) {
  return reduxState.appState.level;
}
