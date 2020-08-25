import React from "react";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import {
  Alert,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
  Button,
} from "reactstrap";
import swal from "sweetalert";
import moment from "moment";
import localization from "moment/locale/pt-br";
import "antd/dist/antd.css";
import { Modal } from "antd";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import HelpIcon from "@material-ui/icons/Help";
import { makeStyles } from "@material-ui/core/styles";

import "./dashboard.styles.scss";
import Api from "../../services/api";
import WhatsApp from "../../assets/svg/whatsapp.svg";
import Gmail from "../../assets/svg/gmail.svg";
import { Redirect } from "react-router-dom";

moment.locale("pt-br", localization);

const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
    color: "#000000",
  },
}));

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dateUpdate: Date(),
      confirmado: false,
      dataFimServico: "",
      horaInicioServico: "",
      horaFimServico: "",
      agendados: [],
      ociosos: [],
      modalAgendadosVisible: false,
      modalDispersosVisible: false,
      arrayAgendados: [],
      arrayDispersos: [],
      openPopover: false,
      redirect: false,
      ocioso: "",
      dataProx: '',
      frequencia: '',
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = (event) => {
    this.setState({ openPopover: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ openPopover: null });
  };

  setModalAgendadosVisible(modalAgendadosVisible) {
    this.setState({ modalAgendadosVisible });
  }

  setModalDispersosVisible(modalDispersosVisible) {
    this.setState({ modalDispersosVisible });
  }

  async confirmService(_id) {
    const data = {
      dateUpdate: this.state.dateUpdate,
      confirmado: this.state.confirmado,
      dataFimServico: this.state.dataFimServico,
      horaInicioServico: this.state.horaInicioServico,
      horaFimServico: this.state.horaFimServico
    };
    try {
      await Api.put(`ordemServico/${_id}`, data);
      this.getAgendados();
    } catch (err) {
      alert("Erro ao confirmar serviço, tente novamente!");
    }
  }

  async getAgendados() {
    let servicosNotify = await Api.get("ordemServico/agendados");
    this.setState({
      agendados: servicosNotify.data.agendados,
    });
  }
  async getDispersos() {
    let servicosDispersos = await Api.get("ordemServico/ociosos");
    this.setState({
      ociosos: servicosDispersos.data.ociosos,
    });
  }
  setBgChartData = (name) => {
    this.setState({
      bigChartData: name,
    });
  };
  async componentDidMount() {
    this.getDispersos();
    this.getAgendados();
  }

  diasDataProxFunc(dataProx) {
    const date1 = new Date(dataProx);
    const date2 = new Date();
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    let diasDataProx = diffDays
    return diasDataProx
  }

  setOcioso(_id) {
    let data = {
      ocioso: this.state.ocioso,
      dateUpdate: this.state.dateUpdate
    };
    Api.put(`ordemServico/${_id}`, data)
    this.getDispersos();
  }

  async alterarNotificacao(_id) {
    let data = {
      dataProx: this.state.dataProx,
      frequencia: this.state.frequencia,
      dateUpdate: this.state.dateUpdate
    };
   await Api.put(`ordemServico/${_id}`, data)
    this.getDispersos();
  }


  render() {
    const servicosDispersos = Object.values(this.state.ociosos);
    const servicosNotify = Object.values(this.state.agendados);
    let arrayAgendados = this.state.arrayAgendados;
    let arrayDispersos = this.state.arrayDispersos;

    // const classes = useStyles();
    const open = Boolean(this.state.openPopover);
    const id = open ? "simple-popover" : undefined;

    let dataFimServico = "";
    let horaInicioServico = "";
    let horaFimServico = "";
    let proximaFrequencia = "";
    let proximaData = "";

    if (this.state.redirect) {
      return <Redirect to="/admin/servico/cadastrar" />;
    } else {
      return (
        <div className="content">
          <Row>
            <Col md="6">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">Serviços Agendados</CardTitle>
                </CardHeader>
                <CardBody className="divContent-agendados">
                  {servicosNotify.map((index, values) => (
                    <div key={values}>
                      <Alert
                        className="alert-padding alert-with-icon"
                        color="success"
                      >
                        Cliente: {index.nomeCliente}
                        <br />
                      Prestador: {index.nomePrestador}
                        <br />
                      Data do serviço:{" "}
                        {moment(index.dataServico).format("DD/MM/YYYY") +
                          " às " +
                          moment(index.dataServico).format("LT")}
                        <br />
                        <Button
                          className="btn-fill"
                          color="info"
                          onClick={() => {
                            this.setState({ arrayAgendados: index });
                            this.setModalAgendadosVisible(true);
                          }}
                        >
                          Detalhes
                      </Button>
                      </Alert>
                      <Modal
                        title={null}
                        closable={false}
                        style={{ top: 60 }}
                        visible={this.state.modalAgendadosVisible}
                        onOk={() => this.setModalAgendadosVisible(false)}
                        onCancel={() => this.setModalAgendadosVisible(false)}
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
                        </List>

                        <div className="col text-center">
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
                            <img src={Gmail} width="34" height="34" alt="Gmail" />
                          </a>
                        </div>
                        <div className="col text-center">
                          <Button
                            className="btn-fill-centered"
                            color="info"
                            onClick={() => {
                              swal("Em qual dia finalizou o serviço?", {
                                content: {
                                  element: "input",
                                  attributes: {
                                    type: "date",
                                  },
                                },
                              }).then((value) => {
                                dataFimServico = value;
                                swal("Em qual horario iniciou o serviço?", {
                                  content: {
                                    element: "input",
                                    attributes: {
                                      type: "time",
                                    },
                                  },
                                }).then((value) => {
                                  horaInicioServico = value;
                                  swal("Em qual horario finalizou o serviço?", {
                                    content: {
                                      element: "input",
                                      attributes: {
                                        type: "time",
                                      },
                                    },
                                  }).then((value) => {
                                    horaFimServico = value;

                                    swal({
                                      title: "Este serviço ja foi feito?",
                                      icon: "warning",
                                      buttons: {
                                        cancel: "Não",
                                        catch: {
                                          text: "Sim",
                                          value: "catch",
                                        },
                                      },
                                      dangerMode: true,
                                    }).then((willDelete) => {
                                      if (willDelete) {
                                        this.setState({
                                          confirmado: true,
                                        }); this.setState({
                                          dataFimServico: dataFimServico,
                                        });
                                        this.setState({
                                          horaInicioServico: horaInicioServico,
                                        });
                                        this.setState({
                                          horaFimServico: horaFimServico,
                                        });
                                        this.confirmService(arrayAgendados._id);
                                        this.setModalAgendadosVisible(false);
                                        try {
                                          swal(
                                            "Serviço finalizado com sucesso!",
                                            {
                                              icon: "success",
                                            }
                                          );
                                        } catch {
                                          swal(
                                            "Ocorreu algum erro, tente novamente!"
                                          );
                                          this.setModalAgendadosVisible(false);
                                        }
                                      } else {
                                      }
                                    });
                                  });
                                });
                              });
                            }}
                          >
                            Finalizar
                        </Button>
                        </div>
                      </Modal>
                    </div>
                  ))}
                </CardBody>
              </Card>
            </Col>
            <Col md="6">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">
                    Serviços Dispersos {"   "}
                    <span
                      aria-describedby={id}
                      variant="contained"
                      color="primary"
                      onClick={this.handleClick}
                    >
                      <HelpIcon />
                    </span>
                    <Popover
                      id={id}
                      open={open}
                      anchorEl={this.state.openPopover}
                      onClose={this.handleClose}
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "center",
                      }}
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "center",
                      }}
                    >
                      <Typography className={useStyles.typography}>
                        <hr />
                      Nesta area se destaca os clientes que estão dispersos,
                      <br />
                      ou seja, que estão com a data de serviço frequente
                      <br />
                      ultrapassada!
                      <hr />
                      </Typography>
                    </Popover>
                  </CardTitle>
                </CardHeader>
                <CardBody className="divContent-ociosos">
                  {servicosDispersos.map((index, values) => (
                    <div key={values}>
                      <Alert
                        className="alert-padding alert-with-icon "
                        color="danger"
                      >
                        Já {this.diasDataProxFunc(index.dataProx) === 1 ? " faz " + this.diasDataProxFunc(index.dataProx) + " dia" : " fazem " + this.diasDataProxFunc(index.dataProx) + " dias"}  que o cliente {index.nomeCliente} não agenda um serviço.
                      <br />
                      A frequência de manutenção do serviço desse cliente é de {" "}
                        {index.frequencia === "1" ? index.frequencia + " dia" : index.frequencia + " dias"}
                        <br />
                        <Button
                          className="btn-fill"
                          color="info"
                          onClick={() => {
                            this.setState({ arrayDispersos: index });
                            this.setModalDispersosVisible(true);
                          }}
                        >
                          Detalhes
                      </Button>
                      </Alert>
                      <Modal
                        title={null}
                        closable={false}
                        style={{ top: 60 }}
                        visible={this.state.modalDispersosVisible}
                        onOk={() => this.setModalDispersosVisible(false)}
                        onCancel={() => this.setModalDispersosVisible(false)}
                        footer={null}
                      >
                        <List component="nav" aria-label="mailbox folders">
                          <ListItem button>
                            <ListItemText
                              primary={`Nome: ${arrayDispersos.nomeCliente}`}
                            />
                          </ListItem>
                          <Divider />
                          <ListItem button>
                            <ListItemText
                              primary={`Telefone: ${arrayDispersos.telefoneCliente}`}
                            />
                          </ListItem>
                          <Divider />
                          <ListItem button>
                            <ListItemText
                              primary={`Endereço: ${arrayDispersos.enderecoCliente}`}
                            />
                          </ListItem>
                          <Divider />
                          <ListItem button>
                            <ListItemText
                              primary={` Descrição: ${arrayDispersos.descricaoOrdemServico}`}
                            />
                          </ListItem>
                          <Divider />
                          <ListItem button>
                            <ListItemText
                              primary={`Data: ${moment(
                                arrayDispersos.dataServico
                              ).format("DD/MM/YYYY")}`}
                            />
                          </ListItem>
                          <Divider />
                          <ListItem button>
                            <ListItemText
                              primary={`Hora: ${moment(
                                arrayDispersos.dataServico
                              ).format("LT")}`}
                            />
                          </ListItem>
                          <Divider />
                        </List>

                        <div className="col text-center">
                          <a
                            href={`https://api.whatsapp.com/send?phone=55${
                              arrayDispersos.telefoneCliente
                              }&text=Ol%C3%A1%2C%20somos%20a%20empresa%20Art's%20flora%20e%20estamos%20entrando%20em%20contato%20para%20saber%20se%20j%C3%A1%20est%C3%A1%20precisando%20dos%20nossos%20servi%C3%A7os%20novamente!`}
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
                              arrayDispersos.emailCliente
                              }?subject=Lembrete%20Art's%20Flora&body=Ol%C3%A1%2C%20somos%20a%20empresa%20Art's%20Flora%20e%20estamos%20entrando%20em%20contato%20para%20avisar%20que%20o%20seu%20servi%C3%A7o%20est%C3%A1%20marcado%20para%20o%20dia%20${moment(
                                arrayDispersos.dataServico
                              ).format("DD/MM/YYYY")}%20%C3%A1s%20${moment(
                                arrayDispersos.dataServico
                              ).format("LT")}!`}
                            className="email-link email-icon"
                            target="blank"
                          >
                            <img src={Gmail} width="34" height="34" alt="Gmail" />
                          </a>
                        </div>
                        <div className="col text-center">
                          <Button

                            className="btn-fill-centered"
                            color="info"
                            onClick={() => {
                              swal({
                                title: "Deseja agendar um novo serviço para esse cliente?",
                                icon: "warning",
                                buttons: {
                                  cancel: "Não",
                                  catch: {
                                    text: "Sim",
                                    value: "catch",
                                  },
                                },
                                dangerMode: true,
                              }).then((willDelete) => {
                                if (willDelete) {
                                  localStorage.setItem("idOcioso", arrayDispersos._id);
                                  this.setState({ redirect: true });
                                  this.setModalDispersosVisible(false);
                                  try {

                                  } catch {
                                    swal("Ocorreu algum erro, tente novamente!");
                                  }
                                } else {
                                  this.setModalDispersosVisible(false);
                                }
                              })

                            }
                            }
                          >

                            Agendar Serviço
                        </Button>


                          <Button
                            className="btn-fill-centered"
                            color="info"
                            onClick={() => {
                              swal({
                                title: "Deseja agendar uma nova data para notificar esse serviço?",
                                icon: "warning",
                                buttons: {
                                  cancel: "Não",
                                  catch: {
                                    text: "Sim",
                                    value: "catch",
                                  },
                                },
                                dangerMode: true,
                              }).then((willDelete) => {
                                if (willDelete) {
                                  swal("Qual a nova frequência desse serviço?", {
                                    content: {
                                      element: "input",
                                      attributes: {
                                        type: "text",
                                      },
                                    },
                                  }).then((value) => {
                                    proximaFrequencia = value;
                                    swal("Qual a nova data da proxima notificação desse serviço?", {
                                      content: {
                                        element: "input",
                                        attributes: {
                                          type: "date",
                                        },
                                      },
                                    }).then((value) => {
                                      proximaData = value;
                                      swal({
                                        title: "As novas informações estão corretas?",
                                        icon: "warning",
                                        buttons: {
                                          cancel: "Não",
                                          catch: {
                                            text: "Sim",
                                            value: "catch",
                                          },
                                        },
                                        dangerMode: true,
                                      })

                                      let dataProximoServico = moment(
                                        proximaData +
                                        " " +
                                        arrayDispersos.horaServico
                                      ).format();

                                      this.setState({
                                        dataProx: dataProximoServico,
                                      });
                                      this.setState({
                                        frequencia: proximaFrequencia,
                                      });
                                      this.alterarNotificacao(arrayDispersos._id);
                                      this.setModalDispersosVisible(false);

                                      try {
                                        swal("Reagendamento de notificação alterado com sucesso!", {
                                          icon: "success",
                                        });
                                        this.setModalDispersosVisible(false);
                                      } catch {
                                        swal("Ocorreu algum erro, tente novamente!");
                                        this.setModalDispersosVisible(false);
                                      }
                                    })
                                  })
                                } else {

                                  this.setModalDispersosVisible(false);
                                }
                              })
                            }}

                          >
                            Agendar Notificação
                        </Button>

                          <Button

                            className="btn-fill-centered"
                            color="info"
                            onClick={() => {
                              swal({
                                title: "Deseja finalizar esse serviço?",
                                icon: "warning",
                                buttons: {
                                  cancel: "Não",
                                  catch: {
                                    text: "Sim",
                                    value: "catch",
                                  },
                                },
                                dangerMode: true,
                              }).then((willDelete) => {
                                if (willDelete) {
                                  this.setState({ ocioso: false })
                                  this.setOcioso(arrayDispersos._id);
                                  this.setModalDispersosVisible(false);
                                  try {

                                  } catch {
                                    swal("Ocorreu algum erro, tente novamente!");
                                  }
                                } else {
                                  this.setModalDispersosVisible(false);
                                }
                              }
                              )
                            }
                            }
                          >

                            Finalizar
                   </Button>
                        </div>
                      </Modal>
                    </div>
                  ))}
                </CardBody>
              </Card>
            </Col>
          </Row>

          {/* <div className="row row-cols-1 row-cols-md-2">
          <div className="col mb-4">
            <div className="card h-100">
              <div className="card-header">
                <h3>Clientes</h3>
              </div>
              <div className="card-body">
                <p className="card-text">
                  <img src={clientes} alt="" />
                </p>
              </div>
              <div className="card-footer bg-transparent">
                <NavLink to="/admin/cliente/cadastrar">
                  <button type="button" className="btn btn-info btn-sm">
                    Cadastrar
                  </button>
                </NavLink>
                <NavLink to="/admin/clientes/listar">
                  <button type="button" className="btn btn-info btn-sm">
                    Listar
                  </button>
                </NavLink>
              </div>
            </div>
          </div>
          <div className="col mb-4">
            <div className="card h-100">
              <div className="card-header">
                <h3>Serviços</h3>
              </div>
              <div className="card-body">
                <p className="card-text">
                  <img src={servicos} alt="" />
                </p>
              </div>
              <div className="card-footer bg-transparent">
                <NavLink to="/admin/servico/cadastrar">
                  <button type="button" className="btn btn-info btn-sm">
                    Cadastrar
                  </button>
                </NavLink>
                <NavLink to="/admin/servicos/listar">
                  <button type="button" className="btn btn-info btn-sm">
                    Listar
                  </button>
                </NavLink>
              </div>
            </div>
          </div>
          <div className="col mb-4">
            <div className="card h-100">
              <div className="card-header">
                <h3>Prestadores</h3>
              </div>
              <div className="card-body">
                <p className="card-text">
                  <img src={prestadores} alt="" />
                </p>
              </div>
              <div className="card-footer bg-transparent">
                <NavLink to="/admin/prestador/cadastrar">
                  <button type="button" className="btn btn-info btn-sm">
                    Cadastrar
                  </button>
                </NavLink>
                <NavLink to="/admin/prestadores/listar">
                  <button type="button" className="btn btn-info btn-sm">
                    Listar
                  </button>
                </NavLink>
              </div>
            </div>
          </div>
          <div className="col mb-4">
            <div className="card h-100">
              <div className="card-header">
                <h3>Tipos de Serviços</h3>
              </div>
              <div className="card-body">
                <p className="card-text">
                  <img src={tipo_servicos} alt="" />
                </p>
              </div>
              <div className="card-footer bg-transparent">
                <NavLink to="/admin/tipoServico/cadastrar">
                  <button type="button" className="btn btn-info btn-sm">
                    Cadastrar
                  </button>
                </NavLink>
                <NavLink to="/admin/tipoServicos/listar">
                  <button type="button" className="btn btn-info btn-sm">
                    Listar
                  </button>
                </NavLink>
              </div>
            </div>
          </div>
        </div> */}
        </div>
      );
    }
  }
}

export default Dashboard;
