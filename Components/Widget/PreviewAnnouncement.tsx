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
        sx={{ marginTop: "32px",height: "100%" }}
      >
        <Container sx={{ marginTop: "8px", height: "100%" }}>
          <Announcement announcement={announcement} type="SSG" />
        </Container>
      </Dialog>
    </>
  );
};

export default PreviewAnnouncement;
