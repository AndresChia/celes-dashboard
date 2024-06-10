import { faCloudRain, faHouse, faSmog } from '@fortawesome/free-solid-svg-icons';

export const MENUS = [
  {
    title: 'home',
    icon: faHouse,
    link: '/home'
  },
  {
    title: 'airPollution',
    icon: faSmog,
    link: '/air-pollution'
  },
  {
    title: 'precipitationProbability',
    icon: faCloudRain,
    link: '/precipitation-probability'
  },
  {
    title: 'currentWheater',
    icon: faCloudRain,
    link: '/current-wheater'
  }
];
