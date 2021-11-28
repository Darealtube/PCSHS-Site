import {
  Container,
  Grid,
  Paper,
  TextField,
  TextFieldProps,
  Divider,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import styles from "../../../styles/Profile.module.css";
import { DesktopDatePicker } from "@mui/lab";
import {
  ProfileAction,
  ProfileState,
} from "../../../utils/Reducers/profileReducer";
import dayjs from "dayjs";
import { Dispatch } from "react";

const EditIDBack = ({
  profile,
  dispatch,
}: {
  profile: ProfileState;
  dispatch: Dispatch<ProfileAction>;
}) => {
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down("sm"));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: "CHANGE",
      payload: e.currentTarget.value,
      field: e.currentTarget.name,
    });
  };

  const handleDate = (newValue: Date | null) => {
    dispatch({
      type: "CHANGE",
      payload: dayjs(newValue).format("MM/DD/YYYY"),
      field: "date_of_birth",
    });
  };

  return (
    <>
      <Paper
        elevation={2}
        className={styles.idBack}
        sx={{
          backgroundImage: "url(/pcshsPictures/vision.jpeg)",
          backgroundSize: "cover",
          backgroundColor: "#ffe8d6",
          backgroundBlendMode: "screen",
        }}
        component={Container}
      >
        <Grid
          container
          spacing={2}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Grid item xs={12}>
            <DesktopDatePicker
              label="Date of Birth"
              inputFormat="MM/DD/YYYY"
              value={dayjs(profile.date_of_birth).format("MM/DD/YYYY")}
              onChange={handleDate}
              renderInput={(
                params: JSX.IntrinsicAttributes & TextFieldProps
              ) => (
                <TextField
                  sx={{ width: "100%", marginTop: "16px" }}
                  {...params}
                />
              )}
            />
            <Divider />
            <Typography variant={sm ? "body1" : "h6"} align="center">
              Date of Birth
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <TextField
              id="email"
              name="email"
              placeholder="Email"
              label="Email"
              value={profile.email}
              variant="standard"
              onChange={handleChange}
              fullWidth
              sx={{ marginTop: "16px" }}
              type="email"
            />
            <Divider />
            <Typography variant={sm ? "body1" : "h6"} align="center">
              Email
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="contact"
              name="contact"
              placeholder="Contact"
              label="Contact"
              value={profile.contact}
              variant="standard"
              onChange={handleChange}
              fullWidth
              sx={{ marginTop: "16px" }}
              error={profile.contact.length > 11}
            />
            <Divider />
            <Typography variant={sm ? "body1" : "h6"} align="center">
              Contact
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="address"
              name="address"
              placeholder="Address"
              label="Address"
              value={profile.address}
              variant="standard"
              onChange={handleChange}
              fullWidth
              sx={{ marginTop: "16px" }}
            />
            <Divider />
            <Typography variant={sm ? "body1" : "h6"} align="center">
              Address
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <TextField
              id="about"
              name="about"
              placeholder="About"
              label="About"
              fullWidth
              variant="outlined"
              sx={{ marginTop: "8px" }}
              onChange={handleChange}
              value={profile?.about}
              multiline
              rows={8}
              error={profile.about.length > 500}
              helperText={
                profile.about.length > 500 ? (
                  <Typography>Please explain yourself briefly.</Typography>
                ) : (
                  " "
                )
              }
            />
            <Divider />
            <Typography variant={sm ? "body1" : "h6"} align="center">
              About
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};

export default EditIDBack;
