export type ExperienceData = {
  title: string;
  role: string;
  dates: string;
  location: string;
  src: string;
  type?: string;
  imageFit?: "contain" | "cover";
  /** Logos that are their own coloured tile bleed to the edge instead of sitting inset on white. */
  imageBleed?: boolean;
  imageZoom?: number;
  description: string;
  tech: string[];
  metrics?: { label: string; value: string }[];
  links?: { label: string; href: string }[];
  screenshot?: string;
};

export const experiences: ExperienceData[] = [
  {
    title: "Uptricks Service Pvt. Ltd.",
    role: "Web Development Intern",
    dates: "Feb 2024 - Mar 2024",
    location: "India",
    src: "/Experience-image/uptricks.png",
    type: "Internship",
    imageFit: "contain",
    description: `
      Completed a web development internship, gaining practical exposure to professional web development practices.
      Applied web development fundamentals to understand the structure and implementation of web-based applications.
      Strengthened technical understanding through hands-on learning and practical development activities.
      Gained valuable experience in software development workflows, problem-solving and working in a professional environment.
    `,
    tech: ["Web Development", "HTML/CSS", "JavaScript"],
  },
];
