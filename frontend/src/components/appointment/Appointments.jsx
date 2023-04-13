import React, { useEffect, useState } from 'react'
import Base from '../Base'
import { all_appointments, cancel_appointment } from '../../query/appointment'
import { Link } from 'react-router-dom'

function Appointments() {
    const [appointments, setAppointments] = useState([])
    const LoadAppointments = () => {
        all_appointments()
            .then(response => {
                setAppointments(response.data.appointments)
            })
    }

    const CancelAppointment = (pk) => (event) => {
        cancel_appointment(pk)
            .then(response => {
                LoadAppointments()
            })
    }

    useEffect(() => {
        LoadAppointments()
    }, [])
    return (
        <Base>
            <div className="table-responsive">
                <table className="table is-hoverable is-striped">
                    <thead>
                        <tr>
                            <th>Doctor</th><th>Date</th><th>Time</th><th>Description</th><th>Status</th><th>Quick Links</th>
                        </tr>
                    </thead>
                    <tbody>
                        {appointments.map((appointment, index) => (
                            <tr key={index}>
                                <td className='d-flex flex-row'>
                                    <img src={"http://localhost:8000" + appointment?.doctor?.staff.image} className='mx-2' width={70} alt="" />
                                    <span className='d-flex flex-column'>
                                        <span>{appointment?.doctor?.staff.username}</span>
                                        <i>{appointment?.doctor?.staff.email}</i>
                                    </span>
                                </td>
                                <td>{new Date(appointment?.appointmentDate).toLocaleString('default', { month: "short", day: "2-digit", year: "numeric" })}</td>
                                <td>{new Date(appointment?.appointmentDate).toLocaleString('default', { hour: "2-digit", minute: "2-digit", hour12: true })}</td>
                                <td>{appointment?.description}</td>
                                {appointment?.isActive ?
                                    <td className='has-text-success'>Active</td> : <td className='has-text-danger'>Expired</td>
                                }
                                <td>
                                    {appointment?.isActive && (
                                        <Link to="" onClick={CancelAppointment(appointment?.id)} className='has-text-danger mx-2'>Cancel</Link>
                                    )}
                                    <Link to={`/appointment/${appointment?.id}/view`} className='mx-2 has-text-link'>View</Link>
                                    <Link to={`/appointment/${appointment?.id}/view`} className='mx-2 has-text-primary'>View Bill</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Base>
    )
}

export default Appointments