import React from "react";
import { Link } from "react-router-dom";

const Welcome = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-8">Welcome</h1>
      <button type="button" className="flex gap-4">
        <Link
          to="/userauth"
          className="bg-blue-500 hover:bg-blue-600 text-black font-bold py-2 px-4 rounded"
        >
          Login
        </Link>
        <Link
          to="/userauth"
          className="bg-green-500 hover:bg-green-600 text-black font-bold py-2 px-4 rounded"
        >
          Register
        </Link>
      </button>
    </div>
  );
};

export default Welcome;
