import React, { useContext } from 'react';
import { ContextPage } from '../Context/ContextProvider';

export default function CityItem(props) {
    const {deleteCity} = useContext(ContextPage);

  return (
    <div>
        <p className="list-items">{props.name} | {props.desc} | <button type="button" className="btn-close" onClick={() => deleteCity(props.id)}></button></p>
    </div>
  )
}
