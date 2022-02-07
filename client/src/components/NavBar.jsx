import React, { Component } from "react";
import styled from "styled-components";
import "../styles/css/custom-navbar.css"
import { Link, withRouter } from "react-router-dom";
import "react-router";
import AuthService from "../services/auth.service";

const Container = styled.div.attrs({
  className: "no-gutters ",
})``;

const Nav = styled.nav.attrs({
  className: "navbar navbar-expand-lg navbar-dark bg-dark p-3",
})`
  margin-bottom: 20 px;
`;

const Collapse = styled.div.attrs({
  className: "collapse navbar-collapse",
})``;

const List = styled.div.attrs({
  className: "navbar-nav mr-auto",
})``;

const Item = styled.div.attrs({
  className: "collapse navbar-collapse ml-3",
})``;


class NavBar extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);
    this.state = {
      currentUser: "",
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user.data.username,
      });
    }
  }

  logOut() {
    AuthService.logout();
    window.location.href = "/";
  }
  render() {
    return (
      <Container>
        <Nav>
        <Link to="/" className="navbar-brand">
          Knoll Troll
        </Link>

        <Collapse>
          <List>

            {this.state.currentUser && (
              <Item>
                <Link to="/posts/create" className="nav-link">
                  New Post
                </Link>
              </Item>
            )}
            <Item>
              <Link to="/about" className="nav-link">
                About
              </Link>
            </Item>
            <Item>
              <Link to="/contactUS" className="nav-link">
                Contact Us
              </Link>
            </Item>
          </List>
        </Collapse>

        <List>
          {!this.state.currentUser  && (
            <>
              <Link to="/Login" className="nav-link">
                <button
                  style={{ backgroundColor: '#00CCCC'}}
                  className="btn btn-sm"
                >
                  Log In
                </button>
              </Link>

              <Link to="/register" className="nav-link">
                <button
                  style={{ outline: "none" }}
                  className="btn btn-warning btn-sm"
                >
                  Sign Up
                </button>
              </Link>
            </>
          )}
          {/* {!this.state.currentUser && this.props.location.pathname === "/" && (
            <>
              <h6 className="text-secondary m-1">Hi! Welcome</h6>
            </>
          )} */}

          {this.state.currentUser && (
            <div>
              <p className="d-inline ">
                Logged in as:{" "}
                <a className="text-light text-decoration-none" href="/profile">
                  {this.state.currentUser}
                </a>
                &nbsp;
              </p>

              <button className="btn btn-sm " onClick={this.logOut} style={{ backgroundColor: '#00CCCC',
      }}>
                Log Out
              </button>
            </div>
          )}
        </List>
        </Nav>       
      </Container>
    );
  }
}

export default withRouter(NavBar);
