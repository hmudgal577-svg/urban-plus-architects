import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';
import { writeFile, mkdir, unlink } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

// GET media items with search and pagination
export async function GET(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const search = searchParams.get('search');

  const whereClause: any = {};
  if (search) {
    whereClause.OR = [
      { filename: { contains: search } },
      { altText: { contains: search } },
      { caption: { contains: search } },
    ];
  }

  try {
    const media = await prisma.media.findMany({
      where: whereClause,
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ media });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to retrieve media library' }, { status: 500 });
  }
}

// POST upload one or multiple media files
export async function POST(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const files = formData.getAll('files') as File[];
    const altText = (formData.get('altText') as string) || '';

    if (!files || files.length === 0) {
      return NextResponse.json({ error: 'No files uploaded' }, { status: 400 });
    }

    const uploadDir = join(process.cwd(), 'public', 'uploads');
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }

    const savedRecords = [];

    for (const file of files) {
      // Validate MIME type
      const allowedMimes = ['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/svg+xml'];
      if (!allowedMimes.includes(file.type)) {
        continue;
      }

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Create unique clean filename
      const cleanOriginalName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
      const uniqueFilename = `${Date.now()}-${cleanOriginalName}`;
      const filePath = join(uploadDir, uniqueFilename);

      await writeFile(filePath, buffer);

      const url = `/uploads/${uniqueFilename}`;

      const mediaRecord = await prisma.media.create({
        data: {
          filename: cleanOriginalName,
          filepath: filePath,
          url: url,
          mimeType: file.type,
          fileSize: file.size,
          altText: altText || cleanOriginalName.split('.')[0].replace(/[-_]/g, ' '),
        },
      });

      savedRecords.push(mediaRecord);
    }

    return NextResponse.json({ success: true, count: savedRecords.length, media: savedRecords });
  } catch (error: any) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'File upload failed: ' + error.message }, { status: 500 });
  }
}

// PATCH update media metadata (altText, caption)
export async function PATCH(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { id, altText, caption } = body;

    if (!id) {
      return NextResponse.json({ error: 'Media ID required' }, { status: 400 });
    }

    const updated = await prisma.media.update({
      where: { id },
      data: {
        ...(altText !== undefined && { altText }),
        ...(caption !== undefined && { caption }),
      },
    });

    return NextResponse.json({ success: true, media: updated });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update media details' }, { status: 500 });
  }
}

// DELETE media item
export async function DELETE(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Media ID required' }, { status: 400 });
    }

    const media = await prisma.media.findUnique({ where: { id } });
    if (media) {
      // Try to remove physical file if exists
      if (existsSync(media.filepath)) {
        try {
          await unlink(media.filepath);
        } catch (e) {
          console.warn('Could not delete physical file:', media.filepath);
        }
      }
      await prisma.media.delete({ where: { id } });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete media item' }, { status: 500 });
  }
}
