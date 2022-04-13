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

// reactstrap components
import {
  Button,
  Container,
  Input,
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";

// core components
import PublicNavbar from "components/Navbars/PublicNavbar";
import StudentNavbar from "components/Navbars/StudentNavbar";
import AdminNavbar from "components/Navbars/AdminNavbar";
import InstitutionNavbar from "components/Navbars/InstitutionNavbar";
import CardsFooter from "components/Footers/CardsFooter.js";
import axios from "axios";
import { url } from "const";

let Navbar = PublicNavbar
// index page sections
// import Download from "../IndexSections/Download.js";

class Landing extends React.Component {
  state = {
    selectedFile : null,
    modal : false,
    ijazahNumber : "",
    response:{}
  };

  constructor(props){
    super(props)
    let role = sessionStorage.getItem('role')
    if (role === 'admin') {
      Navbar = AdminNavbar
    } else if (role === 'institution') {
      Navbar = InstitutionNavbar
    } else if (role === 'student'){
      Navbar = StudentNavbar
    } else {
      Navbar = PublicNavbar
    }
    this.onFileChange = this.onFileChange.bind(this)
    this.onFileUpload = this.onFileUpload.bind(this)
    this.toggle = this.toggle.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.onVerifyByNumber = this.onVerifyByNumber.bind(this)
  }

  onFileChange(event){
    this.setState({
        selectedFile : event.target.files[0]
    })
}

toggle(){
  this.setState({
      modal: !this.state.modal
  })
}

onFileUpload(){
  try {
      const formData = new FormData()
      formData.append("file", this.state.selectedFile, this.state.selectedFile.name)
      
      this.toggle()
      console.log(this.state.selectedFile)

      axios.defaults.headers.common['Authorization'] = "Bearer " + sessionStorage.getItem('token')
      axios.post(url + "/register-institution", formData).then(res => {
          for (let index = 0; index < res.data.length; index++) {
              const element = res.data[index];
              console.log(element.message)
          }
          this.setState({
              loading : false,
              resultElement : res.data
          })
      }).catch(err => {
          alert(err)
      })
  } catch (error) {
      alert("Please upload file")
  }

}

onVerifyByNumber(){
  let payload = {ijazahId : this.state.ijazahNumber}
  if (this.state.ijazahNumber === ""){
    alert("Harap masukkan nomor ijazah!")
  } else {
    axios.post(url + "/ijazah/verify-by-id", payload).then(res => {
      console.log(res.data)
      this.toggle()
      this.setState({response:res.data})
    }).catch( err => {
      alert(err)
    })
  }
}

handleInputChange(event){
  event.preventDefault();
  const target = event.target;
  this.setState({
    [target.name]: target.value,
  });
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
                <div className="col px-0 text-center ">
                  <h1 className="display-3 text-white text-center"> Verifikasi Ijazah </h1>
                          <Row className="align-items-center justify-content-center">
                            <Col className="text-center" lg="8">
                                <div className="btn-wrapper mt-5">
                                
                                <Input 
                                    name="ijazahNumber"
                                    type="text" 
                                    placeholder="Masukkan nomor ijazah"
                                    className="form-control"
                                    onChange={this.handleInputChange}></Input>
                                <br></br>
                                <Button 
                                    className="align-items-center justify-content-center text-center" 
                                    color="info" 
                                    type="button"
                                    onClick={this.onVerifyByNumber}>
                                    <span className="btn-inner--icon">
                                      <i className="fa fa-search mr-2" />
                                    </span>
                                    Verifikasi Nomor
                                </Button>
                                </div>
                            </Col>
                          </Row>
                          <br></br>
                          <h4 className="text-white">atau</h4>
                          <Row className="align-items-center justify-content-center">
                            <Col className="text-center" lg="8">
                                <div className="btn-wrapper mt-5">
                                
                                <Input 
                                    type="file" 
                                    className="form-control 
                                    form-control-file"
                                    onChange={this.onFileChange}></Input>
                                <br></br>
                                <Button 
                                    className="align-items-center justify-content-center text-center" 
                                    color="info" 
                                    type="button"
                                    onClick={this.onFileUpload}>
                                      <span className="btn-inner--icon">
                                      <i className="fa fa-search mr-2" />
                                    </span>
                                    Verifikasi File
                                </Button>
                                </div>
                            </Col>
                          </Row>
                </div>
                 <Modal isOpen={this.state.modal} toggle={this.toggle} centered={true} autoFocus={true} size="sm">
                    <ModalHeader >
                        Hasil Verifikasi
                    </ModalHeader>
                    <ModalBody >
                      {this.state.response.notVerified ? 
                      <h4 className="text-center">VERIFIKASI GAGAL</h4> : 
                      <div >
                        <h4 className="text-center">IJAZAH TERVERIFIKASI</h4>
                        <p>Nama : {this.state.response.Name}</p>
                        <p>Institusi : {this.state.response.InstitutionName}</p>
                      </div> 
                      }
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.toggle} className="btn-sm">Tutup</Button>
                    </ModalFooter>
                </Modal>
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
