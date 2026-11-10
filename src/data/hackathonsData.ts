export type Hackathon = {
  id: string;
  event: string;
  organizer: string;
  placement: string;
  scale: string;
  dates: string;
  project: string;
  problem: string;
  built: string[];
  principle?: string;
  team?: string[];
  tech: string[];
  metrics: { label: string; value: string }[];
  links?: { label: string; href: string }[];
};

export const hackathonsData: Hackathon[] = [
  {
    id: "sih-2023",
    event: "Smart India Hackathon 2023",
    organizer: "AICTE, MIC - Student Innovation",
    placement: "Participant",
    scale: "National-level Student Hackathon",
    dates: "2023",
    project: "IntelliResource AI",
    problem:
      "How can artificial intelligence be used to intelligently discover, organize and analyze resources from multiple sources to transform technology and generate valuable insights? (Problem Statement ID: SIH1495)",
    built: [
      "Proposed an intelligent resource discovery platform designed to bring information from multiple sources into a centralized system for easier exploration and analysis.",
      "Conceptualized an AI-powered intelligence layer to extract, classify and organize relevant information, helping users identify meaningful patterns and relationships across different resources.",
      "Proposed a smart recommendation mechanism to transform discovered information into contextual insights and actionable suggestions.",
      "Envisioned an automation-driven dashboard to simplify information processing, reduce repetitive manual efforts and make valuable insights more accessible."
    ],
    principle:
      "The central idea was to combine Artificial Intelligence and Smart Automation to transform information discovery into a more intelligent, organized and insight-driven process.",
    team: ["The Immortals"],
    tech: [
      "Artificial Intelligence",
      "Smart Automation",
      "Software Solution Design",
      "Resource Intelligence"
    ],
    metrics: [
      { label: "Year", value: "2023" },
      { label: "Team", value: "The Immortals" },
      { label: "Problem ID", value: "SIH1495" },
      { label: "Outcome", value: "Idea Submitted" }
    ]
  }
];
