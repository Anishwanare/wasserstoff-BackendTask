import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminHeader from "./AdminHeader";

const AdminPortal = () => {
  const [pendingImages, setPendingImages] = useState([]);
  const [downloadImages, setDownloadImages] = useState([]);

  //for first render this will show out pending images
  useEffect(() => {
    fetchPendingImages();
  }, []);

  //first we will fetch all pending imaages into our admin portal
  const fetchPendingImages = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/api/pendingimages`
      );
      setPendingImages(response.data);
      console.log(response.data);
    } catch (error) {
      console.log("error to fetch pending images: ", error);
    }
  };

  //trigger when admin click on approve button and will change status to approve
  const handleApprove = async (imageId) => {
    try {
      await axios.put(
        `${process.env.REACT_APP_API_BASE_URL}/api/approveimage/${imageId}`
      );
      fetchPendingImages();
    } catch (error) {
      console.log("Error approving image: ", error);
    }
  };

  //trigger when admin click on reject button and will change status to reject
  const handleReject = async (imageId) => {
    try {
      await axios.put(
        `${process.env.REACT_APP_API_BASE_URL}/api/rejectimage/${imageId}`
      );
      fetchPendingImages();
    } catch (error) {
      console.log("Error rejecting image: ", error);
    }
  };

  //used for download approved imaged
  const fetchApprovedDownloadImage = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/api/downloadimagecsv`,
        { responseType: "blob" } // imp for download
      );

      //syntax for download into any document as per requirenment
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "approved_images.csv");
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (error) {
      console.log("Error downloading approved images: ", error);
    }
  };

  const handleDownloadApprovedImages = async () => {
    try {
      await fetchApprovedDownloadImage(); //this will Fetch all  approved images

      // this is used to download
      const downloadUrl = window.URL.createObjectURL(
        new Blob([downloadImages])
      );
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.setAttribute("download", "approved_images.docx");
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (error) {
      console.log("Error downloading approved images: ", error);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100">
      <AdminHeader onDownloadApprovedImages={handleDownloadApprovedImages} />
      <div className="w-full max-w-screen-lg mt-8">
        <h2 className="text-2xl font-bold mb-4">
          {pendingImages.length} Pending Images
        </h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {pendingImages.map((data) => (
            <li
              key={data._id}
              className="bg-white shadow-md rounded-lg p-4 flex flex-col justify-between"
            >
              <img
                className="w-full h-auto mb-4"
                src={require(`../Images/${data.image}`)} //storage path of images
                alt="pending"
              />
              <div>
                <h3 className="text-lg font-semibold mb-2">Annotations:</h3>
                <ul>
                  {data.annotations &&
                    data.annotations.map((annotation, index) => {
                      const parsedAnnotation = JSON.parse(annotation);
                      return (
                        <li key={index}>Object: {parsedAnnotation.class}</li>
                      );
                    })}
                </ul>
              </div>
              <div className="flex justify-between items-center">
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded-md text-sm mr-2"
                  onClick={() => handleApprove(data._id)}
                >
                  Approve
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-md text-sm"
                  onClick={() => handleReject(data._id)}
                >
                  Reject
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminPortal;
