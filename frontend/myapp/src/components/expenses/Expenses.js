import React, { useEffect, useState } from "react";
import ExpenseLists from "./ExpenseLists";
import axios from "axios";

function Expenses(props) {
  const [data, setData] = useState([]);
  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:4000/expense/getexpenses", {
        headers: { Authorization: token },
      })
      .then((res) => {
        console.log(res);
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  console.log(props);
  return (
    <>
      {/* <div className="w-3/5 my-12 ">
        <div className="flex justify-between"></div>
        <div className="flex flex-col">
          <div className="flex justify-between">
            <div>Date</div>
            <div>Description</div>
            <div>Category</div>
            <div>Amount</div>
            <div>Delete</div>
          </div>
         
        </div>
      </div> */}
      <table class="table-auto w-3/5 my-12">
        <thead>
          <tr>
            <td>Date</td>
            <td>Description</td>
            <td>Category</td>
            <td>Amount</td>
            <td>Date</td>
          </tr>
        </thead>
        <tbody>
          {data.map((expense) => (
            <ExpenseLists expense={expense} />
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Expenses;
