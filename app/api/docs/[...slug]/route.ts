import { source } from '@/lib/source';
import { notFound } from 'next/navigation';
import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  const { slug } = await params;
  
  // Check if the request is for the raw markdown
  // The last segment should be 'raw'
  if (!slug || slug[slug.length - 1] !== 'raw') {
    return notFound();
  }

  // Remove 'raw' from the slug to get the actual page slug
  const pageSlug = slug.slice(0, -1);
  
  // Get the page
  const page = source.getPage(pageSlug.length === 0 ? undefined : pageSlug);

  if (!page) {
    return notFound();
  }

  try {
    // Read the actual .mdx file from disk
    // Scoped to content/docs so the build only traces docs, not the whole project
    const filePath = path.join(process.cwd(), 'content/docs', page.path);
    const rawContent = await fs.readFile(filePath, 'utf-8');

    return new NextResponse(rawContent, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'public, max-age=3600',
      },
    });
  } catch (error) {
    console.error('Error reading file:', error);
    return new NextResponse('Error reading file', { status: 500 });
  }
}