import {
  Divider,
  Typography,
  Grid,
  useMediaQuery,
  useTheme,
} from "@mui/material";

type InformationProps = {
  title: string;
  info: string | null;
};

const Information = ({ title, info }: InformationProps) => {
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <>
      <Grid item xs={12}>
        <Typography variant={sm ? "h6" : "h5"} align="center" gutterBottom>
          {info}
        </Typography>
        <Divider />
        <Typography variant={sm ? "body1" : "h6"} align="center">
          {title}
        </Typography>
      </Grid>
    </>
  );
};

export default Information;
