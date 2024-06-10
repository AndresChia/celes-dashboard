import { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { Navbar } from '../../components/navBar/navbar';
import { Helmet } from 'react-helmet';
import { Header } from '../../components/header/header';
import { CurrentWheaterI } from '../../components/current-wheater-table/current-wheater-table-interface';
import axios from 'axios';
import { CurrentWheaterComponentsTable } from '../../components/current-wheater-table/current-wheater-table';

class CurrentWheater extends Component {
  state = {
    current: null
  };

  breadcrumb: Navbar[] = [
    { link: '/home', title: 'home' },
    { link: '/current-wheater', title: 'currentWheater' }
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
              this.setState({ current: response.data });
            })
            .catch((error) => {
              return { data: { data: {} } };
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
    const openKey = process.env.REACT_APP_OPEN_WEATHER_API_ID;
    return axios
      .get<CurrentWheaterI>(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${openKey}`
      )
      .catch((error) => {
        return { data: { data: {} } };
      });
  }

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
          <title>Celes - Current wheater</title>
        </Helmet>
        <Header breadcrumb={this.breadcrumb} />
        <div className="p-4 xl:ml-80">
          <div className="mt-4">
            <div className="mb-12">
              <div className="w:full p-3 relative  bg-clip-border rounded-xl bg-white text-gray-700 shadow-md overflow-hidden mb-12">
                <CurrentWheaterComponentsTable
                  data={this.state.current}
                  columns={[
                    'name',
                    'sys.country',
                    'clouds.all',
                    'main.feels_like',
                    'main.temp',
                    'main.temp_min',
                    'main.temp',
                    'main.temp_max',
                    'main.pressure',
                    'main.humidity',
                    'visibility',
                    'wind.speed',
                    'wind.deg',
                    'wind.gust'
                  ]}
                />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default withTranslation()(CurrentWheater);
