import { configureStore } from "@reduxjs/toolkit";
import * as reactRedux from "react-redux";
import snackBarStore from "./SnackBarStore";
import authStore from "./AuthStore";
import cartStore from "./CartStore";
import databaseStore from "./DatabaseStore";
export const store = configureStore({
  reducer: {
    auth: authStore,
    database: databaseStore,
    cart: cartStore,
    snackBar: snackBarStore,
  },
});

export const useAppDispatch: () => typeof store.dispatch =
  reactRedux.useDispatch;
export const useAppSelector: reactRedux.TypedUseSelectorHook<
  ReturnType<typeof store.getState>
> = reactRedux.useSelector;
