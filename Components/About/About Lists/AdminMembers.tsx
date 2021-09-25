import { Button, Collapse, Typography, Grow } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import styles from "../../../styles/About.module.css";
import {
  AcadCouncilMembers,
  AdminCouncilMembers,
  APFaculty,
  CompFaculty,
  EnglishFaculty,
  ESPFaculty,
  FilipinoFaculty,
  GLevelCoordsMembers,
  MAPEHFaculty,
  MathFaculty,
  ScienceFaculty,
  StudServiceMembers,
} from "../../../Options/aboutOptions";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import Image from "next/image";
import VisibilitySensor from "react-visibility-sensor";

type Props = {
  image: StaticImageData;
  name: string;
  role: string;
};

const Admin = ({ image, name, role }: Props) => {
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
            <Typography variant="h6" align="center">
              {name}
            </Typography>
            <Typography variant="body1" align="center">
              {role}
            </Typography>
          </Box>
        </Grow>
      )}
    </VisibilitySensor>
  );
};

const Faculty = ({
  department,
  faculty,
}: {
  department: string;
  faculty: string[];
}) => {
  return (
    <Box marginBottom={8}>
      <Typography variant="h4" align="center" gutterBottom>
        {department}
      </Typography>
      {faculty.map((teacher: string) => (
        <>
          <Typography align="center" variant="h6">
            {teacher}
          </Typography>
        </>
      ))}
    </Box>
  );
};

const AdminMembers = () => {
  const [acadExpanded, setAcadExpanded] = useState(false);
  const [adminExpanded, setAdminExpanded] = useState(false);
  const [studServiceExpanded, setStudServiceExpanded] = useState(false);
  const [gLevelExpanded, setgLevelExpanded] = useState(false);
  const [facultyExpanded, setFacultyExpanded] = useState(false);

  const handleFacultyExpand = () => {
    setFacultyExpanded(!facultyExpanded);
  };

  const handleAcadExpand = () => {
    setAcadExpanded(!acadExpanded);
  };
  const handleAdminExpand = () => {
    setAdminExpanded(!adminExpanded);
  };
  const handleStudExpand = () => {
    setStudServiceExpanded(!studServiceExpanded);
  };
  const handlegLevelExpand = () => {
    setgLevelExpanded(!gLevelExpanded);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Button
        onClick={handleAcadExpand}
        variant="contained"
        color="inherit"
        endIcon={!acadExpanded ? <ExpandMoreIcon /> : <ExpandLessIcon />}
        sx={{ marginBottom: "16px" }}
      >
        Academic Council Members
      </Button>
      <Collapse in={acadExpanded == true} timeout="auto" unmountOnExit>
        {AcadCouncilMembers.map((teacher) => (
          <Box key={teacher.role}>
            <Admin
              image={teacher.image}
              role={teacher.role}
              name={teacher.name}
            />
          </Box>
        ))}
      </Collapse>
      <Button
        onClick={handleAdminExpand}
        variant="contained"
        color="inherit"
        endIcon={!adminExpanded ? <ExpandMoreIcon /> : <ExpandLessIcon />}
        sx={{ marginBottom: "16px" }}
      >
        Administrative Council Members
      </Button>
      <Collapse in={adminExpanded == true} timeout="auto" unmountOnExit>
        {AdminCouncilMembers.map((teacher) => (
          <Box key={teacher.role}>
            <Admin
              image={teacher.image}
              role={teacher.role}
              name={teacher.name}
            />
          </Box>
        ))}
      </Collapse>
      <Button
        onClick={handleStudExpand}
        variant="contained"
        color="inherit"
        endIcon={!studServiceExpanded ? <ExpandMoreIcon /> : <ExpandLessIcon />}
        sx={{ marginBottom: "16px" }}
      >
        Student Services Members
      </Button>
      <Collapse in={studServiceExpanded == true} timeout="auto" unmountOnExit>
        {StudServiceMembers.map((teacher) => (
          <Box key={teacher.role}>
            <Admin
              image={teacher.image}
              role={teacher.role}
              name={teacher.name}
            />
          </Box>
        ))}
      </Collapse>
      <Button
        onClick={handlegLevelExpand}
        variant="contained"
        color="inherit"
        endIcon={!gLevelExpanded ? <ExpandMoreIcon /> : <ExpandLessIcon />}
        sx={{ marginBottom: "16px" }}
      >
        Grade Level Coordinators
      </Button>
      <Collapse in={gLevelExpanded == true} timeout="auto" unmountOnExit>
        {GLevelCoordsMembers.map((teacher) => (
          <Box key={teacher.role}>
            <Admin
              image={teacher.image}
              role={teacher.role}
              name={teacher.name}
            />
          </Box>
        ))}
      </Collapse>
      <Button
        onClick={handleFacultyExpand}
        variant="contained"
        color="inherit"
        endIcon={!facultyExpanded ? <ExpandMoreIcon /> : <ExpandLessIcon />}
        sx={{ marginBottom: "16px" }}
      >
        Faculty Members
      </Button>
      <Collapse in={facultyExpanded == true} timeout="auto" unmountOnExit>
        <Faculty department={"Science Department"} faculty={ScienceFaculty} />
        <Faculty department={"Mathematics Department"} faculty={MathFaculty} />
        <Faculty department={"English Department"} faculty={EnglishFaculty} />
        <Faculty department={"Filipino Department"} faculty={FilipinoFaculty} />
        <Faculty department={"AP Department"} faculty={APFaculty} />
        <Faculty department={"ESP Department"} faculty={ESPFaculty} />
        <Faculty department={"Computer Department"} faculty={CompFaculty} />
        <Faculty department={"MAPEH Department"} faculty={MAPEHFaculty} />
      </Collapse>
    </Box>
  );
};

export default AdminMembers;
