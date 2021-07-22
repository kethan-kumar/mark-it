import "./App.css";
import React from "react";
import Login from "./components/user-profile/Login";
import Register from "./components/user-profile/Register";
import Profile from "./components/user-profile/Profile";
import ResetPassword from "./components/user-profile/ResetPassword";
import Home from "./components/user-profile/Home";
import { Switch, Route } from "react-router-dom";
import { AppBar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  backgroundImage: `url({home})`,
}));

function App() {
  const classes = useStyles();
  return (
    <div className="App">
      {/* <AppBar className="nav-bar" position="static" color="blue">
        
      </AppBar> */}
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/login">
          <Login></Login>
        </Route>
        <Route path="/register">
          <Register></Register>
        </Route>
        <Route path="/profile">
          <Profile></Profile>
        </Route>
        <Route path="/reset">
          <ResetPassword></ResetPassword>
        </Route>
        <Route>
          <h1>Invalid URL</h1>
        </Route>
      </Switch>
    </div>
  );
}

export default App;