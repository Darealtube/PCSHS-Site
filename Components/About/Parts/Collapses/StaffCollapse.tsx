import { Box, Collapse, Typography } from "@mui/material";

type MemberProps = {
  position: string;
  staff: SchoolMemberProps;
};

type SchoolMemberProps = {
  name: string;
  role: string[];
}[];

type CollapseProps = {
  staff: SchoolMemberProps;
  expanded: boolean;
};

const Member = ({ position, staff }: MemberProps) => {
  return (
    <Box marginBottom={8}>
      <Typography variant="h4" align="center" gutterBottom>
        {position}
      </Typography>
      {staff.map(({ name }) => (
        <>
          <Typography align="center" variant="h6">
            {name}
          </Typography>
        </>
      ))}
    </Box>
  );
};

const StaffCollapse = ({ expanded, staff }: CollapseProps) => {
  const Clinic = staff.filter((member) =>
    member.role.includes("Clinician/School Nurse")
  );
  const Support = staff.filter((member) =>
    member.role.includes("Support Staff")
  );
  const Canteen = staff.filter((member) =>
    member.role.includes("Canteen Staff")
  );
  const Security = staff.filter((member) =>
    member.role.includes("Agency Security")
  );
  return (
    <>
      <Collapse in={expanded == true} timeout="auto" unmountOnExit>
        <Member position={"Clinician/School Nurse"} staff={Clinic} />
        <Member position={"Support Staff"} staff={Support} />
        <Member position={"Canteen Staff"} staff={Canteen} />
        <Member position={"Agency Security"} staff={Security} />
      </Collapse>
    </>
  );
};

export default StaffCollapse;
