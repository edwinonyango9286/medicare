import Cookies from "js-cookies";

export const IsAuthenticated = () =>{
    if(Cookies.hasItem("session_id")){
        return true;
    }else{
        return false;
    }
}

export const UserLogout = () =>{
    Cookies.removeItem("session_id");
}