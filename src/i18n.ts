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
        precipitationProbability: 'Probabilidad de precipitación',
        currentWheater: 'Clima actual'
      },
      concentrationOf: 'Concentración de',
      youNeedToGiveLocationPermissionsToContinue:
        'Es necesario dar permisos de ubicación para continuar',
      validatePermissions: 'Validar permisos',
      table: {
        name: 'Nombre',
        'sys-country': 'Codigo de país',
        'clouds-all': 'Porcentaje de nubosidad',
        'main-feels_like': 'Sensación termica (Celsius)',
        'main-temp': 'Temperatura (Celsius)',
        'main-temp_min': 'Temperatura minima (Celsius)',
        'main-temp_max': 'Temperatura maxima (Celsius)',
        'main-pressure': 'Presión (hPa)',
        'main-humidity': 'Humedad',
        visibility: 'Visibilidad (m) (Maximo valor 10km)',
        'wind-speed': 'Velocidad del viento (m/s)',
        'wind-deg': 'Dirección del viento (Grados)',
        'wind-gust': 'Rafaga'
      }
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
