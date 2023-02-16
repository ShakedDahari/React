import firebase from "firebase/compat/app";
import { getFirestore, collection, addDoc, where, query, getDocs, doc, deleteDoc } from "firebase/firestore";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import "firebase/compat/auth";

const firebaseConfig = {
      apiKey: "AIzaSyBuWudQAeYKiJxiw07Atnwa3Q2xHCHyYrg",
      authDomain: "react-firebase-29fe7.firebaseapp.com",
      projectId: "react-firebase-29fe7",
      storageBucket: "react-firebase-29fe7.appspot.com",
      messagingSenderId: "845949589916",
      appId: "1:845949589916:web:707826617982ee3fd39059",
      measurementId: "G-PJFBB084QM"
};

const app = firebase.initializeApp(firebaseConfig);
const db = getFirestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const storage = getStorage(app);

export const auth = firebase.auth();
export default firebase;
export { collection, addDoc, db, getDocs };

export const signInWithEmailAndPassword = async (email, password) => {
  try {
    await auth.signInWithEmailAndPassword(email, password);
  } catch (err) {
    alert(err.message);
  }
};

export const registerWithEmailAndPassword = async (email, password) => {
  try {
    const res = await auth.createUserWithEmailAndPassword(email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      authProvider: "local",
      email,
    });
  } catch (err) {
    alert(err.message);
  }
};


export const handleCities = async (name, desc) => {
  try {
    await addDoc(collection(db, "cities"), {
      name: name,
      description: desc,
    });  
  } catch (error) {
   alert(error.message); 
  }
}

export const handleFoodTypes = async (foodTypeName, foodTypeDesc) => {
  try {
    await addDoc(collection(db, "food-types"), {
      foodTypeName: foodTypeName,
      foodTypeDesc: foodTypeDesc,
    });  
  } catch (error) {
   alert(error.message); 
  }
}


export const handleRestaurants = async (restaurantName, restaurantCity, restaurantType, restaurantImage) => {
  try {   
    await addDoc(collection(db, "restaurants"), {
      restaurantName: restaurantName,
      restaurantCity: restaurantCity,
      restaurantType: restaurantType,
      restaurantImage: restaurantImage,
    });  
  } catch (error) {
   alert(error.message); 
  }
}

