const sequelize = require("../database");
const Expense = require("../model/Expense");
const User = require("../model/User");
const AWS = require("aws-sdk");
const UserServices = require("../services/userservices");
const S3Services = require("../services/S3services");

exports.showLeaderBoard = async (req, res, next) => {
  try {
    const leaderboardofusers = await User.findAll({
      attributes: ["id", "name", "totalAmount"],

      order: [[sequelize.col("totalAmount"), "DESC"]],
    });
    console.log(leaderboardofusers);

    res.status(200).json(leaderboardofusers);
  } catch (err) {
    console.log(err);
  }
};

async function uploadToS3(data, filename) {
  const BUCKET_NAME = "expensetrackerapp121";
  const IAM_USER_KEY = "AKIAZQ3DUVBC7XVOAWNU";
  const IAM_USER_SECRET = "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";
  let s3bucket = new AWS.S3({
    accessKeyId: IAM_USER_KEY,
    secretAccessKey: IAM_USER_SECRET,
    // Bucket: BUCKET_NAME,
  });

  // s3bucket.createBucket(() => {
  var params = {
    Bucket: BUCKET_NAME,
    Key: filename,
    Body: data,
    ACL: "public-read",
  };
  return new Promise((resolve, reject) => {
    s3bucket.upload(params, (err, s3response) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        resolve(s3response.Location);
      }
    });
  });

  // });
}

exports.download = async (req, res, next) => {
  try {
    // const expenses = await req.user.getExpenses();
    const expenses = await UserServices.getExpenses(req);
    // console.log(expenses);
    const stringifiedExpenses = JSON.stringify(expenses);
    const userId = req.user.id;

    const filename = `Expense${userId}/${new Date()}.txt`;
    const fileURl = await S3Services.uploadToS3(stringifiedExpenses, filename);
    console.log("file", fileURl);
    res.status(201).json({ fileURl, success: true });
  } catch (error) {
    res.status(500).json({ fileURl: "", success: false, err: error });
  }
};
