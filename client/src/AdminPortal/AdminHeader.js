import React from "react";
import { useNavigate, Link } from "react-router-dom";

const AdminHeader = ({ onDownloadApprovedImages }) => {
  const navigate = useNavigate();

  const handleAdminLogout = () => {
    localStorage.removeItem("authAdminToken");
    navigate("/adminauth");
  };

  return (
    <header className="bg-white shadow-md w-full">
      <div className="container mx-auto px-4 py-3 grid grid-cols-1 md:grid-cols-4 gap-4 sticky top-0">
        <div className="col-span-1 md:col-span-2">
          <Link className="text-2xl font-semibold" to={"/adminPortal"}>
            Admin Portal
          </Link>
        </div>
        <div className="col-span-1 md:col-span-2 flex justify-end items-center">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300 ease-in-out ml-4"
            onClick={onDownloadApprovedImages} // Call the function when clicked
          >
            Download Approved Images
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300 ease-in-out ml-4"
            onClick={handleAdminLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
