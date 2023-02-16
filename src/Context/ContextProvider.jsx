import React, { createContext, useEffect, useState } from 'react';
import firebase, {  collection } from '../FireBase/firebase';
import 'firebase/database';
import { db } from '../FireBase/firebase';
import { deleteDoc, doc, getDocs } from 'firebase/firestore';

export const ContextPage = createContext();

export default function ContextProvider(props) {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirm, setConfirm] = useState();

    const [users, setUsers] = useState([]);

    const [cityName, setCityName] = useState();
    const [cityDesc, setCityDesc] = useState();

    const [cities, setCities] = useState([]);
    const [id, setId] = useState(cities.length);
 
    const [fbCities, setFbCities] = useState([]);
        
    const [foodTypeName, setFoodTypeName]=useState(); 
    const [foodTypeDesc,setFoodTypeDesc]=useState();

    const [foodTypeList, setFoodTypeList]= useState([]);
    const [foodTypeID, setFoodTypeID]=useState(foodTypeList.length);

    const [fbFoodTypes, setFbFoodTypes] = useState([]);

    const [restaurantName, setRestaurantName] = useState();
    const [restaurantType, setRestaurantType] = useState();
    const [restaurantCity, setRestaurantCity] = useState();
    const [restaurantImage, setRestaurantImage] = useState();

    const [restaurantList, setRestaurantList] = useState([]);
    const [restaurantID, setRestaurantID] = useState(restaurantList.length);

    const [fbRestaurants, setFbRestaurants] = useState([]);

    const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

    useEffect(() => {
      fetchPost();
      const intervalId = setInterval(() => {
        setCurrentTime(new Date().toLocaleTimeString());
      }, 1000);

      return () => {
        clearInterval(intervalId);
      };
    }, []);
    
    const [selectedCity, setSelectedCity] = useState(cities[0]);
    const [selectedFoodType, setSelectedFoodType] = useState(foodTypeList[0]);
    const [selectedDiners, setSelectedDiners] = useState();
    const [selectedTime, setSelectedTime] = useState(currentTime);


    const addUsers = (email, password) => {
      let newUsers = [...users, {userEmail: email, userPassword: password}];
      setUsers(newUsers);
    } 

    const addCities = (name, desc) => {
      let newCities = [...cities, {id: id+1, name, desc}];
      setCities(newCities);
      setId(prevId => prevId + 1);
    }

    const deleteCity = (deletedCityId) => {
      const index = fbCities.findIndex(item => item.id === deletedCityId);
      const newItems = [...fbCities];
      newItems.splice(index, 1);   
      const docRef = doc(db, "cities", deletedCityId);
      deleteDoc(docRef);
      setFbCities(newItems);

      let cityToDel = cities.filter(city => city.id === deletedCityId);
      let newCities = [...cities.filter(city => city.id !== deletedCityId)];
      setCities(newCities);
    }

    const addFoodType = (foodTypeName, foodTypeDesc)=>{
        let newFoodTypeList = [...foodTypeList, {id: foodTypeID+1, foodTypeName, foodTypeDesc}]
        setFoodTypeList(newFoodTypeList);
        setFoodTypeID(prevId => prevId + 1);
    }

    const deleteFoodType = (deletedFoodTypeID) =>{
      const index = fbFoodTypes.findIndex(item => item.id === deletedFoodTypeID);
      const newItems = [...fbFoodTypes];
      newItems.splice(index, 1);   
      const docRef = doc(db, "food-types", deletedFoodTypeID);
      deleteDoc(docRef);
      setFbFoodTypes(newItems);

      let foodTypeToDelete= foodTypeList.filter(foodType => foodType.id === deletedFoodTypeID);
      let newFoodTypeList= [...foodTypeList.filter(foodType => foodType.id !==deletedFoodTypeID)]
      setFoodTypeList(newFoodTypeList);
  }

    const addRestaurant = (restaurantName, restaurantCity, restaurantType, restaurantImage) => {
        let newRestaurantList = [...restaurantList, { id: restaurantID + 1, restaurantName: restaurantName, restaurantCity: restaurantCity, restaurantType: restaurantType, restaurantImage: restaurantImage }]
        setRestaurantList(newRestaurantList);
        setRestaurantID(prevId => prevId + 1);
    }

    const deleteRestaurantFromList = (restaurantIDToDelete) => {
        const index = fbRestaurants.findIndex(item => item.id === restaurantIDToDelete);
        const newItems = [...fbRestaurants];
        newItems.splice(index, 1);   
        const docRef = doc(db, "restaurants", restaurantIDToDelete);
        deleteDoc(docRef);
        setFbRestaurants(newItems);

        let restaurantToDelete = restaurantList.filter(restaurant => restaurant.id === restaurantIDToDelete);
        let newRestaurantList = [...restaurantList.filter(restaurant => restaurant.id !== restaurantIDToDelete)];
        setRestaurantList(newRestaurantList);
    }

    const [saveRest, setSaveRest] = useState();

    const saveRestaurant = (restId) => {
      saveRest = restaurantList.filter(restaurant => restaurant.id === restId);
      setSaveRest(saveRest);
      console.log(saveRest);
    }

    const fetchPost = async () => {      
      await getDocs(collection(db, "cities"))
          .then((querySnapshot)=>{               
              const newData = querySnapshot.docs
                  .map((doc) => ({...doc.data(), id:doc.id, name:doc.data().name, desc:doc.data().description }));
              setFbCities(newData);                
          }); 
          
      await getDocs(collection(db, "food-types"))
      .then((querySnapshot)=>{               
          const newData = querySnapshot.docs
              .map((doc) => ({...doc.data(), id:doc.id, foodTypeName:doc.data().foodTypeName, foodTypeDesc:doc.data().foodTypeDesc }));
          setFbFoodTypes(newData);                
      }); 

      await getDocs(collection(db, "restaurants"))
      .then((querySnapshot)=>{               
          const newData = querySnapshot.docs
              .map((doc) => ({...doc.data(), id:doc.id, restaurantName:doc.data().restaurantName, restaurantCity:doc.data().restaurantCity, restaurantType:doc.data().restaurantType, restaurantImage:doc.data().restaurantImage }));
          setFbRestaurants(newData);                
      });
    }


  return (
    <ContextPage.Provider value={{ email, password, confirm, users, cityName, cityDesc, cities, id, foodTypeName, foodTypeDesc, foodTypeList, foodTypeID, restaurantName, restaurantType, restaurantCity, restaurantImage, restaurantList, restaurantID, selectedCity, selectedFoodType, selectedDiners, selectedTime, saveRest, fbCities, fbFoodTypes, fbRestaurants, setFbCities, setFbFoodTypes, setFbRestaurants, setSelectedCity, setSelectedFoodType, setSelectedDiners, setSelectedTime,
     setEmail, setPassword, setConfirm, setUsers, addUsers, setCities, setCityName, setCityDesc, setId, addCities, deleteCity, setFoodTypeName, setFoodTypeDesc, addFoodType, deleteFoodType, setRestaurantName, setRestaurantType, setRestaurantCity, setRestaurantImage, setRestaurantList, setRestaurantID, addRestaurant, deleteRestaurantFromList, setSaveRest, saveRestaurant, fetchPost}}>
        {props.children}
    </ContextPage.Provider>
  )
}
