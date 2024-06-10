import { Component } from 'react';
import { Helmet } from 'react-helmet';
import { Header } from '../../components/header/header';
import { Navbar } from '../../components/navBar/navbar';
import { AirPollutionChart } from '../../components/air-pollution-chart/air-pollution-chart';
import axios from 'axios';
import {
  AirPollutionI,
  List
} from '../../components/air-pollution-chart/air-pollution-chart-interface';
import { withTranslation } from 'react-i18next';
import { AirPollutionComponentsChart } from '../../components/air-pollution-components-chart/air-pollution-components-chart';

export class AirPollution extends Component {
  state = {
    aquiMonths: null,
    componentsMonths: null
  };

  breadcrumb: Navbar[] = [
    { link: '/home', title: 'home' },
    { link: '/air-pollution', title: 'airPollution' }
  ];

  _asyncRequest!: any;

  componentDidMount() {
    if (navigator.geolocation) {
      this.setState({ location: true });
      navigator.geolocation.getCurrentPosition(
        (location) => {
          const { latitude, longitude } = location.coords;
          this._asyncRequest = this.loadMyAsyncData(latitude, longitude)
            .then((response) => {
              const aquiMonths: { [month: string]: any } = {};
              const componentsMonths: { [month: string]: any } = {};
              response.data.list.forEach((element: List) => {
                let month = new Date(element.dt * 1000).toLocaleString('default', {
                  month: 'long'
                });
                const aqi = element.main.aqi;
                const components = element.components;
                this.calculatePromAqiMonth(aquiMonths, month, aqi);
                this.calculatePromComponentsMonth(componentsMonths, month, components);
              });
              this._asyncRequest = null;
              this.setState({
                aquiMonths: Object.values(aquiMonths),
                componentsMonths: Object.values(componentsMonths)
              });
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

  loadMyAsyncData(latitude: number = 0, longitude: number = 0) {
    const date = new Date();
    const end = Math.floor(date.getTime() / 1000);
    date.setMonth(date.getMonth() - 2);
    let start = Math.floor(date.getTime() / 1000);
    const openKey = process.env.REACT_APP_OPEN_WEATHER_API_ID;
    return axios.get<AirPollutionI>(
      `http://api.openweathermap.org/data/2.5/air_pollution/history?lat=${latitude}&lon=${longitude}&start=${start}&end=${end}&appid=${openKey}`
    );
  }

  calculatePromComponentsMonth = (
    componentsMonths: { [month: string]: any },
    month: string,
    components: { [key: string]: number }
  ) => {
    for (const [key, value] of Object.entries(components)) {
      // THE MONTH EXISTS
      if (componentsMonths[month] && componentsMonths[month][key] !== undefined) {
        let promedio = (componentsMonths[month][key] + value) / 2;
        componentsMonths[month][key] = promedio;
      } else if (componentsMonths[month] && componentsMonths[month][key] === undefined) {
        componentsMonths[month][key] = value;
      } else {
        componentsMonths[month] = { month };
        componentsMonths[month][key] = value;
      }
    }
  };

  calculatePromAqiMonth = (aquiMonths: { [month: string]: any }, month: string, aqi: number) => {
    // THE MONTH EXISTS
    if (aquiMonths[month]) {
      if (aquiMonths[month].min > aqi) {
        let promedio = (aquiMonths[month].min + aqi) / 2;
        aquiMonths[month].min = aqi;
        aquiMonths[month].prom = promedio;
      }

      if (aquiMonths[month].max < aqi) {
        let promedio = (aquiMonths[month].max + aqi) / 2;
        aquiMonths[month].max = aqi;
        aquiMonths[month].prom = promedio;
      }

      return;
    }
    // THE MONTH DOES NOT EXIST
    aquiMonths[month] = { month, min: aqi, max: aqi, prom: aqi };
  };

  componentWillUnmount() {
    if (this._asyncRequest) {
      // this._asyncRequest?.cancel();
    }
  }

  render() {
    return (
      <>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Celes - Air pollution</title>
        </Helmet>
        <Header breadcrumb={this.breadcrumb} />
        <div className="p-4 xl:ml-80">
          <div className="mt-12">
            <div className="mb-12">
              <div className="cursor-pointer flex flex-col gap-3">
                <div className="w:full p-3 relative  bg-clip-border rounded-xl bg-white text-gray-700 shadow-md overflow-hidden mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-2">
                  <div className="h-[400px]">
                    <div className="p-3">
                      <h1>Air Quality Index</h1>
                    </div>
                    <div className="h-[350px]">
                      <AirPollutionChart data={this.state.aquiMonths} />
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
                              Air Pollution Index levels scale
                            </h6>
                          </div>
                          <div className="flex gap-4 pb-8">
                            <span className="flex-shrink-0 invisible h-full pointer-events-none"></span>
                            <div>
                              <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-600">
                                Possible values: 1, 2, 3, 4, 5.
                              </p>
                              <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-600">
                                1 = Good
                              </p>
                              <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-600">
                                2 = Fair
                              </p>
                              <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-600">
                                3 = Moderate
                              </p>
                              <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-600">
                                4 = Poor
                              </p>
                              <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-600">
                                5 = Very Poor
                              </p>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="w:full p-3 relative bg-clip-border rounded-xl bg-white text-gray-700 shadow-md overflow-hidden mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-2">
                  <div className="h-[400px]">
                    <div className="p-3">
                      <h1>Air Quality Components</h1>
                    </div>
                    <div className="h-[350px]">
                      <AirPollutionComponentsChart data={this.state.componentsMonths} />
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
                              Concentration of CO (Carbon monoxide), μg/m3
                            </h6>
                          </div>
                          <div className="flex gap-4">
                            <span className="flex-shrink-0 invisible h-full pointer-events-none"></span>
                            <div>
                              <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-600"></p>
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
                              Concentration of NO (Nitrogen monoxide), μg/m3
                            </h6>
                          </div>
                          <div className="flex gap-4">
                            <span className="flex-shrink-0 invisible h-full pointer-events-none"></span>
                            <div>
                              <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-600"></p>
                            </div>
                          </div>
                        </li>
                        <li className="relative flex flex-col gap-2">
                          <div className="flex items-center  gap-4">
                            <span className="relative z-[2] w-max flex-shrink-0 overflow-hidden rounded-full bg-gray-900 p-1.5 text-white"></span>
                            <h6 className="block font-sans text-base antialiased font-semibold leading-none tracking-normal text-blue-gray-900">
                              Concentration of NO2 (Nitrogen dioxide), μg/m3
                            </h6>
                          </div>
                          <div className="flex gap-4">
                            <span className="flex-shrink-0 invisible h-full pointer-events-none"></span>
                            <div>
                              <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-600"></p>
                            </div>
                          </div>
                        </li>
                        <li className="relative flex flex-col gap-2">
                          <div className="flex items-center  gap-4">
                            <span className="relative z-[2] w-max flex-shrink-0 overflow-hidden rounded-full bg-gray-900 p-1.5 text-white"></span>
                            <h6 className="block font-sans text-base antialiased font-semibold leading-none tracking-normal text-blue-gray-900">
                              Concentration of O3 (Ozone), μg/m3
                            </h6>
                          </div>
                          <div className="flex gap-4">
                            <span className="flex-shrink-0 invisible h-full pointer-events-none"></span>
                            <div>
                              <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-600"></p>
                            </div>
                          </div>
                        </li>
                        <li className="relative flex flex-col gap-2">
                          <div className="flex items-center  gap-4">
                            <span className="relative z-[2] w-max flex-shrink-0 overflow-hidden rounded-full bg-gray-900 p-1.5 text-white"></span>
                            <h6 className="block font-sans text-base antialiased font-semibold leading-none tracking-normal text-blue-gray-900">
                              Concentration of SO2 (Sulphur dioxide), μg/m3
                            </h6>
                          </div>
                          <div className="flex gap-4">
                            <span className="flex-shrink-0 invisible h-full pointer-events-none"></span>
                            <div>
                              <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-600"></p>
                            </div>
                          </div>
                        </li>
                        <li className="relative flex flex-col gap-2">
                          <div className="flex items-center  gap-4">
                            <span className="relative z-[2] w-max flex-shrink-0 overflow-hidden rounded-full bg-gray-900 p-1.5 text-white"></span>
                            <h6 className="block font-sans text-base antialiased font-semibold leading-none tracking-normal text-blue-gray-900">
                              Concentration of PM2.5 (Fine particles matter), μg/m3
                            </h6>
                          </div>
                          <div className="flex gap-4">
                            <span className="flex-shrink-0 invisible h-full pointer-events-none"></span>
                            <div>
                              <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-600"></p>
                            </div>
                          </div>
                        </li>
                        <li className="relative flex flex-col gap-2">
                          <div className="flex items-center  gap-4">
                            <span className="relative z-[2] w-max flex-shrink-0 overflow-hidden rounded-full bg-gray-900 p-1.5 text-white"></span>
                            <h6 className="block font-sans text-base antialiased font-semibold leading-none tracking-normal text-blue-gray-900">
                              Concentration of PM10 (Coarse particulate matter), μg/m3
                            </h6>
                          </div>
                          <div className="flex gap-4">
                            <span className="flex-shrink-0 invisible h-full pointer-events-none"></span>
                            <div>
                              <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-600"></p>
                            </div>
                          </div>
                        </li>
                        <li className="relative flex flex-col gap-2">
                          <div className="flex items-center  gap-4">
                            <span className="relative z-[2] w-max flex-shrink-0 overflow-hidden rounded-full bg-gray-900 p-1.5 text-white"></span>
                            <h6 className="block font-sans text-base antialiased font-semibold leading-none tracking-normal text-blue-gray-900">
                              Сoncentration of NH3 (Ammonia), μg/m3
                            </h6>
                          </div>
                          <div className="flex gap-4">
                            <span className="flex-shrink-0 invisible h-full pointer-events-none"></span>
                            <div>
                              <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-600"></p>
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

export default withTranslation()(AirPollution);
