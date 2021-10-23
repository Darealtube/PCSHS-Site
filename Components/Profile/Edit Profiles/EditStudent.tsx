import {
  Grid,
  IconButton,
  Typography,
  Divider,
  TextField,
  Button,
  TextFieldProps,
  Select,
  SelectChangeEvent,
  MenuItem,
} from "@mui/material";
import NextImage from "next/image";
import { Box } from "@mui/system";
import React, { Dispatch, MutableRefObject, useRef } from "react";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import {
  ProfileAction,
  ProfileState,
} from "../../../utils/Reducers/profileReducer";
import dayjs from "dayjs";
import { DesktopDatePicker } from "@mui/lab";
import { GradeOptions, SexOptions } from "../../../utils/selectOptions";
import { getPFP } from "../../../utils/getpfp";
import Link from "next/link";
import Information from "../Information";

const EditStudentProfile = ({
  student,
  dispatch,
}: {
  student: ProfileState;
  dispatch: Dispatch<ProfileAction>;
}) => {
  const imageInput = useRef<HTMLInputElement | null>(null);
  const hasError =
    student.name.length > 40 ||
    student.lrn.length > 12 ||
    student.current_section.length > 20 ||
    student.contact.length > 11 ||
    student.about.length > 500;

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

  const handleDate = (newValue: Date | null) => {
    dispatch({
      type: "CHANGE",
      payload: dayjs(newValue).format("MM/DD/YYYY"),
      field: "date_of_birth",
    });
  };

  const handleImageClick = () => {
    if (student.error) {
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
      <Grid container spacing={2}>
        <Grid
          item
          xs={12}
          sm={4}
          md={12}
          xl={4}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            position="relative"
            width={228}
            height={228}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <IconButton
              size="large"
              onClick={handleImageClick}
              sx={{ zIndex: 12 }}
            >
              <CameraAltIcon />
            </IconButton>
            <NextImage
              src={student.image}
              alt="2x2 Student Image"
              layout="fill"
              objectFit="cover"
            />
            <input
              type="file"
              hidden={true}
              ref={imageInput}
              onChange={handleImage}
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={8} md={12} xl={8}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h4" align="center">
                {student?.name}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Information
                title="Learner's Reference Number"
                info={student?.lrn as string | null}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Select
                id="current_grade"
                name="current_grade"
                value={student.current_grade}
                label="Grade"
                placeholder="Grade"
                onChange={handleSelect}
                fullWidth
              >
                {GradeOptions.map((grade) => (
                  <MenuItem key={grade} value={grade}>
                    {grade}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="current_section"
                name="current_section"
                placeholder="Section"
                label="Section"
                value={student.current_section}
                variant="standard"
                onChange={handleChange}
                fullWidth
                error={student.current_section.length > 20}
                helperText={
                  student.current_section.length > 20 ? (
                    <Typography>Invalid Section</Typography>
                  ) : (
                    " "
                  )
                }
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6} md={12} xl={6}>
          <Box marginTop={2} width="100%">
            <DesktopDatePicker
              label="Date of Birth"
              inputFormat="MM/DD/YYYY"
              value={dayjs(student.date_of_birth).format("MM/DD/YYYY")}
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
          </Box>
          <Select
            id="sex"
            name="sex"
            value={student.sex}
            label="Sex"
            placeholder="Sex"
            onChange={handleSelect}
            fullWidth
            sx={{ marginTop: "16px" }}
          >
            {SexOptions.map((sex) => (
              <MenuItem key={sex} value={sex}>
                {sex}
              </MenuItem>
            ))}
          </Select>
          <TextField
            id="email"
            name="email"
            placeholder="Email"
            label="Email"
            value={student.email}
            variant="standard"
            onChange={handleChange}
            fullWidth
            sx={{ marginTop: "16px" }}
            type="email"
          />
          <TextField
            id="contact"
            name="contact"
            placeholder="Contact"
            label="Contact"
            value={student.contact}
            variant="standard"
            onChange={handleChange}
            fullWidth
            sx={{ marginTop: "16px" }}
            error={student.contact.length > 11}
            helperText={
              student.contact.length > 11 ? (
                <Typography>Invalid LRN</Typography>
              ) : (
                " "
              )
            }
          />
          <TextField
            id="address"
            name="address"
            placeholder="Address"
            label="Address"
            value={student.address}
            variant="standard"
            onChange={handleChange}
            fullWidth
            sx={{ marginTop: "16px" }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={12} xl={6}>
          <Typography
            variant="h5"
            align="center"
            gutterBottom
            sx={{ marginTop: "20px" }}
          >
            About
          </Typography>
          <Divider />
          <TextField
            id="about"
            name="about"
            placeholder="About"
            label="About"
            fullWidth
            variant="outlined"
            sx={{ marginTop: "8px" }}
            onChange={handleChange}
            value={student?.about}
            multiline
            rows={8}
            error={student.about.length > 500}
            helperText={
              student.about.length > 500 ? (
                <Typography>Please explain yourself briefly.</Typography>
              ) : (
                " "
              )
            }
          />
        </Grid>
        <Grid item xs={6} sx={{ marginBottom: "8px" }}>
          <Link href="/profile/" passHref>
            <Button variant="outlined" fullWidth component="a">
              Cancel
            </Button>
          </Link>
        </Grid>
        <Grid item xs={6} sx={{ marginBottom: "8px" }}>
          <Button
            type="submit"
            variant="outlined"
            fullWidth
            disabled={hasError}
          >
            Update Profile
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default EditStudentProfile;
