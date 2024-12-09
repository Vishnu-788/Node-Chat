import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  user: string | null;
  email: string | null;
  token: string | null;
  pfp_url: string | null;
}

const storedUser = localStorage.getItem("auth");

const initialState: User = storedUser
  ? JSON.parse(storedUser)
  : {
      user: null,
      email: null,
      token: null,
      pfp_url: null,
    };

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    Login: (
      state,
      action: PayloadAction<{
        user: string;
        email: string;
        token: string;
        url: string;
      }>
    ) => {
      state.user = action.payload.user;
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.pfp_url = action.payload.url;
      localStorage.setItem("auth", JSON.stringify(state));
    },

    Logout: (state) => {
      if (state.user) {
        localStorage.removeItem("auth");
      }
      state.user = null;
      state.email = null;
      state.token = null;
      state.pfp_url = null;
    },
  },
});

export const { Login, Logout } = userSlice.actions;
export default userSlice.reducer;
