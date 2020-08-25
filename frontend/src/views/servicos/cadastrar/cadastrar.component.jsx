import React from "react";
import { Redirect } from "react-router-dom";
import "../../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import moment from "moment";
import SearchIcon from "@material-ui/icons/Search";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import MaterialTable from "material-table";
import "@material-ui/core";
import swal from "sweetalert";

import "./cadastrar.styles.scss";
import Api from "../../../services/api";

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  FormGroup,
  Form,
  Row,
  Col,
  Input,
} from "reactstrap";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { blue } from "@material-ui/core/colors";
// import NativeSelect from "@material-ui/core/NativeSelect";
// import { KeyboardDatePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns"; // choose your lib
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import brLocale from "date-fns/locale/pt-BR";

const theme = createMuiTheme({
  palette: {
    primary: blue,
  },
});

class CadastrarServicos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //cliente
      nomeCliente: "",
      telefoneCliente: "",
      enderecoCliente: "",
      emailCliente: "",
      //prestador
      nomePrestador: "",
      telefonePrestador: "",
      emailPrestador: "",
      //tipo de serviço
      nomeServico: "",
      tipoServico: "",
      tipoPrestador: "",
      //ordem de serviço
      descricaoOrdemServico: "",
      dataServico: "",
      horaServico: "",
      precoOrdemServico: "",
      frequencia: "",
      formaPagamento: "",
      dataProx: Date(),
      dateSchedule: "",
      redirect: false,
      page: "/admin/servicos/listarAgendados/",
      Cliente: [],
      Prestador: [],
      TipoServico: [],
      pesquisarCliente: false,
      pesquisarPrestador: false,
      pesquisarTipoServico: false,
      ocioso: localStorage.getItem("ocioso"),
      idOcioso: localStorage.getItem("idOcioso"),
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClickPesquisarCliente = this.handleClickPesquisarCliente.bind(
      this
    );
    this.handleClickPesquisarPrestador = this.handleClickPesquisarPrestador.bind(
      this
    );
    this.handleClickPesquisarTipoServico = this.handleClickPesquisarTipoServico.bind(
      this
    );

    this.handleDateChange = this.handleDateChange.bind(this);
  }

  handleDateChange = (date) => {
    this.setState({ dataServico: date });
  };

  handleClickPesquisarCliente() {
    this.setState((prevState) => ({
      pesquisarCliente: !prevState.pesquisarCliente,
    }));
  }

  handleClickPesquisarPrestador() {
    this.setState((prevState) => ({
      pesquisarPrestador: !prevState.pesquisarPrestador,
    }));
  }

  handleClickPesquisarTipoServico() {
    this.setState((prevState) => ({
      pesquisarTipoServico: !prevState.pesquisarTipoServico,
    }));
  }

  handleChange = async (event) => {
    const { target } = event;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const { name } = target;
    await this.setState({
      [name]: value,
    });
  };

  submitForm(e) {
    e.preventDefault();

    const data = { ...this.state };

    try {
      swal({
        title: "As informações estão corretas? Posso cadastrar esse serviço?",
        icon: "warning",
        buttons: {
          cancel: "Não",
          catch: {
            text: "Sim",
            value: "catch",
          },
        },
        dangerMode: true,
      }).then(async (willDelete) => {
        if (willDelete) {
          await Api.post("ordemServico", data)
            .then((res) => {
              swal(res.data.message, {
                icon: "success",
              });
             
              if(localStorage.getItem("idOcioso")) {
              this.setOcioso(this.state.idOcioso);
              }
              this.setState({ redirect: true });



      localStorage.removeItem("idOcioso");
            })
            .catch((res) => {
              swal(res.error, {
                icon: "warning",
              });
            });
        } else {
          // swal("Your imaginary file is safe!");
        }
      });
    } catch (err) {
      swal("Erro ao cadastrar serviço, tente novamente!", {
        icon: "warning",
      });
    }
  }

  async componentDidMount() {
    let Cliente = await Api.get("cliente");
    this.setState({
      Cliente: Cliente.data.cliente,
    });

    let Prestador = await Api.get("prestador");
    this.setState({
      Prestador: Prestador.data.prestador,
    });

    let TipoServico = await Api.get("tipoServico");
    this.setState({
      TipoServico: TipoServico.data.tipoServico,
    });
  }


   async setOcioso(_id) {
    const data = {ocioso: false};
      await Api.put(`ordemServico/${_id}`, data)

  }

  render() {
    const {
      //cliente
      nomeCliente,
      telefoneCliente,
      enderecoCliente,
      emailCliente,
      cidadeCliente,
      estadoCliente,
      //prestador
      nomePrestador,
      telefonePrestador,
      emailPrestador,
      //tipo de serviço
      nomeServico,
      tipoServico,
      tipoPrestador,
      //ordem de serviço
      descricaoOrdemServico,
      dataServico,
      horaServico,
      precoOrdemServico,
      frequencia,
      formaPagamento,
      redirect,
      page,
      Cliente,
      Prestador,
      TipoServico,
    } = this.state;

    let dateInitial = new Date();

    let horaInicial = moment(dateInitial).format("LT");

    dateInitial = moment(dateInitial).format("YYYY-MM-DD");

    if (redirect) {
      return <Redirect to={page} />;
    } else {
      return (
        <div className="content row-cadastrar row justify-content-center">
          <ThemeProvider theme={theme}>
            <Row>
              <Col md="12">
                <Card>
                  <Form
                    className="form"
                    onSubmit={(e) => {
                      this.submitForm(e);
                    }}
                  >
                    {this.props.active === 0 ? (
                      <Card className="card-botton">
                        <CardHeader>
                          <h5 className="title">Dados Cliente</h5>
                        </CardHeader>
                        <CardHeader>
                          <Button
                            className="btn-fill"
                            color="info"
                            onClick={this.handleClickPesquisarCliente}
                          >
                            <SearchIcon /> Pesquisar Cliente{" "}
                          </Button>
                        </CardHeader>

                        <CardBody>
                          {/* <Steps /> */}
                          <Row>
                            <Col>
                              {this.state.pesquisarCliente ? (
                                <MaterialTable
                                  className="row-table-search"
                                  title=""
                                  columns={[
                                    { title: "Nome", field: "nomeCliente" },
                                  ]}
                                  options={{
                                    pageSize: 1,
                                  }}
                                  data={Cliente}
                                  actions={[
                                    {
                                      title: "Selecionar",
                                      icon: "save",
                                      tooltip: "Save User",
                                      onClick: (event, rowData) =>
                                        this.setState({
                                          emailCliente: rowData.emailCliente,
                                          nomeCliente: rowData.nomeCliente,
                                          telefoneCliente:
                                            rowData.telefoneCliente,
                                          enderecoCliente:
                                            rowData.enderecoCliente,
                                          cidadeCliente: rowData.cidadeCliente,
                                          estadoCliente: rowData.estadoCliente,
                                          pesquisarCliente: false,
                                        }),
                                    },
                                  ]}
                                  components={{
                                    Action: (props) => (
                                      <Button
                                        onClick={(event) =>
                                          props.action.onClick(
                                            event,
                                            props.data
                                          )
                                        }
                                        color="info"
                                        variant="contained"
                                        style={{ textTransform: "none" }}
                                        size="small"
                                      >
                                        <AddCircleIcon />
                                      </Button>
                                    ),
                                  }}
                                />
                              ) : (
                                ""
                              )}
                            </Col>
                          </Row>
                          <br />
                          <Row>
                            <Col className="pr-md-1" md="5">
                              <FormGroup>
                                <TextField
                                  label="Email do CLiente"
                                  fullWidth
                                  margin="normal"
                                  color="deepPurple"
                                  size="large"
                                  type="email"
                                  name="emailCliente"
                                  id="emailCliente"
                                  value={emailCliente || ""}
                                  onChange={(e) => {
                                    if (
                                      emailCliente === this.cliente.emailCliente
                                    ) {
                                      this.handleChange(e);
                                    }
                                  }}
                                  disabled
                                  required
                                />
                              </FormGroup>
                            </Col>
                            <Col className="md-1" md="4">
                              <FormGroup>
                                <TextField
                                  label="Nome do Cliente"
                                  fullWidth
                                  margin="normal"
                                  color="deepPurple"
                                  size="large"
                                  type="text"
                                  name="nomeCliente"
                                  id="nomeCliente"
                                  value={nomeCliente || ""}
                                  onChange={(e) => {
                                    this.handleChange(e);
                                  }}
                                  disabled
                                  required
                                />
                              </FormGroup>
                            </Col>
                            <Col className="pl-md-1" md="3">
                              <FormGroup>
                                <TextField
                                  label="Telefone do Cliente"
                                  fullWidth
                                  margin="normal"
                                  color="deepPurple"
                                  size="large"
                                  type="text"
                                  name="telefoneCliente"
                                  id="telefoneCliente"
                                  value={telefoneCliente || ""}
                                  onChange={(e) => {
                                    this.handleChange(e);
                                  }}
                                  disabled
                                  required
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                          <Row>
                            <Col className="pr-md-1" md="6">
                              <FormGroup>
                                <TextField
                                  label="Endereço do Cliente"
                                  fullWidth
                                  margin="normal"
                                  color="deepPurple"
                                  size="large"
                                  type="text"
                                  name="enderecoCliente"
                                  id="enderecoCliente"
                                  value={enderecoCliente || ""}
                                  onChange={(e) => {
                                    this.handleChange(e);
                                  }}
                                  disabled
                                  required
                                />
                              </FormGroup>
                            </Col>
                            <Col className="md-1" md="3">
                              <FormGroup>
                                <TextField
                                  label="Cidade"
                                  fullWidth
                                  margin="normal"
                                  color="deepPurple"
                                  size="large"
                                  type="text"
                                  name="cidadeCliente"
                                  id="cidadeCliente"
                                  value={cidadeCliente || ""}
                                  onChange={(e) => {
                                    this.handleChange(e);
                                  }}
                                  disabled
                                  required
                                />
                              </FormGroup>
                            </Col>
                            <Col className="pl-md-1" md="3">
                              <FormGroup>
                                <TextField
                                  label="Estado"
                                  fullWidth
                                  margin="normal"
                                  color="deepPurple"
                                  size="large"
                                  type="text"
                                  name="estadoCliente"
                                  id="estadoCliente"
                                  value={estadoCliente || ""}
                                  onChange={(e) => {
                                    this.handleChange(e);
                                  }}
                                  disabled
                                  required
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                        </CardBody>
                      </Card>
                    ) : (
                      ""
                    )}
                    {this.props.active === 1 ? (
                      <Card className="card-botton">
                        <CardHeader>
                          <h5 className="title">Dados Prestador</h5>
                        </CardHeader>
                        <CardHeader>
                          <Button
                            className="btn-fill"
                            color="info"
                            onClick={this.handleClickPesquisarPrestador}
                          >
                            <SearchIcon /> Pesquisar Prestador
                          </Button>
                        </CardHeader>

                        <CardBody>
                          <Row>
                            <Col className="">
                              {this.state.pesquisarPrestador ? (
                                <MaterialTable
                                  title=""
                                  columns={[
                                    { title: "Nome", field: "nomePrestador" },
                                  ]}
                                  data={Prestador}
                                  options={{
                                    pageSize: 1,
                                  }}
                                  actions={[
                                    {
                                      icon: "save",
                                      tooltip: "Save User",
                                      onClick: (event, rowData) =>
                                        this.setState({
                                          nomePrestador: rowData.nomePrestador,
                                          emailPrestador:
                                            rowData.emailPrestador,
                                          telefonePrestador:
                                            rowData.telefonePrestador,
                                          pesquisarPrestador: false,
                                        }),
                                    },
                                  ]}
                                  components={{
                                    Action: (props) => (
                                      <Button
                                        onClick={(event) =>
                                          props.action.onClick(
                                            event,
                                            props.data
                                          )
                                        }
                                        color="info"
                                        variant="contained"
                                        style={{ textTransform: "none" }}
                                        size="small"
                                      >
                                        <AddCircleIcon />
                                      </Button>
                                    ),
                                  }}
                                />
                              ) : (
                                ""
                              )}
                            </Col>
                          </Row>
                          <br />
                          <Row>
                            <Col className="pr-md-1" md="5">
                              <FormGroup>
                                <TextField
                                  label="Email do Prestador"
                                  fullWidth
                                  margin="normal"
                                  color="deepPurple"
                                  size="large"
                                  type="email"
                                  name="emailPrestador"
                                  id="emailPrestador"
                                  value={emailPrestador || ""}
                                  onChange={(e) => {
                                    this.handleChange(e);
                                  }}
                                  disabled
                                  required
                                />
                              </FormGroup>
                            </Col>
                            <Col className="md-1" md="4">
                              <FormGroup>
                                <TextField
                                  label="Nome do Prestador"
                                  fullWidth
                                  margin="normal"
                                  color="deepPurple"
                                  size="large"
                                  type="text"
                                  name="nomePrestador"
                                  id="nomePrestador"
                                  value={nomePrestador || ""}
                                  onChange={(e) => {
                                    this.handleChange(e);
                                  }}
                                  disabled
                                  required
                                />
                              </FormGroup>
                            </Col>
                            <Col className="pl-md-1" md="3">
                              <FormGroup>
                                <TextField
                                  label="Telefone do Prestador"
                                  fullWidth
                                  margin="normal"
                                  color="deepPurple"
                                  size="large"
                                  type="text"
                                  name="telefonePrestador"
                                  id="telefonePrestador"
                                  value={telefonePrestador || ""}
                                  onChange={(e) => {
                                    this.handleChange(e);
                                  }}
                                  disabled
                                  required
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                        </CardBody>
                      </Card>
                    ) : (
                      ""
                    )}
                    {this.props.active === 2 ? (
                      <Card className="card-botton">
                        <CardHeader>
                          <h5 className="title">Dados Serviço</h5>
                        </CardHeader>

                        <CardHeader>
                          <Button
                            className="btn-fill"
                            color="info"
                            onClick={this.handleClickPesquisarTipoServico}
                          >
                            <SearchIcon /> Pesquisar Tipos de Serviços{" "}
                          </Button>
                        </CardHeader>

                        <CardBody>
                          <Row>
                            <Col className="">
                              {this.state.pesquisarTipoServico ? (
                                <MaterialTable
                                  title=""
                                  columns={[
                                    {
                                      title: "Serviço",
                                      field: "nomeServico",
                                    },
                                  ]}
                                  data={TipoServico}
                                  options={{
                                    pageSize: 1,
                                  }}
                                  actions={[
                                    {
                                      icon: "save",
                                      tooltip: "Save User",
                                      onClick: (event, rowData) =>
                                        this.setState({
                                          nomeServico: rowData.nomeServico,
                                          tipoPrestador: rowData.tipoPrestador,
                                          tipoServico: rowData.tipoServico,
                                          pesquisarTipoServico: false,
                                        }),
                                    },
                                  ]}
                                  components={{
                                    Action: (props) => (
                                      <Button
                                        onClick={(event) =>
                                          props.action.onClick(
                                            event,
                                            props.data
                                          )
                                        }
                                        color="info"
                                        variant="contained"
                                        style={{ textTransform: "none" }}
                                        size="small"
                                      >
                                        <AddCircleIcon />
                                      </Button>
                                    ),
                                  }}
                                />
                              ) : (
                                ""
                              )}
                            </Col>
                          </Row>
                          <br />
                          <Row>
                            <Col className="pr-md-1" md="4">
                              <FormGroup>
                                <TextField
                                  label="Serviço"
                                  fullWidth
                                  margin="normal"
                                  color="deepPurple"
                                  size="large"
                                  type="text"
                                  name="nomeServico"
                                  id="nomeServico"
                                  value={nomeServico || ""}
                                  onChange={(e) => {
                                    this.handleChange(e);
                                  }}
                                  disabled
                                  required
                                />
                              </FormGroup>
                            </Col>
                            <Col className="md-1" md="4">
                              <FormGroup>
                                <TextField
                                  label="Tipo de Serviço"
                                  fullWidth
                                  margin="normal"
                                  color="deepPurple"
                                  size="large"
                                  type="text"
                                  name="tipoServico"
                                  id="tipoServico"
                                  value={tipoServico || ""}
                                  onChange={(e) => {
                                    this.handleChange(e);
                                  }}
                                  disabled
                                  required
                                />
                              </FormGroup>
                            </Col>
                            <Col className="pl-md-1" md="4">
                              <FormGroup>
                                <TextField
                                  label="Tipo de Prestador Para esse Serviço"
                                  fullWidth
                                  margin="normal"
                                  color="deepPurple"
                                  size="large"
                                  type="text"
                                  name="tipoPrestador"
                                  id="tipoPrestador"
                                  placeholder="Tipo de Prestador desse Serviço"
                                  value={tipoPrestador || ""}
                                  onChange={(e) => {
                                    this.handleChange(e);
                                  }}
                                  disabled
                                  required
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                          <Row>
                            <Col className="md-1" md="12">
                              <FormGroup>
                                <TextField
                                  label="Descrição do Serviço"
                                  fullWidth
                                  margin="normal"
                                  color="deepPurple"
                                  size="large"
                                  type="textarea"
                                  name="descricaoOrdemServico"
                                  id="descricaoOrdemServico"
                                  value={descricaoOrdemServico || ""}
                                  onChange={(e) => {
                                    this.handleChange(e);
                                  }}
                                  required
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                          <Row>
                            <Col className="pr-md-1" md="3">
                              <FormGroup>
                                {/* <label>Data </label>
                                <Input
                                  placeholder="" */}
                                {/* <TextField
                                  label="Data"
                                  fullWidth
                                  margin="normal"
                                  color="deepPurple"
                                  size="large"
                                  type="date"
                                  name="dataServico"
                                  id="dataServico"
                                  defaultValue={Date()}
                                  value={dataServico || ""}
                                  onChange={(e) => {
                                    this.handleChange(e);
                                  }}
                                  required
                                /> */}

                                <MuiPickersUtilsProvider
                                  utils={DateFnsUtils}
                                  locale={brLocale}
                                >
                                  <label id="demo-controlled-open-select-label">
                                    Data do Serviço
                                  </label>
                                  {/* <Input
                                    fullWidth
                                    clearable
                                    type="date"
                                    value={dataServico || ""}
                                    placeholder={moment()
                                      .add(1, "days")
                                      .format("L")}
                                    onChange={(date) =>
                                      this.handleDateChange(date)
                                    }
                                    format="dd/MM/yyyy"
                                  /> */}

                                  <Input
                                    placeholder=""
                                    type="date"
                                    name="dataServico"
                                    id="dataServico"
                                    value={dataServico || dateInitial}
                                    onChange={(e) => {
                                      this.handleChange(e);
                                    }}
                                  />
                                </MuiPickersUtilsProvider>
                              </FormGroup>
                            </Col>
                            <Col className="md-1" md="2">
                              <FormGroup>
                                <label>Hora</label>
                                {/* <Input
                                  placeholder=""  */}
                                {/* <TextField
                                  label="Hora"
                                  fullWidth
                                  margin="normal"
                                  color="deepPurple"
                                  size="large"
                                  type="time"
                                  name="horaServico"
                                  id="time"
                                  value={horaServico || "08:00"}
                                  onChange={(e) => {
                                    this.handleChange(e);
                                  }}
                                  InputLabelProps={{
                                    shrink: true,
                                  }}
                                  required
                                /> */}
                                <Input
                                  placeholder=""
                                  type="time"
                                  name="horaServico"
                                  id="horaServico"
                                  value={horaServico || horaInicial}
                                  onChange={(e) => {
                                    this.handleChange(e);
                                  }}
                                  // required
                                />
                              </FormGroup>
                            </Col>
                            <Col className="pl-md-1" md="2">
                              <FormGroup>
                                <TextField
                                  label="Frequencia"
                                  fullWidth
                                  margin="normal"
                                  color="deepPurple"
                                  size="large"
                                  type="text"
                                  name="frequencia"
                                  id="frequencia"
                                  value={frequencia || ""}
                                  onChange={(e) => {
                                    this.handleChange(e);
                                  }}
                                  required
                                />
                              </FormGroup>
                            </Col>
                            <Col className="pl-md-1" md="3">
                              <FormGroup>
                                {/* <TextField
                                  label="Forma de Pagamento"
                                  fullWidth
                                  margin="normal"
                                  color="deepPurple"
                                  size="large"
                                  type="select"
                                  name="formaPagamento"
                                  id="formaPagamento"
                                  value={formaPagamento || ""}
                                  onChange={(e) => {
                                    this.handleChange(e);
                                  }}
                                  required
                                  select
                                  helperText="Selecione a forma de pagamento!"
                                >
                                  <MenuItem>Dinheiro</MenuItem>
                                  <MenuItem>Cartão</MenuItem>
                                  <MenuItem>Cheque</MenuItem>
                                  <MenuItem>Tranferência</MenuItem>
                                  <MenuItem>Outro</MenuItem>
                                </TextField> */}
                                <label id="demo-controlled-open-select-label">
                                  Forma de Pagamento
                                </label>
                                {/* <NativeSelect
                                  labelId="demo-controlled-open-select-label"
                                  fullWidth
                                  margin="normal"
                                  color="deepPurple"
                                  size="large"
                                  type="select"
                                  name="formaPagamento"
                                  id="formaPagamento"
                                  value={formaPagamento || ""}
                                  onChange={(e) => {
                                    this.handleChange(e);
                                  }}
                                  // required
                                > */}
                                <Input
                                  color="info"
                                  type="select"
                                  name="formaPagamento"
                                  id="formaPagamento"
                                  value={formaPagamento || ""}
                                  onChange={(e) => {
                                    this.handleChange(e);
                                  }}
                                  // required
                                >
                                  <option className="option-color">
                                    Dinheiro
                                  </option>
                                  <option className="option-color">
                                    Cartão
                                  </option>
                                  <option className="option-color">
                                    Cheque
                                  </option>
                                  <option className="option-color">
                                    Tranferência
                                  </option>
                                </Input>
                                {/* </NativeSelect> */}
                              </FormGroup>
                            </Col>
                            <Col className="pl-md-1" md="2">
                              <FormGroup>
                                <TextField
                                  label="Preço"
                                  fullWidth
                                  margin="normal"
                                  color="deepPurple"
                                  size="large"
                                  type="text"
                                  name="precoOrdemServico"
                                  id="precoOrdemServico"
                                  value={precoOrdemServico || ""}
                                  onChange={(e) => {
                                    this.handleChange(e);
                                  }}
                                  required
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                        </CardBody>
                      </Card>
                    ) : (
                      ""
                    )}
                    {this.props.active === 3 ? (
                      <CardFooter>
                        {/* <Button
                      className="btn-fill"
                      color="info"
                      onClick={() => {
                        this.setState({
                          page: "/admin/servicos/dashboard/",
                          redirect: true,
                        });
                      }}
                    >
                      Cancelar
                    </Button> */}
                        <Button
                          className="btn-fill"
                          color="info"
                          onClick={() => {
                            try {
                              let frequenciaServico;
                              if (this.state.frequencia !== "") {
                                frequenciaServico = this.state.frequencia.split(
                                  " "
                                );
                                frequenciaServico = parseInt(
                                  frequenciaServico[0]
                                );
                              } else {
                                frequenciaServico = 1;
                              }

                              let dateShootSchedule = moment(dataServico);
                              dateShootSchedule = moment(
                                dateShootSchedule
                              ).subtract(1, "days");

                              dateShootSchedule = moment(
                                dateShootSchedule
                              ).format("YYYY-MM-DD");
                              this.setState({
                                dateSchedule: dateShootSchedule,
                              });

                              this.setState({
                                dataServico: moment(
                                  this.state.dataServico +
                                    " " +
                                    this.state.horaServico
                                ).format(),
                              });

                              let dataProximoServico = moment(
                                this.state.dataServico +
                                  " " +
                                  this.state.horaServico
                              )
                                .add("days", frequenciaServico)
                                .format();

                              this.setState({ dataProx: dataProximoServico });

                            } catch {
                              swal(
                                "Erro ao cadastrar serviço, tente novamente!",
                                {
                                  icon: "warning",
                                }
                              );
                            }
                          }}
                          type="submit"
                        >
                          Salvar
                        </Button>
                      </CardFooter>
                    ) : (
                      ""
                    )}
                  </Form>
                </Card>
              </Col>
            </Row>
          </ThemeProvider>
        </div>
      );
    }
  }
}

export default CadastrarServicos;
