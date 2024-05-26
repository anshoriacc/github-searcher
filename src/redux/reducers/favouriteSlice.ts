import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { TRepository, TUser } from "../services/type";

type FavouriteState = {
  users: TUser[];
  repositories: TRepository[];
};

// Define the initial state using that type
const initialState: FavouriteState = {
  users: [],
  repositories: [],
};

export const favouriteSlice = createSlice({
  name: "favourites",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<TUser>) => {
      if (state.users.find((user) => user.id === action.payload.id)) {
        return state;
      }
      return { ...state, users: [...state.users, action.payload] };
    },
    removeUser: (state, action: PayloadAction<TUser>) => {
      if (state.users.find((user) => user.id === action.payload.id)) {
        return {
          ...state,
          users: state.users.filter((user) => user.id !== action.payload.id),
        };
      }
    },
    addRepository: (state, action: PayloadAction<TRepository>) => {
      if (
        state.repositories.find(
          (repository) => repository.id === action.payload.id
        )
      ) {
        return state;
      }
      return {
        ...state,
        repositories: [...state.repositories, action.payload],
      };
    },
    removeRepository: (state, action: PayloadAction<TRepository>) => {
      if (
        state.repositories.find(
          (repository) => repository.id === action.payload.id
        )
      ) {
        return {
          ...state,
          repositories: state.repositories.filter(
            (repository) => repository.id !== action.payload.id
          ),
        };
      }
    },
  },
});

export const { addUser, removeUser, addRepository, removeRepository } =
  favouriteSlice.actions;

export default favouriteSlice.reducer;
