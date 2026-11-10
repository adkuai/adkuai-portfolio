export type Highlight = {
  id: string;
  title: string;
  badge: string;
  image: string;
  imageWidth: number;
  imageHeight: number;
  imageFit?: "cover" | "contain";
  cardWidth?: number;
  link?: string;
};

/**
 * Real proof, each linked to the post or verification page announcing it.
 */
export const highlightsData: Highlight[] = [
  {
    id: "leetcode-stats",
    title: "430+ Problems Solved & 100 Days Badge on LeetCode",
    badge: "LeetCode",
    image: "/highlights/leetcode-stats.jpg",
    imageWidth: 1024,
    imageHeight: 508,
    imageFit: "cover",
    cardWidth: 320,
    link: "https://leetcode.com/u/adkuai/",
  },
  {
    id: "generative-ai",
    title: "Introduction to Generative AI by Google Cloud on Coursera",
    badge: "Google Cloud",
    image: "/highlights/generative-ai-cert.jpg",
    imageWidth: 997,
    imageHeight: 748,
    imageFit: "contain",
    cardWidth: 280,
    link: "https://coursera.org/verify/4CW82SNIAHTD",
  },
  {
    id: "ai-agents",
    title: "A Practical Intro to AI Agents and Agentic AI",
    badge: "AI Agents",
    image: "/highlights/ai-agents-cert.png",
    imageWidth: 995,
    imageHeight: 742,
    imageFit: "contain",
    cardWidth: 280,
    link: "https://www.linkedin.com/in/adkuai/overlay/Certifications/794643703/treasury/?profileId=ACoAAEZwNU0B767kaRik87grea7iVBIQcV_e6Gk",
  },
  {
    id: "database-intro",
    title: "Introduction to Databases & SQL Certificate of Achievement",
    badge: "Databases",
    image: "/highlights/database-cert.png",
    imageWidth: 2527,
    imageHeight: 1787,
    imageFit: "contain",
    cardWidth: 280,
    link: "https://certificates.ccbp.in/intensive/introduction-to-databases?id=XRDBKSHROB",
  },
  {
    id: "python-foundations",
    title: "Programming Foundations with Python Certificate of Achievement",
    badge: "Python",
    image: "/highlights/python-cert.png",
    imageWidth: 2527,
    imageHeight: 1787,
    imageFit: "contain",
    cardWidth: 280,
    link: "https://certificates.ccbp.in/intensive/programming-foundations?id=ZIZDTWTGQO",
  },
  {
    id: "all-certifications",
    title: "Continuous Learning: 16+ Technical & Engineering Certifications",
    badge: "Certifications",
    image: "/highlights/all-certifications.jpg",
    imageWidth: 1024,
    imageHeight: 547,
    imageFit: "cover",
    cardWidth: 320,
  },
];
