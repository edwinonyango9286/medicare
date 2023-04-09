import React, { useEffect, useState } from 'react'
import Base from '../Base'
import { user_profile } from '../../query/user'

import "../../assets/bootstrap.min.css";
import "../../assets/responsive.css";
import "../../assets/typography.css";
import "../../assets/style.css";
import "../../assets/style1.css";
import { all_locations } from '../../query/location';
import axios from 'axios';
import Profilepic from "../../images/image.jpeg";

function Profile() {
    // State hooks
const [user, setUser] = useState({});
const [countyName, setCountyName] = useState('');
const [locations, setLocations] = useState([]);
const [activeDiv, setActiveDiv] = useState(1);
const [error, setError] = useState('');
const [gender, setGender] = useState('Male');
const [maritalStatus, setMaritalStatus] = useState('');
const [age, setAge] = useState('');
const [country, setCountry] = useState('');
const [address, setAddress] = useState('');

// Event handlers
const LoadUser = () => {
  user_profile().then((response) => {
    const user = response.data.user;
    const countyName = user.location.county.countyName;
    console.log(countyName);
    setCountyName(countyName);
    setUser(user);
  });
};

const LoadLocations = () => {
  all_locations().then((response) => {
    setLocations(response.data.locations);
  });
};

const handleClick = (divNumber) => {
  setActiveDiv(divNumber);
};

const getActiveClass = (divNumber) => {
  return activeDiv === divNumber ? 'active' : '';
};

const SubmitForm = (event) => {
  event.preventDefault();
  if (email.length === 0) {
    alert('Please fill out all fields');
  } else {
    Book.mutate();
  }
};

const handleChange = (event) => {
  const { value } = event.target;
  setMaritalStatus(value);
  console.log('Selected value:', value);
  // do something with the selected value
};

const handleSelectChange = (event) => {
  setMaritalStatus(event.target.value);
  console.log('Selected value:', event.target.value);
  // do something with the selected value
};

const handleAgeChange = (event) => {
  const { value } = event.target;
  setAge(value);
  console.log('Selected age range:', value);
  // do something with the selected age range
};

const handleCountryChange = (event) => {
  const { value } = event.target;
  setCountry(value);
  console.log('Selected country:', value);
  // do something with the selected country
};

const handleAddressChange = (event) => {
  setAddress(event.target.value);
};

const handleAddressBlur = () => {
  console.log('Address field blurred');
};

const handleLocationChange = (event) => {
  const subcountyCode = event.target.value;
  const selectedSubcounty = locations.find(
    (subcounty) => subcounty.subcountyCode === subcountyCode
  );
  // const selectedCounty = selectedSubcounty.county.countyName;
  setLocation(subcountyCode);
  setCounty(selectedCounty);
};

// useEffect hooks
useEffect(() => {
  LoadLocations();
  LoadUser();
}, []);

useEffect(() => {
  console.log(`Gender changed to ${gender}`);
}, [gender]);

  return (
    <Base>
        <div>
            
            <div className="container-fluid">
      <div className="row">
        <div className="col-lg-12">
          <div className="iq-card">
            <div className="iq-card-body p-0">
              <div className="iq-edit-list">
                <ul className="iq-edit-profile d-flex nav nav-pills">
                  <li className="col-md-3 p-0">
                    <a className={`nav-link ${getActiveClass(1)}`} data-toggle="pill" onClick={() => handleClick(1)}>
                      Personal Information
                    </a>
                  </li>
                  <li className="col-md-3 p-0">
                    <a className={`nav-link ${getActiveClass(2)}`} data-toggle="pill" onClick={() => handleClick(2)}>
                      Change Password
                    </a>
                  </li>
                  <li className="col-md-3 p-0">
                    <a className={`nav-link ${getActiveClass(3)}`} data-toggle="pill" onClick={() => handleClick(3)}>
                      Email and SMS
                    </a>
                  </li>
                  <li className="col-md-3 p-0">
                    <a className={`nav-link ${getActiveClass(4)}`} data-toggle="pill" onClick={() => handleClick(4)}>
                      Manage Contact Information
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
             <div className="col-lg-12">
                <div className="iq-edit-list-data">
                   <div className="tab-content">
                      {activeDiv === 1 &&  (<div className="tab-pane fade active show" id="personal-information" role="tabpanel">
                          <div className="iq-card">
                            <div className="iq-card-header d-flex justify-content-between">
                               <div className="iq-header-title">
                                  <h4 className="card-title">Personal Information</h4>
                               </div>
                            </div>
                            <div className="iq-card-body">
                               <form onSubmit={SubmitForm}>
                                  <div className="form-group row align-items-center">
                                     <div className="col-md-12">
                                        <div className="profile-img-edit">
                                           <img className="profile-pic" src={Profilepic}   alt="profile-pic" />
                                           <div className="p-image">
                                             <i className="ri-pencil-line upload-button"></i>
                                             <input className="file-upload"  type="file" accept="image/*" />
                                          </div>
                                        </div>
                                     </div>
                                  </div>
                                  <div className=" row align-items-center">
                                     <div className="form-group col-sm-6">
                                        <label htmlFor="fname">Full Name: {user?.username}</label>
                                        <input type="text" className="form-control" id="fname"  placeholder={user?.username}/>
                                     </div>
                                     
                                     <div className="form-group col-sm-6">
                                        <label htmlFor="uname">User Name: {user?.username}</label>
                                        <input type="text" className="form-control" id="uname" placeholder={user?.username} />
                                     </div>
                                     <div className="form-group col-sm-6">
                                        <label htmlFor="cname">City:{countyName}</label><br />
                                        <select 
                                          value={location} 
                                          onChange={handleLocationChange} 
                                          className="form-control" 
                                          id="exampleFormControlSelect1"
                                          >
                                          <option value="" >----------------------{}-------------------------</option>
                                          {locations.map((subcounty, index) => (
                                             <option key={index} value={subcounty?.subcountyCode}>{subcounty?.subcountyName}</option>
                                          ))}
                                          </select>
                                     </div>
                                     <div className="form-group col-sm-6">
                                       <label className="d-block">Gender:</label>
                                       <div className="custom-control custom-radio custom-control-inline">
                                       <input type="radio" id="customRadio6" name="customRadio1" className="custom-control-input"
                                          value="Male" checked={gender === 'Male'} onChange={(e) => setGender(e.target.value)} />
                                       <label className="custom-control-label" htmlFor="customRadio6"> Male </label>
                                       </div>
                                       <div className="custom-control custom-radio custom-control-inline">
                                       <input type="radio" id="customRadio7" name="customRadio1" className="custom-control-input"
                                          value="Female" checked={gender === 'Female'} onChange={(e) => setGender(e.target.value)} />
                                       <label className="custom-control-label" htmlFor="customRadio7"> Female </label>
                                       </div>
                                    </div>
                                    <div className="form-group col-sm-6">
                                       <label htmlFor="dob">Date Of Birth: {user?.dateOfBirth}</label>
                                       <input className="form-control" id="dob" type="date" max={new Date().toISOString().split("T")[0]} />
                                    </div>
                                    <div className="form-group col-sm-6">
                                       <label>Marital Status:</label>
                                       <select
                                       className="form-control"
                                       id="exampleFormControlSelect1"
                                       value={maritalStatus}
                                       onChange={handleSelectChange}
                                       onInput={handleChange}
                                       >
                                       <option>Single</option>
                                       <option>Married</option>
                                       <option>Widowed</option>
                                       <option>Divorced</option>
                                       <option>Separated</option>
                                       </select>
                                    </div>
                                    <div className="form-group col-sm-6">
                                       <label>Age Range</label>
                                       <select
                                          className="form-control"
                                          id="exampleFormControlSelect2"
                                          value={age}
                                          onChange={handleAgeChange}
                                          onInput={handleAgeChange}
                                       >
                                          <option>12-18</option>
                                          <option>19-32</option>
                                          <option>33-45</option>
                                          <option>46-62</option>
                                          <option>63 &gt; </option>
                                       </select>
                                       </div>
                                       <div className="form-group col-sm-6">
                                       <label>Country:</label>
                                       <select
                                          className="form-control"
                                          id="exampleFormControlSelect3"
                                          value={country}
                                          onChange={handleCountryChange}
                                          onInput={handleCountryChange}
                                       >
                                          <option>Kenya</option>
                                          <option>Uganda</option>
                                          <option>Tanzania</option>
                                          <option>Cameroon</option>
                                          <option>South Africa</option>
                                       </select>
                                       </div>
                                       <div className="form-group col-sm-12">
                                          <label>Address:</label>
                                          <textarea
                                          className="form-control"
                                          name="address"
                                          value={address}
                                          onChange={handleAddressChange}
                                          onBlur={handleAddressBlur}
                                          >
                                          Hello there! If you're from Kisumu, I'd like to extend a warm greeting to you. Kisumu is a beautiful city located in western Kenya, known for its stunning sunsets over Lake Victoria and vibrant culture. I hope you're doing well and enjoying all the wonderful things that Kisumu has to offer. Wishing you all the best!
                                          </textarea>
                                       </div>
                                  </div>
                                  <button type="submit" id="btn-submit" className="btn btn-primary ">Submit</button>
                                  {/*  */}
                               </form>
                            </div>
                         </div>
                          </div> )}
                      {activeDiv === 2 &&( <div className="tab-pane fade  active show" id="chang-pwd" role="tabpanel">
                          <div className="iq-card">
                            <div className="iq-card-header d-flex justify-content-between">
                               <div className="iq-header-title">
                                  <h4 className="card-title">Change Password</h4>
                               </div>
                            </div>
                            <div className="iq-card-body">
                               <form>
                                  <div className="form-group">
                                     <label htmlFor="cpass">Current Password:</label>
                                     <a href="javascripe:void();" className="float-right">Forgot Password</a>
                                        <input type="Password" className="form-control" id="cpass"  />
                                     </div>
                                  <div className="form-group">
                                     <label htmlFor="npass">New Password:</label>
                                     <input type="Password" className="form-control" id="npass"  />
                                  </div>
                                  <div className="form-group">
                                     <label htmlFor="vpass">Verify Password:</label>
                                        <input type="Password" className="form-control" id="vpass"  />
                                  </div>
                                  <button type="submit" id="btn-submit" className="btn btn-primary mr-2">Submit</button>
                                  
                               </form>
                            </div>
                         </div>
                      </div> )}
                    {  activeDiv === 3 && (<div className="tab-pane fade active show" id="emailandsms" role="tabpanel">
                          <div className="iq-card">
                             <div className="iq-card-header d-flex justify-content-between">
                                <div className="iq-header-title">
                                   <h4 className="card-title">Email and SMS</h4>
                                </div>
                             </div>
                             <div className="iq-card-body">
                                <form>
                                   <div className="form-group row align-items-center">
                                      <label className="col-md-3" htmlFor="emailnotification">Email Notification:</label>
                                      <div className="col-md-9 custom-control custom-switch">
                                         <input type="checkbox" className="custom-control-input" id="emailnotification" />
                                         <label className="custom-control-label" htmlFor="emailnotification"></label>
                                      </div>
                                   </div>
                                   <div className="form-group row align-items-center">
                                      <label className="col-md-3" htmlFor="smsnotification">SMS Notification:</label>
                                      <div className="col-md-9 custom-control custom-switch">
                                         <input type="checkbox" className="custom-control-input" id="smsnotification" />
                                         <label className="custom-control-label" htmlFor="smsnotification"></label>
                                      </div>
                                   </div>
                                   <div className="form-group row align-items-center">
                                      <label className="col-md-3" htmlFor="npass">When To Email</label>
                                      <div className="col-md-9">
                                         <div className="custom-control custom-checkbox">
                                            <input type="checkbox" className="custom-control-input" id="email01" />
                                            <label className="custom-control-label" htmlFor="email01">You have new notifications.</label>
                                         </div>
                                   
                                       
                                      </div>
                                   </div>
                           
                                   <button type="submit" id="btn-submit" className="btn btn-primary mr-2">Submit</button>
                                   
                                </form>
                             </div>
                          </div>
                       </div> )}
                     {activeDiv === 4 && (<div className="tab-pane fade active show" id="manage-contact" role="tabpanel">
                          <div className="iq-card">
                            <div className="iq-card-header d-flex justify-content-between">
                               <div className="iq-header-title">
                                  <h4 className="card-title">Manage Contact</h4>
                               </div>
                            </div>
                            <div className="iq-card-body">
                               <form>
                                  <div className="form-group">
                                     <label htmlFor="cno">Contact Number:</label>
                                     <input type="text" className="form-control" id="cno" />
                                  </div>
                                  <div className="form-group">
                                     <label htmlFor="email">Email:</label>
                                     <input type="text" className="form-control" id="email" />
                                  </div>
                                  <div className="form-group">
                                     <label htmlFor="url">Secondary Contact : </label>
                                     <input type="text" className="form-control" id="url" />
                                  </div>
                                  <button type="submit" id="btn-submit" className="btn btn-primary mr-2">Submit</button>
                                  
                               </form>
                            </div>
                         </div>
                      </div>) }
                   </div>
                </div>
             </div>
          </div>
       </div>
        </div>
    </Base>
  )
}

export default Profile