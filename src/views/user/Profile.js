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
import Cookies from "js-cookie";

// reactstrap components
import {
  Button,
  Card,
  CardBody,
  Container,
  Row,
  Col,
  Spinner,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  FormGroup,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Form
} from "reactstrap";
import { url } from "const";
import axios from "axios";

// core components
import StudentNavbar from "components/Navbars/StudentNavbar";
import AdminNavbar from "components/Navbars/AdminNavbar";
import InstitutionNavbar from "components/Navbars/InstitutionNavbar";
import SimpleFooter from "components/Footers/SimpleFooter.js";

let Navbar = null
class Profile extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      loading : true,
      element : null,
      modal : false,
      newPassword : "",
      confirmNewPassword : "",
      waitPasswordChange : false
    }
    this.redirect = this.redirect.bind(this)
    this.toggle = this.toggle.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this);
    this.changePassword = this.changePassword.bind(this);

    let role = Cookies.get('role')
    if (role === 'admin') {
      Navbar = AdminNavbar
      this.getProfile()
    } else if (role === 'institution') {
      Navbar = InstitutionNavbar
      this.getProfile()
    } else if (role === 'student'){
      Navbar = StudentNavbar
      this.getProfile()
    } else {
      this.redirect()
    }
  }

  redirect(){
    this.props.history.push("/404")
  }

  getProfile(){
    axios.defaults.headers.common['Authorization'] = "Bearer " + sessionStorage.getItem('token')
    axios.get(url + "/profile").then( res => {
      let compo = null
      let data = res.data

      if (data.Role === "admin") {
        compo = (
          <div>
            <h2 className="text-center">{data.Name}</h2>
          </div>
        )
      } else if (data.Role === "institution") {
        compo = (
          <div>
            <h2 className="text-center">{data.Name}</h2>
            <p> Email : {data.ID}</p>
            <p> Jenjang : {data.Level}</p>
            <p> Kota : {data.City}</p>
            <p> Provinsi : {data.Province}</p>
          </div>
        )
      } else if (data.Role === "student"){
        compo = (
          <div>
            <h2 className="text-center">{data.Name}</h2>
            <p> NIK : {data.ID}</p>
            <p> Tempat Lahir : {data.BirthPlace}</p>
            <p> Tanggal Lahir : {data.BirthDate}</p>
          </div>
        )
      }
      this.setState({
        loading : false,
        element : compo
      })
    }).catch(err => {
      if (err.response.status === 403) {
        alert("Sesi habis, mohon login lagi")
        this.props.history.push("/logout")
      } else {
        alert(err)
      }
    })
  }

  toggle(){
    this.setState({
      modal : !this.state.modal
    })
  }

  handleInputChange(event){
    event.preventDefault();
    const target = event.target;

    this.setState({
      [target.name]: target.value,
    });
  }

  changePassword(){
    if (this.state.newPassword !== this.state.confirmNewPassword){
      alert("Password harus sama")
      this.toggle()
    } else if (this.state.newPassword.length < 8) {
      alert("Password minimal delapan karakter")
      this.toggle()
    } 
    else {
      this.setState({waitPasswordChange : true})
      axios.defaults.headers.common['Authorization'] = "Bearer " + sessionStorage.getItem('token')
      let payload = {
        password : this.state.newPassword
      }
      axios.post(url + "/change-password", payload).then(() => {
        alert("Password berhasil diubah")
        this.toggle()
        this.setState({waitPasswordChange : false})
      }).catch(err => {
        alert(err)
        this.toggle()
        this.setState({waitPasswordChange : false})
      })
    }
  }

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
          <section className="section section-shaped section-lg">
            <div className="shape shape-style-1 bg-gradient-default">
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>
            <Container className="pt-lg-7">
              <Row className="justify-content-center">
                <Col lg="5">
                  <Card className="bg-secondary shadow border-0">
                    <CardBody className="px-lg-5 py-lg-5">
                      {this.state.loading ? 
                        <Spinner/> :
                        this.state.element
                      }
                      <div className="text-center">
                        <Button
                          className="my-4"
                          color="primary"
                          type="button"
                          onClick={this.toggle}
                        >
                          Ubah Password
                        </Button>
                      </div>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </Container>
            <Modal isOpen={this.state.modal} toggle={this.toggle} centered={true}>
              <ModalHeader>
                Ubah Password
              </ModalHeader>
              <ModalBody>
                {this.state.waitPasswordChange ? <Spinner/> : 
                    <Form role="form">
                        <FormGroup className="mb-3">
                          <InputGroup className="input-group-alternative">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-lock-circle-open" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input 
                              name="newPassword"
                              placeholder="Password Baru" 
                              type="password" 
                              value={this.state.newPassword}
                              onChange={this.handleInputChange} />
                          </InputGroup>
                        </FormGroup>
                        <FormGroup>
                          <InputGroup className="input-group-alternative">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-lock-circle-open" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              name="confirmNewPassword"
                              placeholder="Ketik Ulang Password Baru"
                              type="password"
                              autoComplete="off"
                              value={this.state.confirmNewPassword}
                              onChange={this.handleInputChange}
                            />
                          </InputGroup>
                        </FormGroup>
                      </Form>
                  }
              </ModalBody>
              <ModalFooter className="text-center">
                <Button color="primary" onClick={this.changePassword} className="btn-sm">Ubah</Button>
              </ModalFooter>
            </Modal>
          </section>
        </main>
        <SimpleFooter />
      </>
    );
  }
}

export default Profile;
