import { Component } from 'react';
import { Helmet } from 'react-helmet';
import { Header } from '../../components/header/header';
import { Navbar } from '../../components/navBar/navbar';
import { withTranslation } from 'react-i18next';
import { PrecipitationProbabilityChart } from '../../components/precipitation-probability-chart/precipitation-probability-chart';
import axios from 'axios';
import {
  List,
  PrecipitationProbabilityI
} from '../../components/precipitation-probability-chart/precipitation-probability-interface';
import { I18nTranslate } from '../../utils/i18n';

export class PrecipitationProbability extends Component {
  breadcrumb: Navbar[] = [
    { link: '/home', title: 'home' },
    { link: '/precipitation-probability', title: 'precipitationProbability' }
  ];

  state = {
    days: null,
    location: false,
    error: null
  };
  private _asyncRequest: any;

  componentDidMount() {
    if (navigator.geolocation) {
      this.setState({ location: true });
      navigator.geolocation.getCurrentPosition(
        (location) => {
          const { latitude, longitude } = location.coords;
          this._asyncRequest = this.loadMyAsyncData(latitude, longitude)
            .then((response) => {
              const days: { [days: string]: any } = {};
              response.data.list.forEach((element: List) => {
                let day = new Date(element.dt * 1000).toLocaleString('default', { day: 'numeric' });
                this.calculateTempDay(days, day, { ...element.main, pop: element.pop * 100 });
              });
              this._asyncRequest = null;
              this.setState({ days: Object.values(days) });
            })
            .catch((error) => {
              return { data: { list: [] } };
            });
        },
        (error) => {
          this.setState({ error });
        }
      );
    }
    this.setState({ location: false });
  }

  calculateTempDay = (
    days: { [days: string]: any },
    day: string,
    {
      temp,
      temp_max,
      temp_min,
      pop
    }: { temp: number; temp_max: number; temp_min: number; pop: number }
  ) => {
    // THE MONTH EXISTS
    if (days[day]) {
      days[day].temp_min = days[day].temp_min < temp_min ? days[day].temp_min : temp_min;
      days[day].temp_max = days[day].temp_max > temp_max ? days[day].temp_max : temp_max;
      days[day].temp = (days[day].temp + temp) / 2;
      days[day].pop = (days[day].pop + pop) / 2;
      return;
    }
    // THE MONTH DOES NOT EXIST
    days[day] = { day, temp, temp_max, temp_min, pop };
  };

  loadMyAsyncData(latitude: number = 0, longitude: number = 0) {
    const openKey = process.env.REACT_APP_OPEN_WEATHER_API_ID;
    return axios
      .get<PrecipitationProbabilityI>(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${openKey}`
      )
      .catch((error) => {
        return { data: { list: [] } };
      });
  }

  componentWillUnmount() {
    if (this._asyncRequest) {
      this._asyncRequest?.cancel();
    }
  }

  render() {
    return (
      <>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Celes - Precipation probability</title>
        </Helmet>
        <Header breadcrumb={this.breadcrumb} />
        <div className="p-4 xl:ml-80">
          <div className="mt-4">
            <div className="mb-12">
              <div className="cursor-pointer">
                <div className="w:full p-3 relative  bg-clip-border rounded-xl bg-white text-gray-700 shadow-md overflow-hidden mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-2">
                  <div className="h-[400px]">
                    <div className="p-3">
                      <h1>
                        <I18nTranslate i18n="precipitationProbabilityAndTemperatures" />
                      </h1>
                    </div>
                    <div className="h-[350px]">
                      <PrecipitationProbabilityChart data={this.state.days} />
                    </div>
                  </div>
                  <div className="flex justify-center items-center">
                    <div className="w-full">
                      <ul className="flex flex-col w-full">
                        <li className="relative flex flex-col gap-2">
                          <span className="absolute left-0 grid justify-center transition-opacity duration-200 bg-transparent">
                            <span className="h-full w-0.5 bg-blue-gray-100"></span>
                          </span>
                          <div className="flex items-center  gap-4">
                            <span className="relative z-[2] w-max flex-shrink-0 overflow-hidden rounded-full bg-gray-900 p-1.5 text-white"></span>
                            <h6 className="block font-sans text-base antialiased font-semibold leading-none tracking-normal text-blue-gray-900">
                              <I18nTranslate i18n="probabilityOfPrecipitation" />
                            </h6>
                          </div>
                          <div className="flex gap-4 pb-8">
                            <span className="flex-shrink-0 invisible h-full pointer-events-none"></span>
                            <div>
                              <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-600">
                                <I18nTranslate
                                  i18n="theValuesOfTheParameterVaryBetweenXXandXXX"
                                  params={{ param1: '0', param2: '100' }}
                                />{' '}
                              </p>
                              <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-600">
                                <I18nTranslate
                                  i18n="WhereXXisEqualToXXX"
                                  params={{ param1: '0', param2: '0' }}
                                />
                              </p>
                              <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-600">
                                <I18nTranslate
                                  i18n="WhereXXisEqualToXXX"
                                  params={{ param1: '100', param2: '100' }}
                                />
                              </p>
                            </div>
                          </div>
                        </li>
                        <li className="relative flex flex-col gap-2">
                          <span className="absolute left-0 grid justify-center transition-opacity duration-200 bg-transparent">
                            <span className="h-full w-0.5 bg-blue-gray-100"></span>
                          </span>
                          <div className="flex items-center  gap-4">
                            <span className="relative z-[2] w-max flex-shrink-0 overflow-hidden rounded-full bg-gray-900 p-1.5 text-white"></span>
                            <h6 className="block font-sans text-base antialiased font-semibold leading-none tracking-normal text-blue-gray-900">
                              <I18nTranslate i18n="temperatures" />
                            </h6>
                          </div>
                          <div className="flex gap-4 pb-8">
                            <span className="flex-shrink-0 invisible h-full pointer-events-none"></span>
                            <div>
                              <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-600">
                                <I18nTranslate i18n="minimumTemperatureCelsiusAtTheMomentOfCalculation" />
                              </p>
                              <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-600">
                                <I18nTranslate i18n="maximumTemperatureCelsiusAtTheMomentOfCalculation" />
                              </p>
                              <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-600">
                                <I18nTranslate i18n="temperatureCelsius" />
                              </p>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default withTranslation()(PrecipitationProbability);
