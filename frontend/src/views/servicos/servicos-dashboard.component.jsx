import React from "react";
import { NavLink } from "react-router-dom";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";

import "./servicos-dashboard.styles.scss";

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
                <h3>Cadastrar Servico</h3>
              </div>
              <div className="card-footer bg-transparent">
                <NavLink to="/admin/servico/cadastrar">
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
                <h3>Listar Servicos</h3>
              </div>
              <div className="card-footer bg-transparent">
                <NavLink to="/admin/servicos/listarAgendados">
                  <button type="button" className="btn btn-info btn-sm">
                    Listar Agendados
                  </button>
                </NavLink>
                <br />
                <NavLink to="/admin/servicos/listarFeitos">
                  <button type="button" className="btn btn-info btn-sm">
                    Listar Finalizados
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
