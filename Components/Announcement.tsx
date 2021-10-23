import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Typography,
} from "@mui/material";
import Image from "next/image";
import styles from "../styles/Announcement.module.css";
import { Announcement as AnnouncementType } from "../types/PrismaTypes";
import Markdown from "react-markdown";
import remarkGFM from "remark-gfm";

type Props = {
  announcement: AnnouncementType;
  type?: "School" | "SSG" | "Apply";
};

const Announcement = ({ announcement, type }: Props) => {
  return (
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
        title={announcement?.author ? announcement?.author?.name : "PCSHS User"}
        subheader={announcement?.date}
      />
      {(announcement?.image || announcement?.video) && (
        <CardMedia
          sx={{
            position: "relative",
            height: type == "Apply" ? "20vh" : "50vh",
            width: "100%",
          }}
        >
          {announcement?.image ? (
            <Image
              src={announcement?.image as string}
              layout="fill"
              objectFit="cover"
              alt="Announcement Image"
            />
          ) : announcement?.video ? (
            <video
              src={announcement?.video as string}
              height="100%"
              width="100%"
              controls
            />
          ) : (
            ""
          )}
        </CardMedia>
      )}
      <CardContent>
        <Typography variant={type == "Apply" ? "h6" : "h5"} gutterBottom>
          <Markdown plugins={[remarkGFM]}>{announcement?.header}</Markdown>
        </Typography>
        <Typography variant="body2" paragraph>
          <Markdown plugins={[remarkGFM]}>{announcement?.body}</Markdown>
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Announcement;
