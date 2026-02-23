# Levanto Wellness App - Quick Start Guide

## 🚀 Getting Started (5 Minutes)

### 1. Install & Run
```bash
# Install dependencies (if not already done)
npm install

# Start the development server
npm start
```

### 2. View Employee Dashboard (Mobile)
- Press `i` in terminal → Opens iOS Simulator
- Login: `test@test.com` / `password`
- See: Personal wellness dashboard with program tracking

### 3. View Employer Dashboard (Web)
- Open Safari
- Navigate to: `http://localhost:8082`
- Login: `test@test.com` / `password`
- See: ROI metrics and business analytics

## 🔄 The Platform Bridge (Key Feature)

**Single line of code routes different UIs:**

```typescript
// src/screens/DashboardScreen.tsx
if (Platform.OS === 'web') {
  return <EmployerDashboard {...props} />;  // Business metrics
}
return <EmployeeDashboard {...props} />;    // Personal wellness
```

**Result:**
- Same codebase
- Different personas (Employee vs Employer)
- No duplicate code

## 🎨 Visual Design Overview

### Color System
| Program | Color | Hex |
|---------|-------|-----|
| Fitness Challenge | Teal | #39c3c2 |
| Mental Wellness | Purple | #9C27B0 |
| Nutrition Coaching | Orange | #FF9800 |
| Financial Wellness | Blue | #2196F3 |

### Hero Section
- **Design**: Pizza slice SVG (4 colors converging to center)
- **Height**: 140px
- **Colors (L→R)**: Teal, Purple, Orange, Blue

## 📱 Employee View Features

✅ Personal stats (Active Programs, Day Streak, Completion Rate)  
✅ Enrolled programs with progress bars  
✅ Activity logging buttons (placeholder)  
✅ Available programs to join  
✅ Profile dropdown with deep link to employer view  
✅ Compliance & accessibility page  

## 💼 Employer View Features

✅ Projected annual savings ($124K)  
✅ Key performance indicators (42% medical spending reduction, etc.)  
✅ Program adoption rates  
✅ Enrollment and completion metrics  
✅ Color-coded program overview  

## 🧪 Testing

```bash
# Run all tests (38 tests)
npm test

# Expected result: All tests passing ✅
```

## 📋 Mock Data Quick Reference

### Login Credentials
- Email: `test@test.com`
- Password: `password`

### User Progress
- **Enrolled**: Fitness Challenge (15/30 days), Mental Wellness (8/30 days)
- **Stats**: 2 active programs, 23-day streak, 76% completion rate

### ROI Metrics
- **Total Savings**: $124,000/year
- **Employees**: 450
- **Medical Reduction**: 42%
- **Absenteeism**: 4.4 days saved/year

## 🔗 Navigation Paths

### Employee Mobile App
1. Login → Dashboard (Employee View)
2. Tap Program Card → Program Detail Screen
3. Profile Icon → View Company Report → Safari opens web view
4. Profile Icon → Compliance & Accessibility → Compliance Screen
5. Profile Icon → Logout

### Employer Web Dashboard
1. Login → Dashboard (Employer View)
2. View ROI metrics and program adoption
3. Logout button (top right)

## 📂 Key Files to Know

| File | Purpose |
|------|---------|
| `src/screens/DashboardScreen.tsx` | **Platform router** (the bridge!) |
| `src/screens/EmployeeDashboard.tsx` | Mobile personal view |
| `src/screens/EmployerDashboard.tsx` | Web business view |
| `src/data/mockData.ts` | All mock programs and metrics |
| `src/store/authStore.ts` | Authentication state |
| `PROJECT_DOCUMENTATION.md` | Full documentation |

## 🎯 Next Steps for Development

### To Add Log Activity Functionality
1. Create activity logging modal/screen
2. Update progress in store/state
3. Refresh progress bars
4. Add activity history

### To Add Join Program Functionality
1. Create join confirmation modal
2. Update enrolled programs array
3. Initialize progress tracking
4. Move program from "Available" to "My Programs"

### To Add View Details Enhancement
1. Add program curriculum section
2. Show program requirements
3. Display success metrics
4. Add resources/links

## 🐛 Debugging Tips

### Web view not loading?
- Check port 8082 is available
- Try `http://localhost:8082` in Safari specifically
- Clear browser cache

### iOS simulator not appearing?
- Make sure Xcode is installed
- Run `npx react-native doctor` to check setup
- Try `npm run ios` directly

### Tests failing?
- Run `npm install` to ensure dependencies are current
- Check that you're in the correct directory
- Clear jest cache: `npx jest --clearCache`

## 📞 Interview Demo Script

1. **"Let me show you the employee experience"**
   - Open iOS simulator
   - Walk through personal dashboard
   - Show program enrollment and progress

2. **"Now here's the innovation"**
   - Tap "View Company Report"
   - Safari opens to web view
   - Explain: "Same codebase, different personas"

3. **"This is what employers see"**
   - Show ROI metrics
   - Highlight $124K annual savings
   - Explain business value

4. **"Healthcare compliance matters"**
   - Go back to mobile
   - Open Compliance page
   - Discuss HIPAA and ADA considerations

5. **"Built for scale"**
   - Mention test coverage (38 tests passing)
   - Discuss extensibility (mock data → API)
   - Talk about next features

## ✨ Impressive Technical Points

- **Single Codebase, Dual UIs**: Platform.OS routing
- **Design System**: Consistent colors, spacing, typography
- **Type Safety**: Full TypeScript implementation
- **Test Coverage**: 38 tests, all passing
- **Navigation**: React Navigation stack with proper typing
- **State Management**: Zustand for clean, simple state
- **SVG Graphics**: Custom hero section with complex paths
- **Accessibility**: WCAG 2.1 Level AA considerations

---

**Ready to go!** 🎉

Run `npm start`, press `i`, and you're off!
