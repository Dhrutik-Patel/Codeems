import { USERS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // 1. Add a `login` endpoint that performs a `POST` request to the `/users/login` URL.
    login: builder.mutation({
      query: ({ email, password }) => ({
        url: `${USERS_URL}/login`,
        method: "POST",
        body: { email, password },
      }),
    }),

    // 2. Add a `logout` endpoint that performs a `POST` request to the `/users/logout` URL.
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
      }),
    }),

    // 3. Add a `register` endpoint that performs a `POST` request to the `/users` URL.
    register: builder.mutation({
      query: ({ name, email, password }) => ({
        url: `${USERS_URL}`,
        method: "POST",
        body: { name, email, password },
      }),
    }),

    // 4. Add a `getUser` endpoint that performs a `GET` request to the `/users/me` URL.
    profile: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profile`,
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useProfileMutation,
} = usersApiSlice;
