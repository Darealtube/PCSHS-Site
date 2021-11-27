import {
  Menu,
  MenuList,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import AssignmentIcon from "@mui/icons-material/Assignment";
import Link from "next/link";

type Props = {
  open: boolean;
  anchor: null | HTMLElement;
  closeMenu: () => void;
};

const AdmissionMenu = ({ open, anchor, closeMenu }: Props) => {
  return (
    <Menu
      open={open}
      anchorEl={anchor}
      onClose={closeMenu}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      transformOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <MenuList>
        <Link href="/apply/admission" passHref>
          <MenuItem component="a">
            <ListItemIcon>
              <AssignmentIcon />
            </ListItemIcon>
            <ListItemText>Admission</ListItemText>
          </MenuItem>
        </Link>
        <Link href="/apply/process" passHref>
          <MenuItem component="a">
            <ListItemIcon>
              <PersonAddIcon />
            </ListItemIcon>
            <ListItemText>Application Procedures</ListItemText>
          </MenuItem>
        </Link>
      </MenuList>
    </Menu>
  );
};

export default AdmissionMenu;
