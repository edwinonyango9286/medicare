import Cookies from "ts-cookies";

export const IsAuthenticated = () =>{
    console.log(Cookies.get("session_id"))
    if(Cookies.get("session_id") !== undefined){
        return true;
    }else{
        return false;
    }
}

export const UserLogout = () =>{
    Cookies.remove("session_id");
}