import { Container, Typography } from "@mui/material";
import CustomListTile from "../components/ListTile";
import FilterBar from "../components/FilterBar";
import { useState } from "react";
const orders = [
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
];
const filters: string[] = ["Recent", "Old", "Complete", "Shipped"];
function Orders() {
  const [selected, setSelected] = useState<string>(filters[0]);
  return (
    <>
      <Container sx={{}}>
        <Typography>Your recent Orders </Typography>
        <FilterBar
          filters={filters}
          selectedFilter={selected}
          onSelect={(e) => {
            setSelected(e);
          }}
        />
        {orders.map((e) => (
          <CustomListTile
            key={e.id}
            title={e.name}
            subtitle={e.quantity.toString()}
            onClick={() => {
              console.log(e.name);
            }}
          />
        ))}
      </Container>
    </>
  );
}
export default Orders;
