// import type { PostgrestResponse } from "@supabase/supabase-js";
import type { PostgrestResponse } from "@supabase/supabase-js";
import { supabase } from "../supabaseconfig/SupabaseConfig";
import type { Database } from "../supabaseconfig/supabase";
import { createAsyncThunk } from "@reduxjs/toolkit";

export type user = Database["public"]["Tables"]["customers"]["Row"];
export type cake = Database["public"]["Tables"]["cake"]["Row"];
export type order = Database["public"]["Tables"]["orders"]["Row"];

//like an item
interface likeItemProps {
  id: number;
  isLiked: boolean;
}
export const likeItem = createAsyncThunk(
  "like-item",
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

//sign up
interface accountProps {
  Email: string;
  Password: string;
}
export const signUp = createAsyncThunk<
  string,
  accountProps,
  { rejectValue: string }
>("sign-up", async ({ Email, Password }: accountProps, thunkAPI) => {
  const { data, error } = await supabase.auth.signUp({
    email: Email,
    password: Password,
  });
  if (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
  if (data.user === null) {
    return thunkAPI.rejectWithValue("Account creation Failed");
  }
  return data.user!.id;
});

export const signIn = createAsyncThunk<
  string,
  accountProps,
  { rejectValue: string }
>("sign-in", async ({ Email, Password }: accountProps, thunkAPI) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: Email,
    password: Password,
  });
  if (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
  if (data.user === null) {
    return thunkAPI.rejectWithValue("Account creation Failed");
  }
  return data.user.id;
});
