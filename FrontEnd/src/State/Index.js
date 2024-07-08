import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  user: null,
  token: null,
  posts: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "ligth";
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setFriends: (state, action) => {
      if (state.user) {
        state.user.friends = action.payload.friends;
      } else {
        console.error("User Friend not exist :/");
      }
    },
    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },
    setPost: (state, action) => {
      const UpdatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.posts._id) return action.payload.posts;
      });
      state.posts = UpdatedPosts;
    },
  },
});

export const { setMode, setFriends, setLogin, setLogout, setPost, setPosts } =
  authSlice.actions;
export default authSlice.reducer;
