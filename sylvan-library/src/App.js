import './App.css';
import './Styles/style.css';
import Home from './Routes/Home'
import Reservations from './Routes/Reservations';
import Problem from './Routes/Problem';
import Lender from './Routes/Lender';
import { ToastContainer, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React from 'react';
import { useParams, BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {

  let { reservationID } = useParams()

  return (
    <div className="App">
      <ToastContainer position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
      <Router>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/reservations" element={<Reservations/>} />
          <Route path="/lenderdashboard" element={<Home/>} />
          <Route path="delivery-issue/:reservationID" element={<Problem mode={'delivery'}/>} />
          <Route path="lost-cards/:reservationID" element={<Problem mode={'lost'}/>} />          
          <Route path="lender" element={<Lender/>} />          
        </Routes>
      </Router>
    </div>
  );
}

export default App;
