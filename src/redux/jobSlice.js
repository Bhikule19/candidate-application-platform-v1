import { createSlice } from "@reduxjs/toolkit";

// Creating a slice for managing job-related state
export const jobSlice = createSlice({
  name: "job",
  initialState: {
    searchTitle: "",
    selectedLocation: [],
    selectedRoles: [],
    selectedExp: [],
    selectedSal: [],
    selectedLocationType: [],
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
    setSelectedExp: (state, action) => {
      state.selectedExp = action.payload;
    },
    setSelectedSal: (state, action) => {
      state.selectedSal = action.payload;
    },
    setSelectedLocationType: (state, action) => {
      state.selectedLocationType = action.payload;
    },
  },
});

export const {
  setSearchTitle,
  setSelectedLocation,
  setSelectedRoles,
  setSelectedExp,
  setSelectedSal,
  setSelectedLocationType,
} = jobSlice.actions;

// Selectors to access state values
export const selectSearchTitle = (state) => state.job.searchTitle;
export const selectSelectedLocation = (state) => state.job.selectedLocation;
export const selectSelectedRoles = (state) => state.job.selectedRoles;
export const selectSelectedExp = (state) => state.job.selectedExp;
export const selectSelectedSal = (state) => state.job.selectedSal;
export const selectSelectedLocationType = (state) =>
  state.job.selectedLocationType;

export default jobSlice.reducer;
