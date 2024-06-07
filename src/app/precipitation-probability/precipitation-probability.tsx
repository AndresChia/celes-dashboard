import { Component } from 'react';
import { Helmet } from 'react-helmet';
import { Header } from '../../components/header/header';
import { Navbar } from '../../components/navBar/navbar';
import { withTranslation } from 'react-i18next';
import { PrecipitationProbabilityChart } from '../../components/precipitation-probability-chart/precipitation-probability-chart';

export class PrecipitationProbability extends Component {
  breadcrumb: Navbar[] = [
    { link: '/home', title: 'home' },
    { link: '/precipitation-probability', title: 'precipitationProbability' }
  ];

  render() {
    return (
      <>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Celes - Precipitation probability</title>
        </Helmet>
        <Header breadcrumb={this.breadcrumb} />
        <div className="p-4 xl:ml-80">
          <div className="mt-12">
            <div className="mb-12">
              <div className="cursor-pointer">
                <div className="w:full p-3 relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md overflow-hidden ">
                  <PrecipitationProbabilityChart />
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
