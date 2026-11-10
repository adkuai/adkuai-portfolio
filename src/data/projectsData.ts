import type { ComponentType } from "react";
import { Network, Search, Radio, Sparkles, MousePointerClick } from "lucide-react";
import {
  SiNextdotjs,
  SiTypescript,
  SiReact,
  SiThreedotjs,
  SiLangchain,
  SiNodedotjs,
  SiTailwindcss,
  SiGithub,
  SiFastapi,
  SiRedis,
  SiPython,
  SiPostgresql,
  SiDocker,
} from "react-icons/si";

export type TechIcon = ComponentType<{ className?: string }>;
export type TechKey =
  | "next" | "ts" | "react" | "three" | "langchain" | "langgraph" | "rag"
  | "node" | "tailwind" | "github" | "fastapi" | "redis" | "python"
  | "postgres" | "docker" | "playwright" | "websockets" | "llm";

export type TechItem = TechKey | { label: string; tooltip?: string; };

export type ProjectStatus = "live" | "building" | "research" | "archived";

export interface Project {
  slug: string;
  title: string;
  imageTitle: string;
  src: string;
  lightModeSrc?: string;
  description: string;
  tech: TechItem[];
  github: string;
  /** Omit when there is nothing working to link to. */
  live?: string;
  video?: string;
  status: ProjectStatus;
  starsText?: string;
  backgroundImage?: string;
  hasPin: boolean;
}

export const iconMap: Record<TechKey, TechIcon> = {
  next: SiNextdotjs, ts: SiTypescript, react: SiReact, three: SiThreedotjs,
  langchain: SiLangchain, langgraph: Network, rag: Search, node: SiNodedotjs,
  tailwind: SiTailwindcss, github: SiGithub, fastapi: SiFastapi, redis: SiRedis,
  python: SiPython, postgres: SiPostgresql, docker: SiDocker,
  playwright: MousePointerClick, websockets: Radio, llm: Sparkles,
};

export const techNames: Record<TechKey, string> = {
  next: "Next.js", ts: "TypeScript", react: "React", three: "Three.js",
  langchain: "LangChain", langgraph: "LangGraph", rag: "RAG", node: "Node.js",
  tailwind: "Tailwind CSS", github: "GitHub API", fastapi: "FastAPI", redis: "Redis",
  python: "Python", postgres: "PostgreSQL", docker: "Docker",
  playwright: "Playwright", websockets: "WebSockets", llm: "LLM",
};

export const projectsData: Project[] = [
  {
    slug: "medicalreportintellipath",
    title: "medicalReportIntelliPath",
    imageTitle: "Clinical AI Dashboard",
    src: "/project-image/medicalreportintellipath.png",
    description: "A cloud-edge platform connecting a FastAPI backend to a cloud-hosted Qwen2.5-VL-7B vision-LLM pipeline on Google Colab GPUs for zero-shot clinical document parsing, automatically highlighting out-of-bounds metrics and rendering clear drug timing matrices on a React + Vite dashboard.",
    tech: ["fastapi", "react", "tailwind", "python", { label: "Qwen2.5-VL" }, { label: "PyTorch" }, { label: "Vite" }],
    github: "https://github.com/adkuai/medicalReportIntelliPath",
    live: "https://medicalreportintellipath.adkuai.vercel.app/",
    status: "live",
    hasPin: true,
  },
  {
    slug: "ocrscanner",
    title: "ocrscanner",
    imageTitle: "Document Intelligence OCR",
    src: "/project-image/ocrscanner.png",
    description: "A hybrid Document Intelligence OCR System using FastAPI and open-source Qwen2-VL-2B to extract multilingual layout details and complex handwritten Hindi/English data grids, detecting printed and handwritten text to surface structured insights.",
    tech: ["fastapi", "python", { label: "Qwen2-VL" }, { label: "Pydantic" }, { label: "HTML/CSS" }, { label: "JavaScript" }],
    github: "https://github.com/adkuai/ocrscanner",
    live: "https://ocrscanner.adkuai.vercel.app/",
    status: "live",
    hasPin: true,
  },
  {
    slug: "ai-resume-analyzer",
    title: "A.I_Resume_Analyzer",
    imageTitle: "NLP Resume Evaluation Engine",
    src: "/project-image/resume-analyzer.png",
    description: "A project focused on parsing and analyzing applicant resumes to generate scores and recommendations using NLP with Python NLTK. Manages uploaded PDF resumes through a Streamlit frontend and backend with pandas, pyresparser, and pdfminer3.",
    tech: ["python", { label: "NLP" }, { label: "NLTK" }, { label: "Streamlit" }, { label: "MySQL" }],
    github: "https://github.com/adkuai/A.I_Resume_Analyzer",
    live: "https://github.com/adkuai/A.I_Resume_Analyzer",
    status: "live",
    hasPin: true,
  },
  {
    slug: "overworld-pc-game",
    title: "Overworld-PC Game",
    imageTitle: "2D Platformer Environment",
    src: "/project-image/overworld-pc-game.png",
    description: "A virtual gaming environment based on 2D-platformer games inspired by the Mario series created in Python using Pygame. Players navigate stages and challenges designed with custom terrain assets, collision handling, and core Data Structures & Algorithms.",
    tech: ["python", { label: "DSA" }, { label: "Pygame" }, { label: "Game Dev" }],
    github: "https://github.com/adkuai/Overworld-PC-Game",
    live: "https://github.com/adkuai/Overworld-PC-Game",
    status: "live",
    hasPin: true,
  },
];
