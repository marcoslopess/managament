import React from "react";
import { Card, Table } from "reactstrap";
import { Link } from "react-router-dom";

import Api from "../../../services/api";
import "./listar.styles.scss";

async function handleDeleteServico(_id) {
  try {
    await Api.delete(`tipoServico/${_id}`, {
      headers: {
        "Access-Control-Allow-Origin": "GET, POST, PUT, DELETE, OPTIONS",
      },
    }).then((res) => {
      alert(res.data.message);
    });
  } catch (err) {
    alert(`Erro ao deletar tipo de serviço, tente novamente!`);
  }
  window.location.reload();
}

class ListarTipoServicos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      values: [],
    };
  }

  async componentDidMount() {
    let tipoServico = await Api.get("tipoServico");
    this.setState({
      values: tipoServico.data.tipoServico,
    });
  }

  render() {
    const tipoServico = Object.values(this.state.values);

    return (
      <>
        <div className="content justify-content-center">
          <Card>
            <Table size="sm">
              <thead>
                <tr>
                  <th scope="col">NOME SERVIÇO</th>
                  <th scope="col">TIPO SERVIÇO</th>
                  <th scope="col">EDITAR</th>
                  <th scope="col">DELETAR</th>
                </tr>
              </thead>
              <tbody>
                {tipoServico.map((index, values) => (
                  <tr key={values}>
                    <td>{index.nomeServico}</td>
                    <td>{index.tipoServico}</td>
                    <td>
                      <Link
                        onClick={() => localStorage.setItem("_id", index._id)}
                        to="/admin/tipoServico/editar"
                      >
                        <i className="tim-icons icon-pencil" />
                      </Link>
                    </td>
                    <td>
                      <Link
                        onClick={() => handleDeleteServico(index._id)}
                        to="/admin/tipoServicos/listar"
                      >
                        <i className="tim-icons icon-trash-simple" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card>
        </div>
      </>
    );
  }
}

export default ListarTipoServicos;
