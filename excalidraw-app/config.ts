/**
 * Runtime configuration helper.
 *
 * This module provides a way to access configuration values that can be
 * overridden at runtime (e.g., in Docker) without rebuilding the application.
 *
 * Priority:
 * 1. Runtime config from window.__EXCALIDRAW_CONFIG__ (set by config.js)
 * 2. Build-time config from import.meta.env.VITE_APP_*
 *
 * For Docker deployments, the entrypoint script generates config.js from
 * environment variables, allowing configuration changes without rebuilding.
 */

// All configurable environment variables
type ConfigKey =
  | "VITE_APP_BACKEND_V2_GET_URL"
  | "VITE_APP_BACKEND_V2_POST_URL"
  | "VITE_APP_LIBRARY_URL"
  | "VITE_APP_LIBRARY_BACKEND"
  | "VITE_APP_PLUS_LP"
  | "VITE_APP_PLUS_APP"
  | "VITE_APP_AI_BACKEND"
  | "VITE_APP_WS_SERVER_URL"
  | "VITE_APP_FIREBASE_CONFIG"
  | "VITE_APP_PLUS_EXPORT_PUBLIC_KEY"
  | "VITE_APP_PORTAL_URL"
  | "VITE_APP_DISABLE_SENTRY"
  | "VITE_APP_ENABLE_TRACKING";

/**
 * Get a configuration value, preferring runtime config over build-time config.
 *
 * @param key - The configuration key (without VITE_APP_ prefix in runtime config)
 * @returns The configuration value, or undefined if not set
 */
export function getConfig(key: ConfigKey): string | undefined {
  // Check runtime config first (set by config.js in Docker)
  const runtimeConfig = window.__EXCALIDRAW_CONFIG__;
  if (runtimeConfig && key in runtimeConfig) {
    const value = runtimeConfig[key];
    if (value !== undefined && value !== "") {
      return value;
    }
  }

  // Fall back to build-time config
  return import.meta.env[key];
}

/**
 * Get a required configuration value.
 * Throws an error if the value is not set.
 *
 * @param key - The configuration key
 * @returns The configuration value
 * @throws Error if the configuration value is not set
 */
export function getRequiredConfig(key: ConfigKey): string {
  const value = getConfig(key);
  if (value === undefined) {
    throw new Error(`Missing required configuration: ${key}`);
  }
  return value;
}
