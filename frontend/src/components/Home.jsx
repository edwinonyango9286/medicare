import React from 'react'
import Base from './Base'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <Base>
    <div>
      <p className="is-size-4">Services Offered</p>
      <hr />
      <div className="columns is-tablet is-multiline">
        <div className="column is-3-desktop p-2">
          <Link to="/appointment" className="box link-card">
            <p className="is-size-5">Book Appointment</p>
            <hr />
            <p>Book an appointment with your preffered doctor to access prioritized service</p>
            <div className="d-flex is-justify-content-end">
              <button className="button is-link">Book Now</button>
            </div>
          </Link>
        </div>
        <div className="column is-3-desktop p-2">
          <Link to="/appointment/all" className="box link-card">
            <p className="is-size-5">View Appointment History</p>
            <hr />
            <p>View records of your previous appointment including the cancelled and active</p>
            <div className="d-flex is-justify-content-end">
              <button className="button is-link">View History</button>
            </div>
          </Link>
        </div>
        <div className="column is-3-desktop p-2">
          <Link to="" className="box link-card">
            <p className="is-size-5">View Pending Bills</p>
            <hr />
            <p>Get access to all records of bills that have not been paid or payment is yet to be verified</p>
            <div className="d-flex is-justify-content-end">
              <button className="button is-link">View</button>
            </div>
            </Link>
        </div>
        <div className="column is-3-desktop p-2">
          <Link to="" className="box link-card">
            <p className="is-size-5">View Billing History</p>
            <hr />
            <p>View all past transactions accoding to services offered in each appoinments,in patient or out patient session</p>
            <div className="d-flex is-justify-content-end">
              <button className="button is-link">View</button>
            </div>
          </Link>
        </div>
        <div className="column is-3-desktop p-2">
          <Link to="" className="box link-card">
            <p className="is-size-5">View Billing History</p>
            <hr />
            <p>View all past transactions accoding to services offered in each appoinments,in patient or out patient session</p>
            <div className="d-flex is-justify-content-end">
              <button className="button is-link">View</button>
            </div>
          </Link>
        </div>
      </div>
      </div>
      <div className='mt-4'>
        <span className="is-size-4">Recent Appointments</span>
        <hr />
      </div>
    </Base>
  )
}

export default Home