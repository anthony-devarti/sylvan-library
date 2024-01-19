import './App.css';
import './Styles/style.css';
import Header from './Components/Header';
import Home from './Routes/Home'
import { toast, ToastContainer, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
