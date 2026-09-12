import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding Urban Plus Architects & Associates database...');

  // 1. Admin User
  const adminPassword = await bcrypt.hash(process.env.ADMIN_INITIAL_PASSWORD || 'UrbanPlus@2026!', 10);
  const adminEmail = process.env.ADMIN_INITIAL_EMAIL || 'admin@urbanplus.com';

  const user = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      name: 'Ar. Shailendra Bhadoria (Admin)',
      password: adminPassword,
      role: 'ADMIN',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    },
  });
  console.log('Admin user seeded:', user.email);

  // 2. Site Settings
  await prisma.siteSettings.upsert({
    where: { id: 'default' },
    update: {},
    create: {
      id: 'default',
      studioName: 'Urban Plus Architects & Associates',
      principalArchitect: 'Ar. Shailendra Bhadoria',
      establishedYear: '2012',
      tagline: 'Designing Spaces. Shaping Experiences.',
      subheading:
        'Architecture, interiors and visualization crafted with precision, creativity and a distinctly modern vision.',
      heroImage:
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=85',
      address:
        'A-81, Aditya Puram, Opposite/Near DD Nagar, Deen Dayal Nagar, Gwalior, Madhya Pradesh – 474005',
      email: 'urban.plusgwl@gmail.com',
      phone: '+91 751 245 0000',
      whatsappNumber: '919826200000',
      whatsappMessage:
        'Hello Urban Plus Architects, I would like to discuss a new architecture/design project.',
      serviceAreas: 'Gwalior, Bhind, Dabra, Indore, Jhansi, Shivpuri',
      googleMapsUrl:
        'https://maps.google.com/?q=Aditya+Puram+Deen+Dayal+Nagar+Gwalior+474005',
      googleMapsEmbedUrl:
        'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3578.4372993077717!2d78.205282!3d26.237248!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3976c6bbd8bca61f%3A0x6b07da29b2ffbf00!2sDeen%20Dayal%20Nagar%2C%20Gwalior%2C%20Madhya%20Pradesh%20474005!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin',
      footerText:
        'Urban Plus Architects & Associates is a Gwalior-based architecture and building-design studio established in 2012, working across residential and commercial architecture, interiors, planning and visualization.',
    },
  });

  // 3. Categories
  const categoryNames = [
    { name: 'Residential', slug: 'residential', order: 1 },
    { name: 'Commercial', slug: 'commercial', order: 2 },
    { name: 'Interior', slug: 'interior', order: 3 },
    { name: 'Landscape', slug: 'landscape', order: 4 },
    { name: '3D Visualization', slug: 'visualization', order: 5 },
    { name: 'Renovation', slug: 'renovation', order: 6 },
  ];

  const categoriesMap: Record<string, string> = {};
  for (const cat of categoryNames) {
    const c = await prisma.category.upsert({
      where: { slug: cat.slug },
      update: { name: cat.name, order: cat.order },
      create: { name: cat.name, slug: cat.slug, order: cat.order },
    });
    categoriesMap[cat.slug] = c.id;
  }
  console.log('Categories seeded.');

  // 4. Services (All 11 required services)
  const servicesList = [
    {
      title: 'Architectural Design',
      slug: 'architectural-design',
      tagline: 'Visionary architecture rooted in context and modern aesthetics',
      shortDescription:
        'Concept development, planning and complete architectural design engineered for enduring elegance.',
      fullDescription:
        'Our architectural design methodology unifies spatial intelligence, climate responsiveness, and striking contemporary geometry. We guide projects from initial site appraisal and volumetric studies to comprehensive working drawings and technical specifications.',
      coverImage:
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      icon: 'Building',
      order: 1,
      features: JSON.stringify([
        'Master Concept & Spatial Massing',
        'Zoning & Comprehensive Site Planning',
        'Climatic Orientation & Daylight Optimization',
        'Complete Structural & Architectural Blueprints',
      ]),
    },
    {
      title: 'Residential Building Design',
      slug: 'residential-building-design',
      tagline: 'Bespoke modern homes, luxury villas and residential sanctuaries',
      shortDescription:
        'Modern homes, villas and residential developments balancing privacy, nature and contemporary luxury.',
      fullDescription:
        'We craft residences that serve as personal sanctuaries. Each home is conceived with bespoke spatial sequencing, double-height courtyards, filtered natural light, and refined material palettes.',
      coverImage:
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
      icon: 'Home',
      order: 2,
      features: JSON.stringify([
        'Contemporary Villa & Bungalow Architecture',
        'Multi-Generation Residential Layouts',
        'Private Courtyard & Waterbody Integration',
        'Vastu-Compliant Spatial Balancing',
      ]),
    },
    {
      title: 'Commercial Building Design',
      slug: 'commercial-building-design',
      tagline: 'High-impact commercial landmarks engineered for productivity and brand identity',
      shortDescription:
        'Functional and visually strong commercial spaces designed for commerce, collaboration and identity.',
      fullDescription:
        'Commercial architecture must communicate corporate prestige while maximizing floor plate efficiency, pedestrian flow, and compliance. We deliver corporate offices, retail hubs, and mixed-use commercial destinations.',
      coverImage:
        'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
      icon: 'Briefcase',
      order: 3,
      features: JSON.stringify([
        'Corporate Headquarters & Office Towers',
        'High-Street Retail & Commercial Showrooms',
        'Optimized Floor Plates & Vertical Circulation',
        'Facade Engineering & High-Efficiency Glass Systems',
      ]),
    },
    {
      title: 'Interior Design',
      slug: 'interior-design',
      tagline: 'Tactile, serene interiors celebrating texture, light and bespoke craftsmanship',
      shortDescription:
        'Thoughtful interiors balancing aesthetics, functionality, acoustic comfort and fine materiality.',
      fullDescription:
        'Our interior design practice treats internal volumes as an unbroken continuation of architectural form. We orchestrate custom millwork, ambient lighting schemes, curated stone and timber textures, and ergonomic furniture layouts.',
      coverImage:
        'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
      icon: 'Armchair',
      order: 4,
      features: JSON.stringify([
        'Curated Material & Finish Palettes',
        'Custom Millwork & Architectural Joinery',
        'Architectural Lighting & Ceiling Design',
        'Luxury Kitchen & Bath Suite Detailing',
      ]),
    },
    {
      title: 'Landscape Design',
      slug: 'landscape-design',
      tagline: 'Harmonious outdoor spaces seamlessly interwoven with built architecture',
      shortDescription:
        'Outdoor spaces integrated with architecture, celebrating native flora, stone paving and serenity.',
      fullDescription:
        'We believe landscape design is integral to architectural serenity. From drought-tolerant indigenous plantings to sculptural reflection pools and pergolas, our landscape architecture extends living zones seamlessly outdoors.',
      coverImage:
        'https://images.unsplash.com/photo-1558904541-efa8c4a5c9a1?auto=format&fit=crop&w=1200&q=80',
      icon: 'Trees',
      order: 5,
      features: JSON.stringify([
        'Hardscape & Softscape Master Planning',
        'Water Features, Reflective Pools & Fountains',
        'Pergolas, Terraces & Outdoor Living Pavilions',
        'Native Flora & Low-Maintenance Irrigation Systems',
      ]),
    },
    {
      title: 'Structural Design',
      slug: 'structural-design',
      tagline: 'Rigorous engineering ensuring architectural boldness with rock-solid stability',
      shortDescription:
        'Technical planning and structural coordination for resilient, future-ready edifices.',
      fullDescription:
        'Bold architectural cantilevers, open column-free spaces, and soaring double heights require precision structural coordination. We engineer robust RCC and steel structural systems adhering to seismic and wind load benchmarks.',
      coverImage:
        'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=1200&q=80',
      icon: 'Shield',
      order: 6,
      features: JSON.stringify([
        'Reinforced Concrete (RCC) Structural Analysis',
        'Steel Truss & Long-Span Cantilever Solutions',
        'Seismic & Soil-Load Geotechnical Coordination',
        'Foundation & Column Optimization',
      ]),
    },
    {
      title: 'Floor Planning',
      slug: 'floor-planning',
      tagline: 'Scientific spatial layouts optimizing circulation, natural light and usable area',
      shortDescription:
        'Efficient spatial planning and optimized layouts designed for modern living patterns.',
      fullDescription:
        'Floor planning is the bedrock of comfortable human habitats. We eliminate dead zones, curate logical movement axes, optimize natural cross-ventilation, and align spaces with functional rituals.',
      coverImage:
        'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80',
      icon: 'Layout',
      order: 7,
      features: JSON.stringify([
        'Circulation & Movement Flow Optimization',
        'Natural Cross-Ventilation Analysis',
        'Dimensional Precision & Furniture Clearances',
        'Modular & Adaptable Spatial Zoning',
      ]),
    },
    {
      title: '3D Exterior & Interior Visualization',
      slug: '3d-visualization',
      tagline: 'Photorealistic architectural CGI that brings unbuilt visions into vivid reality',
      shortDescription:
        'High-quality visualization for understanding the final design before construction commences.',
      fullDescription:
        'Our state-of-the-art 3D CGI and visualization studio produces cinematic renders, virtual lighting studies, and walkthroughs that eliminate ambiguity and empower clients to make informed design decisions.',
      coverImage:
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
      icon: 'Eye',
      order: 8,
      features: JSON.stringify([
        'Hyper-Realistic Daytime & Nighttime Renders',
        'True-to-Life Material & Texture Calibration',
        'Accurate Sun-Angle & Shadow Simulation',
        'Cinematic Interior Spatial Walkthroughs',
      ]),
    },
    {
      title: 'Project Planning',
      slug: 'project-planning',
      tagline: 'Comprehensive design coordination, timelines and milestone roadmaps',
      shortDescription:
        'Design coordination and project planning ensuring streamlined transitions from draft to build.',
      fullDescription:
        'Clear project planning safeguards architectural intent against unforeseen site delays and budget overruns. We formulate BOQ estimates, milestone schedules, and contractor design packages.',
      coverImage:
        'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80',
      icon: 'Calendar',
      order: 9,
      features: JSON.stringify([
        'Detailed Bill of Quantities (BOQ) Preparation',
        'Phased Construction Roadmaps & Milestones',
        'Vendor & Specialist Contractor Coordination',
        'Material Specification & Procurement Schedules',
      ]),
    },
    {
      title: 'Construction Supervision',
      slug: 'construction-supervision',
      tagline: 'Meticulous on-site monitoring ensuring design fidelity down to the millimeter',
      shortDescription:
        'Professional monitoring and coordination during execution to ensure uncompromised quality.',
      fullDescription:
        'Great architecture only manifests when execution matches drawing accuracy. Our team performs routine site audits, verifies joinery tolerances, checks concrete pouring, and clarifies details on-site.',
      coverImage:
        'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80',
      icon: 'CheckCircle2',
      order: 10,
      features: JSON.stringify([
        'Periodic Site Inspection & Quality Audits',
        'Architectural Tolerance & Joinery Verification',
        'Resolution of On-Site Structural Conflicts',
        'Sign-Off on Finishing & Material Installation',
      ]),
    },
    {
      title: 'Renovation & Remodelling',
      slug: 'renovation-remodelling',
      tagline: 'Reinventing heritage and dated structures into breathtaking modern environments',
      shortDescription:
        'Transforming existing spaces through modern design solutions, structural retrofits and renewed identity.',
      fullDescription:
        'We breathe new vitality into existing buildings. Through strategic structural alterations, opening up interior walls, and retrofitting sleek facades, we transform legacy properties into contemporary marvels.',
      coverImage:
        'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
      icon: 'RefreshCw',
      order: 11,
      features: JSON.stringify([
        'Structural Feasibility & Demolition Assessment',
        'Facade Modernization & Exterior Overhauls',
        'Space Reconfiguration & Open-Plan Conversions',
        'Infrastructure & Energy-Efficiency Retrofits',
      ]),
    },
  ];

  for (const s of servicesList) {
    await prisma.service.upsert({
      where: { slug: s.slug },
      update: s,
      create: s,
    });
  }
  console.log('Services seeded.');

  // 5. Featured Projects (Realistic Architectural Demo Projects)
  // Clearly documented in comments and tags as concept/demo placeholders for admin customisation
  const projectsData = [
    {
      title: 'The Glass Courtyard Villa',
      slug: 'the-glass-courtyard-villa',
      location: 'City Center, Gwalior',
      category: 'Residential',
      year: '2024',
      shortDescription:
        'A monolithic modern villa organized around a central double-height glass atrium, balancing privacy with lush nature.',
      fullDescription:
        'Conceived as a tranquil retreat amidst the vibrant urban rhythm of Gwalior, The Glass Courtyard Villa reinterprets traditional Indian courtyard typologies through an uncompromising modernist lens. Clean concrete volumes cantilever over sunken garden terraces, while floor-to-ceiling high-performance glazing floods the interior with natural light.',
      designConcept:
        'The architecture prioritizes thermal comfort and visual transparency. An internal landscaped court acts as a microclimate buffer, creating passive air circulation throughout the living, dining, and family suites.',
      challenges:
        'Balancing expansive transparency with privacy from surrounding residential roads while buffering harsh Central India summer heat.',
      solution:
        'Deep architectural overhangs, motorized horizontal louvers, and a inward-focused spatial orientation wrapped in textured beige travertine stone.',
      status: 'PUBLISHED',
      isFeatured: true,
      coverImage:
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85',
      gallery: JSON.stringify([
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85',
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=85',
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85',
        'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=85',
        'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1600&q=85',
      ]),
      floorPlans: JSON.stringify([
        { title: 'Ground Level Plan', image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80' },
        { title: 'First Level Master Suite', image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80' },
      ]),
      elevations: JSON.stringify([
        { title: 'North Elevation', image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80' },
      ]),
      interiorImages: JSON.stringify([
        'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
      ]),
      exteriorImages: JSON.stringify([
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
      ]),
      renders3D: JSON.stringify([
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
      ]),
      beforeAfter: JSON.stringify([
        {
          label: 'Rear Terrace Elevation',
          before: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1000&q=80',
          after: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80',
        },
      ]),
      specifications: JSON.stringify([
        { label: 'Built-up Area', value: '7,200 sq. ft.' },
        { label: 'Site Area', value: '10,500 sq. ft.' },
        { label: 'Structural System', value: 'RCC Monolithic Frame with Post-Tensioned Slabs' },
        { label: 'Primary Materials', value: 'Exposed Concrete, Gwalior Sandstone, DGU Glass' },
        { label: 'Location', value: 'Gwalior, Madhya Pradesh' },
      ]),
      client: 'Private Residence (Concept)',
      projectSize: '7,200 sq. ft.',
      seoTitle: 'The Glass Courtyard Villa | Luxury Modern Architecture in Gwalior',
      seoDescription: 'Explore The Glass Courtyard Villa by Urban Plus Architects & Associates, Gwalior.',
      altText: 'Contemporary luxury villa exterior with illuminated glass courtyard in Gwalior',
      order: 1,
      categorySlug: 'residential',
    },
    {
      title: 'Zenith Corporate Headquarters',
      slug: 'zenith-corporate-headquarters',
      location: 'AB Road, Indore',
      category: 'Commercial',
      year: '2023',
      shortDescription:
        'A sculptural high-performance commercial headquarters defined by an expressive double-skin aerodynamic facade.',
      fullDescription:
        'Rising as a dynamic architectural statement on Indore’s prominent commercial corridor, Zenith Headquarters establishes a new standard for sustainable workplace architecture. The tower integrates high-efficiency open plans, biophilic executive sky lounges, and a responsive solar facade.',
      designConcept:
        'Sculptural rhythm and climatic mitigation drive the exterior form. An articulated geometric louvre system reduces thermal solar gain by 40% while preserving panoramic urban vistas.',
      challenges:
        'Strict site setbacks and intensive parking requirements coupled with the client desire for dramatic street-level presence.',
      solution:
        'Elevated structural pilotis that open up a covered drop-off plaza, paired with two underground automated parking decks.',
      status: 'PUBLISHED',
      isFeatured: true,
      coverImage:
        'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=85',
      gallery: JSON.stringify([
        'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=85',
        'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=85',
        'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1600&q=85',
      ]),
      floorPlans: JSON.stringify([
        { title: 'Typical Corporate Floor Plate', image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80' },
      ]),
      elevations: JSON.stringify([
        { title: 'West Street Elevation', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80' },
      ]),
      interiorImages: JSON.stringify([
        'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
      ]),
      exteriorImages: JSON.stringify([
        'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
      ]),
      renders3D: JSON.stringify([]),
      beforeAfter: JSON.stringify([]),
      specifications: JSON.stringify([
        { label: 'Total Super Area', value: '45,000 sq. ft.' },
        { label: 'Number of Floors', value: 'G + 7 Commercial' },
        { label: 'Facade System', value: 'Unitized Curtain Wall with Terracotta Sun-Breaks' },
        { label: 'Energy Rating', value: 'Designed for GRIHA 4-Star Standards' },
      ]),
      client: 'Corporate Commercial Group',
      projectSize: '45,000 sq. ft.',
      seoTitle: 'Zenith Corporate Headquarters | Urban Plus Architects',
      seoDescription: 'Modern sustainable commercial building design in Central India.',
      altText: 'Modern commercial office tower with striking architectural glass facade in Indore',
      order: 2,
      categorySlug: 'commercial',
    },
    {
      title: 'Oasis Minimalist Penthouse',
      slug: 'oasis-minimalist-penthouse',
      location: 'Deen Dayal Nagar, Gwalior',
      category: 'Interior',
      year: '2024',
      shortDescription:
        'A serene penthouse interior celebrating quiet luxury, fluted oak paneling, micro-cement finishes, and concealed lighting.',
      fullDescription:
        'This penthouse interior was designed as a sanctuary of pure calm. Stepping away from ornamental clutter, every surface is curated with tactile natural materials: warm beige micro-cement floors, brushed brass hardware, smoked oak cabinetry, and customized soft linen draperies.',
      designConcept:
        'Seamless continuity: door frames are fully recessed, ceiling coves cast an ethereal diffuse glow, and storage is completely concealed within architectural wall planes.',
      challenges:
        'Integrating comprehensive smart home automation, concealed VRF ducted AC, and acoustic dampening without dropping ceiling heights.',
      solution:
        'Carefully zoned ceiling bulkheads trimmed in dark metal channels that serve simultaneously as return-air grilles and architectural reveals.',
      status: 'PUBLISHED',
      isFeatured: true,
      coverImage:
        'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=85',
      gallery: JSON.stringify([
        'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=85',
        'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=85',
        'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1600&q=85',
      ]),
      floorPlans: JSON.stringify([]),
      elevations: JSON.stringify([]),
      interiorImages: JSON.stringify([
        'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80',
      ]),
      exteriorImages: JSON.stringify([]),
      renders3D: JSON.stringify([]),
      beforeAfter: JSON.stringify([]),
      specifications: JSON.stringify([
        { label: 'Apartment Area', value: '4,200 sq. ft.' },
        { label: 'Scope', value: 'Full Interior Architecture & Custom Millwork' },
        { label: 'Primary Finishes', value: 'Italian Travertine, Micro-Cement, Fluted White Oak' },
      ]),
      client: 'Private Residence (Concept)',
      projectSize: '4,200 sq. ft.',
      seoTitle: 'Oasis Minimalist Penthouse Interior | Urban Plus Architects Gwalior',
      seoDescription: 'Refined modern minimalist penthouse interior design in Gwalior.',
      altText: 'Minimalist luxury living room interior with fluted oak and warm ambient lighting',
      order: 3,
      categorySlug: 'interior',
    },
    {
      title: 'Heritage Horizon Pavilion & Grounds',
      slug: 'heritage-horizon-pavilion-and-grounds',
      location: 'Jhansi Road Corridor, Jhansi',
      category: 'Landscape',
      year: '2023',
      shortDescription:
        'An expansive landscape and outdoor pavilion architecture interweaving native flora, stone reflection channels and shade pergolas.',
      fullDescription:
        'Set on a sprawling 3-acre property, Heritage Horizon balances the rugged regional geology of the Bundelkhand plateau with refined contemporary landscape interventions. A series of terraced reflection pools guide visitors toward an open-air architectural pavilion.',
      designConcept:
        'Earth, stone, and water dialogue: using local quarry stone for dry-stacked retaining walls, contrasting with sleek cantilevered corten steel pergolas.',
      challenges:
        'Extreme dry season temperatures and high water-table fluctuations.',
      solution:
        'Bio-swales and rainwater catchment basins that feed native drought-tolerant landscaping year-round with zero municipal water strain.',
      status: 'PUBLISHED',
      isFeatured: false,
      coverImage:
        'https://images.unsplash.com/photo-1558904541-efa8c4a5c9a1?auto=format&fit=crop&w=1600&q=85',
      gallery: JSON.stringify([
        'https://images.unsplash.com/photo-1558904541-efa8c4a5c9a1?auto=format&fit=crop&w=1600&q=85',
        'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=85',
      ]),
      floorPlans: JSON.stringify([]),
      elevations: JSON.stringify([]),
      interiorImages: JSON.stringify([]),
      exteriorImages: JSON.stringify([
        'https://images.unsplash.com/photo-1558904541-efa8c4a5c9a1?auto=format&fit=crop&w=1200&q=80',
      ]),
      renders3D: JSON.stringify([]),
      beforeAfter: JSON.stringify([]),
      specifications: JSON.stringify([
        { label: 'Site Area', value: '3.2 Acres' },
        { label: 'Pavilion Area', value: '2,800 sq. ft.' },
        { label: 'Key Elements', value: 'Reflecting Pools, Bio-Retention Basins, Amphitheater' },
      ]),
      client: 'Private Estate',
      projectSize: '3.2 Acres',
      seoTitle: 'Heritage Horizon Pavilion & Grounds | Urban Plus Architects',
      seoDescription: 'Landscape architecture and outdoor pavilion design in Jhansi region.',
      altText: 'Architectural outdoor pavilion overlooking serene landscaped reflection pool',
      order: 4,
      categorySlug: 'landscape',
    },
    {
      title: 'The Monolith Contemporary Residence',
      slug: 'the-monolith-contemporary-residence',
      location: 'Dabra Suburb',
      category: '3D Visualization',
      year: '2024',
      shortDescription:
        'A futuristic residential study exploring dramatic geometric cantilevered volumes, board-formed concrete, and black slate.',
      fullDescription:
        'The Monolith was conceived as an avant-garde exploration of architectural massing. Through high-fidelity CGI visual simulations, we tested varying degrees of cantilever over a zero-edge infinity pool before structural fabrication.',
      designConcept:
        'Sculptural tension: a massive 8-meter upper cantilever appears to float weightlessly above a recessed, shadowed glass base.',
      challenges:
        'Validating sunlight penetration, structural stress points, and facade glare through 3D photometric studies.',
      solution:
        'Iterative 3D visualization allowed the engineering team to optimize post-tensioned steel anchors without compromising the razor-sharp aesthetic profile.',
      status: 'PUBLISHED',
      isFeatured: true,
      coverImage:
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85',
      gallery: JSON.stringify([
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85',
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85',
      ]),
      floorPlans: JSON.stringify([]),
      elevations: JSON.stringify([]),
      interiorImages: JSON.stringify([]),
      exteriorImages: JSON.stringify([]),
      renders3D: JSON.stringify([
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
      ]),
      beforeAfter: JSON.stringify([]),
      specifications: JSON.stringify([
        { label: 'Concept Area', value: '8,500 sq. ft.' },
        { label: 'Visualization Engine', value: 'High-Fidelity Architectural Ray-Tracing' },
        { label: 'Key Challenge', value: '8m Cantilever Equilibrium' },
      ]),
      client: 'Futuristic Residential Study (Visualization)',
      projectSize: '8,500 sq. ft.',
      seoTitle: 'The Monolith Residence Visualization | Urban Plus Architects',
      seoDescription: 'High-end 3D architectural visualization and concept design.',
      altText: 'Photorealistic 3D render of futuristic cantilevered home with infinity pool',
      order: 5,
      categorySlug: 'visualization',
    },
    {
      title: 'The Adaptive Brick Manor',
      slug: 'the-adaptive-brick-manor',
      location: 'Shivpuri Road, Bhind',
      category: 'Renovation',
      year: '2023',
      shortDescription:
        'A comprehensive remodelling of a 1980s family manor, introducing double-height brick jaali screens and modern open-plan living.',
      fullDescription:
        'This ambitious remodelling project took a compartmentalized, dark 1980s brick structure and breathed expansive modern life into its bones. We preserved the load-bearing masonry cores while carving out massive vertical light wells and wrapping the facade in an engineered brick jaali screen.',
      designConcept:
        'Honoring heritage while drastically modernizing function: the perforated brick screen pays homage to classical Indian architecture while filtering blinding sun and heat.',
      challenges:
        'Restructuring aging slab joints and creating large open spaces without compromising load-bearing integrity.',
      solution:
        'Strategic installation of concealed structural steel I-beams that allowed removal of interior dividing walls while safely supporting the upper floors.',
      status: 'PUBLISHED',
      isFeatured: true,
      coverImage:
        'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=85',
      gallery: JSON.stringify([
        'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=85',
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85',
      ]),
      floorPlans: JSON.stringify([]),
      elevations: JSON.stringify([]),
      interiorImages: JSON.stringify([]),
      exteriorImages: JSON.stringify([]),
      renders3D: JSON.stringify([]),
      beforeAfter: JSON.stringify([
        {
          label: 'Front Facade Transformation',
          before: 'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=1000&q=80',
          after: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1000&q=80',
        },
      ]),
      specifications: JSON.stringify([
        { label: 'Existing Structure', value: '1984 Load-Bearing Masonry' },
        { label: 'Remodelled Area', value: '5,800 sq. ft.' },
        { label: 'Energy Savings', value: '35% reduction in cooling load via Jaali facade' },
      ]),
      client: 'Private Residence Renovation',
      projectSize: '5,800 sq. ft.',
      seoTitle: 'The Adaptive Brick Manor Renovation | Urban Plus Architects',
      seoDescription: 'Heritage remodelling and contemporary facade transformation in MP.',
      altText: 'Modernized brick home exterior with perforated clay jaali screens in Central India',
      order: 6,
      categorySlug: 'renovation',
    },
  ];

  for (const proj of projectsData) {
    const { categorySlug, ...rest } = proj;
    const createdProject = await prisma.project.upsert({
      where: { slug: rest.slug },
      update: rest,
      create: rest,
    });

    const categoryId = categoriesMap[categorySlug];
    if (categoryId) {
      await prisma.projectCategoryAssignment.upsert({
        where: {
          projectId_categoryId: {
            projectId: createdProject.id,
            categoryId,
          },
        },
        update: {},
        create: {
          projectId: createdProject.id,
          categoryId,
        },
      });
    }
  }
  console.log('Projects seeded.');

  // 6. Blog Posts / Insights
  const blogPosts = [
    {
      title: 'Designing for Climate: Passive Solar & Courtyard Dynamics in Central India',
      slug: 'designing-for-climate-passive-solar-courtyard-dynamics',
      summary:
        'How contemporary architectural planning in Gwalior and Madhya Pradesh can harness centuries-old microclimate wisdom with modern precision.',
      content: `## The Climate Imperative in Central India

In regions like Gwalior, Bhind, and Indore, summer temperatures regularly cross 42°C, while winter nights require cozy thermal retention. Modern architecture cannot simply rely on heavy air conditioning; it must be intelligently sculpted from the ground up to regulate its own environment.

### The Courtyard Reimagined
The traditional Indian *aangan* (courtyard) was not merely a romantic cultural hub; it functioned as a sophisticated thermal siphon. By integrating double-height glass atriums with high-level motorized louvers, warm air naturally vents out, pulling cool air from shaded garden pockets.

### Strategic Overhangs and Solar Pathing
Calculating exact solstice and equinox solar angles allows architects to design horizontal cantilevers that block harsh high-noon summer sunlight completely, while welcoming low-angle gentle winter warmth deep into living rooms.

### Material Thermal Mass
Exposed local sandstone, hollow terracotta clay blocks, and cavity wall construction buffer intense daytime radiant heat, radiating comfort during cooler night hours.`,
      coverImage:
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      author: 'Ar. Shailendra Bhadoria',
      category: 'Architecture',
      tags: 'Passive Architecture, Climate Design, Gwalior Architecture, Sustainable Living',
      seoTitle: 'Designing for Climate in Central India | Urban Plus Architects',
      seoDescription: 'Sustainable architecture and passive climate strategies for homes in Gwalior and MP.',
    },
    {
      title: 'The Seamless Transition: Harmonizing Interior Architecture with Exterior Form',
      slug: 'seamless-transition-harmonizing-interior-with-exterior',
      summary:
        'Why true luxury is found when internal spaces, materials, and sightlines are conceived in unison with the building facade.',
      content: `## Beyond Interior Decoration

Too often in traditional construction, the building envelope is designed by an architect, and then handed over to an interior decorator to paste finishes onto arbitrarily placed walls. 

At Urban Plus Architects, we treat interior architecture and exterior massing as a single continuous gesture.

### Unbroken Materiality
When an exterior travertine wall extends directly through high-performance frameless glass into the living foyer, the psychological boundary between inside and outside vanishes. Spaces feel twice as large and deeply grounded in their environment.

### Framing the View
Window placement should never be arbitrary. We carefully orchestrate sightlines from seating heights, reading nooks, and bed headboards so that every glance outside frames lush greenery, tranquil water, or sculptural architectural shadows.`,
      coverImage:
        'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
      author: 'Ar. Shailendra Bhadoria',
      category: 'Interiors',
      tags: 'Interior Architecture, Minimalist Living, Modern Indian Homes, Luxury Interiors',
      seoTitle: 'Harmonizing Interior and Exterior Architecture | Urban Plus Insights',
      seoDescription: 'Learn how integrated interior design creates tranquil and cohesive luxury spaces.',
    },
    {
      title: 'From Blueprint to Reality: The Essential Stages of Architectural Planning',
      slug: 'from-blueprint-to-reality-essential-stages-of-architectural-planning',
      summary:
        'A comprehensive guide for clients embarking on constructing their dream home or commercial headquarters.',
      content: `## Demystifying the Architectural Journey

Building a bespoke residence or commercial landmark is often a once-in-a-lifetime endeavor. Understanding the architectural stages ensures transparency, peace of mind, and uncompromised quality.

### Phase 1: Site Analysis & Vision Alignment
Every great building begins with listening. We analyze soil profiles, solar orientations, wind vectors, and municipal zoning, aligning these technical factors with your functional aspirations.

### Phase 2: Schematic Concept & 3D Spatial Modeling
Ideas are transformed into 3D massing studies. You experience spatial volumes, ceiling heights, and circulation patterns long before concrete is poured.

### Phase 3: Detail Engineering & BOQ Precision
A great design requires exact structural, electrical, plumbing, and HVAC engineering. Comprehensive Bill of Quantities (BOQ) prevent mid-construction budget shocks.

### Phase 4: Construction Supervision
Design fidelity requires constant on-site stewardship to ensure the built reality matches the millimeter precision of the digital model.`,
      coverImage:
        'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80',
      author: 'Ar. Shailendra Bhadoria',
      category: 'Planning',
      tags: 'Architectural Planning, Construction Guide, Project Management, Home Building',
      seoTitle: 'Essential Stages of Architectural Planning | Urban Plus Architects',
      seoDescription: 'Step-by-step roadmap from initial concept to construction supervision.',
    },
  ];

  for (const post of blogPosts) {
    await prisma.blogPost.upsert({
      where: { slug: post.slug },
      update: post,
      create: post,
    });
  }
  console.log('Blog posts seeded.');

  // 7. Sample Initial Enquiries
  const sampleEnquiries = [
    {
      name: 'Vikramaditya Sharma',
      phone: '+91 98930 11223',
      email: 'vikram.sharma@example.com',
      projectType: 'Residential',
      location: 'City Center, Gwalior',
      approxBudget: '₹1.5 Cr - ₹2.5 Cr',
      projectSize: '5,500 sq. ft.',
      message:
        'We have recently acquired a corner plot in Gwalior and want to build a modern 4-BHK villa with an internal courtyard and rooftop lap pool. Looking for complete architectural planning and construction supervision.',
      status: 'NEW',
      notes: 'High priority lead. Client wants initial consultation on weekend.',
    },
    {
      name: 'Sunita Jain',
      phone: '+91 94251 44556',
      email: 'sunita.jain@example.com',
      projectType: 'Interior',
      location: 'Deen Dayal Nagar, Gwalior',
      approxBudget: '₹40 Lakh - ₹60 Lakh',
      projectSize: '3,200 sq. ft.',
      message:
        'Seeking comprehensive interior design and custom millwork for our newly constructed penthouse apartment. Prefer minimal, warm contemporary style with wooden accents.',
      status: 'CONTACTED',
      notes: 'Sent preliminary portfolio catalog. Meeting scheduled for Tuesday.',
    },
  ];

  for (const enq of sampleEnquiries) {
    await prisma.enquiry.create({
      data: enq,
    });
  }
  console.log('Sample enquiries seeded.');

  console.log('Urban Plus database seed completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
