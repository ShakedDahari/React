import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ContextPage } from '../Context/ContextProvider';
import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";
import "firebase/firestore";
import { collection, db, handleCities, handleFoodTypes, handleRestaurants, storage } from '../FireBase/firebase';

export default function AddLists() {
    const navigate = useNavigate();
    const {fbCities, fbFoodTypes, fbRestaurants, setFbCities, setFbFoodTypes, setFbRestaurants, cityName, cityDesc, cities, setCities, foodTypeName, foodTypeDesc, foodTypeList, setCityName, setCityDesc, restaurantName, restaurantType, restaurantCity, restaurantImage, setRestaurantName, setRestaurantType, setRestaurantCity, setRestaurantImage, addRestaurant, addCities, setFoodTypeName, setFoodTypeDesc, addFoodType, fetchPost} = useContext(ContextPage);
 
    const btnAddCity = async () => {
        if (cityName && cityDesc) {
            addCities(cityName, cityDesc);
            handleCities(cityName, cityDesc);              
            alert('City Added Successfully');
        } else {
            alert('Error');
        } 
    }

    const btnAddFoodType = () => {
        if(foodTypeName && foodTypeDesc) {
            addFoodType(foodTypeName, foodTypeDesc);
            handleFoodTypes(foodTypeName, foodTypeDesc);
            alert('Food Type Added Successfully');
        } else {
            alert('Error');
        }
    }

    const btnAddRestaurant = () => {
        if(restaurantImage == null) return;
         const imageRef = ref(storage, `images/${restaurantImage.name}`);        
        uploadBytes(imageRef, restaurantImage).then((snapshot) => {
             getDownloadURL(snapshot.ref).then((url) => {
                setRestaurantImage(url);
                    if(restaurantName && restaurantType && restaurantCity && url) {
                    addRestaurant(restaurantName, restaurantCity, restaurantType, url);
                    handleRestaurants(restaurantName, restaurantCity, restaurantType, url);
                    alert('Restaurant Added Successfully');
                    } else {
                        alert('Error');
                    }
            });
        });
    }
    
    return (
    <div className="add-lists">
        <div>
            <h2>Add Lists</h2> <br />
        </div>
        <div className="lists">
        <div className="add-cities">
            <h3>Cities</h3> <br />
            <p><label>Name: </label><input className="input-user" type="text" onChange={(e)=> setCityName(e.target.value)}/></p>
            <p><label>Description: </label><input className="input-user" type="text" onChange={(e)=> setCityDesc(e.target.value)}/></p>
            <button type="button" className="btn btn-outline-secondary" onClick={btnAddCity}>Add</button>
            <button type="button" className="btn btn-outline-secondary" onClick={() => navigate('/cities')}>Show Cities</button>
        </div>
        <div className="add-food">
            <h3>Food Types</h3> <br />
            <p><label>Name: </label><input className="input-user" type="text" onChange={(e)=> setFoodTypeName(e.target.value)}/></p>
            <p><label>Description: </label><input className="input-user" type="text" onChange={(e)=> setFoodTypeDesc(e.target.value)}/></p>
            <button type="button" className="btn btn-outline-secondary" onClick={btnAddFoodType}>Add</button>
            <button type="button" className="btn btn-outline-secondary" onClick={() => navigate('/foodTypes')}>Show Food Types</button>
        </div>
        <div className="add-restaurant">
            <h3>Restaurants</h3> <br />
            <p><label>Name: </label><input className="input-user" type="text" onChange={(e)=> setRestaurantName(e.target.value)}/></p>
            <p><label>City: </label><select className="input-user" value={restaurantCity} onChange={e => setRestaurantCity(e.target.value)}>
            <option>place of restaurant</option>
            {fbCities.map(city => ( <option key={city.id} id={city.id} name={city.name}>{city.name}</option>))};
            </select></p>
            <label>Type: </label><ul>
            <div className="form-check form-check-inline">
            {fbFoodTypes.map((item) => (
            <li key={item.id}>
            <input className="form-check-input" type="radio" name="foodTypeList" value={item.id} checked={restaurantType === item.foodTypeName}
            onChange={() => setRestaurantType(item.foodTypeName)}/>{item.foodTypeName}</li>))}</div></ul>    
    <p><label>Image: </label><input className="input-user" type="file" onChange={e => setRestaurantImage(e.target.files[0])}></input></p>
            <button type="button" className="btn btn-outline-secondary" onClick={btnAddRestaurant}>Add</button>
            <button type="button" className="btn btn-outline-secondary" onClick={() => navigate('/restaurants')}>Show Restaurants</button>
        </div>
        </div>
        <button type="button" className="btn btn-outline-secondary" onClick={() => navigate('/home')}>Home</button>
    </div>
  )
}



