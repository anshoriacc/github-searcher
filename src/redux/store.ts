import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  persistReducer,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { searchApi } from "./services/search";
import favouriteSlice from "./reducers/favouriteSlice";

const persistConfig = {
  key: "root",
  version: 1,
  whitelist: ["favourites"],
  storage,
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    [searchApi.reducerPath]: searchApi.reducer,
    favourites: favouriteSlice,
  })
);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(searchApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
