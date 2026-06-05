import { Button, Drawer } from "@mui/material";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";

function DrawerNavigation() {
  const [drawerIsOpen, setDrawerIsOpen] = useState<boolean>(false);
  return (
    <>
      <Button onClick={() => setDrawerIsOpen(true)} startIcon={<MenuIcon />}>
        <Drawer open={drawerIsOpen} onClose={() => setDrawerIsOpen(false)}>
          Drawer
        </Drawer>
      </Button>
    </>
  );
}

export default DrawerNavigation;
