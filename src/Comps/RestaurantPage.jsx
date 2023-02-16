import React, { useContext } from 'react';
import { ContextPage } from '../Context/ContextProvider';
import RestaurantItem from './RestaurantItem';

export default function RestaurantPage() {

    const {saveRest} = useContext(ContextPage);

  return (
    <div className="rest-page">
        <div><img style={{height:400, width:1000}} src={saveRest.restaurantImage}></img></div>
        <div className="head-rest"><h3>{saveRest.restaurantName}</h3>
        <h3>{saveRest.restaurantCity}</h3>
        <h3>{saveRest.restaurantType}</h3></div>   
        <div className="menu-hours">
            <div className="menu"><h6>Menu</h6>
            <div className="items-menu">
            <div className="items-left"><p>item 1</p><p>item 2</p><p>item 3</p><p>item 4</p><p>item 5</p></div>
            <div className="items-right"><p>price</p><p>price</p><p>price</p><p>price</p><p>price</p></div></div></div>
            <div className="hours"><h6>Openning Hours</h6>
            <div className="items-hours">
            <div className="items-left"><p>Sunday</p><p>Monday</p><p>Tuesday</p><p>Wednesday</p><p>Thursday</p><p>Friday</p><p>Saturday</p></div>
            <div className="items-right"><p>8:00 - 00:00</p><p>8:00 - 00:00</p><p>8:00 - 00:00</p><p>8:00 - 00:00</p><p>8:00 - 00:00</p><p>8:00 - 00:00</p><p>8:00 - 00:00</p></div></div></div>
        </div>
    </div>
  )
}
