// postApiSlice.js

import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
  name: "post",
  initialState: {
    tasks: [],
  },
  reducers: {
    addTaskLocally(state, action) {
      state.tasks.push(action.payload);
    },
  },
});

export const { addTaskLocally } = postSlice.actions;

export default postSlice.reducer;
