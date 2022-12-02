import { init } from "@rematch/core";
import persistPlugin, { createPersistPlugin } from "@rematch/persist";
// import { createPersistPlugin } from "@rematch/persist";
// import { storage as ReduxStorage } from "redux-persist/lib/storage";
import storage from "redux-persist/lib/storage";
// import createWebStorage from "redux-persist/es/storage/createWebStorage";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import storage from "react-native-encrypted-storage";

import models from "./models";

const createNoopStorage = () => {
  return {
    getItem(_key) {
      return Promise.resolve(null);
    },
    setItem(_key, value) {
      return Promise.resolve(value);
    },
    removeItem(_key) {
      return Promise.resolve();
    },
  };
};

// const storage =
//   typeof window !== "undefined"
//     ? createWebStorage("local")
//     : createNoopStorage();
//  AsyncStorage

const persistConfig = {
  key: "root",
  storage,
};

// const persistPlugin = createPersistPlugin({
//   key: "root",
//   storage: AsyncStorage,
//   version: 2,
//   whitelist: ["persisted", "authModel"],
// });

// experiment
// export const store = init({
//   models,
//   plugins: [persistPlugin],
// });

export const store = init({
  models,
  plugins: [persistPlugin(persistConfig)],
});
