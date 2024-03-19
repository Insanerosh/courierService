import './App.css';

import {Routes, Route} from 'react-router-dom'

import Home from "./Components/home/Home";
import Register from "./Components/register/Register";
import Login from "./Components/login/Login";
import About from './Components/about/About';
import Contact from './Components/contact/Contact';
import Details from './Components/details/Details';
import Checkout from "./Components/checkout/Checkout";
import Confirmation from './Components/confirmation/Confirmation';

 
function App() {
  return (
    <>
  
     <Routes>
    <Route path='/' element={<Home/>}></Route>
     <Route path='/About' element={<About/>}></Route>
     <Route path='/Register' element={<Register/>}></Route>
     <Route path='/Login' element={<Login/>}></Route>
     <Route path='/Contact' element={<Contact/>}></Route>    
     <Route path='/Details' element={<Details/>}></Route>
     <Route path='/Confirmation' element={<Confirmation/>}></Route>
     <Route path='/Checkout' element={<Checkout/>}></Route>
     
   </Routes>
 
  </>
  );
}
 
export default App;
