# Personal Website

This project is set up as a React + TypeScript + Tailwind CSS portfolio using Vite.

## Install and run

1. Install dependencies:

```bash
npm install
```

2. Build into `dist/` in watch mode:

```bash
npm run dev
```

3. Preview the current `dist/` output:

```bash
npm run preview
```

4. Build for production:

```bash
npm run build
```

## Edit your content

Update the portfolio data in `src/data/portfolio.ts` to customize:

- Your name, summary, and focus areas
- GitHub, LinkedIn, resume, and skills links
- Accomplishments and featured work
- Contact methods and terminal responses

## Project structure

- `src/App.tsx` contains the main layout
- `src/components/Terminal.tsx` contains the interactive terminal
- `src/components/Icons.tsx` contains reusable SVG icons
- `src/data/portfolio.ts` stores the portfolio content
- `src/index.css` contains Tailwind imports and base utilities
- `Travis.Arndt.Resume.docx` is bundled as a static asset

## GitHub Pages

This project includes a GitHub Actions workflow at `.github/workflows/deploy.yml` that builds the app and publishes `dist/` to GitHub Pages automatically.

To publish it:

1. Push this project to a GitHub repository.
2. In GitHub, open `Settings` -> `Pages`.
3. Under `Build and deployment`, set `Source` to `GitHub Actions`.
4. Push to the `main` branch.

GitHub will build and deploy the site automatically. The `public/.nojekyll` file is included so the deployed artifact is GitHub Pages friendly.
