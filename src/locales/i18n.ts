import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './en/en.json'
import ko from './ko/ko.json'

export const languages = [ 'en', 'ko' ] as const;  // 추가 2 
export type Languages = typeof languages[number]; // 추가 2  // 'en' | 'ko'

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      ko: { translation: ko }
    },
    fallbackLng: 'en',
    lng: 'en',
    interpolation: { escapeValue: false },
    react: { useSuspense: false }
  })

export default i18n
