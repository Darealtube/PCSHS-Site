import { TextField, Button, Box } from "@mui/material";
import { Dayjs } from "dayjs";
import React, { useContext, useState } from "react";
import { PCSHSEvent } from "../../types/PrismaTypes";
import { ErrorContext } from "../ErrorProvider";

type FormProps = {
  handleMutate: (newEvent: PCSHSEvent) => void;
  calendar: Dayjs | null;
};

const AddEventForm = ({ handleMutate, calendar }: FormProps) => {
  const handleError = useContext(ErrorContext);
  const [disableSubmit, setDisableSubmit] = useState(false);
  const [event, setEvent] = useState({ title: "", description: "" });

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
      `${process.env.NEXT_PUBLIC_DEV_URL as string}/api/secure/events/create`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          ...event,
          day: calendar!.date(),
          month: calendar!.month() + 1,
          year: calendar!.year(),
        }),
      }
    )
      .then((res) => {
        // HANDLE REDIRECT WHEN USER NOT SIGNED IN.
        if (res.redirected) {
          window.location.href = res.url;
          return;
        }

        if (!res.ok) {
          setDisableSubmit(false);
          throw new Error("Please provide valid information.");
        }
        return res.json();
      })
      .then((data) => {
        handleMutate(data);
        setEvent({ ...event, title: "", description: "" });
        setDisableSubmit(false);
      })
      .catch((err: Error) => handleError(err.message));
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Box display="flex" flexDirection="column">
          <TextField
            name="title"
            id="title"
            placeholder="Event Title"
            variant="standard"
            sx={{ mb: 3 }}
            onChange={handleChange}
            error={event?.title?.length > 50}
            value={event?.title}
          />
          <TextField
            name="description"
            id="description"
            placeholder="Say something brief about this event."
            variant="outlined"
            multiline
            rows={4}
            sx={{ mb: 3 }}
            onChange={handleChange}
            error={event?.description?.length > 200}
            value={event?.description}
          />
        </Box>
        <Box display="flex">
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
    </>
  );
};

export default AddEventForm;
