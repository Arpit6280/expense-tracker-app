import axios from "axios";
import React, { useEffect, useState } from "react";

function PremiumButton() {
  const [isPremium, setIsPremium] = useState(false);
  const [isshowLeaderBoard, setShowLeaderBoadr] = useState(false);
  const [userLeaderBoards, setUserLeaderBoard] = useState([]);

  useEffect(() => {
    premiumUser();
    // const token = localStorage.getItem("token");
    // axios
    //   .get("http://localhost:4000/user/premium", {
    //     headers: { Authorization: token },
    //   })
    //   .then((res) => {
    //     console.log(res);
    //     setIsPremium(res.data.ispremiumuser);
    //     // setData(res.data);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  }, []);
  const premiumUser = () => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:4000/user/premium", {
        headers: { Authorization: token },
      })
      .then((res) => {
        console.log(res);
        setIsPremium(res.data.ispremiumuser);
        // setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
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
      key: response.data.key_id,
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
        premiumUser();
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
    e.preventDefault();

    rzp.on("payment.failed", function (response) {
      console.log("eeeeeeeeddd", response);
      alert("Something went wroong");
    });
  };
  const showLeaderBoard = async () => {
    const token = localStorage.getItem("token");
    const userLeaderBoard = await axios.get(
      "http://localhost:4000/premium/showleaderboard",
      {
        headers: { Authorization: token },
      }
    );
    console.log(userLeaderBoard);
    setShowLeaderBoadr(true);
    setUserLeaderBoard(userLeaderBoard.data);
  };
  return (
    <div>
      {!isPremium ? (
        <div>
          <button onClick={premiumHandler}>Buy Premium</button>{" "}
        </div>
      ) : (
        <div>
          You are a premium user
          <button onClick={showLeaderBoard}>Show LeaderBoard</button>
          {isshowLeaderBoard
            ? userLeaderBoards.map((user) => (
                <li>
                  {" "}
                  {user.name} Total Expense {user.totalAmount}
                </li>
              ))
            : ""}
        </div>
      )}
    </div>
  );
}

export default PremiumButton;
