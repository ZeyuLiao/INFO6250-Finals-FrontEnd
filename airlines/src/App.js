import React, {useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppContextProvider } from './AppContext';
import Header from './components/Header';
import ACLogin from './AirCanada/ACLogin';
import ACAdmin from './AirCanada/ACAdmin';
import ACManagerDashboard from './AirCanada/ACDashboard';


function App() {
  const [loginUsername, setLoginUsername] = useState('');
  return (
    < AppContextProvider  value={{ loginUsername, setLoginUsername }}>
      <Router>
            <Header />
            <Routes>
              <Route exact path='/AC' element={<ACLogin/>}/>
              <Route exact path='/ACAdmin' element={<ACAdmin/>}/>
              <Route exact path='/ACManager' element={<ACManagerDashboard/>}/>
            </Routes>
          </Router>
    </ AppContextProvider >
    
  );
}

export default App;
