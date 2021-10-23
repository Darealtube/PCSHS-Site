import {
  DialogContent,
  Dialog,
  DialogTitle,
  DialogContentText,
  Divider,
  Container,
} from "@mui/material";
import Announcement from "../Announcement";

type Announcement = {
  header: string;
  body: string;
  footer: string;
  image: string[];
  video: string;
};

type PreviewProps = {
  announcement: Announcement;
  open: boolean;
  handleClose: () => void;
};

const PreviewAnnouncement = ({
  announcement,
  open,
  handleClose,
}: PreviewProps) => {
  return (
    <>
      <Dialog
        fullWidth={true}
        maxWidth={"md"}
        open={open}
        onClose={handleClose}
      >
        <Container>
          <DialogTitle>Announcement Preview</DialogTitle>
          <Divider />
          <Announcement announcement={announcement} type="SSG" />
        </Container>
      </Dialog>
    </>
  );
};

export default PreviewAnnouncement;
