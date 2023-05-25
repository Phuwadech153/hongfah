import React, { useState } from "react";
import { useNavigate, redirect } from "react-router-dom";
import logo_login from "../image/logo_login.png";
import axios from "axios";
import Swal from "sweetalert2";
import { connect } from "react-redux";

function Login(props) {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
      const user = await axios.post("auth/login", {
        accountName: username,
        password: password,
      });
      // console.log(user.data)
      props.dispatch({
      type: "ADD_DATA",
      user:user.data
      });

      console.log(user.data);
      navigate("/home");
      // console.log(user)
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
        // footer: '<a href="">Why do I have this issue?</a>'
      });
    } finally {
    }
  };

  return (
    <div className="flex grid grid-cols-2">
      <div>
        <img
          className="mt-[10%] ml-[25%]"
          src={logo_login}
          width="80%"
          height="80%"
        />
      </div>
      <div className="pt-36 pl-[10%]">
        <div>
          <h1 className="text-5xl pb-5 ml-5 text-gray-500 font-bold">Login</h1>
          <div className="border-2 rounded-lg border-black-500 p-[20px] w-4/6 h-[350px]">
            <div className="pt-[10px]">
              <p className="text-2xl text-gray-500 p-[5px] mb-[10px]">
                Username
              </p>
              <input
                className="border-2 rounded-lg border-black-500 p-[10px] mb-[10px] w-full"
                type="text"
                placeholder="กรอกUsername"
                onChange={(e) => setUsername(e.target.value)}
              />
              <p className="text-2xl text-gray-500 p-[5px] mb-[10px]">
                Password
              </p>
              <input
                className="border-2 rounded-lg border-black-500 p-[10px] mb-[30px] w-full"
                type="password"
                placeholder="กรอกPassword"
                onChange={(e) => setPassword(e.target.value)}
              />
              <br />

              <button
                type="submit"
                className="btn p-[10px] bg-[#FF5592] rounded-2xl w-full text-[#fff] font-bold"
                onClick={() => login()}
              >
                Log in
              </button>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default connect()(Login);
