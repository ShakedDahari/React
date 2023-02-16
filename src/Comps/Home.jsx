import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ContextPage } from "../Context/ContextProvider";


export default function Home() {
  const { cities, fbCities, fbFoodTypes, selectedCity, setSelectedCity, selectedFoodType, selectedDiners, setSelectedDiners, setSelectedFoodType, selectedTime, setSelectedTime, foodTypeList } = useContext(ContextPage);

  const navigate = useNavigate();

  let currentHour = new Date().getHours();
  let currentMinute = new Date().getMinutes();

  useEffect(() => {
    setInterval(() => {
      currentHour = new Date().getHours();
    }, 1000);
  }, []);

  useEffect(() => {
    setInterval(() => {
      currentMinute = new Date().getMinutes();
    }, 1000);
  }, []);

const startIndex = Math.ceil(currentMinute / 15);
const options = Array.from({ length: 96 - (currentHour * 4 + startIndex) }, (_, i) => {
  const hour = (currentHour + Math.floor((i + startIndex) / 4)) % 24;
  const minute = ((i + startIndex) % 4) * 15;
  const time = `${hour}:${minute.toString().padStart(2, '0')}`;
  return (
    <option key={i} value={time}>
      {time}
    </option>
  );
});

const checkValues = () => {
    if (selectedCity && selectedFoodType && selectedDiners && selectedTime) {
        navigate('/order');
    } else {
      alert("Error");
    }   
  }


  return (
    <div className="home-page">
    <div className="home">
        <div className="icon"><h3>Dine</h3><h3>In</h3><h3>Time</h3></div>
        <div className="dropdown1">
            <div className="select">
      <select className="form-select" value={selectedCity} onChange={e => setSelectedCity(e.target.value)}>
        <option>Choose a place</option>
      {fbCities.map(city => ( <option key={city.id} id={city.id} name={city.name}>{city.name}</option>
      ))};
    </select></div>
    <div className="select">
    <select className="form-select" value={selectedFoodType} onChange={e => setSelectedFoodType(e.target.value)}>
        <option>Choose food type</option>
      {fbFoodTypes.map(foodType => ( <option key={foodType.id} id={foodType.id} name={foodType.foodTypeName}>{foodType.foodTypeName}</option>
      ))};
    </select></div></div>
    <h2 className="home-text">Let Us Help You</h2>
    <div className="dropdown2">
    <div className="select">
    <select className="form-select" value={selectedDiners} onChange={e => setSelectedDiners(e.target.value)}>
        <option>Amount of diners</option>
    {Array.from({ length: 15 }, (_, i) => (
        <option key={i + 1} value={i + 1}>
          {i + 1}
        </option>
    ))};
    </select></div>
    <div className="select"><select className="form-select" value={selectedTime} onChange={e => setSelectedTime(e.target.value)}>
        <option>Time</option>
      {options}
    </select></div></div>
    <button type="button" className="btn btn-outline-secondary" id="btnFind" onClick={checkValues}>Find</button>
    </div>
    </div>
  );
} 

