# Urban Plus Architects & Associates — Premium Architecture Website & CMS

A luxury, modern, editorial architecture portfolio and fully integrated CMS engineered for **Urban Plus Architects & Associates**, headquartered in Gwalior, Madhya Pradesh. Founded in 2012 by Principal Architect **Ar. Shailendra Bhadoria**.

---

## 🏛️ Project Overview

- **Studio**: Urban Plus Architects & Associates
- **Principal Architect**: Ar. Shailendra Bhadoria
- **Studio Location**: A-81, Aditya Puram, Opposite/Near DD Nagar, Deen Dayal Nagar, Gwalior, Madhya Pradesh – 474005
- **Email**: `urban.plusgwl@gmail.com`
- **Established**: 2012
- **Service Hubs**: Gwalior, Bhind, Dabra, Indore, Jhansi, Shivpuri

---

## ✨ Features & Architecture

### Public Experience
- **Cinematic Full-Screen Hero**: Slow scale architectural imagery, dark gradients, headline *"Designing Spaces. Shaping Experiences."*, dual CTAs, location & founding year indicator.
- **Studio Introduction**: Two-column layout with high-res photography and studio credentials.
- **Strictly Factual Stats**: 2012 Inception, Residential + Commercial, 6+ Cities Served, 360° Design Approach.
- **Selected Works**: Asymmetric editorial layout with live filter tabs (All, Residential, Commercial, Interior, Landscape, Visualization, Renovation).
- **Interactive Lightbox Gallery**: Fullscreen mode, keyboard navigation (Escape, Left/Right arrows), thumbnail strip.
- **11 Architectural Disciplines**: Architectural Design, Residential Building, Commercial Building, Interior Architecture, Landscape Design, Structural Engineering, Floor Planning, 3D CGI Visualization, Project Planning, Construction Supervision, and Renovation.
- **Process Timeline**: Detailed 8-phase architectural framework.
- **Contact & Lead Capture**: Server-validated enquiry form saving directly to the database, embedded Google Map, and floating WhatsApp consultation trigger.
- **Architectural 404 Page**: *"This space hasn’t been designed yet."*
- **SEO & Structured Data**: Schema.org JSON-LD (`ArchitectureFirm`, `ProfessionalService`, `Article`, `BreadcrumbList`), dynamic `sitemap.xml`, and `robots.txt`.

### Professional CMS / Admin Portal (`/admin`)
- **Authentication**: Secure HTTP-only cookie session with JSON Web Tokens (`jose`) and `bcryptjs` password hashing.
- **Dashboard Overview**: Metrics cards (Total Projects, Published, Drafts, Enquiries, Disciplines, Blog Posts, Media Assets) and interactive leads table.
- **Project CMS**: Full CRUD, slug generator, cover image, gallery frame manager, specifications table, and publish/draft switcher.
- **Media Library**: Drag-and-drop multi-image uploader to `/public/uploads/` with size/dimensions metadata, search, and URL copy.
- **Enquiries CRM**: Track client submissions, change statuses (`NEW`, `CONTACTED`, `IN_PROGRESS`, `CLOSED`), add follow-up notes, and export to CSV.
- **Blog / Insights CMS**: Publish architectural essays, design guides, and research.
- **Site Settings**: Live synchronization of studio address, phone, WhatsApp trigger, hero text, and social links.

---

## 🔑 Initial Admin Credentials

- **URL**: `http://localhost:3000/admin`
- **Email**: `admin@urbanplus.com`
- **Password**: `UrbanPlus@2026!`

*(A quick-fill shortcut is available on the login screen for testing).*

---

## 🚀 Quick Start & Development

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
Copy `.env.example` to `.env`:
```bash
DATABASE_URL="file:./dev.db"
JWT_SECRET="urban-plus-architects-super-secret-jwt-key-2026-jwt-gwalior"
ADMIN_INITIAL_EMAIL="admin@urbanplus.com"
ADMIN_INITIAL_PASSWORD="UrbanPlus@2026!"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

### 3. Initialize Database & Seed
```bash
npx prisma generate
npx prisma db push
npx prisma db seed
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the public site or [http://localhost:3000/admin](http://localhost:3000/admin) for the CMS.

### 5. Build for Production
```bash
npm run build
npm start
```
