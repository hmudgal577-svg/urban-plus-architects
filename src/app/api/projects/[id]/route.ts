import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';
import { slugify } from '@/lib/utils';

interface Props {
  params: {
    id: string;
  };
}

// GET single project
export async function GET(req: NextRequest, { params }: Props) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const project = await prisma.project.findUnique({
      where: { id: params.id },
      include: {
        categories: {
          include: { category: true },
        },
      },
    });

    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    return NextResponse.json({ project });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch project' }, { status: 500 });
  }
}

// PUT update project
export async function PUT(req: NextRequest, { params }: Props) {
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

    const existingProject = await prisma.project.findUnique({
      where: { id: params.id },
    });

    if (!existingProject) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    const updatedSlug = slug ? slugify(slug) : slugify(title || existingProject.title);

    // If slug changed, ensure uniqueness
    if (updatedSlug !== existingProject.slug) {
      const slugExists = await prisma.project.findUnique({
        where: { slug: updatedSlug },
      });
      if (slugExists) {
        return NextResponse.json(
          { error: 'A project with this URL slug already exists.' },
          { status: 400 }
        );
      }
    }

    const updatedProject = await prisma.project.update({
      where: { id: params.id },
      data: {
        ...(title && { title }),
        slug: updatedSlug,
        ...(location && { location }),
        ...(category && { category }),
        ...(year && { year }),
        ...(shortDescription && { shortDescription }),
        ...(fullDescription !== undefined && { fullDescription }),
        ...(designConcept !== undefined && { designConcept }),
        ...(challenges !== undefined && { challenges }),
        ...(solution !== undefined && { solution }),
        ...(status && { status }),
        ...(isFeatured !== undefined && { isFeatured: Boolean(isFeatured) }),
        ...(coverImage && { coverImage }),
        ...(gallery !== undefined && {
          gallery: typeof gallery === 'string' ? gallery : JSON.stringify(gallery),
        }),
        ...(floorPlans !== undefined && {
          floorPlans: typeof floorPlans === 'string' ? floorPlans : JSON.stringify(floorPlans),
        }),
        ...(elevations !== undefined && {
          elevations: typeof elevations === 'string' ? elevations : JSON.stringify(elevations),
        }),
        ...(interiorImages !== undefined && {
          interiorImages: typeof interiorImages === 'string' ? interiorImages : JSON.stringify(interiorImages),
        }),
        ...(exteriorImages !== undefined && {
          exteriorImages: typeof exteriorImages === 'string' ? exteriorImages : JSON.stringify(exteriorImages),
        }),
        ...(renders3D !== undefined && {
          renders3D: typeof renders3D === 'string' ? renders3D : JSON.stringify(renders3D),
        }),
        ...(beforeAfter !== undefined && {
          beforeAfter: typeof beforeAfter === 'string' ? beforeAfter : JSON.stringify(beforeAfter),
        }),
        ...(specifications !== undefined && {
          specifications: typeof specifications === 'string' ? specifications : JSON.stringify(specifications),
        }),
        ...(client !== undefined && { client }),
        ...(projectSize !== undefined && { projectSize }),
        ...(seoTitle !== undefined && { seoTitle }),
        ...(seoDescription !== undefined && { seoDescription }),
        ...(altText !== undefined && { altText }),
        ...(order !== undefined && { order: Number(order) }),
      },
    });

    return NextResponse.json({ success: true, project: updatedProject });
  } catch (error: any) {
    console.error('Project update error:', error);
    return NextResponse.json({ error: 'Failed to update project: ' + error.message }, { status: 500 });
  }
}

// DELETE project
export async function DELETE(req: NextRequest, { params }: Props) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await prisma.project.delete({
      where: { id: params.id },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 });
  }
}
