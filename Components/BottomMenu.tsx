import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import EventIcon from "@mui/icons-material/Event";
import { Box } from "@mui/system";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import { useState } from "react";

const BottomMenu = () => {
  const [value, setValue] = useState(0);

  const handleMenu = (_event: any, newValue: number) => {
    setValue(newValue);
  };

  return (
    <BottomNavigation
      showLabels
      value={value}
      onChange={handleMenu}
      sx={{ backgroundColor: "#0077b6" }}
    >
      <BottomNavigationAction
        label="About PCSHS"
        icon={<InfoIcon />}
        sx={{
          color: "white",
        }}
      />
      <BottomNavigationAction
        label="Events"
        icon={<EventIcon />}
        sx={{
          color: "white",
        }}
      />
      <BottomNavigationAction
        label="Admissions"
        icon={<AssignmentIndIcon />}
        sx={{
          color: "white",
        }}
      />
    </BottomNavigation>
  );
};

export default BottomMenu;
