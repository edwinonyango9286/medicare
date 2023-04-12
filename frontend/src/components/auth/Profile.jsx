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
const [user, setUser] = useState({});

const [activeDiv, setActiveDiv] = useState(1);
const [error, setError] = useState(false);
// Event handlers
const LoadUser = () => {
  user_profile().then((response) => {
    const user = response.data.user;
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

const SubmitForm = (event) =>{
    event.preventDefault();
}

// useEffect hooks
useEffect(() => {
  LoadLocations();
  LoadUser();
}, []);

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
                                           <img className="profile-pic" src={"http://localhost:8000"+user?.image}   alt="profile-pic" />
                                           <div className="p-image">
                                             <i className="ri-pencil-line upload-button"></i>
                                             <input className="file-upload"  type="file" accept="image/*" />
                                          </div>
                                        </div>
                                     </div>
                                  </div>
                                  <div className=" row align-items-center">
                                     <div className="form-group col-sm-6">
                                        <label htmlFor="email">Email</label>
                                        <input type="email" className="form-control" id="email"  placeholder={user?.email}/>
                                     </div>
                                     
                                     <div className="form-group col-sm-6">
                                        <label htmlFor="username">Full Name</label>
                                        <input type="text" className="form-control" id="username" value={user?.username} disabled/>
                                     </div>


                                     <div className="form-group col-sm-6">
                                        <label htmlFor="phoneNumber">Phone Number</label>
                                        <input type="number" className="form-control" id="phoneNumber" placeholder={user?.phoneNumber} />
                                     </div>

                                     <div className="form-group col-sm-6">
                                        <label htmlFor="cname">Location</label><br />
                                        <input type="text" className="form-control" value={user?.location?.subcountyName+" , "+user?.location?.county.countyName} disabled/>
                                     </div>
                                     <div className="form-group col-sm-6">
                                       <label className="d-block">Gender:</label>
                                        <input type="text" className="form-control" id="username" value={user?.gender} disabled/>
                                    </div>
                                    <div className="form-group col-sm-6">
                                       <label htmlFor="dob">Date Of Birth:</label>
                                       <input className="form-control" id="dob" type="date" value={user?.dateOfBirth} disabled />
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