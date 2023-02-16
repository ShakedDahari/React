import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ContextPage } from '../Context/ContextProvider';
import CityItem from './CityItem';

export default function Cities() {
    const navigate = useNavigate();
    const {fbCities, cities, setCities} = useContext(ContextPage);

    let citiesOutput = fbCities.map(city => 
        <CityItem key={city.id} id={city.id} name={city.name} desc={city.desc}/>);

  return (
    <div className="cities-page">
        <div>
            <h2>Cities</h2> <br />
            {citiesOutput} <br />
            <button type="button" className="btn btn-outline-secondary" onClick={() => navigate('/addLists')}>Go Back</button>
        </div>
    </div>
  )
}
