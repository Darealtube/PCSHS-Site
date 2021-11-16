import {
  Divider,
  Menu,
  MenuList,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import FlagIcon from "@mui/icons-material/Flag";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import HistoryIcon from "@mui/icons-material/History";
import CallIcon from "@mui/icons-material/Call";
import Link from "next/link";

type Props = {
  open: boolean;
  anchor: null | HTMLElement;
  closeMenu: () => void;
};

const AboutMenu = ({ open, anchor, closeMenu }: Props) => {
  return (
    <Menu
      open={open}
      anchorEl={anchor}
      onClose={closeMenu}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      transformOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <MenuList>
        <Link href="/about#vision" passHref>
          <MenuItem component="a">
            <ListItemIcon>
              <VisibilityIcon />
            </ListItemIcon>
            <ListItemText>Vision</ListItemText>
          </MenuItem>
        </Link>
        <Link href="/about#mission" passHref>
          <MenuItem component="a">
            <ListItemIcon>
              <FlagIcon />
            </ListItemIcon>
            <ListItemText>Mission</ListItemText>
          </MenuItem>
        </Link>
        <Link href="/about#objectives" passHref>
          <MenuItem component="a">
            <ListItemIcon>
              <AssignmentTurnedInIcon />
            </ListItemIcon>
            <ListItemText>Objectives</ListItemText>
          </MenuItem>
        </Link>
        <Link href="/about#history" passHref>
          <MenuItem component="a">
            <ListItemIcon>
              <HistoryIcon />
            </ListItemIcon>
            <ListItemText>History</ListItemText>
          </MenuItem>
        </Link>
        <Link href="/about#contacts" passHref>
          <MenuItem component="a">
            <ListItemIcon>
              <CallIcon />
            </ListItemIcon>
            <ListItemText>Contact Us</ListItemText>
          </MenuItem>
        </Link>
      </MenuList>
    </Menu>
  );
};

export default AboutMenu;
