import { Component } from 'react';
import { Helmet } from 'react-helmet';
import { Header } from '../../components/header/header';
import { Navbar } from '../../components/navBar/navbar';
import { InfoCard } from '../../components/info-card/info-card';
import { MENUS } from '../../utils/menu';

export default class Home extends Component {
  breadcrumb: Navbar[] = [{ link: '/home', title: 'home' }];
  render() {
    return (
      <>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Celes - Home</title>
        </Helmet>
        <Header breadcrumb={this.breadcrumb} />
        <div className="p-4 xl:ml-80">
          <div className="mt-4">
            <div className="mb-12">
              <div className="cursor-pointer">
                <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-3">
                  {MENUS.map((menu) => (
                    <InfoCard
                      key={menu.title}
                      icon={menu.icon}
                      link={menu.link}
                      title={menu.title}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
