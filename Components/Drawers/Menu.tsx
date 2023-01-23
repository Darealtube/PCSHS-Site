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
import styles from "../../styles/AppWrap.module.css";
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
import { ReactNode, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/dist/client/router";
import { useSession } from "next-auth/react";

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
  const focused = router.asPath == link;
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
  const { data: session } = useSession();
  const router = useRouter();
  const drawerWidth = "24%";
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
      className={styles.menuSidebar}
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
                link="/about#vision"
              />
              <PCSHSMenuItem
                title="Mission"
                icon={<FlagIcon />}
                link="/about#mission"
              />
              <PCSHSMenuItem
                title="Objectives"
                icon={<AssignmentTurnedInIcon />}
                link="/about#objectives"
              />
              <PCSHSMenuItem
                title="History"
                icon={<HistoryIcon />}
                link="/about#history"
              />
              <PCSHSMenuItem
                title="Contacts"
                icon={<CallIcon />}
                link="/about#contacts"
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
                link="/apply/admission"
              />
              <PCSHSMenuItem
                title="Apply"
                icon={<PersonAddIcon />}
                link="/apply/process"
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

        {session?.role == "Government" && (
          <>
            <Link passHref href="/announcements/create">
              <ListItemButton
                component="a"
                sx={
                  router.pathname == "/announcements/create"
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
