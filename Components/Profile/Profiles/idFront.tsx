import {
  Container,
  Grid,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Image from "next/image";
import Information from "../Information";
import PCSHSLogo from "../../../public/pcshslogo.png";
import styles from "../../../styles/Profile.module.css";
import { Profile } from "../../../types/PrismaTypes";

const IDFront = ({ profile }: { profile: Profile }) => {
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down("sm"));
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
            <Image
              src={profile?.image ? profile?.image : "/user-empty-avatar.png"}
              alt="2x2 Student Image"
              width={sm ? 144 : 288}
              height={sm ? 144 : 288}
            />
          </Grid>

          <Grid item xs={7} sx={{ border: "1px solid grey" }}>
            <Typography variant={sm ? "body1" : "h5"}>
              LRN: {profile?.lrn ?? ""}
            </Typography>
          </Grid>

          <Grid item xs={1} />

          <Grid item xs={4} sx={{ border: "1px solid grey" }}>
            <Typography variant={sm ? "h6" : "h5"}>
              Sex:{" "}
              {profile?.sex
                ? sm
                  ? profile?.sex.charAt(0)
                  : profile?.sex
                : "N/A"}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Information
              title={"NAME"}
              info={profile?.name ?? "Unknown Student"}
            />
          </Grid>

          <Grid item xs={12}>
            <Information
              title={"Grade & Section"}
              info={`${profile?.current_grade || "N/A"} - ${
                profile?.current_section || "N/A"
              }`}
            />
          </Grid>

          <Grid item xs={12}>
            <Information title={"Role"} info={profile?.role ?? "Unknown"} />
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};

export default IDFront;
