import { Popover, Card, CardContent, Typography, Divider } from "@mui/material";
import { Event } from "../../types/PrismaTypes";

type PopoverProps = {
  open: boolean;
  anchor: null | HTMLElement;
  handleClose: () => void;
  event: Event;
};

const EventPopover = ({ open, anchor, handleClose, event }: PopoverProps) => {
  return (
    <Popover
      sx={{
        pointerEvents: "none",
      }}
      open={open}
      anchorEl={anchor}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      onClose={handleClose}
      disableRestoreFocus
    >
      <Card sx={{ maxWidth: 320, maxHeight: 500, overflow: "auto" }}>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            {event.title}
          </Typography>
          <Divider />
          <Typography variant="body1" gutterBottom>
            {event.description}
            {event.description}
            {event.description}
            {event.description}
            {event.description}
            {event.description}
            {event.description}
            {event.description}
            {event.description}
            {event.description}
            {event.description}
            {event.description}
          </Typography>
        </CardContent>
      </Card>
    </Popover>
  );
};

export default EventPopover;
