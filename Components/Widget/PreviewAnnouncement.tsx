import { Dialog, Container } from "@mui/material";
import { Announcement as AnnouncementType } from "../../types/PrismaTypes";
import Announcement from "../Announcement";

type PreviewProps = {
  announcement: AnnouncementType;
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
        sx={{ marginTop: "32px", height: "100%" }}
      >
        <Container sx={{ marginTop: "8px", height: "100%" }}>
          <Announcement announcement={announcement} type="SSG" />
        </Container>
      </Dialog>
    </>
  );
};

export default PreviewAnnouncement;
