import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,   // Tracks authentication status
  currentUser: null,        // Holds the user data after successful login
  error: null,              // Tracks any errors
  loading: false,           // Tracks loading status for async actions
};

const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Sign In Actions
    signInStart: (state) => {
      state.loading = true;
      state.error = null;    // Reset error on new sign-in attempt
    },
    signInSuccess: (state, action) => {
      state.isAuthenticated = true;  // User is authenticated
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    signInFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
      state.isAuthenticated = false;  // Reset authentication status on failure
    },

    // Update User Actions
    updateUserStart: (state) => {
      state.loading = true;
    },
    updateUserSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    updateUserFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    // Delete User Actions
    deleteUserStart: (state) => {
      state.loading = true;
    },
    deleteUserSuccess: (state) => {
      state.isAuthenticated = false; // Reset authentication
      state.currentUser = null;
      state.loading = false;
      state.error = null;
    },
    deleteUserFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    // Sign Out Actions
    signOutUserStart: (state) => {
      state.loading = true;
    },
    signOutUserSuccess: (state) => {
      state.isAuthenticated = false; // Reset authentication
      state.currentUser = null;
      state.loading = false;
      state.error = null;
    },
    signOutUserFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    // Log Out (also used for manual logout)
    logout: (state) => {
      state.isAuthenticated = false;
      state.currentUser = null;
      state.error = null;
    },
  },
});

export const {
  signInStart,
  signInSuccess,
  signInFailure,
  updateUserFailure,
  updateUserSuccess,
  updateUserStart,
  deleteUserFailure,
  deleteUserSuccess,
  deleteUserStart,
  signOutUserFailure,
  signOutUserSuccess,
  signOutUserStart,
  logout,
} = authSlice.actions;

export default authSlice.reducer;
