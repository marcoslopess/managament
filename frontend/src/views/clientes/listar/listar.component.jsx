import React from "react";
import { Card, Table } from "reactstrap";
import { Link } from "react-router-dom";

import Api from "../../../services/api";
import "./listar.styles.scss";

async function handleDeleteClient(_id) {
  try {
    await Api.delete(`cliente/${_id}`, {
      headers: {
        "Access-Control-Allow-Origin": "GET, POST, PUT, DELETE, OPTIONS",
      },
    }).then((res) => {
      alert(res.data.message);
    });
  } catch (err) {
    alert(`Erro ao deletar cliente, tente novamente!`);
  }
  window.location.reload();
}

class ListarClientes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      values: [],
    };
  }

  async componentDidMount() {
    let cliente = await Api.get("cliente");
    this.setState({
      values: cliente.data.cliente,
    });
  }

  render() {
    const clientes = Object.values(this.state.values);

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
                {clientes.map((index, values) => (
                  <tr key={values}>
                    <td>{index.nomeCliente}</td>
                    <td>{index.telefoneCliente}</td>
                    <td>{index.emailCliente}</td>
                    {/* <td>
                        
                      PEQUENA ABSTRAÇÃO PARA TRABALHAR COM AS DATAS DO BACKEND NO FRONTEND 
                      let dateFormated;
                      {console.log((dateFormated = new Date(index.dateCreate)))}
                      {dateFormated.toLocaleString()} 
                     
                      </td> */}
                    <td>
                      <Link
                        onClick={() => localStorage.setItem("_id", index._id)}
                        to="/admin/cliente/editar"
                      >
                        <i className="tim-icons icon-pencil" />
                      </Link>
                    </td>
                    <td>
                      <Link
                        onClick={() => handleDeleteClient(index._id)}
                        to="/admin/clientes/listar"
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

export default ListarClientes;
