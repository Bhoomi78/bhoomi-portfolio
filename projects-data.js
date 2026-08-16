/**
 * Bhoomi Srivastava Portfolio - Centralized Project Data
 * Central repository for portfolio projects.
 * Easily add, edit, or remove projects here without modifying HTML markup.
 */

const PORTFOLIO_PROJECTS = [
  {
    id: "customer-behavior-analysis",
    featured: true,
    title: "Customer Behaviour Analysis Dashboard",
    badge: "Featured Analytics & BI Project",
    category: "Data Analytics & Business Intelligence",
    shortDesc: "An interactive data analytics project focused on analyzing customer purchasing behaviour and generating actionable business insights through data visualization and dashboarding.",
    problemStatement: "Understanding customer acquisition, retention patterns, purchase frequency, and revenue distribution across customer segments to enable data-driven marketing and inventory optimization.",
    technologies: ["Power BI", "PostgreSQL", "SQL", "Microsoft Excel"],
    keyFeatures: [
      "Customer behaviour analysis & purchase frequency tracking",
      "Customer segmentation by RFM and spending tiers",
      "Revenue trend analysis across time periods and product lines",
      "Purchase pattern analysis & basket size insights",
      "Interactive KPI tracking (Retention, Average Order Value, CLV)",
      "Interactive Power BI visualizations with dynamic filters",
      "Actionable business insights for executive reporting",
      "Data-driven decision making recommendations"
    ],
    kpis: [
      { label: "Data Pipeline", val: "PostgreSQL & SQL" },
      { label: "Dashboard Engine", val: "Power BI & Excel" },
      { label: "Core Analysis", val: "Segmentation & KPIs" },
      { label: "Business Impact", val: "Actionable Insights" }
    ],
    githubUrl: "https://github.com/Bhoomi78/Customer_behavior_analysis-project/tree/main",
    liveDemoAvailable: false,
    screenshotPlaceholder: {
      type: "power-bi-dashboard",
      title: "Power BI Customer Behaviour Executive Dashboard",
      subtitle: "Interactive Multi-Page BI Report: Revenue Trends, Cohort Retention & Segment Matrix"
    }
  },
  {
    id: "jarvis-ai-assistant",
    featured: false,
    title: "JARVIS AI Assistant",
    badge: "AI & Automation",
    category: "Artificial Intelligence & Python Automation",
    shortDesc: "An intelligent Python-based assistant leveraging Artificial Intelligence and automation to streamline workflows, execute queries, and assist in daily operations.",
    problemStatement: "Reducing friction in daily computational tasks through hands-free voice interaction, automated information retrieval, and desktop command orchestration.",
    technologies: ["Python", "Artificial Intelligence", "Git"],
    keyFeatures: [
      "Voice & text command automation pipeline",
      "Automated web search & Wikipedia knowledge retrieval",
      "System process automation & time/date diagnostics",
      "Hands-free operational command execution",
      "Modular Python architecture for extensible command skills",
      "Real-time speech synthesis and command logging"
    ],
    githubUrl: "https://github.com/Bhoomi78",
    liveDemoAvailable: true,
    interactiveDemoId: "jarvis-simulator",
    screenshotPlaceholder: {
      type: "ai-assistant",
      title: "JARVIS AI Voice & Command Processing Engine",
      subtitle: "Python-driven hands-free operational interface with live interactive browser simulation"
    }
  }
];

// Export for browser usage
window.PORTFOLIO_PROJECTS = PORTFOLIO_PROJECTS;
