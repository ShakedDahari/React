import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { ContextPage } from '../Context/ContextProvider';
import FoodTypeItem from './FoodTypeItem';

export default function FoodTypes() {
    const navigate = useNavigate();
    const { fbFoodTypes, foodTypeList } = useContext(ContextPage);

    let foodTypeListOutput = fbFoodTypes.map(foodType => 
    <FoodTypeItem key={foodType.id} id={foodType.id} foodTypeName={foodType.foodTypeName} foodTypeDesc={foodType.foodTypeDesc}/>);
    
  return (
    <div className="food-types-page">
        <h2>Food Type</h2> <br />
        {foodTypeListOutput} <br />
        <button type="button" className="btn btn-outline-secondary" onClick={() => navigate('/addLists')}>Go Back</button>
    </div>
  )
}
