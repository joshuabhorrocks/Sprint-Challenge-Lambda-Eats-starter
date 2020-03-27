import React from 'react';
import './App.css';
import { Route } from "react-router-dom";
import Home from "./comps/Home";
import Form from "./comps/Form";

const App = () => {
  return (
    <>
  <div className="App">
    <Route exact path="/" component={Home}/>
  </div>
    <div className="pizzaOrder">
    <Route exact path="/pizza" component={Form}/>
  </div>
  </>
);
}
export default App;

