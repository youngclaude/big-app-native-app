import axios from "axios";
// import WPErrorMessageTranslations from "../error-message-translations";
export const appData = {
  name: "appData",
  state: {
    mode: {
      color: "light",
      clientOrWorker: "client",
    },
    // userInfo: {},
  },
  reducers: {
    toggleClientOrWorkerModes(state, payload) {
      return {
        ...state,
        mode: {
          ...state.mode,
          clientOrWorker:
            state.mode.clientOrWorker === "client" ? "worker" : "client",
        },
      };
    },
    storeUserAuthData(state, payload) {
      return {
        userData: {
          authToken: payload.token,
          user_display_name: payload.user_display_name,
          user_email: payload.user_email,
          user_nicename: payload.user_nicename,
        },
      };
    },
    storeUserInfo(state, payload) {
      return {
        ...state,
        userInfo: {
          ...payload,
        },
      };
    },
    clearUserAuthData(state, payload) {
      return {
        userData: {},
        userInfo: {},
      };
    },
  },
  effects: ({ dispatch }) => ({}),
};
