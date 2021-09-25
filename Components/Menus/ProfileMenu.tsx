import {
  Divider,
  Menu,
  MenuList,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import AnnouncementIcon from "@mui/icons-material/Announcement";
import GradeIcon from "@mui/icons-material/Grade";
import PersonIcon from "@mui/icons-material/Person";
import Link from "next/link";

type Props = {
  open: boolean;
  anchor: null | HTMLElement;
  closeMenu: () => void;
};

const ProfileMenu = ({ open, anchor, closeMenu }: Props) => {
  return (
    <Menu
      open={open}
      anchorEl={anchor}
      onClose={closeMenu}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      transformOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <MenuList>
        <Link href="/profile" passHref>
          <MenuItem component="a">
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText>Profile</ListItemText>
          </MenuItem>
        </Link>
        <Link href="/profile/grades" passHref>
          <MenuItem component="a">
            <ListItemIcon>
              <GradeIcon />
            </ListItemIcon>
            <ListItemText>Grades</ListItemText>
          </MenuItem>
        </Link>
        <Divider />
        <Link href="/createAnnouncements" passHref>
          <MenuItem component="a">
            <ListItemIcon>
              <AnnouncementIcon />
            </ListItemIcon>
            <ListItemText>Create Announcements</ListItemText>
          </MenuItem>
        </Link>
      </MenuList>
    </Menu>
  );
};

export default ProfileMenu;
