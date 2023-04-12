import { Route, Routes } from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Home from './components/Home';
import Talktous from './components/chat/Talktous';
import Profile from './components/auth/Profile';
import Appointment from './components/appointment/Appointment';
import Logout from './components/auth/Logout';
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path='/talktous' element={<Talktous />}></Route>
      <Route path="/auth-user-login" element={<Login />} />
      <Route path="/auth-user-register" element={<Register />} />
      <Route path="/user-profile" element={<Profile /> } />
      <Route path="/auth-user-logout" element={<Logout /> } />
      <Route path="/appointment" element={<Appointment />} />
    </Routes>
  )
}
export default App
