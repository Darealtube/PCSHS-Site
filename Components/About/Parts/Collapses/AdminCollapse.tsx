import { Box, Collapse, Typography, Grow } from "@mui/material";
import VisibilitySensor from "react-visibility-sensor";
import Image from "next/image";
import styles from "../../../../styles/About.module.css";

type SchoolMemberProps = {
  image: string | null;
  name: string;
  position: string[];
  role: string[];
}[];

type CollapseProps = {
  admins: SchoolMemberProps;
  expanded: boolean;
};

type AdminProps = {
  image: string;
  name: string;
  role: string[];
};

const Admin = ({ image, name, role }: AdminProps) => {
  return (
    <VisibilitySensor partialVisibility>
      {({ isVisible }) => (
        <Grow in={isVisible} timeout={1000}>
          <Box className={styles.member}>
            <Image
              src={image}
              width={240}
              height={240}
              alt={"PCSHS Principal"}
              className={styles.avatar}
            />
            <Typography gutterBottom variant="h6" align="center">
              {name}
            </Typography>
            {role.map((role) => (
              <Typography
                gutterBottom
                variant="body1"
                align="center"
                key={role}
              >
                {role}
              </Typography>
            ))}
          </Box>
        </Grow>
      )}
    </VisibilitySensor>
  );
};

const AdminCollapse = ({ admins, expanded }: CollapseProps) => {
  return (
    <Collapse in={expanded == true} timeout="auto" unmountOnExit>
      {admins.map((teacher) => (
        <Box key={teacher.name}>
          <Admin
            image={teacher.image as string}
            role={teacher.role}
            name={teacher.name}
          />
        </Box>
      ))}
    </Collapse>
  );
};

export default AdminCollapse;
