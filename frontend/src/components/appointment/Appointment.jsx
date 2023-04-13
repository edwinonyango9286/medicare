import "../../assets/style.css";
import React, { useEffect, useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import Base from "../Base";
import { make_appointment } from "../../query/appointment";
import { get_doctors } from "../../query/user";


const Appointment = () => {

   const navigate = useNavigate();

   const [input, setInput] = useState({
      doctor : "",
      appointmentDate: "",
      description: ""
   })

   const { doctor, appointmentDate, description } = input;
   const UpdateInput = (name) => (event) => {
      setInput({ ...input, [name]: event.target.value });
   }

   const [doctors,setDoctors] = useState([])
   const LoadDoctors = () =>{
      get_doctors()
      .then(response => {
         setDoctors(response.data.doctors)
      })
   }

   const [error, setError] = useState("");

   const SubmitForm = (event) => {
      event.preventDefault();
      make_appointment(input)
      .then(response => {
         if(response.data.success){
            alert(response.data.message)
            navigate(`/appointment/${response.data.id}/view/`)
         }else{
            setError(response.data.message)
         }
      })
   }

   useEffect(() => {
      LoadDoctors()
   },[])

   return (
      <Base>
         <div className="row" id='row'>
            <div className="col-sm-12 col-lg-6" >
               <div className="iq-card">
                  <div className="iq-card-header d-flex justify-content-between">
                     <div className="iq-header-title">
                        <h4 className="card-title">Book Appointment</h4>
                     </div>
                        <Link className="button px-3 is-link" to="/appointment/all">View Appointment History</Link>
                  </div>
                  <div className="iq-card-body">
                     <p>Fill in the form below with the patients records needed</p>
                     <form onSubmit={SubmitForm}>
                        {error && (<div className="my-2 has-text-danger">{error}!!</div>)}
                        <div className="form-group">
                           <label htmlFor="exampleInputEmail3">Doctor </label>
                           <select onChange={UpdateInput("doctor")} className="form-select">
                              <option>----------------------------</option>
                              {doctors.map((doc,index) => (
                                 <option key={index} value={doc?.id}>{doc?.staff?.username} - {doc?.proffesion?.type}</option>
                              ))}
                           </select>
                        </div>

                        <div className="form-group">
                           <label>Date and Time Input</label>
                           <input required type="datetime-local" className="form-control"
                              value={appointmentDate} onChange={UpdateInput('appointmentDate')} />
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