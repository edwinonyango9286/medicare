import React,{Suspense} from 'react'
import {Routes,Route} from 'react-router-dom';

function App() {

  const Home = React.lazy(() => import('./components/Home'));
  const Login = React.lazy(() => import('./components/auth/Login'));
  const Register = React.lazy(() => import('./components/auth/Register'));

  return (
    <Suspense fallback={<div>Loading.....</div>}>
      <Routes>
        <Route exact path='' element={<Home />} />
        <Route exact path="/auth-user-login" element={<Login/>} />
        <Route exact path="/auth-user-register" element={<Register />} />
      </Routes>
    </Suspense>
  )
}

export default App;
