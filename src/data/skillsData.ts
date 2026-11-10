import type { ElementType } from "react";
import {
  ShieldCheck,
  Users,
  RefreshCw,
  Workflow,
  MessageSquare,
} from "lucide-react";
import {
  SiPython,
  SiJavascript,
  SiGo,
  SiDjango,
  SiFastapi,
  SiReact,
  SiPytorch,
  SiTailwindcss,
  SiGit,
  SiGithub,
  SiLinux,
  SiGooglecolab,
  SiSqlite,
  SiMysql,
  SiPostgresql,
  SiMongodb,
} from "react-icons/si";

export type Skill = { name: string; icon: ElementType };
export type SkillGroup = { group: string; skills: Skill[] };

/**
 * Grouped directly from Aditya's resume.
 */
export const skillGroups: SkillGroup[] = [
  {
    group: "Programming Languages",
    skills: [
      { name: "Python", icon: SiPython },
      { name: "JavaScript", icon: SiJavascript },
      { name: "Go", icon: SiGo },
    ],
  },
  {
    group: "Frameworks & Libraries",
    skills: [
      { name: "FastAPI", icon: SiFastapi },
      { name: "Django", icon: SiDjango },
      { name: "React", icon: SiReact },
      { name: "Pydantic", icon: ShieldCheck },
      { name: "PyTorch", icon: SiPytorch },
      { name: "Tailwind CSS", icon: SiTailwindcss },
    ],
  },
  {
    group: "Databases",
    skills: [
      { name: "PostgreSQL", icon: SiPostgresql },
      { name: "MySQL", icon: SiMysql },
      { name: "SQLite", icon: SiSqlite },
      { name: "MongoDB", icon: SiMongodb },
    ],
  },
  {
    group: "Tools & Platforms",
    skills: [
      { name: "Git", icon: SiGit },
      { name: "GitHub", icon: SiGithub },
      { name: "Linux", icon: SiLinux },
      { name: "Google Colab", icon: SiGooglecolab },
    ],
  },
  {
    group: "Core Strengths & Soft Skills",
    skills: [
      { name: "Communication", icon: MessageSquare },
      { name: "Teamwork", icon: Users },
      { name: "Adaptability", icon: RefreshCw },
      { name: "Collaboration", icon: Workflow },
    ],
  },
];
