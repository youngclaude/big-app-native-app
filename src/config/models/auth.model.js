import axios from "axios";
// import WPErrorMessageTranslations from "../error-message-translations";
export const authModel = {
  name: "authModel",
  state: {
    userData: {
      authToken: "",
      user_display_name: "",
      user_email: "",
      user_nicename: "",
    },
    userInfo: {},
  },
  reducers: {
    increment(state, payload) {
      return state + payload;
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
  effects: ({ dispatch }) => ({
    async testAuthFunc() {
      this.clearUserAuthData(); // This works
    },
    async loginToWP(payload, state) {
      console.log("loginToWP: ", { payload });

      const authAttemptData = {
        username: payload.userName,
        password: payload.passWord,
      };

      let axiosConfig = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const returnData = await axios
        .post(
          "https://www.bigapp.work/wp-json/jwt-auth/v1/token",
          authAttemptData,
          axiosConfig
        )
        .then(function (response) {
          // handle successful request not successful login
          console.log("Success", response);
          return response.data;
        })
        .catch(function (error) {
          // handle error
          console.log("Failure", error);
          // const translatedError = WPErrorMessageTranslations.find(
          //   (givenObj, index) => givenObj.code === error.response.data.code
          // );
          // handleError(error);
          throw translatedError ?? error;
        });

      // await console.log({ returnData });

      await this.storeUserAuthData(returnData);
      await this.getWPUserData(returnData);

      return returnData;
    },
    async getWPUserData(payload, state) {
      console.log("from getWPUserData! ");
      console.log("payload:", payload);

      const storeInfo = (data) => {
        this.storeUserInfo(data);
      };

      let axiosConfig = {
        headers: {
          Authorization: `Bearer ${payload.token}`,
        },
      };

      axios
        .get("https://www.bigapp.work/wp-json/wp/v2/users/me", axiosConfig)
        .then(function (response) {
          console.log({ response });
          console.log("user data retrieved successfully");
          storeInfo(response.data);
        })
        .catch(function (error) {
          console.log({ error });
        });
    },
    async postAJob(payload, state) {
      console.log("from postAJob! ");
      console.log("payload:", payload);
      console.log("state:", state);

      const storeInfo = (data) => {
        this.storeUserInfo(data);
      };

      let axiosConfig = {
        headers: {
          Authorization: `Bearer ${state.authModel.userData.authToken}`,
        },
      };

      const dataToSend = {
        title: "RC Test Job 3 FROM App",
        content: "This is a test post 3 to prove that the App is working",
        status: "draft",
      };

      axios
        .post(
          "https://www.bigapp.work/wp-json/wp/v2/job-listings",
          payload,
          axiosConfig
        )
        .then(function (response) {
          console.log({ response });
          console.log("user job post sent successfully");
          // storeInfo(response.data);
        })
        .catch(function (error) {
          console.log({ error });
        });
    },
    async logout(payload, state) {
      this.clearUserAuthData();
    },
    async testFunc1(payload, state) {
      console.log("from: testFunc1");
      console.log({ payload });
      // return 365;
      throw "Nahh son";
      // this.testFunc2();
    },
    async testFunc2(payload, state) {
      console.log("from: testFunc2");
    },
  }),
};
