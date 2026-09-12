import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';
import { slugify } from '@/lib/utils';

// GET all projects for admin
export async function GET(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const projects = await prisma.project.findMany({
      orderBy: { order: 'asc' },
      include: {
        categories: {
          include: {
            category: true,
          },
        },
      },
    });

    return NextResponse.json({ projects });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
  }
}

// POST create project
export async function POST(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const {
      title,
      slug,
      location,
      category,
      year,
      shortDescription,
      fullDescription,
      designConcept,
      challenges,
      solution,
      status,
      isFeatured,
      coverImage,
      gallery,
      floorPlans,
      elevations,
      interiorImages,
      exteriorImages,
      renders3D,
      beforeAfter,
      specifications,
      client,
      projectSize,
      seoTitle,
      seoDescription,
      altText,
      order,
    } = body;

    if (!title || !category || !location || !shortDescription) {
      return NextResponse.json(
        { error: 'Title, category, location, and short description are required.' },
        { status: 400 }
      );
    }

    const generatedSlug = slug ? slugify(slug) : slugify(title);

    // Check slug uniqueness
    const existing = await prisma.project.findUnique({
      where: { slug: generatedSlug },
    });
    if (existing) {
      return NextResponse.json(
        { error: 'A project with this URL slug already exists.' },
        { status: 400 }
      );
    }

    const project = await prisma.project.create({
      data: {
        title,
        slug: generatedSlug,
        location,
        category,
        year: year || new Date().getFullYear().toString(),
        shortDescription,
        fullDescription: fullDescription || shortDescription,
        designConcept,
        challenges,
        solution,
        status: status || 'PUBLISHED',
        isFeatured: Boolean(isFeatured),
        coverImage: coverImage || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
        gallery: typeof gallery === 'string' ? gallery : JSON.stringify(gallery || []),
        floorPlans: typeof floorPlans === 'string' ? floorPlans : JSON.stringify(floorPlans || []),
        elevations: typeof elevations === 'string' ? elevations : JSON.stringify(elevations || []),
        interiorImages: typeof interiorImages === 'string' ? interiorImages : JSON.stringify(interiorImages || []),
        exteriorImages: typeof exteriorImages === 'string' ? exteriorImages : JSON.stringify(exteriorImages || []),
        renders3D: typeof renders3D === 'string' ? renders3D : JSON.stringify(renders3D || []),
        beforeAfter: typeof beforeAfter === 'string' ? beforeAfter : JSON.stringify(beforeAfter || []),
        specifications: typeof specifications === 'string' ? specifications : JSON.stringify(specifications || []),
        client,
        projectSize,
        seoTitle: seoTitle || `${title} | Urban Plus Architects`,
        seoDescription: seoDescription || shortDescription,
        altText,
        order: Number(order) || 0,
      },
    });

    return NextResponse.json({ success: true, project }, { status: 201 });
  } catch (error: any) {
    console.error('Project creation error:', error);
    return NextResponse.json({ error: 'Failed to create project: ' + error.message }, { status: 500 });
  }
}
