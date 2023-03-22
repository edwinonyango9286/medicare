import { Route, Routes } from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Home from './components/Home';
import  Chatlist  from './components/chat';
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path='/chat' element={<Chatlist />}></Route>
      <Route path="/auth-user-login" element={<Login />} />
      <Route path="/auth-user-register" element={<Register />} />
    </Routes>
  )
}

export default App
