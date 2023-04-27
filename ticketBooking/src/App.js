import React, {useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppContextProvider } from './AppContext';
import Header from './components/Header';
import MainPage from './components/MainPage';
import FlightList from './components/ListOfFlights';
import Signup from './components/SignUp';
import Login from './components/Login';
import Profile from './components/Profile';
import RedirectPage from './components/Redirect';
import Ticket from './components/Ticket';
import OrdersTable from './components/Orders';
import Update from './components/Update';


function App() {
  const [loginUsername, setLoginUsername] = useState('');
  
  return (
    < AppContextProvider  value={{ loginUsername, setLoginUsername }}>
      <Router>
            <Header />
            <Routes>
              <Route exact path='/' element={<MainPage />} />
              <Route exact path='/' element={<FlightList/>}/>
              <Route exact path='/signup' element={<Signup/>}/>
              <Route exact path='/login' element={<Login/>}/>
              <Route exact path='/profile' element={<Profile/>}/>
              <Route exact path='/buyTicket' element={<Ticket/>}/>
              <Route exact path='/redirect' element={<RedirectPage/>}/>
              <Route exact path='/orders' element={<OrdersTable/>}/>
              <Route exact path='/update' element={<Update/>}/>
            </Routes>
          </Router>
    </ AppContextProvider >
    
  );
}

export default App;
