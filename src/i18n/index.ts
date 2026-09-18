import ru, { type Dict } from '@/i18n/ru'
import kk from '@/i18n/kk'
import en from '@/i18n/en'

export type { Dict }

export const LOCALES = ['ru', 'kk', 'en'] as const

export type Locale = (typeof LOCALES)[number]

export const DEFAULT_LOCALE: Locale = 'ru'

const TAGS: Record<Locale, string> = {
  ru: 'ru-RU',
  kk: 'kk-KZ',
  en: 'en-US',
}

const OG_LOCALES: Record<Locale, string> = {
  ru: 'ru_RU',
  kk: 'kk_KZ',
  en: 'en_US',
}

const DICTS: Record<Locale, Dict> = { ru, kk, en }

export const isLocale = (value: string | undefined): value is Locale =>
  value !== undefined && (LOCALES as readonly string[]).includes(value)

export const localeOf = (value: string | undefined): Locale =>
  isLocale(value) ? value : DEFAULT_LOCALE

export const localeTag = (locale: Locale): string => TAGS[locale]

export const ogLocale = (locale: Locale): string => OG_LOCALES[locale]

export const localePaths = (): { params: { locale: string | undefined } }[] =>
  LOCALES.map((locale) => ({
    params: { locale: locale === DEFAULT_LOCALE ? undefined : locale },
  }))

export const useTranslations = (value: string | undefined): Dict =>
  DICTS[localeOf(value)]
