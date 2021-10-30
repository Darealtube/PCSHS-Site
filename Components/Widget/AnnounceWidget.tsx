import {
  Divider,
  Grid,
  Stack,
  Box,
  TextField,
  IconButton,
  Button,
  useTheme,
  useMediaQuery,
  SelectChangeEvent,
  Select,
  MenuItem,
  Collapse,
} from "@mui/material";
import styles from "../../styles/Widget.module.css";
import ImageIcon from "@mui/icons-material/Image";
import VideocamIcon from "@mui/icons-material/Videocam";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import InsertLinkIcon from "@mui/icons-material/InsertLink";
import { useSession } from "next-auth/client";
import React, {
  MutableRefObject,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import dynamic from "next/dynamic";
import SendIcon from "@mui/icons-material/Send";
import HelpIcon from "@mui/icons-material/Help";
import announceReducer from "../../utils/Reducers/announceReducer";
import { getImages, getVideo } from "../../utils/getMedia";
import Media from "./Media";
import { uploadImages, uploadVideo } from "../../utils/uploadMedia";
import { AnnounceTypeOptions } from "../../utils/selectOptions";
import { useRouter } from "next/dist/client/router";
import { isEqual } from "lodash";
import { Announcement } from ".prisma/client";

const DynamicPreview = dynamic(() => import("./PreviewAnnouncement"));
const DynamicGuide = dynamic(() => import("./MarkdownGuide"));
const DynamicError = dynamic(() => import("../ErrorSnack"));

const initAnnounce = {
  header: "",
  body: "",
  footer: "",
  image: [],
  video: "",
  focused: "",
  error: false,
  errorMessage: "",
  type: "",
  selected: {
    start: null,
    end: null,
  },
};

const AnnounceWidget = ({
  display = false,
  mutate,
}: {
  display?: boolean;
  mutate: (newData: Announcement) => void;
}) => {
  const router = useRouter();
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));
  const imageInput = useRef<HTMLInputElement | null>(null);
  const videoInput = useRef<HTMLInputElement | null>(null);
  const headerInput = useRef<HTMLInputElement | null>(null);
  const bodyInput = useRef<HTMLInputElement | null>(null);
  const footerInput = useRef<HTMLInputElement | null>(null);
  const [announcement, dispatch] = useReducer(announceReducer, initAnnounce);
  const [openPreview, setOpenPreview] = useState(false);
  const [openGuide, setOpenGuide] = useState(false);
  const [session] = useSession();
  const hasError =
    announcement.header.length > 50 ||
    announcement.body.length > 1500 ||
    announcement.footer.length > 800;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: "CHANGE",
      field: e.currentTarget.name as keyof typeof announcement,
      payload: e.currentTarget.value,
    });
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    dispatch({
      type: "CHANGE",
      field: "focused",
      payload: e.currentTarget?.name,
    });
  };

  const handleFormat = (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch({
      type: e.currentTarget.name as
        | "BOLD"
        | "ITALIC"
        | "STRIKETHROUGH"
        | "LINK",
      field: announcement.focused as keyof typeof announcement,
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
    const { error, errorMessage, focused, selected, ...trueAnnouncement } =
      announcement;
    await fetch(
      `${process.env.NEXT_PUBLIC_DEV_URL as string}/api/createAnnouncement`,
      {
        method: "POST",
        body: JSON.stringify({
          ...trueAnnouncement,
          image: trueAnnouncement.image
            ? await uploadImages(trueAnnouncement.image)
            : null,
          video: trueAnnouncement.video
            ? await uploadVideo(trueAnnouncement.video)
            : null,
          authorName: session?.user?.name,
        }),
      }
    )
      .then(async (response) => {
        const res = await response.json();
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        dispatch({ type: "RESET" });
        mutate(res); // Display the announcement immediately.
      })
      .catch((error: Error) =>
        dispatch({ type: "ERROR", payload: error.message })
      );
  };

  const highlightText = (e: any) => {
    let textarea = e.target;
    let selection = {
      start: textarea.selectionStart,
      end: textarea.selectionEnd,
    };
    dispatch({
      type: "SELECT",
      field: textarea.name,
      payload: selection,
    });
  };

  // Used for text formatting
  useEffect(() => {
    const header = headerInput.current;
    const body = bodyInput.current;
    const footer = footerInput.current;
    header?.addEventListener("select", highlightText);
    body?.addEventListener("select", highlightText);
    footer?.addEventListener("select", highlightText);
    return () => {
      header?.removeEventListener("select", highlightText);
      body?.removeEventListener("select", highlightText);
      footer?.removeEventListener("select", highlightText);
    };
  }, []);

  useEffect(() => {
    let { error, errorMessage, focused, selected, ...trueAnnouncement } =
      announcement;
    let {
      error: initError,
      errorMessage: initErrMessage,
      focused: initFocused,
      selected: initSelected,
      ...trueInit
    } = initAnnounce;
    const confirmationMessage =
      "Changes you made in making an announcement will not be saved. Redirect?";
    const beforeUnloadHandler = (e: BeforeUnloadEvent) => {
      // Browser side
      (e || window.event).returnValue = confirmationMessage;
      return confirmationMessage;
    };
    const beforeRouteHandler = (url: string) => {
      // Client Side
      if (router.pathname !== url && !confirm(confirmationMessage)) {
        router.events.emit("routeChangeError");
        dispatch({
          type: "ERROR",
          payload: "Redirect halted due to unsaved changes.",
        });
      }
    };
    if (!isEqual(trueAnnouncement, trueInit)) {
      window.addEventListener("beforeunload", beforeUnloadHandler);
      router.events.on("routeChangeStart", beforeRouteHandler);
    } else {
      window.removeEventListener("beforeunload", beforeUnloadHandler);
      router.events.off("routeChangeStart", beforeRouteHandler);
    }
    return () => {
      window.removeEventListener("beforeunload", beforeUnloadHandler);
      router.events.off("routeChangeStart", beforeRouteHandler);
    };
  }, [router, announcement]);

  return (
    <Collapse in={display}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={11}>
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
            <TextField
              id="header"
              name="header"
              label="Header"
              placeholder="Header/Title"
              fullWidth
              onChange={handleChange}
              onFocus={handleFocus}
              value={announcement.header}
              ref={headerInput}
              required
              error={announcement.header.length > 150}
            />
            <TextField
              id="body"
              name="body"
              label="Body"
              placeholder="Body/Content. Read the markdown guide (question icon) to style your text."
              fullWidth
              multiline
              rows={4}
              sx={{ marginTop: "8px" }}
              onChange={handleChange}
              onFocus={handleFocus}
              value={announcement.body}
              ref={bodyInput}
              required
              error={announcement.body.length > 1500}
            />
            {(announcement.image.length != 0 || !!announcement.video) && (
              <Media
                images={announcement.image}
                video={announcement.video}
                dispatch={dispatch}
              />
            )}
            <TextField
              id="footer"
              name="footer"
              label="Footer"
              placeholder="Footer/Credits"
              fullWidth
              multiline
              rows={2}
              sx={{ marginTop: "8px" }}
              onChange={handleChange}
              onFocus={handleFocus}
              value={announcement.footer}
              ref={footerInput}
              error={announcement.footer.length > 800}
            />
          </Grid>
          <Grid item xs={12} sm={1}>
            <Stack
              direction={mobile ? "row" : "column"}
              divider={<Divider />}
              sx={{
                height: !mobile ? "300px" : "40px",
                overflow: "auto",
                display: "flex",
                alignItems: "center",
              }}
              className={styles.options}
              spacing={2}
            >
              <IconButton
                name="IMAGE"
                onClick={handleImageClick}
                disabled={
                  !!announcement.video || announcement.image.length == 4
                }
              >
                <ImageIcon />
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
              <IconButton
                name="BOLD"
                onClick={handleFormat}
                disabled={!announcement.focused}
              >
                <FormatBoldIcon />
              </IconButton>
              <IconButton
                name="ITALIC"
                onClick={handleFormat}
                disabled={!announcement.focused}
              >
                <FormatItalicIcon />
              </IconButton>
              <IconButton
                name="STRIKETHROUGH"
                onClick={handleFormat}
                disabled={!announcement.focused}
              >
                <FormatUnderlinedIcon />
              </IconButton>
              <IconButton
                name="LINK"
                onClick={handleFormat}
                disabled={!announcement.focused}
              >
                <InsertLinkIcon />
              </IconButton>
            </Stack>
          </Grid>
        </Grid>
        <Box
          display="flex"
          flexDirection={mobile ? "column" : "row"}
          marginTop={1}
        >
          <Select
            id="type"
            name="type"
            value={announcement.type}
            label="Announcement Type"
            placeholder="Announcement Type"
            onChange={handleType}
            sx={{ flexGrow: 1 }}
          >
            {AnnounceTypeOptions.map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </Select>
          <Box display="flex" justifyContent="center" alignItems="center">
            <IconButton onClick={handleGuide} sx={{ marginRight: "8px" }}>
              <HelpIcon />
            </IconButton>
            <IconButton onClick={handlePreview} sx={{ marginRight: "8px" }}>
              <VisibilityIcon />
            </IconButton>
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
              >
                Submit
              </Button>
            )}
          </Box>
        </Box>
        <DynamicGuide open={openGuide} handleClose={handleGuide} />
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
      </form>
    </Collapse>
  );
};

export default AnnounceWidget;
