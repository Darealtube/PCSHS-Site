import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Button,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { Event } from "../../../types/PrismaTypes";

type DialogProps = {
  open: boolean;
  handleClose: () => void;
  handleMutate: (newEvent: Event) => void;
  day: Event;
};

const UpdateEventDialog = ({
  open,
  handleClose,
  handleMutate,
  day,
}: DialogProps) => {
  const [event, setEvent] = useState({
    id: day?.id,
    title: day?.title,
    description: day?.description,
    day: day?.day,
    year: day?.year,
    month: day?.month,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEvent({
      ...event,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await fetch(
      `${process.env.NEXT_PUBLIC_DEV_URL as string}/api/event/updateEvents`,
      {
        method: "PATCH",
        body: JSON.stringify(event),
      }
    )
      .then(async (response) => {
        const res = await response.json();
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        handleMutate(res);
        handleClose();
      })
      .catch((error: Error) => console.log(error));
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Update an event.</DialogTitle>

      <DialogContent>
        <DialogContentText>
          * Take note: You cannot use markdown in creating events. Make the
          header of the markdown and the description as brief as possible.
        </DialogContentText>
        <form onSubmit={handleSubmit}>
          <Box display="flex" flexDirection="column">
            <TextField
              name="title"
              id="title"
              label="Title"
              placeholder="Type the Event Title here..."
              variant="standard"
              sx={{ marginBottom: "24px" }}
              onChange={handleChange}
              error={event?.title?.length > 50}
              value={event?.title}
            />
            <TextField
              name="description"
              id="description"
              label="Description"
              placeholder="Type the BRIEF description here..."
              variant="outlined"
              multiline
              rows={4}
              sx={{ marginBottom: "24px" }}
              onChange={handleChange}
              error={event?.description?.length > 200}
              value={event?.description}
            />
          </Box>
          <Box display="flex">
            <Button variant="contained" onClick={handleClose}>
              Cancel
            </Button>
            <Box sx={{ flexGrow: 1 }} />
            <Button variant="contained" type="submit">
              Submit
            </Button>
          </Box>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateEventDialog;