import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './component/Register';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, Zoom } from 'react-toastify';
import Alluser from './component/Alluser';
import Update from './component/Update';
import {injectStyle} from "react-toastify/dist/inject-style"

// const contextClass = {
//   success: "bg-blue-600",
//   error: "bg-red-600",
//   info: "bg-gray-600",
//   warning: "bg-orange-400",
//   default: "bg-indigo-600",
//   dark: "bg-white-600 font-gray-300",
// }


function App() {

  injectStyle()
  return (
    <>
      <Router>
        <Routes>
          <Route>
            <Route path='/' element={<Register />} />
            <Route path='/getall' element={<Alluser />} />
            <Route path='/update/:id' element={<Update />} />
          </Route>
        </Routes>
        <ToastContainer 
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={<span>close</span>}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Zoom}
        />
              </Router>

    </>
  );
}

export default App;
