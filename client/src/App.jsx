import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify styles
import Home from './pages/Home';
import Navbar from './components/Navbar';
import SignUp from './pages/Signup';
import Login from './pages/Login';
import Footer from './components/Footer';
import AppFeatures from './components/AppFeatures';
import EventForm from './components/EventForm';
import Events from './pages/Events';
import ContactUs from './pages/Contactup';


function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/features" element={<AppFeatures />} />
        <Route path='/createEvent' element={<EventForm/>} />
        <Route path ="/events" element={<Events />} />
        <Route path='/contact' element={<ContactUs />} />
      </Routes>
      <Footer />
      <ToastContainer /> {/* Add ToastContainer */}
    </>
  );
}

export default App;
