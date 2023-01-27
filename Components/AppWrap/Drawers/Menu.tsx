import {
  Drawer,
  Divider,
  Container,
  List,
  ListItemText,
  ListItemButton,
  ListItemIcon,
  Collapse,
  Typography,
  Box,
} from "@mui/material";
import styles from "../../../styles/AppWrap.module.css";
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
import EditIcon from "@mui/icons-material/Edit";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import AssignmentIcon from "@mui/icons-material/Assignment";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/dist/client/router";
import { useSession } from "next-auth/react";

// prettier-ignore
const aboutItems = [
  { title: "Vision", icon: <VisibilityIcon />, link: "/about#vision" },
  { title: "Mission", icon: <FlagIcon />, link: "/about#vision" },
  { title: "Objectives", icon: <AssignmentTurnedInIcon />, link: "/about#vision" },
  { title: "History", icon: <HistoryIcon />, link: "/about#vision" },
  { title: "Contacts", icon: <CallIcon />, link: "/about#vision" },
];

const applyItems = [
  { title: "Admission", icon: <AssignmentIcon />, link: "/apply/admission" },
  { title: "Apply", icon: <PersonAddIcon />, link: "/apply/process" },
];

const MenuBar = () => {
  const router = useRouter();
  const currRoute = router.asPath;
  const drawerWidth = "24%";
  const { data: session } = useSession();
  const [aboutOpen, setAboutOpen] = useState(true);
  const [admitOpen, setAdmitOpen] = useState(true);

  const handleAboutClick = () => {setAboutOpen(!aboutOpen);};
  const handleAdmitClick = () => {setAdmitOpen(!admitOpen);};

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
      className={styles.menuSidebar}
      variant="permanent"
      anchor="right"
    >
      <Container className={styles.menuBar}>
        <List sx={{ width: "100%" }} component="nav">
          <ListItemButton onClick={handleAboutClick} divider>
            <ListItemIcon>{<InfoIcon />}</ListItemIcon>
            <ListItemText primary={"About PCSHS"} />
            {aboutOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={aboutOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {aboutItems.map(({ title, icon, link }) => (
                <React.Fragment key={title}>
                  <Link href={link as string}>
                    <ListItemButton
                      style={{
                        paddingLeft: "32px",
                        backgroundColor:
                          currRoute == link ? "#94d2bd" : "inherit",
                      }}
                    >
                      <ListItemIcon>{icon}</ListItemIcon>
                      <ListItemText primary={title} />
                    </ListItemButton>
                  </Link>
                  <Divider variant="inset" component="li" />
                </React.Fragment>
              ))}
            </List>
          </Collapse>

          <Link href="/calendar">
            <ListItemButton
              sx={
                currRoute == "/calendar" ? { backgroundColor: "#94d2bd" } : {}
              }
              divider
            >
              <ListItemIcon>
                <EventIcon />
              </ListItemIcon>
              <ListItemText primary="Event Calendar" />
            </ListItemButton>
          </Link>

          <ListItemButton onClick={handleAdmitClick} divider>
            <ListItemIcon>{<AssignmentIndIcon />}</ListItemIcon>
            <ListItemText primary={"Applications"} />
            {admitOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={admitOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {applyItems.map(({ title, icon, link }) => (
                <React.Fragment key={title}>
                  <Link href={link as string}>
                    <ListItemButton
                      style={{
                        paddingLeft: "32px",
                        backgroundColor:
                          currRoute == link ? "#94d2bd" : "inherit",
                      }}
                    >
                      <ListItemIcon>{icon}</ListItemIcon>
                      <ListItemText primary={title} />
                    </ListItemButton>
                  </Link>
                  <Divider variant="inset" component="li" />
                </React.Fragment>
              ))}
            </List>
          </Collapse>

          <a
            target="_blank"
            href="https://www.pcshs.org/resources"
            rel="noopener noreferrer"
            style={{ color: "inherit", textDecoration: "none" }}
          >
            <ListItemButton divider>
              <ListItemIcon>
                <MenuBookIcon />
              </ListItemIcon>
              <ListItemText primary="Learning Resources" />
            </ListItemButton>
          </a>
        </List>

        {session?.role == "Government" && (
          <>
            <Link href="/announcements/create">
              <ListItemButton
                sx={
                  currRoute == "/announcements/create"
                    ? { backgroundColor: "#94d2bd" }
                    : {}
                }
                divider
              >
                <ListItemIcon>
                  <EditIcon />
                </ListItemIcon>
                <ListItemText primary="Create Announcement" />
              </ListItemButton>
            </Link>
          </>
        )}
      </Container>

      <Box height="80px" className={styles.copyright}>
        <Typography align="center" variant="body1" color="white">
          ©2021 by Pasig City Science High School
        </Typography>
      </Box>
    </Drawer>
  );
};

export default MenuBar;
