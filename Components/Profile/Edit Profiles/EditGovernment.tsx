import {
  Grid,
  IconButton,
  Typography,
  TextField,
  Button,
  Divider,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import NextImage from "next/image";
import { Box } from "@mui/system";
import React, { Dispatch, MutableRefObject, useRef, useState } from "react";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import {
  ProfileAction,
  ProfileState,
} from "../../../utils/Reducers/profileReducer";
import { getImage } from "../../../utils/getImage";
import Link from "next/link";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import dynamic from "next/dynamic";

const DynamicAddDialog = dynamic(() => import("./addRowDialog"));

const EditGovernmentProfile = ({
  government,
  dispatch,
}: {
  government: ProfileState;
  dispatch: Dispatch<ProfileAction>;
}) => {
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const imageInput = useRef<HTMLInputElement | null>(null);
  const hasError =
    government.name.length > 40 ||
    government.contact.length > 11 ||
    government.about.length > 500;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: "CHANGE",
      payload: e.currentTarget.value,
      field: e.currentTarget.name,
    });
  };

  const handleImageClick = () => {
    if (government.error) {
      dispatch({ type: "ERROR", payload: "" });
    }
    (imageInput as MutableRefObject<HTMLInputElement>).current.click();
  };

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if ((e.currentTarget.files as FileList)?.length != 0) {
      getImage(e.currentTarget.files as FileList, (result, error) => {
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

  const handleAddRow = (member: string) => {
    dispatch({ type: "ADD_MEMBER", payload: member });
  };

  const handleDeleteRow = (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch({
      type: "DELETE_MEMBER",
      payload: e.currentTarget.value,
    });
  };

  const handleOpenDialog = () => {
    setAddDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setAddDialogOpen(false);
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
              src={government.image}
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
          <Typography variant="h4" align="center">
            {government?.name}
          </Typography>
        </Grid>
      </Grid>

      <Grid container spacing={4}>
        <Grid item xs={12} sm={6} md={12} xl={6}>
          <TextField
            id="email"
            name="email"
            placeholder="Email"
            label="Email"
            value={government.email}
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
            value={government.contact}
            variant="standard"
            onChange={handleChange}
            fullWidth
            sx={{ marginTop: "16px" }}
            error={government.contact.length > 11}
            helperText={
              government.contact.length > 11 ? (
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
            value={government.address}
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
            value={government?.about}
            multiline
            rows={8}
            error={government.about.length > 500}
            helperText={
              government.about.length > 500 ? (
                <Typography>Please explain yourself briefly.</Typography>
              ) : (
                " "
              )
            }
          />
        </Grid>

        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center"></TableCell>
                  <TableCell align="center">Name</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(government.members as string[]).map((member, index) => (
                  <TableRow key={index}>
                    <TableCell align="center">
                      <IconButton
                        value={member}
                        onClick={handleDeleteRow}
                        size="large"
                      >
                        <RemoveIcon />
                      </IconButton>
                    </TableCell>
                    <TableCell align="center">{member}</TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell align="center" colSpan={3}>
                    <IconButton onClick={handleOpenDialog} size="large">
                      <AddIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>

        <Grid item xs={12} sm={6} sx={{ marginBottom: "8px" }}>
          <Link href="/profile/" passHref>
            <Button variant="outlined" fullWidth component="a">
              Cancel
            </Button>
          </Link>
        </Grid>
        <Grid item xs={12} sm={6} sx={{ marginBottom: "8px" }}>
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
      <DynamicAddDialog
        handleAddRow={handleAddRow}
        open={addDialogOpen}
        handleCloseDialog={handleCloseDialog}
      />
    </>
  );
};

export default EditGovernmentProfile;
