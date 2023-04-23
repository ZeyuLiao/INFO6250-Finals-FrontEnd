import React, {useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppContextProvider } from './AppContext';
import Header from './components/Header';
import Profile from './components/Profile';
import RedirectPage from './components/Redirect';
import Ticket from './components/Ticket';
import OrdersTable from './components/Orders';
import ACLogin from './AirCanada/ACLogin';


function App() {
  const [loginUsername, setLoginUsername] = useState('');
  return (
    < AppContextProvider  value={{ loginUsername, setLoginUsername }}>
      <Router>
            <Header />
            <Routes>
              <Route exact path='/AC' element={<ACLogin/>}/>
              <Route exact path='/profile' element={<Profile/>}/>
              <Route exact path='/buyTicket' element={<Ticket/>}/>
              <Route exact path='/redirect' element={<RedirectPage/>}/>
              <Route exact path='/orders' element={<OrdersTable/>}/>
            </Routes>
          </Router>
    </ AppContextProvider >
    
  );
}

export default App;
