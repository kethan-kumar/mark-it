import React from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {

  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch("/ping_server")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1> Group 2 - Tutorial 2 Activity</h1>
        <img src={logo} className="App-logo" alt="logo" />
        <h1>
          {!data ? "Loading ..." : data}
        </h1>
        <h3>
          {data ? "React application running on NodeJS successfully!" : "NodeJS is down!"}
        </h3>
        <h4>Members:</h4>
        <ul>
          <li>Rashmi Chandy</li>
        </ul>
      </header>
    </div>

  );
}

export default App;
