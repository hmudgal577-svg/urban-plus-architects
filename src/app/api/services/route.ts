import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';
import { slugify } from '@/lib/utils';

// GET all services for admin
export async function GET(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const services = await prisma.service.findMany({
      orderBy: { order: 'asc' },
    });
    return NextResponse.json({ services });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch services' }, { status: 500 });
  }
}

// POST create service
export async function POST(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { title, slug, tagline, shortDescription, fullDescription, coverImage, icon, features, order, isPublished } = body;

    if (!title || !shortDescription) {
      return NextResponse.json({ error: 'Title and short description are required.' }, { status: 400 });
    }

    const generatedSlug = slug ? slugify(slug) : slugify(title);

    const service = await prisma.service.create({
      data: {
        title,
        slug: generatedSlug,
        tagline,
        shortDescription,
        fullDescription: fullDescription || shortDescription,
        coverImage: coverImage || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
        icon: icon || 'Building',
        features: typeof features === 'string' ? features : JSON.stringify(features || []),
        order: Number(order) || 0,
        isPublished: isPublished !== undefined ? Boolean(isPublished) : true,
      },
    });

    return NextResponse.json({ success: true, service }, { status: 201 });
  } catch (error: any) {
    console.error('Service create error:', error);
    return NextResponse.json({ error: 'Failed to create service: ' + error.message }, { status: 500 });
  }
}
