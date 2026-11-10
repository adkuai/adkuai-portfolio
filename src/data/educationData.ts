export type Education = {
  school: string;
  degree: string;
  cgpa?: string;
  grade?: string;
  dates: string;
  location?: string;
  coursework?: string[];
};

export const educationList: Education[] = [
  {
    school: "Dr. A.P.J. Abdul Kalam Technical University",
    degree: "B.Tech in Computer Science and Engineering",
    cgpa: "7.78 / 10.0",
    grade: "CGPA 7.78",
    dates: "2020 - 2024",
    coursework: [
      "Data Structures and Algorithms",
      "Operating Systems",
      "Computer Networks",
      "Database Management Systems",
      "Machine Learning",
      "Cryptography and Network Security",
      "Software Engineering",
    ],
  },
  {
    school: "Central Board of Secondary Education (CBSE)",
    degree: "Senior Secondary School (Class XII)",
    grade: "76.4%",
    dates: "2020",
    location: "India",
  },
  {
    school: "Central Board of Secondary Education (CBSE)",
    degree: "High School (Class X)",
    grade: "83.4%",
    dates: "2018",
    location: "India",
  },
];

/** Backward-compatibility export for single-item references */
export const education: Education = educationList[0];

export type Certification = {
  name: string;
  issuer: string;
  date: string;
  note?: string;
  link?: string;
};

export const certifications: Certification[] = [
  {
    name: "A Practical Intro to AI Agents and Agentic AI",
    issuer: "LinkedIn Learning",
    date: "2024",
    link: "https://www.linkedin.com/in/adkuai/overlay/Certifications/794643703/treasury/?profileId=ACoAAEZwNU0B767kaRik87grea7iVBIQcV_e6Gk",
  },
  {
    name: "Introduction to Generative AI",
    issuer: "Coursera",
    date: "2024",
    link: "https://www.coursera.org/account/accomplishments/verify/4CW82SNIAHTD",
  },
];
