import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActions,
  Stack,
  Button,
  IconButton,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import HomeGridStyles from "../styles/homegrid";
import { useAppDispatch, useAppSelector } from "../redux/config";
import { addToCart, removeFromCart } from "../redux/CartStore";
import {
  getCakes,
  getSession,
  likeItem,
  type cake,
} from "../database/SupabaseLogic";
import { useEffect, useState } from "react";
import { showSnackBar } from "../redux/SnackBarStore";

function HomeGrid() {
  //my variables and states
  const [likedItems, setLikedItems] = useState<cake[]>([]);
  const dispatch = useAppDispatch();
  const { cakes, error, isLoading } = useAppSelector((state) => state.database);
  const cartItems = useAppSelector((state) => state.cart.cartItems);
  const { isLoggedIn, userId, message } = useAppSelector((state) => state.auth);

  //restore session
  const handleRestoreSession = async () => {
    await dispatch(getSession());
    if (getSession.pending.match(message)) {
      dispatch(
        showSnackBar({
          isOpen: true,
          message: message,
        }),
      );
      return false;
    }
    if (getSession.rejected.match(message)) {
      dispatch(
        showSnackBar({
          isOpen: true,
          message: message,
        }),
      );
      return false;
    }
    if (getSession.fulfilled.match(message)) {
      dispatch(
        showSnackBar({
          isOpen: true,
          message: message,
        }),
      );
      return true;
    }
    return false;
  };
  //fetching cakes
  useEffect(() => {
    const fetchCakes = async () => {
      await dispatch(getCakes());
    };
    fetchCakes();
  }, [dispatch]);

  //adding to cart
  const handleAddToCart = async (item: cake) => {
    if (!isLoggedIn && (await handleRestoreSession()) === false) {
      return dispatch(
        showSnackBar({
          isOpen: true,
          message: "You have to be logged in first",
        }),
      );
    }
    if (cartItems.some((c) => c.cake.cake_id === item.cake_id)) {
      dispatch(removeFromCart(item));
    }
    dispatch(addToCart(item));
  };

  //handling item likes
  const handleLikeItem = async (item: cake) => {
    if (!isLoggedIn && !(await handleRestoreSession())) {
      return dispatch(
        showSnackBar({
          isOpen: true,
          message: "You have to be logged in first",
        }),
      );
    }
    if (likedItems.some((c) => c.cake_id === item.cake_id)) {
      setLikedItems(likedItems.filter((f) => f.cake_id !== item.cake_id));
      const r = await dispatch(
        likeItem({ userId: userId, itemId: item.cake_id, isLiked: false }),
      );
      if (likeItem.fulfilled.match(r)) {
        dispatch(
          showSnackBar({
            isOpen: true,
            message: "Help us improve by commenting.",
          }),
        );
      }
      return;
    }
    setLikedItems((prev) => [...prev, item]);
    const r = await dispatch(
      likeItem({ userId: userId, itemId: item.cake_id, isLiked: true }),
    );
    if (likeItem.fulfilled.match(r)) {
      dispatch(
        showSnackBar({
          isOpen: true,
          message: "Glad you love it.",
        }),
      );
    }
    return;
  };
  return (
    <>
      <Grid
        sx={{
          paddingBottom: 10,
          marginTop: 2,
          height: "100%",
          width: "100%",
          justifyContent: "center",
        }}
        size={{
          xs: 12,
          sm: 6,
          md: 4,
          lg: 3,
          xl: 2,
        }}
        container
        spacing={1}
        rowSpacing={2}
      >
        {isLoading ? (
          <Typography sx={{ alignContent: "center" }}>Loading...</Typography>
        ) : error ? (
          <Typography sx={{ alignContent: "center" }}>{error}</Typography>
        ) : (
          <>
            {cakes.map((item, index) => (
              <Card
                key={index}
                sx={HomeGridStyles.card}
                variant="outlined"
                elevation={3}
              >
                <CardMedia
                  component="img"
                  height={100}
                  image={item.cake_url!}
                />
                <CardContent>
                  <Typography
                    sx={HomeGridStyles.texts}
                    align="left"
                    variant="h6"
                  >
                    {item.cake_name}
                  </Typography>
                  <Typography sx={HomeGridStyles.texts} noWrap variant="body2">
                    Ksh {item.cake_price}
                  </Typography>
                </CardContent>

                <CardActions>
                  <Stack spacing={2} direction={"row"}>
                    <Button
                      onClick={() => handleLikeItem(item)}
                      endIcon={
                        <FavoriteIcon
                          color={
                            likedItems.includes(item) ? "primary" : "disabled"
                          }
                        />
                      }
                      size="small"
                      title="likes"
                    >
                      {item.likes}
                    </Button>

                    <IconButton
                      color={
                        cartItems.some((c) => c.cake.cake_id === item.cake_id)
                          ? "secondary"
                          : "default"
                      }
                      title="Add to cart"
                      onClick={() => handleAddToCart(item)}
                    >
                      <ShoppingCartIcon />
                    </IconButton>
                  </Stack>
                </CardActions>
              </Card>
            ))}
          </>
        )}
      </Grid>
    </>
  );
}

export default HomeGrid;
