import { createSlice } from "@reduxjs/toolkit";
import { getCakes, likeItem, type cake } from "../database/SupabaseLogic";

//like item

const databaseStore = createSlice({
  name: "database",
  initialState: {
    cakes: [] as cake[],
    error: "",
    isLiked: false,
    isLoading: false,
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(likeItem.pending, (state) => {
        state.isLiked = false;
      })
      .addCase(likeItem.fulfilled, (state) => {
        state.isLiked = true;
      })
      .addCase(likeItem.rejected, (state) => {
        state.isLiked = false;
      })
      .addCase(getCakes.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCakes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cakes = action.payload;
      })
      .addCase(getCakes.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload!.toString();
      });
  },
});

export default databaseStore.reducer;
