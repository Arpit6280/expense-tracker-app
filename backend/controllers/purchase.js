const Razorpay = require("razorpay");
const Order = require("../model/Order");

exports.purchasePremium = (req, res, next) => {
  try {
    var rzp = new Razorpay({
      key_id: "rzp_test_GLtj7fFuhaZ6vJ",
      key_secret: "SOqAYcmdcc63460ZzQVGdp0b",
    });
    const amount = 2500;
    rzp.orders.create({ amount, currency: "INR" }, (err, order) => {
      if (err) {
        console.log("rrrrrrrrrrr", err);
        throw new Error(JSON.stringify(err));
      }
      req.user
        .createOrder({ orderid: order.id, status: "PENDING" })
        .then(() => {
          return res.status(201).json({ order, key_id: rzp.key_id });
        })
        .catch((err) => {
          throw new Error(err);
        });
    });
  } catch (err) {
    console.log("eeee", err);
    res.status(403).json({ message: "Something went wrong", error: err });
  }
};

exports.updateTransactionStatus = (req, res) => {
  try {
    const { payment_id, order_id } = req.body;
    Order.findOne({ where: { orderid: order_id } }).then((order) => {
      order
        .update({ paymentid: payment_id, status: "SUCCESSFUL" })
        .then(() => {
          req.user
            .update({ ispremiumuser: true })
            .then(() => {
              return res
                .status(202)
                .json({ success: true, message: "Transaction successfull" });
            })
            .catch((err) => {
              throw new Error(err);
            });
        })
        .catch((err) => {
          throw new Error(err);
        });
    });
  } catch (err) {
    console.log(err);
  }
};
