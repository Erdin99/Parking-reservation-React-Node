import React from "react";
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import './App.css';

import InitialPage from './initialPage/InitialPage';
import Signup from "./signup/Signup";
import Login from "./login/Login";
import InitialPageUser from "./initialPageUser/InitialPageUser";
import InitialPageAdmin from "./initialPageAdmin/InitialPageAdmin";
import CommonWall from "./commonWall/CommonWall";
import ReservationList from "./userReservationList/ReservationList";
import ParkingSpaceForm from "./parkingSpaceForm/ParkingSpaceForm";
import AboutMe from "./aboutMe/AboutMe";
import ParkingDetails from "./parkingDetails/ParkingDetails";
import AdminReservationList from "./adminReservationList/AdminReservationList";
import EditPost from "./editPost/EditPost";
import SpecificParkingDetails from "./specificParkingDetails/SpecificParkingDetails";


function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<InitialPage />}></Route>
          <Route path="/signup" exact element={<Signup />}></Route>
          <Route path="/login" exact element={<Login />}></Route>
          <Route path="/users/user" exact element={<InitialPageUser />}></Route>
          <Route path="/users/admin" exact element={<InitialPageAdmin />}></Route>
          <Route path="/common/wall" exact element={<CommonWall />}></Route>
          <Route path="/reservation/list" exact element={<ReservationList />}></Route>
          <Route path="/parking/space/form" exact element={<ParkingSpaceForm />}></Route>
          <Route path="/about/me" exact element={<AboutMe />}></Route>
          <Route path="/parking/details" exact element={<ParkingDetails />}></Route>
          <Route path="/reservations" exact element={<AdminReservationList />}></Route>
          <Route path="/edit/post" exact element={<EditPost />}></Route>
          <Route path="/parking/spot/:id" exact element={<SpecificParkingDetails />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
