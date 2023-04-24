import {
  Divider,
  Grid,
  Box,
  TextField,
  IconButton,
  Button,
  useTheme,
  useMediaQuery,
  Typography,
  Container,
} from "@mui/material";
import { useSession } from "next-auth/react";
import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import {
  useRef,
  useReducer,
  useState,
  MutableRefObject,
  useContext,
} from "react";
import Media from "../../../Components/Announcement/Media";
import { getImages, getVideo } from "../../../utils/mediaOps/getMedia";
import announceReducer from "../../../utils/Reducers/announceReducer";
import { uploadImages, uploadVideo } from "../../../utils/mediaOps/uploadMedia";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import VisibilityIcon from "@mui/icons-material/Visibility";
import dynamic from "next/dynamic";
import SendIcon from "@mui/icons-material/Send";
import HelpIcon from "@mui/icons-material/Help";
import VideocamIcon from "@mui/icons-material/Videocam";
import prisma from "../../../lib/prisma";
import { GetStaticProps } from "next";
import { Announcement } from "../../../types/PrismaTypes";
import Fallback from "../../../Components/Announcement/Fallback";
import useSWR from "swr";
import { ErrorContext } from "../../../Components/ErrorProvider";
import MarkdownInput from "../../../Components/Announcement/MarkdownInput";

const DynamicPreview = dynamic(
  () => import("../../../Components/Announcement/PreviewAnnouncement")
);
const DynamicGuide = dynamic(
  () => import("../../../Components/Announcement/MarkdownGuide")
);

type InitialProps = {
  initAnnouncement: Announcement;
  id: string;
};

interface AnnouncementState {
  header: string;
  body: string;
  footer: string;
  image: string[];
  video: string;
}

const initAnnounce: AnnouncementState = {
  header: "",
  body: "",
  footer: "",
  image: [],
  video: "",
};

const EditAnnouncement = ({ initAnnouncement, id }: InitialProps) => {
  const handleError = useContext(ErrorContext);
  const { data } = useSWR(`/api/public/announcements/${id}/`, {
    fallbackData: initAnnouncement,
  });
  const router = useRouter();
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));
  const imageInput = useRef<HTMLInputElement | null>(null);
  const videoInput = useRef<HTMLInputElement | null>(null);
  const [disableSubmit, setDisableSubmit] = useState(false);
  const [announcement, setAnnouncement] = useState(initAnnounce);
  const [openPreview, setOpenPreview] = useState(false);
  const [openGuide, setOpenGuide] = useState(false);
  const { data: session } = useSession();
  const hasError =
    !router.isFallback &&
    (announcement.header.length > 50 ||
      announcement.body.length > 1500 ||
      announcement.footer.length > 800);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAnnouncement({
      ...announcement,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  const handlePreview = () => {
    setOpenPreview(!openPreview);
  };

  const handleGuide = () => {
    setOpenGuide(!openGuide);
  };

  const handleImageClick = () => {
    (imageInput as MutableRefObject<HTMLInputElement>).current.click();
  };

  const handleVideoClick = () => {
    (videoInput as MutableRefObject<HTMLInputElement>).current.click();
  };

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valid =
      (e.currentTarget.files as FileList)?.length + announcement.image.length <
      5;
    if (
      (e.currentTarget.files as FileList)?.length != 0 &&
      (e.currentTarget.files as FileList)?.length < 5 &&
      valid
    ) {
      getImages(e.currentTarget.files as FileList, (result) => {
        setAnnouncement({
          ...announcement,
          image: [...new Set([...announcement.image, ...result])],
        });
      });
    }
  };

  const handleVideo = (e: React.ChangeEvent<HTMLInputElement>) => {
    if ((e.currentTarget.files as FileList)?.length != 0) {
      getVideo((e.currentTarget.files as FileList)[0], (result) => {
        setAnnouncement({ ...announcement, video: result });
      });
      e.currentTarget.value = "";
    }
  };

  const handleDeleteImages = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnnouncement({
      ...announcement,
      image: announcement.image.filter(
        (image) => image != e.currentTarget.value
      ),
    });
  };

  const handleDeleteVideo = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnnouncement({ ...announcement, video: "" });
    URL.revokeObjectURL(e.currentTarget.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDisableSubmit(true);
    await fetch(
      `${
        process.env.NEXT_PUBLIC_DEV_URL as string
      }/api/secure/announcements/edit`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          ...announcement,
          id,
          image:
            announcement.image == data?.image
              ? announcement.image
              : announcement.image
              ? await uploadImages(announcement.image)
              : null,
          video:
            announcement.video == data?.video
              ? announcement.video
              : announcement.video
              ? await uploadVideo(announcement.video)
              : null,
          authorName: session?.user?.name,
        }),
      }
    )
      .then((response) => {
        if (!response.ok) {
          setDisableSubmit(false);
          throw new Error("Please provide valid information.");
        }
      })
      .then(() => {
        setDisableSubmit(false);
        router.push(`/announcements/${id}/`);
      })
      .catch((err: Error) => handleError(err.message));
  };

  if (router.isFallback) {
    return <Fallback />;
  }

  /* if (session?.role != "Government") {
    return (
      <>
        <Head>
          <title>PCSHS Edit</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Typography variant="h4">
          You are not allowed to edit announcements.
        </Typography>
      </>
    );
  } */

  return (
    <>
      <Head>
        <title>PCSHS Edit</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container>
        <form onSubmit={handleSubmit}>
          <Box
            width="100%"
            height={480}
            display="flex"
            alignItems="center"
            justifyContent="center"
            sx={{ backgroundColor: "gray" }}
            position="relative"
          >
            <input
              type="file"
              multiple
              hidden={true}
              accept="image/*"
              ref={imageInput}
              onChange={handleImage}
            />
            <input
              type="file"
              multiple
              hidden={true}
              accept="video/*"
              ref={videoInput}
              onChange={handleVideo}
            />
            {(announcement.image.length != 0 || !!announcement.video) && (
              <Media
                images={announcement.image}
                video={announcement.video}
                handleDeleteImages={handleDeleteImages}
                handleDeleteVideo={handleDeleteVideo}
              />
            )}
            <Box position="absolute">
              <IconButton
                name="IMAGE"
                onClick={handleImageClick}
                disabled={
                  !!announcement.video || announcement.image.length == 4
                }
                sx={{ zIndex: 1 }}
              >
                <AddPhotoAlternateIcon />
              </IconButton>
              <IconButton
                name="VIDEO"
                onClick={handleVideoClick}
                disabled={
                  !!announcement.video || announcement.image.length != 0
                }
              >
                <VideocamIcon />
              </IconButton>
            </Box>
          </Box>

          <Typography variant="subtitle1" sx={{ flexGrow: 1 }} gutterBottom>
            Published by {data?.author?.name} on {data?.date}
          </Typography>

          <MarkdownInput
            id="header"
            name="header"
            label="Header"
            placeholder="Header/Title"
            fullWidth
            onChange={handleChange}
            value={announcement.header}
            required
            variant="standard"
            InputProps={{ style: { fontSize: "32px" } }}
            error={announcement.header.length > 150}
            multiline
            maxRows={2}
            sx={{ mb: 2 }}
          />

          <MarkdownInput
            id="body"
            name="body"
            label="Body"
            placeholder="Body/Content."
            fullWidth
            multiline
            rows={16}
            onChange={handleChange}
            value={announcement.body}
            required
            error={announcement.body.length > 1500}
            sx={{ mb: 2 }}
            InputProps={{ style: { fontSize: "16px" } }}
          />

          <MarkdownInput
            id="footer"
            name="footer"
            label="Footer"
            placeholder="Footer/Credits"
            fullWidth
            multiline
            rows={2}
            onChange={handleChange}
            value={announcement.footer}
            InputProps={{ style: { fontSize: ".8rem" } }}
            error={announcement.footer.length > 800}
            sx={{ mb: 2 }}
          />

          <Grid
            container
            spacing={2}
            pb={8}
            sx={{ display: "flex", alignItems: "center" }}
          >
            <Grid
              item
              xs={4}
              sm={1}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <IconButton onClick={handleGuide} sx={{ marginRight: "8px" }}>
                <HelpIcon />
              </IconButton>
            </Grid>

            <Grid
              item
              xs={6}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              {mobile ? (
                <IconButton type="submit">
                  <SendIcon />
                </IconButton>
              ) : (
                <Button
                  type="submit"
                  variant="contained"
                  color="info"
                  disabled={hasError || disableSubmit}
                  fullWidth
                >
                  Submit
                </Button>
              )}
            </Grid>
          </Grid>
        </form>
      </Container>

      <DynamicGuide open={openGuide} handleClose={handleGuide} />
    </>
  );
};

export const getStaticPaths = async () => {
  const announcements = await prisma.announcement.findMany({
    select: {
      id: true,
    },
  });

  const paths = announcements.map((announcement) => ({
    params: { id: announcement.id },
  }));

  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const announcement = await prisma.announcement.findUnique({
    where: {
      id: context.params?.id as string,
    },
    select: {
      id: true,
      header: true,
      body: true,
      footer: true,
      image: true,
      video: true,
      date: true,
      author: {
        select: {
          image: true,
          name: true,
        },
      },
      type: true,
    },
  });

  if (!announcement) {
    return {
      notFound: true,
    };
  }

  return { props: { initAnnouncement: announcement, id: context?.params?.id } };
};

export default EditAnnouncement;
