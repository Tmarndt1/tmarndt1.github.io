import { useEffect, useState } from "react";
import { Icon } from "./components/Icons";
import { Terminal } from "./components/Terminal";
import { portfolio } from "./data/portfolio";
import type { Theme } from "./types";

function getInitialTheme(): Theme {
  const savedTheme = window.localStorage.getItem("portfolio-theme");
  return savedTheme === "dark" ? "dark" : "light";
}

function App() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);
  const isDark = theme === "dark";

  useEffect(() => {
    document.body.dataset.theme = theme;
    window.localStorage.setItem("portfolio-theme", theme);
  }, [theme]);

  return (
    <div className="mx-auto w-[min(1180px,calc(100%-24px))] py-4 pb-14 sm:w-[min(1180px,calc(100%-32px))] sm:py-6 sm:pb-[72px]">
      <header
        className={`sticky top-3 z-30 flex flex-col items-stretch gap-3 rounded-[24px] border px-4 py-4 shadow-[0_18px_40px_rgba(0,0,0,0.18)] backdrop-blur-[18px] sm:top-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-4 sm:rounded-full sm:px-[18px] sm:py-[14px] ${
          isDark ? "border-soft bg-[rgba(46,48,53,0.92)]" : "border-black/10 bg-[rgba(255,252,247,0.92)]"
        }`}
      >
        <div className="flex items-center justify-between gap-3">
          <a
            className={`inline-flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-[14px] border text-lg font-extrabold tracking-[-0.04em] ${
              isDark
                ? "border-brass-400/35 bg-[linear-gradient(135deg,rgba(88,196,221,0.18),rgba(242,193,78,0.08))] text-sand-50"
                : "border-[#8b5e34]/20 bg-[linear-gradient(135deg,rgba(58,141,132,0.14),rgba(139,94,52,0.08))] text-slate-900"
            }`}
            href="#top"
          >
            TA
          </a>
          <button
            aria-label="Toggle color theme"
            className={`min-h-[42px] rounded-full border px-4 py-2 text-sm font-semibold transition hover:-translate-y-px sm:text-base ${
              isDark
                ? "border-soft bg-white/5 text-sand-50 hover:border-brass-400/50"
                : "border-black/10 bg-white/60 text-slate-900 hover:border-[#8b5e34]/40"
            }`}
            onClick={() => setTheme((current) => (current === "dark" ? "light" : "dark"))}
            type="button"
          >
            {portfolio.themeLabels[theme]}
          </button>
        </div>
        <nav aria-label="Primary" className="grid grid-cols-2 gap-2 text-[0.92rem] sm:flex sm:flex-wrap sm:gap-[18px] sm:text-[0.95rem]">
          {["Accomplishments", "Projects", "Skills", "Connect"].map((label) => (
            <a
              className={`rounded-full border px-3 py-2 text-center transition sm:rounded-none sm:border-0 sm:px-0 sm:py-0 ${
                isDark
                  ? "border-soft bg-white/5 text-muted hover:text-sand-50 sm:bg-transparent"
                  : "border-black/10 bg-white/60 text-slate-600 hover:text-slate-900 sm:bg-transparent"
              }`}
              href={`#${label.toLowerCase()}`}
              key={label}
            >
              {label}
            </a>
          ))}
        </nav>
      </header>

      <main className="pt-6 sm:pt-9" id="top">
        <section
          className={`relative overflow-hidden rounded-[24px] border p-5 shadow-soft backdrop-blur-2xl sm:rounded-[28px] sm:p-8 lg:p-10 ${
            isDark
              ? "border-soft bg-[radial-gradient(circle_at_top_left,rgba(88,196,221,0.16),transparent_26%),radial-gradient(circle_at_top_right,rgba(242,193,78,0.12),transparent_24%),linear-gradient(160deg,rgba(46,48,53,0.96),rgba(34,35,39,0.92))]"
              : "border-black/10 bg-[radial-gradient(circle_at_top_left,rgba(58,141,132,0.12),transparent_26%),radial-gradient(circle_at_top_right,rgba(139,94,52,0.1),transparent_24%),linear-gradient(160deg,rgba(255,252,247,0.96),rgba(244,237,226,0.92))]"
          }`}
        >
          <div
            className={`absolute right-4 top-4 h-[86px] w-[86px] rounded-[24px] blur-[18px] sm:right-6 sm:top-6 sm:h-[110px] sm:w-[110px] sm:rounded-3xl ${
              isDark
                ? "bg-[linear-gradient(135deg,rgba(88,196,221,0.2),rgba(143,214,148,0.16))]"
                : "bg-[linear-gradient(135deg,rgba(58,141,132,0.16),rgba(139,94,52,0.12))]"
            }`}
          />
          <div className="relative">
            <p className={`mb-3 text-[0.78rem] uppercase tracking-[0.18em] ${isDark ? "text-brass-400" : "text-[#8b5e34]"}`}>
              {portfolio.tagline}
            </p>
            <h1 className={`max-w-[9ch] text-[clamp(2.9rem,13vw,6rem)] font-extrabold leading-[0.92] tracking-[-0.05em] sm:max-w-[8ch] sm:text-[clamp(3.1rem,6.8vw,6rem)] ${isDark ? "text-sand-50" : "text-slate-900"}`}>
              {portfolio.name}
            </h1>

            <div className="mt-6 sm:mt-8">
              <Terminal onThemeChange={setTheme} portfolio={portfolio} theme={theme} />
            </div>

            <div className="mt-6 grid gap-3 sm:mt-7 sm:flex sm:flex-wrap sm:gap-3.5">
              <a
                className={`inline-flex min-h-[48px] items-center justify-center gap-2.5 rounded-full px-[18px] font-bold transition hover:-translate-y-px sm:min-h-[46px] ${
                  isDark
                    ? "bg-[linear-gradient(135deg,#f2c14e,#8fd694)] text-ink-950 shadow-glow"
                    : "bg-[linear-gradient(135deg,#8b5e34,#3a8d84)] text-white shadow-[0_12px_30px_rgba(58,141,132,0.18)]"
                }`}
                href={portfolio.githubUrl}
                rel="noreferrer"
                target="_blank"
              >
                <Icon name="github" />
                <span>View GitHub</span>
              </a>
              <a
                className={`inline-flex min-h-[48px] items-center justify-center gap-2.5 rounded-full border px-[18px] font-bold transition hover:-translate-y-px sm:min-h-[46px] ${
                  isDark
                    ? "border-soft bg-white/5 text-sand-50"
                    : "border-black/10 bg-white/60 text-slate-900"
                }`}
                href={portfolio.resumeUrl}
                rel="noreferrer"
                target="_blank"
              >
                <Icon name="resume" />
                <span>Open Resume</span>
              </a>
            </div>

            <div className="mt-7 pt-1">
              <p className={`mb-3 text-[0.78rem] uppercase tracking-[0.18em] ${isDark ? "text-brass-400" : "text-[#8b5e34]"}`}>
                What I Focus On
              </p>
              <ul className="grid list-none gap-3 p-0 lg:grid-cols-3">
                {portfolio.focusAreas.map((focus) => (
                  <li
                    className={`rounded-[18px] border px-4 py-3 ${isDark ? "border-soft bg-white/5 text-sand-50" : "border-black/10 bg-white/60 text-slate-900"}`}
                    key={focus}
                  >
                    {focus}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section
          className={`relative mt-6 overflow-hidden rounded-[24px] border p-5 shadow-soft sm:rounded-[28px] sm:p-[30px] ${
            isDark
              ? "border-soft bg-[linear-gradient(180deg,rgba(46,48,53,0.92),rgba(34,35,39,0.88))]"
              : "border-black/10 bg-[linear-gradient(180deg,rgba(255,252,247,0.96),rgba(244,237,226,0.9))]"
          }`}
        >
          <div className={`pointer-events-none absolute -left-[10%] -top-[30%] h-[240px] w-[240px] rounded-full ${isDark ? "bg-[radial-gradient(circle,rgba(143,214,148,0.12),transparent_68%)]" : "bg-[radial-gradient(circle,rgba(58,141,132,0.1),transparent_68%)]"}`} />
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {portfolio.stats.map((stat) => (
              <article
                className={`rounded-[20px] border p-5 sm:rounded-[22px] sm:p-6 ${isDark ? "border-soft bg-[linear-gradient(180deg,rgba(63,65,72,0.96),rgba(34,35,39,0.88))]" : "border-black/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(245,239,229,0.9))]"}`}
                key={`${stat.value}-${stat.label}`}
              >
                <strong className={`block text-[2rem] tracking-[-0.06em] ${isDark ? "text-sand-50" : "text-slate-900"}`}>
                  {stat.value}
                </strong>
                <span className={`mt-2 block ${isDark ? "text-muted" : "text-slate-600"}`}>{stat.label}</span>
              </article>
            ))}
          </div>
        </section>

        <section
          className={`mt-6 rounded-[24px] border p-5 shadow-soft sm:rounded-[28px] sm:p-[30px] ${isDark ? "border-soft bg-[linear-gradient(180deg,rgba(46,48,53,0.92),rgba(34,35,39,0.88))]" : "border-black/10 bg-[linear-gradient(180deg,rgba(255,252,247,0.96),rgba(244,237,226,0.9))]"}`}
          id="accomplishments"
        >
          <div className="mb-[22px]">
            <p className={`mb-3 text-[0.78rem] uppercase tracking-[0.18em] ${isDark ? "text-brass-400" : "text-[#8b5e34]"}`}>
              Highlights
            </p>
            <h2 className={`text-[clamp(2rem,4vw,3rem)] font-extrabold tracking-[-0.05em] ${isDark ? "text-sand-50" : "text-slate-900"}`}>
              Accomplishments worth calling out
            </h2>
          </div>
          <div className="grid gap-4 lg:grid-cols-3">
            {portfolio.accomplishments.map((item, index) => (
              <article
                className={`rounded-[20px] border p-5 sm:rounded-[22px] sm:p-6 ${isDark ? "bg-[linear-gradient(180deg,rgba(63,65,72,0.96),rgba(34,35,39,0.88))]" : "bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(245,239,229,0.9))]"}`}
                key={item.title}
                style={{
                  borderColor:
                    index % 3 === 0
                      ? "rgba(242, 193, 78, 0.34)"
                      : index % 3 === 1
                        ? "rgba(88, 196, 221, 0.28)"
                        : "rgba(143, 214, 148, 0.28)",
                }}
              >
                <h3 className={`mb-2.5 text-[1.35rem] font-extrabold tracking-[-0.05em] ${isDark ? "text-sand-50" : "text-slate-900"}`}>
                  {item.title}
                </h3>
                <p className={`leading-7 ${isDark ? "text-muted" : "text-slate-600"}`}>{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className={`mt-6 rounded-[24px] border p-5 shadow-soft sm:rounded-[28px] sm:p-[30px] ${isDark ? "border-soft bg-[linear-gradient(180deg,rgba(46,48,53,0.92),rgba(34,35,39,0.88))]" : "border-black/10 bg-[linear-gradient(180deg,rgba(255,252,247,0.96),rgba(244,237,226,0.9))]"}`}
          id="projects"
        >
          <div className="mb-[22px]">
            <p className={`mb-3 text-[0.78rem] uppercase tracking-[0.18em] ${isDark ? "text-brass-400" : "text-[#8b5e34]"}`}>
              Selected Work
            </p>
            <h2 className={`text-[clamp(2rem,4vw,3rem)] font-extrabold tracking-[-0.05em] ${isDark ? "text-sand-50" : "text-slate-900"}`}>
              Projects that show how I build
            </h2>
          </div>
          <div className="grid gap-4 lg:grid-cols-2">
            {portfolio.projects.map((project, index) => (
              <article
                className={`flex min-h-full flex-col gap-3.5 rounded-[20px] border p-5 sm:rounded-[22px] sm:p-6 ${isDark ? "bg-[linear-gradient(180deg,rgba(63,65,72,0.96),rgba(34,35,39,0.88))]" : "bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(245,239,229,0.9))]"}`}
                key={project.name}
                style={{
                  borderColor:
                    index % 3 === 0
                      ? "rgba(242, 193, 78, 0.34)"
                      : index % 3 === 1
                        ? "rgba(88, 196, 221, 0.28)"
                        : "rgba(143, 214, 148, 0.28)",
                }}
              >
                <div>
                  <p className={`mb-3 text-[0.78rem] uppercase tracking-[0.18em] ${isDark ? "text-brass-400" : "text-[#8b5e34]"}`}>
                    Featured Project
                  </p>
                  <h3 className={`text-[1.35rem] font-extrabold tracking-[-0.05em] ${isDark ? "text-sand-50" : "text-slate-900"}`}>
                    {project.name}
                  </h3>
                </div>
                <p className={`leading-7 ${isDark ? "text-muted" : "text-slate-600"}`}>{project.summary}</p>
                <ul className="flex list-none flex-wrap gap-2.5 p-0">
                  {project.tech.map((item) => (
                    <li
                      className={`rounded-full border px-3 py-2 text-[0.9rem] ${isDark ? "border-soft bg-white/5 text-sand-50" : "border-black/10 bg-white/60 text-slate-900"}`}
                      key={item}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
                <a
                  className={`mt-auto inline-flex items-center gap-2 font-bold transition ${isDark ? "text-brass-400 hover:text-white" : "text-[#8b5e34] hover:text-slate-900"}`}
                  href={project.link}
                  rel="noreferrer"
                  target="_blank"
                >
                  <Icon
                    name={project.name.toLowerCase().includes("github") ? "github" : "external"}
                  />
                  <span>{project.linkLabel}</span>
                </a>
              </article>
            ))}
          </div>
        </section>

        <section
          className={`mt-6 grid gap-5 rounded-[24px] border p-5 shadow-soft sm:gap-[22px] sm:rounded-[28px] sm:p-[30px] lg:grid-cols-[1.45fr_0.9fr] ${isDark ? "border-soft bg-[linear-gradient(180deg,rgba(46,48,53,0.92),rgba(34,35,39,0.88))]" : "border-black/10 bg-[linear-gradient(180deg,rgba(255,252,247,0.96),rgba(244,237,226,0.9))]"}`}
          id="skills"
        >
          <div>
            <div className="mb-[22px]">
              <p className={`mb-3 text-[0.78rem] uppercase tracking-[0.18em] ${isDark ? "text-brass-400" : "text-[#8b5e34]"}`}>
                Skills
              </p>
              <h2 className={`text-[clamp(2rem,4vw,3rem)] font-extrabold tracking-[-0.05em] ${isDark ? "text-sand-50" : "text-slate-900"}`}>
                Tools, strengths, and technical range
              </h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {portfolio.skillGroups.map((group) => (
                <article className={`rounded-[20px] border p-5 sm:rounded-[22px] sm:p-[22px] ${isDark ? "border-soft bg-white/5" : "border-black/10 bg-white/60"}`} key={group.title}>
                  <h3 className={`text-[1.35rem] font-extrabold tracking-[-0.05em] ${isDark ? "text-sand-50" : "text-slate-900"}`}>
                    {group.title}
                  </h3>
                  <p className={`mt-2 leading-7 ${isDark ? "text-muted" : "text-slate-600"}`}>{group.description}</p>
                  <ul className="mt-4 flex list-none flex-wrap gap-2.5 p-0">
                    {group.items.map((item) => (
                      <li
                        className={`rounded-full border px-3 py-2 text-[0.9rem] ${isDark ? "border-soft bg-[rgba(63,65,72,0.55)] text-sand-50" : "border-black/10 bg-[rgba(255,255,255,0.72)] text-slate-900"}`}
                        key={item}
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>

          <aside className={`h-fit rounded-[24px] border p-5 shadow-soft sm:rounded-[28px] sm:p-[26px] lg:sticky lg:top-24 ${isDark ? "border-soft bg-[radial-gradient(circle_at_top,rgba(88,196,221,0.12),transparent_26%),linear-gradient(180deg,rgba(46,48,53,0.96),rgba(34,35,39,0.92))]" : "border-black/10 bg-[radial-gradient(circle_at_top,rgba(58,141,132,0.12),transparent_26%),linear-gradient(180deg,rgba(255,252,247,0.98),rgba(244,237,226,0.94))]"}`}>
            <p className={`mb-3 text-[0.78rem] uppercase tracking-[0.18em] ${isDark ? "text-brass-400" : "text-[#8b5e34]"}`}>
              Quick Access
            </p>
            <h3 className={`text-[1.35rem] font-extrabold tracking-[-0.05em] ${isDark ? "text-sand-50" : "text-slate-900"}`}>
              Resume and skill references
            </h3>
            <p className={`mt-4 leading-7 ${isDark ? "text-muted" : "text-slate-600"}`}>{portfolio.resourceSummary}</p>
            <div className="mt-[22px] grid gap-3 sm:flex sm:flex-wrap sm:gap-3.5">
              <a
                className={`inline-flex min-h-[48px] items-center justify-center gap-2.5 rounded-full px-[18px] font-bold transition hover:-translate-y-px sm:min-h-[46px] ${
                  isDark
                    ? "bg-[linear-gradient(135deg,#f2c14e,#8fd694)] text-ink-950 shadow-glow"
                    : "bg-[linear-gradient(135deg,#8b5e34,#3a8d84)] text-white shadow-[0_12px_30px_rgba(58,141,132,0.18)]"
                }`}
                href={portfolio.skillsUrl}
                rel="noreferrer"
                target="_blank"
              >
                <Icon name="skills" />
                <span>Browse Skills</span>
              </a>
              <a
                className={`inline-flex min-h-[48px] items-center justify-center gap-2.5 rounded-full border px-[18px] font-bold transition hover:-translate-y-px sm:min-h-[46px] ${
                  isDark ? "border-soft bg-white/5 text-sand-50" : "border-black/10 bg-white/60 text-slate-900"
                }`}
                href="#connect"
              >
                <Icon name="contact" />
                <span>Get In Touch</span>
              </a>
            </div>
          </aside>
        </section>

        <section
          className={`mt-6 rounded-[24px] border p-5 shadow-soft sm:rounded-[28px] sm:p-[30px] ${isDark ? "border-soft bg-[linear-gradient(180deg,rgba(46,48,53,0.92),rgba(34,35,39,0.88))]" : "border-black/10 bg-[linear-gradient(180deg,rgba(255,252,247,0.96),rgba(244,237,226,0.9))]"}`}
          id="connect"
        >
          <div className="mb-[22px]">
            <p className={`mb-3 text-[0.78rem] uppercase tracking-[0.18em] ${isDark ? "text-brass-400" : "text-[#8b5e34]"}`}>
              Connect
            </p>
            <h2 className={`text-[clamp(2rem,4vw,3rem)] font-extrabold tracking-[-0.05em] ${isDark ? "text-sand-50" : "text-slate-900"}`}>
              Let&apos;s build something useful
            </h2>
          </div>
          <div className={`rounded-[22px] border p-5 sm:rounded-[24px] sm:p-[26px] ${isDark ? "border-soft bg-[radial-gradient(circle_at_right_top,rgba(242,193,78,0.12),transparent_22%),linear-gradient(180deg,rgba(46,48,53,0.94),rgba(34,35,39,0.88))]" : "border-black/10 bg-[radial-gradient(circle_at_right_top,rgba(139,94,52,0.1),transparent_22%),linear-gradient(180deg,rgba(255,255,255,0.96),rgba(245,239,229,0.9))]"}`}>
            <p className={`leading-7 ${isDark ? "text-muted" : "text-slate-600"}`}>{portfolio.contactBlurb}</p>
            <div className="mt-5 grid gap-3 sm:flex sm:flex-wrap sm:gap-3.5">
              {portfolio.contact.map((item) => (
                <a
                  className={`inline-flex min-h-[48px] items-center justify-center gap-2.5 rounded-full border px-[18px] font-bold transition hover:-translate-y-px sm:min-h-[46px] ${
                    isDark ? "border-soft bg-white/5 text-sand-50" : "border-black/10 bg-white/60 text-slate-900"
                  }`}
                  href={item.href}
                  key={item.label}
                  rel="noreferrer"
                  target="_blank"
                >
                  <Icon name={item.icon} />
                  <span>{item.label}</span>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
