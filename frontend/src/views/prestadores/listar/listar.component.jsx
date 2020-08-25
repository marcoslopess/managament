import React from "react";
import { Card, Table } from "reactstrap";
import { Link } from "react-router-dom";

import Api from "../../../services/api";
import "./listar.styles.scss";

async function handleDeleteServico(_id) {
  try {
    await Api.delete(`prestador/${_id}`, {
      headers: {
        "Access-Control-Allow-Origin": "GET, POST, PUT, DELETE, OPTIONS",
      },
    }).then((res) => {
      alert(res.data.message);
    });
  } catch (err) {
    alert(`Erro ao deletar prestador, tente novamente!`);
  }
  window.location.reload();
}

class ListarPrestador extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      values: [],
    };
  }

  async componentDidMount() {
    let prestador = await Api.get("prestador");
    this.setState({
      values: prestador.data.prestador,
    });
  }

  render() {
    const prestador = Object.values(this.state.values);

    return (
      <>
        <div className="content justify-content-center">
          <Card>
            <Table size="sm">
              <thead>
                <tr>
                  <th scope="col">NOME PRESTADOR</th>
                  <th scope="col">EMAIL</th>
                  <th scope="col">TELEFONE</th>
                  <th scope="col">EDITAR</th>
                  <th scope="col">DELETAR</th>
                </tr>
              </thead>
              <tbody>
                {prestador.map((index, values) => (
                  <tr key={values}>
                    <td>{index.nomePrestador}</td>
                    <td>{index.emailPrestador}</td>
                    <td>{index.telefonePrestador}</td>
                    <td>
                      <Link
                        onClick={() => localStorage.setItem("_id", index._id)}
                        to="/admin/prestador/editar"
                      >
                        <i className="tim-icons icon-pencil" />
                      </Link>
                    </td>
                    <td>
                      <Link
                        onClick={() => handleDeleteServico(index._id)}
                        to="/admin/prestadores/listar"
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

export default ListarPrestador;
