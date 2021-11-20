import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import EventIcon from "@mui/icons-material/Event";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import { SyntheticEvent, useState } from "react";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";

const NavOptions = ["/about", "/calendar", "/apply"];

const BottomMenu = () => {
  const router = useRouter();
  const [value, setValue] = useState(NavOptions.indexOf(router.pathname));

  const handleMenu = (
    event: SyntheticEvent<Element, Event>,
    newValue: number
  ) => {
    setValue(newValue);
    router.push(event.currentTarget.id);
  };

  return (
    <BottomNavigation
      showLabels
      value={value}
      onChange={handleMenu}
      sx={{ backgroundColor: "#0077b6" }}
    >
      <BottomNavigationAction
        id="/about"
        label="About PCSHS"
        icon={<InfoIcon />}
        sx={{
          color: "white",
        }}
      />

      <BottomNavigationAction
        id="/calendar"
        label="Events"
        icon={<EventIcon />}
        sx={{
          color: "white",
        }}
      />

      <BottomNavigationAction
        id="/apply"
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
