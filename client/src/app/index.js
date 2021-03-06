import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Footer, NavBar } from "../components";
import {
  PostsList,
  PostsInsert,
  PostsUpdate,
  Login,
  Register,
  Profile,
  Index,
  About,
  ContactUs,
  OthersProfile,
  PostDetail
} from "../pages";

import "bootstrap/dist/css/bootstrap.min.css";

class App extends Component {
  render() {
    return (
      <Router>
        <NavBar />

        <Switch>
          <Route path="/" exact component={Index} />
          <Route path="/posts/list" exact component={PostsList} />
          <Route path="/posts/create" exact component={PostsInsert} />
          <Route path="/posts/update/:id" exact component={PostsUpdate} />
          <Route path="/post/:id" exact component={PostDetail}/> 
          <Route path="/login" exact component={Login} />
          <Route exact path="/register" component={Register} />
          <Route path="/profile" component={Profile} />
          <Route path="/about" exact component={About} />
          <Route path="/contactUs" component={ContactUs} />
          <Route path="/user/:name" component={OthersProfile} />
        </Switch>

        <Footer/>
      </Router>
    );
  }
}
export default App;
