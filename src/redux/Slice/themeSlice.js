import { createSlice } from "@reduxjs/toolkit";

//Slice initial state
const initialState = {
  theme: "light-theme",
  BackgroundColor: "rgb(62, 107, 247)",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
    setBackgroundColor: (state, action) => {
      state.BackgroundColor = action.payload;
    },
  },
});

export const { setTheme, setBackgroundColor } = themeSlice.actions;
export default themeSlice.reducer;
