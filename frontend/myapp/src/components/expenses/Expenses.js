import React, { useEffect, useState } from "react";
import ExpenseLists from "./ExpenseLists";
import axios from "axios";

function Expenses(props) {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:4000/expense/getexpenses")
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
    <ul>
      {data.map((expense) => (
        <ExpenseLists expense={expense} />
      ))}
    </ul>
  );
}

export default Expenses;
