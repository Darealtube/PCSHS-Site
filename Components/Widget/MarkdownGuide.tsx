import {
  DialogContent,
  Dialog,
  DialogTitle,
  DialogContentText,
  Divider,
  Container,
  Paper,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import Markdown from "react-markdown";
import remarkGFM from "remark-gfm";
import CloseIcon from "@mui/icons-material/Close";

const Guide = `
# Markdown Guide

In order for you to produce comprehensive and creative announcements, you must first learn how to markdown.

👉 Emojis could be copy and pasted here.

## Why markdown instead of plain text?

* Markdown is very easy to learn.
* It is useful to know about markdowns.
* Markdowns make you produce more creative text.
* And much more reasons...

## Options

### Lines (Dividers)

To put Dividers in your text, you simply need to type "---".

Like this!

---

### **Bold**, *Italic*, and ~~Strikethrough~~ text

You can make your text **BOLD**, *Italic*, or even both ~~Bold Italic~~ ***BOLIC***

It is sad to say that you can't underline text within this markdown, but these should be enough to clarify your point.

---

### [Links]()

To put links on texts, we must first put \"[]\" around the text, and then put a parenthesis pair next to it containing the absolute link.

[This is one example of a link which will redirect to the web developer's YouTube channel](https://www.youtube.com/channel/UCQclh4IpcpsgZsK58ctbEGA).
Pretty cool right?

---

### Code text

If for some reason an announcement ***needs*** to render code, or maybe a **coding club** has been just created, the coding club
can use this syntax to display code.

\`\`\`js
const Hello = () => {
  return(
    <>
      Hello! I am inside of what is called a <pre> tag 
      in HTML. You can enter code here or just plain 
      text. 

      Either way is fine.
    </>
  )
};

export default Hello;
\`\`\`

Pretty neat, eh? 

---

### Checklists and Tables

Guess what? You can also add Checklists in announcements too!

For example, if **someone is applying for PCSHS**, they may need to have:

* [x] Entrance Examinations
* [x] Interviews
* [x] Grade requirements
* [ ] Other optional requirements.

You can also make ***tables***! It might be a little confusing at first,
but once you get the hang of it you will be ***unstoppable***!

| Symbol   | Function              |
| -------- | --------------------- |
| absol value      | Used for seperating columns |
| "-"      | Used for seperating header rows from items |
| ":"      | Optional: Sets the alignment of items |

---

### Lists (Ordered or Unordered)

1. First of all, this one is the most basic things in markdown.
2. Listing things is rather simple
3. Whether be it ordered, or...
5. Oops! I typed 5 but it still displayed 4
8. Even now!

In order to break it, just **type something in between**.

57. You can also start from a non-arbitrary number.
59. And even if you typed 59, it will still keep going.

If you are not fond of *fancy* numbers, you can list with bullets instead.

You can create a list when you start it with *, +, or -.

* Just like this!
  * Indent 2 spaces, and a sublist appears!
  + Even when you use a different symbol!
    - Keep adding 2 spaces and you'll be able to create infinite amounts of sublists.
      + ***But please don't do that.***

---

### Blockquotes (Indents)

> Just like lists, these things can also be nested.
>> Indents are what we call them.
>>> You can create indents using greater-or-less symbols (arrows) or ">"
> > > > Or by adding spaces between arrows. " > > "

---

### That's about it, really.

## Credits

This markdown is made possible by a library called [react-markdown](https://www.npmjs.com/package/react-markdown).

It is a great markdown library that is safe to use because it doesn't use \`\`\`dangerouslySetInnerHTML\`\`\` in order
to render markdown in JSX.

In a nutshell, there is an option in HTML called \`\`\`dangerouslySetInnerHTML\`\`\` in which if there is an HTML text
inside a div with that prop for example, the HTML will be **rendered**.

This is the ***most dangerous way to render markdown*** because HTML code can be manipulated to **reveal data**. However,
using \`\`\`react-markdown\`\`\` has provided a solution in order to safely render markdown in React.

***Enjoy typing!***
`;

type Props = {
  open: boolean;
  handleClose: () => void;
};

const MarkdownGuide = ({ open, handleClose }: Props) => {
  return (
    <Dialog fullWidth={true} maxWidth={"xl"} fullScreen open={open}>
      <Container sx={{ marginTop: "80px", marginBottom: "40px" }}>
        <IconButton sx={{ marginBottom: "8px" }} onClick={handleClose}>
          <CloseIcon />
        </IconButton>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Paper elevation={12} sx={{ height: "80vh", overflow: "auto" }}>
              <Container sx={{ marginTop: "16px" }}>
                <Typography variant="h4" gutterBottom>
                  Plain Text
                </Typography>
                <Divider />
                <Typography paragraph whiteSpace={"pre"}>
                  {Guide}
                </Typography>
              </Container>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper elevation={12} sx={{ height: "80vh", overflow: "auto" }}>
              <Container sx={{ marginTop: "16px" }}>
                <Typography variant="h4" gutterBottom>
                  Markdown Preview
                </Typography>
                <Divider />
                <Markdown plugins={[remarkGFM]}>{Guide}</Markdown>
              </Container>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Dialog>
  );
};

export default MarkdownGuide;
