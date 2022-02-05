import React, { Component } from "react";
import "../styles/css/custom-navbar.css"
import { Link, withRouter } from "react-router-dom";
import "react-router";
import "../styles/css/Index.css"
import styled from "styled-components"

const Container = styled.div.attrs({
  className: "row",
})`
margin-le
max-width: 980px;
justify-content: space-between;
`;

const Div = styled.div.attrs({
  className : "col-md-6 col-12",
  
})`
color: #999;
`;



class Footer extends Component {
  
  render() {
    return (
        <Container>
 <hr className="col-12"/>
        <div className=" col-12 tm-color-gray tm-copyright">
            Developed with &hearts; by Rana 
        </div>
        </Container>
       
        
    );
  }
}

export default Footer;
