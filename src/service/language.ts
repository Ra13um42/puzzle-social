import { reactive, toRefs, computed } from "vue"
import languages from '../languages/languages'
import en from '../languages/en.json'

const state = reactive({
  language: languages[1],
  texts: en
})

const fetchTranslations = async () => {
  if (state.language) {
    const translations = await import(`../languages/${state.language.code}.json`)
    state.texts = translations.default
  }
}

const getText = (path: string) : string => {
  return path.split('.').reduce((acc: any, key) => acc?.[key], state.texts) ?? ''
}

let text = (path: string) => {
  return computed(() => {
    return getText(path)
  }).value
}

const setLanguage = (language: any) => {
  state.language = language
  localStorage.setItem('language', language.code)
  fetchTranslations()
}

function findLanguage (code: string) {
  return languages.find((item) => item.code === code)
}

const initialize = () => {
  const app_language = localStorage.getItem('language') || navigator.language.split('-')[0]

  if (app_language) {
    let language = findLanguage(app_language)
    if (language) {
      setLanguage(language)
    }
  }
}

export default function useLanguage() {
  return {
    ...toRefs(state),
    getText,
    text,
    setLanguage,
    languages,
    initialize
  }
}
