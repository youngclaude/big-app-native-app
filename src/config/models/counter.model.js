// import types

// Define the model
export const countModel = {
  state: 0, // initial state
  reducers: {
    // handle state changes with pure functions
    increment(state, payload) {
      return state + payload;
    },
    decrement(state, payload) {
      return state - payload;
    },
  },
  effects: (dispatch) => ({
    // handle state changes with impure functions.
    // use async/await for async actions
    async incrementAsync(payload, rootState) {
      // wait 10 seconds then proceed
      await new Promise((resolve) => setTimeout(resolve, 10000));
      dispatch.countModel.increment(payload);
    },
  }),
};
