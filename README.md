# Iann Portfolio

Portfólio profissional de Iann Arthur Martaroli, construído como uma experiência scrollytelling em página única com foco em desenvolvimento, cibersegurança e apresentação visual imersiva.

O projeto foi desenvolvido com React, TypeScript, Vite e Tailwind CSS, combinando animações com GSAP + ScrollTrigger, scroll suave com Lenis e um fundo autoral em canvas que muda de comportamento conforme a navegação entre os capítulos.

## Visão geral

Este portfólio foi pensado como uma narrativa visual dividida em 7 capítulos:

1. Hero
2. Sobre
3. Skills
4. Projetos
5. Trajetória
6. Segurança aplicada
7. Contato

Ao longo da página, o componente de fundo reage ao scroll e ao movimento do mouse, mudando entre diferentes modos visuais para acompanhar cada seção.

## Principais recursos

- Página única com narrativa orientada por scroll
- Fundo animado em canvas com comportamento dinâmico
- Transições com GSAP e ScrollTrigger
- Scroll suave com Lenis
- Indicador lateral de progresso entre capítulos
- Seção de projetos com destaque individual por scroll
- Timeline profissional com revelação progressiva
- Área de segurança com cards técnicos e certificações
- Footer integrado à seção final
- Estrutura responsiva para desktop e mobile

## Stack principal

- React 18
- TypeScript
- Vite
- Tailwind CSS
- GSAP
- ScrollTrigger
- Lenis
- React Router DOM
- TanStack Query
- Vitest

## Estrutura do projeto

```text
my_portfolio/
├── public/
│   ├── favicon.ico
│   ├── profile.jpg
│   └── robots.txt
├── src/
│   ├── app/
│   │   ├── App.tsx
│   │   └── providers.tsx
│   ├── components/
│   │   └── ui/
│   ├── features/
│   │   └── landing/
│   │       ├── LandingPage.tsx
│   │       ├── components/
│   │       │   ├── BrandHeader.tsx
│   │       │   ├── MagneticButton.tsx
│   │       │   ├── OrbitalCore.tsx
│   │       │   ├── ProfileVisual.tsx
│   │       │   └── ProgressRail.tsx
│   │       ├── data/
│   │       ├── hooks/
│   │       └── sections/
│   │           ├── AboutSection.tsx
│   │           ├── ContactSection.tsx
│   │           ├── HeroSection.tsx
│   │           ├── ProjectsSection.tsx
│   │           ├── SecuritySection.tsx
│   │           ├── SkillsSection.tsx
│   │           └── TimelineSection.tsx
│   ├── hooks/
│   │   ├── use-mobile.tsx
│   │   └── use-toast.ts
│   ├── pages/
│   │   └── NotFound.tsx
│   ├── styles/
│   │   └── globals.css
│   ├── test/
│   │   └── setup.ts
│   └── main.tsx
├── index.html
├── package.json
├── tailwind.config.ts
├── vite.config.ts
└── vitest.config.ts
```

## Como executar localmente

### Pré-requisitos

- Node.js recomendado: `20+`
- npm

Observação: versões mais antigas do Node podem funcionar parcialmente, mas algumas dependências do ecossistema de lint exigem versões mais recentes.

### Instalação

```bash
npm install
```

### Ambiente de desenvolvimento

```bash
npm run dev
```

### Build de produção

```bash
npm run build
```

### Preview local da build

```bash
npm run preview
```

## Scripts disponíveis

- `npm run dev`: inicia o ambiente de desenvolvimento com Vite
- `npm run build`: gera a build de produção
- `npm run build:dev`: gera build em modo de desenvolvimento
- `npm run lint`: executa o ESLint
- `npm run test`: roda os testes com Vitest
- `npm run test:watch`: executa os testes em modo watch

## Arquitetura da experiência

### 1. Página principal

O arquivo `src/features/landing/LandingPage.tsx` monta a experiência completa.

Ele é responsável por:

- ativar o scroll suave com `useLenis()`
- atualizar o estado global de scroll com `useGlobalScrollPhase()`
- renderizar o fundo animado `OrbitalCore`
- renderizar a barra lateral `ProgressRail`
- empilhar os 7 capítulos na ordem da narrativa

### 2. Fundo animado

O arquivo `src/features/landing/components/OrbitalCore.tsx` desenha o fundo em canvas.

Ele trabalha com os modos:

- `core`
- `side`
- `split`
- `link`
- `line`
- `panel`
- `signature`

Esses modos são controlados por `src/features/landing/hooks/useScrollPhase.ts`, que mantém:

- modo atual do núcleo visual
- progresso global do scroll
- posição do ponteiro do mouse

### 3. Scroll suave

O hook `src/features/landing/hooks/useLenis.ts` integra o Lenis com o ScrollTrigger para manter a sincronia entre movimento e animações.

## Capítulos do portfólio

### Capítulo 01 · Hero

Arquivo: `src/features/landing/sections/HeroSection.tsx`

Conteúdo principal:

- nome em destaque
- foto de perfil com visual orbital
- frase de posicionamento profissional
- CTA para projetos, GitHub e contato

### Capítulo 02 · Sobre

Arquivo: `src/features/landing/sections/AboutSection.tsx`

Conteúdo principal:

- resumo de formação
- experiência prática em cibersegurança
- frases curtas de posicionamento técnico
- foto complementar com efeito de reveal/parallax

### Capítulo 03 · Skills

Arquivo: `src/features/landing/sections/SkillsSection.tsx`

Grupos atuais:

- Desenvolvimento
- Cibersegurança
- Cloud & Dados
- Estudos & Labs

### Capítulo 04 · Projetos

Arquivo: `src/features/landing/sections/ProjectsSection.tsx`

Projetos listados:

- Cyberbot
- Esp32 Phishing
- Esp32 Beacon Spam
- Landing Page Cibersegurança
- Landing Page Feliz Natal

Cada projeto possui:

- número de ordem
- título
- subtítulo
- descrição
- tags
- link individual de GitHub pelo campo `github`

### Capítulo 05 · Trajetória

Arquivo: `src/features/landing/sections/TimelineSection.tsx`

Apresenta uma timeline vertical com 5 marcos:

- Instituto de Promoção do Menor
- Honda Brasil
- ADS
- Técnico em Desenvolvimento de Sistemas
- Grupo NC

### Capítulo 06 · Segurança aplicada

Arquivo: `src/features/landing/sections/SecuritySection.tsx`

Inclui:

- introdução sobre a atuação em cibersegurança
- cards com temas técnicos
- grade de certificações e cursos
- bloco final com idiomas e destaque profissional

### Capítulo 07 · Contato

Arquivo: `src/features/landing/sections/ContactSection.tsx`

Inclui:

- chamada final
- texto de disponibilidade profissional
- links para GitHub e LinkedIn
- footer com assinatura profissional

## Roteamento

O roteamento está em `src/app/App.tsx`.

Rotas atuais:

- `/` para a página principal
- `*` para a página `src/pages/NotFound.tsx`

## Testes e qualidade

O projeto já possui configuração de teste com Vitest.

Arquivo de teste de dados:

- `src/features/landing/data/landing-data.test.ts`

Também há configuração de lint via ESLint no script:

```bash
npm run lint
```

## Observações técnicas

- O projeto usa `BrowserRouter`, então ambientes de deploy precisam tratar fallback para `index.html`
- O fundo animado usa canvas e responde ao mouse e ao scroll
- A experiência visual depende bastante de `GSAP + ScrollTrigger`
- O projeto contém componentes utilitários gerados para UI, mas a página principal usa apenas parte deles

## Autor

Iann Arthur Martaroli

- GitHub: https://github.com/iannxz
- LinkedIn: https://www.linkedin.com/in/iannarthur/
