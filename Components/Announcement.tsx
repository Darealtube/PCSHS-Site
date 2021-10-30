import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Grid,
  Box,
  Container,
  Fade,
} from "@mui/material";
import React from "react";
import Image from "next/image";
import styles from "../styles/Announcement.module.css";
import { Announcement as AnnouncementType } from "../types/PrismaTypes";
import Markdown from "react-markdown";
import remarkGFM from "remark-gfm";
import dayjs from "dayjs";

type Props = {
  announcement: AnnouncementType;
  type?: "School" | "SSG" | "Apply";
};

const Announcement = ({ announcement, type }: Props) => {
  const now = dayjs().format("YYYY-MM-DD");
  return (
    <Fade in={true} timeout={1500}>
      <Card className={styles.card}>
        <CardHeader
          avatar={
            <Image
              src={
                announcement?.author?.image
                  ? (announcement?.author?.image as string)
                  : "/user-empty-avatar.png"
              }
              width={40}
              height={40}
              alt="Author Image"
              className={styles.avatar}
            />
          }
          title={
            announcement?.author ? announcement?.author?.name : "PCSHS User"
          }
          subheader={`${dayjs(now).diff(
            announcement.date,
            "days"
          )} days ago. (Philippine Time)`}
        />
        {(announcement?.image || announcement?.video) && (
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
                  announcement?.image.map((image) => (
                    <React.Fragment key={image}>
                      <Grid
                        item
                        xs={
                          (announcement.image as string[]).length > 1 ? 6 : 12
                        }
                      >
                        <Box
                          width="100%"
                          height="100%"
                          position="relative"
                          border="1px solid grey"
                          borderRadius="2%"
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
        <CardContent>
          <Markdown plugins={[remarkGFM]}>{announcement?.header}</Markdown>
          <Markdown plugins={[remarkGFM]}>{announcement?.body}</Markdown>
        </CardContent>
      </Card>
    </Fade>
  );
};

export default Announcement;
