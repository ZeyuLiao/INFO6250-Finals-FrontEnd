import React, {useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppContextProvider } from './AppContext';
import Header from './components/Header';
import ACLogin from './AirCanada/ACLogin';
import ACAdmin from './AirCanada/ACAdmin';
import ACManagerDashboard from './AirCanada/ACDashboard';
import ACAddFlight from './AirCanada/ACAddFlight';
import Airlines from './components/Airlines';
import CAAddFlight from './AirChina/CAAddFlight';
import CAManagerDashboard from './AirChina/CADashboard';
import CALogin from './AirChina/CALogin';
import CAAdmin from './AirChina/CAAdmin';
import EKAdmin from './Emirates/EKAdmin';
import EKManagerDashboard from './Emirates/EKDashboard';
import EKAddFlight from './Emirates/EKAddFlight';
import EKLogin from './Emirates/EKLogin';
import LHAdmin from './Lufthansa/LHAdmin';
import LHManagerDashboard from './Lufthansa/LHDashboard';
import LHAddFlight from './Lufthansa/LHAddFlight';
import LHLogin from './Lufthansa/LHLogin';
import DLLogin from './Delta/DLLogin';
import DLAdmin from './Delta/DLAdmin';
import DLManagerDashboard from './Delta/DLDashboard';
import DLAddFlight from './Delta/DLAddFlight';
import Footer from './components/Footer';



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

              <Route exact path='/CAAdmin' element={<CAAdmin/>}/>
              <Route exact path='/CAManager' element={<CAManagerDashboard/>}/>
              <Route exact path='/CAAddFlight' element={<CAAddFlight/>}/>
              <Route exact path='/CALogin' element={<CALogin/>}/>

              <Route exact path='/EKAdmin' element={<EKAdmin/>}/>
              <Route exact path='/EKManager' element={<EKManagerDashboard/>}/>
              <Route exact path='/EKAddFlight' element={<EKAddFlight/>}/>
              <Route exact path='/EKLogin' element={<EKLogin/>}/>

              <Route exact path='/LHAdmin' element={<LHAdmin/>}/>
              <Route exact path='/LHManager' element={<LHManagerDashboard/>}/>
              <Route exact path='/LHAddFlight' element={<LHAddFlight/>}/>
              <Route exact path='/LHLogin' element={<LHLogin/>}/>

              <Route exact path='/DLAdmin' element={<DLAdmin/>}/>
              <Route exact path='/DLManager' element={<DLManagerDashboard/>}/>
              <Route exact path='/DLAddFlight' element={<DLAddFlight/>}/>
              <Route exact path='/DLLogin' element={<DLLogin/>}/>
            </Routes>
            <Footer />
          </Router>
    </ AppContextProvider >
    
  );
}

export default App;
