import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Typography,
} from "@mui/material";
import Image from "next/image";
import styles from "../styles/Announcement.module.css";

type AnnouncementList = {
  header: string;
  body: string;
  footer: string;
  image: string | null;
  video: string | null;
  date: string;
  author: {
    image: string | null;
    name: string;
  } | null;
}[];

type Props = {
  announcements: AnnouncementList;
  type?: "School" | "SSG" | "Apply";
};

const Announcements = ({ announcements, type = "SSG" }: Props) => {
  return (
    <>
      {announcements.map(
        ({ image, video, body, header, footer, author, date }) => (
          <>
            <Card className={styles.card}>
              <CardHeader
                avatar={
                  <Image
                    src={author?.image as string}
                    width={40}
                    height={40}
                    alt="Author Image"
                    className={styles.avatar}
                  />
                }
                title={author!.name}
                subheader={type == "Apply" ? date : JSON.parse(date)}
              />
              <CardMedia
                sx={{
                  position: "relative",
                  height: type == "Apply" ? "20vh" : "50vh",
                  width: "100%",
                }}
              >
                {image ? (
                  <Image
                    src={image as string}
                    layout="fill"
                    objectFit="cover"
                    alt="Announcement Image"
                  />
                ) : (
                  <video
                    src={video as string}
                    height="100%"
                    width="100%"
                    controls
                  />
                )}
              </CardMedia>
              <CardContent>
                <Typography
                  variant={type == "Apply" ? "h6" : "h5"}
                  gutterBottom
                >
                  {header}
                </Typography>
                <Typography variant="body2" paragraph>
                  {body}
                </Typography>
              </CardContent>
            </Card>
          </>
        )
      )}
    </>
  );
};

export default Announcements;
