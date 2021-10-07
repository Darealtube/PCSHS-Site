import { Divider, Typography } from "@mui/material";
import { Box } from "@mui/system";

type InformationProps = {
  title: string;
  info: string | null;
};

const Information = ({ title, info }: InformationProps) => {
  return (
    <>
      <Box display="flex" flexDirection="column" marginTop={1}>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {info || "Not yet specified"}
        </Typography>
      </Box>
      <Divider />
    </>
  );
};

export default Information;
