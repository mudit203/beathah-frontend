'use client';

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";

import dynamicDataReducer from "./slice/dynamicDataSlice";
import settingReducer from "./slice/settingSlice";

// Fix for SSR: handle storage in non-browser environments
const createNoopStorage = () => {
  return {
    getItem(_key: string) {
      return Promise.resolve(null);
    },
    setItem(_key: string, value: any) {
      return Promise.resolve();
    },
    removeItem(_key: string) {
      return Promise.resolve();
    },
  };
};

const storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createNoopStorage();

const persistConfig: any = {
  key: "root",
  version: 1,
  storage,
};

const rootReducer = combineReducers({
  setting: settingReducer,
  data: dynamicDataReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const reduxStore = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware: any) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export default reduxStore;
