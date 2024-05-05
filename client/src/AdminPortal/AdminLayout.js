import React from "react";
import AdminHeader from "./AdminHeader";

const AdminLayout = () => (WrappedComponent)=>{
   return(props)=> {
  return(
    <>
    <AdminHeader/>
    <WrappedComponent {...props}/>
    
    </>
  )
    }
};

export default AdminLayout;
