import axios from 'axios'
import Cookies from 'js-cookies'

export const BACKEND_URL = "http://localhost:8000/api/"

export const session_id = Cookies.getItem("session_id")

class BACKEND {
    constructor() {
      this.token = Cookies.hasItem("session_id") ? Cookies.getItem("session_id") : "";
      this.axiosInstance = axios.create({
        headers: {
          Authorization: `Token ${this.token}`
        }
      });

  
      this.axiosInstance.interceptors.response.use(
        response => response,
        error => {
          if (error.response && error.response.status === 401) {
            console.log('Authorization error');
          }
          return Promise.reject(error);
        }
      );
    }
  
    get(url, config = {}) {
      return this.axiosInstance.get(BACKEND_URL+url);
    }
  
    post(url, data, config = {}) {
      return this.axiosInstance.post(BACKEND_URL+url, data);
    }
  }

export const BACKEND_REQUEST = new BACKEND();

export const user_register = (data) =>{
    let formData = new FormData();
    for(const name in data){
        formData.append(name,data[name])
    }

    return new BACKEND_REQUEST.post(
        "user/register/",
        formData
    )
}

export const user_login = (data) =>{
    let formData = new FormData();
    for(const name in data){
        formData.append(name,data[name])
    }

    return BACKEND_REQUEST.post(
        "user/login/",
        formData
    )
}

export const user_profile = () =>{
    console.log(session_id)
    return BACKEND_REQUEST.get(
        "user/profile/"
    )
}

export const update_profile = (data) =>{
    let formData = new FormData();
    for(const name in data){
        formData.append(name,data[name])
    }

    return BACKEND_REQUEST.post(
        "user/update-profile/",
        formData
    )
}

export const update_password = (data) =>{
    let formData = new FormData();
    for(const name in data){
        formData.append(name,data[name])
    }

    return BACKEND_REQUEST.post(
        "user/change-password/",
        formData
    )
}

export const get_doctors = () =>{
  return BACKEND_REQUEST.get("user/doctors/all/")
}