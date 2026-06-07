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
import { getCakes, type cake } from "../database/SupabaseLogic";
import { useEffect } from "react";

function HomeGrid() {
  const dispatch = useAppDispatch();
  const { cakes, error, isLoading } = useAppSelector((state) => state.database);
  const cartItems = useAppSelector((state) => state.cart.cartItems);
  const { isLoggedIn } = useAppSelector((state) => state.auth);

  useEffect(() => {
    const fetchCakes = async () => {
      await dispatch(getCakes());
    };
    fetchCakes();
  }, [dispatch]);
  const handleAddToCart = (item: cake) => {
    if (cartItems.some((c) => c.cake.cake_id === item.cake_id)) {
      dispatch(removeFromCart(item));
    }
    dispatch(addToCart(item));
  };

  return (
    <>
      <Grid
        sx={HomeGridStyles.grid}
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
                      endIcon={
                        <FavoriteIcon
                        //color={item.isLiked ? "primary" : "disabled"}
                        />
                      }
                      size="small"
                      title="likes"
                    >
                      {item.likes}
                    </Button>
                    {isLoggedIn ? (
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
                    ) : null}
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
