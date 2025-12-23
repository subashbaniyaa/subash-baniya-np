# Overview

This is Subash's personal portfolio website - a modern, interactive web application built with Next.js 15. The site serves as a digital showcase featuring his work, thoughts (blog), personal stats, and contact information. It emphasizes smooth animations, dark/light theme support, and integrations with external services like Spotify, GitHub, and Wakatime to display real-time personal data.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Framework
- **Next.js 15** with App Router for server-side rendering and routing
- **React 19** for component architecture
- **TypeScript** for type safety and better development experience
- **Tailwind CSS 4** for utility-first styling with custom design tokens

## Animation and Interaction
- **Motion (formerly Framer Motion)** for complex animations and page transitions
- **GSAP** for canvas-based hero animations and advanced motion graphics
- **Lenis** for smooth scrolling behavior
- Custom scroll-based animations using intersection observers and scroll contexts

## Content Management
- **MDX** with `next-mdx-remote` for blog content with React component support
- **Rehype Pretty Code** with Shiki for syntax highlighting in code blocks
- File-system based content management for blog posts and static pages

## External Integrations
- **Spotify API** for displaying currently playing music and top tracks
- **GitHub GraphQL API** for contribution calendar and coding statistics
- **Wakatime API** for detailed coding time analytics
- **Vercel Analytics** and **Speed Insights** for performance monitoring
- **LogRocket** for user session recording and debugging
- **Umami** for privacy-focused web analytics

## State Management and Data Fetching
- **SWR** for client-side data fetching with caching and revalidation
- **React Context** for scroll position and theme state management
- Server-side caching using Next.js `cache` function for API responses

## Performance Optimizations
- **Turbo** mode for faster development builds
- **Server Components** by default with selective client components
- **Image optimization** with Next.js Image component
- **Font optimization** with Google Fonts integration and display swap
- **Incremental Static Regeneration** for dynamic content

## UI/UX Features
- **Dark/light theme** support with system preference detection
- **Command palette** (⌘K) for quick navigation
- **Mobile-responsive** design with hamburger navigation
- **Progressive enhancement** with graceful loading states
- **Accessibility** features including proper ARIA labels and keyboard navigation

## Development Tools
- **Turbopack** enabled for faster Next.js development builds and hot reloading
- **ESLint** and **Prettier** for code quality and formatting
- **Husky** and **lint-staged** for pre-commit hooks
- **Renovate** for automated dependency updates
- **PostCSS** for CSS processing and Tailwind compilation

# External Dependencies

## Core Services
- **Vercel** - Hosting platform and deployment pipeline
- **Spotify Web API** - Music streaming data (currently playing, top tracks)
- **GitHub GraphQL API** - Code contribution statistics and activity calendar
- **Wakatime API** - Detailed coding time tracking and productivity metrics

## Analytics and Monitoring
- **Vercel Analytics** - Web vitals and performance metrics
- **Vercel Speed Insights** - Core web vitals monitoring
- **LogRocket** - Session replay and error tracking
- **Umami** - Privacy-focused web analytics platform

## Development Infrastructure
- **Renovate** - Automated dependency management
- **Google Fonts API** - Web font delivery (Mukta, Copse, DM Mono, Merriweather)
- **Next.js Edge Runtime** - Serverless function execution

## Content and Media
- **MDX ecosystem** - Markdown processing with React components
- **Shiki** - Syntax highlighting engine
- **Static assets** - Self-hosted images and media files

## Authentication Requirements
- Spotify Client ID, Secret, and Refresh Token for music data
- GitHub Personal Access Token for repository statistics
- Wakatime Secret Key for coding time analytics
- Service-specific API keys for analytics platforms

# Recent Changes

## Build Configuration Fixes (September 11, 2025)
- **Turbopack Integration**: Enabled Turbopack for faster development builds by adding `--turbopack` flag to dev script
- **ESLint Compliance**: Fixed unescaped apostrophes in anime-quote component to resolve build failures
- **Sitemap Type Safety**: Added proper TypeScript typing to sitemap.ts with MetadataRoute.Sitemap return type
- **Production Build**: Successfully configured for deployment with all routes generating correctly (/robots.txt, /sitemap.xml)
- **Error Resilience**: Enhanced anime quote component with better JSON parsing error handling and fallback quotes