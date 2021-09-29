import { Box, Collapse, Typography } from "@mui/material";

type MemberProps = {
  department: string;
  faculty: SchoolMemberProps;
};

type SchoolMemberProps = {
  name: string;
  role: string[];
}[];

type CollapseProps = {
  faculties: SchoolMemberProps;
  expanded: boolean;
};

const Member = ({ department, faculty }: MemberProps) => {
  return (
    <Box marginBottom={8}>
      <Typography variant="h4" align="center" gutterBottom>
        {department}
      </Typography>
      {faculty.map(({ name }) => (
        <>
          <Typography align="center" variant="h6">
            {name}
          </Typography>
        </>
      ))}
    </Box>
  );
};

const FacultyCollapse = ({ expanded, faculties }: CollapseProps) => {
  const SciDep = faculties.filter((teacher) =>
    teacher.role.includes("Science Teacher")
  );
  const MathDep = faculties.filter((teacher) =>
    teacher.role.includes("Mathematics Teacher")
  );
  const EngDep = faculties.filter((teacher) =>
    teacher.role.includes("English Teacher")
  );
  const FilDep = faculties.filter((teacher) =>
    teacher.role.includes("Filipino Teacher")
  );
  const APDep = faculties.filter((teacher) =>
    teacher.role.includes("AP Teacher")
  );
  const ESPDep = faculties.filter((teacher) =>
    teacher.role.includes("ESP Teacher")
  );
  const CompDep = faculties.filter((teacher) =>
    teacher.role.includes("Computer Teacher")
  );
  const MAPEHDep = faculties.filter((teacher) =>
    teacher.role.includes("MAPEH Teacher")
  );
  return (
    <>
      <Collapse in={expanded == true} timeout="auto" unmountOnExit>
        <Member department={"Science Department"} faculty={SciDep} />
        <Member department={"Mathematics Department"} faculty={MathDep} />
        <Member department={"English Department"} faculty={EngDep} />
        <Member department={"Filipino Department"} faculty={FilDep} />
        <Member department={"AP Department"} faculty={APDep} />
        <Member department={"ESP Department"} faculty={ESPDep} />
        <Member department={"Computer Department"} faculty={CompDep} />
        <Member department={"MAPEH Department"} faculty={MAPEHDep} />
      </Collapse>
    </>
  );
};

export default FacultyCollapse;
