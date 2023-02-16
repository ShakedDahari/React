import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ContextPage } from '../Context/ContextProvider';
import RestaurantItem from './RestaurantItem';

export default function Restaurants() {
    const navigate = useNavigate();
    const { fbRestaurants, restaurantList } = useContext(ContextPage);
    let restaurantListOutput = fbRestaurants.map(restaurant =>
      <RestaurantItem key={restaurant.id} id={restaurant.id} restaurantName={restaurant.restaurantName} restaurantCity={restaurant.restaurantCity} restaurantType={restaurant.restaurantType} restaurantImage={restaurant.restaurantImage}/>);
      return (
    <div>
        <div className="restaurants-page">
        <h2>Restaurants</h2> <br />
        {restaurantListOutput} <br />
        <button type="button" className="btn btn-outline-secondary" onClick={() => navigate('/addLists')}>Go Back</button>
    </div>
    </div>
  )
}
