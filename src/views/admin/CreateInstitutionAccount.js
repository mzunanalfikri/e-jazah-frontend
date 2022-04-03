import React from "react"
import {
    Button,
    Container,
    Row,
    Col,
    Input,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Spinner
  } from "reactstrap";
import Navbar from "components/Navbars/AdminNavbar";
import CardsFooter from "components/Footers/CardsFooter.js";
import axios from "axios";
import { url } from "const";
import template from "assets/template/RegistrationInstitutionTemplate.csv"


class CreateInstitutionAccount extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            selectedFile : null,
            modal:false,
            resultElement : [],
            loading : true
        }
        this.onFileChange = this.onFileChange.bind(this)
        this.onFileUpload = this.onFileUpload.bind(this)
        this.toggle = this.toggle.bind(this)
    }

    onFileChange(event){
        this.setState({
            selectedFile : event.target.files[0]
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

    toggle(){
        this.setState({
            modal: !this.state.modal
        })

        console.log(this.state.modal)
    }

    render () {
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
                        <div className="col px-0">
                        <Row>
                            <Col lg="6">
                            <h1 className="display-3 text-white">
                                Buat Akun Institusi
                            </h1>

                            <div className="btn-wrapper">

                                <a href={template} download="Template Registrasi Institusi" >
                                    <Button
                                    className="btn-white btn-icon mb-3 mb-sm-0 ml-1"
                                    color="default"
                                    >
                                    <span className="btn-inner--icon mr-0">
                                        <i className="ni ni-cloud-download-95" />
                                    </span>
                                    <span className="btn-inner--text">
                                        
                                            Download Template
                                    </span>
                                    </Button>
                                </a>
                            </div>
                            </Col>
                        </Row>

                        <Row className="align-items-center justify-content-center">
                            <Col className="text-center" lg="6">
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
                                    Unggah
                                </Button>
                                </div>
                            </Col>
                            </Row>
                        </div>
                        <Modal isOpen={this.state.modal} toggle={this.toggle} centered={true} autoFocus={true} size="lg">
                            <ModalHeader >
                                Hasil Upload
                            </ModalHeader>
                            <ModalBody >
                                {this.state.loading ? <Spinner/> : 
                                    <table className="table-bordered">
                                        <thead>
                                            <tr>
                                                <th> Baris </th>
                                                <th> Status </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.resultElement.map((el) => (
                                                <tr>
                                                    <td>{el.row}</td>
                                                    <td>{el.message}</td>
                                                </tr>
                                            ))}
                                            
                                        </tbody>
                                    </table>
                                }
                            </ModalBody>
                            <ModalFooter>
                                <Button color="primary" onClick={this.toggle} className="btn-sm">Okay</Button>
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
        )
    }
}

export default CreateInstitutionAccount