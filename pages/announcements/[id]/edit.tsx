import {
  Divider,
  Grid,
  Box,
  TextField,
  IconButton,
  Button,
  useTheme,
  useMediaQuery,
  SelectChangeEvent,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";
import { useSession } from "next-auth/client";
import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import { useRef, useReducer, useState, MutableRefObject } from "react";
import Media from "../../../Components/Announcement/Media";
import { getImages, getVideo } from "../../../utils/getMedia";
import announceReducer from "../../../utils/Reducers/announceReducer";
import { uploadImages, uploadVideo } from "../../../utils/uploadMedia";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { AnnounceTypeOptions } from "../../../utils/selectOptions";
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

const DynamicPreview = dynamic(
  () => import("../../../Components/Announcement/PreviewAnnouncement")
);
const DynamicError = dynamic(() => import("../../../Components/ErrorSnack"));
const DynamicGuide = dynamic(
  () => import("../../../Components/Announcement/MarkdownGuide")
);

type InitialProps = {
  initAnnouncement: Announcement;
  id: string;
};

const EditAnnouncement = ({ initAnnouncement, id }: InitialProps) => {
  const { data } = useSWR(`/api/announcement/${id}/`, {
    fallbackData: initAnnouncement,
  });
  const init = { ...(data as Announcement), error: false, errorMessage: "" };
  const router = useRouter();
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));
  const imageInput = useRef<HTMLInputElement | null>(null);
  const videoInput = useRef<HTMLInputElement | null>(null);
  const [announcement, dispatch] = useReducer(announceReducer, init);
  const [openPreview, setOpenPreview] = useState(false);
  const [openGuide, setOpenGuide] = useState(false);
  const [session] = useSession();
  const hasError =
    !router.isFallback &&
    (announcement.header.length > 50 ||
      announcement.body.length > 1500 ||
      announcement.footer.length > 800);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: "CHANGE",
      field: e.currentTarget.name as keyof typeof announcement,
      payload: e.currentTarget.value,
    });
  };

  const handlePreview = () => {
    setOpenPreview(!openPreview);
  };

  const handleGuide = () => {
    setOpenGuide(!openGuide);
  };

  const handleErrorClose = () => {
    dispatch({
      type: "ERROR",
      payload: "",
    });
  };

  const handleImageClick = () => {
    if (announcement.error) {
      dispatch({ type: "ERROR", payload: "" });
    }
    (imageInput as MutableRefObject<HTMLInputElement>).current.click();
  };

  const handleVideoClick = () => {
    if (announcement.error) {
      dispatch({ type: "ERROR", payload: "" });
    }
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
        dispatch({
          type: "CHANGE",
          field: "image",
          payload: [...new Set([...announcement.image, ...result])],
        });
      });
    }
  };

  const handleVideo = (e: React.ChangeEvent<HTMLInputElement>) => {
    if ((e.currentTarget.files as FileList)?.length != 0) {
      getVideo((e.currentTarget.files as FileList)[0], (result) => {
        dispatch({
          type: "CHANGE",
          field: "video",
          payload: result,
        });
      });
      e.currentTarget.value = "";
    }
  };

  const handleType = (e: SelectChangeEvent) => {
    dispatch({
      type: "CHANGE",
      payload: e.target.value,
      field: "type",
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { error, errorMessage, ...trueAnnouncement } = announcement;
    await fetch(
      `${
        process.env.NEXT_PUBLIC_DEV_URL as string
      }/api/announcement/${id}/edit`,
      {
        method: "PUT",
        body: JSON.stringify({
          ...trueAnnouncement,
          image:
            trueAnnouncement.image == data?.image
              ? trueAnnouncement.image
              : trueAnnouncement.image
              ? await uploadImages(trueAnnouncement.image)
              : null,
          video:
            trueAnnouncement.video == data?.video
              ? trueAnnouncement.video
              : trueAnnouncement.video
              ? await uploadVideo(trueAnnouncement.video)
              : null,
          authorName: session?.user?.name,
        }),
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        } else {
          router.push(`/announcements/${id}/`);
        }
      })
      .catch((error: Error) =>
        dispatch({ type: "ERROR", payload: error.message })
      );
  };

  if (router.isFallback) {
    return <Fallback />;
  }

  return (
    <>
      <Head>
        <title>PCSHS Edit</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

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
            ref={imageInput}
            onChange={handleImage}
          />
          <input
            type="file"
            multiple
            hidden={true}
            ref={videoInput}
            onChange={handleVideo}
          />
          {(announcement.image.length != 0 || !!announcement.video) && (
            <Media
              images={announcement.image}
              video={announcement.video}
              dispatch={dispatch}
            />
          )}
          <Box position="absolute">
            <IconButton
              name="IMAGE"
              onClick={handleImageClick}
              disabled={!!announcement.video || announcement.image.length == 4}
              sx={{ zIndex: 1 }}
            >
              <AddPhotoAlternateIcon />
            </IconButton>
            <IconButton
              name="VIDEO"
              onClick={handleVideoClick}
              disabled={!!announcement.video || announcement.image.length != 0}
            >
              <VideocamIcon />
            </IconButton>
          </Box>
        </Box>

        <Typography variant="subtitle1" sx={{ flexGrow: 1 }} gutterBottom>
          Published by {data?.author?.name} on {data?.date}
        </Typography>

        <TextField
          id="header"
          name="header"
          label="Header"
          placeholder="Header/Title"
          fullWidth
          onChange={handleChange}
          value={announcement.header}
          required
          variant="standard"
          InputProps={{ style: { fontSize: "2.4rem" } }}
          error={announcement.header.length > 150}
          multiline
          sx={{ mb: 4 }}
        />

        <TextField
          id="body"
          name="body"
          label="Body"
          placeholder="Body/Content. Read the markdown guide (question icon) to style your text."
          fullWidth
          multiline
          rows={16}
          onChange={handleChange}
          value={announcement.body}
          required
          error={announcement.body.length > 1500}
          sx={{ mb: 4 }}
          InputProps={{ style: { fontSize: "1.2rem" } }}
        />

        <Divider />

        <TextField
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
          sx={{ mb: 4 }}
        />

        <Grid
          container
          spacing={2}
          pb={8}
          sx={{ display: "flex", alignItems: "center" }}
        >
          <Grid item xs={12} sm={6}>
            <Select
              id="type"
              name="type"
              value={announcement.type}
              label="Announcement Type"
              placeholder="Announcement Type"
              onChange={handleType}
              sx={{ width: "100%" }}
            >
              {AnnounceTypeOptions.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          </Grid>
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
            xs={4}
            sm={1}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <IconButton
              onClick={handlePreview}
              sx={{ marginRight: "8px", flexGrow: 1 }}
            >
              <VisibilityIcon />
            </IconButton>
          </Grid>
          <Grid item xs={4} sx={{ display: "flex", justifyContent: "center" }}>
            {mobile ? (
              <IconButton type="submit">
                <SendIcon />
              </IconButton>
            ) : (
              <Button
                type="submit"
                variant="contained"
                color="info"
                disabled={hasError}
                fullWidth
              >
                Submit
              </Button>
            )}
          </Grid>
        </Grid>
      </form>

      <DynamicPreview
        open={openPreview}
        handleClose={handlePreview}
        announcement={announcement}
      />
      <DynamicError
        open={announcement.error}
        error={announcement.errorMessage}
        handleClose={handleErrorClose}
      />
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
