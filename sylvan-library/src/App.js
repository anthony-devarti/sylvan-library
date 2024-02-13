import './App.css';
import './Styles/style.css';
import Home from './Routes/Home'
import Reservations from './Routes/Reservations';
import { ToastContainer, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {

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

        </Routes>
      </Router>
    </div>
  );
}

export default App;
