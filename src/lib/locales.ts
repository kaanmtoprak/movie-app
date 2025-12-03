// Shared locale configuration that can be imported by both client and server components
export const locales = ['en', 'tr'] as const;
export type Locale = (typeof locales)[number];

