import {
  Grow,
  styled,
  TableCell,
  tableCellClasses,
  TableRow,
  TableHead,
  Table,
  TableBody,
} from "@mui/material";
import VisibilitySensor from "react-visibility-sensor";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#03045e",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: "18px",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const PSATRows = [
  {
    subject: "Mathematics",
    time: "30 minutes",
    items: "20 items",
  },
  {
    subject: "Science",
    time: "30 minutes",
    items: "20 items",
  },
  {
    subject: "English",
    time: "30 minutes",
    items: "20 items",
  },
  {
    subject: "Abstract",
    time: "20 minutes",
    items: "10 items",
  },
];

const PSATable = () => {
  return (
    <>
      <Table sx={{ width: "100%" }}>
        <TableHead>
          <TableRow>
            <StyledTableCell>Subject</StyledTableCell>
            <StyledTableCell align="right">
              Time Allotment&nbsp;(m)
            </StyledTableCell>
            <StyledTableCell align="right">No. of Items</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <VisibilitySensor partialVisibility>
            {({ isVisible }: { isVisible: boolean }) => (
              <>
                {PSATRows.map((row) => (
                  <Grow in={isVisible} timeout={500} key={row.subject}>
                    <StyledTableRow key={row.subject}>
                      <StyledTableCell component="th" scope="row">
                        {row.subject}
                      </StyledTableCell>

                      <StyledTableCell align="right">
                        {row.time}
                      </StyledTableCell>

                      <StyledTableCell align="right">
                        {row.items}
                      </StyledTableCell>
                    </StyledTableRow>
                  </Grow>
                ))}
              </>
            )}
          </VisibilitySensor>
        </TableBody>
      </Table>
    </>
  );
};

export default PSATable;
