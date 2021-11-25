import { Container, Grid, Paper } from "@mui/material";
import Information from "../Information";
import styles from "../../../styles/Profile.module.css";
import { Profile } from "../../../types/PrismaTypes";

const IDBack = ({ profile }: { profile: Profile }) => {
  return (
    <>
      <Paper elevation={2} className={styles.idBack} component={Container}>
        <Grid
          container
          spacing={2}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Information
            title={"Date of Birth"}
            info={profile?.date_of_birth ?? "Unknown"}
          />
          <Information title={"Email"} info={profile?.email ?? "Unknown"} />
          <Information title={"Contact"} info={profile?.contact ?? "Unknown"} />
          <Information title={"Address"} info={profile?.address ?? "Unknown"} />
          <Information title={"About"} info={profile?.about ?? "Unknown"} />
        </Grid>
      </Paper>
    </>
  );
};

export default IDBack;
