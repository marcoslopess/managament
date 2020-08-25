import React, { Component } from "react";
import { withRouter, Redirect } from "react-router-dom";
import NotificationAlert from "react-notification-alert";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { blue } from "@material-ui/core/colors";

import api from "../../services/api";
import { login } from "../../services/auth";
import "./login.styles.scss";
import Logo from '../../assets/svg/LOGO2.svg';

import { Form } from "reactstrap";

const theme = createMuiTheme({
  palette: {
    primary: blue,
  },
});
class SignIn extends Component {
  state = {
    email: "",
    password: "",
    error: "",
  };
  notify = (place) => {
    var type = "warning";

    var options = {};
    options = {
      place: place,
      message: (
        <div>
          <div>{this.state.error}</div>
        </div>
      ),
      type: type,
      icon: "tim-icons icon-alert-circle-exc",
      autoDismiss: 4,
    };
    this.refs.notificationAlert.notificationAlert(options);
  };

  handleSignIn = async (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    if (!email || !password) {
      this.setState({
        error: "Preencha os campos de e-mail e senha para continuar!",
      });
      this.setState({ notify: this.notify("tc") });
    } else {
      try {
        await api
          .post("/auth/authenticate", { email, password })
          .then((res) => {
            console.log(res);
            login(res.data.token, res.data.user._id);
            this.props.history.push("/admin/dashboard");
          });
      } catch (err) {
        this.setState({
          error: "Houve um problema com o login, verifique seu email ou senha.",
        });
        this.setState({ notify: this.notify("tc") });
      }
    }
  };

  render() {
    if (
      localStorage.getItem("managament-token") &&
      localStorage.getItem("_idUser")
    ) {
      return <Redirect to="/admin/dashboard" />;
    } else {
      return (
        <>
          <div className="react-notification-alert-container">
            <NotificationAlert ref="notificationAlert" />
          </div>
          <div className="formulario col-lg-4 col-md-1 ml-auto mr-auto">
            <ThemeProvider theme={theme}>
              <Form className="form" onSubmit={this.handleSignIn}>
                <div className="card card-login card-white">
                  <div className="card-header">
                <img src={Logo} height="150vw" width="300vw" alt="" />
                    {/* <h1 className="card-title">Entrar</h1> */}
                  </div>
                  <div className="card-body">
                    <div className="input-group">
                      <TextField
                        label="Email"
                        fullWidth
                        margin="normal"
                        type="email"
                        name="email"
                        style={{ marginLeft: 25, marginRight: 25 }}
                        // variant="outlined"
                        onChange={(e) =>
                          this.setState({ email: e.target.value })
                        }
                      />
                    </div>
                    <div className="input-group">
                      <TextField
                        label="Senha"
                        fullWidth
                        style={{ margin: 25 }}
                        type="password"
                        name="password"
                        // variant="outlined"
                        onChange={(e) =>
                          this.setState({ password: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <div className="card-footer">
                    <button
                      type="submit"
                      href=""
                      className="btn btn-info btn-lg"
                    >
                      Entrar
                    </button>
                  </div>
                </div>
              </Form>
            </ThemeProvider>
          </div>
        </>
      );
    }
  }
}

export default withRouter(SignIn);
