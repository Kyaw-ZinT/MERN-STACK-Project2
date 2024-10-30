import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <div className="">
      <Navbar />
      <div className="mt-28 p-5">
        <Outlet />
      </div>
    </div>
  );
}

