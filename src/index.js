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
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "assets/vendor/nucleo/css/nucleo.css";
import "assets/vendor/font-awesome/css/font-awesome.min.css";
import "assets/scss/argon-design-system-react.scss?v1.1.0";

import Reference from "views/reference";
import Landing from "views/public/Landing";
import Login from "views/public/Login";
import Profile from "views/examples/Profile.js";
import Register from "views/examples/Register.js";
import LandingExample from "views/examples/Landing"
import Logout from "views/public/Logout"
import CreateInstitutionAccount from "views/admin/CreateInstitutionAccount"
import CreateStudentAccount from "views/institution/CreateStudentAccount";
import CreateIjazah from "views/institution/CreateIjazah";
import Prof from "views/user/Profile"
import NotFound from "views/public/404"
import ListIjazahAdmin from "views/admin/ListIjazah"
import ListIjazahInstitution from "views/institution/ListIjazah"
import ListIjazaHStudent from "views/student/ListIjazah"
import PublicIjazah from "views/public/Ijazah"

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route
        path="/reference"
        exact
        render={props => <Reference {...props} />}
      />
      <Route
        path="/landing-page"
        exact
        render={props => <LandingExample {...props} />}
      />
      <Route path="/login-page" exact render={props => <Login {...props} />} />
      <Route
        path="/profile-page"
        exact
        render={props => <Profile {...props} />}
      />
      <Route
        path="/register-page"
        exact
        render={props => <Register {...props} />}
      />
      {/* Public path */}
      <Route path="/" exact render={props => <Landing {...props} />} />
      <Route
        path="/login"
        exact
        render={props => <Login {...props} />}
      />
      <Route
        path="/ijazah/:nik"
        exact
        render={props => <PublicIjazah {...props} />}
      />
      <Route
        path="/404"
        exact
        render={props => <NotFound {...props} />}
      />
      {/* Admin path */}
      <Route
        path="/create-institution-account"
        exact
        render={props => <CreateInstitutionAccount {...props} />}
      />
      <Route
        path="/list-ijazah-admin"
        exact
        render={props => <ListIjazahAdmin {...props} />}
      />
      {/* Institution path */}
      <Route
        path="/create-student-account"
        exact
        render={props => <CreateStudentAccount {...props} />}
      />
      <Route
        path="/create-ijazah"
        exact
        render={props => <CreateIjazah {...props} />}
      />
      <Route
        path="/list-ijazah-institution"
        exact
        render={props => <ListIjazahInstitution {...props} />}
      />
      {/* Student path */}
      <Route
        path="/my-ijazah"
        exact
        render={props => <ListIjazaHStudent {...props} />}
      />
      {/* General User Path */}
      <Route
        path="/profile"
        exact
        render={props => <Prof {...props} />}
      />
      <Route
        path="/logout"
        exact
        render={props => <Logout {...props} />}
      />
      <Redirect to="/" />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
