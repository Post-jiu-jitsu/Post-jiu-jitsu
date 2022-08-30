import { configureStore, createSlice } from "@reduxjs/toolkit";

// cursor state for change animate prop in modition.div
// (App.js) cursorVariants: define animation and animate prop names
const cursorSlice = createSlice({
  name: "cursor",
  initialState: "default",
  // change state in other element/component/file ... -> matching animate prop will occur
  // getState:   const cursor = useStore().getState();
  // dispatchState:
  // import reducer and call it with animate prop name
  reducers: {
    cursorDefault: (state) => "default",
    cursorHomeTitle: (state, action) => "homeTitle",
  },
});

const cursorStore = configureStore({ reducer: cursorSlice.reducer });
export const { cursorDefault, cursorHomeTitle } = cursorSlice.actions;
export default cursorStore;
