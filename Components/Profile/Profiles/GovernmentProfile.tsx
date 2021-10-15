import { Divider, Grid, Typography } from "@mui/material";
import Image from "next/image";
import { Box } from "@mui/system";
import Information from "../Information";
import { Government } from "../../../types/PrismaTypes";

const GovernmentProfile = ({ government }: { government: Government }) => {
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
              src={
                government?.image ? government?.image : "/user-empty-avatar.png"
              }
              alt="2x2 Government Image"
              layout="fill"
              objectFit="cover"
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={8} md={12} xl={8}>
          <Box display="flex" flexDirection="column">
            <Typography variant="h4" align="center">
              {government?.name}
            </Typography>
            <Information
              title={"I am a"}
              info={government?.role as string | null}
            />
          </Box>
        </Grid>
      </Grid>

      <Information title="Email" info={government?.email as string | null} />
      <Information
        title={"Contact"}
        info={government?.contact as string | null}
      />
      <Information
        title={"Address"}
        info={government?.address as string | null}
      />

      <Typography
        align="center"
        variant="h5"
        gutterBottom
        sx={{ marginTop: "32px" }}
      >
        Members
      </Typography>
      <Divider />

      {government?.members.map((member) => (
        <>
          <Typography align="center" variant="h6" gutterBottom>
            {member}
          </Typography>
        </>
      ))}
    </>
  );
};

export default GovernmentProfile;
