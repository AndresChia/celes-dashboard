import { Component } from "react";
import { Helmet } from "react-helmet";
import { Header } from "../../components/header/header";
import { Navbar } from "../../components/navBar/navbar";
import { AirPollutionChart } from "../../components/air-pollution-chart/air-pollution-chart";
import axios from "axios";
import { AirPollutionI, List } from "../../components/air-pollution-chart/air-pollution-chart-interface";

export default class AirPollution extends Component {

    state = {
        dataChart: null,
    };

    breadcrumb: Navbar[] = [
        { link: '/home', title: 'home' },
        { link: '/air-pollution', title: 'airPollution' },
    ];

    _asyncRequest!: any;


    componentWillMount() {
        this._asyncRequest = loadMyAsyncData().then(
            (response) => {
                const months: { [month: string]: any } = {};
                response.data.list.forEach((element: List) => {
                    let month = new Date(element.dt * 1000).toLocaleString('default', { month: 'long' });
                    const aqi = element.main.aqi;
                    const date = new Date(element.dt * 1000);
                    if (months[month]) {
                        if (months[month].min.aqi > aqi) {
                            let promedio = (months[month].max.aqi + aqi) / 2;
                            months[month].min = { date, aqi }
                            months[month].prom = { date, aqi: promedio }
                        }

                        if (months[month].max.aqi < aqi) {
                            let promedio = (aqi + months[month].min.aqi) / 2;
                            months[month].max = { date, aqi }
                            months[month].prom = { date, aqi: promedio }
                        }
                    } else {
                        months[month] = { month, min: { date, aqi }, max: { date, aqi }, prom: { date, aqi } }
                    }

                })
                this._asyncRequest = null;
                this.setState({ dataChart: Object.values(months) });
            }
        );

    }

    componentWillUnmount() {
        if (this._asyncRequest) {
            this._asyncRequest.cancel();
        }
    }



    render() {

        return (
            <>
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>Celes - Home</title>
                </Helmet>
                <Header breadcrumb={this.breadcrumb} />
                <div className="p-4 xl:ml-80">
                    <div className="mt-12">
                        <div className="mb-12">
                            <div className="cursor-pointer">
                                {this.state.dataChart !== null ? <AirPollutionChart data={this.state.dataChart} /> : ''}
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );





    }
}

function loadMyAsyncData() {
    const lat = 6.230833
    const lng = 75.590553

    const date = new Date()
    const end = Math.floor(date.getTime() / 1000)
    date.setMonth(date.getMonth() - 2);
    let start = Math.floor(date.getTime() / 1000)


    const openKey = process.env.REACT_APP_OPEN_WEATHER_API_ID;
    return axios.get<AirPollutionI>(`http://api.openweathermap.org/data/2.5/air_pollution/history?lat=${lat}&lon=${lng}&start=${start}&end=${end}&appid=${openKey}`)
}

