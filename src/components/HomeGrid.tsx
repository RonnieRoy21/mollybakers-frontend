import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  CardMedia,
  Typography,
  CardActions,
  IconButton,
  Stack,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import CheckIcon from "@mui/icons-material/Check";
import { useState } from "react";
import HomeGridStyles from "../styles/homegrid";

const items: number[] = [
  10, 2, 45, 3, 7, 9, 4, 30, 47, 1, 6, 5, 23, 60, 50, 87, 19,
];

function HomeGrid() {
  const [cartItems, setCartItems] = useState<number[]>([]);
  const [likedItems, setLikedItems] = useState<number[]>([]);

  const handleAddToCart = (item: number) => {
    if (cartItems.includes(item)) {
      setCartItems(cartItems.filter((t) => t !== item));
      return;
    }
    setCartItems([...cartItems, item]);
  };

  const handleLikeCake = (item: number) => {
    if (likedItems.includes(item)) {
      setLikedItems(likedItems.filter((t) => t !== item));
    } else {
      setLikedItems([...likedItems, item]);
    }
  };
  return (
    <>
      <Grid sx={HomeGridStyles.grid} container spacing={1} rowSpacing={3}>
        {items.map((item, index) => (
          <Card
            key={index}
            sx={HomeGridStyles.card}
            variant="outlined"
            elevation={3}
          >
            <CardMedia
              component="img"
              height={100}
              image="https://imgs.search.brave.com/fAElvsxwDcHa133QnF78DAYxsteyhYPJ0sBpNHFcx6A/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9wbGF0/ZWRjcmF2aW5ncy5j/b20vd3AtY29udGVu/dC91cGxvYWRzLzIw/MjUvMDkvQmxhY2st/Rm9yZXN0LUNha2Ut/UmVjaXBlLVBsYXRl/ZC1DcmF2aW5ncy0y/LTMwMHgzMDAuanBn"
            />
            <CardContent>
              <Typography align="left" variant="body1">
                {item.toString()}
              </Typography>
              <Typography noWrap>
                Cake Description appears here on this part
              </Typography>
              <Typography noWrap>Ksh</Typography>
            </CardContent>
            <CardActions>
              <Stack direction={"row"}>
                <Stack sx={HomeGridStyles.cardActionStack}>
                  <IconButton
                    onClick={() => handleLikeCake(item)}
                    color={likedItems.includes(item) ? "primary" : "default"}
                  >
                    <FavoriteIcon />
                  </IconButton>
                </Stack>
                <Stack>
                  <IconButton
                    onClick={() => handleAddToCart(item)}
                    color={cartItems.includes(item) ? "success" : "default"}
                  >
                    {cartItems.includes(item) ? (
                      <CheckIcon />
                    ) : (
                      <AddShoppingCartIcon />
                    )}
                  </IconButton>
                </Stack>
              </Stack>
            </CardActions>
          </Card>
        ))}
      </Grid>
    </>
  );
}

export default HomeGrid;
