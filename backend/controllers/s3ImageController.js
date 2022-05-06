// import dotenv
// dotenv.config()
const aws = require("aws-sdk");
const crypto = require("crypto");
const { promisify } = require("util");

const randomBytes = promisify(crypto.randomBytes);

const region = "ap-southeast-2";
const bucketName = "direct-s3-upload-stackblock";
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

const s3 = new aws.S3({
  region,
  accessKeyId,
  secretAccessKey,
  signatureVersion: "v4",
});

// creating secure URL from our server
const generateUploadURL = async () => {
  const rawBytes = await randomBytes(16);
  const imageRandomName = rawBytes.toString("hex"); // imageName

  const params = {
    Bucket: bucketName,
    Key: imageRandomName,
    Expires: 60,
  };

  const uploadURL = await s3.getSignedUrlPromise("putObject", params);
  return uploadURL;
};


module.exports = generateUploadURL;
