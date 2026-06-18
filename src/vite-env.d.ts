/// <reference types="vite/client" />
declare module '*.glb';
declare module '*.png';
declare module '*.jpg';

// Add this right underneath your existing asset modules:
interface ImportMetaEnv {
  readonly VITE_GEMINI_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}