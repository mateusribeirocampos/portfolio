# Portfolio

A modern, internationalized personal portfolio built with Next.js, TypeScript, Tailwind CSS, and next-i18next. Showcases projects, blog posts, and contact information with a focus on accessibility, responsiveness, and clean code.

## Demo

- [Live Site on Vercel](https://portfolio-mateusribeirocampos.vercel.app/en)

## Features

- **Next.js App Router** with TypeScript
- **Internationalization (i18n)**: English and Brazilian Portuguese (next-i18next)
- **Tailwind CSS** for utility-first styling
- **Component-based architecture** (UI, decoder animations, etc.)
- **MDX-powered blog** (coming soon)
- **Projects, About, and Contact pages**
- **Custom hooks** and utility functions
- **Responsive and accessible design**
- **Local JSON data** for projects and blog

## Project Structure

```bash
/portfolio
├── app/                # Next.js app directory (routing, layouts, pages)
│   └── [lang]/         # Dynamic language routes (en, pt-BR)
│       ├── blog/       # Blog pages (WIP)
│       ├── projects/   # Projects pages
│       ├── contact/    # Contact page
│       └── about/      # About page
├── components/         # Reusable UI components
│   ├── decoderLetter/  # Decoder animation for navigation
│   ├── decoderText/    # Decoder animation for home
│   └── ui/             # UI library components
├── hooks/              # Custom React hooks
├── data/               # Local TypeScript data (projects, blog)
├── public/             # Static assets and i18n JSONs
│   └── locales/        # Translation files (en, pt-BR)
├── styles/             # Tailwind CSS config and global styles
├── lib/                # Utility functions
├── @types/             # Custom TypeScript type definitions
├── next.config.ts      # Next.js configuration
├── tailwind.config.ts  # Tailwind CSS configuration
├── tsconfig.json       # TypeScript configuration
├── .eslintrc.json      # ESLint configuration
└── README.md           # Project documentation
```

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/mateusribeirocampos/portfolio.git
cd portfolio

# Install dependencies
npm install
# or
yarn install
```

### Running Locally

```bash
npm run dev
# or
yarn dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
npm run build
npm start
```

## Scripts

- `dev` – Start development server
- `build` – Build for production
- `start` – Start production server
- `lint` – Run ESLint

## Internationalization (i18n)

- All content is available in English and Brazilian Portuguese.
- Translation files are located in `public/locales/en` and `public/locales/pt-BR`.
- Language is selected via dynamic route: `/en`, `/pt-BR`.

## Contributing

Contributions are welcome! Please follow these guidelines:

- Use TypeScript and follow the existing code style (see `.eslintrc.json` and `tailwind.config.ts`).
- Make small, focused pull requests with clear descriptions.
- Add or update translation files for new features.
- Write meaningful commit messages (Conventional Commits).
- Ensure all code is accessible and responsive.

## Useful Links

- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [React Documentation](https://reactjs.org/docs/getting-started.html)

## License

This project is open source and available under the [MIT License](LICENSE).

## Contact

[Mateus R Campos](https://github.com/mateusribeirocampos)

For questions or suggestions, feel free to open an issue or contact me via the portfolio site.
