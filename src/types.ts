export type Theme = "dark" | "light";

export type IconName =
  | "github"
  | "linkedin"
  | "resume"
  | "skills"
  | "contact"
  | "email"
  | "external";

export type Stat = {
  value: string;
  label: string;
};

export type Accomplishment = {
  title: string;
  description: string;
};

export type Project = {
  name: string;
  summary: string;
  tech: string[];
  link: string;
  linkLabel: string;
};

export type SkillGroup = {
  title: string;
  description: string;
  items: string[];
};

export type Contact = {
  label: string;
  href: string;
  icon: IconName;
};

export type PortfolioData = {
  name: string;
  tagline: string;
  summary: string;
  githubUrl: string;
  resumeUrl: string;
  skillsUrl: string;
  resourceSummary: string;
  contactBlurb: string;
  focusAreas: string[];
  stats: Stat[];
  accomplishments: Accomplishment[];
  projects: Project[];
  skillGroups: SkillGroup[];
  contact: Contact[];
  themeLabels: Record<Theme, string>;
};

export type TerminalLinkLine = {
  type: "link";
  href: string;
  label: string;
  description: string;
};

export type TerminalMutedLine = {
  type: "muted";
  text: string;
};

export type TerminalErrorLine = {
  type: "error";
  text: string;
};

export type TerminalLine = string | TerminalLinkLine | TerminalMutedLine | TerminalErrorLine;
