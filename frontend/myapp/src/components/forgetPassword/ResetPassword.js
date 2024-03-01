import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ResetPassword() {
  const [newpassword, setNewPassword] = useState("");
  const params = useParams();
  //   console.log(params);
  console.log(params.id);
  let id = params.id;
  useEffect(() => {
    axios
      .get(`http://localhost:4000/password/resetpassword/${id}`)
      .then((res) => {
        console.log(res);
      });
  });
  const passwordHandler = (e) => {
    setNewPassword(e.target.value);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    let resetpasswordid = id;
    const obj = {
      newpassword: newpassword,
    };
    console.log(id);
    axios
      .post(
        `http://localhost:4000/password/updatepassword/${resetpasswordid}`,
        obj
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <form onSubmit={submitHandler}>
        <input
          type="password"
          name=""
          id=""
          value={newpassword}
          onChange={passwordHandler}
        />
        <button>Submit</button>
      </form>
    </div>
  );
}

export default ResetPassword;
