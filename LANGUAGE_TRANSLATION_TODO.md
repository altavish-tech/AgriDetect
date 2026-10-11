# Language Translation Implementation Guide

## Current Status

### ✅ Already Translated:
- Farmer pages (fully translated to Hindi)
- Welcome page
- Navigation (partially)
- Common UI elements

### ❌ Not Translated (Need Work):
- Expert Dashboard Page
- Expert Case Analysis Page  
- District Officer Monitoring Page
- Regional Analytics Page
- Early Warning Center Page
- Village Detail Page

---

## Problem

When users click the language toggle (हिं/English) in the top bar, the Expert and District Officer sections remain in English only. All text is hardcoded in English instead of using the translation system.

---

## Solution Approach

### Step 1: Add Translation Keys

Add all missing translation keys to `src/utils/translations.ts`:

```typescript
export const translations = {
  en: {
    // Add Expert/Officer specific keys
    expertDashboard: 'Expert Diagnostic Dashboard',
    casesAwaiting: 'Cases Awaiting Verification',
    urgentAlert: 'URGENT REGIONAL ALERT',
    // ... etc
  },
  hi: {
    // Add Hindi translations
    expertDashboard: 'विशेषज्ञ निदान डैशबोर्ड',
    casesAwaiting: 'सत्यापन की प्रतीक्षा में मामले',
    urgentAlert: 'तत्काल क्षेत्रीय चेतावनी',
    // ... etc
  }
};
```

### Step 2: Update Page Components

Replace hardcoded English text with translation function calls:

**Before (Hardcoded):**
```typescript
<h1>Expert Diagnostic Dashboard</h1>
<p>Welcome back, Dr. Ramesh (Senior Pathologist)</p>
```

**After (Translated):**
```typescript
import { t } from '../../utils/translations';
import { useApp } from '../../context/AppContext';

const { language } = useApp();

<h1>{t('expertDiagnosticDashboard', language)}</h1>
<p>{t('welcomeBackExpert', language)}, Dr. Ramesh ({t('seniorPathologist', language)})</p>
```

---

## Translation Keys Needed

### Expert Dashboard Page:
```typescript
// Headers
expertDiagnosticDashboard: 'Expert Diagnostic Dashboard'
welcomeBackExpert: 'Welcome back'
seniorPathologist: 'Senior Pathologist'
icarCertified: 'ICAR Certified Expert'

// Buttons
filter: 'Filter'
export: 'Export'

// Alerts
urgentRegionalAlert: 'URGENT REGIONAL ALERT'
regionalBlightOutbreak: 'Regional Blight Outbreak detected...'

// KPIs
pending: 'PENDING'
highPriority: 'HIGH PRIORITY'
completed: 'COMPLETED'
casesAwaitingVerification: 'Cases awaiting verification'
highRiskCases: 'High-Risk Cases'
verifiedToday: 'Verified Today'

// Table
casesAwaitingVerificationTitle: 'Cases Awaiting Verification'
searchCaseOrCrop: 'Search Case ID or crop...'
caseID: 'Case ID'
crop: 'Crop'
aiDiagnosis: 'AI Diagnosis'
confidence: 'Confidence'
date: 'Date'
action: 'Action'
review: 'Review'
```

### District Officer Monitoring Page:
```typescript
regionalAgricultureMonitoring: 'Regional Agriculture Monitoring'
realTimeCommandCenter: 'Real-time command center...'
last30Days: 'Last 30 Days'
exportReport: 'Export Report'
totalReports: 'Total Reports'
activeHotspots: 'Active Hotspots'
criticalAlerts: 'Critical Alerts'
regionalDiseasePestHotspot: 'Regional Disease & Pest Hotspot Map'
realTimeGeospatial: 'Real-time geospatial clustering...'
earlyWarningFeed: 'Early Warning Feed'
fallArmywormOutbreak: 'Fall Armyworm Outbreak'
rapidSpread: 'Rapid spread detected...'
```

### Analytics Page:
```typescript
diseaseAnalyticsTrends: 'Disease Analytics & Trends'
epidemiologicalIntelligence: 'Epidemiological intelligence...'
pdfReport: 'PDF Report'
csvData: 'CSV Data'
dateRange: 'Date Range'
cropType: 'Crop Type'
regionBlock: 'Region / Block'
diseaseType: 'Disease Type'
diseaseWiseDistribution: 'Disease-wise Distribution'
weeklyIncidentVolume: 'Weekly Incident Volume by Block (Trend)'
villageLevelRisk: 'Village-level Risk & Outbreak Summary'
```

### Early Warning Page:
```typescript
earlyWarningCenter: 'Early Warning Center'
manageDispatchBroadcast: 'Manage, dispatch, and broadcast...'
issueManualAlert: 'Issue Manual Alert'
activeRegionalWarnings: 'Active Regional Warnings'
tomatoLateBlight: 'Tomato Late Blight Outbreak'
villageASector: 'Village A Sector (Siwan)'
immediateThreat: 'Immediate Threat'
broadcastAlert: 'Broadcast Alert'
dispatchTeam: 'Dispatch Team'
viewDetails: 'View Details'
```

---

## Implementation Priority

### Priority 1 (Most Visible):
1. ✅ Page Titles
2. ✅ Navigation Labels
3. ✅ Button Text

### Priority 2 (Important):
4. Section Headers
5. KPI Labels
6. Table Headers

### Priority 3 (Details):
7. Descriptions
8. Alert Messages
9. Status Labels

---

## Example Implementation

### Expert Dashboard Page Complete Translation:

**File:** `src/pages/expert/ExpertDashboardPage.tsx`

```typescript
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { t } from '../../utils/translations';

export const ExpertDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { cases, showToast, setActiveCaseId, language } = useApp();
  // ... rest of component

  return (
    <div className="p-container-margin max-w-7xl mx-auto space-y-gutter w-full">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4 border-b border-outline-variant pb-4">
        <div>
          <h1 className="font-headline-lg text-headline-lg text-primary tracking-tight font-bold">
            {t('expertDiagnosticDashboard', language)}
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant mt-1">
            {t('welcomeBackExpert', language)}, Dr. Ramesh ({t('seniorPathologist', language)}) • {t('icarCertified', language)}
          </p>
        </div>
        <div className="flex gap-2">
          <button className="...">
            <span className="material-symbols-outlined text-sm">filter_list</span> {t('filter', language)}
          </button>
          <button className="...">
            <span className="material-symbols-outlined text-sm">download</span> {t('export', language)}
          </button>
        </div>
      </div>

      {/* Urgent Alert banner */}
      <div className="bg-error-container...">
        <span className="material-symbols-outlined...">campaign</span>
        <div className="flex-1">
          <div className="font-label-caps...">
            {t('urgentRegionalAlert', language)}
          </div>
          <p className="text-sm font-body-md mt-0.5">
            {t('regionalBlightOutbreak', language)}. {t('priorityVerification', language)}.
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
        {/* Pending */}
        <div className="...">
          <span className="...uppercase font-bold">{t('pending', language)}</span>
          <div className="font-display...">{cases.filter((c) => c.status === 'pending_expert').length}</div>
          <div className="font-body-md...">{t('casesAwaitingVerification', language)}</div>
        </div>

        {/* High Priority */}
        <div className="...">
          <span className="...uppercase font-bold">{t('highPriority', language)}</span>
          <div className="font-display...">15</div>
          <div className="font-body-md...">{t('highRiskCases', language)}</div>
        </div>

        {/* Completed */}
        <div className="...">
          <span className="...uppercase font-bold">{t('completed', language)}</span>
          <div className="font-display...">124</div>
          <div className="font-body-md...">{t('verifiedToday', language)}</div>
        </div>
      </div>

      {/* Table */}
      <div className="...">
        <div className="...">
          <h2 className="...">{t('casesAwaitingVerificationTitle', language)}</h2>
          <input placeholder={t('searchCaseOrCrop', language)} />
        </div>
        
        <table>
          <thead>
            <tr>
              <th>{t('caseID', language)}</th>
              <th>{t('crop', language)}</th>
              <th>{t('aiDiagnosis', language)}</th>
              <th>{t('confidence', language)}</th>
              <th>{t('date', language)}</th>
              <th>{t('action', language)}</th>
            </tr>
          </thead>
          {/* ... rows */}
        </table>
      </div>
    </div>
  );
};
```

---

## Testing Checklist

After implementing translations:

### Visual Testing:
- [ ] Expert Dashboard shows in Hindi when language = 'hi'
- [ ] Officer Dashboard shows in Hindi when language = 'hi'
- [ ] Analytics page shows in Hindi when language = 'hi'
- [ ] Early Warning page shows in Hindi when language = 'hi'
- [ ] All buttons translated
- [ ] All labels translated
- [ ] All status text translated

### Functional Testing:
- [ ] Language toggle works correctly
- [ ] Translations persist across page navigation
- [ ] No English text visible when Hindi selected
- [ ] No missing translations (fallback to English if needed)

---

## Files That Need Updates:

1. ✅ **src/utils/translations.ts** - Add all missing keys
2. **src/pages/expert/ExpertDashboardPage.tsx** - Replace hardcoded text
3. **src/pages/expert/ExpertCaseAnalysisPage.tsx** - Replace hardcoded text
4. **src/pages/dao/OfficerMonitoringPage.tsx** - Replace hardcoded text
5. **src/pages/dao/RegionalAnalyticsPage.tsx** - Replace hardcoded text
6. **src/pages/dao/EarlyWarningCenterPage.tsx** - Replace hardcoded text
7. **src/pages/dao/VillageDetailPage.tsx** - Replace hardcoded text

---

## Estimated Work:

- **Translation Keys to Add:** ~150-200 keys
- **Files to Update:** 6 page components
- **Lines to Change:** ~300-400 text strings
- **Time Estimate:** 3-4 hours for complete implementation

---

## Quick Win Solution:

For immediate demonstration purposes, add these critical translations first:

### Most Visible Text (Priority 1):
1. Page titles
2. Main section headers
3. Button labels (Filter, Export, Review, etc.)
4. Navigation items
5. KPI labels

This covers ~60% of visible text with ~30% of the work!

---

## Note:

The current issue is that **all Expert and Officer pages use hardcoded English strings** instead of calling `t(key, language)`. A complete fix requires:
1. Adding ~150 translation keys to translations.ts
2. Replacing ~300 hardcoded strings with t() calls
3. Testing all pages in both languages

This is a significant refactoring task. The system is ready (translation function exists), but the pages need to be updated to use it.
