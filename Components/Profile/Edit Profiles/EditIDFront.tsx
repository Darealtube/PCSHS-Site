import {
  Container,
  Grid,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
  IconButton,
  Select,
  MenuItem,
  SelectChangeEvent,
  Divider,
  Box,
  TextField,
} from "@mui/material";
import Image from "next/image";
import Information from "../Information";
import PCSHSLogo from "../../../public/pcshslogo.png";
import styles from "../../../styles/Profile.module.css";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { GradeOptions, SexOptions } from "../../../utils/selectOptions";
import { Dispatch, MutableRefObject, useRef } from "react";
import {
  ProfileAction,
  ProfileState,
} from "../../../utils/Reducers/profileReducer";
import { getPFP } from "../../../utils/getpfp";
import { useSession } from "next-auth/client";

const EditIDFront = ({
  profile,
  dispatch,
}: {
  profile: ProfileState;
  dispatch: Dispatch<ProfileAction>;
}) => {
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down("sm"));
  const imageInput = useRef<HTMLInputElement | null>(null);
  const [session] = useSession();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: "CHANGE",
      payload: e.currentTarget.value,
      field: e.currentTarget.name,
    });
  };

  const handleSelect = (e: SelectChangeEvent) => {
    dispatch({
      type: "CHANGE",
      payload: e.target.value,
      field: e.target.name,
    });
  };

  const handleImageClick = () => {
    if (profile?.error) {
      dispatch({ type: "ERROR", payload: "" });
    }
    (imageInput as MutableRefObject<HTMLInputElement>).current.click();
  };

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if ((e.currentTarget.files as FileList)?.length != 0) {
      getPFP(e.currentTarget.files as FileList, (result, error) => {
        if (error && !result) {
          return dispatch({
            type: "ERROR",
            payload: error,
          });
        }

        return dispatch({
          type: "CHANGE",
          field: "image",
          payload: result,
        });
      });
    }
  };

  return (
    <>
      <Paper elevation={2} className={styles.idFront} component={Container}>
        <Typography align="center" variant={sm ? "h6" : "h4"} gutterBottom>
          Pasig City Science Highschool
        </Typography>
        <Typography align="center" variant={sm ? "body1" : "h5"} gutterBottom>
          R.A.V.E Park, Maybunga, Pasig City
        </Typography>

        <Grid
          container
          spacing={2}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {!sm && (
            <Grid item xs={6}>
              <Image
                src={PCSHSLogo}
                placeholder="blur"
                alt="PCSHS Logo"
                width={240}
                height={240}
              />
            </Grid>
          )}
          <Grid
            item
            xs={sm ? 12 : 6}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              mb: 1,
            }}
          >
            <IconButton
              size="large"
              onClick={handleImageClick}
              sx={{ zIndex: 1, position: "absolute" }}
            >
              <CameraAltIcon />
            </IconButton>
            <Image
              src={profile?.image as string}
              alt="2x2 Profile Image"
              width={288}
              height={288}
            />
            <input
              type="file"
              hidden={true}
              ref={imageInput}
              onChange={handleImage}
            />
          </Grid>

          <Grid item xs={7} sx={{ border: "1px solid grey" }}>
            <Typography variant={sm ? "body1" : "h5"}>
              LRN: {profile?.lrn ?? ""}
            </Typography>
          </Grid>

          <Grid item xs={1} />

          <Grid
            item
            xs={4}
            sx={{
              border: "1px solid grey",
              display: "flex",
              alignItems: "center",
            }}
          >
            {!sm && (
              <Typography variant={sm ? "h6" : "h5"} mr={2}>
                Sex:{" "}
              </Typography>
            )}
            <Select
              id="sex"
              name="sex"
              value={profile?.sex}
              label="Sex"
              placeholder="Sex"
              onChange={handleSelect}
              variant="standard"
              fullWidth
            >
              {SexOptions.map((sex) => (
                <MenuItem key={sex} value={sex}>
                  {sex}
                </MenuItem>
              ))}
            </Select>
          </Grid>

          <Grid item xs={12}>
            <Information
              title={"NAME"}
              info={profile?.name ?? "Unknown Student"}
            />
          </Grid>

          <Grid item xs={12}>
            <Box display="flex" alignItems="center">
              <Select
                id="current_grade"
                name="current_grade"
                value={profile?.current_grade}
                label="Grade"
                placeholder="Grade"
                onChange={handleSelect}
                fullWidth
                variant="standard"
                sx={{ mr: 2 }}
              >
                {GradeOptions.map((grade) => (
                  <MenuItem key={grade} value={grade}>
                    {grade}
                  </MenuItem>
                ))}
              </Select>
              -
              <TextField
                id="current_section"
                name="current_section"
                placeholder="Section"
                label="Section"
                value={profile.current_section}
                variant="standard"
                onChange={handleChange}
                fullWidth
                error={profile.current_section.length > 20}
                sx={{ ml: 2 }}
              />
            </Box>
            <Divider />
            <Typography variant={sm ? "body1" : "h6"} align="center">
              Grade &amp; Section
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Information title={"Role"} info={session?.role ?? "Unknown"} />
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};

export default EditIDFront;
