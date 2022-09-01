import React from "react";
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import './App.css';

import InitialPage from './initialPage/InitialPage';
import Usage from "./usage/Usage";
import Signup from "./signup/Signup";
import Login from "./login/Login";
import InitialPageUser from "./initialPageUser/InitialPageUser";
import InitialPageAdmin from "./initialPageAdmin/InitialPageAdmin";
import CommonWall from "./commonWall/CommonWall";
import MyProfile from "./myProfile/MyProfile";
import ParkingSpaceForm from "./parkingSpaceForm/ParkingSpaceForm";
import AboutMe from "./aboutMe/AboutMe";

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
          <Route path="/common/wall" exact element={<CommonWall />}></Route>
          <Route path="/my/profile" exact element={<MyProfile />}></Route>
          <Route path="/parking/space/form" exact element={<ParkingSpaceForm />}></Route>
          <Route path="/about/me" exact element={<AboutMe />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
