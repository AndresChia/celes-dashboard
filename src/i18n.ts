import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  es: {
    translation: {
      'menu': 'Menu'
    }
  },
  en: {
    translation: {
      'menu': 'Menu'
    }
  },
  fr: {
    translation: {
      'menu': 'Menu'
    }
  }
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'es',
  interpolation: {
    escapeValue: false
  }
});

export default i18n;
