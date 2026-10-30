# Milan Raj — Cinematic 3D Portfolio

A React + Three.js portfolio inspired by the uploaded short-video reference: a dark cinematic stage, overhead spotlight, floating particles, stylized 3D developer character, minimal navigation and editorial project sections.

## Run locally

1. Install Node.js 18 or newer.
2. Open this folder in VS Code.
3. In the terminal run:

   ```bash
   npm install
   npm run dev
   ```

4. Open the local URL printed by Vite (normally `http://localhost:5173`).
5. Create a production build with `npm run build`.

## Project structure

```text
milan-3d-portfolio/
├── public/
│   └── models/              # Add a GLB/GLTF character model here if desired
├── src/
│   ├── components/
│   │   ├── Avatar.jsx       # Procedural stylized 3D character
│   │   └── Scene.jsx        # Three.js canvas, lights, stars and particles
│   ├── data/
│   │   └── portfolio.js     # Edit profile, skills, projects and experience
│   ├── App.jsx              # Page sections, navigation and GSAP animations
│   ├── main.jsx             # React entry point
│   └── styles.css           # Responsive visual system
├── index.html
└── package.json
```

## Personalize before publishing

- `src/data/portfolio.js`: replace the email placeholder and social profile URLs with your real links. Verify every project description and add project-specific screenshots or live URLs when ready.
- `src/components/Avatar.jsx`: the included character is procedurally built from Three.js geometry, so the project runs without downloading a model. For a more polished likeness, replace it with a custom rigged `.glb` character and load it with `useGLTF` from `@react-three/drei`.
- `src/styles.css`: adjust accent colors, typography and spacing to taste.
- Add your CV to `public/` and link it from the hero if you want a downloadable resume.

## Notes

- The 3D avatar is an original stylized placeholder, not a photorealistic likeness.
- SocialPulse AI links to the supplied project URL. Other project links are placeholders until you add live demos.
- The portfolio does not invent contact details, GitHub usernames or LinkedIn profile URLs.
- If the 3D scene is heavy on a mobile device, reduce the `Stars` count and `Sparkles` count in `src/components/Scene.jsx`.
