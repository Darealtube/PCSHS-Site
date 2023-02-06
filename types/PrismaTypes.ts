export type Student = {
  name: string;
  image: string | null;
  current_grade: string | null;
  current_section: string | null;
  date_of_birth: string | null;
  lrn: string | null;
  sex: string | null;
  address: string | null;
  contact: string | null;
  email: string | null;
  about: string | null;
  role: string;
} | null;

export type Government = {
  name: string;
  image: string | null;
  address: string | null;
  contact: string | null;
  email: string | null;
  role: string;
  about: string | null;
} | null;

export type CardAnnouncement = {
  id?: string;
  header: string;
  video: string | null;
  image: string[];
  date: string;
  author: {
    image: string | null;
    name: string;
  } | null;
};

export type Announcement = {
  id?: string;
  header: string;
  body: string;
  footer: string;
  image: string[];
  video: string | null;
  date?: string;
  author?: {
    image: string | null;
    name: string;
  } | null;
  type: string;
};

export type Profile = {
  name: string;
  image: string | null;
  current_grade: string | null;
  current_section: string | null;
  date_of_birth: string | null;
  lrn: string | null;
  sex: string | null;
  address: string | null;
  contact: string | null;
  email: string | null;
  about: string | null;
  role: string;
} | null;

export type PCSHSEvent = {
  id: string;
  title: string;
  description: string;
  day: number;
  year: number;
  month: number;
};
