import React from "react";
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import './App.css';

import InitialPage from './initialPage/InitialPage';
import Usage from "./usage/Usage";
import Signup from "./signup/Signup";
import Login from "./login/Login";
import InitialPageUser from "./initialPageUser/InitialPageUser";
import InitialPageAdmin from "./initialPageAdmin/InitialPageAdmin";

function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<InitialPage />}></Route>
          <Route path="/usage" exact element={<Usage />}></Route>
          <Route path="/signup" exact element={<Signup />}></Route>
          <Route path="/login" exact element={<Login />}></Route>
          <Route path="/users/user" exact element={<InitialPageUser />}></Route>
          <Route path="/users/admin" exact element={<InitialPageAdmin />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
