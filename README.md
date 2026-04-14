# 🎯 Gláucio Filho's Portfolio

A modern and interactive professional portfolio built with **React 19**, **Vite**, and **Tailwind CSS**. The site showcases projects, experience, technical skills, and analytics with support for multiple languages and Google Analytics integration.

![Status](https://img.shields.io/badge/Status-Active-brightgreen)
![React Version](https://img.shields.io/badge/React-19.2.0-blue)
![Vite Version](https://img.shields.io/badge/Vite-7.2.4-purple)
![License](https://img.shields.io/badge/License-MIT-green)

---

## 📋 Table of Contents

- [Overview](#overview)
- [View Online](#view-online)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Available Scripts](#available-scripts)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [Architecture](#architecture)
- [Main Components](#main-components)
- [Functionalities](#functionalities)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [FAQ](#faq)
- [Changelog](#-changelog)
- [License](#license)
- [Portuguese Version](README_pt.md)

---

## 🎨 Overview

This portfolio is a modern web application that features:

- **Interactive Homepage**: Landing page with professional presentation and highlighted sections
- **Project Gallery**: Showcase of projects with technology filters
- **Code Viewer**: VS Code Viewer integration to display project files
- **Analytics Dashboard**: Charts, statistics, and real-time performance metrics
- **Online Resume**: Professional experience, education, and technical skills
- **Multi-language Support**: Interface available in Portuguese and English
- **Cookie Consent**: Cookie management with LGPD/GDPR compliance
- **Analytics Tracking**: Google Analytics integrated to track visitors

---

## 🌐 View Online

[Visit the live portfolio](https://glauciofilho.com)

> 📖 **Version History**: See the [CHANGELOG.md](CHANGELOG.md) file for details of all versions and changes

---

## ✨ Features

### 🏠 Home
- Hero section with developer profile
- Main skills presentation
- Display of 3 latest projects
- Social media links (GitHub, LinkedIn, email)
- Call-to-action for contact

### 📁 Projects
- **Project List**: Complete gallery of completed work
- **Advanced Filters**: Filter by technology, date, type
- **Sorting**: Sort by date, popularity, name
- **View Toggle**: Grid or list view
- **File Viewer**: Tree view to explore project structure
- **VS Code Integration**: Display project files with syntax highlighting

### 📊 Analytics
- **Visitor Map**: Geographic visualization of access by country
- **Timeline Chart**: Visitor history over time
- **Project Ranking**: Most viewed projects
- **Stack Statistics**: Technologies most used in projects
- **Stat Cards**: Key metrics (total visitors, countries, etc.)

### 📄 Resume
- Professional Experience section
- Education and Certifications
- Technical and soft skills
- PDF CV download

### 🔧 Utilities
- **Language Toggle**: Switch between PT/EN
- **Scroll to Top**: Floating button to return to top
- **Cookie Banner**: LGPD/GDPR consent
- **Responsive Mode**: Mobile-first fully responsive design

---

## 🛠️ Tech Stack

### Frontend
- **React 19.2.0** - UI library with modern hooks
- **Vite 7.2.4** - Ultra-fast build tool with HMR
- **React Router DOM 7.11.0** - Page routing
- **Tailwind CSS 3.4.17** - Utility-first CSS framework

### Analytics & Visualization
- **Google Analytics 4** (react-ga4) - User tracking
- **Recharts 3.6.0** - React charts library
- **React Simple Maps 1.2.1** - Geographic visualization
- **Lucide React 0.562.0** - SVG icons

### Development
- **ESLint 9.39.1** - Code linting
- **PostCSS 8.5.6** - CSS transformations
- **Autoprefixer 10.4.23** - Automatic CSS prefixes
- **TypeScript** - In transition (ViewToggle.tsx)

### Infrastructure
- **Docker** - Application containerization

---

## 📦 Prerequisites

Before you begin, make sure you have installed:

- **Node.js** >= 16.0.0 (recommended 18+)
- **npm** >= 8.0.0 or **yarn** >= 1.22.0
- **Git** for version control

```bash
# Check installed versions
node --version
npm --version
```

---

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/glauciofilho/portfolio-frontend.git
cd portfolio-frontend/frontend
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the project root:

```env
VITE_API_URL=http://localhost:8000
VITE_GA_ID=G-XXXXXXXXXX
```

### 4. Start the Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

---

## 📜 Available Scripts

### Development

```bash
# Start development server with Hot Module Replacement (HMR)
npm run dev
```

### Build for Production

```bash
# Create optimized production build
npm run build

# Preview local build (before deploying)
npm run preview
```

### Linting

```bash
# Check for code issues with ESLint
npm run lint

# Auto-fix issues if possible
npm run lint -- --fix
```

---

## 🔐 Environment Variables

The application uses the following environment variables:

| Variable | Type | Description | Example |
|---|---|---|---|
| `VITE_API_URL` | string | Backend API base URL | `http://localhost:8000` |
| `VITE_GA_ID` | string | Google Analytics 4 ID | `G-XXXXXXXXXX` |

### Configuration for Different Environments

**.env.development** (local development)
```env
VITE_API_URL=http://localhost:8000
VITE_GA_ID=G-DEV_ID
```

**.env.production** (production)
```env
VITE_API_URL=https://api.glauciofilho.com
VITE_GA_ID=G-PROD_ID
```

---

## 📁 Project Structure

```
frontend/
├── public/                          # Static files
│   └── img/                         # Images (profile, badges, etc.)
│
├── src/
│   ├── App.jsx                      # Application root component
│   ├── main.jsx                     # Entry point
│   ├── index.css                    # Global styles
│   │
│   ├── analytics/                   # Analytics configuration
│   │   ├── AnalyticsProvider.jsx    # GA4 context provider
│   │   ├── consent.js               # LGPD consent management
│   │   └── ga.js                    # GA4 tracking functions
│   │
│   ├── components/                  # Reusable components
│   │   ├── CoockeBanner.jsx         # Cookie consent banner
│   │   ├── FileTree.jsx             # File structure viewer
│   │   ├── Footer.jsx               # Application footer
│   │   ├── Header.jsx               # Header/Navigation
│   │   ├── LanguageSwitch.jsx       # Language selector
│   │   ├── ProjectCard.jsx          # Project card
│   │   ├── ScrollToTop.jsx          # Scroll to top button
│   │   ├── SortSelect.jsx           # Sort selector
│   │   ├── StackFilter.jsx          # Technology filter
│   │   ├── ViewToggle.tsx           # Grid/list toggle (TypeScript)
│   │   ├── VSCodeViewer.jsx         # VS Code viewer
│   │   │
│   │   └── analytics/               # Dashboard components
│   │       ├── CountriesMap.jsx     # Visitor countries map
│   │       ├── ProjectsTimelineChart.jsx  # Timeline chart
│   │       ├── Ranking.jsx          # Project ranking
│   │       ├── StackUsageChart.jsx  # Technology usage chart
│   │       └── StatCard.jsx         # Stat card
│   │
│   ├── context/                     # React Context API
│   │   └── LanguageContext.jsx      # Language management context
│   │
│   ├── pages/                       # Application pages
│   │   ├── Home.jsx                 # Home page
│   │   ├── Projects.jsx             # Projects page
│   │   ├── Analytics.jsx            # Analytics dashboard
│   │   ├── Resume.jsx               # Resume page
│   │   ├── Contact.jsx              # Contact page
│   │   ├── Privacy.jsx              # Privacy page
│   │   ├── Cookies.jsx              # Cookie policy page
│   │   └── Terms.jsx                # Terms of service page
│   │
│   ├── services/                    # Services and API
│   │   └── api.js                   # Backend API integration
│   │
│   └── i18n/                        # Internationalization
│       └── translations.js          # Translation dictionary (PT/EN)
│
├── Dockerfile                       # Docker configuration
├── vite.config.js                   # Vite configuration
├── tailwind.config.js               # Tailwind CSS configuration
├── postcss.config.js                # PostCSS configuration
├── eslint.config.js                 # ESLint configuration
├── package.json                     # Dependencies and scripts
├── index.html                       # Main HTML
└── README.md                        # This file
```

---

## 🏗️ Architecture

### Data Flow

```
Browser
    ↓
App.jsx (routing with React Router)
    ↓
┌─────────────────────────────────────────────┐
│ LanguageContext (manages language)          │
│ AnalyticsProvider (Google Analytics 4)      │
└─────────────────────────────────────────────┘
    ↓
Pages (Home, Projects, Analytics, etc)
    ├→ Components (Header, Footer, etc)
    └→ useLanguage() & tracking
         ↓
    API Service (backend)
         ↓
    Backend API (Django/FastAPI)
```

### Contexts

**LanguageContext**: Manages global language state (PT/EN)
```javascript
const { lang, t } = useLanguage();
// lang: 'pt' or 'en'
// t: function to translate keys
```

**Analytics**: Page views and event tracking
```javascript
trackPageView('/projects');
trackEvent('filter_applied', { stack: 'React' });
```

---

## 🧩 Main Components

### Layout & Navigation

| Component | Description | Props |
|---|---|---|
| **Header** | Main navigation | - |
| **Footer** | Footer with links | - |
| **LanguageSwitch** | Language selector | - |
| **ScrollToTop** | Floating top button | - |

### Projects

| Component | Description | Props |
|---|---|---|
| **ProjectCard** | Individual project card | `project`, `onClick` |
| **StackFilter** | Technology filter | `stacks`, `selected`, `onChange` |
| **SortSelect** | Sort selector | `value`, `onChange` |
| **ViewToggle** | Grid/list toggle | `isGrid`, `onChange` |
| **FileTree** | File structure viewer | `files`, `projectId` |
| **VSCodeViewer** | Code display with syntax | `code`, `language` |

### Analytics

| Component | Description | Props |
|---|---|---|
| **StatCard** | Metric card | `icon`, `label`, `value`, `trend` |
| **CountriesMap** | Choropleth map | `data` |
| **ProjectsTimelineChart** | Line chart | `data` |
| **Ranking** | Ranking table | `data` |
| **StackUsageChart** | Bar chart | `data` |

### Utilities

| Component | Description | Props |
|---|---|---|
| **CoockeBanner** | Consent banner | - |

---

## 📄 Pages Documentation

The application consists of 8 main pages, each with specific functionality:

### 🏠 Home Page
**Route**: `/`  
**File**: `src/pages/Home.jsx`

**Features**:
- Hero section with developer profile and Microsoft certified badge
- Professional title and about summary
- Experience highlights (4+ years, SQL & Python expert, BI & Automation)
- Social media links (GitHub, LinkedIn, Email, WhatsApp)
- Featured projects section (latest 3 projects)
- Call-to-action buttons to projects page
- Fully responsive design

**Key Components Used**:
- ProjectCard
- Lucide icons (CheckCircle2, Github, Linkedin, Mail, MessageCircle)
- Language context for translations

---

### 📁 Projects Page
**Route**: `/projects`  
**File**: `src/pages/Projects.jsx`

**Features**:
- Complete project gallery
- Advanced filtering by technology stack
- Sorting options (date, popularity, name, A-Z)
- View toggle (grid/list modes)
- Project cards with image, title, description, and tags
- Project details modal or expanded view
- Project search functionality
- Pagination support

**Key Components Used**:
- ProjectCard
- StackFilter
- SortSelect
- ViewToggle
- FileTree (for project structure)

**Data Source**:
- Fetches from `GET /api/projects/?lang=en`
- Supports language parameter for multilingual content

---

### 📊 Analytics Page
**Route**: `/analytics`  
**File**: `src/pages/Analytics.jsx`

**Features**:
- Visitor statistics dashboard
- Geographic visitor map (by country)
- Timeline chart showing visitor history
- Project popularity ranking
- Technology stack usage statistics
- Statistical cards with key metrics
- Real-time data visualization
- Responsive chart layouts

**Key Components Used**:
- StatCard
- CountriesMap (React Simple Maps)
- ProjectsTimelineChart (Recharts)
- Ranking
- StackUsageChart (Recharts)

**Data Source**:
- Fetches from `GET /api/analytics/?lang=en`
- Requires Google Analytics 4 integration
- Respects user consent (LGPD/GDPR)

---

### 📄 Resume Page
**Route**: `/resume`  
**File**: `src/pages/Resume.jsx`

**Features**:
- Professional experience section
- Educational background and certifications
- Technical skills (languages, frameworks, tools)
- Soft skills presentation
- PDF download option
- Timeline-based experience display
- Badge display for certifications
- Contact information

**Sections**:
- Professional Summary
- Work Experience
- Education
- Certifications
- Technical Skills
- Soft Skills
- PDF Export button

**Data Source**:
- Fetches from `GET /api/resume/?lang=en`
- Multilingual content support

---

### ✉️ Contact Page
**Route**: `/contact`  
**File**: `src/pages/Contact.jsx`

**Features**:
- Contact form (name, email, subject, message)
- Form validation
- Submit functionality
- Social media links
- Email contact information
- WhatsApp integration link
- LinkedIn profile link
- GitHub profile link
- Contact success/error messages

**Key Components**:
- Form inputs with validation
- Submit button
- Social links
- Loading states

---

### 🔐 Privacy Policy Page
**Route**: `/privacy`  
**File**: `src/pages/Privacy.jsx`

**Features**:
- Comprehensive privacy policy document
- LGPD (Lei Geral de Proteção de Dados - Brazil) compliance
- GDPR (General Data Protection Regulation) compliance
- Data collection explanation
- User rights information
- Data usage policies
- Contact information for privacy concerns
- Last updated date

**Sections**:
- Introduction
- Information We Collect
- How We Use Your Data
- Data Protection
- User Rights
- LGPD Compliance
- GDPR Compliance
- Contact & Complaints

---

### 🍪 Cookies Policy Page
**Route**: `/cookies`  
**File**: `src/pages/Cookies.jsx`

**Features**:
- Cookie policy documentation
- Cookie consent explanation
- Types of cookies used (analytics, functional, etc.)
- Third-party services using cookies
- User opt-out options
- Cookie management settings
- Data privacy related to cookies

**Cookie Types Documented**:
- Essential cookies (site functionality)
- Analytics cookies (Google Analytics 4)
- Performance cookies
- Functional cookies

**Related Component**:
- CoockeBanner component for inline consent

---

### ⚖️ Terms of Service Page
**Route**: `/terms`  
**File**: `src/pages/Terms.jsx`

**Features**:
- Complete terms and conditions document
- User rights and responsibilities
- Intellectual property information
- Limitation of liability
- Disclaimer of warranties
- Service availability information
- Content policy
- Modification rights

**Sections**:
- Acceptance of Terms
- License Grant
- User Responsibilities
- Intellectual Property Rights
- Limitation of Liability
- Disclaimers
- Changes to Terms
- Contact Information

---

### 404 Not Found Page
**Route**: `*` (any unmatched route)  
**File**: `src/pages/NotFound.jsx`

**Features**:
- 404 error page for undefined routes
- Friendly error message
- Navigation links back to main pages
- Home page link
- Projects page link
- Contact page link
- Animated/styled error display
- Helpful suggestions

---

## 🗺️ Navigation Structure

```
/                           ← Home (Default)
├── /projects               ← Projects Gallery
├── /analytics              ← Analytics Dashboard
├── /resume                 ← Resume / CV
├── /contact                ← Contact Form
├── /privacy                ← Privacy Policy
├── /cookies                ← Cookie Policy
├── /terms                  ← Terms of Service
└── /* (404)                ← Not Found Page
```

---

## 🔄 Routing Implementation

The application uses **React Router v7** for client-side routing:

```jsx
// Example from App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

<Router>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/projects" element={<Projects />} />
    <Route path="/analytics" element={<Analytics />} />
    <Route path="/resume" element={<Resume />} />
    <Route path="/contact" element={<Contact />} />
    <Route path="/privacy" element={<Privacy />} />
    <Route path="/cookies" element={<Cookies />} />
    <Route path="/terms" element={<Terms />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
</Router>
```

---

## 🧭 Navigation Menu

The Header component (`src/components/Header.jsx`) displays a navigation menu with links to:
- Home
- Projects
- Analytics
- Resume
- Contact
- Language Toggle (PT/EN)

Mobile navigation includes a hamburger menu for smaller screens.

---

## 🌍 Internationalization (i18n)

### Supported Languages
- 🇵🇧 Portuguese (PT)
- 🇺🇸 English (EN) - **Default Language**

> **Note**: The site's default language is **English (EN)**. Users can switch to Portuguese using the language toggle in the header.

### Usage

```jsx
import { useLanguage } from '../context/LanguageContext';

function MyComponent() {
  const { lang, t } = useLanguage();

  return <h1>{t('home')}</h1>;
  // If lang='pt': "Início"
  // If lang='en': "Home"
}
```

### Adding New Translation

Edit `src/i18n/translations.js`:

```javascript
export const translations = {
  pt: {
    myKey: "Valor em Português",
    // ...
  },
  en: {
    myKey: "English Value",
    // ...
  }
};
```

---

## 📊 Backend API Integration

The application connects with a backend API for:

- **Projects**: `GET /api/projects/?lang=pt`
- **Specific Project**: `GET /api/projects/{id}/?lang=pt`
- **Files**: `GET /api/files/{projectId}/{fileId}/?lang=pt`
- **Resume**: `GET /api/resume/?lang=pt`
- **Analytics**: `GET /api/analytics/?lang=pt`

### Request Examples

```javascript
import { getProjects, getOneProject } from '../services/api';

// Get all projects
const projects = await getProjects('pt');

// Get specific project
const project = await getOneProject(1, 'pt');
```

---

## 📈 Google Analytics 4 Integration

### Automatic Tracking
- **Page Views**: Automatically tracked on each navigation
- **Consent**: Respects prior user approval (LGPD/GDPR)

### Manual Tracking

```javascript
import { trackEvent } from '../analytics/ga';

// Track custom event
trackEvent('project_viewed', { projectId: 123 });
trackEvent('filter_applied', { stack: 'React', count: 5 });
```

### LGPD/GDPR Compliance

```javascript
import { hasConsent, requestConsent } from '../analytics/consent';

if (hasConsent()) {
  // Analytics is enabled
}

// Banner will request consent before tracking
```

---

## 🐳 Docker & Containerization

### Build Docker Image

```bash
docker build -t portfolio-frontend .
```

### Run Container

```bash
docker run -p 3000:80 portfolio-frontend
```

### Docker Compose (if available)

```bash
docker-compose up -d
```

---

## 🚀 Deployment

### Deploy to Vercel

1. Connect your GitHub repository
2. Set environment variables
3. Configure build: `npm run build`
4. Output directory: `dist`

### Deploy to Netlify

```bash
npm run build
# Deploy dist/ folder
```

### Deploy to Own Server

```bash
# Build for production
npm run build

# Serve files (any web server)
# nginx, Apache, or Node.js server serving dist/
```

### Deployment Checklist

- [ ] Environment variables configured
- [ ] Complete build without errors
- [ ] Google Analytics ID configured
- [ ] Backend API URL pointing to production
- [ ] SSL/HTTPS enabled
- [ ] Cookie consent working
- [ ] Favicons and meta tags correct

---

## 📱 Responsiveness

The application is **mobile-first** and fully responsive:

- 📱 **Mobile** (< 640px): Vertical stack, simplified navigation
- 📱 **Tablet** (640px - 1024px): Adapted layout
- 🖥️ **Desktop** (> 1024px): Full layout with all features

---

## 🎨 Theme Customization

The project uses **Tailwind CSS** with custom colors (cyan/sky).

Edit `tailwind.config.js` to change color palette:

```javascript
theme: {
  extend: {
    colors: {
      cyan: colors.cyan,
      sky: colors.sky,
    }
  }
}
```

---

## 🐛 Troubleshooting

### Issue: API integration not working

**Solution**: Check:
1. API URL in `VITE_API_URL`
2. Backend running on server
3. CORS configured on backend

```bash
# Test connection
curl http://localhost:8000/api/projects/
```

### Issue: Analytics not tracking

**Solution**: 
1. Google Analytics ID (`VITE_GA_ID`) correct
2. User consent accepted
3. Check if events appear in GA4

### Issue: Build error

**Solution**:
```bash
# Clear cache
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Issue: Language not changing

**Solution**:
1. Check LanguageSwitch is correct
2. Clear localStorage: `localStorage.clear()`
3. Check console for errors

---

## 📋 Development Checklist

- [ ] Node.js 18+ installed
- [ ] Dependencies installed (`npm install`)
- [ ] `.env.local` configured
- [ ] Dev server running (`npm run dev`)
- [ ] Backend API accessible
- [ ] ESLint passing (`npm run lint`)
- [ ] No console errors
- [ ] Responsiveness tested on mobile/tablet/desktop

---

## 🤝 Contributing

Contributions are welcome!

### Contributing Process

1. **Fork** the repository
2. **Create a branch** for your feature: `git checkout -b feature/new-feature`
3. **Commit** your changes: `git commit -m 'Add new feature'`
4. **Push** to the branch: `git push origin feature/new-feature`
5. **Open a Pull Request**

### Code Standards

- Use **ESLint** to check code
- Components in **PascalCase**: `MyComponent.jsx`
- Hooks in **camelCase**: `useMyHook()`
- Styles with **Tailwind CSS**
- Organized imports (React, libs, components, utils)

### Branches

- `main` - Production
- `develop` - Development
- `feature/*` - New features
- `fix/*` - Bug fixes

---

## 📚 Useful Resources

- [React 19 Documentation](https://react.dev)
- [Vite Documentation](https://vite.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com)
- [React Router Docs](https://reactrouter.com)
- [Google Analytics 4](https://developers.google.com/analytics/devguides/collection/ga4)
- [Recharts Docs](https://recharts.org)

---

## ❓ FAQ

**Q: How do I add a new project?**
> A: Projects come from the backend API. Add via backend admin panel and it will appear automatically in the frontend.

**Q: Can I change the theme colors?**
> A: Yes! Edit `tailwind.config.js` to customize the colors.

**Q: How do I add a new page?**
> A: Create a file in `src/pages/`, configure route in `App.jsx`, add translation in `translations.js`.

**Q: What's the deployment process?**
> A: Run `npm run build`, deploy the `dist/` folder to any host (Vercel, Netlify, your own server, etc).

**Q: Does the site work without JavaScript?**
> A: No, it's a SPA (Single Page Application) that requires JavaScript.

**Q: How do I test locally before deploying?**
> A: Run `npm run build` then `npm run preview` to view the final build.

---

## 📞 Contact & Support

- **GitHub**: [glauciofilho](https://github.com/glauciofilho)
- **LinkedIn**: [Gláucio Filho](https://linkedin.com/in/glauciofilho)
- **Email**: [me@glauciofilho.com](mailto:me@glauciofilho.com)
- **Website**: [glauciofilho.com](https://glauciofilho.com)

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2024 Gláucio Filho

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

---

## 📝 Changelog

### [1.0.1] - 2026-04-14

#### ✨ Improvements
- README.md completely redesigned and detailed
- Added Changelog section to track versions
- Improved component documentation with tables
- Added complete deployment checklist

#### 📚 Documentation
- Expanded troubleshooting section with more scenarios
- Added more API integration examples
- Improved code examples with comments

#### 🔧 Technical
- Preparation for semantic versioning
- Structure ready for future releases

### [1.0.0] - 2026-04-13

#### 🎉 Initial Release
- Complete professional portfolio with React 19
- Multi-language support (PT/EN)
- Analytics dashboard with charts
- Google Analytics 4 integration
- LGPD/GDPR compliance
- Mobile-first responsive design
- Reusable components

---

## 🎉 Credits

- [React](https://react.dev) - Amazing library
- [Vite](https://vite.dev) - Super fast build tool
- [Tailwind CSS](https://tailwindcss.com) - Amazing styles
- Dev community for feedback and contributions

---

**Last update**: April 2026  
**Version**: 1.0.1  
**Status**: ✅ In Production

---

**⭐ If this project was helpful, please consider giving it a star on GitHub!**
