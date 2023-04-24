import Image from "next/image";
import { Grid, Box, IconButton } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import React from "react";

type Props = {
  images: string[];
  video: string | null;
  handleDeleteImages: (e: React.MouseEvent<HTMLButtonElement>) => void;
  handleDeleteVideo: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const Media = ({
  images,
  video,
  handleDeleteImages,
  handleDeleteVideo,
}: Props) => {
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
                onClick={handleDeleteImages}
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
              <source src={video} type="video/webm" />
              <source src={video} type="video/mp4" />
              <source src={video} type="video/ogv" />
            </video>
          )}
        </>
      )}
    </Grid>
  );
};

export default Media;
