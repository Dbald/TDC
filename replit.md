# The Devinci Code - Personal Portfolio and Blog

## Overview

This project is a modern personal brand website for "The Devinci Code" (Devin Baldwin), focusing on WebXR, immersive technology, speaking engagements, and educational content. The application is built as a full-stack JavaScript/TypeScript solution with a React frontend and Node.js Express backend.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

This application follows a monorepo structure with clear separation between client (frontend) and server (backend) components while sharing some common code in a shared directory. 

### Frontend

- **Framework**: React with TypeScript
- **UI Components**: Uses [shadcn/ui](https://ui.shadcn.com/) component library with a custom dark theme
- **Styling**: Tailwind CSS with custom theme configuration
- **Routing**: Uses Wouter for lightweight routing
- **State Management**: React Query for server state management
- **Build Tool**: Vite

### Backend

- **Framework**: Express.js with TypeScript
- **API Structure**: RESTful endpoints with JSON responses
- **Database Access**: Drizzle ORM
- **File Structure**: Routes defined in the `server/routes.ts` file with database operations in `server/storage.ts`

### Database

- **ORM**: Drizzle ORM for database schema definition and queries
- **Schema**: Defined in `shared/schema.ts` with tables for users, subscribers, and contact messages
- **Configuration**: PostgreSQL support via Drizzle config

## Key Components

### Shared

- **Database Schema**: Defined in `shared/schema.ts` using Drizzle ORM with Zod validation
- **Types**: Shared TypeScript types for database entities and API requests/responses

### Frontend

1. **Pages**:
   - Homepage with multiple sections
   - 404 Not Found page

2. **Sections**:
   - Hero section
   - About section
   - Projects showcase
   - Speaking engagements
   - Tutorials
   - Newsletter signup
   - Contact form

3. **UI Components**:
   - Comprehensive shadcn/ui component library integration
   - Custom theme with focus on dark mode and neon accent colors

4. **API Integration**:
   - API client in `lib/queryClient.ts` for interacting with backend services
   - Form submissions using React Hook Form with Zod validation

### Backend

1. **API Routes**:
   - `/api/subscribe`: Newsletter subscription endpoint
   - `/api/contact`: Contact form submission endpoint

2. **Storage Interface**:
   - Abstract interface for database operations
   - Currently implemented with an in-memory store (likely to be replaced with PostgreSQL)

3. **Server Configuration**:
   - Express middleware setup
   - Vite integration for development
   - Error handling middleware

## Data Flow

1. **Form Submissions**:
   - User inputs data in frontend forms (contact, newsletter)
   - Frontend validates data using Zod schemas
   - API request made to corresponding endpoint
   - Server validates data again
   - Data stored in database
   - Response sent back to frontend
   - UI feedback provided to user via toast notifications

2. **Page Loading**:
   - Static content rendered from component definitions
   - Future dynamic content would be fetched using React Query

## External Dependencies

### Frontend
- React and React DOM
- Tailwind CSS
- shadcn/ui components (built on Radix UI primitives)
- Wouter for routing
- React Query for data fetching
- Framer Motion for animations
- React Icons for icon components

### Backend
- Express for API server
- Drizzle ORM for database operations
- Zod for validation

## Deployment Strategy

The application is configured for deployment on Replit with:

1. **Build Process**:
   - Frontend: Built with Vite
   - Backend: Bundled with esbuild
   - Combined into a single distributable

2. **Runtime Configuration**:
   - Node.js server runs the Express application
   - Serves the static frontend assets
   - Handles API requests

3. **Environment Variables**:
   - `DATABASE_URL`: Required for database connection

## Future Development Areas

1. **Database Implementation**:
   - Complete the PostgreSQL integration (currently using in-memory storage)
   - Implement database migrations

2. **Authentication System**:
   - User registration and login
   - Admin panel for content management

3. **Content Expansion**:
   - Dynamic project showcase
   - Blog functionality
   - Tutorial content management

4. **Performance Optimization**:
   - Image optimization
   - Code splitting
   - Server-side rendering for SEO