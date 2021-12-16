import {
  IconButton,
  Tooltip,
  useTheme,
  useMediaQuery,
  Typography,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import EventIcon from "@mui/icons-material/Event";
import { Box } from "@mui/system";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import { ReactNode, useState } from "react";
import dynamic from "next/dynamic";
import NoImage from "../public/user-empty-avatar.png";
import Image from "next/image";
import styles from "../styles/AppWrap.module.css";
import { useSession } from "next-auth/react";
import Link from "next/link";
import NoUser from "../public/user-empty-avatar.png";
import EditIcon from "@mui/icons-material/Edit";

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
  const { data: session } = useSession();
  const [openMenu, setOpenMenu] = useState("");
  const theme = useTheme();
  const desktop = useMediaQuery(theme.breakpoints.only("xl"));
  const smMobile = useMediaQuery(theme.breakpoints.only("xs"));
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
      <Box sx={{ marginRight: "24px", display: "flex", alignItems: "center" }}>
        {session?.role == "Government" && (
          <Link passHref href="/announcements/create">
            <Tooltip title="Create Announcement">
              <IconButton sx={{ mr: 2 }} LinkComponent="a">
                <EditIcon />
              </IconButton>
            </Tooltip>
          </Link>
        )}

        {smMobile ? (
          ""
        ) : !desktop ? (
          <>
            <Option
              title="About PCSHS"
              name="about"
              onClick={handleOpenMenu}
              icon={<InfoIcon />}
            />
            <Link href="/calendar" passHref>
              <Tooltip title="Calendar of Events">
                <IconButton size="large" name="events" LinkComponent="a">
                  <EventIcon />
                </IconButton>
              </Tooltip>
            </Link>

            <Option
              title="Admissions and Applications"
              name="admissions"
              onClick={handleOpenMenu}
              icon={<AssignmentIndIcon />}
            />
          </>
        ) : (
          <Typography variant="h6" sx={{ marginRight: "8px" }}>
            {session?.user?.name}
          </Typography>
        )}

        <IconButton onClick={handleOpenMenu} size="large" name="profile">
          {session ? (
            <Image
              src={
                session.user?.image ? (session.user?.image as string) : NoImage
              }
              alt="User Avatar"
              width={40}
              height={40}
              className={styles.avatar}
            />
          ) : (
            <Image
              src={NoUser}
              alt="User Avatar"
              width={40}
              height={40}
              className={styles.avatar}
              placeholder="blur"
            />
          )}
        </IconButton>
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
