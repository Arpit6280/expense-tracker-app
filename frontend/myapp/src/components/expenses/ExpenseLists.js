import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import request from "../Requests";
function ExpenseLists(props) {
  const date = new Date(props.expense.date);
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // Months are zero-based, so we add 1
  const day = date.getDate();
  const deleteExpense = async () => {
    const token = localStorage.getItem("token");
    await axios.delete(`${request}/expense/delete/${props.expense.id}`, {
      headers: { Authorization: token },
    });
    toast.success("Expense Delted Succesfully");
  };
  return (
    <>
      <tr className="">
        <td>
          {day}-{month}-{year}{" "}
        </td>
        <td> {props.expense.description}</td>
        <td>{props.expense.category}</td>
        <td> {props.expense.amount}</td>
        <td>
          <button onClick={deleteExpense}>Delete</button>{" "}
        </td>
      </tr>
    </>
  );
}

export default ExpenseLists;
