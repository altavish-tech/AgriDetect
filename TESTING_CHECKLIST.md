# AgriDetect - Testing Checklist

**Use this checklist to verify all features are working correctly**

---

## 🚀 Quick Verification (5 minutes)

### ✅ Server & Build
- [ ] Dev server starts: `npm run dev`
- [ ] No console errors in terminal
- [ ] Application loads at http://localhost:3001/
- [ ] No browser console errors (F12)
- [ ] Build completes: `npm run build`

### ✅ Welcome Screen
- [ ] Welcome page loads (`/`)
- [ ] AgriDetect branding visible
- [ ] Role switcher in top-right
- [ ] "Check My Crop" button works → `/farmer/home`
- [ ] "Report by Voice" button shows toast
- [ ] Language toggle works (EN ↔ हिंदी)
- [ ] Help button shows toll-free number

### ✅ Basic Navigation
- [ ] Top app bar visible on most pages
- [ ] Role switcher dropdown opens
- [ ] Can switch to Expert role
- [ ] Can switch to Officer role
- [ ] Can switch back to Farmer role
- [ ] Bottom nav visible on mobile (< 768px)
- [ ] Sidebar visible on desktop (expert/officer)

---

## 🌾 Farmer Role - Full Workflow (10 minutes)

### Home Dashboard (`/farmer/home`)
- [ ] Page loads correctly
- [ ] Greeting: "Good Morning, Ramesh 👋"
- [ ] Weather widget displays (32°C, Sunny)
- [ ] 4 quick action cards visible
- [ ] Recent update card shows tomato case
- [ ] "Report Crop Problem" button → `/farmer/report`

### Report Form (`/farmer/report`)
- [ ] Progress indicator shows "1 Crop" active
- [ ] 6 crop cards display (Tomato, Wheat, Rice, Potato, Maize, Other)
- [ ] Click Tomato → Card highlights with green border
- [ ] 5 stage chips display
- [ ] Click "Vegetative" → Chip turns green
- [ ] Location shows "Siwan, Bihar"
- [ ] Edit button shows toast
- [ ] "Continue to Photo" button → `/farmer/photo-capture`

### Photo Capture (`/farmer/photo-capture`)
- [ ] Camera viewfinder displays
- [ ] Grid overlay visible
- [ ] Center reticle animates
- [ ] Click camera button → Image appears
- [ ] Toast: "Photo captured successfully"
- [ ] Guidance card shows 3 tips
- [ ] Voice note button shows toast
- [ ] Retake button clears photo
- [ ] Submit Photo button → `/farmer/analyzing`

### AI Analysis (`/farmer/analyzing`)
- [ ] Rotating pulse rings animate
- [ ] Crop image displays in center
- [ ] Scanning line moves up/down
- [ ] "AI Active" badge visible
- [ ] Checklist shows 5 steps
- [ ] Step 1 & 2: Instant checkmarks
- [ ] Step 3: Loading spinner (1.2s)
- [ ] Step 4: Loading spinner (2.4s)
- [ ] Step 5: Continues loading
- [ ] After 4s: Auto-navigates to `/farmer/diagnosis`
- [ ] "Skip to High-Confidence" button works
- [ ] "Simulate Low-Confidence" button → `/farmer/uncertain`

### High Confidence Diagnosis (`/farmer/diagnosis`)
- [ ] Crop image displays (left side)
- [ ] Red border overlay: "AI DETECTED SYMPTOMS"
- [ ] Diagnosis card shows "Tomato Early Blight"
- [ ] Confidence: 89% with green bar
- [ ] Context card shows crop/stage/location
- [ ] "View Crop Advisory" button → `/farmer/advisory`
- [ ] "Ask Expert to Verify" button:
  - [ ] Shows toast
  - [ ] Switches to expert role
  - [ ] Navigates to `/expert/dashboard`

### Uncertain Diagnosis (`/farmer/uncertain`)
- [ ] Warning icon (red circle)
- [ ] "Diagnosis Uncertain" headline
- [ ] Confidence card shows 52%
- [ ] Red progress bar (52% width)
- [ ] Ambiguous leaf image
- [ ] "Send to Agriculture Expert" button:
  - [ ] Shows toast
  - [ ] Switches to expert role (1.2s delay)
  - [ ] Navigates to `/expert/dashboard`
- [ ] "Upload a Better Photo" → `/farmer/photo-capture`
- [ ] "Describe the Problem" shows toast

### Risk Analysis (`/farmer/risk-analysis`)
- [ ] Risk meter displays (circular dial)
- [ ] Needle points to 84%
- [ ] Conic gradient (green → yellow → red)
- [ ] "High Risk" badge
- [ ] 4 risk factor cards display:
  - [ ] Weather Factor (humidity)
  - [ ] Regional Cluster (12 cases)
  - [ ] Crop Stage Sensitivity
  - [ ] Local History
- [ ] "View Advisory" button → `/farmer/advisory`

### Advisory Guide (`/farmer/advisory`)
- [ ] Header: "What Should You Do?"
- [ ] Disease badge: "Tomato Early Blight"
- [ ] Language toggle (हिंदी ↔ English)
- [ ] 4 action cards display:
  - [ ] Immediate Action (red border)
  - [ ] Prevention (green border)
  - [ ] Integrated Pest Management
  - [ ] Treatment Guidance
- [ ] Warning card (full width, red background)
- [ ] "Print Advisory Guide" button triggers print dialog
- [ ] Language toggle changes button text

### Progress Tracking (`/farmer/progress`)
- [ ] "Improving" status badge
- [ ] AI insight card: "30% reduction"
- [ ] Before/after comparison (2 images side-by-side)
- [ ] Previous scan: "Severe" badge (red)
- [ ] Current scan: "Improving" badge (green)
- [ ] Trend chart displays (SVG line graph)
- [ ] 5 data points visible
- [ ] X-axis labels: Oct 1 → Today
- [ ] "Submit another follow-up photo" button → `/farmer/photo-capture`

---

## 🔬 Expert Role - Full Workflow (5 minutes)

### Switch to Expert
- [ ] Click role switcher
- [ ] Select "Agriculture Expert"
- [ ] Toast: "Switched active role to: Agriculture Expert"
- [ ] Navigates to `/expert/dashboard`

### Expert Dashboard (`/expert/dashboard`)
- [ ] Header: "Expert Diagnostic Dashboard"
- [ ] Welcome: "Dr. Ramesh (Senior Pathologist)"
- [ ] Urgent alert banner (red background)
- [ ] 3 KPI cards display:
  - [ ] Pending: 3 cases
  - [ ] High Priority: 15
  - [ ] Completed: 124
- [ ] Filter button shows toast
- [ ] Export button shows toast
- [ ] Cases table displays (4 rows)
- [ ] Columns: Case ID, Crop, AI Diagnosis, Confidence, Date, Action
- [ ] Confidence bars show (color-coded)
- [ ] Search box functional:
  - [ ] Type "AD-7829" → Filters to 1 case
  - [ ] Type "Tomato" → Filters to tomato cases
  - [ ] Clear search → All cases return
- [ ] "Review" button → `/expert/case/:caseId`

### Case Analysis (`/expert/case/AD-7829-T`)
- [ ] Back button → `/expert/dashboard`
- [ ] Header: "Case #AD-7829-T"
- [ ] Farmer name: "John Doe"
- [ ] Date: "Today, 2 hours ago"
- [ ] History button shows toast
- [ ] Share button shows toast
- [ ] **Left Pane:**
  - [ ] High-res crop image displays
  - [ ] Zoom button toggles 1x ↔ 1.4x
  - [ ] Full frame button shows toast
  - [ ] 2 lesion overlays visible (red boxes)
  - [ ] Labels: "Lesion A", "Lesion B"
- [ ] **Center Pane:**
  - [ ] Context card: Crop, Stage, Location (with icons)
  - [ ] Environmental data card:
    - [ ] Humidity: 85% (High Risk - red text)
    - [ ] Temperature: 32°C (Optimal - green)
    - [ ] Soil Moisture: LOW (red badge)
- [ ] **Right Pane:**
  - [ ] AI prediction card:
    - [ ] "AI Analysis" badge
    - [ ] Primary: Early Blight (58%)
    - [ ] Alternative: Septoria (32%)
    - [ ] Green/gray confidence bars
  - [ ] Verification form:
    - [ ] Diagnosis dropdown populated (5+ options)
    - [ ] Recommendation textarea editable
    - [ ] Pre-filled text
- [ ] "Submit Verification & Notify Farmer" button:
  - [ ] Click → Toast appears
  - [ ] Status updates to "verified"
  - [ ] Navigates to dashboard (1.2s delay)

---

## 📊 Officer Role - Full Workflow (8 minutes)

### Switch to Officer
- [ ] Click role switcher
- [ ] Select "District Officer (DAO)"
- [ ] Toast: "Switched active role to: District Officer (DAO)"
- [ ] Navigates to `/dao/monitoring`

### Regional Monitoring (`/dao/monitoring`)
- [ ] Header: "Regional Agriculture Monitoring"
- [ ] Date range button shows toast
- [ ] Export Report button shows toast
- [ ] **3 KPI cards:**
  - [ ] Total Reports: 1,248 (+12%)
  - [ ] Active Hotspots: 5
  - [ ] Critical Alerts: 2
  - [ ] Hover → Scale effect
- [ ] **Hotspot Map:**
  - [ ] Satellite/terrain background
  - [ ] 3 markers visible:
    - [ ] Red (Critical): North Valley
    - [ ] Yellow (Warning): Central
    - [ ] Green (Low): Sector 3
  - [ ] Click red marker → Navigates to early warnings
  - [ ] Map legend displays (3 threat levels)
  - [ ] Filter button shows toast
  - [ ] Fullscreen button shows toast
- [ ] **Disease Trends Chart:**
  - [ ] 5-week bar chart displays
  - [ ] Bars increase to Week 4 (red)
  - [ ] Week labels below
- [ ] **Most Affected Crops:**
  - [ ] Maize: 45% (red bar)
  - [ ] Wheat: 28% (yellow bar)
  - [ ] Soybeans: 15% (green bar)
- [ ] **Early Warning Feed (Sidebar):**
  - [ ] Badge: "2 CRITICAL"
  - [ ] 4 alerts display
  - [ ] Critical alert cards (red border)
  - [ ] "Broadcast Advisory to Sector" button:
    - [ ] Click → Toast appears
  - [ ] "Open Early Warning Command Center" link → `/dao/early-warnings`

### Analytics & Trends (`/dao/analytics`)
- [ ] Header: "Disease Analytics & Trends"
- [ ] PDF Report button shows toast
- [ ] CSV Data button shows toast
- [ ] **Filter Panel (4 dropdowns):**
  - [ ] Date Range: Default "Last 30 Days"
  - [ ] Crop Type: Default "All Crops"
    - [ ] Change to "Tomato" → Updates state
  - [ ] Region: Default "All Regions (Siwan)"
    - [ ] Change to "North Valley Sector" → Updates state
  - [ ] Disease Type: Default "All Pathogens & Pests"
- [ ] **Disease Distribution Pie Chart:**
  - [ ] Circular chart with 3 colored segments
  - [ ] Center shows "Total 1,248"
  - [ ] Legend: Blight 42%, Armyworm 31%, Rust 27%
- [ ] **Weekly Trend Chart:**
  - [ ] 8-week bar chart
  - [ ] Increasing trend to W7 (peak, red)
  - [ ] W8 projected (lighter color)
  - [ ] Week labels: W1 → W8 (Proj)
- [ ] **Village Risk Table:**
  - [ ] 5 villages listed
  - [ ] Columns: Name, Cases, Risk Level, Trend, Actions
  - [ ] Risk badges color-coded (High/Medium/Low)
  - [ ] Trend indicators (up/down/neutral arrows)
  - [ ] Inspect button shows toast

### Early Warning Center (`/dao/early-warnings`)
- [ ] Header: "Early Warning Center"
- [ ] Filter button shows toast
- [ ] "Issue Manual Alert" button opens modal
- [ ] **Critical Alert Card 1:**
  - [ ] Red 2px top bar
  - [ ] "CRITICAL" badge
  - [ ] Title: "Tomato Late Blight Outbreak"
  - [ ] Sector: Village A Sector
  - [ ] Cases badge: "24 cases / 48h"
  - [ ] Full description text
  - [ ] "Broadcast Advisory SMS" button:
    - [ ] Click → Toast appears
  - [ ] "Dispatch Extension Team" button:
    - [ ] Click → Toast appears
- [ ] **Warning Alert Card 2:**
  - [ ] Yellow 2px top bar
  - [ ] "WARNING" badge (amber)
  - [ ] Title: "Elevated Microclimate Humidity Warning"
  - [ ] Description text
  - [ ] "Push Weather Advisory" button shows toast
- [ ] **Statistics Sidebar:**
  - [ ] Active Alert Bulletins: 2
  - [ ] Farmers Notified: 4,850
  - [ ] Mobile Squads in Field: 4 Teams
  - [ ] Icons color-coded
- [ ] **SOP Card:**
  - [ ] ICAR Guidelines reference
  - [ ] "Review Protocol Doc" button shows toast
- [ ] **Manual Alert Modal:**
  - [ ] Modal overlay (blur backdrop)
  - [ ] Close button (X) closes modal
  - [ ] Form fields:
    - [ ] Alert Headline (text input)
    - [ ] Target Sector (dropdown - 4 options)
    - [ ] Advisory Message (textarea)
  - [ ] Cancel button closes modal
  - [ ] Dispatch button:
    - [ ] Validation: Required fields
    - [ ] Submit → Toast appears
    - [ ] Modal auto-closes

---

## 🎨 UI/UX Verification

### Top App Bar
- [ ] Fixed at top (z-index 40)
- [ ] AgriDetect logo + text
- [ ] Logo clickable → Goes to role home
- [ ] Role switcher button visible
- [ ] Language toggle (desktop only)
- [ ] Notification bell with red badge
- [ ] Persona indicator (desktop, expert/officer only)
- [ ] Hidden on: welcome, analyzing pages

### Bottom Navigation Bar (Mobile < 768px)
- [ ] Fixed at bottom
- [ ] Hidden on desktop (>= 768px)
- [ ] Rounded top corners
- [ ] 5 tabs visible (farmer role):
  - [ ] Home, Report, My Crops, Risk Info, Advisory
- [ ] Active tab: green background + scale
- [ ] Inactive: gray text
- [ ] Icons filled when active
- [ ] Tap switches pages
- [ ] All tabs navigate correctly

### Navigation Drawer (Desktop >= 768px)
- [ ] Fixed left sidebar (expert/officer)
- [ ] Width: 256px
- [ ] Hidden on farmer role
- [ ] User card at top:
  - [ ] Avatar image
  - [ ] Name + role
  - [ ] "Active Now" indicator
- [ ] Nav links (6-7):
  - [ ] Icon + label
  - [ ] Active: green bg + translate right
  - [ ] Hover: light gray bg
- [ ] Bottom status: "AGRIDETECT AI • ONLINE"
- [ ] Mobile: Hamburger icon opens modal drawer
- [ ] Mobile: Backdrop closes drawer
- [ ] Mobile: Link click closes drawer

### Role Switcher Dropdown
- [ ] Button: "Role: [Current Role]"
- [ ] Animated ping dot
- [ ] Swap icon
- [ ] Click opens dropdown
- [ ] Backdrop overlay (blur)
- [ ] 3 role cards:
  - [ ] Farmer (psychiatry icon)
  - [ ] Expert (science icon)
  - [ ] Officer (analytics icon)
- [ ] Each card shows description
- [ ] Active badge on current role
- [ ] Click switches role + navigates + toast
- [ ] Click backdrop closes dropdown

### Toast Notifications
- [ ] Appears bottom-right (desktop)
- [ ] Appears bottom-center (mobile)
- [ ] Dark background
- [ ] White text
- [ ] Checkmark icon (green)
- [ ] Bounce animation on appear
- [ ] Auto-dismisses after 4 seconds
- [ ] Only 1 toast at a time

### Responsive Breakpoints
- [ ] **Mobile (< 768px):**
  - [ ] Bottom nav visible
  - [ ] Sidebar hidden
  - [ ] Cards stack vertically
  - [ ] Single column layouts
  - [ ] Font sizes adjust
- [ ] **Tablet (768-1024px):**
  - [ ] Bottom nav hidden
  - [ ] Sidebar visible (expert/officer)
  - [ ] 2-column grids
- [ ] **Desktop (> 1024px):**
  - [ ] Sidebar visible (expert/officer)
  - [ ] 3-column grids
  - [ ] Larger typography
  - [ ] More whitespace

### Animations
- [ ] Button hover: scale 1.05
- [ ] Button active: scale 0.98
- [ ] Card hover: shadow increase
- [ ] Link transitions (150-300ms)
- [ ] Pulse rings (AI analysis)
- [ ] Scanning line (AI analysis)
- [ ] Spinner rotation (loading states)
- [ ] Modal fade in (early warning)
- [ ] Toast bounce (notifications)

---

## 🔧 Technical Verification

### Console Checks (F12)
- [ ] No JavaScript errors
- [ ] No TypeScript errors
- [ ] No React warnings
- [ ] No failed network requests
- [ ] No 404 for images/fonts

### Performance
- [ ] Page loads in < 2 seconds
- [ ] Smooth 60fps animations
- [ ] No janky scrolling
- [ ] Images load progressively
- [ ] Hot reload works (edit file → auto-refresh)

### Build Output
- [ ] `npm run build` succeeds
- [ ] No TypeScript errors
- [ ] dist/ folder created
- [ ] dist/index.html exists
- [ ] dist/assets/ contains JS and CSS
- [ ] Bundle size reasonable (< 500 KB)

### Code Quality
- [ ] All imports resolve
- [ ] No unused variables
- [ ] All functions defined
- [ ] All types correct
- [ ] Consistent formatting

---

## 🐛 Known Issues to Verify Fixed

### Issue 1: Images Not Loading
- [ ] All farmer home images load
- [ ] All crop selection images load
- [ ] Case analysis images load
- [ ] Hotspot map background loads
- [ ] User avatars load

### Issue 2: Navigation Bugs
- [ ] Back button doesn't break app
- [ ] All routes defined in App.tsx
- [ ] No infinite redirect loops
- [ ] 404 redirects to welcome

### Issue 3: State Persistence
- [ ] Report draft persists through pages
- [ ] Active case ID maintained
- [ ] Language preference maintained
- [ ] Role switch updates navigation

---

## 📱 Cross-Browser Testing

### Chrome (Primary)
- [ ] All features work
- [ ] Animations smooth
- [ ] Fonts load correctly

### Firefox
- [ ] All features work
- [ ] Layout correct
- [ ] No rendering issues

### Safari (iOS)
- [ ] Touch targets adequate (48px+)
- [ ] Tap feedback immediate
- [ ] Pinch zoom works on images

### Edge
- [ ] All features work
- [ ] No IE compatibility warnings

---

## ✅ Final Checklist

### Deployment Ready
- [ ] Build succeeds without errors
- [ ] All pages accessible
- [ ] All navigation works
- [ ] All forms functional
- [ ] All buttons trigger actions
- [ ] All toasts appear
- [ ] All images load
- [ ] Responsive on mobile/tablet/desktop
- [ ] No console errors
- [ ] README.md complete
- [ ] USER_GUIDE.md available
- [ ] IMPLEMENTATION_SUMMARY.md written

### Demo Ready
- [ ] Can demonstrate farmer workflow (3 min)
- [ ] Can demonstrate expert workflow (2 min)
- [ ] Can demonstrate officer workflow (2 min)
- [ ] Can switch roles smoothly
- [ ] Can explain 3-role system
- [ ] Application looks professional
- [ ] No obvious bugs

### Production Ready (Backend Needed)
- [ ] Frontend complete ✅
- [ ] Backend API (pending)
- [ ] Database (pending)
- [ ] Authentication (pending)
- [ ] Real AI model (pending)
- [ ] SMS/Email (pending)
- [ ] Maps integration (pending)

---

## 🎉 Success Criteria

### ✅ **ALL CHECKS PASSED** → Frontend Implementation Complete!

**Next Steps:**
1. Backend development (Express + PostgreSQL)
2. AI model integration (TensorFlow.js or Python)
3. Authentication system (JWT)
4. Real-time features (WebSockets)
5. Notifications (Twilio/SendGrid)
6. Maps (Google Maps API)
7. Production deployment

**Current Status:**
- Frontend: ✅ 100% Complete
- Backend: ⏳ 0% (Ready for integration)
- AI: ⏳ 0% (Mock simulations working)
- Auth: ⏳ 0% (Role switching manual)
- Deployment: ⏳ 0% (Build ready)

---

**Document Version:** 1.0  
**Last Updated:** December 2024  
**Test Duration:** 30-45 minutes (full checklist)  
**Quick Test:** 5 minutes (quick verification section only)
