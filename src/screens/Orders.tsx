import {
  Container,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import type { cartItem } from "../models/cartItem";

function Orders() {
  const pastOrders: cartItem[] = [
    {
      id: 2,
      name: "Red Velvet",
      description: "Classic red velvet cake with smooth cream cheese frosting.",
      price: 29.99,
      image: "https://images.unsplash.com/photo-1586788680434-30d324d324f8",
      likes: 96,
      isLiked: true,
    },
    {
      id: 3,
      name: "Vanilla Bean",
      description:
        "Light and fluffy vanilla cake made with real vanilla beans.",
      price: 22.5,
      image: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3",
      likes: 74,
      isLiked: false,
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
    },
    {
      id: 5,
      name: "Black Forest",
      description: "Chocolate cake layered with cherries and whipped cream.",
      price: 31.99,
      image: "https://images.unsplash.com/photo-1551024506-0bccd828d307",
      likes: 143,
      isLiked: false,
    },
    {
      id: 6,
      name: "Lemon Drizzle",
      description: "Moist lemon cake topped with a tangy citrus glaze.",
      price: 21.99,
      image: "https://images.unsplash.com/photo-1621303837174-89787a7d4729",
      likes: 58,
      isLiked: false,
    },
    {
      id: 7,
      name: "Carrot Cake",
      description: "Spiced carrot cake with walnuts and cream cheese frosting.",
      price: 25.99,
      image: "https://images.unsplash.com/photo-1623428454614-abafdeff8b45",
      likes: 89,
      isLiked: true,
    },
  ];
  return (
    <>
      <Container sx={{ marginTop: 10 }}>
        <Typography>Your recent Orders </Typography>
        <List>
          {pastOrders.map((e) => (
            <>
              <ListItem disablePadding>
                <ListItemIcon sx={{ height: 30, width: 30 }}>
                  <img src={e.image} alt="cake image" />
                </ListItemIcon>
                <ListItemText>{e.name}</ListItemText>
                <ListItemButton>view</ListItemButton>
              </ListItem>
            </>
          ))}
        </List>
      </Container>
    </>
  );
}
export default Orders;
