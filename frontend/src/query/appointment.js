import { BACKEND_REQUEST } from './user'

export const make_appointment = (data) =>{
    let formData = new FormData();
    for(const name in data){
        formData.append(name,data[name])
    }

    return BACKEND_REQUEST.post(
        "appointment/add/",
        formData
    )
}

export const all_appointments = () =>{
    return BACKEND_REQUEST.get("appointment/all/")
}

export const get_appointment = (pk) =>{
    return BACKEND_REQUEST.get(`appointment/${pk}/view/`)
}

export const cancel_appointment = (pk) =>{
    return BACKEND_REQUEST.get(`appointment/${pk}/cancel/`)
}