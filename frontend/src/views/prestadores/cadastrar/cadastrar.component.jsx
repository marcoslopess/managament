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

class CadastrarPrestador extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nomePrestador: "",
      telefonePrestador: "",
      emailPrestador: "",
      redirect: false,
      page: "/admin/prestadores/listar/",
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
      await Api.post("prestador", data).then((res) => {
        alert(res.data.message);
        this.setState({ redirect: true });
      });
    } catch (err) {
      alert("Erro ao cadastrar prestador, tente novamente!");
    }
  }

  render() {
    const {
      nomePrestador,
      telefonePrestador,
      emailPrestador,
      redirect,
      page,
    } = this.state;

    if (redirect) {
      return <Redirect to={page} />;
    } else {
      return (
        <div className="content row-cadastrar row justify-content-center">
          <ThemeProvider theme={theme}>
            <Row>
              <Col md="12">
                <Card>
                  <Form className="form" onSubmit={(e) => this.submitForm(e)}>
                    <CardHeader>
                      <h4 className="title">Cadastrar Prestador</h4>
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
                              type="emailPrestador"
                              name="emailPrestador"
                              id="exampleEmail"
                              value={emailPrestador || ""}
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
                              name="nomePrestador"
                              id="nomePrestador"
                              value={nomePrestador || ""}
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
                              name="telefonePrestador"
                              id="telefonePrestador"
                              value={telefonePrestador || ""}
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
                            page: "/admin/prestadores/dashboard/",
                            redirect: true,
                          });
                        }}
                      >
                        Cancelar
                      </Button>
                      <Button className="btn-fill" color="info" type="submit">
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

export default CadastrarPrestador;
