import axios from "axios";
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

export default function Navbar() {
  let navigate = useNavigate();
  let { user, dispatch } = useContext(AuthContext);

  let logout = async () => {
    let res = await axios.post("http://localhost:4002/api/user/logout", {}, { withCredentials: true });
    if (res.status === 200) {
      dispatch({ type: "LOGOUT" });
      navigate("/sign-in");
    }
  };

  return (
    <div>
      <nav className="flex items-center justify-between px-5 py-6 w-full border-b-2 border-gray-300 fixed top-0 bg-slate-300">
        <h2 className="text-2xl font-medium">Book library</h2>
        <ul className="flex items-center justify-between space-x-10 font-medium">
          <Link to={"/"}>
            <li className=" hover:text-orange-500">Home</li>
          </Link>
          <Link to={"/about"}>
            <li className=" hover:text-orange-500">About</li>
          </Link>
          <Link to={"/contact"}>
            <li className=" hover:text-orange-500">Contact</li>
          </Link>
          <Link to={"/create-form"}>
            <li className=" hover:text-orange-500">Create Form</li>
          </Link>
          {!user && (
            <>
              <Link to={"/sign-up"}>
                <li className=" hover:text-orange-500">Register</li>
              </Link>
              <Link to={"/sign-in"}>
                <li className=" hover:text-orange-500">Login</li>
              </Link>
            </>
          )}

          {!!user && (
            <li className=" hover:text-orange-500">
              <button onClick={logout}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
}
