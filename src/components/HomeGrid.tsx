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
import { getCakes, likeItem, type cake } from "../database/SupabaseLogic";
import { useEffect } from "react";
import { showSnackBar } from "../redux/SnackBarStore";
import { addToCart, removeFromCart } from "../redux/CartStore";

function HomeGrid() {
  //my variables and states
  const dispatch = useAppDispatch();
  const { cakes, error, isLoading } = useAppSelector((state) => state.database);
  const { likedItems, isLoggedIn, userId } = useAppSelector(
    (state) => state.auth,
  );
  const cartItems = useAppSelector((state) => state.cart.cartItems);
  //restore session
  // const handleRestoreSession = async () => {
  //   const r = await dispatch(getSession());
  //   if (getSession.pending.match(r)) {
  //     dispatch(
  //       showSnackBar({
  //         isOpen: true,
  //         message: message,
  //       }),
  //     );
  //     return false;
  //   }
  //   if (getSession.rejected.match(r)) {
  //     dispatch(
  //       showSnackBar({
  //         isOpen: true,
  //         message: message,
  //       }),
  //     );
  //     return false;
  //   }
  //   if (getSession.fulfilled.match(r)) {
  //     dispatch(
  //       showSnackBar({
  //         isOpen: true,
  //         message: message,
  //       }),
  //     );
  //     return true;
  //   }
  // };

  //fetching cakes
  useEffect(() => {
    const fetchCakes = async () => {
      await dispatch(getCakes());
    };
    fetchCakes();
  }, [dispatch]);

  //adding to cart
  const handleAddToCart = async (item: cake) => {
    if (!isLoggedIn) {
      return dispatch(
        showSnackBar({
          isOpen: true,
          message: "You have to be logged in first",
        }),
      );
    }
    if (cartItems.some((c) => c.cake.cake_id === item.cake_id)) {
      dispatch(removeFromCart(item));
      dispatch(
        showSnackBar({
          isOpen: true,
          message: "Item removed from cart",
        }),
      );
    }
    dispatch(addToCart(item));
    dispatch(
      showSnackBar({
        isOpen: true,
        message: "Item added to cart",
      }),
    );
  };

  //handling item likes
  const handleLikeItem = async (item: cake) => {
    if (!isLoggedIn) {
      return dispatch(
        showSnackBar({
          isOpen: true,
          message: "You have to be logged in first",
        }),
      );
    } else {
      if (likedItems.some((c) => c === item.cake_id)) {
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
    }
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

                {isLoggedIn ? (
                  <CardActions>
                    <Stack spacing={2} direction={"row"}>
                      <Button
                        onClick={() => handleLikeItem(item)}
                        endIcon={
                          <FavoriteIcon
                            color={
                              likedItems.some((c) => c === item.cake_id)
                                ? "primary"
                                : "disabled"
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
                ) : null}
              </Card>
            ))}
          </>
        )}
      </Grid>
    </>
  );
}

export default HomeGrid;
