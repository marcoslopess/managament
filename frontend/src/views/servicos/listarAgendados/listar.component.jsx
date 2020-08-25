import React from "react";
import { Card, Table } from "reactstrap";
import { Link } from "react-router-dom";
import moment from "moment";
import localization from "moment/locale/pt-br";
import "antd/dist/antd.css";
import { Modal } from "antd";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
// import MaterialTable from "material-table";

import WhatsApp from "../../../assets/svg/whatsapp.svg";
import Gmail from "../../../assets/svg/gmail.svg";
import Api from "../../../services/api";
import "./listar.styles.scss";

moment.locale("pt-br", localization);

async function handleDeleteServico(_id) {
  try {
    await Api.delete(`ordemServico/${_id}`, {
      headers: {
        "Access-Control-Allow-Origin": "GET, POST, PUT, DELETE, OPTIONS",
      },
    }).then((res) => {
      alert(res.data.message);
    });
  } catch (err) {
    alert(`Erro ao deletar serviço, tente novamente!`);
  }
  window.location.reload();
}

class ListarServicos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      values: [],
      modalVisible: false,
      arrayAgendados: [],
    };
  }

  setModalVisible(modalVisible) {
    this.setState({ modalVisible });
  }
  async componentDidMount() {
    let servicos = await Api.get("ordemServico/agendados");
    this.setState({
      values: servicos.data.agendados,
    });
  }

  render() {
    const servicos = Object.values(this.state.values);
    let arrayAgendados = this.state.arrayAgendados;

    return (
      <>
        <div className="content justify-content-center">
          <Card>
            {/* <MaterialTable
                                  className="row-table-search"
                                  title=""
                                  columns={[
                                    { title: "Nome do Cliente", field: "nomeCliente" },
                                    { title: "Nome do Prestador", field: "nomePrestador" },
                                    { title: "Serviço", field: "nomeServico" },
                                  ]}
                                  options={{
                                    pageSize: 1,
                                  }}
                                  data={servicos}
                                  // actions={[
                                  //   {
                                  //     title: "Selecionar",
                                  //     icon: "save",
                                  //     tooltip: "Save User",
                                  //     onClick: (event, rowData) =>
                                  //       this.setState({
                                  //         emailCliente: rowData.emailCliente,
                                  //         nomeCliente: rowData.nomeCliente,
                                  //         telefoneCliente:
                                  //           rowData.telefoneCliente,
                                  //         enderecoCliente:
                                  //           rowData.enderecoCliente,
                                  //         cidadeCliente: rowData.cidadeCliente,
                                  //         estadoCliente: rowData.estadoCliente,
                                  //         pesquisarCliente: false,
                                  //       }),
                                  //   },
                                  // ]}
                                  // components={{
                                  //   Action: (props) => (
                                  //     <Button
                                  //       onClick={(event) =>
                                  //         props.action.onClick(
                                  //           event,
                                  //           props.data
                                  //         )
                                  //       }
                                  //       color="info"
                                  //       variant="contained"
                                  //       style={{ textTransform: "none" }}
                                  //       size="small"
                                  //     >
                                  //       <AddCircleIcon />
                                  //     </Button>
                                  //   ),
                                  // }}
                                /> */}
            <Table size="sm">
              <thead>
                <tr>
                  <th scope="col">NOME CLIENTE</th>
                  <th scope="col">NOME PRESTADOR</th>
                  <th scope="col">SERVIÇO</th>
                  <th scope="col">DETALHES</th>
                  <th scope="col">EDITAR</th>
                  <th scope="col">DELETAR</th>
                </tr>
              </thead>
              <tbody>
                {servicos.map((index, values) => (
                  <tr key={values}>
                    <td>{index.nomeCliente}</td>
                    <td>{index.nomePrestador}</td>
                    <td>{index.nomeServico}</td>
                    <td>
                      <Link
                        onClick={() => {
                          this.setState({ arrayAgendados: index });
                          this.setModalVisible(true);
                        }}
                      >
                        <AddIcon />
                      </Link>
                      <Modal
                        title={null}
                        closable={false}
                        style={{ top: 60 }}
                        visible={this.state.modalVisible}
                        onOk={() => this.setModalVisible(false)}
                        onCancel={() => this.setModalVisible(false)}
                        footer={null}
                      >
                        <List component="nav" aria-label="mailbox folders">
                          <ListItem button>
                            <ListItemText
                              primary={`Nome: ${arrayAgendados.nomeCliente}`}
                            />
                          </ListItem>
                          <Divider />
                          <ListItem button>
                            <ListItemText
                              primary={`Telefone: ${arrayAgendados.telefoneCliente}`}
                            />
                          </ListItem>
                          <Divider />
                          <ListItem button>
                            <ListItemText
                              primary={`Endereço: ${arrayAgendados.enderecoCliente}`}
                            />
                          </ListItem>
                          <Divider />
                          <ListItem button>
                            <ListItemText
                              primary={` Descrição: ${arrayAgendados.descricaoOrdemServico}`}
                            />
                          </ListItem>
                          <Divider />
                          <ListItem button>
                            <ListItemText
                              primary={`Data: ${moment(
                                arrayAgendados.dataServico
                              ).format("DD/MM/YYYY")}`}
                            />
                          </ListItem>
                          <Divider />
                          <ListItem button>
                            <ListItemText
                              primary={`Hora: ${moment(
                                arrayAgendados.dataServico
                              ).format("LT")}`}
                            />
                          </ListItem>
                          <Divider />
                          <ListItem button>
                            <ListItemText
                              primary={`Preço: ${arrayAgendados.precoOrdemServico}`}
                            />
                          </ListItem>
                          <Divider />

                          <Divider />
                        </List>

                        <div class="col text-center">
                          <a
                            href={`https://api.whatsapp.com/send?phone=55${
                              arrayAgendados.telefoneCliente
                            }&text=Ol%C3%A1%2C%20somos%20a%20empresa%20Art's%20Flora%20e%20estamos%20entrando%20em%20contato%20para%20avisar%20que%20o%20seu%20servi%C3%A7o%20est%C3%A1%20marcado%20para%20o%20dia%20${moment(
                              arrayAgendados.dataServico
                            ).format("DD/MM/YYYY")}%20%C3%A1s%20${moment(
                              arrayAgendados.dataServico
                            ).format("LT")}!`}
                            className="email-link"
                            target="blank"
                          >
                            <img
                              src={WhatsApp}
                              width="36"
                              height="36"
                              alt="WhatsApp"
                            />
                          </a>
                          <a
                            href={`mailto:${
                              arrayAgendados.emailCliente
                            }?subject=Lembrete%20Art's%20Flora&body=Ol%C3%A1%2C%20somos%20a%20empresa%20Art's%20Flora%20e%20estamos%20entrando%20em%20contato%20para%20avisar%20que%20o%20seu%20servi%C3%A7o%20est%C3%A1%20marcado%20para%20o%20dia%20${moment(
                              arrayAgendados.dataServico
                            ).format("DD/MM/YYYY")}%20%C3%A1s%20${moment(
                              arrayAgendados.dataServico
                            ).format("LT")}!`}
                            className="email-link email-icon"
                            target="blank"
                          >
                            <img
                              src={Gmail}
                              width="34"
                              height="34"
                              alt="Gmail"
                            />
                          </a>
                        </div>
                      </Modal>
                    </td>
                    <td>
                      <Link
                        onClick={() => {
                          localStorage.setItem("_id", index._id);
                          localStorage.setItem("page", "Agendados");
                        }}
                        to="/admin/servico/editar"
                      >
                        <EditIcon />
                      </Link>
                    </td>
                    <td>
                      <Link
                        onClick={() => handleDeleteServico(index._id)}
                        to="/admin/servicos/listarAgendados"
                      >
                        <DeleteIcon />
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

export default ListarServicos;
