import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PostgrestResponse } from "@supabase/supabase-js";
import type { cake } from "../database/SupabaseLogic";
import { supabase } from "../supabaseconfig/SupabaseConfig";

//like item
interface likeItemProps {
  id: number;
  isLiked: boolean;
}

export const likeItem = createAsyncThunk(
  "likeItem",
  async ({ id, isLiked }: likeItemProps) => {
    var likes: PostgrestResponse<cake> = await supabase
      .from("cake")
      .select("*")
      .eq("cake_id", id);
    if (likes.data === null) {
      return "Something went wrong";
    }
    const newLikes: number = isLiked
      ? likes.data[0].likes + 1
      : likes.data[0].likes - 1;
    const { error } = await supabase
      .from("cake")
      .upsert({ likes: newLikes })
      .eq("cake_id", id);

    if (error) {
      return error.message;
    }
  },
);

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
