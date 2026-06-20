import { supabase } from "../supabaseconfig/SupabaseConfig";
import type { Database } from "../supabaseconfig/supabase";
import { createAsyncThunk } from "@reduxjs/toolkit";

export type user = Database["public"]["Tables"]["customers"]["Row"];
export type cake = Database["public"]["Tables"]["cake"]["Row"];
export type order = Database["public"]["Tables"]["orders"]["Row"];

//add item to cart
interface cartItem {
  cakeId: number;
  userId: string;
}
export const addItemToCart = createAsyncThunk(
  "addItemToCart",
  async ({ cakeId, userId }: cartItem) => {
    // get  user's existing cart
    var existingCart = (
      await supabase
        .from("customers")
        .select("cart_items")
        .eq("customer_id", userId)
        .single()
    ).data!;
    var cartItems = existingCart.cart_items;
    // check if cake id exists already
    if (cartItems.some((c) => c === cakeId)) {
      cartItems = cartItems.filter((c) => c !== cakeId);
    } else {
      cartItems.push(cakeId);
    }
    await supabase.from("customers").update({ cart_items: cartItems });
  },
);

//sign up
interface signUpProps {
  Email: string;
  Password: string;
  loc: string;
  phone: string;
}
interface signInProps {
  Email: string;
  Password: string;
}
export const signUp = createAsyncThunk<
  string,
  signUpProps,
  { rejectValue: string }
>("sign-up", async ({ Email, Password, loc, phone }: signUpProps, thunkAPI) => {
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
  await supabase.from("customers").insert({
    customer_id: data.user.id,
    email: data.user.email,
    liked_items: [],
    location: loc,
    phone_number: phone,
    cart_items: [],
  });

  return data.user!.id;
});

//restore session
export const getSession = createAsyncThunk<
  { id: string; msg: string },
  void,
  { rejectValue: string }
>("get-session", async (_, thunkAPI) => {
  const { data } = await supabase.auth.getSession();
  if (data.session === null || data.session?.user.id === null) {
    return thunkAPI.rejectWithValue("Login again to proceed");
  }
  return { id: data.session.user.id, msg: "Page Refreshed." };
});

export const signIn = createAsyncThunk<
  user,
  signInProps,
  { rejectValue: string }
>("sign-in", async ({ Email, Password }: signInProps, thunkAPI) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: Email,
    password: Password,
  });
  if (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
  if (data.user === null) {
    return thunkAPI.rejectWithValue("Login Failed");
  }
  const user = (
    await supabase
      .from("customers")
      .select("*")
      .eq("customer_id", data.user.id)
      .single()
  ).data!;

  return user;
});

//sign out
export const logoutUser = createAsyncThunk<
  boolean,
  void,
  { rejectValue: string }
>("logout", async (_, thunkAPI) => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
  return true;
});

//get cakes
export const getCakes = createAsyncThunk<cake[], void, { rejectValue: string }>(
  "get-cakes",
  async (_, thunkAPI) => {
    const { data, error } = await supabase.from("cake").select("*");

    if (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
    if (data === null) {
      return thunkAPI.rejectWithValue("No Stock found");
    }

    return data ?? [];
  },
);
