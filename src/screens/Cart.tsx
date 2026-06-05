import {
  Container,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../redux/config";
import { addQuantity, reduceQuantity } from "../redux/CartStore";
import type { CakeModel } from "../models/ItemModel";

function Cart() {
  const cartItems = useAppSelector((state) => state.cart.cartItems);
  const dispatch = useAppDispatch();
  const handleIncrease = (e: CakeModel) => {
    dispatch(addQuantity(e.id));
  };
  const handleDecrease = (e: CakeModel) => {
    dispatch(reduceQuantity(e.id));
  };
  return (
    <>
      <Container sx={{ marginTop: 10 }}>
        <Typography>CartPage</Typography>
        <List disablePadding>
          {cartItems.map((e) => (
            <ListItem
              sx={{ flexDirection: "column", alignContent: "start" }}
              disablePadding
            >
              <ListItemText>
                <Stack direction={"row"} spacing={1}>
                  <Typography variant="body2">{e.name}</Typography>
                  <Typography variant="caption">Ksh {e.price}</Typography>
                </Stack>
                <Typography variant="subtitle2">
                  Quantity:{e.quantity}
                </Typography>
              </ListItemText>
              <Stack
                sx={{ flexDirection: "end", alignItems: "flex-end" }}
                direction="row"
              >
                <ListItemButton
                  sx={{
                    flexGrow: 1,
                    fontSize: { xs: 16, sm: 18, md: 20, lg: 22, xl: 22 },
                  }}
                  onClick={() => handleIncrease(e)}
                >
                  +
                </ListItemButton>
                <ListItemButton
                  sx={{
                    flexGrow: 1,
                    fontSize: { xs: 16, sm: 18, md: 20, lg: 22, xl: 22 },
                  }}
                  onClick={() => handleDecrease(e)}
                >
                  -
                </ListItemButton>
              </Stack>
            </ListItem>
          ))}
        </List>
      </Container>
    </>
  );
}
export default Cart;
