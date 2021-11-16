import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";

type DialogProps = {
  open: boolean;
  handleCloseDialog: () => void;
  handleAddRow: (member: string) => void;
};

const AddRowDialog = ({
  open,
  handleCloseDialog,
  handleAddRow,
}: DialogProps) => {
  const [member, setMember] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMember(e.currentTarget.value);
  };

  const handleSubmit = () => {
    handleAddRow(member);
    setMember("");
    handleCloseDialog();
  };

  const handleClose = () => {
    setMember("");
    handleCloseDialog();
  };

  return (
    <>
      <Dialog open={open} disableEscapeKeyDown>
        <DialogTitle style={{ textAlign: "center" }}>Add Row</DialogTitle>
        <DialogContent>
          <TextField
            variant="outlined"
            margin="none"
            required
            fullWidth
            id="member"
            label="Add Member"
            name="type"
            color="primary"
            inputProps={{ maxLength: 40 }}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button color="primary" onClick={handleSubmit}>
            Add Member
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddRowDialog;
