# 🎯 Portfólio de Gláucio Filho

Um portfólio profissional moderno e interativo desenvolvido com **React 19**, **Vite**, e **Tailwind CSS**. O site showcaseia projetos, experiência, habilidades técnicas e análises com suporte a múltiplos idiomas e integração com Google Analytics.

![Status](https://img.shields.io/badge/Status-Active-brightgreen)
![React Version](https://img.shields.io/badge/React-19.2.0-blue)
![Vite Version](https://img.shields.io/badge/Vite-7.2.4-purple)
![License](https://img.shields.io/badge/License-MIT-green)

---

## 📋 Índice

- [Visão Geral](#visão-geral)
- [Verificar Online](#verificar-online)
- [Características](#características)
- [Stack Tecnológico](#stack-tecnológico)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Scripts Disponíveis](#scripts-disponíveis)
- [Variáveis de Ambiente](#variáveis-de-ambiente)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Arquitetura](#arquitetura)
- [Componentes Principais](#componentes-principais)
- [Funcionalidades](#funcionalidades)
- [Deployment](#deployment)
- [Contribuindo](#contribuindo)
- [Perguntas Frequentes](#perguntas-frequentes)
- [Licença](#licença)

---

## 🎨 Visão Geral

Este portfólio é uma aplicação web moderna que apresenta:

- **Homepage Interativa**: Landing page com apresentação profissional e seções destacadas
- **Galeria de Projetos**: Showcase de projetos com filtros por tecnologia
- **Visualizador de Código**: Integração com VS Code Viewer para exibir arquivos de projeto
- **Dashboard de Análises**: Gráficos, estatísticas e métricas de desempenho em tempo real
- **Currículo Online**: Experiência profissional, educação e habilidades técnicas
- **Suporte Multilíngue**: Interface disponível em Português e Inglês
- **Consentimento de Cookies**: Gerenciamento de cookies com conformidade LGPD/GDPR
- **Rastreamento de Analytics**: Google Analytics integrado para acompanhar visitantes

---

## 🌐 Verificar Online

[Acesse o portfólio ao vivo](https://glauciofilho.com)

---

## ✨ Características

### 🏠 Home
- Hero section com perfil do desenvolvedor
- Apresentação de habilidades principais
- Exibição dos 3 últimos projetos
- Links para redes sociais (GitHub, LinkedIn, email)
- Call-to-action para contato

### 📁 Projetos
- **Lista de Projetos**: Galeria completa de trabalhos realizados
- **Filtros Avançados**: Filtrar por tecnologia, data, tipo
- **Ordenação**: Organizar por data, popularidade, nome
- **Alternância de Visualização**: Grid ou lista
- **Visualizador de Arquivos**: Tree view para explorar estrutura do projeto
- **Integração VS Code**: Exibir arquivos do projeto com syntax highlighting

### 📊 Análises
- **Mapa de Visitantes**: Visualização geográfica de acessos por país
- **Gráfico de Timeline**: Histórico de visitantes ao longo do tempo
- **Ranking de Projetos**: Projetos mais visualizados
- **Estatísticas de Stack**: Tecnologias mais utilizadas nos projetos
- **Cartões Estatísticos**: Métricas principais (total de visitantes, países, etc.)

### 📄 Currículo
- Seção de Experiência Profissional
- Educação e Certificações
- Skillset técnico e soft skills
- Download do CV em PDF

### 🔧 Utilitários
- **Alternador de Idioma**: Switch entre PT/EN
- **Scroll para o Topo**: Botão flutuante para voltar ao topo
- **Banner de Cookies**: Consentimento com LGPD/GDPR
- **Modo Responsivo**: Design mobile-first totalmente responsivo

---

## 🛠️ Stack Tecnológico

### Frontend
- **React 19.2.0** - Biblioteca de UI com hooks modernos
- **Vite 7.2.4** - Build tool ultrarrápido com HMR
- **React Router DOM 7.11.0** - Roteamento de páginas
- **Tailwind CSS 3.4.17** - Utility-first CSS framework

### Analytics & Visualização
- **Google Analytics 4** (react-ga4) - Rastreamento de usuários
- **Recharts 3.6.0** - Biblioteca de gráficos React
- **React Simple Maps 1.2.1** - Visualização de mapas geográficos
- **Lucide React 0.562.0** - Ícones em SVG

### Desenvolvimento
- **ESLint 9.39.1** - Linting de código
- **PostCSS 8.5.6** - Transformações CSS
- **Autoprefixer 10.4.23** - Prefixos CSS automáticos
- **TypeScript** - Em transição (ViewToggle.tsx)

### Infraestrutura
- **Docker** - Containerização da aplicação

---

## 📦 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** >= 16.0.0 (recomendado 18+)
- **npm** >= 8.0.0 ou **yarn** >= 1.22.0
- **Git** para controle de versão

```bash
# Verificar versões instaladas
node --version
npm --version
```

---

## 🚀 Instalação

### 1. Clonar o Repositório

```bash
git clone https://github.com/glauciofilho/portfolio-frontend.git
cd portfolio-frontend/frontend
```

### 2. Instalar Dependências

```bash
npm install
# ou
yarn install
```

### 3. Configurar Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
VITE_API_URL=http://localhost:8000
VITE_GA_ID=G-XXXXXXXXXX
```

### 4. Iniciar o Servidor de Desenvolvimento

```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`

---

## 📜 Scripts Disponíveis

### Desenvolvimento

```bash
# Inicia servidor de desenvolvimento com Hot Module Replacement (HMR)
npm run dev
```

### Build para Produção

```bash
# Cria build otimizado para produção
npm run build

# Visualizar build local (antes de fazer deploy)
npm run preview
```

### Linting

```bash
# Verifica problemas de código com ESLint
npm run lint

# Corrigir problemas automaticamente (se possível)
npm run lint -- --fix
```

---

## 🔐 Variáveis de Ambiente

A aplicação utiliza as seguintes variáveis de ambiente:

| Variável | Tipo | Descrição | Exemplo |
|---|---|---|---|
| `VITE_API_URL` | string | URL base da API backend | `http://localhost:8000` |
| `VITE_GA_ID` | string | ID do Google Analytics 4 | `G-XXXXXXXXXX` |

### Configuração para Diferentes Ambientes

**.env.development** (desenvolvimento local)
```env
VITE_API_URL=http://localhost:8000
VITE_GA_ID=G-DEV_ID
```

**.env.production** (produção)
```env
VITE_API_URL=https://api.glauciofilho.com
VITE_GA_ID=G-PROD_ID
```

---

## 📁 Estrutura do Projeto

```
frontend/
├── public/                          # Arquivos estáticos
│   └── img/                         # Imagens (perfil, badges, etc.)
│
├── src/
│   ├── App.jsx                      # Componente raiz da aplicação
│   ├── main.jsx                     # Ponto de entrada
│   ├── index.css                    # Estilos globais
│   │
│   ├── analytics/                   # Configuração de Analytics
│   │   ├── AnalyticsProvider.jsx    # Provider de contexto para GA4
│   │   ├── consent.js               # Gerenciamento de consentimento LGPD
│   │   └── ga.js                    # Funções de rastreamento GA4
│   │
│   ├── components/                  # Componentes reutilizáveis
│   │   ├── CoockeBanner.jsx         # Banner de consentimento de cookies
│   │   ├── FileTree.jsx             # Visualizador de estrutura de arquivos
│   │   ├── Footer.jsx               # Rodapé da aplicação
│   │   ├── Header.jsx               # Cabeçalho/Navegação
│   │   ├── LanguageSwitch.jsx       # Seletor de idioma
│   │   ├── ProjectCard.jsx          # Card de projeto
│   │   ├── ScrollToTop.jsx          # Botão de scroll para topo
│   │   ├── SortSelect.jsx           # Seletor de ordenação
│   │   ├── StackFilter.jsx          # Filtro por tecnologia
│   │   ├── ViewToggle.tsx           # Toggle grid/lista (TypeScript)
│   │   ├── VSCodeViewer.jsx         # Visualizador de VS Code
│   │   │
│   │   └── analytics/               # Componentes de dashboard
│   │       ├── CountriesMap.jsx     # Mapa de países com visitantes
│   │       ├── ProjectsTimelineChart.jsx  # Gráfico de timeline
│   │       ├── Ranking.jsx          # Ranking de projetos
│   │       ├── StackUsageChart.jsx  # Gráfico de uso de tecnologias
│   │       └── StatCard.jsx         # Cartão de estatística
│   │
│   ├── context/                     # React Context API
│   │   └── LanguageContext.jsx      # Contexto para gerenciar idioma
│   │
│   ├── pages/                       # Páginas da aplicação
│   │   ├── Home.jsx                 # Página inicial
│   │   ├── Projects.jsx             # Página de projetos
│   │   ├── Analytics.jsx            # Dashboard de análises
│   │   ├── Resume.jsx               # Página de currículo
│   │   ├── Contact.jsx              # Página de contato
│   │   ├── Privacy.jsx              # Página de privacidade
│   │   ├── Cookies.jsx              # Página de políticas de cookies
│   │   └── Terms.jsx                # Página de termos de serviço
│   │
│   ├── services/                    # Serviços e API
│   │   └── api.js                   # Integração com backend API
│   │
│   └── i18n/                        # Internacionalização
│       └── translations.js          # Dicionário de traduções (PT/EN)
│
├── Dockerfile                       # Configuração para containerização
├── vite.config.js                   # Configuração do Vite
├── tailwind.config.js               # Configuração do Tailwind CSS
├── postcss.config.js                # Configuração do PostCSS
├── eslint.config.js                 # Configuração do ESLint
├── package.json                     # Dependências e scripts
├── index.html                       # HTML principal
└── README.md                        # Este arquivo
```

---

## 🏗️ Arquitetura

### Fluxo de Dados

```
Browser
    ↓
App.jsx (routing com React Router)
    ↓
┌─────────────────────────────────────────────┐
│ LanguageContext (gerencia idioma)           │
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

### Contextos

**LanguageContext**: Gerencia estado global de idioma (PT/EN)
```javascript
const { lang, t } = useLanguage();
// lang: 'pt' ou 'en'
// t: função para traduzir chaves
```

**Analytics**: Rastreamento de eventos e pageviews
```javascript
trackPageView('/projects');
trackEvent('filter_applied', { stack: 'React' });
```

---

## 🧩 Componentes Principais

### Layout & Navegação

| Componente | Descrição | Props |
|---|---|---|
| **Header** | Navegação principal | - |
| **Footer** | Rodapé com links | - |
| **LanguageSwitch** | Seletor de idioma | - |
| **ScrollToTop** | Botão flutuante top | - |

### Projetos

| Componente | Descrição | Props |
|---|---|---|
| **ProjectCard** | Card individual de projeto | `project`, `onClick` |
| **StackFilter** | Filtro por tecnologia | `stacks`, `selected`, `onChange` |
| **SortSelect** | Seletor de ordenação | `value`, `onChange` |
| **ViewToggle** | Toggle grid/lista | `isGrid`, `onChange` |
| **FileTree** | Visualizador de arquivos | `files`, `projectId` |
| **VSCodeViewer** | Display de código com syntax | `code`, `language` |

### Analytics

| Componente | Descrição | Props |
|---|---|---|
| **StatCard** | Cartão com métrica | `icon`, `label`, `value`, `trend` |
| **CountriesMap** | Mapa coroplético | `data` |
| **ProjectsTimelineChart** | Gráfico de linha | `data` |
| **Ranking** | Tabela de ranking | `data` |
| **StackUsageChart** | Gráfico de barras | `data` |

### Utilitários

| Componente | Descrição | Props |
|---|---|---|
| **CoockeBanner** | Banner de consentimento | - |

---

## 🌍 Internacionalização (i18n)

### Idiomas Suportados
- 🇵🇧 Português (PT) - Padrão
- 🇺🇸 Inglês (EN)

### Uso

```jsx
import { useLanguage } from '../context/LanguageContext';

function MyComponent() {
  const { lang, t } = useLanguage();

  return <h1>{t('home')}</h1>;
  // Se lang='pt': "Início"
  // Se lang='en': "Home"
}
```

### Adicionar Nova Tradução

Edite `src/i18n/translations.js`:

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

## 📊 Integração com API Backend

A aplicação se conecta com uma API backend para:

- **Projetos**: `GET /api/projects/?lang=pt`
- **Projeto Específico**: `GET /api/projects/{id}/?lang=pt`
- **Arquivos**: `GET /api/files/{projectId}/{fileId}/?lang=pt`
- **Currículo**: `GET /api/resume/?lang=pt`
- **Análises**: `GET /api/analytics/?lang=pt`

### Exemplos de Requisições

```javascript
import { getProjects, getOneProject } from '../services/api';

// Obter todos os projetos
const projects = await getProjects('pt');

// Obter projeto específico
const project = await getOneProject(1, 'pt');
```

---

## 📈 Analytics com Google Analytics 4

### Rastreamento Automático
- **Page Views**: Automaticamente rastreado em cada navegação
- **Consentimento**: Respecta prévia aprovação do usuário (LGPD/GDPR)

### Rastreamento Manual

```javascript
import { trackEvent } from '../analytics/ga';

// Rastrear evento customizado
trackEvent('project_viewed', { projectId: 123 });
trackEvent('filter_applied', { stack: 'React', count: 5 });
```

### Compatibilidade LGPD/GDPR

```javascript
import { hasConsent, requestConsent } from '../analytics/consent';

if (hasConsent()) {
  // Analytics está habilitado
}

// Banner solicitará consentimento antes de rastrear
```

---

## 🐳 Docker & Containerização

### Build da Imagem Docker

```bash
docker build -t portfolio-frontend .
```

### Executar Container

```bash
docker run -p 3000:80 portfolio-frontend
```

### Docker Compose (se disponível)

```bash
docker-compose up -d
```

---

## 🚀 Deployment

### Deploy na Vercel

1. Conecte seu repositório GitHub
2. Defina as variáveis de ambiente
3. Configure build: `npm run build`
4. Output directory: `dist`

### Deploy no Netlify

```bash
npm run build
# Deploy a pasta dist/
```

### Deploy em Servidor Próprio

```bash
# Build para produção
npm run build

# Servir arquivos (qualquer servidor web)
# nginx, Apache, ou Node.js server serving dist/
```

### Checklist de Deploy

- [ ] Variáveis de ambiente configuradas
- [ ] Build completo sem erros
- [ ] Google Analytics ID configurado
- [ ] API Backend URL apontando para produção
- [ ] SSL/HTTPS habilitado
- [ ] Cookies consent funcionando
- [ ] Favicons e meta tags corretos

---

## 📱 Responsividade

A aplicação é **mobile-first** e totalmente responsiva:

- 📱 **Mobile** (< 640px): Stack vertical, navegação simplificada
- 📱 **Tablet** (640px - 1024px): Layout adaptado
- 🖥️ **Desktop** (> 1024px): Layout completo com todas as funcionalidades

---

## 🎨 Personalização de Temas

O projeto usa **Tailwind CSS** com cores customizadas (cyan/sky).

Edite `tailwind.config.js` para alterar paleta de cores:

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

### Problema: Integração com API não funciona

**Solução**: Verifique:
1. URL da API em `VITE_API_URL`
2. Backend rodando no servidor
3. CORS configurado no backend

```bash
# Testar conexão
curl http://localhost:8000/api/projects/
```

### Problema: Analytics não rastreia

**Solução**: 
1. Google Analytics ID (`VITE_GA_ID`) correto
2. Consentimento do usuário aceito
3. Verificar no GA4 se eventos aparecem

### Problema: Erro ao buildar

**Solução**:
```bash
# Limpe cache
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Problema: Idioma não muda

**Solução**:
1. Verifique LanguageSwitch está correto
2. Limpe localStorage: `localStorage.clear()`
3. Verifique console para erros

---

## 📋 Checklist de Desenvolvimento

- [ ] Node.js 18+ instalado
- [ ] Dependências instaladas (`npm install`)
- [ ] `.env.local` configurado
- [ ] Servidor de dev rodando (`npm run dev`)
- [ ] Backend API acessível
- [ ] ESLint passando (`npm run lint`)
- [ ] Sem erros no console do navegador
- [ ] Responsividade testada em mobile/tablet/desktop

---

## 🤝 Contribuindo

Contribuições são bem-vindas!

### Processo de Contribuição

1. **Fork** o repositório
2. **Crie uma branch** para sua feature: `git checkout -b feature/nova-feature`
3. **Commit** suas mudanças: `git commit -m 'Adiciona nova feature'`
4. **Push** para a branch: `git push origin feature/nova-feature`
5. **Abra um Pull Request**

### Padrões de Código

- Use **ESLint** para verificar código
- Componentes em **PascalCase**: `MyComponent.jsx`
- Hooks em **camelCase**: `useMyHook()`
- Estilos com **Tailwind CSS**
- Imports organizados (React, libs, componentes, utils)

### Branches

- `main` - Produção
- `develop` - Desenvolvimento
- `feature/*` - Novas features
- `fix/*` - Correções de bugs

---

## 📚 Recursos Úteis

- [Documentação React 19](https://react.dev)
- [Documentação Vite](https://vite.dev)
- [Documentação Tailwind CSS](https://tailwindcss.com)
- [React Router Docs](https://reactrouter.com)
- [Google Analytics 4](https://developers.google.com/analytics/devguides/collection/ga4)
- [Recharts Docs](https://recharts.org)

---

## ❓ Perguntas Frequentes

**P: Como adicionar um novo projeto?**
> R: Projetos vêm da API backend. Adicione via admin panel do backend e aparecerá automaticamente no frontend.

**P: Posso mudar as cores do tema?**
> R: Sim! Edite `tailwind.config.js` para customizar as cores.

**P: Como adicionar uma nova página?**
> R: Crie um arquivo em `src/pages/`, configure rota em `App.jsx`, adicione tradução em `translations.js`.

**P: Qual é o processo de deploy?**
> R: Execute `npm run build`, faça o deploy da pasta `dist/` em qualquer host (Vercel, Netlify, seu servidor, etc).

**P: O site funciona sem JavaScript?**
> R: Não, é uma SPA (Single Page Application) que requer JavaScript.

**P: Como testar localmente antes de fazer deploy?**
> R: Execute `npm run build` então `npm run preview` para visualizar o build final.

---

## 📞 Contato & Suporte

- **GitHub**: [glauciofilho](https://github.com/glauciofilho)
- **LinkedIn**: [Gláucio Filho](https://linkedin.com/in/glauciofilho)
- **Email**: [me@glauciofilho.com](mailto:me@glauciofilho.com)
- **Website**: [glauciofilho.com](https://glauciofilho.com)

---

## 📄 Licença

Este projeto está licenciado sob a **MIT License** - veja o arquivo [LICENSE](LICENSE) para detalhes.

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

## 🎉 Agradecimentos

- [React](https://react.dev) - Biblioteca incrível
- [Vite](https://vite.dev) - Build tool super rápido
- [Tailwind CSS](https://tailwindcss.com) - Estilos amazing
- Comunidade dev por feedback e contribuições

---

**Última atualização**: Abril de 2026
**Versão**: 1.0.0
**Status**: ✅ Em Produção

---

**⭐ Se este projeto foi útil, considere dar uma estrela no GitHub!**
