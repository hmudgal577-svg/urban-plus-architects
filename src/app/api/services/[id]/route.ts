import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';
import { slugify } from '@/lib/utils';

interface Props {
  params: { id: string };
}

// GET single service
export async function GET(req: NextRequest, { params }: Props) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const service = await prisma.service.findUnique({ where: { id: params.id } });
    if (!service) {
      return NextResponse.json({ error: 'Service not found' }, { status: 404 });
    }
    return NextResponse.json({ service });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch service' }, { status: 500 });
  }
}

// PUT update service
export async function PUT(req: NextRequest, { params }: Props) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { title, slug, tagline, shortDescription, fullDescription, coverImage, icon, features, order, isPublished } = body;

    const existing = await prisma.service.findUnique({ where: { id: params.id } });
    if (!existing) {
      return NextResponse.json({ error: 'Service not found' }, { status: 404 });
    }

    const updated = await prisma.service.update({
      where: { id: params.id },
      data: {
        ...(title && { title }),
        ...(slug && { slug: slugify(slug) }),
        ...(tagline !== undefined && { tagline }),
        ...(shortDescription && { shortDescription }),
        ...(fullDescription !== undefined && { fullDescription }),
        ...(coverImage !== undefined && { coverImage }),
        ...(icon !== undefined && { icon }),
        ...(features !== undefined && {
          features: typeof features === 'string' ? features : JSON.stringify(features),
        }),
        ...(order !== undefined && { order: Number(order) }),
        ...(isPublished !== undefined && { isPublished: Boolean(isPublished) }),
      },
    });

    return NextResponse.json({ success: true, service: updated });
  } catch (error: any) {
    console.error('Service update error:', error);
    return NextResponse.json({ error: 'Failed to update service: ' + error.message }, { status: 500 });
  }
}

// DELETE service
export async function DELETE(req: NextRequest, { params }: Props) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await prisma.service.delete({ where: { id: params.id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete service' }, { status: 500 });
  }
}
