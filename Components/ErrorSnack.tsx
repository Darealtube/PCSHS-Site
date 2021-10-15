import { Snackbar, Alert } from "@mui/material";

type Props = {
  open: boolean;
  handleClose: () => void;
  error: string;
};

const ErrorSnack = ({ open, handleClose, error }: Props) => {
  return (
    <>
      <Snackbar open={open} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          {error}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ErrorSnack;
