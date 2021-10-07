import { Divider, Grid, Typography } from "@mui/material";
import Image from "next/image";
import { Box } from "@mui/system";
import Information from "../Information";

type Visitor = {
  name: string;
  image: string | null;
  age: string | null;
  date_of_birth: Date | null;
  sex: string | null;
  address: string | null;
  contact: string | null;
  email: string | null;
  role: string;
} | null;

const VisitorProfile = ({ visitor }: { visitor: Visitor }) => {
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
              src={visitor?.image ? visitor?.image : "/user-empty-avatar.png"}
              alt="2x2 Visitor Image"
              layout="fill"
              objectFit="cover"
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={8} md={12} xl={8}>
          <Box display="flex" flexDirection="column">
            <Typography variant="h4" align="center">
              {visitor?.name}
            </Typography>
            <Information title="Age" info={visitor?.age as string | null} />
            <Information
              title={"I am a"}
              info={visitor?.role as string | null}
            />
          </Box>
        </Grid>
      </Grid>

      <Information
        title="Date of Birth"
        info={visitor?.date_of_birth as string | null}
      />
      <Information title="Sex" info={visitor?.sex as string | null} />
      <Information title="Email" info={visitor?.email as string | null} />
      <Information title="Contact" info={visitor?.contact as string | null} />
      <Information title="Address" info={visitor?.address as string | null} />
    </>
  );
};

export default VisitorProfile;
