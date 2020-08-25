import React from "react";
import { Redirect } from "react-router-dom";
import "../../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import moment from "moment";

import "./editar.styles.scss";
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
} from "reactstrap";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { blue } from "@material-ui/core/colors";
import NativeSelect from "@material-ui/core/NativeSelect";
import { KeyboardDatePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns"; // choose your lib
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import brLocale from "date-fns/locale/pt-BR";

const theme = createMuiTheme({
  palette: {
    primary: blue,
  },
});

// import pt from 'date-fns/locales/pt';

class EditarServicos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //cliente
      nomeCliente: "",
      telefoneCliente: "",
      enderecoCliente: "",
      emailCliente: "",
      cidadeCliente: "",
      estadoCliente: "",
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
      dateUpdate: Date(),
      dateSchedule: "",
      redirect: false,
      _id: localStorage.getItem("_id"),
      page: localStorage.getItem("page"),
    };
    this.handleChange = this.handleChange.bind(this);

    this.handleDateChange = this.handleDateChange.bind(this);
  }

  handleDateChange = (date) => {
    this.setState({ dataServico: date });
  };

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

    let date = new Date();

    this.setState({ dateUpdate: date });

    const data = { ...this.state };

    try {
      Api.put(`ordemServico/${this.state._id}`, data).then((res) => {
        alert(res.data.message);

        this.setState({ redirect: true });
        localStorage.removeItem("_id");
        localStorage.removeItem("page");
      });
    } catch (err) {
      alert("Erro ao editar serviço, tente novamente!");
    }
  }

  async componentDidMount() {
    let data = await Api.get(`ordemServico/${this.state._id}`);

    this.setState({
      nomeCliente: data.data.nomeCliente,
      telefoneCliente: data.data.telefoneCliente,
      enderecoCliente: data.data.enderecoCliente,
      emailCliente: data.data.emailCliente,
      cidadeCliente: data.data.cidadeCliente,
      estadoCliente: data.data.estadoCliente,
      //prestador
      nomePrestador: data.data.nomePrestador,
      telefonePrestador: data.data.telefonePrestador,
      emailPrestador: data.data.emailPrestador,
      //tipo de serviço
      nomeServico: data.data.nomeServico,
      tipoServico: data.data.tipoServico,
      tipoPrestador: data.data.tipoPrestador,
      //ordem de serviço
      descricaoOrdemServico: data.data.descricaoOrdemServico,
      dataServico: data.data.dataServico,
      horaServico: data.data.horaServico,
      precoOrdemServico: data.data.precoOrdemServico,
      frequencia: data.data.frequencia,
      formaPagamento: data.data.formaPagamento,
      dateSchedule: data.data.dateSchedule,
    });
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
    } = this.state;

    let dataFormatada = moment(dataServico).format("YYYY-MM-DD");

    if (redirect) {
      return <Redirect to={`/admin/servicos/listar${page}`} />;
    } else {
      return (
        <div className="content  justify-content-center">
          <ThemeProvider theme={theme}>
            <Row>
              <Col md="12">
                <Card>
                  <Form className="form" onSubmit={(e) => this.submitForm(e)}>
                    <CardHeader>
                      <h4 className="title">Editar Serviço</h4>
                    </CardHeader>
                    <CardHeader>
                      <h5 className="title">Dados Cliente</h5>
                    </CardHeader>
                    <CardBody>
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
                              required
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </CardBody>
                    <CardHeader>
                      <h5 className="title">Dados Prestador</h5>
                    </CardHeader>
                    <CardBody>
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
                              required
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </CardBody>
                    <CardHeader>
                      <h5 className="title">Dados Serviço</h5>
                    </CardHeader>
                    <CardBody>
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
                              <KeyboardDatePicker
                                fullWidth
                                clearable
                                value={dataServico}
                                placeholder={moment()
                                  .add(1, "days")
                                  .format("L")}
                                onChange={(date) => this.handleDateChange(date)}
                                format="dd/MM/yyyy"
                              />
                            </MuiPickersUtilsProvider>
                          </FormGroup>
                        </Col>
                        <Col className="md-1" md="2">
                          <FormGroup>
                            {/* <label>Hora</label>
                                <Input
                                  placeholder="" */}
                            <TextField
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
                            <NativeSelect
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
                            >
                              <option className="option-color">Dinheiro</option>
                              <option className="option-color">Cartão</option>
                              <option className="option-color">Cheque</option>
                              <option className="option-color">
                                Tranferência
                              </option>
                            </NativeSelect>
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
                    <CardFooter>
                      <Button
                        className="btn-fill"
                        color="info"
                        onClick={() => {
                          this.setState({ redirect: true });
                          localStorage.removeItem("_id");
                        }}
                      >
                        Cancelar
                      </Button>
                      <Button
                        className="btn-fill"
                        color="info"
                        onClick={() => {
                          let frequenciaServico;
                          if (this.state.frequencia !== "") {
                            frequenciaServico = this.state.frequencia.split(
                              " "
                            );
                            frequenciaServico = parseInt(frequenciaServico[0]);
                          } else {
                            frequenciaServico = 1;
                          }

                          let dateShootSchedule = moment(dataServico)
                            .subtract(1, "days")
                            .format("YYYY-MM-DD");

                          this.setState({ dateSchedule: dateShootSchedule });

                          this.setState({
                            dataServico: moment(
                              dataFormatada + " " + this.state.horaServico
                            ).format(),
                          });

                          let dataProximoServico = moment(
                            dataFormatada + " " + this.state.horaServico
                          )
                            .add("days", frequenciaServico)
                            .format();

                          this.setState({ dataProx: dataProximoServico });
                        }}
                        type="submit"
                      >
                        Save
                      </Button>
                    </CardFooter>
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

export default EditarServicos;
