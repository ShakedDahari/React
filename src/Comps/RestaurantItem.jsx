import React, { useContext } from 'react';
import { ContextPage } from '../Context/ContextProvider';

export default function RestaurantItem(props) {
    const {restaurantList, deleteRestaurantFromList} = useContext(ContextPage);

  return (
    <div>
         <p className="list-items">{props.restaurantName} | {props.restaurantCity} | {props.restaurantType} | <img style={{width:100,height:100}} src={props.restaurantImage}></img> <button type="button" className="btn-close" onClick={()=>deleteRestaurantFromList(props.id)}></button></p>
    </div>
  )
}
