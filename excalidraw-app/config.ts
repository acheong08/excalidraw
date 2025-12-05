/**
 * Runtime configuration helper.
 *
 * This module provides a way to access configuration values that can be
 * overridden at runtime (e.g., in Docker) without rebuilding the application.
 *
 * Priority:
 * 1. Runtime config from window.__EXCALIDRAW_CONFIG__ (set by config.js)
 * 2. Build-time config from import.meta.env.VITE_APP_* (from .env.production)
 *
 * For Docker deployments, the entrypoint script generates config.js from
 * environment variables, allowing configuration changes without rebuilding.
 */

/**
 * Runtime configuration object.
 * Set by config.js which is generated at container startup in Docker deployments.
 */
interface ExcalidrawRuntimeConfig {
  VITE_APP_BACKEND_V2_GET_URL?: string;
  VITE_APP_BACKEND_V2_POST_URL?: string;
  VITE_APP_LIBRARY_URL?: string;
  VITE_APP_LIBRARY_BACKEND?: string;
  VITE_APP_PLUS_LP?: string;
  VITE_APP_PLUS_APP?: string;
  VITE_APP_AI_BACKEND?: string;
  VITE_APP_WS_SERVER_URL?: string;
  VITE_APP_FIREBASE_CONFIG?: string;
  VITE_APP_PLUS_EXPORT_PUBLIC_KEY?: string;
  VITE_APP_PORTAL_URL?: string;
  VITE_APP_DISABLE_SENTRY?: string;
  VITE_APP_ENABLE_TRACKING?: string;
}

declare global {
  interface Window {
    __EXCALIDRAW_CONFIG__?: ExcalidrawRuntimeConfig;
  }
}

// All configurable environment variables
type ConfigKey = keyof ExcalidrawRuntimeConfig;

/**
 * Get a configuration value, preferring runtime config over build-time config.
 * 
 * Returns runtime config if set, otherwise falls back to build-time config
 * from .env.production which is always present.
 *
 * @param key - The configuration key
 * @returns The configuration value (runtime or build-time)
 */
export function getConfig(key: ConfigKey): string {
  // Check runtime config first (set by config.js in Docker)
  const runtimeConfig = window.__EXCALIDRAW_CONFIG__;
  if (runtimeConfig && key in runtimeConfig) {
    const value = runtimeConfig[key];
    if (value !== undefined && value !== "") {
      return value;
    }
  }

  // Fall back to build-time config from .env.production
  // These values are always present at build time
  return import.meta.env[key] as string;
}
