import React from "react";

function ExpenseLists(props) {
  const date = new Date(props.expense.date);
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // Months are zero-based, so we add 1
  const day = date.getDate();
  return (
    <li>
      {day}/{month}/{year} {props.expense.description} {props.expense.category}{" "}
      {props.expense.amount}{" "}
    </li>
  );
}

export default ExpenseLists;
