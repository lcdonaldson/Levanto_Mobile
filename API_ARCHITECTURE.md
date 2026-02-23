# API Architecture

## Overview
This application demonstrates production-ready API integration patterns with a clean 3-layer architecture. While the demo uses simulated API calls for portability, the structure is designed for seamless backend integration.

## Architecture Layers

### 1. API Client Layer (`src/services/api.ts`)
**Purpose**: Centralized HTTP client with error handling and authentication

**Features**:
- Base fetch wrapper with request/response transformation
- Custom `ApiError` class for typed error handling
- HTTP method helpers (GET, POST, PUT, PATCH, DELETE)
- Authentication header injection (ready for JWT tokens)
- Network delay simulation for realistic demo behavior

**Production-Ready**:
```typescript
// Currently simulated for demo
await apiGet('/progress');

// Swap to real implementation:
const response = await fetch(`${API_BASE_URL}/progress`, {
  headers: {
    'Authorization': `Bearer ${getAuthToken()}`,
    'Content-Type': 'application/json',
  },
});
```

### 2. Service Layer (`src/services/progressService.ts`)
**Purpose**: Business logic and REST endpoint definitions

**API Endpoints Implemented**:
```
GET    /progress              - Fetch user's progress
POST   /progress/enroll       - Enroll in a program
DELETE /progress/unenroll/:id - Unenroll from a program
POST   /progress/activity     - Log an activity
POST   /progress/reset        - Reset progress (demo only)
```

**Features**:
- Async/await patterns throughout
- Error handling with meaningful messages
- TypeScript types for request/response
- Business logic (validation, data transformation)
- Storage abstraction (AsyncStorage for mobile, localStorage for web)

**Production-Ready**:
```typescript
// Currently: calls API client + local storage
export async function enrollInProgram(programId: string) {
  await apiPost('/progress/enroll', { programId });
  // Update local data
}

// Production: just return API response
export async function enrollInProgram(programId: string) {
  return await apiPost('/progress/enroll', { programId });
}
```

### 3. State Management Layer (`src/store/progressStore.ts`)
**Purpose**: Zustand store that coordinates with services

**Features**:
- Clean separation: store doesn't know about HTTP
- Async action handlers
- Loading states for UI feedback
- Optimistic updates possible
- Error propagation to UI

**Pattern**:
```typescript
joinProgram: async (programId: string) => {
  set({ isLoading: true });
  try {
    const data = await progressService.enrollInProgram(programId);
    set({
      enrolledProgramIds: data.enrolledProgramIds,
      programProgress: data.programProgress,
      isLoading: false,
    });
  } catch (error) {
    set({ isLoading: false });
    throw error; // UI can handle
  }
}
```

## Demo Features vs Production

### What's Simulated for Demo:
1. **Network calls** - Using setTimeout to simulate 300ms latency
2. **Data storage** - AsyncStorage/localStorage instead of database
3. **API responses** - Generated locally from mock data

### What's Production-Ready:
1. **API endpoint structure** - RESTful patterns, proper HTTP methods
2. **Error handling** - Custom error classes, try/catch patterns
3. **Async patterns** - Proper async/await throughout
4. **Type safety** - Full TypeScript coverage
5. **Separation of concerns** - Clear layer boundaries
6. **Authentication ready** - Headers prepared for JWT tokens

## Console Logging
API calls are logged to console for demonstration:

```
[API] POST /progress/enroll {"programId":"3"}
[API] POST /progress/activity {"programId":"1","activityType":"steps","value":8000,"description":"Logged 8000 steps"}
[API] GET /progress
```

This shows reviewers the API interaction patterns even without a backend.

## Migration to Real Backend

**Step 1**: Deploy backend with matching endpoints
```
POST https://api.levanto.health/progress/enroll
POST https://api.levanto.health/progress/activity
GET  https://api.levanto.health/progress
```

**Step 2**: Update `src/services/api.ts` to use real fetch:
```typescript
// Uncomment this section:
const response = await fetch(`${API_BASE_URL}${endpoint}`, {
  ...options,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${getAuthToken()}`,
    ...options.headers,
  },
});

if (!response.ok) {
  throw new ApiError('Request failed', response.status);
}

return await response.json();
```

**Step 3**: Update `src/services/progressService.ts` to return API data:
```typescript
// Remove local storage logic
// Return API responses directly
export async function enrollInProgram(programId: string) {
  return await apiPost('/progress/enroll', { programId });
}
```

**Done!** Store and UI require no changes.

## Key Interview Talking Points

### Demonstrates Understanding Of:
1. **RESTful API Design** - Proper HTTP methods, resource-based URLs
2. **Async JavaScript** - Promises, async/await, error handling
3. **Separation of Concerns** - Clear boundaries between layers
4. **Error Handling** - Custom error classes, propagation patterns
5. **Type Safety** - TypeScript interfaces for API contracts
6. **Production Patterns** - Ready for real backend with minimal changes

### Shows Experience With:
- React hooks (useEffect for data loading)
- State management (Zustand)
- Mobile development (Platform.OS, AsyncStorage)
- Web development (localStorage, CORS awareness)
- TypeScript (interfaces, generics, type safety)

## Architecture Benefits

### Maintainability
- Single place to update API URLs
- Centralized error handling
- Clear responsibility per layer

### Testability
- Services can be mocked easily
- Store can be tested independently
- UI can test with mock store

### Scalability  
- Add new endpoints in service layer
- Add new actions in store
- UI automatically benefits

### Team Collaboration
- Backend team: here are the endpoints needed
- Frontend team: here's how we'll call them
- Clear contract between teams

---

**This architecture demonstrates production-ready patterns in a portable demo format. It shows technical skills while remaining functional without backend infrastructure.**
