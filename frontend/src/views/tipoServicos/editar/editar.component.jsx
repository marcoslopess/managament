import React from "react";
import { Redirect } from "react-router-dom";
import "../../../../node_modules/bootstrap/dist/css/bootstrap.min.css";

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

const theme = createMuiTheme({
  palette: {
    primary: blue,
  },
});

class EditarServicos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nomeServico: "",
      tipoServico: "",
      tipoPrestador: "",
      dateUpdate: Date(),
      redirect: false,
      _id: localStorage.getItem("_id"),
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

  submitForm(e) {
    e.preventDefault();

    let date = new Date();

    this.setState({ dateUpdate: date });

    const data = { ...this.state };

    try {
      Api.put(`tipoServico/${this.state._id}`, data).then((res) => {
        alert(res.data.message);

        this.setState({ redirect: true });
        localStorage.removeItem("_id");
      });
    } catch (err) {
      alert("Erro ao editar tipo de serviço, tente novamente!");
    }
  }

  async componentDidMount() {
    let data = await Api.get(`tipoServico/${this.state._id}`);

    this.setState({
      nomeServico: data.data.nomeServico,
      tipoServico: data.data.tipoServico,
      tipoPrestador: data.data.tipoPrestador,
    });
  }

  render() {
    const { nomeServico, tipoServico, tipoPrestador, redirect } = this.state;

    if (redirect) {
      return <Redirect to="/admin/tipoServicos/listar/" />;
    } else {
      return (
        <div className="content  justify-content-center">
          <ThemeProvider theme={theme}>
            <Row>
              <Col md="12">
                <Card>
                  <Form className="form" onSubmit={(e) => this.submitForm(e)}>
                    <CardHeader>
                      <h4 className="title">Cadastrar Tipo de Servico</h4>
                    </CardHeader>
                    <CardBody>
                      <Row>
                        <Col className="pr-md-1" md="4">
                          <FormGroup>
                            <TextField
                              label="Nome do Serviço"
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
                            />
                          </FormGroup>
                        </Col>
                        <Col className="pl-md-1" md="4">
                          <FormGroup>
                            <TextField
                              label="Tipo de Prestador desse Serviço"
                              fullWidth
                              margin="normal"
                              color="deepPurple"
                              size="large"
                              type="text"
                              name="tipoPrestador"
                              id="tipoPrestador"
                              value={tipoPrestador || ""}
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
                          this.setState({ redirect: true });
                          localStorage.removeItem("_id");
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

export default EditarServicos;
