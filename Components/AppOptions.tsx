import { IconButton, Tooltip } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import EventIcon from "@mui/icons-material/Event";
import PersonIcon from "@mui/icons-material/Person";
import { Box } from "@mui/system";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import { ReactNode, useState } from "react";
import dynamic from "next/dynamic";

const DynamicAboutMenu = dynamic(() => import("./Menus/AboutMenu"));
const DynamicAdmissionMenu = dynamic(() => import("./Menus/AdmissionMenu"));
const DynamicProfileMenu = dynamic(() => import("./Menus/ProfileMenu"));

type OptionComponentProps = {
  title: string;
  name: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  icon: ReactNode;
};

const Option = ({ title, name, onClick, icon }: OptionComponentProps) => {
  return (
    <>
      <Tooltip title={title}>
        <IconButton size="large" name={name} onClick={onClick}>
          {icon}
        </IconButton>
      </Tooltip>
    </>
  );
};

const AppOptions = () => {
  const [openMenu, setOpenMenu] = useState("");
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setMenuAnchor(event.currentTarget);
    setOpenMenu(event.currentTarget.name);
  };
  const handleCloseMenu = () => {
    setMenuAnchor(null);
    setOpenMenu("");
  };

  return (
    <>
      <Box sx={{ marginRight: "24px" }}>
        <Option
          title="About PCSHS"
          name="about"
          onClick={handleOpenMenu}
          icon={<InfoIcon />}
        />
        <Option
          title="Calendar of Events"
          name="events"
          onClick={handleOpenMenu}
          icon={<EventIcon />}
        />
        <Option
          title="Admissions and Applications"
          name="admissions"
          onClick={handleOpenMenu}
          icon={<AssignmentIndIcon />}
        />
        <Option
          title="Student Profile"
          name="profile"
          onClick={handleOpenMenu}
          icon={<PersonIcon />}
        />
      </Box>
      <DynamicAboutMenu
        open={openMenu == "about"}
        closeMenu={handleCloseMenu}
        anchor={menuAnchor}
      />
      <DynamicAdmissionMenu
        open={openMenu == "admissions"}
        closeMenu={handleCloseMenu}
        anchor={menuAnchor}
      />
      <DynamicProfileMenu
        open={openMenu == "profile"}
        closeMenu={handleCloseMenu}
        anchor={menuAnchor}
      />
    </>
  );
};

export default AppOptions;
