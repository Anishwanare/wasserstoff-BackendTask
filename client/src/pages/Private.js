import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const Private = () => {

    const userToken = localStorage.getItem("authToken")
  return (
    <>
      <div className="">
        {userToken ? <Outlet /> : <Navigate to={"/userauth"} />}
      </div>
    </>
  );
};

export default Private;
