import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom"; // Import BrowserRouter, Route, and Routes

import AdminLogin from "./pages/AdminLogin";
import UserLogin from "./pages/UserLogin";
import ImageProcessing from "./Components/ImageProcessing";
import Private from "./pages/Private";
import Welcome from "./pages/Welcome";
import AdminPrivate from "./pages/AdminPrivate";
import AdminPortal from "./AdminPortal/AdminPortal";
// import ApprovedImages from "./AdminPortal/ApprovedImages";
// import RejectedImages from "./AdminPortal/RejectedImages";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Use the `element` prop to specify the component to render */}
        <Route path="/" element={<Welcome />} />
        <Route path="/userauth" element={<UserLogin />} />
        <Route path="/adminauth" element={<AdminLogin />} />
        <Route element={<Private />}>
          <Route path="/uploadimage" element={<ImageProcessing />} />
        </Route>
        <Route element={<AdminPrivate />}>
          <Route path="/adminportal" element={<AdminPortal />} />
          {/* <Route path="/approvedimages" element={<ApprovedImages />} />
          <Route path="/rejectedimages" element={<RejectedImages />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
