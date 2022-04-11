import React from "react";

class Logout extends React.Component {

    constructor(props){
        super(props)
        sessionStorage.clear()
        const { history } = this.props
        if (history) {
            history.push("/")
        }
    }

    render(){
        return (<></>)
    }
}

export default Logout