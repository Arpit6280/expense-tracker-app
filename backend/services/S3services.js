const AWS = require("aws-sdk");
const uploadToS3 = async (data, filename) => {
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
};

module.exports = {
  uploadToS3,
};
