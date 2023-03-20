require("dotenv").config({ path: "../.env.local" });

const admin = require("firebase-admin");
const fs = require("fs");
const path = require("path");

// 设置您的 Firebase Admin SDK 的私钥路径
const serviceAccount = require("../serviceAccount.json");

// 初始化 Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

async function uploadDataToFirestore(dataPath) {
  try {
    const data = require(dataPath);
    const collectionName = path.basename(dataPath, ".json");

    for (const item of data) {
      const docRef = db.collection(collectionName).doc(item.id.toString());
      await docRef.set(item);
      console.log(`Uploaded item: ${item["name-en"]} to ${collectionName}`);
    }
  } catch (error) {
    console.error("Error uploading data: ", error);
  }
}

function main() {
  const dataFolder = path.join(__dirname, "../data");

  fs.readdir(dataFolder, (err, files) => {
    if (err) {
      console.error("Error reading data folder: ", err);
      return;
    }

    console.log("Please choose a file to upload:");

    files.forEach((file, index) => {
      console.log(`${index + 1}. ${file}`);
    });

    const stdin = process.stdin;
    stdin.setEncoding("utf8");
    stdin.on("data", (input) => {
      const selectedIndex = parseInt(input.trim()) - 1;

      if (selectedIndex >= 0 && selectedIndex < files.length) {
        const selectedFile = files[selectedIndex];
        const dataPath = path.join(dataFolder, selectedFile);
        uploadDataToFirestore(dataPath);
        stdin.end();
      } else {
        console.error("Invalid selection. Please try again.");
      }
    });
  });
}

main();
