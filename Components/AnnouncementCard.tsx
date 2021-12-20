import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Grid,
  Box,
  Container,
  Fade,
  CardActionArea,
  Typography,
} from "@mui/material";
import React from "react";
import Image from "next/image";
import styles from "../styles/Announcement.module.css";
import { CardAnnouncement } from "../types/PrismaTypes";
import Markdown from "react-markdown";
import remarkGFM from "remark-gfm";
import dayjs from "dayjs";
import Link from "next/link";
import dynamic from "next/dynamic";
import usePreview from "../utils/Hooks/usePreview";

const DynamicPreview = dynamic(() => import("./ImagePreview"));

type Props = {
  announcement: CardAnnouncement;
  type?: "School" | "SSG" | "Apply";
};

const Announcement = ({ announcement, type }: Props) => {
  const { preview, closePrev, openPrev, switchPrev } = usePreview();
  const now = dayjs().format("YYYY-MM-DD");
  const hasMedia =
    (announcement?.image as string[]).length > 0 || announcement?.video;

  return (
    <>
      <Fade in={true} timeout={500} style={{ marginBottom: "64px" }}>
        <Card className={styles.card}>
          <CardHeader
            avatar={
              <Image
                src={
                  (announcement?.author?.image as string) ??
                  "/user-empty-avatar.png"
                }
                width={40}
                height={40}
                alt="Author Image"
                className={styles.avatar}
              />
            }
            title={announcement?.author?.name ?? "PCSHS User"}
            subheader={`${dayjs(now).diff(
              announcement.date,
              "days"
            )} days ago. (Philippine Time)`}
          />
          {hasMedia && (
            <CardMedia
              sx={{
                position: "relative",
                height: type == "Apply" ? "20vh" : "50vh",
                width: "100%",
              }}
            >
              <Container sx={{ height: "100%" }}>
                <Grid container sx={{ height: "100%" }} spacing={1}>
                  {announcement.image &&
                    announcement?.image.map((image, index) => (
                      <React.Fragment key={image}>
                        <Grid
                          item
                          xs={
                            (announcement.image as string[]).length > 1 ? 6 : 12
                          }
                        >
                          <Box
                            className={styles.imageContainer}
                            onClick={() => openPrev(index)}
                          >
                            <Image
                              src={image}
                              layout="fill"
                              objectFit="cover"
                              alt="Announcement Image"
                              className={styles.media}
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
              </Container>
            </CardMedia>
          )}
          <Link passHref href={`/announcements/${announcement?.id}`}>
            <CardActionArea component="a">
              <CardContent>
                <Typography variant="h4">
                  <Markdown plugins={[remarkGFM]}>
                    {announcement?.header}
                  </Markdown>
                </Typography>
              </CardContent>
            </CardActionArea>
          </Link>
        </Card>
      </Fade>
      <DynamicPreview
        handleClose={closePrev}
        preview={preview}
        switchPrev={switchPrev}
        images={announcement?.image}
      />
    </>
  );
};

export default Announcement;
