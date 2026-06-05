import { createSlice } from "@reduxjs/toolkit";
// interface authDetails {
//   email: string;
//   password: string;
// }
export const authStore = createSlice({
  name: "login",
  initialState: {
    isLoggedIn: false,
    userId: "",
  },
  reducers: {
    login: (state) => {
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.isLoggedIn = false;
    },
  },
});
export default authStore.reducer;
export const { login, logout } = authStore.actions;
