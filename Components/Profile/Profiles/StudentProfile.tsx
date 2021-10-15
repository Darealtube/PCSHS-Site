import { Divider, Grid, Typography } from "@mui/material";
import Image from "next/image";
import { Box } from "@mui/system";
import Information from "../Information";
import { Student } from "../../../types/PrismaTypes";

const StudentProfile = ({ student }: { student: Student }) => {
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
          <Box position="relative" width={228} height={228}>
            <Image
              src={student?.image ? student?.image : "/user-empty-avatar.png"}
              alt="2x2 Student Image"
              layout="fill"
              objectFit="cover"
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={8} md={12} xl={8}>
          <Box display="flex" flexDirection="column">
            <Typography variant="h4" align="center">
              {student?.name}
            </Typography>
            <Information
              title="Learner's Reference Number"
              info={student?.lrn as string | null}
            />
            <Information
              title="Grade and Section"
              info={`${student?.current_grade || "N/A"} - ${
                student?.current_section || "N/A"
              }`}
            />
          </Box>
        </Grid>
      </Grid>

      <Grid container spacing={4}>
        <Grid item xs={12} sm={6} md={12} xl={6}>
          <Information
            title="Date of Birth"
            info={student?.date_of_birth as string | null}
          />
          <Information title="Sex" info={student?.sex as string | null} />
          <Information title="Email" info={student?.email as string | null} />
          <Information
            title="Contact"
            info={student?.contact as string | null}
          />
          <Information
            title="Address"
            info={student?.address as string | null}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={12} xl={6}>
          <Typography
            variant="h5"
            align="center"
            gutterBottom
            sx={{ marginTop: "32px" }}
          >
            About
          </Typography>
          <Divider />
          <Typography variant="body1" paragraph align="center">
            {student?.about}
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default StudentProfile;
