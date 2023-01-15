import Base from "../Base";
import { IsAuthenticated } from "../../libs/user";

function Profile() {

  return (
    <Base>
        {IsAuthenticated ? "auth" : "not auth"}
    </Base>
  )
}

export default Profile