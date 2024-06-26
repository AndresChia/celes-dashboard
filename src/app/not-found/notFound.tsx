import React, { Component } from 'react';

export default class NotFound extends Component {
  render() {
    return (
      <div className="flex items-center justify-center min-h-screen bg-primary_2  bg-fixed bg-cover bg-bottom error-bg">
        <div className="container">
          <div className="row">
            <div className="col-sm-8 offset-sm-2 text-gray-50 text-center -mt-52">
              <div className="relative ">
                <h1 className="relative text-9xl tracking-tighter-less text-shadow font-sans font-bold">
                  <span>4</span>
                  <span>0</span>
                  <span>4</span>
                </h1>
                <span className="absolute  top-0   -ml-12  text-gray-300 font-semibold">Oops!</span>
              </div>
              <h5 className="text-gray-300 font-semibold -mr-10 -mt-3">Pagina no encontrada</h5>
              <p className="text-gray-100 mt-2 mb-6">Lo sentimos, pero esta pagina no existe</p>
              <a
                href="/home"
                className="bg-primary_1 px-5 py-3 text-sm shadow-sm font-medium tracking-wider text-black rounded-full hover:shadow-lg">
                Ir al home
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
