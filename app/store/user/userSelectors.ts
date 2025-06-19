import type { RootState } from "../store";

export function selectUser(reduxState: RootState) {
  return reduxState.user.user;
}

export function selectUserIsAuthenticated(reduxState: RootState) {
  return reduxState.user.isAuthenticated;
}

export function selectUserLoading(reduxState: RootState) {
  return reduxState.user.userLoading;
}

// export function selectUserBattles(reduxState: RootState) {
//   return reduxState.user.userBattles;
// }
