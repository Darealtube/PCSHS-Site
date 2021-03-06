import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext } from "react";
import { ErrorContext } from "../../ErrorProvider";

type DialogProps = {
  open: boolean;
  handleClose: () => void;
  handleDeleteMutate: (id: string) => void;
  id: string;
};

const RemoveEventDialog = ({
  open,
  handleClose,
  handleDeleteMutate,
  id,
}: DialogProps) => {
  const handleError = useContext(ErrorContext);
  const handleDelete = async () => {
    await fetch(
      `${
        process.env.NEXT_PUBLIC_DEV_URL as string
      }/api/secure/events/deleteEvents`,
      {
        method: "DELETE",
        body: JSON.stringify(id),
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("An Error Occured.");
        }
      })
      .then(() => {
        handleDeleteMutate(id);
        handleClose();
      })
      .catch((err: Error) => handleError(err.message));
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Delete an event.</DialogTitle>

      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete this event from the calendar?
        </DialogContentText>

        <Box display="flex">
          <Button variant="contained" onClick={handleClose}>
            Cancel
          </Button>
          <Box sx={{ flexGrow: 1 }} />
          <Button variant="contained" onClick={handleDelete}>
            Submit
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default RemoveEventDialog;
