import { createSlice } from "@reduxjs/toolkit";

// Creating a slice for managing job-related state
export const jobSlice = createSlice({
  name: "job",
  initialState: {
    searchTitle: "",
    selectedLocation: [],
    selectedRoles: [],
  },
  reducers: {
    setSearchTitle: (state, action) => {
      state.searchTitle = action.payload;
    },
    setSelectedLocation: (state, action) => {
      state.selectedLocation = action.payload;
    },
    setSelectedRoles: (state, action) => {
      state.selectedRoles = action.payload;
    },
  },
});

export const { setSearchTitle, setSelectedLocation, setSelectedRoles } =
  jobSlice.actions;

// Selectors to access state values
export const selectSearchTitle = (state) => state.job.searchTitle;
export const selectSelectedLocation = (state) => state.job.selectedLocation;
export const selectSelectedRoles = (state) => state.job.selectedRoles;

export default jobSlice.reducer;
