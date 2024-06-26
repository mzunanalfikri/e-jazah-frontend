/*!

=========================================================
* Argon Design System React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-design-system-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-design-system-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
// nodejs library that concatenates classes
// import classnames from "classnames";

// reactstrap components
import {
  Button,
  Container,
} from "reactstrap";

// core components
import Navbar from "components/Navbars/404Navbar";
import CardsFooter from "components/Footers/CardsFooter.js";


class Landing extends React.Component {

  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.main.scrollTop = 0;
  }
  render() {
    return (
      <>
        <Navbar />
        <main ref="main">
          <div className="position-relative">
            {/* shape Hero */}
            <section className="section section-lg section-shaped pb-250">
              <div className="shape shape-style-1 shape-default">
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
              </div>
              <Container className="py-lg-md d-flex">
                <div className="col px-0 text-center">
                    <br></br>
                    <br></br>
                    <br></br>
                    <h1 className="display-3 text-white text-center">404 Not Found</h1>
                    <br></br>
                    <br></br>

                    <Button
                        className="btn-white btn-icon mb-3 mb-sm-0 ml-1"
                        color="default"
                        href="/"
                    >
                        <span className="btn-inner--icon mr-1">
                        <i className="fa fa-home" />
                        </span>
                        <span className="btn-inner--text">
                            Back to Home
                        </span>
                    </Button>
                </div>
              </Container>
              {/* SVG separator */}
              <div className="separator separator-bottom separator-skew">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="none"
                  version="1.1"
                  viewBox="0 0 2560 100"
                  x="0"
                  y="0"
                >
                  <polygon
                    className="fill-white"
                    points="2560 0 2560 100 0 100"
                  />
                </svg>
              </div>
            </section>
            {/* 1st Hero Variation */}
          </div>
        </main>
        <CardsFooter />
      </>
    );
  }
}

export default Landing;
