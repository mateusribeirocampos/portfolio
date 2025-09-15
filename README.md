# Mateus R Campos - Portfolio

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Vercel-brightgreen)](https://portfolio-jhgo4132v-mateusribeirocampos-projects.vercel.app/)
[![Next.js](https://img.shields.io/badge/Next.js-15.2.2-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.2-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.3.3-38bdf8)](https://tailwindcss.com/)

A modern, internationalized personal portfolio showcasing full-stack development skills, projects, and technical expertise. Built with Next.js, TypeScript, and Tailwind CSS with professional-grade architecture, responsive design, and full backend integration.

## 🚀 Live Demo

**Portfolio Website**: [https://portfolio-mateusribeirocampos-projects.vercel.app/](https://portfolio-mateusribeirocampos.vercel.app/)

## 👨‍💻 About Me

Computer Science student with robust background in Agronomy and Entomology, specializing in ecotoxicology and biological control. Transitioning into IT with focus on full-stack development and data analysis. Uniquely positioned to bridge scientific research with modern technology solutions.

**Current Focus**: Seeking internship opportunities in software development and data analysis (local and international)

## 🛠️ Technical Stack

### Frontend (This Project)

- **Framework**: Next.js 15.2.2 with App Router
- **Languages**: TypeScript, JavaScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **Data**: Integrated backend API with database
- **Architecture**: Full-stack application with SSR/SSG

### Backend (This Project)

- **Framework**: NestJS with TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT-based auth system
- **APIs**: REST endpoints for contact forms and data management
- **Security**: Rate limiting, CORS, helmet, bcryptjs encryption

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

- **English** (Default): Clean URLs without prefix (`/` instead of `/en`)
- **Portuguese (pt-BR)**: Localized content with `/pt-BR` prefix
- Dynamic language switching with middleware-based routing
- Comprehensive translation coverage across all pages
- Optimized routing without redundant language prefixes

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

- **Projects**: 3 featured projects with live demos and GitHub links
- **Blog**: Prepared infrastructure for technical blog posts
- **About**: Professional background and technical skills
- **Contact**: Fully functional contact form with backend integration
- **Database**: PostgreSQL database for storing contact submissions and analytics

## 🏗️ Architecture

```bash
portfolio/
├── frontend/                   # Next.js Frontend Application
│   ├── app/
│   │   ├── [lang]/            # Dynamic language routing (en, pt-BR)
│   │   │   ├── about/         # Professional background
│   │   │   ├── blog/          # Technical blog (expandable)
│   │   │   ├── contact/       # Contact information
│   │   │   ├── projects/      # Portfolio projects
│   │   │   └── layout.tsx     # Localized layouts
│   │   ├── api/               # API routes for backend integration
│   │   └── globals.css        # Global styles
│   ├── components/
│   │   ├── ui/                # shadcn/ui component library
│   │   ├── decoderLetter/     # Custom animations
│   │   ├── decoderText/       # Text effects
│   │   └── [other-components] # Navigation, footer, etc.
│   ├── data/
│   │   ├── projects.ts        # Project portfolio data
│   │   └── blog.ts            # Blog posts metadata
│   ├── public/
│   │   ├── locales/           # i18n translation files
│   │   │   ├── en/           # English translations
│   │   │   └── pt-BR/        # Portuguese translations
│   │   └── images/           # Project screenshots and assets
│   ├── middleware.ts          # Language routing logic
│   ├── i18n.ts               # i18next configuration
│   └── next.config.ts        # Next.js configuration + CSP headers
├── backend/                   # NestJS Backend API
│   ├── src/
│   │   ├── modules/
│   │   │   ├── contact/      # Contact form handling
│   │   │   ├── resume/       # Resume download analytics
│   │   │   └── health/       # Health check endpoints
│   │   ├── prisma/           # Database schema and migrations
│   │   └── main.ts           # NestJS application entry point
│   ├── prisma/
│   │   ├── schema.prisma     # Database schema
│   │   └── migrations/       # Database migrations
│   └── .env                  # Environment variables
└── docs/                     # Project documentation
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- PostgreSQL database

### Installation & Development

```bash
# Clone the repository
git clone https://github.com/mateusribeirocampos/portfolio.git
cd portfolio

# Frontend setup
cd frontend
npm install
npm run dev  # Runs on http://localhost:3000

# Backend setup (new terminal)
cd ../backend
npm install
cp .env.example .env  # Configure your database and environment variables
npx prisma migrate dev  # Setup database
npm run start:dev  # Runs on http://localhost:3001
```

### Production Build

```bash
# Frontend
cd frontend
npm run build
npm start

# Backend
cd ../backend
npm run build
npm run start:prod
```

## 📋 Available Scripts

### Frontend Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start frontend development server |
| `npm run build` | Build frontend for production |
| `npm start` | Start frontend production server |
| `npm run lint` | Run ESLint |
| `npm run postbuild` | Generate sitemap |

### Backend Scripts

| Command | Description |
|---------|-------------|
| `npm run start:dev` | Start backend development server |
| `npm run build` | Build backend for production |
| `npm run start:prod` | Start backend production server |
| `npm run create-admin` | Create admin user for management |

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

### 🔒 Security Implementation

- **XSS Protection**: Eliminated innerHTML and dangerouslySetInnerHTML vulnerabilities
  - `decoderText.tsx`: Replaced innerHTML with safe DOM manipulation using `createElement()` and `textContent`
  - `chart.tsx`: Added CSS injection validation with color format checking and input sanitization
- **Security Headers**: Comprehensive HTTP security headers implemented in `next.config.ts`
  - Content Security Policy (CSP) with strict resource loading rules
  - X-Frame-Options to prevent clickjacking attacks
  - X-Content-Type-Options to prevent MIME-type sniffing
  - Strict-Transport-Security for HTTPS enforcement
  - Permissions Policy to control browser APIs access
- **Code Quality**: ESLint enabled during builds to catch security issues early
- **Dependency Security**: All vulnerable packages removed (npm-check elimination)
- **Zero Vulnerabilities**: `npm audit` shows 0 security issues
- **Secure Practices**: Input validation, output encoding, and safe API usage throughout codebase

## 📞 Contact & Professional Links

- **Portfolio**: [Live Demo](https://portfolio-jhgo4132v-mateusribeirocampos-projects.vercel.app/)
- **GitHub**: [mateusribeirocampos](https://github.com/mateusribeirocampos)
- **LinkedIn**: [Mateus Ribeiro de Campos](https://www.linkedin.com/in/mateus-ribeiro-de-campos-6a135331/)
- **Email**: Available through portfolio contact form

## 🚀 Recent Updates & Enhancements

### ✅ Completed Features

- **Full Backend Integration**: NestJS backend with PostgreSQL database
- **Contact Form**: Fully functional with email notifications and database storage
- **Clean URL Structure**: Optimized internationalization without redundant `/en` prefix
- **API Integration**: Seamless frontend-backend communication
- **Content Security Policy**: Enhanced security headers and CSP configuration
- **Database Management**: Contact submissions and analytics tracking

### 🔮 Future Enhancements

- **Resume Download**: PDF generation with multilingual support
- **Blog System**: MDX-powered technical blog with backend integration
- **Advanced Analytics**: Enhanced dashboard with detailed visitor insights
- **Email Marketing**: Newsletter subscription and automated campaigns
- **Dynamic Content**: Headless CMS integration for projects/blog

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

**🎯 Seeking Opportunities**: Open to internship positions in software development and data analysis. Interested in bridging technology with scientific research and agricultural innovation.

### Last updated: July 2025
