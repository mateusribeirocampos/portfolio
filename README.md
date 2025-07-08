# Mateus R Campos - Portfolio

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Vercel-brightgreen)](https://portfolio-jhgo4132v-mateusribeirocampos-projects.vercel.app/)
[![Next.js](https://img.shields.io/badge/Next.js-15.2.2-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.2-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.3.3-38bdf8)](https://tailwindcss.com/)

A modern, internationalized personal portfolio showcasing full-stack development skills, projects, and technical expertise. Built with Next.js, TypeScript, and Tailwind CSS with professional-grade architecture and responsive design.

## 🚀 Live Demo

**Portfolio Website**: [https://portfolio-jhgo4132v-mateusribeirocampos-projects.vercel.app/](https://portfolio-jhgo4132v-mateusribeirocampos-projects.vercel.app/)

## 👨‍💻 About Me

Computer Science student with robust background in Agronomy and Entomology, specializing in ecotoxicology and biological control. Transitioning into IT with focus on full-stack development and data analysis. Uniquely positioned to bridge scientific research with modern technology solutions.

**Current Focus**: Seeking internship opportunities in software development and data analysis (local and international)

## 🛠️ Technical Stack

### Frontend (This Project)

- **Framework**: Next.js 15.2.2 with App Router
- **Languages**: TypeScript, JavaScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **Data**: Static TypeScript files (no database)
- **Architecture**: Static Site Generation (SSG)

### Programming Skills (Other Projects)

- **Web Backend**: Node.js, Express.js (used in Dragenda project)
- **Mobile**: React Native (used in Dragenda project)
- **Languages**: Python, C, C++, Java, Kotlin
- **Data Science**: Machine Learning, Deep Learning (Jupyter)

### Tools & Deployment

- **Version Control**: Git
- **Deployment**: Vercel (Static Hosting)
- **Package Manager**: npm
- **Development**: ESLint, Prettier

## ✨ Key Features

### 🌍 Internationalization (i18n)

- **English** (Default): Clean URLs without prefix
- **Portuguese (pt-BR)**: Localized content with `/pt-BR` prefix
- Dynamic language switching with middleware-based routing
- Comprehensive translation coverage across all pages

### 📱 Responsive Design

- Modern, mobile-first approach
- Dark/Light theme support
- Accessibility-focused components
- Professional UI with shadcn/ui library

### 🎨 Interactive Elements

- Custom decoder text animations
- Matrix rain background effects
- Smooth transitions and hover states
- Professional card-based layouts

### 📊 Content Management

- **Projects**: 3 featured projects with live demos and GitHub links (static data)
- **Blog**: Prepared infrastructure for technical blog posts (mock data)
- **About**: Professional background and technical skills
- **Contact**: Social media integration and contact form (frontend only)

## 🏗️ Architecture

```bash
portfolio/
├── app/
│   ├── [lang]/                 # Dynamic language routing (en, pt-BR)
│   │   ├── about/             # Professional background
│   │   ├── blog/              # Technical blog (expandable)
│   │   ├── contact/           # Contact information
│   │   ├── projects/          # Portfolio projects
│   │   └── layout.tsx         # Localized layouts
│   └── globals.css            # Global styles
├── components/
│   ├── ui/                    # shadcn/ui component library
│   ├── decoderLetter/         # Custom animations
│   ├── decoderText/           # Text effects
│   └── [other-components]     # Navigation, footer, etc.
├── data/
│   ├── projects.ts            # Project portfolio data
│   └── blog.ts                # Blog posts metadata
├── public/
│   ├── locales/               # i18n translation files
│   │   ├── en/               # English translations
│   │   └── pt-BR/            # Portuguese translations
│   └── images/               # Project screenshots and assets
├── middleware.ts              # Language routing logic
├── i18n.ts                    # i18next configuration
└── next.config.ts             # Next.js configuration
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation & Development

```bash
# Clone the repository
git clone https://github.com/mateusribeirocampos/portfolio.git
cd portfolio

# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:3000 in your browser
```

### Production Build

```bash
npm run build
npm start
```

## 📋 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run postbuild` | Generate sitemap |

## 🎯 Featured Projects

### 1. **Dragenda** - Digital Healthcare Platform

- **Tech**: React Native, React.js, Bootstrap, Node.js, Express, SQLite
- **Description**: Revolutionary healthcare delivery platform
- **Links**: [GitHub](https://github.com/mateusribeirocampos/dragenda) | [Live Demo](https://dragenda.vercel.app)

### 2. **Santa Rita Church Website**

- **Tech**: React.js, TypeScript, Tailwind CSS, Vite
- **Description**: Modern church website with responsive design
- **Links**: [GitHub](https://github.com/mateusribeirocampos/santarita) | [Live Demo](https://igrejasantaritaourofino.vercel.app/)

### 3. **DIO - Machine Learning Project**

- **Tech**: Python, Jupyter Notebook, Machine Learning, Deep Learning
- **Description**: Image recommendation system using ML
- **Links**: [GitHub](https://github.com/mateusribeirocampos/diollm) | [Colab Demo](https://colab.research.google.com/github/mateusribeirocampos/diollm/blob/main/Notebooks/Project_Draft/Sistema_de_recomendação_por_imagens_.ipynb)

## 🔧 Technical Highlights

### Performance & SEO

- **Lighthouse Score**: 90+ across all metrics
- **Next.js optimizations**: Image optimization, lazy loading
- **SEO-friendly**: Dynamic meta tags, sitemap generation
- **Accessibility**: WCAG 2.1 AA compliant

### Development Best Practices

- **Type Safety**: Full TypeScript implementation
- **Code Quality**: ESLint, Prettier configuration
- **Git Workflow**: Conventional commits
- **Responsive Design**: Mobile-first approach

## 📞 Contact & Professional Links

- **Portfolio**: [Live Demo](https://portfolio-jhgo4132v-mateusribeirocampos-projects.vercel.app/)
- **GitHub**: [mateusribeirocampos](https://github.com/mateusribeirocampos)
- **LinkedIn**: [Mateus Ribeiro de Campos](https://www.linkedin.com/in/mateus-ribeiro-de-campos-6a135331/)
- **Email**: Available through portfolio contact form

## 🚀 Future Enhancements

- **Resume Download**: PDF generation with multilingual support
- **Blog System**: MDX-powered technical blog or external integration
- **Contact Form**: Backend integration with email service (EmailJS/Formspree)
- **Advanced Analytics**: Google Analytics 4 integration
- **Dynamic Content**: Headless CMS integration for projects/blog

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

**🎯 Seeking Opportunities**: Open to internship positions in software development and data analysis. Interested in bridging technology with scientific research and agricultural innovation.

### Last updated: January 2025
