// import "../../assets/responsive.css";
import "../../assets/style.css";
import React, { useEffect, useState } from "react";
import { IsAuthenticated } from '../../libs/user';
import { useNavigate } from "react-router-dom";
import Base from "../Base";


const Appointment = () => {

   const navigate = useNavigate();

   const [input, setInput] = useState({
      name: "",
      email: "",
      telephone: "",
      datetime: "",
      description: ""
   })

   const { name, email, telephone, datetime, description } = input;
   const UpdateInput = (name) => (event) => {
      setInput({ ...input, [name]: event.target.value });
   }

   const [error, setError] = useState("");

   const SubmitForm = (event) => {
      event.preventDefault();

   }
   const [proceed, setProceed] = useState(false);
   useEffect(() => {
      if (IsAuthenticated()) {
         navigate("/")
      } else {
         setProceed(true);
      }
   })

   return (
      <Base>
         <div className="row" id='row'>
            <div className="col-sm-12 col-lg-6" >
               <div className="iq-card">
                  <div className="iq-card-header d-flex justify-content-between">
                     <div className="iq-header-title">
                        <h4 className="card-title">Book Appointment</h4>
                     </div>
                  </div>
                  <div className="iq-card-body">
                     <p>Fill in the form below with the patients records needed</p>
                     <form onSubmit={SubmitForm}>
                        {error && (<div className="my-2 has-text-danger">{error}!!</div>)}
                        <div className="form-group">
                           <label htmlFor="exampleInputText1">Patients name </label>
                           <input required type="text" className="form-control" id="exampleInputText1"
                              value={name} onChange={UpdateInput('name')} placeholder="Enter Name" />
                        </div>
                        <div className="form-group">
                           <label htmlFor="exampleInputEmail3">Patient's Email </label>
                           <input required type="email" className="form-control" id="exampleInputEmail3"
                              value={email} onChange={UpdateInput('email')} placeholder="Enter Email" />
                        </div>

                        <div className="form-group">
                           <label htmlFor="exampleInputphone">Patient's Teliphone Number</label>
                           <input required type="tel" className="form-control" id="exampleInputphone"
                              value={telephone} onChange={UpdateInput('telephone')} />
                        </div>

                        <div className="form-group">
                           <label htmlFor="exampleInputdatetime">Date and Time Input</label>
                           <input required type="datetime-local" className="form-control" id="exampleInputdatetime"
                              value={datetime} onChange={UpdateInput('datetime')} />
                        </div>
                        <div className="form-group">
                           <label htmlFor="exampleFormControlTextarea1">Brief reason description</label>
                           <textarea required className="form-control" id="exampleFormControlTextarea1"
                              value={description} onChange={UpdateInput('description')}></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary" id='btn-submit'>Submit</button>
                     </form>
                  </div>
               </div>

            </div>


         </div>
      </Base>
   )
}

export default Appointment;