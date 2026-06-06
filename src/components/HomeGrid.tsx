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
import type { CakeModel } from "../models/ItemModel";
import { useAppDispatch, useAppSelector } from "../redux/config";
import { addToCart, removeFromCart } from "../redux/CartStore";

const items: CakeModel[] = [
  {
    id: 1,
    name: "Chocolate Fudge ",
    description: "Rich chocolate sponge layered with creamy fudge frosting.",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587",
    likes: 128,
    isLiked: false,
    quantity: 1,
  },
  {
    id: 2,
    name: "Red Velvet",
    description: "Classic red velvet cake with smooth cream cheese frosting.",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1586788680434-30d324d324f8",
    likes: 96,
    isLiked: true,
    quantity: 1,
  },
  {
    id: 3,
    name: "Vanilla Bean",
    description: "Light and fluffy vanilla cake made with real vanilla beans.",
    price: 22.5,
    image: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3",
    likes: 74,
    isLiked: false,
    quantity: 1,
  },
  {
    id: 4,
    name: "Strawberry Shortcake",
    description:
      "Fresh strawberries layered with whipped cream and sponge cake.",
    price: 27.99,
    image: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e",
    likes: 112,
    isLiked: true,
    quantity: 1,
  },
  {
    id: 5,
    name: "Black Forest",
    description: "Chocolate cake layered with cherries and whipped cream.",
    price: 31.99,
    image: "https://images.unsplash.com/photo-1551024506-0bccd828d307",
    likes: 143,
    isLiked: false,
    quantity: 1,
  },
  {
    id: 6,
    name: "Lemon Drizzle",
    description: "Moist lemon cake topped with a tangy citrus glaze.",
    price: 21.99,
    image: "https://images.unsplash.com/photo-1621303837174-89787a7d4729",
    likes: 58,

    isLiked: false,
    quantity: 1,
  },
  {
    id: 7,
    name: "Carrot Cake",
    description: "Spiced carrot cake with walnuts and cream cheese frosting.",
    price: 25.99,
    image: "https://images.unsplash.com/photo-1623428454614-abafdeff8b45",
    likes: 89,
    isLiked: true,
    quantity: 1,
  },
  {
    id: 8,
    name: "Cheesecake Delight",
    description: "Creamy baked cheesecake with a buttery biscuit crust.",
    price: 33.5,
    image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad",
    likes: 167,
    isLiked: false,
    quantity: 1,
  },
  {
    id: 9,
    name: "Rainbow Celebration",
    description: "Colorful layered cake perfect for birthdays and parties.",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1571115177098-24ec42ed204d",
    likes: 201,
    isLiked: true,
    quantity: 1,
  },
  {
    id: 10,
    name: "Tiramisu Cake",
    description: "Coffee-infused cake with mascarpone cream and cocoa dusting.",
    price: 34.99,
    image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9",
    likes: 121,
    isLiked: false,

    quantity: 1,
  },
];

function HomeGrid() {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.cartItems);

  const handleAddToCart = (item: CakeModel) => {
    if (cartItems.some((c) => c.id === item.id)) {
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
        {items.map((item, index) => (
          <Card
            key={index}
            sx={HomeGridStyles.card}
            variant="outlined"
            elevation={3}
          >
            <CardMedia component="img" height={100} image={item.image} />
            <CardContent>
              <Typography sx={HomeGridStyles.texts} align="left" variant="h6">
                {item.name}
              </Typography>
              <Typography sx={HomeGridStyles.texts} noWrap variant="body2">
                Ksh {item.price}
              </Typography>
            </CardContent>
            <CardActions>
              <Stack spacing={2} direction={"row"}>
                <Button
                  endIcon={
                    <FavoriteIcon
                      color={item.isLiked ? "primary" : "disabled"}
                    />
                  }
                  size="small"
                  title="likes"
                >
                  {item.likes}
                </Button>
                <IconButton
                  color={
                    cartItems.some((c) => c.id === item.id)
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
      </Grid>
    </>
  );
}

export default HomeGrid;
