import { createSlice } from "@reduxjs/toolkit";
import { likeItem } from "../database/SupabaseLogic";

//like item

const databaseSlice = createSlice({
  name: "database",
  initialState: {
    data: [],
    error: "",
    success: false,
    isLoading: false,
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(likeItem.fulfilled, (state) => {
        state.success = true;
      })
      .addCase(likeItem.rejected, (state) => {
        state.success = false;
      });
  },
});

export default databaseSlice.reducer;
