import { useEffect, useMemo, useRef, useState } from "react";
import type { PortfolioData, TerminalLine, Theme } from "../types";

type TerminalProps = {
  portfolio: PortfolioData;
  theme: Theme;
  onThemeChange: (theme: Theme) => void;
};

type Entry = {
  command: string;
  lines: TerminalLine[];
};

type CommandResponse =
  | { lines: TerminalLine[] | "CLEAR"; theme?: never }
  | { theme: Theme; lines?: never };

function getCommandResponse(
  portfolio: PortfolioData,
  rawCommand: string
): CommandResponse {
  const normalized = rawCommand.trim().toLowerCase();
  const themeMatch = normalized.match(/^theme\s+(dark|light)$/);

  const commands: Record<string, TerminalLine[] | "CLEAR"> = {
    help: [
      "Available commands:",
      "about",
      "skills",
      "projects",
      "accomplishments",
      "contact",
      "github",
      "linkedin",
      "resume",
      "theme dark",
      "theme light",
      "clear",
    ],
    about: [
      `Name: ${portfolio.name}`,
      portfolio.summary,
      { type: "muted", text: "Tip: try skills, projects, or contact next." },
    ],
    skills: [
      "Core skills:",
      ...portfolio.skillGroups.map((group) => `${group.title}: ${group.items.join(", ")}`),
    ],
    projects: portfolio.projects.map((project) => ({
      type: "link" as const,
      href: project.link,
      label: project.name,
      description: project.tech.join(" | "),
    })),
    accomplishments: portfolio.accomplishments.map(
      (item) => `${item.title}: ${item.description}`
    ),
    contact: portfolio.contact.map((item) => ({
      type: "link" as const,
      href: item.href,
      label: item.label,
      description: "Open link",
    })),
    github: [
      {
        type: "link" as const,
        href: portfolio.githubUrl,
        label: portfolio.githubUrl,
        description: "GitHub profile",
      },
    ],
    linkedin: [
      {
        type: "link" as const,
        href: "https://www.linkedin.com/in/tmarndt1/",
        label: "https://www.linkedin.com/in/tmarndt1/",
        description: "LinkedIn profile",
      },
    ],
    resume: [
      {
        type: "link" as const,
        href: portfolio.resumeUrl,
        label: "Travis.Arndt.Resume.docx",
        description: "Open local resume",
      },
      { type: "muted", text: "A local copy of your resume is bundled with this portfolio." },
    ],
    clear: "CLEAR",
  };

  if (!normalized) {
    return { lines: [{ type: "muted", text: "Type help to see available commands." }] };
  }

  if (themeMatch) {
    return { theme: themeMatch[1] as Theme };
  }

  const response = commands[normalized];
  if (response) {
    return { lines: response };
  }

  return {
    lines: [
      { type: "error", text: `Command not found: ${rawCommand}` },
      { type: "muted", text: "Try help to see supported commands." },
    ],
  };
}

function TerminalLineView({ line, isDark }: { line: TerminalLine; isDark: boolean }) {
  if (typeof line === "string") {
    return <div>{line}</div>;
  }

  if (line.type === "link") {
    return (
      <div>
        <a
          className={`transition ${
            isDark ? "text-brass-400 hover:text-white" : "text-[#8b5e34] hover:text-[#3a8d84]"
          }`}
          href={line.href}
          target="_blank"
          rel="noreferrer"
        >
          {line.label}
        </a>
        <span className={`text-sm ${isDark ? "text-slate-400" : "text-slate-500"}`}>
          {" - "}
          {line.description}
        </span>
      </div>
    );
  }

  if (line.type === "error") {
    return <div className={isDark ? "text-ember-400" : "text-[#c3543d]"}>{line.text}</div>;
  }

  return <div className={`text-sm ${isDark ? "text-slate-400" : "text-slate-500"}`}>{line.text}</div>;
}

export function Terminal({ portfolio, theme, onThemeChange }: TerminalProps) {
  const isDark = theme === "dark";
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const initialEntries = useMemo<Entry[]>(
    () => [
      {
        command: "help",
        lines: getCommandResponse(portfolio, "help").lines as TerminalLine[],
      },
      {
        command: "about",
        lines: getCommandResponse(portfolio, "about").lines as TerminalLine[],
      },
    ],
    [portfolio]
  );

  const [entries, setEntries] = useState<Entry[]>(initialEntries);
  const [command, setCommand] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number | null>(null);
  const [caretIndex, setCaretIndex] = useState(0);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) {
      return;
    }

    container.scrollTop = container.scrollHeight;
  }, [entries, command]);

  useEffect(() => {
    const input = inputRef.current;
    if (!input || document.activeElement !== input) {
      return;
    }

    input.setSelectionRange(caretIndex, caretIndex);
  }, [caretIndex, command]);

  const focusInput = () => {
    const input = inputRef.current;
    if (!input) {
      return;
    }

    input.focus();
    const position = input.selectionStart ?? command.length;
    setCaretIndex(position);
  };

  const syncCaret = () => {
    const input = inputRef.current;
    if (!input) {
      return;
    }

    setCaretIndex(input.selectionStart ?? input.value.length);
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmed = command.trim();
    const response = getCommandResponse(portfolio, trimmed);

    if (response.theme) {
      onThemeChange(response.theme);
      setEntries((current) => [
        ...current,
        { command: trimmed || "", lines: [`Theme switched to ${response.theme}.`] },
      ]);
    } else if (response.lines === "CLEAR") {
      setEntries([]);
    } else {
      const lines = response.lines ?? [];
      setEntries((current) => [
        ...current,
        { command: trimmed || "", lines },
      ]);
    }

    if (trimmed) {
      setHistory((current) => [...current, trimmed]);
      setHistoryIndex(null);
    }

    setCommand("");
    setCaretIndex(0);
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowUp") {
      event.preventDefault();
      if (!history.length) {
        return;
      }

      const nextIndex =
        historyIndex === null ? history.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIndex);
      const nextCommand = history[nextIndex];
      setCommand(nextCommand);
      setCaretIndex(nextCommand.length);
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      if (!history.length || historyIndex === null) {
        return;
      }

      const nextIndex = historyIndex + 1;
      if (nextIndex >= history.length) {
        setHistoryIndex(null);
        setCommand("");
        setCaretIndex(0);
        return;
      }

      setHistoryIndex(nextIndex);
      const nextCommand = history[nextIndex];
      setCommand(nextCommand);
      setCaretIndex(nextCommand.length);
    }
  };

  const beforeCaret = command.slice(0, caretIndex);
  const afterCaret = command.slice(caretIndex);

  return (
    <div
      onMouseDown={(event) => {
        const target = event.target as HTMLElement;
        if (target.tagName !== "INPUT") {
          event.preventDefault();
        }
        focusInput();
      }}
      className={`overflow-hidden rounded-[22px] border shadow-soft ${
        isDark
          ? "border-[#2b2d31] bg-[linear-gradient(180deg,rgba(30,31,35,0.98),rgba(16,17,20,0.99))] text-sand-50 shadow-[0_28px_70px_rgba(0,0,0,0.42)]"
          : "border-[#d8d0c3] bg-[linear-gradient(180deg,rgba(248,244,238,0.99),rgba(236,229,219,0.99))] text-slate-900 shadow-[0_22px_50px_rgba(82,63,42,0.12)]"
      }`}
    >
      <div
        className={`flex items-center gap-2 border-b px-3 py-2.5 sm:px-4 sm:py-3 ${
          isDark
            ? "border-[#3a3d45] bg-[linear-gradient(180deg,rgba(67,70,78,0.98),rgba(47,49,56,0.98))]"
            : "border-[#d7cfbf] bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(240,235,226,0.96))]"
        }`}
      >
        <span className="h-[11px] w-[11px] rounded-full bg-ember-400" />
        <span className="h-[11px] w-[11px] rounded-full bg-brass-400" />
        <span className="h-[11px] w-[11px] rounded-full bg-sage-500" />
        <p className={`ml-2 min-w-0 overflow-hidden text-ellipsis whitespace-nowrap font-mono text-[0.78rem] sm:text-sm ${isDark ? "text-slate-400" : "text-slate-500"}`}>
          travis@portfolio:~ [{theme}]
        </p>
      </div>
      <div
        ref={scrollRef}
        className={`relative h-[300px] min-h-[300px] p-3 font-mono text-[0.82rem] leading-6 sm:h-[340px] sm:min-h-[340px] sm:p-4 sm:text-[0.93rem] sm:leading-7 ${
          isDark
            ? "bg-[linear-gradient(180deg,rgba(10,11,13,0.98),rgba(15,16,19,0.98))]"
            : "bg-[linear-gradient(180deg,rgba(252,249,244,0.98),rgba(241,235,226,0.98))]"
        } overflow-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:w-0 [&::-webkit-scrollbar]:h-0`}
      >
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 ${
            isDark
              ? "bg-[linear-gradient(180deg,rgba(255,255,255,0.024)_0,rgba(255,255,255,0.024)_1px,transparent_1px,transparent_4px)] opacity-40"
              : "bg-[linear-gradient(180deg,rgba(60,52,42,0.02)_0,rgba(60,52,42,0.02)_1px,transparent_1px,transparent_4px)] opacity-25"
          }`}
        />
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-x-0 top-0 h-14 ${
            isDark
              ? "bg-[linear-gradient(180deg,rgba(255,255,255,0.05),transparent)]"
              : "bg-[linear-gradient(180deg,rgba(255,255,255,0.32),transparent)]"
          }`}
        />
        <div className="relative grid gap-3 pr-1">
          {entries.map((entry, index) => (
            <div className="grid gap-2" key={`${entry.command}-${index}`}>
              <div className="grid grid-cols-[auto_auto_auto_minmax(0,1fr)] items-center gap-2 sm:gap-3">
                <span className="text-sage-500">travis@portfolio</span>
                <span className={isDark ? "text-mist-400" : "text-slate-500"}>~</span>
                <span className={isDark ? "text-brass-400" : "text-[#8b5e34]"}>$</span>
                <span className={`min-w-0 break-all ${isDark ? "text-sand-50" : "text-slate-900"}`}>{entry.command}</span>
              </div>
              <div className={`grid gap-2 ${isDark ? "text-sand-50" : "text-slate-900"}`}>
                {entry.lines.map((line, lineIndex) => (
                  <TerminalLineView isDark={isDark} key={lineIndex} line={line} />
                ))}
              </div>
            </div>
          ))}
        </div>
        <form className="mt-4" onSubmit={onSubmit}>
          <label className="grid grid-cols-[auto_auto_auto_minmax(0,1fr)] items-center gap-2 sm:gap-3">
            <span className="text-sage-500">travis@portfolio</span>
            <span className={isDark ? "text-mist-400" : "text-slate-500"}>~</span>
            <span className={isDark ? "text-brass-400" : "text-[#8b5e34]"}>$</span>
            <span className="relative block min-w-0">
              <span
                aria-hidden="true"
                className={`pointer-events-none flex min-h-[1.75rem] items-center whitespace-pre-wrap break-all ${
                  isDark ? "text-sand-50" : "text-slate-900"
                }`}
              >
                <span>{beforeCaret || (command.length === 0 ? " " : "")}</span>
                <span
                  className={`ml-px inline-block h-[1.05rem] w-[4px] shrink-0 animate-pulse ${
                    isDark ? "bg-slate-200" : "bg-slate-300"
                  }`}
                />
                <span>{afterCaret}</span>
              </span>
              <input
                aria-label="Type a terminal command"
                className="absolute inset-0 w-full border-0 bg-transparent p-0 text-transparent outline-none caret-transparent"
                onClick={syncCaret}
                name="command"
                onChange={(event) => {
                  setCommand(event.target.value);
                  setCaretIndex(event.target.selectionStart ?? event.target.value.length);
                }}
                onKeyDown={onKeyDown}
                onKeyUp={syncCaret}
                onSelect={syncCaret}
                spellCheck={false}
                ref={inputRef}
                type="text"
                value={command}
              />
            </span>
          </label>
        </form>
      </div>
    </div>
  );
}
