import "./App.css";
import { React, useState } from "react";
import Login from "./components/user-profile/Login";
import Register from "./components/user-profile/Register";
import Profile from "./components/user-profile/Profile";
import ResetPassword from "./components/user-profile/ResetPassword";
import Home from "./components/pages/Home";
import { Switch, Route, Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import JobApplicationStepper from "./components/jobApplication/JobApplicationStepper";
import ApplicationTabs from "./components/myApplication/tab"
import NavigationBar from './navbar';
import Course from './components/courses/Course';
import CourseDetail from './components/courses/CourseDetail';
import OnBoadingProcess from "./components/onboarding/OnBoardingProcess";
import HiringManagment from './components/hiring-management/HiringManagment';

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

function App() {
  const classes = useStyles();
  const [loggedIn, setloggedIn] = useState(false);
  if (sessionStorage.getItem('markit-email') === null) {
    sessionStorage.setItem('markit-email', "");
  }
  if (sessionStorage.getItem('markit-email')) {
    setloggedIn(true);
  }
  console.log(sessionStorage.getItem('markit-email'));

  // useEffect(() => {
  //   effect
  //   return () => {
  //     cleanup
  //   }
  // }, [loggedIn])

  return (
    <div className="App">
      <header>
        <NavigationBar></NavigationBar>
      </header>

      {/* <AppBar className="nav-bar" position="static" color="blue">
        
      </AppBar> */}
      <Switch>

        <Route path="/login">
          <Login></Login>
        </Route>
        <Route exact path="/">
          <Home />
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
        <Route exact path="/myApplication" exact component={ApplicationTabs} />
        <Route exact path="/myApplication" exact >
          <ApplicationTabs />
        </Route>

        <Route path="/jobApplication/:courseName/:jobPosition" exact component={JobApplicationStepper} />
        <Route
          exact path={"/courses"}
          component={() => <Course />}
        />
        <Route
          exact path={"/courses"}
          component={() => <Course />}
        />
        <Route
          exact path={"/courses/:id"}
          component={() => <CourseDetail />}
        />
        <Route exact path="/onboarding" exact >
          <OnBoadingProcess />
        </Route>
        <Route path="/hiring-management">
          <HiringManagment></HiringManagment>
        </Route>
        <Route>
          <h1>Invalid URL</h1>
        </Route>
      </Switch>
    </div>
  );
}

export default App;