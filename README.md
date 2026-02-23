# Levanto Mobile

A React Native showcase app demonstrating enterprise-grade mobile development with a focus on wellness and employee engagement programs.

## Overview

Levanto is a cross-platform mobile application built to showcase professional React Native development practices. The app demonstrates a complete authentication flow, navigation system, state management, and a custom design system—all running on iOS, Android, and Web from a single codebase.

**Purpose:** This is a portfolio/showcase project designed to demonstrate:
- Modern React Native architecture
- Monorepo setup with npm workspaces
- Cross-platform development (iOS, Android, Web)
- Advanced Metro bundler configuration
- Custom design system implementation
- Professional state management patterns

## Features

### Current Features
- ✅ **Authentication Flow**
  - Login screen with form validation
  - Persistent authentication state
  - Secure logout functionality

- ✅ **Cross-Platform Support**
  - iOS (via Expo / React Native)
  - Android (via Expo / React Native)
  - Web (via React Native Web)

- ✅ **Navigation**
  - React Navigation with TypeScript
  - Conditional navigation based on auth state
  - Type-safe navigation parameters

- ✅ **State Management**
  - Zustand for lightweight state management
  - Persistent storage (AsyncStorage on native, localStorage on web)
  - Custom patch for Metro compatibility

- ✅ **Custom Design System**
  - Reusable UI components (Button, Field, Card, Type)
  - Themeable with custom skins
  - Consistent across all platforms

### Planned Features
- 🚧 Dashboard with KPIs and metrics
- 🚧 Program detail screens
- 🚧 API integration
- 🚧 Push notifications
- 🚧 Comprehensive test coverage

## Tech Stack

### Core
- **React Native**: 0.76.6 (via Expo SDK 54)
- **Expo**: SDK 54
- **TypeScript**: Full type safety
- **React Navigation**: v7 (native-stack navigator)

### State Management
- **Zustand**: Lightweight state management
- **AsyncStorage**: Native persistence
- **Custom patches**: Metro compatibility fixes

### UI & Styling
- **Custom Design System**: Built in-house
- **React Native Web**: Web platform support
- **Gesture Handler**: Touch interactions

### Development Tools
- **Metro Bundler**: With custom configuration
- **@rnx-kit/metro-resolver-symlinks**: Monorepo support
- **npm workspaces**: Monorepo management
- **ESLint & TypeScript**: Code quality

### Monorepo Structure
This app lives in a monorepo with shared packages:
- `@levanto/design-system`: Shared UI components
- `@levanto/api`: API client (planned)
- `@levanto/types`: Shared TypeScript types
- `@levanto/utils`: Shared utilities

## Quick Start

### Prerequisites
- Node.js v18+
- npm v7+ (for workspaces)
- Xcode (for iOS development)
- Android Studio (for Android development)

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd levanto-mobile

# Install dependencies (from monorepo root)
npm install

# Start the app
cd apps/mobile
npx expo start
```

Then press:
- `i` for iOS Simulator
- `a` for Android Emulator
- `w` for Web Browser

### Login Credentials
- **Email:** Any valid email (e.g., `test@example.com`)
- **Password:** `admin`

## Documentation

Comprehensive documentation is available in the `docs/` directory:

- **[Development Guide](./docs/DEVELOPMENT.md)** - Getting started, running the app, common commands
- **[Monorepo Setup](./docs/MONOREPO_SETUP.md)** - How the monorepo works, Metro configuration, troubleshooting
- **[Zustand Patch](./docs/ZUSTAND_PATCH.md)** - Why and how we patch Zustand for Metro compatibility

## Key Technical Decisions

### Why Monorepo?
The app is structured as a monorepo to demonstrate:
- Code sharing between mobile and future web/backend projects
- Centralized dependency management
- Design system that can be published and reused

**Current limitation:** The design system is copied locally rather than symlinked due to Metro bundler constraints. Once the design system is published to npm, this workaround won't be needed.

### Why Zustand?
- Lightweight (~1KB)
- Simple API compared to Redux
- Built-in persistence middleware
- TypeScript-first design

### Why Custom Design System?
- Demonstrates component library creation skills
- Full control over theming and styling
- Reusable across future projects
- Shows understanding of design systems

### Why React Navigation?
- Industry standard for React Native
- Excellent TypeScript support
- Native platform integration
- Comprehensive documentation

## Project Structure

```
apps/mobile/
├── App.tsx                      # Root component
├── app.json                     # Expo configuration
├── metro.config.js              # Custom Metro config ⚠️ Important!
├── package.json                 # Dependencies & scripts
├── docs/                        # Documentation
│   ├── DEVELOPMENT.md
│   ├── MONOREPO_SETUP.md
│   └── ZUSTAND_PATCH.md
├── scripts/
│   └── patch-zustand.js         # Postinstall patch for Zustand
└── src/
    ├── design-system/           # Local copy of design system
    ├── navigation/              # React Navigation setup
    ├── screens/                 # Screen components
    └── store/                   # Zustand stores
```

## Development

### Common Commands

```bash
# Start Metro bundler
npx expo start

# Clear cache and start
npx expo start --clear

# Run on specific platform
npx expo start --ios
npx expo start --android
npx expo start --web

# Kill all processes (when things get stuck)
pkill -9 -f "expo|metro"
```

### Testing

```bash
# Run tests (when implemented)
npm test

# Type checking
npx tsc --noEmit
```

## Troubleshooting

Common issues and solutions:

### "Module does not exist" errors
```bash
npx expo start --clear
```

### "Cannot use 'import.meta' outside a module"
```bash
node scripts/patch-zustand.js
npx expo start --clear
```

### White screen on load
1. Check Metro bundler output
2. Clear cache: `npx expo start --clear`
3. Check for errors in console

See [DEVELOPMENT.md](./docs/DEVELOPMENT.md#troubleshooting) for more solutions.

## Monorepo Challenges Solved

This project demonstrates solutions to real-world monorepo challenges:

1. **Metro Symlink Resolution** - Using `@rnx-kit/metro-resolver-symlinks`
2. **Zustand Import.meta Error** - Custom postinstall patch script
3. **Expo AppEntry Resolution** - Custom Metro resolver
4. **Cross-Platform Compatibility** - Conditional exports and platform-specific code

See [MONOREPO_SETUP.md](./docs/MONOREPO_SETUP.md) for detailed explanations.

## Contributing

This is a showcase/portfolio project. Contributions, suggestions, and feedback are welcome!

## License

MIT

## Contact

Built by Levi Donaldson as a professional portfolio piece.

## Acknowledgments

- **Expo** - For excellent React Native tooling
- **Microsoft (@rnx-kit)** - For monorepo symlink resolution
- **React Navigation** - For robust navigation
- **Zustand** - For elegant state management
