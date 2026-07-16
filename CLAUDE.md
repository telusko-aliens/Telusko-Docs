# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Telusko-Docs is an educational documentation platform built with **Next.js 16**, **Fumadocs** (MDX documentation framework), **React 19**, **Tailwind CSS 4**, and **TypeScript**. It hosts ~350 MDX files covering Python, Java, FastAPI, Spring AI, and System Design.

## Commands

- `npm run dev` - Start development server with hot reload
- `npm run build` - Production build (also runs ESLint)
- `npm run lint` - Run ESLint (extends `next/core-web-vitals` and `next/typescript`)
- `npm run postinstall` - Processes MDX source files (runs automatically after `npm install`)

There are no test commands configured.

## Architecture

### Content System

Documentation lives in `content/docs/` as MDX files. Each folder has a `meta.json` that defines sidebar navigation order. The Fumadocs source pipeline:

1. `source.config.ts` - Defines docs directory, frontmatter schema, enables git-based last-modified tracking
2. `.source/` - Auto-generated compiled output from Fumadocs MDX processing
3. `lib/source.ts` - Loader that creates the runtime source with `baseUrl: '/docs'` and lucide icons plugin
4. `app/docs/[[...slug]]/page.tsx` - Dynamic catch-all route that renders any doc page

### MDX Components

`mdx-components.tsx` registers all available components for use in MDX files:
- **Fumadocs UI:** Accordion/s, Card/s, Step/s, Tab/s, File, Folder
- **Custom:** Video (YouTube embed), Quote, Badge, ComingSoonCard, ComingSoonAccordion, ImageZoom

### Key Directories

- `app/` - Next.js App Router (pages, layouts, API routes)
- `components/` - React components (`ui/` for doc components, `ai/` for LLM/GitHub buttons)
- `lib/` - Utilities (source loader, GitHub API client, shared layout config)
- `content/docs/` - All MDX documentation organized by topic
- `public/` - Static assets

### API Routes

- `/api/search` - Full-text search (Orama-based)
- `/api/docs/[...slug]` - Document metadata/raw markdown
- `/llms-full.txt` - Full documentation text for LLM consumption

### GitHub Integration

The feedback system uses GitHub Discussions API via Octokit. Requires `GITHUB_APP_ID` and `GITHUB_APP_PRIVATE_KEY` environment variables.

## Content Conventions

- File names use kebab-case: `getting-started.mdx`
- Disabled/future sections are prefixed with `DISABLED-` in folder names
- Section headings in `meta.json` use `"---Title---"` format
- Images are hosted on CloudFront CDN (`dyz1pdcuffwr5.cloudfront.net`) or in `/public/`
- Videos use the `<Video id="YOUTUBE_ID" />` component
- Every MDX file needs frontmatter with `title` and `description`

## Configuration

- `next.config.mjs` - Fumadocs MDX integration, image domains (YouTube, CloudFront)
- `source.config.ts` - Fumadocs doc source with `lastModifiedTime: 'git'`
- Pages are cached with `revalidate = 900` (15 minutes)
- TypeScript path aliases: `@/*` maps to project root, `@/.source` maps to `.source/`

## Git Workflow

- `main` is the production branch
- `staging` is the active development branch
- Commit messages are short and descriptive (e.g., "added lecture on relational database")
