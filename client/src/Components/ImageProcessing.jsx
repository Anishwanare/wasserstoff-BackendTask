import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-backend-webgl"; // necessay for WebGL backend
import "@tensorflow/tfjs-backend-cpu"; // necessary for CPU backend
import * as cocossd from "@tensorflow-models/coco-ssd";

const ImageProcessing = () => {
  const [image, setImage] = useState(null);
  const [annotations, setAnnotations] = useState([]);
  const [loading, setLoading] = useState(false);
  const imageRef = useRef();
  const modelRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    // Load the COCO-SSD model
    loadModel();
  }, []);

  //from tensorflow.js 
  const loadModel = async () => {
    try {
      const model = await cocossd.load();
      modelRef.current = model;
    } catch (error) {
      console.error("Error loading the model:", error);
    }
  };

  //this remove authtoken and navigate to userauth
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/userauth");
  };


  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    setImage(file);
    setAnnotations([]); 
  };

  //arrow function when click on generate image
  const generateAnnotations = async () => {
    setLoading(true);
    if (!imageRef.current || !modelRef.current) return; //imageRef helps to detect image

    const predictions = await modelRef.current.detect(imageRef.current); //this will predict an image

    setAnnotations(predictions);
    setLoading(false);
  };

  const handleOnSubmit = async () => {
    try {
      if (!image) {
        console.log("Image Not Selected");
        alert("Image not selected");
        return;
      }

      //formData is usefull for append one or more fils
      const formData = new FormData();
      formData.append("image", image);
      formData.append("annotation", JSON.stringify(annotations));

      const result = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/api/uploadimage`,
        formData,
        {
          headers: { "Content-type": "multipart/form-data" },
        }
      );

      const dataRes = await result.data;
      alert(dataRes.message);
      console.log(result);
    } catch (error) {
      console.log("Server error in imageprocessing.js", error);
    }

    //after every upload it will refrsh page
    window.location.reload();
  };

  return (
    <div className="w-full h-lvh">
      <div className="">
        <div className="mt-0 md:my-32 flex items-center justify-center">
          <div className="">
            <input
              type="file"
              accept="image/*"
              capture="camera"
              onChange={handleImageChange}
              className="text-3xl"
            />
          </div>

          <button
            type="button"
            className="bg-red-600 text-white text-3xl p-3 rounded-lg"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
        {image && (
          <div className="flex justify-center flex-col items-center mt-20">
            <img
              className="bg-gray shadow-2xl p-5 rounded-lg"
              src={URL.createObjectURL(image)}
              alt="Uploaded"
              crossOrigin="anonymous"
              ref={imageRef}
              style={{ width: "20rem" }}
            />
            <div className="my-10 bg-green-700 p-2 rounded-lg text-white grid gap-5">
              <button
                onClick={generateAnnotations}
                type="button"
                className="text-black"
                style={{
                  backgroundColor: "red",
                  padding: "1rem",
                  marginTop: "1rem",
                }}
              >
                Generate Name
              </button>
              <button
                onClick={handleOnSubmit}
                type="button"
                className="text-black"
                style={{
                  backgroundColor: "red",
                  padding: "1rem",
                  marginTop: "1rem",
                }}
              >
                Upload
              </button>
            </div>
          </div>
        )}
      </div>
      <div>
        {loading && <div>Loading...</div>}
        {annotations.length > 0 && (
          <div className="text-center text-3xl">
            <h3>Annotations:</h3>
            <ul>
              {annotations.map((annotation, index) => (
                <li key={index}>
                  {annotation.class} - {Math.round(annotation.score * 100)}%
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageProcessing;
