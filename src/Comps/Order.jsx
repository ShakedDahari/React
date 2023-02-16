import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ContextPage } from '../Context/ContextProvider';

export default function Order() {
    
    const {selectedCity, selectedFoodType, selectedDiners, selectedTime, restaurantList, setSaveRest, fbRestaurants, email} = useContext(ContextPage);
    const navigate = useNavigate();

    const handleMovePage = (selectedRest) => {
      setSaveRest(selectedRest);
      navigate('/restaurantPage');
    }

    const confirmOrder = (restaurant) => {
      let answer = window.confirm('Are you sure you want to make a reservation?\n' +
      `Order details ---> ${restaurant.restaurantName}, ${selectedDiners} diners, ${selectedTime}`);
      if(answer) {
        alert(`Order confirmation will send to ${email}`);
      }
    }
    
  return (
    <div className="order-page">
        <div className="icon-width"><div className="icon-order"><h3>Dine</h3><h3>In</h3><h3>Time</h3></div></div>
        <div className="selected">
        <span className="badge rounded-pill text-bg-secondary">{selectedCity}</span>
        <span className="badge rounded-pill text-bg-secondary">{selectedFoodType}</span>
        <span className="badge rounded-pill text-bg-secondary">{selectedDiners} diners</span>
        <span className="badge rounded-pill text-bg-secondary">{selectedTime}</span>
        </div>
        <div className="width-order">
        <div className="options">
        <ul>
        {fbRestaurants.length === 0 ||
  (selectedCity && selectedFoodType &&
    !fbRestaurants.some(
      (restaurant) =>
        restaurant.restaurantCity === selectedCity &&
        restaurant.restaurantType === selectedFoodType
    )) ? (
    <li>Sorry, we couldn't find what you asked... try something else</li>
  ) : (
    fbRestaurants
        .filter((restaurant) => {
          if (!selectedCity && !selectedFoodType) {
            return true;
          }
          if (selectedCity && selectedFoodType) {
            return restaurant.restaurantCity === selectedCity && restaurant.restaurantType === selectedFoodType;
          }        
        }))
        .map((restaurant) => (
          <li className="restaurant-order" key={restaurant.id}><div className="left-img"><button className="img-btn" onClick={()=> handleMovePage(restaurant)}><img style={{width:200, height: 200, borderRadius: 10}} src={restaurant.restaurantImage}/></button></div><div className="right-desc"><h4>{restaurant.restaurantName}</h4><h5>{restaurant.restaurantCity}</h5><h5>{restaurant.restaurantType}</h5></div>
          <div className="time-info">
          <h6 onClick={() => confirmOrder(restaurant)}>{selectedTime}<br/>inside</h6>
          <h6 onClick={() => confirmOrder(restaurant)}>{selectedTime}<br/>outside</h6>
          <h6 onClick={() => confirmOrder(restaurant)}>{selectedTime}<br/>bar</h6>
            </div>
            </li>
        ))}
    </ul>
        </div>
      </div>
    </div>
  )
}
