import React, { useEffect, useState } from "react";
import ExpenseLists from "./ExpenseLists";
import axios from "axios";
import PremiumButton from "../addExpense/PremiumButton";

function Expenses(props) {
  const [data, setData] = useState([]);
  const token = localStorage.getItem("token");
  useEffect(() => {
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
  const download = () => {
    axios
      .get("http://localhost:3000/user/download", {
        headers: { Authorization: token },
      })
      .then((response) => {
        if (response.status === 201) {
          //the bcakend is essentially sending a download link
          //  which if we open in browser, the file would download
          var a = document.createElement("a");
          a.href = response.data.fileUrl;
          a.download = "myexpense.csv";
          a.click();
        } else {
          throw new Error(response.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  console.log(props);
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
        </div>
        <div>
          <button onClick={download}>Download</button>
          <PremiumButton />
        </div>
      </div>
    </>
  );
}

export default Expenses;
