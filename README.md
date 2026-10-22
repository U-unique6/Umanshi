# Umanshi's Portfolio

A React, TypeScript, Tailwind CSS, Motion, and Three.js portfolio.

## Development

```sh
npm install
npm run dev
```

Run `npm run build` for a production build and `npm run lint` for ESLint.

## Project structure

- `src/components/` contains reusable layout, section, and animation components.
- `src/utils/portfolioData.ts` contains structured skills, experience, education, achievements, and animation data.
- `src/utils/strings.js` contains portfolio copy and shared interface labels.
- `src/components/RiftScene3D.tsx` and `src/components/AchievementScene3D.tsx` render the reduced-motion-aware Three.js scenes when they approach the viewport.
- `src/index.css` loads Tailwind CSS; component styling uses Tailwind utility classes.
- `public/Umanshi_Resume.pdf` is the downloadable resume.
