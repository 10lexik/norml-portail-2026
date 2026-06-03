import { createI18n } from 'vue-i18n'
import fr from './locales/fr.json'
import en from './locales/en.json'

// Type-define 'en-US' as the master schema for the resource
export type MessageSchema = typeof fr

export const i18n = createI18n<[MessageSchema], 'fr' | 'en'>({
  legacy: false, // Set to false to use Composition API
  globalInjection: true,
  locale: 'fr',
  fallbackLocale: 'en',
  messages: {
    fr,
    en
  }
})
