import firebase from "./firebase";
import charactersData from "../../data/character.json";

const db = firebase.firestore();

export const uploadDataToFirestore = async () => {
  const collectionRef = db.collection("genshin_impact");

  charactersData.forEach(async (item) => {
    await collectionRef.add(item);
  });

  console.log("Data uploaded successfully!");
};
