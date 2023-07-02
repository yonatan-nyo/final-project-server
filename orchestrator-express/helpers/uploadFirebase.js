const { v4: uuid } = require("uuid");
const { admin } = require("../config/admin");

const UploadFirebase = async (file) => {
  const str = uuid();
  const fileExtension = file.name.split(".").pop(); // Get the file extension
  const fileName = str.slice(str.length - 10) + "." + fileExtension;
  const bucket = admin.storage().bucket();
  const blob = bucket.file(fileName);
  const blobStream = blob.createWriteStream();

  await new Promise((resolve, reject) => {
    blobStream.on("finish", () => {
      resolve(blobStream);
    });

    blobStream.on("error", (error) => {
      reject(error);
    });

    blobStream.end(file.data);
  });
  console.log(`https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${blob.name}?alt=media`);
  return `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${blob.name}?alt=media`;
};

module.exports = UploadFirebase;
