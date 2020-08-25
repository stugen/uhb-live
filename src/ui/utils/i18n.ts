import Vue from 'vue'
import VueI18n from 'vue-i18n'
import { Settings } from 'luxon'
import localeDe from '../locales/de.json'
import localeEn from '../locales/en.json'

Vue.use(VueI18n)

const languages = ['de', 'en']

const getBrowserLanguage = (): string => {
  return navigator.language.split('-')[0]
}

const getStoredLanguage = (): string | null => {
  return window.localStorage.getItem('locale')
}

const getLanguage = (): string => {
  const storedOrBrowser = getStoredLanguage() || getBrowserLanguage()
  if (!languages.includes(storedOrBrowser)) {
    return 'en'
  }
  return storedOrBrowser
}

export const i18n = new VueI18n({
  locale: getLanguage(),
  fallbackLocale: 'en',
  messages: {
    'en': {
      ...localeEn
    },
    'de': {
      ...localeDe
    }
  }
})

export const setLanguage = (lang: string): void => {
  if (!languages.includes(lang)) {
    return
  }
  window.localStorage.setItem('locale', lang)
  i18n.locale = lang
  Settings.defaultLocale = lang
}
