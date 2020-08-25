import React from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";
import {
  Collapse,
  DropdownToggle,
  UncontrolledDropdown,
  Input,
  NavbarBrand,
  Navbar,
  Nav,
  Container,
  Modal,
  Alert,
  NavLink,
  DropdownItem,
  DropdownMenu,
} from "reactstrap";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";

import "./admin-navbar.styles.scss";
import Api from "../../services/api";
import { TOKEN_KEY } from "../../services/auth";
import Logo from '../../assets/svg/LOGO.svg';
// import { log } from "util";

class AdminNavbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapseOpen: false,
      modalSearch: false,
      color: "navbar-transparent",
      values: [],
    };
  }

  async componentDidMount() {
    let idUser = localStorage.getItem("_idUser");

    window.addEventListener("resize", this.updateColor);

    await Api.get(`admin/unique/${idUser}`, {}).then((res) => {
      this.setState({
        values: res.data,
      });
    });
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateColor);
  }
  // function that adds color white/transparent to the navbar on resize (this is for the collapse)
  updateColor = () => {
    if (window.innerWidth < 993 && this.state.collapseOpen) {
      this.setState({
        color: "bg-white",
      });
    } else {
      this.setState({
        color: "navbar-transparent",
      });
    }
  };
  // this function opens and closes the collapse on small devices
  toggleCollapse = () => {
    if (this.state.collapseOpen) {
      this.setState({
        color: "navbar-transparent",
      });
    } else {
      this.setState({
        color: "bg-white",
      });
    }
    this.setState({
      collapseOpen: !this.state.collapseOpen,
    });
  };
  // this function is to open the Search modal
  toggleModalSearch = () => {
    this.setState({
      modalSearch: !this.state.modalSearch,
    });
  };
  render() {
    return (
      <>
        <Navbar
          className={classNames("navbar-absolute", this.state.color)}
          expand="lg"
        >
          <Container fluid>
            <div className="navbar-wrapper">
              <div
                className={classNames("navbar-toggle d-inline", {
                  toggled: this.props.sidebarOpened,
                })}
              >
                <button
                  className="navbar-toggler"
                  type="button"
                  onClick={this.props.toggleSidebar}
                >
                  <span className="navbar-toggler-bar bar1" />
                  <span className="navbar-toggler-bar bar2" />
                  <span className="navbar-toggler-bar bar3" />
                </button>
              </div>
              <NavbarBrand href="#pablo" onClick={(e) => e.preventDefault()}>
                <img src={Logo} height="70px" width="75px" alt="" />
                {" "}
                {this.props.brandText}
              </NavbarBrand>
            </div>
            <button
              aria-expanded={false}
              aria-label="Toggle navigation"
              className="navbar-toggler"
              data-target="#navigation"
              data-toggle="collapse"
              id="navigation"
              type="button"
              onClick={this.toggleCollapse}
            >
              <span className="navbar-toggler-bar navbar-kebab" />
              <span className="navbar-toggler-bar navbar-kebab" />
              <span className="navbar-toggler-bar navbar-kebab" />
            </button>
            <Collapse navbar isOpen={this.state.collapseOpen}>
              <Nav className="ml-auto" navbar>
                <UncontrolledDropdown nav>
                  <DropdownToggle
                    // caret
                    // color="default"
                    // data-toggle="dropdown"
                    nav
                    // onClick={(e) => e.preventDefault()}
                  >
                    {" Olá " + this.state.values.name + "!  "}
                    {/* <div className="photo">
                      <img
                        alt="..."
                        src={require("../../assets/img/anime3.png")}
                      />
                    </div>
                    <b className="caret d-none d-lg-block d-xl-block" /> */}
                    {/* <p className="d-lg-none">Log out</p> */}
                  </DropdownToggle>
                  {/* <DropdownMenu className="dropdown-navbar" right tag="ul">
                    <NavLink tag="li">
                      <DropdownItem className="nav-item">Profile</DropdownItem>
                    </NavLink>
                    <NavLink tag="li">
                      <DropdownItem className="nav-item">Settings</DropdownItem>
                    </NavLink>
                    <DropdownItem divider tag="li" />
                    <NavLink tag="li">
                      <DropdownItem className="nav-item">
                       
                          Log out
                        </Link>
                      </DropdownItem>
                    </NavLink>
                  </DropdownMenu> */}
                </UncontrolledDropdown>

                <UncontrolledDropdown nav>
                  <DropdownToggle
                    // caret
                    // color="default"
                    // data-toggle="dropdown"
                    nav
                  >
                    {/* <div className="notification d-none d-lg-block d-xl-block" /> */}
                    <PowerSettingsNewIcon />
                    <p className="d-lg-none">sair</p>
                  </DropdownToggle>
                  <DropdownMenu className="dropdown-navbar" right tag="ul">
                    <NavLink tag="li">
                      <Link
                        onClick={() => {
                          Alert("Até a proxima");
                          localStorage.removeItem("_id");

                          localStorage.removeItem(TOKEN_KEY);
                        }}
                        to="/login"
                        title="Sair"
                        className="logout"
                      >
                        <DropdownItem className="nav-item">Sair</DropdownItem>
                      </Link>
                    </NavLink>
                  </DropdownMenu>
                </UncontrolledDropdown>
                <li className="separator d-lg-none" />
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
        <Modal
          modalClassName="modal-search"
          isOpen={this.state.modalSearch}
          toggle={this.toggleModalSearch}
        >
          <div className="modal-header">
            <Input id="inlineFormInputGroup" placeholder="SEARCH" type="text" />
            <button
              aria-label="Close"
              className="close"
              data-dismiss="modal"
              type="button"
              onClick={this.toggleModalSearch}
            >
              <i className="tim-icons icon-simple-remove" />
            </button>
          </div>
        </Modal>
      </>
    );
  }
}

export default AdminNavbar;
