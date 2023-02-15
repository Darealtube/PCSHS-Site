import {
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Box,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { PCSHSEvent } from "../../../types/PrismaTypes";
import { ErrorContext } from "../../ErrorProvider";

type UpdatePCSHSEvent = {
  id: string;
  description: string;
  title: string;
};

type DialogProps = {
  open: boolean;
  handleClose: () => void;
  handleMutate: (newEvent: PCSHSEvent) => void;
  day: UpdatePCSHSEvent;
};

const UpdateEventDialog = ({
  open,
  handleClose,
  handleMutate,
  day,
}: DialogProps) => {
  const handleError = useContext(ErrorContext);
  const [disableSubmit, setDisableSubmit] = useState(false);
  const [event, setEvent] = useState({
    title: day.title,
    description: day.description,
  });

  const hasError =
    event?.title?.length > 50 || event?.description?.length > 200;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEvent({
      ...event,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDisableSubmit(true);
    await fetch(
      `${process.env.NEXT_PUBLIC_DEV_URL as string}/api/secure/events/update`,
      {
        method: "PATCH",
        body: JSON.stringify({ ...event, id: day.id }),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    )
      .then((res) => {
        if (!res.ok) {
          setDisableSubmit(false);
          throw new Error("Please provide valid information.");
        }
        return res.json();
      })
      .then((data) => {
        handleMutate(data);
        handleClose();
        setDisableSubmit(false);
      })
      .catch((err: Error) => handleError(err.message));
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth={"sm"} fullWidth>
      <DialogTitle>Update an event.</DialogTitle>
      <DialogContent>
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
            <Button
              variant="contained"
              type="submit"
              disabled={hasError || disableSubmit}
            >
              Submit
            </Button>
          </Box>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateEventDialog;
