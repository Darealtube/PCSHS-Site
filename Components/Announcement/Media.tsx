import Image from "next/image";
import { Grid, Box, IconButton } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import React from "react";
import { AnnounceAction } from "../../utils/Reducers/announceReducer";

type Props = {
  images: string[];
  video: string | null;
  dispatch: React.Dispatch<AnnounceAction>;
};

const Media = ({ images, video, dispatch }: Props) => {
  const handleDeleteMedia = (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch({
      type: "CHANGE",
      field: "image",
      payload: images.filter((image) => image != e.currentTarget.value),
    });
  };

  const handleDeleteVideo = (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch({
      type: "CHANGE",
      field: "video",
      payload: "",
    });
    URL.revokeObjectURL(e.currentTarget.value);
  };

  return (
    <Grid container sx={{ height: "100%", width: "100%" }} spacing={1}>
      {images.map((image) => (
        <React.Fragment key={image}>
          <Grid item xs={images.length > 1 ? 6 : 12}>
            <Box
              width="100%"
              height="100%"
              position="relative"
              border="1px solid grey"
              borderRadius="2%"
            >
              <IconButton
                sx={{ zIndex: 1 }}
                value={image}
                onClick={handleDeleteMedia}
              >
                <CancelIcon />
              </IconButton>
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
      {video && (
        <>
          <IconButton
            sx={{ zIndex: 1, position: "absolute" }}
            onClick={handleDeleteVideo}
            value={video}
          >
            <CancelIcon />
          </IconButton>
          {video && (
            <video
              src={video}
              autoPlay
              muted
              loop
              width="100%"
              height="480px"
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <source src="video.webm" type="video/webm" />
              <source src="video.mp4" type="video/mp4" />
              <source src="video.ogv" type="video/ogv" />
            </video>
          )}
        </>
      )}
    </Grid>
  );
};

export default Media;
