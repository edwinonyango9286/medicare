import Cookies from "js-cookie"

export const IsAuthenticated = Cookies.get('session_id')!=null ? true : false;