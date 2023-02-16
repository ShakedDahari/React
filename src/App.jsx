import { Route, Routes } from 'react-router-dom';
import './App.css';
import AddLists from './Comps/AddLists';
import Cities from './Comps/Cities';
import FoodTypes from './Comps/FoodTypes';
import Home from './Comps/Home';
import Login from './Comps/Login';
import Order from './Comps/Order';
import Register from './Comps/Register';
import RestaurantPage from './Comps/RestaurantPage';
import Restaurants from './Comps/Restaurants';


function App() {

  return (
    <div className="App">
      
        <Routes>
          <Route path='/' element={<Login/>}></Route>
          <Route path='/register' element={<Register/>}></Route>
          <Route path='/home' element={<Home/>}></Route>
          <Route path='/order' element={<Order/>}></Route>
          <Route path='/cities' element={<Cities/>}></Route>
          <Route path='/addLists' element={<AddLists/>}></Route>
          <Route path='/foodTypes' element={<FoodTypes/>}></Route>
          <Route path='/restaurants' element={<Restaurants/>}></Route>
          <Route path='/restaurantPage' element={<RestaurantPage/>}></Route>
        </Routes>

    </div>
  );
}

export default App;
