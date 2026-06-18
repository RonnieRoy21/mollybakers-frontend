import {
  Container,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
  Checkbox,
  Button,
} from "@mui/material";

import { useAppDispatch, useAppSelector } from "../redux/config";
import {
  addQuantity,
  reduceQuantity,
  checkOutCart,
  type cartItem,
} from "../redux/CartStore";
import type { cake } from "../database/SupabaseLogic";

function Cart() {
  const { cartItems, totalCost } = useAppSelector((state) => state.cart);

  const dispatch = useAppDispatch();
  const handleIncrease = (e: cake) => {
    dispatch(addQuantity(e.cake_id));
  };
  const handleDecrease = (e: cake) => {
    dispatch(reduceQuantity(e.cake_id));
  };
  const handleCheckboxChange = (e: cartItem) => {
    //check if its in the chekd list
    //if so remove
    //else add
    console.log(e);

    return dispatch(checkOutCart(e));
  };
  return (
    <>
      <Container sx={{ marginTop: 1 }}>
        <Typography
          sx={{
            marginLeft: "30%",
            textDecoration: "underline",
          }}
        >
          Select items for payment
        </Typography>
        <List>
          {cartItems.map((e) => (
            <Stack direction="row" key={e.cake.cake_id}>
              <img src={e.cake.cake_url!} alt="" width={30} height={30} />
              <ListItem
                sx={{
                  flexDirection: "column",
                  alignContent: "start",
                  flexGrow: 1,
                }}
                disablePadding
              >
                <ListItemText>
                  <Stack direction={"row"} spacing={1}>
                    <Typography variant="h6">{e.cake.cake_name}</Typography>
                    <Typography variant="h6">
                      Ksh {e.cake.cake_price}
                    </Typography>
                  </Stack>
                  <Typography variant="subtitle1">
                    Quantity:{e.quantity}
                  </Typography>
                </ListItemText>
                <Stack
                  sx={{ flexDirection: "end", alignContent: "space-between" }}
                  direction="row"
                >
                  <Button
                    variant="contained"
                    size="small"
                    sx={{
                      flexGrow: 1,
                      marginRight: 1,

                      fontSize: { xs: 16, sm: 18, md: 20, lg: 22, xl: 22 },
                    }}
                    onClick={() => {
                      handleDecrease(e.cake);
                    }}
                  >
                    -
                  </Button>
                  <Button
                    size="small"
                    variant="contained"
                    sx={{
                      flexGrow: 1,
                      fontSize: { xs: 16, sm: 18, md: 20, lg: 22, xl: 22 },
                      marginRight: 5,
                    }}
                    onClick={() => {
                      handleIncrease(e.cake);
                    }}
                  >
                    +
                  </Button>
                  <Checkbox
                    sx={{
                      alignContent: "end",
                    }}
                    color={e.isChecked ? "primary" : "default"}
                    checked={e.isChecked}
                    onChange={(ev) => {
                      handleCheckboxChange({
                        cake: e.cake,
                        quantity: e.quantity,
                        isChecked: ev.target.checked,
                      });
                    }}
                  />
                </Stack>
              </ListItem>
            </Stack>
          ))}
        </List>
        <Stack
          direction={"row"}
          sx={{
            paddingBottom: 7,
            position: "sticky",
            bottom: 2,
          }}
        >
          <Typography
            sx={{
              zIndex: 10,
              opacity: 1,
              backgroundColor: "burlywood",
              fontSize: "120%",
              fontWeight: "bold",
              fontStyle: "italic",
              flexGrow: 1,
              marginRight: 1,
            }}
          >
            Total Price: {totalCost}
          </Typography>
          {totalCost > 0 ? <Button variant="contained">Pay</Button> : null}
        </Stack>
      </Container>
    </>
  );
}
export default Cart;
