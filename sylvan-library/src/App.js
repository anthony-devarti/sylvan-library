import './App.css';
import './Styles/style.css';
import Home from './Routes/Home'
import { ToastContainer, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React from 'react';

function App() {

  return (
    <div className="App">
      {/* <Header /> */}
      <Home />
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
    </div>
  );
}

export default App;
