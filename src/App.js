
import './App.css';
import { useState } from 'react';
import './Components/Hero.jsx'
import Hero from './Components/Hero.jsx';
import Login from './Components/Login.jsx';
import Navebar from './Components/Navbar.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './Components/Signup.jsx';
import Doctor from './Components/Doctor.jsx';
import Appointment from './Components/Appointment.jsx';
import Trackappointment from './Components/Trackappointment.jsx';
import Alert from './Components/Alert.jsx';
import About from './Components/About.jsx';
function App() {

  const [alert, setAlert] = useState(null)

  const showAlert = (message, type) => {
    setAlert({
      message: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null);
    }, 2000);
  }

  return (
    <>
      <div>
        <BrowserRouter>
          <Navebar showAlert={showAlert}/>
          <Alert alert={alert}/>
          <Routes>
            <Route exact path="/" element={<Hero showAlert={showAlert}/>} />
          </Routes>
          <Routes>
            <Route exact path="/login" element={<Login showAlert={showAlert}/>} />
          </Routes>
          <Routes>
            <Route exact path="/signup" element={<Signup showAlert={showAlert}/>} />
          </Routes>
          <Routes>
            <Route exact path="/doctors" element={<Doctor showAlert={showAlert}/>} />
          </Routes>
          <Routes>
            <Route exact path="/take-appointment" element={<Appointment showAlert={showAlert}/>} />
          </Routes>
          <Routes>
            <Route exact path="/track-appointment" element={<Trackappointment/>} />
          </Routes>
          <Routes>
            <Route exact path="/about" element={<About/>} />
          </Routes>

          
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
