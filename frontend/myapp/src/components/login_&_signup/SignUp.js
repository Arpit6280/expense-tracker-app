import React, { useState } from "react";
import expense from "./expense.jpg";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import request from "../Requests";

function SignUp() {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [name, setName] = useState("");

  const nameInputHandler = (e) => {
    setName(e.target.value);
  };
  const emailInputHandler = (e) => {
    setEmail(e.target.value);
  };
  const pswdInputHandler = (e) => {
    setPwd(e.target.value);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    if (name === "" || pwd === "" || !email.includes("@")) {
      toast.error("All field are required");
      return;
    }
    const obj = {
      name: name,
      email: email,
      password: pwd,
    };
    console.log(name, email, pwd);
    console.log(obj);
    axios
      .post(`${request}signup`, obj)
      .then((res) => {
        console.log(res);
        toast.success("Sign Up Successful! Now Login");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data);
      });
    setEmail("");
    setName("");
    setPwd("");
  };
  return (
    <div class="flex items-center justify-center min-h-screen bg-gray-100">
      <div class="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0">
        <div class="flex flex-col justify-center p-8 md:p-14">
          <span class="mb-3 text-4xl font-bold"> Welcome To Expense App </span>
          <span class="font-light text-gray-400 mb-8">
            Please enter your details
          </span>
          <form action="" onSubmit={submitHandler}>
            <div class="py-4">
              <span class="mb-2 text-md">Name</span>
              <input
                type="text"
                class="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                name="name"
                id="name"
                onChange={nameInputHandler}
                value={name}
              />
            </div>
            <div class="py-4">
              <span class="mb-2 text-md">Email</span>
              <input
                type="email"
                class="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                name="email"
                id="email"
                onChange={emailInputHandler}
                value={email}
              />
            </div>
            <div class="py-4">
              <span class="mb-2 text-md">Password</span>
              <input
                type="password"
                name="pass"
                id="pass"
                class="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                onChange={pswdInputHandler}
                value={pwd}
              />
            </div>
            <div class="flex justify-between w-full py-4">
              <div class="mr-24">
                <input type="checkbox" name="ch" id="ch" class="mr-2" />
                <span class="text-md">Remember for 30 days</span>
              </div>
              <span class="font-bold text-md">Forgot password</span>
            </div>
            <button class="w-full bg-black text-white p-2 rounded-lg mb-6 hover:bg-white hover:text-black hover:border hover:border-gray-300">
              Sign in
            </button>
            <div class="text-center text-gray-400">
              Have an account?
              <Link class="font-bold text-black" to="/login">
                Login
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

export default SignUp;
