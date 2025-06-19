import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  AuthenticatedUser,
  Battle,
  Commander,
  QuestionData,
  User,
} from "../types/types";

//have 1 API slice per base URL that your app needs to communicate with
//E.g. if your site fetches data from /api/posts and /api/ users, have
//a single api slice with /api/ as the base url and separate endpoint definitions for post and users

// Define a service (api slice) using a base URL and expected endpoints
export const historyMateApi = createApi({
  reducerPath: "api",

  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000",
    prepareHeaders(headers) {
      return headers;
    },
  }),
  tagTypes: ["Battle"],
  endpoints: (builder) => ({
    //define multiple endpoints in this slice

    //auth
    signup: builder.mutation<
      AuthenticatedUser,
      { username: string; password: string }
    >({
      query: (body) => ({
        url: "/auth/register",
        method: "POST",
        body: body,
        credentials: "include",
      }),
    }),
    login: builder.mutation<
      AuthenticatedUser,
      { username: string; password: string }
    >({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body: body,
        credentials: "include",
      }),
    }),

    logout: builder.mutation<{ message: string }, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
        credentials: "include",
      }),
    }),

    checkAuth: builder.query<AuthenticatedUser, void>({
      query: () => ({
        url: `/auth/check`,
        method: "GET",
        credentials: "include",
      }),
    }),

    //battles
    getAllUserBattles: builder.query<Battle[], string>({
      query: (id) => ({
        url: `/user-battles/${id}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Battle"],
    }),

    getBattlesCount: builder.query<
      {
        count: number;
        battles: Array<{ battle_id: number }>;
      },
      string
    >({
      query: (id) => ({
        url: `/user-battles/count/${id}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Battle"],
    }),

    unlockNextBattle: builder.mutation<
      string,
      { user_id: string; battle_id: number; completed: boolean }
    >({
      query: (body) => ({
        url: "/user-battles",
        method: "POST",
        body: body,
        credentials: "include",
      }),
      invalidatesTags: ["Battle"],
    }),

    updateBattle: builder.mutation<
      string,
      { user_id: string; battle_id: number; completed: boolean }
    >({
      query: (body) => ({
        url: "/user-battles",
        method: "PATCH",
        body: body,
        credentials: "include",
      }),
      invalidatesTags: ["Battle"],
    }),

    //commanders
    getAllCommanders: builder.query<Commander[], void>({
      query: () => ({
        url: "/commanders",
        method: "GET",
        credentials: "include",
      }),
    }),

    getOneCommander: builder.query<Commander, string>({
      query: (id) => ({
        url: `/commanders/${id}`,
        method: "GET",
        credentials: "include",
      }),
    }),
    //get battle questions
    getBattleQuestionsAndAnswers: builder.query<QuestionData[], string>({
      query: (battleId) => ({
        url: `/question-answers/${battleId}`,
        method: "GET",
        credentials: "include",
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints

export const {
  useSignupMutation,
  useLoginMutation,
  useUnlockNextBattleMutation,
  useGetAllUserBattlesQuery,
  useGetAllCommandersQuery,
  useGetOneCommanderQuery,
  useGetBattlesCountQuery,
  useLogoutMutation,
  useCheckAuthQuery,
  useGetBattleQuestionsAndAnswersQuery,
  useUpdateBattleMutation,
} = historyMateApi;
