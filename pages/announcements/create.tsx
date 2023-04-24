import {
  Grid,
  Box,
  IconButton,
  Button,
  useTheme,
  useMediaQuery,
  Typography,
  Container,
  Snackbar,
  Alert,
  AlertColor,
} from "@mui/material";
import { useSession } from "next-auth/react";
import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import { useRef, useState, MutableRefObject, useContext } from "react";
import Media from "../../Components/Announcement/Media";
import { getImages, getVideo } from "../../utils/mediaOps/getMedia";
import { uploadImages, uploadVideo } from "../../utils/mediaOps/uploadMedia";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import dayjs from "dayjs";
import dynamic from "next/dynamic";
import SendIcon from "@mui/icons-material/Send";
import HelpIcon from "@mui/icons-material/Help";
import VideocamIcon from "@mui/icons-material/Videocam";
import { ErrorContext } from "../../Components/ErrorProvider";
import MarkdownInput from "../../Components/Announcement/MarkdownInput";

const DynamicGuide = dynamic(
  () => import("../../Components/Announcement/MarkdownGuide")
);

interface AnnouncementState {
  header: string;
  body: string;
  footer: string;
  image: string[];
  video: string;
}

type Status = "pending" | "success" | "failure";

interface StatusState {
  open: boolean;
  statusMessage: string;
  status: Status;
}

const initAnnounce: AnnouncementState = {
  header: "",
  body: "",
  footer: "",
  image: [],
  video: "",
};

const initStatus: StatusState = {
  open: false,
  statusMessage: "",
  status: "pending",
};

const severityMap = { pending: "info", success: "success", failure: "error" };

const CreateAnnouncement = () => {
  const handleError = useContext(ErrorContext);
  const router = useRouter();
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));
  const imageInput = useRef<HTMLInputElement | null>(null);
  const videoInput = useRef<HTMLInputElement | null>(null);
  const [disableSubmit, setDisableSubmit] = useState(false);
  const [announcement, setAnnouncement] = useState(initAnnounce);
  const [openGuide, setOpenGuide] = useState(false);
  const [createStatus, setCreateStatus] = useState(initStatus);
  const { data: session } = useSession();
  const hasError =
    announcement.header.length > 50 ||
    announcement.body.length > 1500 ||
    announcement.footer.length > 800;

  const handleStatusClose = (
    _e?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setCreateStatus({ status: "pending", open: false, statusMessage: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAnnouncement({
      ...announcement,
      [e.currentTarget.name]: e.currentTarget.value,
    });
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
    const files = e.currentTarget.files as FileList;
    const valid = files?.length + announcement.image.length < 5;
    if (files.length != 0 && files.length < 5 && valid) {
      getImages(files, (result) => {
        setAnnouncement({
          ...announcement,
          image: [...new Set([...announcement.image, ...result])],
        });
      });
    }
  };

  const handleVideo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files as FileList;
    if (files.length != 0) {
      getVideo(files[0], (result) => {
        setAnnouncement({ ...announcement, video: result });
      });
      e.currentTarget.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDisableSubmit(true);
    setCreateStatus({
      ...createStatus,
      open: true,
      statusMessage: "Creating Announcement...",
    });
    await fetch(
      `${
        process.env.NEXT_PUBLIC_DEV_URL as string
      }/api/secure/announcements/create`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          ...announcement,
          image: await uploadImages(announcement.image),
          video: await uploadVideo(announcement.video),
          authorName: session?.user?.name,
        }),
      }
    )
      .then((response) => {
        if (!response.ok) {
          setCreateStatus({
            status: "failure",
            open: true,
            statusMessage: "Failed to create announcement.",
          });
          setDisableSubmit(false);
          throw new Error("Please provide valid information.");
        }
      })
      .then(() => {
        setCreateStatus({
          status: "success",
          open: true,
          statusMessage: "Announcement created successfully.",
        });
        setDisableSubmit(false);
        router.push("/");
      })
      .catch((err: Error) => handleError(err.message));
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

  /*   if (session?.role != "Government") {
    return (
      <>
        <Head>
          <title>PCSHS Create</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Typography variant="h4">
          You are not allowed to create announcements.
        </Typography>
      </>
    );
  }
 */
  return (
    <>
      <Head>
        <title>PCSHS Create</title>
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
              accept="image/*"
              hidden={true}
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
            Published by {session?.user?.name} on {dayjs().format("YYYY-MM-DD")}
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
      <Snackbar
        open={createStatus.open}
        autoHideDuration={6000}
        onClose={handleStatusClose}
      >
        <Alert
          severity={severityMap[createStatus.status] as AlertColor}
          sx={{ width: "100%" }}
        >
          {createStatus.statusMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default CreateAnnouncement;
