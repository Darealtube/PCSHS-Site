import {
  Dialog,
  Container,
  Box,
  Grid,
  Typography,
  Divider,
} from "@mui/material";
import { Announcement as AnnouncementType } from "../../types/PrismaTypes";
import Image from "next/image";
import React from "react";
import dayjs from "dayjs";
import { useSession } from "next-auth/react";
import Markdown from "react-markdown";
import remarkGFM from "remark-gfm";
import styles from "../../styles/Announcement.module.css";

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
  const { data: session } = useSession();
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
          <Box
            className={styles.mediaContainer}
            sx={{ backgroundColor: "gray" }}
          >
            {(announcement.image?.length != 0 || !!announcement.video) && (
              <Grid container sx={{ height: "100%" }} spacing={1}>
                {announcement.image &&
                  announcement?.image.map((image) => (
                    <React.Fragment key={image}>
                      <Grid
                        item
                        xs={
                          (announcement.image as string[]).length > 1 ? 6 : 12
                        }
                      >
                        <Box className={styles.imageContainer}>
                          <Image
                            src={image}
                            layout="fill"
                            objectFit="cover"
                            alt="Announcement Image"
                          />
                        </Box>
                      </Grid>
                    </React.Fragment>
                  ))}
                {announcement.video && (
                  <video
                    src={announcement.video}
                    width="100%"
                    height="100%"
                    controls
                  />
                )}
              </Grid>
            )}
          </Box>

          <Typography variant="subtitle1" sx={{ flexGrow: 1 }}>
            Published by {session?.user?.name} on {dayjs().format("YYYY-MM-DD")}
          </Typography>

          <Typography variant="h4">
            <Markdown plugins={[remarkGFM]}>{announcement?.header}</Markdown>
          </Typography>

          <Divider />

          <Typography variant="h6">
            <Markdown plugins={[remarkGFM]}>{announcement?.body}</Markdown>
          </Typography>

          <Typography variant="subtitle1">
            <Markdown plugins={[remarkGFM]}>
              {announcement?.footer ?? ""}
            </Markdown>
          </Typography>
        </Container>
      </Dialog>
    </>
  );
};

export default PreviewAnnouncement;
