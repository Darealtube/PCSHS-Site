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
  members: string[];
  about: string | null;
  role: string;
} | null;

export type Government = {
  name: string;
  image: string | null;
  address: string | null;
  contact: string | null;
  email: string | null;
  members: string[];
  role: string;
  about: string | null;
} | null;

export type Visitor = {
  name: string;
  image: string | null;
  date_of_birth: string | null;
  sex: string | null;
  address: string | null;
  contact: string | null;
  email: string | null;
  role: string;
  about: string | null;
} | null;

export type Announcement = {
  id: string;
  header: string;
  body: string;
  footer: string | null;
  image: string[] | null;
  video: string | null;
  date?: string;
  author?: {
    image: string | null;
    name: string;
  } | null;
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
  members: string[];
  about: string | null;
  role: string;
} | null;

export type Event = {
  id: string;
  title: string;
  description: string;
  day: number;
  year: number;
  month: number;
};
