import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { cancel_appointment, get_appointment } from '../../query/appointment';
import Base from '../Base';

function ViewAppointment() {
    const params = useParams();
    const [appointment, setAppointment] = useState({})

    const LoadAppointment = () => {
        get_appointment(params.pk)
            .then(response => {
                setAppointment(response.data.appointment)
            })
    }



    const CancelAppointment = (event) => {
        cancel_appointment(params.pk)
            .then(response => {
                LoadAppointment()
            })
    }

    useEffect(() => {
        LoadAppointment()
    }, [])

    return (
        <Base>
            <div className="columns is-desktop is-multiline">
                <div className='column is-6 p-3'>
                    <div className="box">
                        <p className='is-size-3'>Doctor</p>
                        <hr />
                        <img src={"http://localhost:8000" + appointment?.doctor?.staff.image} alt="" className='mx-2' width={200} />
                        <p className='is-flex is-flex-direction-column is-size-5'>
                            <span>{appointment?.doctor?.staff.username}</span>
                            <i>{appointment?.doctor?.staff.email}</i>
                            <i>{appointment?.doctor?.proffesion.type}</i>
                        </p>
                    </div>
                </div>
                <div className='column is-6 p-3'>
                    <div className="box">
                        <p className='is-size-3'>Appointment Details</p>
                        <hr />
                        <p className='is-flex is-flex-direction-column is-size-5'>
                            <span>Appointment Date</span>
                            <i className='has-text-link'>{new Date(appointment?.appointmentDate).toLocaleString('default', { month: "short", day: "2-digit", year: "numeric" })}</i>
                        </p>
                        <hr />
                        <p className='is-flex is-flex-direction-column is-size-5'>
                            <span>Appointment Time</span>
                            <i className='has-text-link'>{new Date(appointment?.appointmentDate).toLocaleString('default', { hour12: true, hour: "2-digit", minute: "2-digit" })}</i>
                        </p>
                        <hr />
                        <p className='is-flex is-flex-direction-column is-size-5'>
                            <span>Description</span>
                            <i className='has-text-link'>{appointment?.description}</i>
                        </p>
                        <hr />
                    </div>
                </div>
                {appointment?.isActive && (
                    <div className='column p-3'>
                        <button className="button is-danger px-3" onClick={CancelAppointment}>Cancel Appointment</button>
                    </div>
                )}
            </div>
        </Base>
    )
}

export default ViewAppointment;