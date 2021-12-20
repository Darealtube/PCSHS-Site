import { Box, Container, Dialog, IconButton, Slide } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import Image from "next/image";
import { useState } from "react";

type Preview = {
  open: boolean;
  index: number;
};

type PreviewProps = {
  preview: Preview;
  handleClose: () => void;
  switchPrev: (action: "next" | "prev") => void;
  images: string[];
};

type SlideDirection = "left" | "right" | "up" | "down" | undefined;

const ImagePreview = ({
  preview,
  handleClose,
  images,
  switchPrev,
}: PreviewProps) => {
  const { index } = preview;
  const [slideIn, setSlideIn] = useState(true);
  const [slideDirection, setSlideDirection] = useState("left");
  const noImage = index === -1;
  const lastImage = index + 1 === images.length;
  const firstImage = index === 0;

  const handleImageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  const handleSwitchImage = (action: "next" | "prev") => {
    setSlideDirection(action == "next" ? "right" : "left");
    setSlideIn(false);

    setTimeout(() => {
      switchPrev(action);
      setSlideDirection(action == "next" ? "left" : "right");
      setSlideIn(true);
    }, 250);
  };

  return (
    <Dialog
      fullScreen
      open={preview.open}
      PaperProps={{
        style: {
          backgroundColor: "transparent",
          boxShadow: "none",
          overflow: "hidden",
        },
        onClick: handleClose,
      }}
    >
      <IconButton
        edge="start"
        color="inherit"
        onClick={handleClose}
        sx={{ position: "absolute", zIndex: 2, mt: 10, ml: 1, color: "white" }}
      >
        <CloseIcon />
      </IconButton>

      <Container
        sx={{
          mb: 10,
          mt: 10,
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
        }}
        onClick={handleImageClick}
      >
        <IconButton
          edge="start"
          color="inherit"
          onClick={() => handleSwitchImage("prev")}
          sx={{
            color: "white",
            display: firstImage || noImage ? "none" : "block",
          }}
        >
          <NavigateBeforeIcon />
        </IconButton>

        <Slide
          direction={slideDirection as SlideDirection}
          in={slideIn}
          appear={false}
        >
          <Box width="100%" height="100%" position="relative">
            {!noImage && (
              <Image
                src={images[index]}
                layout="fill"
                objectFit="contain"
                alt={"Image"}
              />
            )}
          </Box>
        </Slide>

        <IconButton
          color="inherit"
          onClick={() => handleSwitchImage("next")}
          sx={{
            color: "white",
            display: lastImage || noImage ? "none" : "block",
          }}
        >
          <NavigateNextIcon />
        </IconButton>
      </Container>
    </Dialog>
  );
};

export default ImagePreview;
