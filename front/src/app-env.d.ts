/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_TITLE: string;
  readonly VITE_DESCRIPTION: string;
  readonly VITE_API_ENDPOINT: string;
  readonly VITE_API_VOICEURI: string;
  readonly VITE_API_TOKEN: string;
  readonly VITE_API_AVATAR_UID: string;
  readonly VITE_GRAPHQL_ANDPOINT: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
