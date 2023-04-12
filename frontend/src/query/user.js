import axios from 'axios'
import Cookies from 'js-cookies'

class BACKEND_REQUEST{
    constructor(url=null,data=null){
        this.url = url;
        this.data = data;
    }

    get(){
        return axios.get(
            `http://localhost:8000/${this.url}`,
            this.data
        )
    }

    post(){
        return axios.post(
            `http://localhost:8000/${this.url}`,
            this.data
        )
    }
}



class AUTH_BACKEND_REQUEST{
    constructor(url,data=null){
        this.url = url;
        this.data = data;
    }

    get(){
        return axios.get(
            `http://localhost:8000/${url}`,
            data,
            {
                headers : {
                    'Authorization' : `Bearer ${session_id}`
                }
            }
        )
    }

    post(){
        return axios.post(
            `http://localhost:8000/${url}`,
            data,
            {
                headers : {
                    'Authorization' : `Bearer ${session_id}`
                }
            }
        )
    }
}

export const BACKEND_URL = "http://localhost:8000/api/"

export const session_id = Cookies.getItem("session_id")

export const makeUrl = (url) =>{
    return BACKEND_URL + url
}


export const user_register = (data) =>{
    let formData = new FormData();
    for(const name in data){
        formData.append(name,data[name])
    }

    return new BACKEND_REQUEST("user/register/",formData).post()

    return axios.post(
        makeUrl("user/register/"),
        formData
    )
}

export const user_login = (data) =>{
    let formData = new FormData();
    for(const name in data){
        formData.append(name,data[name])
    }

    return axios.post(
        makeUrl("user/login/"),
        formData
    )
}

export const user_profile = () =>{
    console.log(session_id)
    return axios.get(
        makeUrl("user/profile/"),
        {
            headers : {
                'Authorization' : `Token ${session_id}`
            }
        }
    )
}