import { Snackbar, Alert } from "@mui/material";

type Props = {
  open: boolean;
  handleClose: () => void;
};

const ErrorSnack = ({ open, handleClose }: Props) => {
  return (
    <>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          This is a success message!
        </Alert>
      </Snackbar>
    </>
  );
};

export default ErrorSnack;
