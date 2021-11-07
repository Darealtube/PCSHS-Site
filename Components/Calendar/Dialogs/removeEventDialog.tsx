import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

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
  const handleDelete = async () => {
    await fetch(
      `${process.env.NEXT_PUBLIC_DEV_URL as string}/api/event/deleteEvents`,
      {
        method: "DELETE",
        body: JSON.stringify(id),
      }
    )
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        handleDeleteMutate(id);
        handleClose();
      })
      .catch((error: Error) => console.log(error));
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
