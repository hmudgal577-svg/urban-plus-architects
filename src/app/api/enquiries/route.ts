import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

// Public Enquiry Submission
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, email, projectType, location, approxBudget, projectSize, message } = body;

    if (!name || !phone || !message) {
      return NextResponse.json(
        { error: 'Name, phone number, and project message are required.' },
        { status: 400 }
      );
    }

    const enquiry = await prisma.enquiry.create({
      data: {
        name: name.trim(),
        phone: phone.trim(),
        email: email ? email.trim() : null,
        projectType: projectType || 'Residential',
        location: location ? location.trim() : null,
        approxBudget: approxBudget ? approxBudget.trim() : null,
        projectSize: projectSize ? projectSize.trim() : null,
        message: message.trim(),
        status: 'NEW',
      },
    });

    return NextResponse.json({ success: true, enquiryId: enquiry.id }, { status: 201 });
  } catch (error: any) {
    console.error('Enquiry creation error:', error);
    return NextResponse.json(
      { error: 'Failed to record enquiry. Please try again.' },
      { status: 500 }
    );
  }
}

// Admin Enquiries Listing & CSV Export
export async function GET(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const status = searchParams.get('status');
  const format = searchParams.get('format');
  const search = searchParams.get('search');

  const whereClause: any = {};
  if (status && status !== 'ALL') {
    whereClause.status = status;
  }
  if (search) {
    whereClause.OR = [
      { name: { contains: search } },
      { phone: { contains: search } },
      { email: { contains: search } },
      { location: { contains: search } },
    ];
  }

  try {
    const enquiries = await prisma.enquiry.findMany({
      where: whereClause,
      orderBy: { createdAt: 'desc' },
    });

    // Handle CSV Export
    if (format === 'csv') {
      const headers = ['ID', 'Name', 'Phone', 'Email', 'ProjectType', 'Location', 'Budget', 'Size', 'Status', 'Date', 'Message'];
      const rows = enquiries.map((e) => [
        e.id,
        `"${e.name.replace(/"/g, '""')}"`,
        `"${e.phone}"`,
        `"${e.email || ''}"`,
        `"${e.projectType}"`,
        `"${e.location || ''}"`,
        `"${e.approxBudget || ''}"`,
        `"${e.projectSize || ''}"`,
        e.status,
        e.createdAt.toISOString(),
        `"${e.message.replace(/"/g, '""')}"`,
      ]);

      const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');

      return new NextResponse(csvContent, {
        status: 200,
        headers: {
          'Content-Type': 'text/csv; charset=utf-8',
          'Content-Disposition': `attachment; filename="urban-plus-enquiries-${new Date().toISOString().split('T')[0]}.csv"`,
        },
      });
    }

    return NextResponse.json({ enquiries });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch enquiries' }, { status: 500 });
  }
}

// Admin Update Enquiry Status / Notes
export async function PATCH(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { id, status, notes } = body;

    if (!id) {
      return NextResponse.json({ error: 'Enquiry ID is required' }, { status: 400 });
    }

    const updated = await prisma.enquiry.update({
      where: { id },
      data: {
        ...(status && { status }),
        ...(notes !== undefined && { notes }),
      },
    });

    return NextResponse.json({ success: true, enquiry: updated });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update enquiry' }, { status: 500 });
  }
}

// Admin Delete Enquiry
export async function DELETE(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Enquiry ID is required' }, { status: 400 });
    }

    await prisma.enquiry.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete enquiry' }, { status: 500 });
  }
}
