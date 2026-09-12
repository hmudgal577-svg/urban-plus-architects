import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';
import { slugify } from '@/lib/utils';

export async function GET(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const posts = await prisma.blogPost.findMany({
      orderBy: { publishedAt: 'desc' },
    });
    return NextResponse.json({ posts });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch insights' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { title, slug, coverImage, summary, content, author, tags, category, isPublished, seoTitle, seoDescription } = body;

    if (!title || !content || !summary) {
      return NextResponse.json({ error: 'Title, summary, and content are required' }, { status: 400 });
    }

    const generatedSlug = slug ? slugify(slug) : slugify(title);

    const post = await prisma.blogPost.create({
      data: {
        title,
        slug: generatedSlug,
        coverImage: coverImage || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
        summary,
        content,
        author: author || 'Ar. Shailendra Bhadoria',
        tags,
        category: category || 'Architecture',
        isPublished: isPublished !== undefined ? Boolean(isPublished) : true,
        seoTitle: seoTitle || title,
        seoDescription: seoDescription || summary,
      },
    });

    return NextResponse.json({ success: true, post }, { status: 201 });
  } catch (error: any) {
    console.error('Insight creation error:', error);
    return NextResponse.json({ error: 'Failed to create article: ' + error.message }, { status: 500 });
  }
}
