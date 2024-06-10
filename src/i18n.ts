import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  es: {
    translation: {
      menu: {
        title: 'Menu',
        home: 'Home',
        airPollution: 'Contaminación del aire',
        precipitationProbability: 'Probabilidad de precipitación'
      },
      concentrationOf: 'Concentración de'
    }
  },
  en: {
    translation: {
      menu: { title: 'Menu', home: 'Home' }
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
