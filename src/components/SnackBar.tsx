import Snackbar from "@mui/material/Snackbar";
import { useAppDispatch, useAppSelector } from "../redux/config";
import { hideSnackBar } from "../redux/SnackBarStore";

function CustomSnackBar() {
  const dispatch = useAppDispatch();
  const { isOpen, message } = useAppSelector((state) => state.snackBar);
  return (
    <>
      <Snackbar
        message={message}
        open={isOpen}
        autoHideDuration={1000}
        onClose={() => dispatch(hideSnackBar())}
      />
    </>
  );
}

export default CustomSnackBar;
