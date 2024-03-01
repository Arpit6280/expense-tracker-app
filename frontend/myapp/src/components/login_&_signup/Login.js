import React, { useState } from "react";
import expense from "./expense.jpg";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function Login() {
  const [email, setEmail] = useState("");
  const [pswd, setPswd] = useState("");
  const navigate = useNavigate();

  const emailInputHandler = (e) => {
    setEmail(e.target.value);
  };
  const pswdInputHandler = (e) => {
    setPswd(e.target.value);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    if (pswd === "" || !email.includes("@")) {
      toast.error("All field are required");
      return;
    }
    const obj = {
      email: email,
      password: pswd,
    };
    console.log(email, pswd);
    console.log(obj);
    axios
      .post("http://localhost:4000/login", obj)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        toast.success(res.data.message);
        console.log(res.data);
        navigate("/");
      })
      .catch((err) => {
        toast.error(err.response.data);
      });
    setEmail("");
    setPswd("");
  };
  return (
    <div class="flex items-center justify-center min-h-screen bg-gray-100">
      <div class="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0">
        <div class="flex flex-col justify-center p-8 md:p-14">
          <span class="mb-3 text-4xl font-bold">Welcome back</span>
          <span class="font-light text-gray-400 mb-8">
            Welcome back! Please enter your details
          </span>
          <form action="" onSubmit={submitHandler}>
            <div class="py-4">
              <span class="mb-2 text-md">Email</span>
              <input
                type="email"
                class="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                name="email"
                id="email"
                value={email}
                onChange={emailInputHandler}
              />
            </div>
            <div class="py-4">
              <span class="mb-2 text-md">Password</span>
              <input
                type="password"
                name="pass"
                id="pass"
                class="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                value={pswd}
                onChange={pswdInputHandler}
              />
            </div>
            <div class="flex justify-between w-full py-4">
              <div class="mr-24">
                <input type="checkbox" name="ch" id="ch" class="mr-2" />
                <span class="text-md">Remember for 30 days</span>
              </div>
              <Link class="font-bold text-md" to="/forgetpassword">
                Forgot password
              </Link>
            </div>
            <button class="w-full bg-black text-white p-2 rounded-lg mb-6 hover:bg-white hover:text-black hover:border hover:border-gray-300">
              Login
            </button>
            <div class="text-center text-gray-400">
              Dont'have an account?
              <Link class="font-bold text-black" to="/signup">
                Sign up
              </Link>
            </div>
          </form>
        </div>

        <div class="relative">
          <img
            src={expense}
            alt="img"
            class="w-[400px] h-full hidden rounded-r-2xl md:block object-contain"
          />
        </div>
      </div>
    </div>
  );
}

export default Login;
