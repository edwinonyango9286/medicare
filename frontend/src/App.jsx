import React,{Suspense} from 'react'
import {Routes,Route} from 'react-router-dom';

function App() {

  const Home = React.lazy(() => import('./components/Home'));
  const Login = React.lazy(() => import('./components/auth/Login'));
  const Register = React.lazy(() => import('./components/auth/Register'));
  const Profile = React.lazy(() => import('./components/user/Profile'));
  const AddDoctor = React.lazy(() => import('./components/admin/AddDoctor'))
  const DoctorList = React.lazy(() => import('./components/admin/DoctorList'))

  return (
    <Suspense fallback={<div>Loading.....</div>}>
      <Routes>
        <Route exact path='' element={<Home />} />
        <Route exact path="/auth-user-login" element={<Login/>} />
        <Route exact path="/auth-user-register" element={<Register />} />
        <Route exact path="/profile" element={<Profile />} />
        <Route exact path="/doctor-list" element={<DoctorList />} />
        <Route exact path="/add-doctor" element={<AddDoctor />} />
      </Routes>
    </Suspense>
  )
}

export default App;
