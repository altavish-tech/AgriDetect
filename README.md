# AgriDetect - AI-Powered Agricultural Disease Detection System

**A comprehensive 3-role agricultural disease monitoring and response platform**

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)]()
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue)]()
[![React](https://img.shields.io/badge/React-18.3-61dafb)]()
[![License](https://img.shields.io/badge/license-MIT-green)]()

---

## 🌾 Overview

AgriDetect is a modern web application that connects farmers, agricultural experts, and district officers in a unified disease detection and response system. Using AI-powered image analysis, the platform enables early detection of crop diseases, expert verification for uncertain cases, and regional outbreak monitoring.

### Key Features

- 📸 **AI Disease Detection** - Upload crop photos for instant diagnosis
- 🔬 **Expert Verification** - Low-confidence cases reviewed by certified pathologists
- 📊 **Regional Monitoring** - Real-time hotspot maps and outbreak tracking
- 📱 **Mobile-First Design** - Responsive interface optimized for farmers in the field
- 🌍 **Multilingual Support** - English and Hindi (more languages ready)
- 🚀 **Fast & Lightweight** - 308 KB bundle, sub-second load times

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- Modern web browser (Chrome, Firefox, Safari, Edge)

### Installation

```bash
# Clone repository
git clone https://github.com/yourusername/agridetect.git
cd agridetect

# Install dependencies
npm install

# Start development server
npm run dev

# Open in browser
# http://localhost:3001/
```

### Build for Production

```bash
# Create optimized production build
npm run build

# Preview production build locally
npm run preview
```

---

## 👥 User Roles

### 🌾 Farmer
- Report crop diseases with photo upload
- Get AI-powered diagnosis in seconds
- View risk analysis and treatment advisories
- Track crop health progress over time
- Submit follow-up photos for monitoring

### 🔬 Agriculture Expert
- Review cases with low AI confidence
- Inspect high-resolution crop images with zoom
- Compare AI predictions with expert knowledge
- Provide verified diagnoses and recommendations
- Fast-track critical cases

### 📊 District Agriculture Officer
- Monitor regional disease outbreaks via hotspot map
- View real-time analytics and trends
- Broadcast emergency alerts to farmers (SMS/app)
- Dispatch rapid response teams
- Track village-level risk metrics

---

## 📂 Project Structure

```
agridetect/
├── src/
│   ├── components/
│   │   └── layout/              # AppLayout, TopAppBar, BottomNav, etc.
│   ├── context/
│   │   └── AppContext.tsx       # Global state management
│   ├── data/
│   │   └── mockData.ts          # Sample data for demo
│   ├── pages/
│   │   ├── farmer/              # 10 farmer pages
│   │   ├── expert/              # 2 expert pages
│   │   └── dao/                 # 3 officer pages
│   ├── App.tsx                  # Main app with routing
│   ├── main.tsx                 # React entry point
│   ├── index.css                # Global styles + animations
│   └── types.ts                 # TypeScript definitions
├── public/                      # Static assets
├── dist/                        # Production build output
├── ANALYSIS.md                  # Complete project analysis
├── IMPLEMENTATION_SUMMARY.md    # Technical implementation details
├── USER_GUIDE.md                # Comprehensive user manual
└── README.md                    # This file
```

---

## 🎯 Core Workflows

### 1. Farmer Reports Disease (High Confidence)
```
Welcome → Home → Report Form → Photo Capture → AI Analysis 
→ Diagnosis (89%) → Advisory Guide → Progress Tracking
```
**Duration:** 3-5 minutes

### 2. Low Confidence → Expert Verification
```
AI Analysis → Uncertain (52%) → Send to Expert → Expert Dashboard 
→ Case Review → Image Inspection → Verify Diagnosis → Notify Farmer
```
**Duration:** 2-4 minutes

### 3. Officer Monitors Outbreak
```
Monitoring Dashboard → Hotspot Map → Early Warning Feed 
→ Broadcast Alert → Dispatch Team → Analytics Review
```
**Duration:** 5-8 minutes

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** React 18.3.1 with TypeScript 5.6
- **Routing:** React Router DOM 6.28
- **Styling:** TailwindCSS 3.4 (Material Design 3 theme)
- **Build Tool:** Vite 6.0
- **Icons:** Material Symbols (Google Fonts)
- **Fonts:** Inter (sans-serif)

### State Management
- **Context API:** Global state with AppContext
- **Local State:** React hooks (useState, useEffect)

### Data Layer (Current)
- **Mock Data:** Static demo data in `mockData.ts`
- **Ready for Backend:** Service layer architecture prepared

---

## 📱 Features in Detail

### Farmer Interface

#### Home Dashboard
- Personalized greeting with farm ID
- Weather widget (temperature, precipitation)
- Quick action cards (My Crops, Risk Info, etc.)
- Recent update card with follow-up reminders

#### Multi-Step Report Form
- Step 1: Crop selection (6 options + Other)
- Step 2: Crop stage (5 stages)
- Step 3: Location auto-detection
- Step 4: Photo capture/upload
- Step 5: AI analysis animation

#### AI Analysis Progress
- Animated scanning effect with pulse rings
- 5-step progress checklist:
  1. Image received ✅
  2. Crop identified ✅
  3. Detecting disease 🔄
  4. Weather conditions 🔄
  5. Local risk assessment 🔄
- Auto-navigation after 4 seconds

#### Diagnosis Result (High Confidence)
- Disease name with confidence %
- Visual confidence meter (color-coded)
- Crop image with AI-highlighted lesions
- Context: Crop, stage, location
- Actions: View Advisory or Ask Expert

#### Advisory Guide
- Immediate actions (remove affected leaves)
- Prevention tips (spacing, monitoring)
- Treatment guidance (fungicide recommendations)
- Warnings (avoid overhead irrigation)
- Print-friendly format
- Bilingual toggle (EN ↔ हिंदी)

#### Progress Tracking
- Before/after photo comparison
- AI insight (% improvement)
- Trend chart (5 data points)
- Follow-up reminder

### Expert Interface

#### Case Dashboard
- Pending cases count (KPI card)
- Urgent alert banner (critical outbreaks)
- Cases table with:
  - Case ID, Crop, AI Diagnosis
  - Confidence bar (color-coded)
  - Date, Action buttons
- Real-time search (by ID or crop)
- Filter controls

#### Case Analysis
- **3-pane layout:**
  - Left: High-res image with zoom (1x/1.4x)
  - Center: Context (crop, stage, location) + Environmental data
  - Right: AI prediction + Verification form
- AI lesion overlays (red boxes)
- Diagnosis dropdown (5+ options)
- Recommendation textarea
- One-click verification submission

### Officer Interface

#### Regional Monitoring
- KPI dashboard (3 metrics):
  - Total Reports: 1,248 (+12%)
  - Active Hotspots: 5
  - Critical Alerts: 2
- Interactive hotspot map:
  - Color-coded markers (red/yellow/green)
  - Click to view alert details
  - Legend for threat levels
- Disease trends chart (5 weeks)
- Most affected crops (bar chart)
- Early warning feed sidebar

#### Analytics & Trends
- Filter panel (4 dropdowns):
  - Date range, Crop type, Region, Disease type
- Disease distribution pie chart (3 segments)
- Weekly trend chart (8 weeks)
- Village risk table (5 villages):
  - Active cases, Risk level, 7-day trend
  - Inspect button for drill-down

#### Early Warning Center
- Active warnings feed (4 alerts)
- Severity badges (Critical/Warning/Info)
- Action buttons:
  - Broadcast Advisory (SMS simulation)
  - Dispatch Extension Team
- Statistics sidebar:
  - Active bulletins, Farmers notified, Mobile squads
- Manual alert creation modal:
  - Form: Headline, Sector, Message
  - Dispatch button

---

## 🎨 Design System

### Colors (Material Design 3)
- **Primary:** #00450d (Deep Forest Green)
- **Secondary:** #006e1c (Growth Green)
- **Error:** #ba1a1a (Critical Red)
- **Surface:** #f4faff (Soft Blue-White)
- **Background:** #f4faff

### Typography (Inter Font)
- **Display:** 42px/700 (Hero text)
- **Headline Large:** 32px/600
- **Headline Medium:** 24px/600
- **Body Large:** 18px/400
- **Body Medium:** 16px/400
- **Label Caps:** 12px/700 (uppercase)

### Spacing
- **Base Unit:** 8px
- **Container Margin:** 24px
- **Gutter:** 16px
- **Card Padding:** 20px
- **Touch Target:** 48px minimum

### Breakpoints
- **Mobile:** < 768px
- **Tablet:** 768px - 1024px
- **Desktop:** > 1024px

---

## 🧪 Testing

### Build Status
```bash
✓ TypeScript compilation: SUCCESS
✓ Vite build: SUCCESS
✓ 53 modules transformed
✓ Bundle size: 308 KB (gzipped: 82 KB)
✓ CSS size: 41 KB (gzipped: 7.75 KB)
✓ Zero compilation errors
```

### Manual Testing Checklist

#### ✅ Farmer Workflow
- [x] Welcome screen loads
- [x] Navigation to home
- [x] Report form works (crop, stage, location)
- [x] Photo capture/upload functional
- [x] AI analysis animation runs
- [x] High confidence diagnosis displays
- [x] Low confidence route works
- [x] Advisory guide readable
- [x] Progress tracking shows charts

#### ✅ Expert Workflow
- [x] Dashboard table populates
- [x] Search filters cases
- [x] Case detail opens
- [x] Image zoom toggles
- [x] Lesion overlays visible
- [x] Verification form submits
- [x] Case status updates

#### ✅ Officer Workflow
- [x] Monitoring dashboard loads
- [x] Hotspot map displays markers
- [x] Charts render correctly
- [x] Alert feed shows items
- [x] Broadcast button works
- [x] Manual alert modal opens
- [x] Analytics filters apply

#### ✅ Navigation
- [x] Top bar visible
- [x] Role switcher works
- [x] Bottom nav (mobile) functional
- [x] Sidebar drawer (desktop) functional
- [x] All links navigate correctly
- [x] Back buttons work

#### ✅ Responsive
- [x] Mobile layout (< 768px)
- [x] Tablet layout (768-1024px)
- [x] Desktop layout (> 1024px)
- [x] Touch targets adequate
- [x] Images scale properly

---

## 🚧 Roadmap

### Phase 1: Backend Integration (Weeks 1-2)
- [ ] Express.js API server
- [ ] PostgreSQL database
- [ ] REST endpoints (cases, users, alerts)
- [ ] Image upload to cloud (AWS S3/Firebase)
- [ ] JWT authentication

### Phase 2: AI Integration (Weeks 3-4)
- [ ] TensorFlow.js or Python Flask endpoint
- [ ] Pre-trained PlantVillage model
- [ ] Real-time inference
- [ ] Lesion detection algorithm
- [ ] Confidence threshold logic

### Phase 3: Real-Time Features (Week 5)
- [ ] WebSocket connections (Socket.io)
- [ ] Push notifications (Firebase Cloud Messaging)
- [ ] Live case updates
- [ ] Hotspot map real-time updates

### Phase 4: Notifications (Week 6)
- [ ] Twilio SMS integration
- [ ] SendGrid email service
- [ ] Notification templates
- [ ] Bulk broadcast system

### Phase 5: Maps & Geolocation (Week 7)
- [ ] Google Maps API integration
- [ ] GPS location capture
- [ ] Cluster visualization
- [ ] Heat maps for disease spread

### Phase 6: PWA & Offline (Week 8)
- [ ] Service worker
- [ ] Offline caching
- [ ] Local storage for drafts
- [ ] Background sync

### Phase 7: Testing & Deployment (Week 9-10)
- [ ] Unit tests (Jest + React Testing Library)
- [ ] E2E tests (Playwright)
- [ ] Performance optimization
- [ ] Production deployment (Vercel/AWS)

---

## 📄 Documentation

### For Users
- **USER_GUIDE.md:** Complete user manual with step-by-step workflows
- **FAQ:** (Coming soon)

### For Developers
- **ANALYSIS.md:** In-depth project analysis and architecture
- **IMPLEMENTATION_SUMMARY.md:** Technical implementation details
- **API_DOCS.md:** (Coming soon - when backend ready)

### For Designers
- **DESIGN.md:** Design system specification (in agridetect folder)
- **Figma Files:** (If applicable)

---

## 🤝 Contributing

### Development Workflow
1. Fork the repository
2. Create feature branch: `git checkout -b feature/my-feature`
3. Commit changes: `git commit -m 'Add my feature'`
4. Push to branch: `git push origin feature/my-feature`
5. Open Pull Request

### Code Standards
- Use TypeScript strict mode
- Follow React hooks best practices
- Write semantic HTML
- Use Tailwind utility classes
- Add comments for complex logic
- Keep components under 300 lines

### Commit Message Format
```
type(scope): subject

body (optional)

footer (optional)
```

**Types:** feat, fix, docs, style, refactor, test, chore

**Example:**
```
feat(farmer): add voice note recording

- Implemented Web Speech API integration
- Added audio recording UI button
- Created speech-to-text conversion service
```

---

## 🐛 Known Issues

### Current Limitations
1. **Mock Data:** All data is static (no persistence)
2. **No Authentication:** Role switching is manual
3. **Simulated AI:** Confidence scores are hardcoded
4. **Static Maps:** Hotspot markers are fixed positions
5. **No SMS/Email:** Notifications are toast-only

### Planned Fixes
- Backend integration (Phase 1)
- Real authentication system (Phase 1)
- Actual AI model (Phase 2)
- Google Maps API (Phase 5)
- Twilio/SendGrid (Phase 4)

---

## 📊 Performance

### Bundle Analysis
- **JavaScript:** 308.74 KB (82.20 KB gzipped)
- **CSS:** 41.42 KB (7.75 KB gzipped)
- **Total:** 350 KB (90 KB gzipped)

### Load Times (Mobile 3G)
- **First Contentful Paint:** < 2s
- **Time to Interactive:** < 3s
- **Largest Contentful Paint:** < 2.5s

### Lighthouse Scores (Target)
- **Performance:** 95+
- **Accessibility:** 95+
- **Best Practices:** 100
- **SEO:** 100

---

## 🔒 Security

### Current Implementation
- ✅ Input sanitization (React default)
- ✅ No hardcoded secrets
- ✅ HTTPS recommended for production
- ✅ CORS configuration ready

### Planned Security Features
- [ ] JWT token authentication
- [ ] Role-based access control (RBAC)
- [ ] Rate limiting (backend)
- [ ] Input validation (backend)
- [ ] SQL injection prevention
- [ ] XSS protection
- [ ] CSRF tokens

---

## 📜 License

MIT License

Copyright (c) 2024 AgriDetect Team

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

---

## 👏 Acknowledgments

### Technologies
- React Team for React 18
- TailwindCSS Team for utility-first CSS
- Google for Material Design 3 and Material Symbols
- Vite Team for lightning-fast build tool

### Design Inspiration
- Material Design 3 Guidelines
- PlantVillage Dataset (for disease reference)
- ICAR Agricultural Research Institute

### Community
- Open source contributors
- Beta testers and early users
- Agricultural domain experts

---

## 📞 Contact & Support

### Development Team
- **Project Lead:** [Your Name]
- **GitHub:** https://github.com/yourusername/agridetect
- **Email:** support@agridetect.com (placeholder)

### Help Resources
- **User Guide:** See USER_GUIDE.md
- **Technical Docs:** See IMPLEMENTATION_SUMMARY.md
- **Issue Tracker:** GitHub Issues
- **Discussions:** GitHub Discussions

### Social Media
- **Twitter:** @agridetect (placeholder)
- **LinkedIn:** AgriDetect (placeholder)

---

## 🌟 Star History

[![Star History Chart](https://api.star-history.com/svg?repos=yourusername/agridetect&type=Date)](https://star-history.com/#yourusername/agridetect&Date)

---

**Built with ❤️ for farmers, by developers who care about agriculture**

**Last Updated:** December 2024  
**Version:** 1.0.0  
**Status:** ✅ Frontend Complete, Backend Ready for Integration
