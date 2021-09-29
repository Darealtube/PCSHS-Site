import { Button } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import dynamic from "next/dynamic";

const DynamicAdminCollapse = dynamic(() => import("./Collapses/AdminCollapse"));
const DynamicFacultyCollapse = dynamic(
  () => import("./Collapses/FacultyCollapse")
);
const DynamicStaffCollapse = dynamic(() => import("./Collapses/StaffCollapse"));

type SchoolMemberProps = {
  image: string | null;
  name: string;
  position: string[];
  role: string[];
}[];

type Props = {
  schoolMembers: SchoolMemberProps;
};

const SchoolMembers = ({ schoolMembers }: Props) => {
  const [acadExpanded, setAcadExpanded] = useState(false);
  const [adminExpanded, setAdminExpanded] = useState(false);
  const [studServiceExpanded, setStudServiceExpanded] = useState(false);
  const [gCoordExpanded, setgCoordExpanded] = useState(false);
  const [facultyExpanded, setFacultyExpanded] = useState(false);
  const [staffExpanded, setStaffExpanded] = useState(false);
  const acadCouncil = schoolMembers.filter((member) =>
    member.position.includes("Academic Council Member")
  );
  const adminCouncil = schoolMembers.filter((member) =>
    member.position.includes("Administrative Council Member")
  );
  const studServices = schoolMembers.filter((member) =>
    member.position.includes("Student Services Member")
  );
  const gCoords = schoolMembers.filter((member) =>
    member.position.includes("Grade Level Coordinator")
  );
  const faculty = schoolMembers.filter((member) =>
    member.position.includes("Faculty Member")
  );
  const staff = schoolMembers.filter((member) =>
    member.position.includes("Staff Member")
  );

  const handleStaffExpand = () => {
    setStaffExpanded(!staffExpanded);
  };

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
  const handlegCoordExpand = () => {
    setgCoordExpanded(!gCoordExpanded);
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
      <DynamicAdminCollapse admins={acadCouncil} expanded={acadExpanded} />
      <Button
        onClick={handleAdminExpand}
        variant="contained"
        color="inherit"
        endIcon={!adminExpanded ? <ExpandMoreIcon /> : <ExpandLessIcon />}
        sx={{ marginBottom: "16px" }}
      >
        Administrative Council Members
      </Button>

      <DynamicAdminCollapse admins={adminCouncil} expanded={adminExpanded} />
      <Button
        onClick={handleStudExpand}
        variant="contained"
        color="inherit"
        endIcon={!studServiceExpanded ? <ExpandMoreIcon /> : <ExpandLessIcon />}
        sx={{ marginBottom: "16px" }}
      >
        Student Services Members
      </Button>
      <DynamicAdminCollapse
        admins={studServices}
        expanded={studServiceExpanded}
      />
      <Button
        onClick={handlegCoordExpand}
        variant="contained"
        color="inherit"
        endIcon={!gCoordExpanded ? <ExpandMoreIcon /> : <ExpandLessIcon />}
        sx={{ marginBottom: "16px" }}
      >
        Grade Level Coordinators
      </Button>
      <DynamicAdminCollapse admins={gCoords} expanded={gCoordExpanded} />

      <Button
        onClick={handleFacultyExpand}
        variant="contained"
        color="inherit"
        endIcon={!facultyExpanded ? <ExpandMoreIcon /> : <ExpandLessIcon />}
        sx={{ marginBottom: "16px" }}
      >
        Faculty Members
      </Button>
      <DynamicFacultyCollapse faculties={faculty} expanded={facultyExpanded} />

      <Button
        onClick={handleStaffExpand}
        variant="contained"
        color="inherit"
        endIcon={!staffExpanded ? <ExpandMoreIcon /> : <ExpandLessIcon />}
        sx={{ marginBottom: "16px" }}
      >
        Staff Members
      </Button>
      <DynamicStaffCollapse staff={staff} expanded={staffExpanded} />
    </Box>
  );
};

export default SchoolMembers;
