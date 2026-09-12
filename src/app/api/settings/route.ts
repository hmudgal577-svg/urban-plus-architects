import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

// GET settings (can be public or authenticated)
export async function GET() {
  try {
    const settings = await prisma.siteSettings.findUnique({
      where: { id: 'default' },
    });
    return NextResponse.json({ settings });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 });
  }
}

// PUT update settings (Admin Only)
export async function PUT(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const {
      studioName,
      principalArchitect,
      establishedYear,
      tagline,
      subheading,
      heroImage,
      address,
      email,
      phone,
      whatsappNumber,
      whatsappMessage,
      serviceAreas,
      googleMapsUrl,
      googleMapsEmbedUrl,
      facebookUrl,
      instagramUrl,
      linkedinUrl,
      youtubeUrl,
      footerText,
    } = body;

    const updated = await prisma.siteSettings.upsert({
      where: { id: 'default' },
      update: {
        ...(studioName !== undefined && { studioName }),
        ...(principalArchitect !== undefined && { principalArchitect }),
        ...(establishedYear !== undefined && { establishedYear }),
        ...(tagline !== undefined && { tagline }),
        ...(subheading !== undefined && { subheading }),
        ...(heroImage !== undefined && { heroImage }),
        ...(address !== undefined && { address }),
        ...(email !== undefined && { email }),
        ...(phone !== undefined && { phone }),
        ...(whatsappNumber !== undefined && { whatsappNumber }),
        ...(whatsappMessage !== undefined && { whatsappMessage }),
        ...(serviceAreas !== undefined && { serviceAreas }),
        ...(googleMapsUrl !== undefined && { googleMapsUrl }),
        ...(googleMapsEmbedUrl !== undefined && { googleMapsEmbedUrl }),
        ...(facebookUrl !== undefined && { facebookUrl }),
        ...(instagramUrl !== undefined && { instagramUrl }),
        ...(linkedinUrl !== undefined && { linkedinUrl }),
        ...(youtubeUrl !== undefined && { youtubeUrl }),
        ...(footerText !== undefined && { footerText }),
      },
      create: {
        id: 'default',
        studioName: studioName || 'Urban Plus Architects & Associates',
        principalArchitect: principalArchitect || 'Ar. Shailendra Bhadoria',
        establishedYear: establishedYear || '2012',
        tagline: tagline || 'Designing Spaces. Shaping Experiences.',
        subheading: subheading || 'Architecture, interiors and visualization crafted with precision, creativity and a distinctly modern vision.',
        heroImage: heroImage || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
        address: address || 'A-81, Aditya Puram, Opposite/Near DD Nagar, Deen Dayal Nagar, Gwalior, Madhya Pradesh – 474005',
        email: email || 'urban.plusgwl@gmail.com',
        phone: phone || '+91 751 245 0000',
        whatsappNumber: whatsappNumber || '919826200000',
        whatsappMessage: whatsappMessage || 'Hello Urban Plus Architects, I would like to discuss a new architecture/design project.',
        serviceAreas: serviceAreas || 'Gwalior, Bhind, Dabra, Indore, Jhansi, Shivpuri',
        googleMapsUrl: googleMapsUrl || 'https://maps.google.com',
        googleMapsEmbedUrl: googleMapsEmbedUrl || '',
        facebookUrl,
        instagramUrl,
        linkedinUrl,
        youtubeUrl,
        footerText: footerText || 'Urban Plus Architects & Associates Gwalior',
      },
    });

    return NextResponse.json({ success: true, settings: updated });
  } catch (error: any) {
    console.error('Settings update error:', error);
    return NextResponse.json({ error: 'Failed to update settings: ' + error.message }, { status: 500 });
  }
}
