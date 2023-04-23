import React, {useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppContextProvider } from './AppContext';
import Header from './components/Header';
import ACLogin from './AirCanada/ACLogin';


function App() {
  const [loginUsername, setLoginUsername] = useState('');
  return (
    < AppContextProvider  value={{ loginUsername, setLoginUsername }}>
      <Router>
            <Header />
            <Routes>
              <Route exact path='/AC' element={<ACLogin/>}/>
            </Routes>
          </Router>
    </ AppContextProvider >
    
  );
}

export default App;
