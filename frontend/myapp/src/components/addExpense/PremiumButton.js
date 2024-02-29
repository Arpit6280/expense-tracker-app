import axios from "axios";
import React, { useEffect, useState } from "react";

function PremiumButton() {
  const [isPremium, setIsPremium] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:4000/expense/getexpenses", {
        headers: { Authorization: token },
      })
      .then((res) => {
        console.log(res);
        // setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const premiumHandler = async (e) => {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      "http://localhost:4000/purchase/premiummember",
      {
        headers: { Authorization: token },
      }
    );
    console.log(response);
    var options = {
      key: "rzp_test_GLtj7fFuhaZ6vJ",
      order_id: response.data.order.id,
      handler: async function (response) {
        await axios.post(
          "http://localhost:4000/purchase/updatetransactionstatus",
          {
            order_id: options.order_id,
            payment_id: response.razorpay_payment_id,
          },
          {
            headers: { Authorization: token },
          }
        );
        alert("You are premium user now");
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
    e.preventDefault();

    rzp.on("payment.failed", function (response) {
      console.log(response);
      alert("Something went wrong");
    });
  };
  return (
    <div>
      {!isPremium ? (
        <div>
          <button onClick={premiumHandler}>Buy Premium</button>{" "}
        </div>
      ) : (
        "You are a premium user "
      )}
    </div>
  );
}

export default PremiumButton;
