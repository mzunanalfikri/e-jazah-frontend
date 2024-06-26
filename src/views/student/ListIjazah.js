
import React from "react";

// reactstrap components
import {
  Container,
  Card,
  CardBody,
  Spinner,
  Table,
  Row,
  Col,
  Modal
} from "reactstrap";

// core components
import Navbar from "components/Navbars/StudentNavbar";
import CardsFooter from "components/Footers/CardsFooter.js";
import DetailIjazah from "components/Modal/DetailIjazah"
import axios from "axios";
import { url } from "const"
const frontend_url = "http://localhost:3000"
// index page sections
// import Download from "../IndexSections/Download.js";

class ListIjazah extends React.Component {
  state = {
    firstLoading : true,
    element : null,
    id : sessionStorage.getItem('id'),
    isLinkOn : false,
    linkLoading : false,
    url : frontend_url + "/ijazah/" + sessionStorage.getItem('id'),
    modal:false,
    ijazah:{},
    currentId:""
  }

  constructor(props){
    super(props)
    this.detailIjazah = this.detailIjazah.bind(this)
    this.setIjazahLink = this.setIjazahLink.bind(this)
    this.toggle = this.toggle.bind(this)
    axios.defaults.headers.common['Authorization'] = "Bearer " + sessionStorage.getItem('token')
    axios.get(url + "/ijazah/student/all").then(res => {
      console.log(res.data)
      this.setState({
        element: this.constructElement(res.data)
      })
    }).catch(err => {
      if (err.response.status === 403){
        alert("Sesi anda telah habis, mohon login lagi.")
        this.props.history.push("/logout")
      } else{
        alert(err)
      }
    })
    axios.get(url + "/profile").then(res => {
      console.log(res.data)
      this.setState({
        firstLoading : false,
        isLinkOn : res.data.LinkOn
      })
    })
  }

  constructElement(data){
    if (data.length === 0){
      return (
        <tbody>
          <tr>
            <td colSpan={6}>Tidak ada ijazah</td>
          </tr>
        </tbody>
      )
    }
    return (
      <tbody>
        {data.map(el => (
          <tr onClick={() => this.detailIjazah(el)} key={el.ID}>
            <td>{el.ID}</td>
            <td>{el.StudentName}</td>
            <td>{el.InstitutionName}</td>
            <td>{el.City}, {el.Province}</td>
            <td>{el.GraduationDate}</td>
            <td>{this.getGelar(el)}</td>
          </tr>
        ))}
      </tbody>
    )
  }

  getGelar(data){
    if (data.Level === "PT"){
      return data.Gelar
    } else {
      return "Tamat " + data.Level
    }
  }

  detailIjazah(ijazah){
    this.toggle()
    let ijazahData = this.state.ijazah
    this.setState({currentId:ijazah.ID})
    if (!ijazahData[ijazah.ID]){
      axios.get(url + "/pdf/create-ijazah", {params: ijazah, responseType:"arraybuffer"}).then(res => {
        // console.log(res.data)
        ijazahData[ijazah.ID] = Buffer.from(res.data, 'binary').toString('base64')
        console.log(ijazahData[ijazah.ID])
        this.setState({
          ijazah : ijazahData
        })
      })
    }
  }

  toggle(){
    this.setState({
      modal: !this.state.modal
    })
  }

  setIjazahLink(){
    this.setState({
      linkLoading : true
    })
    axios.post(url + "/ijazah/set-link").then(res => {
      this.setState({
        isLinkOn:res.data.LinkOn,
        linkLoading:false
      })
    }).catch(err => {
      alert(err)
    })
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
                <span /><span /><span /><span /><span /><span /><span /><span /><span />
              </div>
              <Container className="text-center">
                <h2 className="display-3 text-white">Daftar Ijazah</h2>
                
                <Card className="bg-secondary shadow border-0">
                  <CardBody className="px-lg-5 py-lg-5">
                    {this.state.firstLoading ? <Spinner/> : 
                    <div>

                      <Row className="text-center justify-content-center">
                        <Col lg="7">
                          <span>Share link Ijazah </span>
                          <span>(<a href= {this.state.url} target="_blank" rel="noreferrer">{this.state.url}</a>)  </span>
                          <span className="btn-inner--icon" onClick={() => {navigator.clipboard.writeText(this.state.url)}}>
                            <i className="fa fa-copy mr-2" />
                          </span>
                        </Col>
                        <Col lg="0.5">
                          <span>OFF</span>
                        </Col>
                        <Col lg="1">
                          <label className="custom-toggle custom-toggle-default">
                            <input type="checkbox" checked={this.state.isLinkOn} onChange={this.setIjazahLink}/>
                            <span className="custom-toggle-slider rounded-circle" />
                          </label>
                        </Col>
                        <Col lg="0.5">
                          <span>ON</span>
                        </Col>
                      </Row>
                      <Table bordered={true} hover={true}>
                        <thead>
                          <tr>
                            <th>Nomor</th>
                            <th>Nama</th>
                            <th>Institusi</th>
                            <th>Daerah</th>
                            <th>Tanggal Kelulusan</th>
                            <th>Gelar</th>
                          </tr>
                        </thead>
                        {this.state.element}
                      </Table>
                    </div>
                    }
                  </CardBody>
                </Card>
                <Modal isOpen={this.state.linkLoading} centered={true}>
                    <br></br>
                    <br></br>
                    <Container className="justify-content-center text-center">
                      <Spinner/>
                      <br></br>
                      <span>Loading ...</span>
                    </Container>
                    <br></br>
                    <br></br>
                </Modal>
                <DetailIjazah
                  isOpen={this.state.modal}
                  toggle={this.toggle}
                  ijazah={this.state.ijazah}
                  id={this.state.currentId}
                >
                </DetailIjazah>
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

export default ListIjazah;
