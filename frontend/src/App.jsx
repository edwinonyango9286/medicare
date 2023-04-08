import { Route, Routes } from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Home from './components/Home';
import  Chatlist  from './components/chat/Chatlist';
import Chatpage from './components/chat/Chatpage';
import Talktous from './components/chat/Talktous';
import Profile from './components/auth/Profile';
import Appointment from './components/appointment/Appointment';
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path='/chat' element={<Chatlist />}></Route>
      <Route path='/chat/chatpage' element={<Chatpage />}></Route>
      <Route path='/talktous' element={<Talktous />}></Route>
      <Route path="/auth-user-login" element={<Login />} />
      <Route path="/auth-user-register" element={<Register />} />
      <Route path="/user-profile" element={<Profile /> } />
      <Route path="/appointment" element={<Appointment />} />
    </Routes>
  )
}

export default App
