import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';
import { slugify } from '@/lib/utils';

interface Props {
  params: { id: string };
}

export async function GET(req: NextRequest, { params }: Props) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const post = await prisma.blogPost.findUnique({ where: { id: params.id } });
    if (!post) {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 });
    }
    return NextResponse.json({ post });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch article' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: Props) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { title, slug, coverImage, summary, content, author, tags, category, isPublished, seoTitle, seoDescription } = body;

    const updated = await prisma.blogPost.update({
      where: { id: params.id },
      data: {
        ...(title && { title }),
        ...(slug && { slug: slugify(slug) }),
        ...(coverImage && { coverImage }),
        ...(summary && { summary }),
        ...(content && { content }),
        ...(author !== undefined && { author }),
        ...(tags !== undefined && { tags }),
        ...(category && { category }),
        ...(isPublished !== undefined && { isPublished: Boolean(isPublished) }),
        ...(seoTitle !== undefined && { seoTitle }),
        ...(seoDescription !== undefined && { seoDescription }),
      },
    });

    return NextResponse.json({ success: true, post: updated });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to update article: ' + error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: Props) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await prisma.blogPost.delete({ where: { id: params.id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete article' }, { status: 500 });
  }
}
