import { Component, ReactElement } from 'react';
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
import { ChartSkeleton } from '../../components/skeletons/chart';

export class AirPollution extends Component {
  state = {
    promMonths: null
  };

  breadcrumb: Navbar[] = [
    { link: '/home', title: 'home' },
    { link: '/air-pollution', title: 'airPollution' }
  ];

  _asyncRequest!: any;

  componentDidMount() {
    this._asyncRequest = this.loadMyAsyncData().then((response) => {
      const months: { [month: string]: any } = {};
      response.data.list.forEach((element: List) => {
        let month = new Date(element.dt * 1000).toLocaleString('default', { month: 'long' });
        const aqi = element.main.aqi;
        const date = new Date(element.dt * 1000);
        const components = element.components;
        this.calculatePromAquiMonth(months, month, aqi, date);
      });
      this._asyncRequest = null;
      this.setState({ promMonths: Object.values(months) });
    });
  }

  loadMyAsyncData() {
    const lat = 6.230833;
    const lng = 75.590553;

    const date = new Date();
    const end = Math.floor(date.getTime() / 1000);
    date.setMonth(date.getMonth() - 2);
    let start = Math.floor(date.getTime() / 1000);

    const openKey = process.env.REACT_APP_OPEN_WEATHER_API_ID;
    return axios.get<AirPollutionI>(
      `http://api.openweathermap.org/data/2.5/air_pollution/history?lat=${lat}&lon=${lng}&start=${start}&end=${end}&appid=${openKey}`
    );
  }

  calculatePromAquiMonth = (
    months: { [month: string]: any },
    month: string,
    aqi: number,
    date: Date
  ) => {
    // THE MONTH EXISTS
    if (months[month]) {
      if (months[month].min.aqi > aqi) {
        let promedio = (months[month].max.aqi + aqi) / 2;
        months[month].min = { date, aqi };
        months[month].prom = { date, aqi: promedio };
      }

      if (months[month].max.aqi < aqi) {
        let promedio = (aqi + months[month].min.aqi) / 2;
        months[month].max = { date, aqi };
        months[month].prom = { date, aqi: promedio };
      }

      return;
    }
    // THE MONTH DOES NOT EXIST
    months[month] = { month, min: { date, aqi }, max: { date, aqi }, prom: { date, aqi } };
  };

  getPageDefault = (content?: ReactElement) => {
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
              <div className="cursor-pointer">
                <div className="w:full p-3 relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md overflow-hidden ">
                  {content}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  componentWillUnmount() {
    if (this._asyncRequest) {
      // this._asyncRequest?.cancel();
    }
  }

  render() {
    if (this.state.promMonths === null) {
      return <>{this.getPageDefault(<ChartSkeleton width={600} height={300} />)}</>;
    } else {
      return <>{this.getPageDefault(<AirPollutionChart data={this.state.promMonths} />)}</>;
    }
  }
}

export default withTranslation()(AirPollution);
