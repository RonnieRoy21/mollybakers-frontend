import {
  Dialog,
  CardMedia,
  CardActions,
  Typography,
  Button,
  DialogContent,
} from "@mui/material";
import { type cake } from "../database/SupabaseLogic";
interface viewMoreProps {
  isOpen: boolean;
  c: cake;
  onClose: () => void;
}
function ViewMore({ c, isOpen, onClose }: viewMoreProps) {
  return (
    <>
      <Dialog fullWidth open={isOpen} sx={{ padding: "1%" }} scroll="paper">
        <CardMedia
          component={"img"}
          src={c.cake_url!}
          alt="cake image"
          height={200}
        />
        <DialogContent>
          <Typography variant="h4">{c.cake_name}</Typography>
          <Typography variant="h6">Ksh {c.cake_price}</Typography>
          <Typography>Appearance: {c.cake_description}</Typography>
          <Typography>Flavour: {c.cake_flavour}</Typography>
          <Typography>Actual size: {c.cake_size}kg</Typography>
        </DialogContent>
        <CardActions sx={{ justifyContent: "right" }}>
          <Button onClick={onClose}>Close</Button>
        </CardActions>
      </Dialog>
    </>
  );
}

export default ViewMore;
