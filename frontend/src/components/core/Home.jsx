import Base from './Base';
import { GlobalUserData, IsAuthenticated} from "../libs/user";

function Home(){
    const userdata = GlobalUserData()

    return(
        <Base>
            {IsAuthenticated &&(
                <div className="flex flex-row self-start min-w-full text-slate-900">
                    <div className="basis-1/3 p-2 flex flex-row">
                        <div className="basis-1/3 mx-1  float-left">
                            <img src={userdata.image} alt="" className="rounded-lg border-slate-900 border-2" />
                        </div>
                        <div className="basis-2/3 mx-1 text-start">
                            <table>
                                <tbody>
                                    <tr>
                                        <th className="p-1 text-start">NAME</th><td>: {userdata.firstName} {userdata.lastName}</td>
                                    </tr>
                                    <tr>
                                        <th className="p-1 text-start">AGE</th><td>: {userdata.age}</td>
                                    </tr>
                                    <tr>
                                        <th className="p-1 text-start">EMAIL</th><td>: {userdata.email}</td>
                                    </tr>
                                    <tr>
                                        <th className="p-1 text-start">PHONE NUMBER</th><td>: {userdata.phoneNumber}</td>
                                    </tr>
                                    <tr>
                                        <th className="p-1 text-start">GENDER</th><td>: {userdata.gender}</td>
                                    </tr>
                                    <tr>
                                        <th className="p-1 text-start">COUNTY</th><td>: {userdata.countyName}</td>
                                    </tr>
                                    <tr>
                                        <th className="p-1 text-start">CONSTITUENCY</th><td>: {userdata.subcountyName}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}
        </Base>
    )
}

export default Home;
