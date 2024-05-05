import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserLogin = () => {
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(true);
  const [secretKey, setSecretKey] = useState("");
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSecretKey = (e) => {
    setSecretKey(e.target.value);
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = loginData;
    if (email && password) {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_BASE_URL}/api/adminLogin`,
          loginData
        );
        const { data } = response;
        alert(data.message);
        if (data.status) {
          localStorage.setItem("userEmail", email);
          localStorage.setItem("authAdminToken", data.authAdminToken);
          navigate("/adminPortal");
        }
      } catch (error) {
        console.log("Error during login:", error);
        alert("An unexpected error occurred. Please try again later.");
      }
    } else {
      alert("Please fill in all the fields.");
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    const { email, password, name } = registerData;
    if (secretKey === "anish") {
      if (email && name && password) {
        try {
          const response = await axios.post(
            `${process.env.REACT_APP_API_BASE_URL}/api/adminRegister`,
            registerData
          );
          const { data } = response;
          alert(data.message);
        } catch (error) {
          console.error("Error during registration:", error);
          alert("An unexpected error occurred. Please try again later.");
        }
      } else {
        alert("Please fill in all the fields.");
      }
      window.location.reload()
    }
    else{
      alert("Enter Correct Secret Key")
    }
  };

  const toggleForm = () => {
    setShowLogin((prevShowLogin) => !prevShowLogin);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="absolute top-10 text-3xl font-semibold bg-green-400 p-3 rounded-xl shadow-2xl">
        Welcome Admin i am waiting for u only
      </h1>
      <div className="max-w-md w-full space-y-8">
        {showLogin ? (
          <form
            className="mt-8 space-y-6 text-xl  shadow-2xl p-5 bg-white rounded-xl"
            onSubmit={handleLoginSubmit}
          >
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <input
                  type="email"
                  name="email"
                  value={loginData.email}
                  onChange={handleLoginChange}
                  placeholder="Your Email"
                  required
                  className="text   rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                />
              </div>
              <div>
                <input
                  type="password"
                  name="password"
                  value={loginData.password}
                  onChange={handleLoginChange}
                  placeholder="Your Password"
                  required
                  className="  rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign In
              </button>
            </div>
            <p className="text-center text-sm">
              Don't have an account?{" "}
              <button
                onClick={toggleForm}
                className="font-medium text-blue-600 hover:text-blue-500 focus:outline-none"
              >
                Register
              </button>
            </p>
          </form>
        ) : (
          <form
            className="mt-8 space-y-6 text-xl  shadow-2xl p-5 bg-white rounded-xl"
            onSubmit={handleRegisterSubmit}
          >
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <input
                  type="text"
                  name="name"
                  value={registerData.name}
                  onChange={handleRegisterChange}
                  placeholder="Your Name"
                  required
                  className="  rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                />
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  value={registerData.email}
                  onChange={handleRegisterChange}
                  placeholder="Your Email"
                  required
                  className="  rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                />
              </div>
              <div>
                <input
                  type="password"
                  name="password"
                  value={registerData.password}
                  onChange={handleRegisterChange}
                  placeholder="Your Password"
                  required
                  className="  rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                />
              </div>

              <div className="">
                <input
                  type="text"
                  value={secretKey}
                  onChange={handleSecretKey}
                  placeholder="Enter Secret Key"
                  required
                  className="rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Register
              </button>
            </div>
            <p className="text-center text-sm">
              Already have an account?{" "}
              <button
                onClick={toggleForm}
                className="font-medium text-blue-600 hover:text-blue-500 focus:outline-none"
              >
                Sign In
              </button>
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

export default UserLogin;
