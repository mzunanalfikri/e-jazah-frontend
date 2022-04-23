import React from "react";

import {
    Modal,
    ModalBody,
    ModalHeader,
    ModalFooter,
    Spinner,
    Button
} from "reactstrap"
import Pages from "../pages"

class DetailIjazah extends React.Component {
    constructor(props){
        super(props)
        console.log(this.props.id)
    }

    render(){
        return (
            <Modal isOpen={this.props.isOpen} toggle={this.props.toggle} size="lg">
                <ModalHeader className="text-center">
                    <h4 className="text-center">Ijazah</h4>
                </ModalHeader>
                <ModalBody>
                    <div className="text-center align-items-center justify-content-center">
                        { this.props.ijazah[this.props.id] ? 
                            <Pages pdf={this.props.ijazah[this.props.id]}/> :
                            <Spinner/>
                        }
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button className="btn-md" color="danger" onClick={this.props.toggle}>Cancel</Button>
                    <a href={`data:application/pdf;base64,${this.props.ijazah[this.props.id]}`} download={`Ijazah-${this.props.id}`} >
                        <Button
                            className="btn-md"
                            color="primary"
                        >
                        <span className="btn-inner--text">
                                 Download Ijazah
                        </span>
                        </Button>
                    </a>
                </ModalFooter>
            </Modal>
        )
    }
}

export default DetailIjazah