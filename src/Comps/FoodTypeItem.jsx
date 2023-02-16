import React, { useContext } from 'react';
import { ContextPage } from '../Context/ContextProvider';

export default function FoodTypeItem(props) {

    const {foodTypeList, deleteFoodType} = useContext(ContextPage);
    
  return (
    <div>
        <p className="list-items">{props.foodTypeName} | {props.foodTypeDesc} | <button  type="button" className="btn-close" onClick={() => deleteFoodType(props.id)}></button></p>
    </div>
  )
}
