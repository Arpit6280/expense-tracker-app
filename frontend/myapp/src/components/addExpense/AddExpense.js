import axios from "axios";
import React, { useState } from "react";
// import Razorpay from "razorpay";

import { useNavigate } from "react-router-dom";
import PremiumButton from "./PremiumButton";

function AddExpense() {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const navigate = useNavigate();

  const descriptionInputHandler = (e) => {
    setDescription(e.target.value);
  };
  const amountInputHandler = (e) => {
    setAmount(e.target.value);
  };
  const categoryInputHandler = (e) => {
    setCategory(e.target.value);
  };
  const dateInputHandler = (e) => {
    setDate(e.target.value);
  };
  const expenseSubmitHandler = (e) => {
    e.preventDefault();
    console.log(date);
    let [year, month, day] = date.split("-");
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    month = monthNames[month - 1];
    let obj = {
      description,
      amount,
      category,
      date,
      year,
      month,
    };
    const token = localStorage.getItem("token");
    // axios
    //   .post("http://localhost:4000/expense/addexpenses", obj, {
    //     headers: { Authorization: token },
    //   })
    //   .then((res) => {
    //     console.log(res);
    //     navigate("/", { replace: true });
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    console.log(obj);
  };

  // const premiumHandler = async (e) => {
  //   const token = localStorage.getItem("token");
  //   const response = await axios.get(
  //     "http://localhost:4000/purchase/premiummember",
  //     {
  //       headers: { Authorization: token },
  //     }
  //   );
  //   console.log(response);
  //   var options = {
  //     key: "rzp_test_GLtj7fFuhaZ6vJ",
  //     order_id: response.data.order.id,
  //     handler: async function (response) {
  //       await axios.post(
  //         "http://localhost:4000/purchase/updatetransactionstatus",
  //         {
  //           order_id: options.order_id,
  //           payment_id: response.razorpay_payment_id,
  //         },
  //         {
  //           headers: { Authorization: token },
  //         }
  //       );
  //       alert("You are premium user now");
  //     },
  //   };
  //   const rzp = new window.Razorpay(options);
  //   rzp.open();
  //   e.preventDefault();

  //   rzp.on("payment.failed", function (response) {
  //     console.log(response);
  //     alert("Something went wrong");
  //   });
  // };

  return (
    <div style={{ width: "100%" }}>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <form
          action=""
          onSubmit={expenseSubmitHandler}
          className="sm:w-4/5 md:w-1/2 lg:w-2/5"
        >
          <div class="py-4">
            <span class="mb-2 text-md">Description</span>
            <input
              type="text"
              class="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
              name="description"
              id="description"
              value={description}
              onChange={descriptionInputHandler}
            />
          </div>
          <div class="py-4">
            <span class="mb-2 text-md">Amount</span>
            <input
              type="text"
              name="amount"
              id="amount"
              class="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
              value={amount}
              onChange={amountInputHandler}
            />
          </div>
          <div class="py-4">
            <span class="mb-2 text-md">Category</span>
            <input
              type="text"
              name="category"
              id="category"
              class="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
              value={category}
              onChange={categoryInputHandler}
            />
          </div>
          <div class="py-4">
            <span class="mb-2 text-md">Date</span>
            <input
              type="date"
              name="date"
              id="date"
              class="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
              value={date}
              onChange={dateInputHandler}
            />
          </div>
          <button class="w-full bg-black text-white p-2 rounded-lg mb-6 hover:bg-white hover:text-black hover:border hover:border-gray-300">
            Login
          </button>
        </form>
      </div>
      {/* <PremiumButton /> */}
    </div>
  );
}

export default AddExpense;
