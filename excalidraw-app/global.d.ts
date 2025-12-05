import "@excalidraw/excalidraw/global";
import "@excalidraw/excalidraw/css";

/**
 * Runtime configuration object.
 * Set by config.js which is generated at container startup in Docker deployments.
 * This allows environment variables to be changed without rebuilding the image.
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

interface Window {
  __EXCALIDRAW_SHA__: string | undefined;
  __EXCALIDRAW_CONFIG__?: ExcalidrawRuntimeConfig;
}
