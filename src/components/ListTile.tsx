import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

interface CustomListTileProps {
  title: string;
  subtitle?: string;

  leading?: React.ReactNode;
  trailing?: React.ReactNode;

  onClick?: () => void;
}

const CustomListTile = ({
  title,
  subtitle,
  leading,
  trailing,
  onClick,
}: CustomListTileProps) => {
  return (
    <ListItem disablePadding secondaryAction={trailing}>
      <ListItemButton onClick={onClick}>
        {leading && <ListItemIcon>{leading}</ListItemIcon>}

        <ListItemText primary={title} secondary={subtitle} />
      </ListItemButton>
    </ListItem>
  );
};

export default CustomListTile;
