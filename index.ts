import { registerRootComponent } from 'expo';

import App from './App';

// Shim import.meta for web to prevent Redux DevTools errors
if (typeof window !== 'undefined' && !('import' in window)) {
  (window as any).import = { meta: { env: { MODE: 'production' } } };
}

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
