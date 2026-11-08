import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../config/api";

// Fetch problems from backend
export const fetchProblems = createAsyncThunk(
  "problems/fetchProblems",
  async () => {
    const response = await fetch(`${API}/api/problems`);

    if (!response.ok) {
      throw new Error("Failed to fetch problems");
    }

    return await response.json();
  }
);

// Initial state
const initialState = {
  problems: [],
  loading: false,
  error: null,
};

// Create slice
const problemsSlice = createSlice({
  name: "problems",
  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchProblems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchProblems.fulfilled, (state, action) => {
        state.loading = false;
        state.problems = action.payload;
      })

      .addCase(fetchProblems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default problemsSlice.reducer;