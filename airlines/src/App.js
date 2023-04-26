import React, {useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppContextProvider } from './AppContext';
import Header from './components/Header';
import ACLogin from './AirCanada/ACLogin';
import ACAdmin from './AirCanada/ACAdmin';
import ACManagerDashboard from './AirCanada/ACDashboard';
import ACAddFlight from './AirCanada/ACAddFlight';
import Airlines from './components/Airlines';



function App() {
  const [loginUsername, setLoginUsername] = useState('');
  return (
    < AppContextProvider  value={{ loginUsername, setLoginUsername }}>
      <Router>
            <Header />
            <Routes>
              <Route exact path='/' element={<Airlines/>}/>
              <Route exact path='/ACAdmin' element={<ACAdmin/>}/>
              <Route exact path='/ACManager' element={<ACManagerDashboard/>}/>
              <Route exact path='/ACAddFlight' element={<ACAddFlight/>}/>
              <Route exact path='/ACLogin' element={<ACLogin/>}/>
            </Routes>
          </Router>
    </ AppContextProvider >
    
  );
}

export default App;
