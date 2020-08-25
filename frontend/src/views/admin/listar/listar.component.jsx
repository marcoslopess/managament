import React from "react";
import { Card, Table } from "reactstrap";
import { Link } from "react-router-dom";

import Api from "../../../services/api";
import "./listar.styles.scss";

async function handleDeleteServico(_id) {
  if (localStorage.getItem("_idUser") === _id)
    return alert("Não é possivel deletar usuario logado");
  try {
    await Api.delete(`admin/${_id}`, {
      headers: {
        "Access-Control-Allow-Origin": "GET, POST, PUT, DELETE, OPTIONS",
      },
    }).then((res) => {
      alert(res.data.message);
    });
  } catch (err) {
    alert(`Erro ao deletar administrador, tente novamente!`);
  }
  window.location.reload();
}

class ListarAdministrador extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      values: [],
    };
  }

  async componentDidMount() {
    let admin = await Api.get("admin/all");
    this.setState({
      values: admin.data.administradores,
    });
  }

  render() {
    const admin = Object.values(this.state.values);

    return (
      <>
        <div className="content justify-content-center">
          <Card>
            <Table size="sm">
              <thead>
                <tr>
                  <th scope="col">NOME</th>
                  <th scope="col">TELEFONE</th>
                  <th scope="col">EMAIL</th>
                  <th scope="col">EDITAR</th>
                  <th scope="col">DELETAR</th>
                </tr>
              </thead>
              <tbody>
                {admin.map((index, values) => (
                  <tr key={values}>
                    <td>{index.name}</td>
                    <td>{index.telefone}</td>
                    <td>{index.email}</td>
                    <td>
                      <Link
                        onClick={() => localStorage.setItem("_id", index._id)}
                        to="/admin/usuario/editar"
                      >
                        <i className="tim-icons icon-pencil" />
                      </Link>
                    </td>
                    <td>
                      <Link
                        onClick={() => handleDeleteServico(index._id)}
                        to="/admin/usuario/listar"
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

export default ListarAdministrador;
