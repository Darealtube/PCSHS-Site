import { Grid, GridDirection, Fade, Grow } from "@mui/material";
import { ResponsiveStyleValue } from "@mui/system";
import { ReactNode } from "react";
import Image, { StaticImageData } from "next/image";
import VisibilitySensor from "react-visibility-sensor";

const Procedure = ({
  image,
  children,
  direction = "row",
}: {
  image: string | StaticImageData;
  children: ReactNode;
  direction?: ResponsiveStyleValue<GridDirection> | undefined;
}) => {
  return (
    <>
      <Grid container spacing={4} pb={14} direction={direction}>
        <VisibilitySensor partialVisibility>
          {({ isVisible }) => (
            <>
              <Fade in={isVisible} timeout={1000}>
                <Grid item xs={12} xl={6}>
                  <Image
                    src={image}
                    placeholder="blur"
                    width={1200}
                    height={800}
                    alt="Stock Image"
                  />
                </Grid>
              </Fade>

              <Grow in={isVisible} timeout={800}>
                <Grid
                  item
                  xs={12}
                  xl={6}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                  }}
                >
                  {children}
                </Grid>
              </Grow>
            </>
          )}
        </VisibilitySensor>
      </Grid>
    </>
  );
};

export default Procedure;
