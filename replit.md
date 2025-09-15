# Smart Deals AI - AI-Powered Affiliate Marketing Platform

## Overview

Smart Deals AI is a full-stack web application that serves as an AI-powered affiliate marketing platform. The application helps users discover deals and discounts from major Indian e-commerce platforms including Amazon, Flipkart, and Myntra. Built with a modern React frontend and Express.js backend, the platform features product curation, search functionality, admin management, and affiliate link redirection.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state management and caching
- **UI Framework**: Radix UI components with Tailwind CSS for styling
- **Form Handling**: React Hook Form with Zod validation for robust form management
- **Build Tool**: Vite for fast development and optimized production builds

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules for modern JavaScript features
- **API Design**: RESTful API structure with centralized route handling
- **Error Handling**: Global error middleware for consistent error responses
- **Logging**: Request/response logging middleware for API monitoring

### Data Storage Solutions
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Schema Management**: Drizzle Kit for migrations and schema evolution
- **Fallback Storage**: In-memory storage implementation for development/testing

### Authentication and Authorization
- **Admin Authentication**: Simple username/password authentication with bcrypt hashing
- **Session Management**: Basic session handling for admin panel access
- **Security**: CORS configuration and secure password hashing

### Data Models
- **Users**: Admin user management with hashed passwords
- **Products**: Comprehensive product schema with pricing, affiliate links, ratings, and categorization
- **Contacts**: Contact form submissions for user inquiries
- **Shared Schema**: Common TypeScript interfaces between frontend and backend

### External Dependencies

#### E-commerce Platform Integrations
- **Amazon India**: Affiliate link integration for product redirection
- **Flipkart**: Affiliate program participation for commission tracking
- **Myntra**: Fashion and lifestyle product affiliate partnerships

#### Email Services
- **SendGrid**: Email service for contact form submissions and notifications
- **Configuration**: Optional email functionality with graceful fallback

#### UI and Styling
- **shadcn/ui**: Pre-built accessible UI components based on Radix UI
- **Tailwind CSS**: Utility-first CSS framework for responsive design
- **Radix UI**: Unstyled, accessible UI primitives for complex components
- **Lucide React**: Modern icon library for consistent iconography

#### Development and Build Tools
- **Replit Integration**: Special development plugins for Replit environment
- **ESBuild**: Fast JavaScript bundler for production builds
- **PostCSS**: CSS processing with Tailwind CSS integration
- **TypeScript**: Static type checking across the entire application

#### Additional Libraries
- **Wouter**: Lightweight routing solution for React applications
- **date-fns**: Date manipulation and formatting utilities
- **class-variance-authority**: Type-safe component variant management
- **cmdk**: Command palette component for enhanced user experience