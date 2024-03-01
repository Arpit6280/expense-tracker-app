const sequelize = require("../database");
const Sib = require("sib-api-v3-sdk");
require("dotenv").config();

const client = Sib.ApiClient.instance;

const apiKey = client.authentications["api-key"];
apiKey.apiKey = process.env.API_KEY;

const tranEmailApi = new Sib.TransactionalEmailsApi();
const sender = {
  email: "arpitsinghyadav19@gmail.com",
  name: "Arpit Singh Yadav",
};

exports.forgetPassword = (req, res, next) => {
  const { email } = req.body;
  console.log(email);
  const receivers = [
    {
      email: email,
    },
  ];

  tranEmailApi
    .sendTransacEmail({
      sender,
      to: receivers,
      subject: "Subscribe to my channel",
      textContent: `Expense app {{params.role}}`,
      htmlContent: `<h1>Hello from arpit</h1>`,
      params: {
        role: "Frontend",
      },
    })
    .then(console.log("mail done"))
    .catch((err) => {
      console.log(err);
    });
};
