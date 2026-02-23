# Levanto Wellness App - Project Documentation

## Overview
Levanto is a dual-platform wellness application designed for Baylor Scott and White Health interview demo. The app demonstrates employee wellness program management with two distinct user experiences:

- **Employee View (Mobile)**: Personal wellness dashboard with program tracking, activity logging, and progress monitoring
- **Employer View (Web)**: ROI-focused dashboard showing cost savings, program adoption metrics, and business impact

## Key Innovation: Platform Bridge Architecture

### The Platform.OS Bridge
The application uses React Native's `Platform.OS` detection to route users to completely different dashboards based on their platform:

```typescript
// src/screens/DashboardScreen.tsx
export function DashboardScreen(props: DashboardScreenProps) {
  if (Platform.OS === 'web') {
    return <EmployerDashboard {...props} />;
  }
  return <EmployeeDashboard {...props} />;
}
```

### Why This Matters
This architectural decision allows a single codebase to serve two distinct user personas:
- **Mobile (iOS/Android)**: Employees access their personal wellness journey
- **Web**: Employers/HR access organizational ROI metrics

### Accessing Both Views

**Employee View (Mobile):**
```bash
npm start
# Press 'i' for iOS simulator
# Press 'a' for Android emulator
```

**Employer View (Web):**
```bash
npm start
# Open Safari and navigate to: http://localhost:8082
```

**Bridge Between Views:**
The app includes deep linking from mobile to web:
- Employees can tap "View Company Report" in the profile dropdown
- This opens Safari/browser to the web employer dashboard

## Project Structure

```
src/
├── screens/
│   ├── DashboardScreen.tsx         # Platform router
│   ├── EmployeeDashboard.tsx       # Mobile: Personal wellness view
│   ├── EmployerDashboard.tsx       # Web: ROI/business metrics view
│   ├── ProgramDetailScreen.tsx     # Program details and actions
│   ├── ComplianceScreen.tsx        # HIPAA/ADA compliance info
│   └── LoginScreen.tsx             # Authentication
├── components/
│   └── ProgramIcon.tsx             # Icon mapping for programs
├── design-system/
│   ├── Button.tsx                  # Custom button component
│   ├── Card.tsx                    # Card container
│   ├── Type.tsx                    # Typography component
│   └── index.ts                    # Design system exports
├── navigation/
│   ├── RootNavigator.tsx           # Auth routing
│   ├── AppNavigator.tsx            # Main app stack
│   └── types.ts                    # Navigation types
├── store/
│   └── authStore.ts                # Zustand auth state
└── data/
    └── mockData.ts                 # Mock programs and ROI metrics
```

## Feature Breakdown

### Employee Dashboard (Mobile)
**Hero Section:**
- Colorful "pizza slice" SVG design with 4 colors (teal, purple, orange, blue)
- Personal greeting with user profile dropdown
- Height: 140px

**Personal Stats Cards:**
- Active Programs (teal background)
- Day Streak (orange background)
- Completion Rate (blue background)
- All using Lucide icons with white text

**My Programs Section:**
- Shows enrolled programs (Fitness Challenge, Mental Wellness)
- Progress bars with completion tracking
- "Log Activity" and "View Details" action buttons
- Colored to match program themes

**Available Programs:**
- Displays unenrolled programs (Nutrition Coaching, Financial Wellness)
- "Join" button to enroll
- Shows participant counts

**Profile Dropdown:**
- View Company Report (opens web dashboard)
- Compliance & Accessibility (navigates to compliance page)
- Logout

### Employer Dashboard (Web)
**Hero Section:**
- Same colorful SVG design as mobile
- "Employer Dashboard" title (28px font, wraps to 2 lines)
- Company name subtitle
- Logout button (top right, 20px from edges)

**Projected Annual Impact Card:**
- Purple background (#9C27B0)
- Shows total annual savings ($124K)
- Employee count (450)

**Key Performance Indicators:**
- 42% Reduction in Medical Spending
- 4.4 Days Saved Per Year (absenteeism)
- $2,835 Per Patient Savings
- 50% Health Improvement

**Program Adoption & Engagement:**
- Lists all 4 wellness programs
- Shows enrollment numbers and completion rates per program
- Color-coded by program theme

### Compliance Page
**HIPAA Compliance:**
- PHI protection details
- Privacy rights under HIPAA
- Data security measures (256-bit encryption, BAA agreements)
- Breach notification procedures

**ADA Compliance:**
- Accessibility features (screen readers, keyboard nav, high contrast)
- Reasonable accommodations policy
- WCAG 2.1 Level AA standards commitment
- Ongoing improvement process

**Contact Information:**
- Compliance department email and phone
- 30-day response commitment

## Design System

### Colors
- **Primary Purple**: #9C27B0 (Mental Wellness, main brand)
- **Teal**: #39c3c2 (Fitness Challenge, Active Programs stat)
- **Orange**: #FF9800 (Nutrition Coaching, Day Streak stat)
- **Blue**: #2196F3 (Financial Wellness, Completion Rate stat)
- **Red**: #F44336 (Logout action)

### Typography
Uses custom `Type` component with scales:
- `display`: Largest text (savings amounts)
- `h1`: Major metrics
- `h2`: Section titles, stat values
- `h3`: Subsection titles
- `h4`: Program names
- `body`: Regular text
- `caption`: Small labels, muted text

### Spacing
Consistent spacing scale via `spacing` constants:
- `xs`, `sm`, `md`, `lg`, `xl`, `xxl`

### Button States
- Primary: Colored background, white text
- Secondary: White background, colored border, colored text
- Pressed: 85% opacity (dd suffix on hex colors)
- Compact: Reduced padding for action buttons

## Mock Data

### Programs (4 total)
1. **Fitness Challenge**: Teal, Activity icon, 1247 participants, 78% completion
2. **Mental Wellness**: Purple, Brain icon, 892 participants, 85% completion
3. **Nutrition Coaching**: Orange, Apple icon, 654 participants, 72% completion
4. **Financial Wellness**: Blue, DollarSign icon, 523 participants, 68% completion

### ROI Metrics
- Medical Spending Reduction: 42%
- Absenteeism Reduction: 4.4 days/year
- Savings Per Patient: $2,835
- Health Outcome Improvement: 50%
- Total Annual Savings: $124,000
- Employee Count: 450

### User Progress
- Enrolled in programs 1 and 2 (Fitness and Mental Wellness)
- Fitness: 15/30 days completed (50%)
- Mental Wellness: 8/30 days completed (27%)

## Dependencies

### Key Libraries
- **React Native**: Core framework
- **React Navigation**: Stack navigation
- **react-native-svg**: SVG graphics for hero section
- **lucide-react-native**: Icon library
- **zustand**: State management
- **TypeScript**: Type safety

### Design System
Local copy of `@levanto/design-system` components:
- Button
- Card
- Type (typography)

## Testing

### Test Coverage
- 4 test suites, 38 tests, all passing
- Auth store tests
- Navigation tests
- Login screen tests
- Sanity tests

### Running Tests
```bash
npm test
```

### Test Files
- `__tests__/sanity.test.ts`
- `src/store/__tests__/authStore.test.ts`
- `src/navigation/__tests__/RootNavigator.test.tsx`
- `src/screens/__tests__/LoginScreen.test.tsx`

## Authentication

### Mock Login
- Username: `test@test.com`
- Password: `password`
- No backend validation (demo purposes)

### Auth Store (Zustand)
Manages:
- Authentication state
- User info (email)
- Company name
- Login/logout actions

## Navigation Flow

```
RootNavigator (auth check)
  ├─ LoginScreen (if not authenticated)
  └─ AppNavigator (if authenticated)
      ├─ Dashboard (Platform.OS router)
      │   ├─ EmployeeDashboard (iOS/Android)
      │   └─ EmployerDashboard (Web)
      ├─ ProgramDetail
      └─ Compliance
```

## Privacy & Compliance

### HIPAA Considerations
- Personal greeting shows "Hi User!" instead of email address
- Health data handling documented in Compliance page
- Encryption and security measures outlined

### ADA Compliance
- Screen reader compatible
- Keyboard navigation support
- High contrast color schemes
- Scalable text (respects system font size)
- Clear focus indicators

## Known Limitations (Demo Purposes)

### Non-Functional Features (Placeholder)
1. **Log Activity**: Console logs only, no actual activity logging
2. **Join Program**: No enrollment functionality yet
3. **View Details Button**: Navigates to detail screen but limited actions
4. **Backend**: All data is mock/static
5. **Authentication**: No real validation or session management

### Styling Constraints
- Web dashboard optimized for desktop Safari
- Mobile optimized for iOS simulator (iPhone 15 Pro tested)
- Android styling may need adjustments

## Next Steps for Full Implementation

### Phase 1: Activity Logging
- [ ] Create activity logging modal/screen
- [ ] Add activity types (steps, meditation minutes, nutrition tracking)
- [ ] Implement progress update logic
- [ ] Add activity history view

### Phase 2: Program Enrollment
- [ ] Build join program confirmation flow
- [ ] Update user's enrolled programs list
- [ ] Initialize progress tracking for new enrollments
- [ ] Add unenroll functionality

### Phase 3: Program Details Enhancement
- [ ] Add program curriculum/schedule
- [ ] Show program benefits and requirements
- [ ] Display success stories/testimonials
- [ ] Add program-specific resources

### Phase 4: Backend Integration
- [ ] Connect to actual API endpoints
- [ ] Implement real authentication
- [ ] Store user progress in database
- [ ] Real-time ROI calculations

### Phase 5: Advanced Features
- [ ] Push notifications for program reminders
- [ ] Social features (team challenges, leaderboards)
- [ ] Personalized recommendations
- [ ] Export health data
- [ ] Integration with wearables (Apple Health, Fitbit)

## Development Commands

### Start Development Server
```bash
npm start
```

### Run on iOS
```bash
npm run ios
# or press 'i' after npm start
```

### Run on Android
```bash
npm run android
# or press 'a' after npm start
```

### Run on Web
```bash
npm run web
# or press 'w' after npm start
# Then navigate to http://localhost:8082
```

### Run Tests
```bash
npm test
```

### Type Check
```bash
npm run typecheck
# (if configured)
```

### Lint
```bash
npm run lint
# (if configured)
```

## Git Workflow

Current branch: `master`

### Recommended Commit Structure
```bash
git add .
git commit -m "feat: description of feature

Co-Authored-By: Warp <agent@warp.dev>"
```

## Interview Demo Tips

### Presentation Flow
1. **Start with Login**: Show authentication (test@test.com / password)
2. **Employee View**: 
   - Show personal dashboard on mobile
   - Highlight colorful design and stats
   - Demo enrolled programs with progress
   - Show available programs to join
3. **Platform Bridge**:
   - Tap profile icon → "View Company Report"
   - Safari opens to employer dashboard
   - Explain single codebase, dual personas
4. **Employer View**:
   - Show ROI metrics and cost savings
   - Highlight business value ($124K annual savings)
   - Show program adoption rates
5. **Compliance**:
   - Back to mobile, open Compliance page
   - Highlight HIPAA and ADA considerations
   - Explain healthcare industry requirements

### Key Talking Points
- **Architecture**: Platform.OS bridge enables dual personas from single codebase
- **Design**: Cohesive color system across all programs and views
- **Business Value**: Employer dashboard shows clear ROI for wellness programs
- **Compliance**: HIPAA and ADA considerations built into design
- **Scalability**: Mock data structure supports easy backend integration
- **Testing**: Comprehensive test coverage (38 tests passing)

## Contact & Support

Project created for Baylor Scott and White Health interview demonstration.

---

**Last Updated**: February 2026
**Version**: 1.0.0 (Demo)
**Test Status**: ✅ All 38 tests passing
