import { Link, useNavigate } from 'react-router-dom';
import '../../assets/createaccountstyle.css'
import React, { useEffect, useState } from "react";
import { all_locations } from '../../query/location';
import { user_register } from '../../query/user';

function Register() {
  const navigate = useNavigate()
  const [input, setInput] = useState({
    username: "",
    email: "",
    gender: "",
    nationalId: "",
    phoneNumber: "",
    dateOfBirth: "",
    location: "",
    password: "",
    password2: ""
  })

  const { username, email, gender, nationalId, phoneNumber, dateOfBirth, location, password, password2 } = input;
  const UpdateInput = (name) => (event) => {
    setInput({ ...input, [name]: event.target.value });
  }

  const [passwordShown, setPasswordShown] = useState(false);
  const TogglePasswordShown = () => {
    setPasswordShown(!passwordShown)
  }

  const [error, setError] = useState("")

  const SubmitForm = (event) => {
    event.preventDefault();
    if (email.length === 0 || password.length === 0) {
      alert("Please fill out all fields");
    } else {
      user_register(input)
        .then(response => {
          if (response.data.success) {
            alert("Account created succesfully")
            navigate("/auth-user-login")
          } else {
            setError(response.data.error)
          }
        })
    }
  }

  const [locations, setLocations] = useState([])
  const LoadLocations = () => {
    all_locations()
      .then(response => {
        setLocations(response.data.locations)
      })
  }

  const [proceed, setProceed] = useState(true);
  useEffect(() => {
    LoadLocations()
  }, [])

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ width: "100vw", height: "100vh" }}>
      {proceed && (
        <div className="mdc-container">
          <div className="mdc-title">CREATE ACCOUNT</div>
          {error && (<div className="my-2 has-text-danger">{error}</div>)}
          <div className="mdc-content">
            <form onSubmit={SubmitForm}>
              <div className="mdc-user-details">
                <div className="mdc-input-box">
                  <span className="mdc-details">Full Name</span>
                  <input type="text" value={username} onChange={UpdateInput('username')} placeholder="Enter your name" required />
                </div>
                <div className="mdc-input-box">
                  <span className="mdc-details">Email</span>
                  <input type="text" value={email} onChange={UpdateInput('email')} placeholder="Enter your email" required />
                </div>
                <div className="mdc-input-box">
                  <span className="mdc-details">National Id / passport / Birth cert.</span>
                  <input type="text" value={nationalId} onChange={UpdateInput('nationalId')} placeholder="Enter your national identification" required />
                </div>
                <div className="mdc-input-box">
                  <span className="mdc-details">Phone Number</span>
                  <input type="text" value={phoneNumber} onChange={UpdateInput('phoneNumber')} placeholder="Enter your number" required />
                </div>
                <div className="mdc-input-box">
                  <span className="mdc-details">Date Of Birth</span>
                  <input type="date" value={dateOfBirth} onChange={UpdateInput('dateOfBirth')} required />
                </div>
                <div className="mdc-input-box">
                  <span className="mdc-details">Location</span>
                  <select value={location} onChange={UpdateInput('location')}>
                    <option value="">-----------------------------------</option>
                    {locations.map((subcounty, index) => (
                      <option key={index} value={subcounty?.subcountyCode}>{subcounty?.subcountyName}</option>
                    ))}
                  </select>
                </div>
                <div className="mdc-input-box">
                  <span className="mdc-details">Password</span>
                  <input type={passwordShown ? "text" : "password"} value={password} onChange={UpdateInput('password')} placeholder="Enter your password" required />
                </div>
                <div className="mdc-input-box">
                  <span className="mdc-details">Confirm Password</span>
                  <input type={passwordShown ? "text" : "password"} value={password2} onChange={UpdateInput('password2')} placeholder="Confirm your password" required />
                </div>
              </div>
              <div>
                <input type="checkbox" onClick={TogglePasswordShown} id="showpass" className="mr-2" />
                <label htmlFor="showpass">show password</label>
              </div>
              <div className="mdc-gender-details">
                <input type="radio" name="gender" id="mdc-dot-1" />
                <input type="radio" name="gender" id="mdc-dot-2" />
                <input type="radio" name="gender" id="mdc-dot-3" />
                <span className="mdc-gender-title">Gender</span>
                <div className="mdc-category">
                  <label htmlFor="mdc-dot-1" onClick={() => setInput({ ...input, "gender": "male" })}>
                    <span className="mdc-dot mdc-one"></span>
                    <span className="gender">Male</span>
                  </label>
                  <label htmlFor="mdc-dot-2" onClick={() => setInput({ ...input, "gender": "female" })}>
                    <span className="mdc-dot mdc-two"></span>
                    <span className="gender">Female</span>
                  </label>
                  <label htmlFor="mdc-dot-3" onClick={() => setInput({ ...input, "gender": "other" })}>
                    <span className="mdc-dot mdc-three"></span>
                    <span className="mdc-gender">Prefer not to say</span>
                  </label>
                </div>
              </div>
              <div className="mdc-button">
                <input type="submit" value="Register" />
              </div>
              <div className="mt-3 mdc-auth-links">
                <Link to="/auth-user-login">ALready have an account? sign in</Link>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>

  )
}

export default Register;
