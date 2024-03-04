import React, { useEffect, useState } from "react";
import ExpenseLists from "./ExpenseLists";
import axios from "axios";
import PremiumButton from "../addExpense/PremiumButton";
import request from "../Requests";

function Expenses(props) {
  const [data, setData] = useState([]);
  const [expensePerPage, setexpensePerPage] = useState(
    localStorage.getItem("expensePerPage") || 2
  );
  const [showData, setShowData] = useState({
    currentPage: 1,
    hasNextPage: "",
    hasPreviousPage: "",
    lastPage: "",
    nextPage: "",
    previousPage: "",
  });
  const token = localStorage.getItem("token");
  useEffect(() => {
    axios
      .get(
        `${request}/expense/getexpenses?pages=1&expensePerPage=${expensePerPage}`,
        {
          headers: { Authorization: token },
        }
      )
      .then((res) => {
        console.log(res);
        setData(res.data.expenses);
        setShowData(res.data.pageData);
        console.log(res.data.pageData);
        console.log(showData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [expensePerPage]);
  console.log(showData);
  const download = () => {
    axios
      .get(`${request}/premium/download`, {
        headers: { Authorization: token },
      })
      .then((response) => {
        if (response.status === 201) {
          //the bcakend is essentially sending a download link
          //  which if we open in browser, the file would download
          // var a = document.createElement("a");
          // a.href = response.data.fileURl;
          // a.download = "myexpense.csv";
          // a.click();
        } else {
          throw new Error(response.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const paginationHandler = (e) => {
    let page = e.target.innerText;
    axios
      .get(
        `${request}/expense/getexpenses?pages=${page}&expensePerPage=${expensePerPage}`,
        {
          headers: { Authorization: token },
        }
      )
      .then((res) => {
        // setData(res.data);
        setData(res.data.expenses);
        setShowData(res.data.pageData);
        console.log(res.data.pageData);
      });
  };
  const selectHandler = (e) => {
    console.log(e.target);
    console.log(e.target.value);
    localStorage.setItem("expensePerPage", e.target.value);
    setexpensePerPage(e.target.value);
  };
  // console.log(props);
  return (
    <>
      <div className="flex  ">
        <div className="w-4/5">
          <button>Daily</button>
          <button>Monthly</button>
          <button>Yearly</button>
          <table class="table-auto w-full ">
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
          <div onClick={paginationHandler}>
            {showData.hasPreviousPage ? (
              <button onClick={paginationHandler}>
                {" "}
                {showData.previousPage}{" "}
              </button>
            ) : (
              ""
            )}
            <button style={{ margin: "0 1rem" }} onClick={paginationHandler}>
              {showData.currentPage}
            </button>
            {showData.hasNextPage ? (
              <button onClick={paginationHandler}> {showData.nextPage} </button>
            ) : (
              ""
            )}
          </div>
        </div>
        <div>
          {console.log(localStorage.getItem("expensePerPage"))}
          <button onClick={download}>Download</button>
          <select name="" id="" onChange={selectHandler}>
            <option value="2">2</option>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </select>
          <PremiumButton />
        </div>
      </div>
    </>
  );
}

export default Expenses;
