# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start Vite development server (frontend only)
- `npm run dev:full` - Start both Express backend (port 5011) and Vite frontend concurrently
- `npm run build` - Build for production using Vite
- `npm run lint` - Run ESLint for code quality
- `npm run preview` - Preview production build locally

## Architecture Overview

This is a React + TypeScript SPA with an Express backend that serves art exhibition data for Rome.

### Frontend Structure
- **Main App**: `src/App.tsx` - Single-page application with client-side routing via state management
- **Components**: Located in `src/components/` - modular components for different views
- **Internationalization**: 
  - Context: `src/contexts/LanguageContext.tsx` - manages language state (en/it)
  - Translations: `src/i18n/translations.ts` - contains all translations with strong typing
- **Styling**: Tailwind CSS with custom configurations in `tailwind.config.js`

### Backend Structure  
- **Server**: `server.js` - Express server serving REST API endpoints
- **Data**: In-memory database with Rome art exhibitions and accommodations
- **API Endpoints**:
  - `GET /api/exhibitions` - List all exhibitions (query: lang, type)
  - `GET /api/exhibition/:id` - Get exhibition details with recommended accommodation

### Key Features
- Bilingual support (English/Italian) with complete translation coverage
- Art exhibition database with both temporary and permanent collections
- Accommodation recommendations based on exhibition location proximity
- SEO optimization with structured data and dynamic meta tags
- Client-side navigation between Experiences, Collections, and About sections

### Development Notes
- Uses Vite for fast development and building
- TypeScript strict mode enabled across the project
- ESLint configured for React and TypeScript
- No test framework currently configured
- Uses concurrently package to run both frontend and backend in development