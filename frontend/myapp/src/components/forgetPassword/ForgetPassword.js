import React, { useState } from "react";
import axios from "axios";

function ForgetPassword() {
  const [email, setEmail] = useState("");

  const emailHandler = (e) => {
    setEmail(e.target.value);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    const obj = {
      email: email,
    };
    console.log(obj);
    axios
      .post("http://localhost:4000/password/forgotpassword", obj)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    // setEmail("");
  };
  return (
    <div>
      <form onSubmit={submitHandler}>
        <input
          type="email"
          name=""
          id=""
          value={email}
          placeholder="enter your email"
          onChange={emailHandler}
        />
        <button>Submit</button>
      </form>
    </div>
  );
}

export default ForgetPassword;
