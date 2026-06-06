import { Container, Typography } from "@mui/material";

function Orders() {
  return (
    <>
      <Container sx={{ marginTop: 10 }}>
        <Typography>Your recent Orders </Typography>
        {/* <List>
          {pastOrders.map((e) => (
            <>
              <ListItem disablePadding>
                <ListItemIcon sx={{ height: 30, width: 30 }}>
                  <img src={e.image} alt="cake image" />
                </ListItemIcon>
                <ListItemText>{e.name}</ListItemText>
                <ListItemButton >view</ListItemButton>
              </ListItem>
            </>
          ))}
        </List> */}
      </Container>
    </>
  );
}
export default Orders;
