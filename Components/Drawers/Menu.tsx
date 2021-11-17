import {
  Drawer,
  Divider,
  Container,
  useTheme,
  useMediaQuery,
  List,
  ListItemText,
  ListItemButton,
  ListItemIcon,
  Collapse,
  Typography,
} from "@mui/material";
import styles from "../../styles/Announcement.module.css";
import InfoIcon from "@mui/icons-material/Info";
import EventIcon from "@mui/icons-material/Event";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import VisibilityIcon from "@mui/icons-material/Visibility";
import FlagIcon from "@mui/icons-material/Flag";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import HistoryIcon from "@mui/icons-material/History";
import CallIcon from "@mui/icons-material/Call";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import AssignmentIcon from "@mui/icons-material/Assignment";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { ReactNode, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/dist/client/router";
import { Box } from "@mui/system";

type ItemProps = {
  title: string;
  icon: ReactNode;
  link?: string;
};

interface MenuProps extends ItemProps {
  onClick: () => void;
  open: boolean;
}

const PCSHSMenuItem = ({ title, icon, link }: ItemProps) => {
  const router = useRouter();
  const focused = router.pathname == link;
  return (
    <>
      <Link passHref href={link as string}>
        <ListItemButton
          sx={{
            pl: 4,
            backgroundColor: focused ? "#94d2bd" : "inherit",
          }}
          component="a"
        >
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText primary={title} />
        </ListItemButton>
      </Link>
      <Divider variant="inset" component="li" />
    </>
  );
};

const PCSHSMenu = ({ onClick, open, title, icon }: MenuProps) => {
  return (
    <>
      <ListItemButton onClick={onClick} divider>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={title} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
    </>
  );
};

const MenuBar = () => {
  const router = useRouter();
  const theme = useTheme();
  const tablet = useMediaQuery(theme.breakpoints.only("md"));
  const drawerWidth = tablet ? "40%" : "24%";
  const [aboutOpen, setAboutOpen] = useState(true);
  const [admitOpen, setAdmitOpen] = useState(true);

  const handleAboutClick = () => {
    setAboutOpen(!aboutOpen);
  };

  const handleAdmitClick = () => {
    setAdmitOpen(!admitOpen);
  };

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
      variant="permanent"
      anchor="right"
    >
      <Container className={styles.menuBar}>
        <List sx={{ width: "100%" }} component="nav">
          <PCSHSMenu
            open={aboutOpen}
            onClick={handleAboutClick}
            title="About PCSHS"
            icon={<InfoIcon />}
          />
          <Collapse in={aboutOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <PCSHSMenuItem
                title="Vision"
                icon={<VisibilityIcon />}
                link="/about"
              />
              <PCSHSMenuItem
                title="Mission"
                icon={<FlagIcon />}
                link="/about"
              />
              <PCSHSMenuItem
                title="Objectives"
                icon={<AssignmentTurnedInIcon />}
                link="/about"
              />
              <PCSHSMenuItem
                title="History"
                icon={<HistoryIcon />}
                link="/about"
              />
              <PCSHSMenuItem
                title="Contacts"
                icon={<CallIcon />}
                link="/about"
              />
            </List>
          </Collapse>

          <Link passHref href="/calendar">
            <ListItemButton
              component="a"
              sx={
                router.pathname == "/calendar"
                  ? { backgroundColor: "#94d2bd" }
                  : {}
              }
              divider
            >
              <ListItemIcon>
                <EventIcon />
              </ListItemIcon>
              <ListItemText primary="Event Calendar" />
            </ListItemButton>
          </Link>

          <PCSHSMenu
            title="Applications"
            icon={<AssignmentIndIcon />}
            onClick={handleAdmitClick}
            open={admitOpen}
          />
          <Collapse in={admitOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <PCSHSMenuItem
                title="Admission"
                icon={<AssignmentIcon />}
                link="/admission"
              />
              <PCSHSMenuItem
                title="Curriculum"
                icon={<AutoStoriesIcon />}
                link="/curriculum"
              />
              <PCSHSMenuItem
                title="Apply"
                icon={<PersonAddIcon />}
                link="/apply"
              />
            </List>
          </Collapse>

          <a
            target="_blank"
            href="https://www.pcshs.org/resources"
            rel="noopener noreferrer"
            style={{ color: "inherit", textDecoration: "none" }}
          >
            <ListItemButton component="a" divider>
              <ListItemIcon>
                <MenuBookIcon />
              </ListItemIcon>
              <ListItemText primary="Learning Resources" />
            </ListItemButton>
          </a>
        </List>
      </Container>

      <Box
        height="80px"
        sx={{
          backgroundColor: "#03045e",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography align="center" variant="body1" color="white">
          ©2021 by Pasig City Science High School
        </Typography>
      </Box>
    </Drawer>
  );
};

export default MenuBar;
