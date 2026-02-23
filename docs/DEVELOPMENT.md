# Development Guide

This guide will help you get started developing the Levanto mobile app.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the App](#running-the-app)
- [Project Structure](#project-structure)
- [Common Commands](#common-commands)
- [Development Workflow](#development-workflow)
- [Troubleshooting](#troubleshooting)

## Prerequisites

### Required
- **Node.js**: v18 or later
- **npm**: v7 or later (for workspaces support)
- **Expo CLI**: Installed globally or via npx

### For iOS Development
- **macOS**: Required for iOS development
- **Xcode**: Latest version from the App Store
- **iOS Simulator**: Installed via Xcode
- **CocoaPods**: `sudo gem install cocoapods`

### For Android Development
- **Android Studio**: Latest version
- **Android SDK**: API level 33+
- **Android Emulator**: Configured via Android Studio

### For Web Development
- **Modern browser**: Chrome, Firefox, or Safari

## Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd levanto-mobile
```

### 2. Install Dependencies

**From the monorepo root:**
```bash
npm install
```

This will:
- Install all dependencies for all workspace packages
- Hoist shared dependencies to the root `node_modules`
- Run the postinstall script to patch Zustand
- Set up symlinks for workspace packages

### 3. Verify Installation

```bash
cd apps/mobile
npx expo start --clear
```

You should see Metro bundler start successfully.

## Running the App

### iOS Simulator

```bash
cd apps/mobile
npx expo start --ios
```

Or start Metro first, then press `i`:
```bash
npx expo start
# Press 'i' when Metro is running
```

**First run:** May take several minutes to build

### Android Emulator

```bash
cd apps/mobile
npx expo start --android
```

Or start Metro first, then press `a`:
```bash
npx expo start
# Press 'a' when Metro is running
```

**Note:** Make sure an Android emulator is running first

### Web Browser

```bash
cd apps/mobile
npx expo start --web
```

Or start Metro first, then press `w`:
```bash
npx expo start
# Press 'w' when Metro is running
```

App will open in your default browser at `http://localhost:8081`

### Physical Device

1. Install **Expo Go** from App Store (iOS) or Play Store (Android)
2. Start Metro:
   ```bash
   npx expo start
   ```
3. Scan the QR code with your device:
   - **iOS**: Use Camera app
   - **Android**: Use Expo Go app

## Project Structure

```
apps/mobile/
├── App.tsx                    # Root component
├── app.json                   # Expo config
├── metro.config.js            # Metro bundler config (important!)
├── package.json               # Dependencies & scripts
├── tsconfig.json              # TypeScript config
├── docs/                      # Documentation (you are here)
├── scripts/
│   └── patch-zustand.js       # Postinstall patch script
└── src/
    ├── design-system/         # Copied from packages (local copy)
    │   ├── components/
    │   ├── skins/
    │   └── index.ts
    ├── navigation/            # React Navigation setup
    │   ├── RootNavigator.tsx  # Root navigator with auth check
    │   ├── AppNavigator.tsx   # Authenticated screens
    │   └── types.ts           # Navigation type definitions
    ├── screens/               # Screen components
    │   ├── LoginScreen.tsx
    │   ├── DashboardScreen.tsx
    │   └── ProgramDetailScreen.tsx
    └── store/                 # Zustand state management
        └── authStore.ts       # Authentication state
```

## Common Commands

### Development

```bash
# Start Metro bundler
npx expo start

# Start with cache cleared (fixes many issues)
npx expo start --clear

# Start on specific platform
npx expo start --ios
npx expo start --android
npx expo start --web

# Run TypeScript type checking
npm run typecheck  # (if script exists)

# Run linting
npm run lint       # (if script exists)
```

### Debugging

```bash
# Clear all caches
npx expo start --clear

# Kill all running processes
pkill -9 -f "expo|metro"
lsof -ti:8081,19000,19001,19002 | xargs kill -9

# Reset Metro cache manually
rm -rf node_modules/.cache
rm -rf ../../node_modules/.cache  # Monorepo root cache
```

### Building

```bash
# Development builds (for testing native features)
npx expo run:ios
npx expo run:android

# Production builds (requires EAS account)
npx eas build --platform ios
npx eas build --platform android
npx eas build --platform all
```

## Development Workflow

### 1. Making Code Changes

The app uses Fast Refresh, so most changes appear instantly without reloading:
- ✅ Component changes
- ✅ Style changes
- ✅ Most hook changes
- ❌ Native module changes (requires rebuild)
- ❌ Metro config changes (requires restart)

### 2. Adding New Dependencies

**Always install from the monorepo root:**

```bash
# Navigate to monorepo root
cd /path/to/levanto-mobile

# Install package for the mobile app
npm install <package-name> -w apps/mobile

# Or install as dev dependency
npm install <package-name> -D -w apps/mobile
```

After installing, the postinstall script will run automatically.

### 3. Testing Login Flow

Use these credentials:
- **Email:** Any valid email (e.g., `test@example.com`)
- **Password:** `admin`

The app displays this tip on the login screen.

### 4. Working with State

The app uses Zustand for state management. State persists across app restarts using:
- **iOS/Android:** AsyncStorage
- **Web:** localStorage

To clear persisted state:
```javascript
// In browser console (web):
localStorage.clear()

// Or logout via the app's logout button
```

### 5. Navigation

The app uses React Navigation with a conditional root navigator:
- **Logged out:** Shows `LoginScreen`
- **Logged in:** Shows `AppNavigator` with `DashboardScreen` and `ProgramDetailScreen`

Add new screens to `src/navigation/AppNavigator.tsx`.

## Troubleshooting

### Metro Won't Start

```bash
# Clear everything
pkill -9 -f "expo|metro"
rm -rf node_modules/.cache
npx expo start --clear
```

### "Module does not exist" Errors

This usually means symlink resolution is broken.

**Fix:**
1. Verify `@rnx-kit/metro-resolver-symlinks` is installed
2. Clear Metro cache: `npx expo start --clear`
3. Check `metro.config.js` hasn't been modified
4. Reinstall dependencies:
   ```bash
   cd /path/to/levanto-mobile  # Monorepo root
   rm -rf node_modules
   npm install
   ```

### "Cannot use 'import.meta' outside a module"

The Zustand patch didn't apply.

**Fix:**
1. Check if `scripts/patch-zustand.js` exists
2. Verify `package.json` has the postinstall script:
   ```json
   "postinstall": "node scripts/patch-zustand.js"
   ```
3. Manually run the patch:
   ```bash
   node scripts/patch-zustand.js
   ```
4. Restart Metro

### White Screen on iOS/Android

**Debug steps:**
1. Check Metro bundler output for errors
2. Enable remote debugging:
   - Shake device or press `Cmd+D` (iOS) / `Cmd+M` (Android)
   - Select "Debug Remote JS"
   - Open Chrome DevTools
3. Check if `react-native-gesture-handler` is imported at top of `App.tsx`
4. Try rebuilding:
   ```bash
   npx expo run:ios --clear
   # or
   npx expo run:android --clear
   ```

### Web Works but Native Doesn't

Check for web-specific code or dependencies:
1. Search for `Platform.OS === 'web'` checks
2. Verify native dependencies are installed
3. Check if native modules need linking (Expo usually handles this)

### TypeScript Errors

```bash
# Check for errors
npx tsc --noEmit

# If types are missing
npm install @types/<package-name> -D -w apps/mobile
```

### Build Errors

```bash
# iOS: Clean build folder
cd ios && xcodebuild clean && cd ..
npx expo run:ios --clear

# Android: Clean gradle
cd android && ./gradlew clean && cd ..
npx expo run:android --clear
```

## Getting Help

- **Monorepo Setup:** See [MONOREPO_SETUP.md](./MONOREPO_SETUP.md)
- **Zustand Patch:** See [ZUSTAND_PATCH.md](./ZUSTAND_PATCH.md)
- **Expo Docs:** https://docs.expo.dev/
- **React Navigation:** https://reactnavigation.org/
- **Metro Config:** https://facebook.github.io/metro/docs/configuration

## Next Steps

- Add more screens to `src/screens/`
- Build out the dashboard with real data
- Implement API integration
- Add more comprehensive tests
- Set up EAS builds for production
