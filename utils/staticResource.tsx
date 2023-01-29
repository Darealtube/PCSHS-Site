import FavoriteIcon from "@mui/icons-material/Favorite";
import PsychologyAltIcon from "@mui/icons-material/PsychologyAlt";
import PanToolIcon from "@mui/icons-material/PanTool";
import SchoolIcon from "@mui/icons-material/School";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import TwitterIcon from "@mui/icons-material/Twitter";
import EmailIcon from "@mui/icons-material/Email";
import FacebookIcon from "@mui/icons-material/Facebook";
import CallIcon from "@mui/icons-material/Call";

export const Contacts = [
  {
    icon: <TwitterIcon fontSize="large" sx={{ color: "#e9c46a" }} />,
    link: "https://twitter.com/ssgpasigsci",
  },
  {
    icon: <EmailIcon fontSize="large" sx={{ color: "#e9c46a" }} />,
    link: "mailto:pasigcitysciencehs05@gmail.com",
  },
  {
    icon: <FacebookIcon fontSize="large" sx={{ color: "#e9c46a" }} />,
    link: "https://www.facebook.com/pcshs.edu",
  },
  {
    icon: <CallIcon fontSize="large" sx={{ color: "#e9c46a" }} />,
    link: "tel:628-2177",
  },
];

export const Objectives = [
  {
    icon: <FavoriteIcon sx={{ mr: 2 }} />,
    description: `To inculcate among the students the values and virtues in life necessary in their interrelationships with selves, others, country, and God.`,
  },
  {
    icon: <PsychologyAltIcon sx={{ mr: 2 }} />,
    description:
      "To emphasize high standards of learning and high levels of learning skills such as critical and creative thinking and problem solving.",
  },
  {
    icon: <PanToolIcon sx={{ mr: 2 }} />,
    description:
      "To provide state-of-the-art facilities that enhance interactive and hands-on learning experiences.",
  },
  {
    icon: <SchoolIcon sx={{ mr: 2 }} />,
    description:
      "To harness to the fullest the artistic, athletic, managerial and leadership skills of the students.",
  },
  {
    icon: <LocalAtmIcon sx={{ mr: 2 }} />,
    description: "To offer scholarship grants to deserving, gifted students.",
  },
];

export const PSATRows = [
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
    subject: "Abstract Reasoning",
    time: "20 minutes",
    items: "10 items",
  },
];
