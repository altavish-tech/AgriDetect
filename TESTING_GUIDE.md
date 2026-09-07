# 🧪 AgriDetect Testing Guide

## Quick Test Scenarios

### ✅ Test 1: Hindi Translation (5 minutes)

**Steps**:
1. Open http://localhost:3002/
2. Bottom of welcome page → Click **"हिंदी में बदलें"**
3. ✓ Page switches to Hindi
4. Click **"मेरी फसल जांचें"** (Check My Crop)
5. ✓ Farmer home page displays in Hindi
6. Click **"मौसम पूर्वानुमान"** (Weather Forecast)
7. ✓ Weather page displays in Hindi
8. Go back → Click **"फसल समस्या रिपोर्ट करें"** (Report Crop Problem)
9. ✓ Photo capture page displays in Hindi
10. Top right → Click globe icon (🌐)
11. ✓ Toggle back to English

**Expected Results**:
- All text switches between English/Hindi
- Buttons and labels translate correctly
- Time-based greeting changes (सुप्रभात / Good Morning)
- No English text remains in Hindi mode

---

### ✅ Test 2: Image Upload (3 minutes)

**Steps**:
1. Navigate to Farmer Home
2. Click **"Report Crop Problem"**
3. On photo capture page, click **camera icon** OR **"Upload from Gallery"**
4. Select ANY image from your computer (can be any plant/leaf photo)
5. ✓ Your uploaded image appears in preview box
6. Click **"Submit Photo"**
7. Wait for AI Analysis progress page (simulated)
8. ✓ Diagnosis Result page shows **YOUR uploaded image**
9. ✓ Not a default placeholder image

**Expected Results**:
- Upload dialog opens
- Selected image previews immediately
- Same image appears on diagnosis page
- Image persists through workflow

---

### ✅ Test 3: Complete Workflow (10 minutes)

**Full farmer journey**:

1. **Welcome** → Select language (English or Hindi)
2. **Login** → Click "Check My Crop"
3. **Home** → View weather widget, quick actions
4. **Weather** → Click weather forecast, view 7-day forecast
5. **Report** → Click "Report Crop Problem"
6. **Photo** → Upload your own crop image
7. **Analysis** → Watch AI processing animation
8. **Diagnosis** → View disease detection result
9. **Advisory** → Click "View Crop Advisory"
10. **Progress** → Check crop health progress page

**Verify at each step**:
- Language consistency (stays Hindi if you selected Hindi)
- Your uploaded image persists
- Navigation works smoothly
- No console errors

---

## 📸 Image Upload Test Cases

### Test Case 1: Upload Works
```
Input: Click upload, select image
Expected: Image appears in preview
Status: ✅ Should work
```

### Test Case 2: Image Persists
```
Input: Upload image → Navigate to diagnosis
Expected: Same image displayed
Status: ✅ Should work
```

### Test Case 3: Retake Image
```
Input: Upload image → Click "Retake"
Expected: Preview clears, can upload new image
Status: ✅ Should work
```

### Test Case 4: No Image
```
Input: Click Submit without uploading
Expected: Button disabled OR warning message
Status: ✅ Should prevent submission
```

---

## 🌍 Translation Test Cases

### Test Hindi on Each Page:

| Page | English Test | Hindi Test | Status |
|------|--------------|------------|--------|
| Welcome | "Check My Crop" | "मेरी फसल जांचें" | ✅ |
| Home | "Report Crop Problem" | "फसल समस्या रिपोर्ट करें" | ✅ |
| Weather | "Weather Forecast" | "मौसम पूर्वानुमान" | ✅ |
| Photo | "Take Photo" | "फोटो लें" | ✅ |
| Progress | "Crop Health Progress" | "फसल स्वास्थ्य प्रगति" | ✅ |
| Diagnosis | "Diagnosis Result" | "निदान परिणाम" | ✅ |

---

## 🐛 Common Issues & Solutions

### Issue: Hindi not working
**Solution**: 
- Clear browser cache
- Hard refresh: `Ctrl + Shift + R`
- Try incognito/private mode
- Check globe icon in top-right

### Issue: Uploaded image not showing
**Solution**:
- Make sure image is selected
- Check preview appears before submitting
- Verify Submit button is clicked
- Check console for errors (F12)

### Issue: Page stuck on loading
**Solution**:
- Check if dev server is running
- Restart dev server: `Ctrl+C` then `npm run dev`
- Check terminal for errors

### Issue: "Cannot GET /"
**Solution**:
- Make sure you're on http://localhost:3002/
- Not http://localhost:3002 (without slash)
- Try http://localhost:3001/ if 3002 doesn't work

---

## 🔍 Visual Verification Checklist

### Hindi Mode Visual Check:
- [ ] Greeting in Hindi (सुप्रभात)
- [ ] All buttons in Hindi
- [ ] Weather labels in Hindi (आर्द्रता, तापमान)
- [ ] Form labels in Hindi
- [ ] Status messages in Hindi
- [ ] No English text visible

### Image Upload Visual Check:
- [ ] Upload button visible and clickable
- [ ] File dialog opens
- [ ] Image preview shows YOUR image
- [ ] Submit button enables after upload
- [ ] Diagnosis page shows YOUR image
- [ ] Image is clear and not distorted

---

## 📊 Performance Tests

### Load Time Test:
1. Open DevTools (F12)
2. Go to Network tab
3. Refresh page
4. Check: Page loads < 3 seconds

### Image Upload Test:
1. Select large image (2-5 MB)
2. Time from select to preview
3. Expected: < 2 seconds

### Language Switch Test:
1. Toggle language via globe icon
2. Expected: Instant switch, < 0.5 seconds

---

## 🎯 Acceptance Criteria

### ✅ All Tests Pass When:

**Hindi Translation**:
- All visible text translates
- No mixed English/Hindi on same page
- Toggle works smoothly
- Consistent across all pages

**Image Upload**:
- User can select any image
- Selected image previews correctly
- Image persists through diagnosis flow
- Clear and properly sized display

**Overall UX**:
- No console errors
- Smooth navigation
- Fast page loads
- Responsive on mobile

---

## 🚀 Quick Smoke Test (2 minutes)

Run this every time you make changes:

```bash
# 1. Start server
npm run dev

# 2. Open browser
http://localhost:3002/

# 3. Quick checks:
✓ Page loads
✓ Switch to Hindi works
✓ Upload image works
✓ Image shows on diagnosis page
✓ No console errors (F12)

# ✅ If all pass → Ready to demo!
```

---

## 📞 Report Issues

If you find bugs during testing:

1. **Screenshot** the issue
2. **Note** which page it occurs on
3. **Write down** steps to reproduce
4. **Check** browser console for errors (F12)
5. **Try** in incognito mode to confirm

---

**Happy Testing! 🎉**

If all tests pass, your AgriDetect app is ready for demo and user testing!
