import { Component } from 'react';
import { Helmet } from 'react-helmet';
import { Header } from '../../components/header/header';
import { Navbar } from '../../components/navBar/navbar';

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
          <div className="mt-12">
            <div className="mb-12">
              <div className="cursor-pointer"></div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
