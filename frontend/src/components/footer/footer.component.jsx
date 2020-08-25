/*eslint-disable*/
import React from "react";

// reactstrap components
import { Container } from "reactstrap";

import "./footer.styles.scss";

class Footer extends React.Component {
  render() {
    return (
      <footer className="footer botton-border">
        <Container fluid>
          <div className="copyright">
            © {new Date().getFullYear()} feito por Marcos Lopes.
          </div>
        </Container>
      </footer>
    );
  }
}

export default Footer;
