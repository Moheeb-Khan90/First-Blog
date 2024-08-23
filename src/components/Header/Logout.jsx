import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/Auth";
import authService from "../../Appwrite/Authentication";
import {  useNavigate } from "react-router-dom";

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  //Logout Handler
  const logoutHandler = async () => {
    await authService.logout().then(()=>{
        dispatch(logout())
        navigate("/")
    })
  }
  
  return(
    <>
      <button
      className="capitalize"
      onClick={logoutHandler}
      >logout</button>
    </>
  );
};

export default Logout;
