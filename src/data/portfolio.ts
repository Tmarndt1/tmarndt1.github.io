import type { PortfolioData } from "../types";

export const portfolio: PortfolioData = {
  name: "Travis Arndt",
  tagline: "Technical Lead | Senior Software Engineer",
  summary:
    "I lead and build mission-critical software with a focus on architecture, full-stack delivery, and long-term maintainability. My work spans .NET systems, modern web applications, APIs, data design, and the Agile practices that keep teams shipping effectively.",
  githubUrl: "https://github.com/Tmarndt1",
  resumeUrl: "./Travis.Arndt.Resume.docx",
  skillsUrl: "https://github.com/Tmarndt1?tab=repositories",
  resourceSummary:
    "Explore my GitHub profile, review the local resume included with this site, and use the skills section to get a quick read on my engineering range.",
  contactBlurb:
    "If you're looking for someone who enjoys building, learning fast, and turning ideas into working software, let's connect.",
  focusAreas: [
    "Leading full-stack architecture for mission-critical software",
    "Designing scalable APIs, distributed services, and maintainable systems",
    "Improving delivery through Agile leadership, mentorship, and engineering standards",
  ],
  stats: [
    { value: "9+", label: "years at Booz Allen Hamilton" },
    { value: "Tech Lead", label: "for MQ-25 software efforts" },
    { value: "Agile Lead", label: "driving delivery, alignment, and execution" },
    { value: "Full Stack", label: "from UI to APIs to data design" },
  ],
  accomplishments: [
    {
      title: "Technical lead for MQ-25 software",
      description:
        "Lead software architecture and full-stack delivery for health monitoring applications supporting the Navy MQ-25 Stingray program at Booz Allen Hamilton.",
    },
    {
      title: "Drives architecture and API design",
      description:
        "Designed distributed .NET systems, secure versioned REST APIs in ASP.NET Core, and data models shaped by clean architecture, DDD, and CQRS principles.",
    },
    {
      title: "Combines engineering with Agile leadership",
      description:
        "Served as Scrum Master, managed Jira-driven delivery, mentored engineers through code reviews, and kept stakeholders aligned through demos and status reporting.",
    },
  ],
  projects: [
    {
      name: "Developer Work on GitHub",
      summary:
        "My GitHub profile is the best public window into how I build. It highlights repositories, experiments, and coding patterns that complement the architecture and leadership work described here.",
      tech: ["JavaScript", "TypeScript", "React", "Node.js"],
      link: "https://github.com/Tmarndt1",
      linkLabel: "View GitHub profile",
    },
    {
      name: "Resume Snapshot",
      summary:
        "The resume included with this site summarizes my technical skills, leadership experience, education, and current work leading software efforts for the MQ-25 program.",
      tech: ["C#", ".NET", "ASP.NET Core", "Postgres"],
      link: "./Travis.Arndt.Resume.docx",
      linkLabel: "Open resume",
    },
  ],
  skillGroups: [
    {
      title: "Languages",
      description: "Core languages I use to build, automate, and scale products.",
      items: ["C#", "JavaScript", "TypeScript", "SQL"],
    },
    {
      title: "Frontend",
      description: "Interfaces and client-side systems focused on usability and clarity.",
      items: ["React", "HTML5", "CSS3", "Backbone.js", "jQuery"],
    },
    {
      title: "Backend",
      description: "Services, integrations, and data flows with maintainability in mind.",
      items: [".NET", "ASP.NET Core", "Node.js", "REST APIs", "Postgres"],
    },
    {
      title: "Workflow",
      description: "Practices I use to keep software quality high and delivery steady.",
      items: ["Git", "Jira", "Jenkins", "GitHub Workflows", "Scrum Leadership"],
    },
  ],
  contact: [
    {
      label: "GitHub",
      href: "https://github.com/Tmarndt1",
      icon: "github",
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/tmarndt1/",
      icon: "linkedin",
    },
    {
      label: "Email",
      href: "mailto:tmarndt1991@gmail.com",
      icon: "email",
    },
  ],
  themeLabels: {
    dark: "Light Mode",
    light: "Dark Mode",
  },
};
