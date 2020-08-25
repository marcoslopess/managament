import React from "react";
import { Redirect } from "react-router-dom";
import "../../../../node_modules/bootstrap/dist/css/bootstrap.min.css";

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
} from "reactstrap";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { blue } from "@material-ui/core/colors";

const theme = createMuiTheme({
  palette: {
    primary: blue,
  },
});
class CadastrarCliente extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      emailCliente: "",
      nomeCliente: "",
      telefoneCliente: "",
      enderecoCliente: "",
      cidadeCliente: "",
      estadoCliente: "",
      redirect: false,
      page: "/admin/clientes/listar/",
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = async (event) => {
    const { target } = event;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const { name } = target;
    await this.setState({
      [name]: value,
    });
  };

  async submitForm(e) {
    e.preventDefault();

    const data = { ...this.state };

    try {
      await Api.post("cliente", data).then((res) => {
        alert(res.data.message);
        this.setState({ redirect: true });
      });
    } catch (err) {
      alert("Erro ao cadastrar cliente, tente novamente!");
    }
  }

  render() {
    const {
      emailCliente,
      nomeCliente,
      telefoneCliente,
      enderecoCliente,
      cidadeCliente,
      estadoCliente,
      redirect,
      page,
    } = this.state;

    if (redirect) {
      return <Redirect to={page} />;
    } else {
      return (
        <div className="content row justify-content-center">
          <ThemeProvider theme={theme}>
            <Row>
              <Col md="12">
                <Card>
                  <Form className="form" onSubmit={(e) => this.submitForm(e)}>
                    <CardHeader>
                      <h5 className="title">Cadastrar Cliente</h5>
                    </CardHeader>
                    <CardBody>
                      <Row>
                        <Col className="pr-md-1" md="5">
                          <FormGroup>
                            <TextField
                              label="Email"
                              fullWidth
                              margin="normal"
                              color="deepPurple"
                              size="large"
                              type="emailCliente"
                              name="emailCliente"
                              id="exampleEmail"
                              value={emailCliente}
                              onChange={(e) => {
                                this.handleChange(e);
                              }}
                            />
                          </FormGroup>
                        </Col>
                        <Col className="md-1" md="4">
                          <FormGroup>
                            <TextField
                              label="Nome"
                              fullWidth
                              margin="normal"
                              color="deepPurple"
                              size="large"
                              type="text"
                              name="nomeCliente"
                              id="nomeCliente"
                              value={nomeCliente}
                              onChange={(e) => {
                                this.handleChange(e);
                              }}
                            />
                          </FormGroup>
                        </Col>
                        <Col className="pl-md-1" md="3">
                          <FormGroup>
                            <TextField
                              label="Telefone"
                              fullWidth
                              margin="normal"
                              color="deepPurple"
                              size="large"
                              type="text"
                              name="telefoneCliente"
                              id="telefoneCliente"
                              value={telefoneCliente}
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
                              label="Endereço"
                              fullWidth
                              margin="normal"
                              color="deepPurple"
                              size="large"
                              type="text"
                              name="enderecoCliente"
                              id="enderecoCliente"
                              value={enderecoCliente}
                              onChange={(e) => {
                                this.handleChange(e);
                              }}
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
                              value={cidadeCliente}
                              onChange={(e) => {
                                this.handleChange(e);
                              }}
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
                              value={estadoCliente}
                              onChange={(e) => {
                                this.handleChange(e);
                              }}
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
                          this.setState({
                            page: "/admin/clientes/dashboard/",
                            redirect: true,
                          });
                        }}
                      >
                        Cancelar
                      </Button>
                      <Button className="btn-fill" color="info" type="submit">
                        Cadastrar
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

export default CadastrarCliente;
