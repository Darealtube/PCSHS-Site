import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Container, Tab, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import { useState } from "react";
import ReactMarkdown from "react-markdown";

const MarkdownInput = (props: TextFieldProps) => {
  const [value, setValue] = useState("original");

  const handleChange = (_e: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <>
      <Box sx={{ width: "100%", mt: 4, mb: 4 }}>
        <TabContext value={value}>
          <Paper
            sx={{
              borderBottom: 1,
              borderColor: "divider",
              width: "max-content",
            }}
            square
          >
            <TabList value={value} onChange={handleChange}>
              <Tab label="Original" value="original" />
              <Tab label="Preview" value="markdown" />
            </TabList>
          </Paper>

          <Paper sx={{ width: "100%" }} square>
            <TabPanel value="original" sx={{ pt: 2, pl: 2, pr: 2, pb: 0 }}>
              <TextField {...props} />
            </TabPanel>
            <TabPanel
              value="markdown"
              sx={{ pt: 1, pl: 2, pr: 2, pb: 1, height: "160px" }}
            >
              <Container
                sx={{
                  maxHeight: "100%",
                  overflow: "auto",
                  wordBreak: "break-word",
                  overflowWrap: "break-word",
                  whiteSpace: "pre-wrap",
                }}
              >
                <Typography fontSize={props.InputProps?.style?.fontSize}>
                  <ReactMarkdown>{props.value as string}</ReactMarkdown>
                </Typography>
              </Container>
            </TabPanel>
          </Paper>
        </TabContext>
      </Box>
    </>
  );
};

export default MarkdownInput;
