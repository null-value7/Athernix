// lib/language.ts — Fuente única del idioma seleccionado (web + Unity)
// El idioma vive en: localStorage 'atx-lang' + cookie googtrans (Google Translate).
// Unity lo lee de dos formas:
//   1. Autodetección: el jslib AthernixLanguage.jslib lee localStorage/cookie al arrancar
//   2. Push en vivo: sendMessage('TranslationManager', 'SetLanguage', lang) al cambiar

export const SUPPORTED_LANGUAGES = ['es', 'en', 'pt', 'fr', 'it'] as const;
export type AppLanguage = (typeof SUPPORTED_LANGUAGES)[number];

const STORAGE_KEY = 'atx-lang';
const EVENT_NAME = 'atx-language-changed';

export function getCurrentLanguage(): AppLanguage {
  if (typeof window === 'undefined') return 'es';

  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored && (SUPPORTED_LANGUAGES as readonly string[]).includes(stored)) {
    return stored as AppLanguage;
  }

  const match = document.cookie.match(/(?:^|;\s*)googtrans=\/[a-z-]+\/([a-z-]+)/i);
  if (match) {
    const lang = match[1].slice(0, 2).toLowerCase();
    if ((SUPPORTED_LANGUAGES as readonly string[]).includes(lang)) return lang as AppLanguage;
  }

  return 'es';
}

/** Persiste el idioma y notifica a los listeners (ej. instancias Unity montadas). */
export function persistLanguage(lang: string): void {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(STORAGE_KEY, lang);
  window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: lang }));
}

/** Suscripción a cambios de idioma. Devuelve la función de cleanup. */
export function onLanguageChange(callback: (lang: string) => void): () => void {
  if (typeof window === 'undefined') return () => {};
  const handler = (e: Event) => callback((e as CustomEvent<string>).detail);
  window.addEventListener(EVENT_NAME, handler);
  return () => window.removeEventListener(EVENT_NAME, handler);
}
