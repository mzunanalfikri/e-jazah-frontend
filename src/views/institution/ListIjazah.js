
import React from "react";

// reactstrap components
import {
  Container,
  Card,
  CardBody,
  Spinner,
  Table
} from "reactstrap";

// core components
import Navbar from "components/Navbars/InstitutionNavbar";
import CardsFooter from "components/Footers/CardsFooter.js";
import axios from "axios";
import { url } from "const"
// index page sections
// import Download from "../IndexSections/Download.js";

class ListIjazah extends React.Component {
  state = {
    loading : true,
    element : null
  }
  constructor(props){
    super(props)
    this.detailIjazah = this.detailIjazah.bind(this)
    axios.defaults.headers.common['Authorization'] = "Bearer " + sessionStorage.getItem('token')
    axios.get(url + "/ijazah/institution/all").then(res => {
      console.log(res.data)
      this.setState({
        loading : false,
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

  }

  constructElement(data){
    console.log(data)
    if (data.length === 0){
      return (
        <p>Tidak ada ijazah</p>
      )
    }
    let role = sessionStorage.getItem('role')
    if (role === 'PT'){
      return (
        <Table bordered={true} hover={true}>
          <thead>
            <tr>
              <th>Nomor</th>
              <th>Nama</th>
              <th>Program Studi</th>
              <th>Tanggal Kelulusan</th>
              <th>Gelar</th>
              <th>IPK</th>
            </tr>
          </thead>
          <tbody>
            {data.map(el => (
              <tr onClick={() => this.detailIjazah(el.ID)} key={el.ID}>
                <td>{el.ID}</td>
                <td>{el.StudentName}</td>
                <td>{el.Prodi}</td>
                <td>{el.GraduationDate}</td>
                <td>{this.getGelar(el)}</td>
                <td>{el.IPK}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )
    } else {
      return (
        <Table bordered={true} hover={true}>
          <thead>
            <tr>
              <th>Nomor</th>
              <th>Nama</th>
              <th>Nomor Induk</th>
              <th>Tanggal Kelulusan</th>
              <th>Gelar</th>
            </tr>
          </thead>
          <tbody>
            {data.map(el => (
              <tr onClick={() => this.detailIjazah(el.ID)} key={el.ID}>
                <td>{el.ID}</td>
                <td>{el.StudentName}</td>
                <td>{el.StudentNumber}</td>
                <td>{el.GraduationDate}</td>
                <td>{this.getGelar(el)}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )
    }
  }

  getGelar(data){
    if (data.Level === "PT"){
      return data.Gelar
    } else {
      return "Tamat " + data.Level
    }
  }

  detailIjazah(id){
    // console.log(event.parentNode)
    // make detail ijazah
    console.log(id)
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
                <h1 className="display-3 text-white">Daftar Ijazah</h1>
                <Card className="bg-secondary shadow border-0">
                  <CardBody className="px-lg-5 py-lg-5">
                    {this.state.loading ? <Spinner/> : 
                      this.state.element
                    }
                  </CardBody>
                </Card>
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
