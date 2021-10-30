import {
  Divider,
  Menu,
  MenuList,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import GradeIcon from "@mui/icons-material/Grade";
import PersonIcon from "@mui/icons-material/Person";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/client";
import LoginIcon from "@mui/icons-material/Login";

type Props = {
  open: boolean;
  anchor: null | HTMLElement;
  closeMenu: () => void;
};

const ProfileMenu = ({ open, anchor, closeMenu }: Props) => {
  const [session] = useSession();
  return (
    <Menu
      open={open}
      anchorEl={anchor}
      onClose={closeMenu}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      transformOrigin={{ vertical: "top", horizontal: "center" }}
    >
      {session ? (
        <MenuList>
          <MenuItem>
            <ListItemText>Signed in as {session?.user?.name}</ListItemText>
          </MenuItem>
          <Divider />
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
          <MenuItem component="a" onClick={() => signOut()}>
            <ListItemIcon>
              <LoginIcon />
            </ListItemIcon>
            <ListItemText>Log Out</ListItemText>
          </MenuItem>
        </MenuList>
      ) : (
        <MenuList>
          <MenuItem component="a" onClick={() => signIn()}>
            <ListItemIcon>
              <LoginIcon />
            </ListItemIcon>
            <ListItemText>Sign In</ListItemText>
          </MenuItem>
        </MenuList>
      )}
    </Menu>
  );
};

export default ProfileMenu;
