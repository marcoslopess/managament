import React from "react";
import { NavLink } from "react-router-dom";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";

import "./clientes-dashboard.styles.scss";

class ClienteDashboard extends React.Component {
  setBgChartData = (name) => {
    this.setState({
      bigChartData: name,
    });
  };
  render() {
    return (
      <div className="content justify-content-center ">
        <div className="row row-cols-2 row-cols-md-2">
          <div className="col mb-4">
            <div className="card h-90 w-90">
              <div className="card-header">
                <h3>Cadastrar Cliente</h3>
              </div>
              <div className="card-footer bg-transparent">
                <NavLink to="/admin/cliente/cadastrar">
                  <button type="button" className="btn btn-info btn-sm">
                    Cadastrar
                  </button>
                </NavLink>
              </div>
            </div>
          </div>
          <div className="col mb-2">
            <div className="card h-90 w-90">
              <div className="card-header">
                <h3>Listar Clientes</h3>
              </div>
              <div className="card-footer bg-transparent">
                <NavLink to="/admin/clientes/listar">
                  <button type="button" className="btn btn-info btn-sm">
                    Listar
                  </button>
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ClienteDashboard;
