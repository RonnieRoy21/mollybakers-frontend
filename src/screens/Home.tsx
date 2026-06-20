import { useState } from "react";
import {
  Grid,
  TextField,
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActions,
  Stack,
  Button,
  IconButton,
} from "@mui/material";
import MoreIcon from "@mui/icons-material/More";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import HomeGridStyles from "../styles/homegrid";
import { useAppDispatch, useAppSelector } from "../redux/config";
import { getCakes, type cake } from "../database/SupabaseLogic";
import { useEffect } from "react";
import { showSnackBar } from "../redux/SnackBarStore";
import { addToCart, removeFromCart } from "../redux/CartStore";
import ViewMore from "../components/ViewMore";

function Home() {
  //my variables and states
  const dispatch = useAppDispatch();
  const { cakes, error, isLoading } = useAppSelector((state) => state.database);
  const { isLoggedIn } = useAppSelector((state) => state.auth);
  const cartItems = useAppSelector((state) => state.cart.cartItems);
  const [searchList, setSearchList] = useState<cake[]>([]);
  const [itemToView, setItemToView] = useState<cake | null>(null);

  const handleSearchItem = (word: string) => {
    setSearchList(
      cakes.filter((w) =>
        w.cake_name
          ?.toLocaleLowerCase()
          .trim()
          .includes(word.trim().toLocaleLowerCase()),
      ),
    );
  };

  //adding to cart
  const handleAddToCart = async (item: cake) => {
    if (cartItems.some((c) => c.cake.cake_id === item.cake_id)) {
      dispatch(removeFromCart(item));
      return dispatch(
        showSnackBar({
          isOpen: true,
          message: "Item removed from cart",
        }),
      );
    }
    dispatch(addToCart(item));
    return dispatch(
      showSnackBar({
        isOpen: true,
        message: "Item added to cart",
      }),
    );
  };

  const fetchCakes = async () => {
    await dispatch(getCakes());
  };
  //fetching cakes
  useEffect(() => {
    fetchCakes();
  }, [dispatch]);

  return (
    <>
      <Stack
        sx={{
          backgroundColor: "skyblue",
          opacity: 1,
        }}
      >
        <Stack
          spacing={1}
          sx={{
            backgroundColor: "whitesmoke",
            position: "sticky",
            top: 0,
            opacity: 1,
            zIndex: 10,
            flexDirection: {
              xs: "column",
              sm: "column",
              md: "row",
              lg: "row",
            },
          }}
        >
          <TextField
            sx={{ height: "fit-content", backgroundColor: "darkgrey" }}
            variant="outlined"
            label="Search..."
            onChange={(e) => handleSearchItem(e.target.value)}
          />
        </Stack>
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
              <Typography sx={{ alignContent: "center" }}>
                Loading...
              </Typography>
            ) : error ? (
              <Typography sx={{ alignContent: "center" }}>{error}</Typography>
            ) : (
              <>
                {(searchList.length === 0 ? cakes : searchList).map(
                  (item, index) => (
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
                        <Typography
                          sx={HomeGridStyles.texts}
                          noWrap
                          variant="body2"
                        >
                          Ksh. {item.cake_price}
                        </Typography>
                      </CardContent>

                      <CardActions>
                        <Stack spacing={2} direction={"row"}>
                          <Button
                            variant="outlined"
                            onClick={() => {
                              setItemToView(item);
                            }}
                            endIcon={<MoreIcon />}
                            size="small"
                            title="likes"
                          >
                            View
                          </Button>
                          {isLoggedIn ? (
                            <IconButton
                              color={
                                cartItems.some(
                                  (c) => c.cake.cake_id === item.cake_id,
                                )
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
                  ),
                )}
              </>
            )}
          </Grid>
          {itemToView && (
            <ViewMore
              c={itemToView!}
              isOpen={itemToView ? true : false}
              onClose={() => setItemToView(null)}
            />
          )}
        </>
      </Stack>
    </>
  );
}

export default Home;
