import { MEDIA_URL } from '../backend'
import { useGetUserData } from '../query/user'
import Base from './Base'
import { BeakerIcon,UserPlusIcon } from '@heroicons/react/24/solid'

function Home() {
  var UserData = {}
  const {data:useUserData} = useGetUserData()
  
  if(useUserData){
    UserData = useUserData.userData
  }
  return (
    <Base>
        {useUserData && (
          <div className="flex flex-row text-white">
            <div className="basis-1/3  shadow-2xl flex flex-row">
              <div className='basis-1/2'>
                <div className="flex flex-col">
                  <img src={`${MEDIA_URL}/${UserData.image}`} className="shadow-3xl w-max" alt="" />
                  <div className='p-2 bg-gradient-to-bl cursor-not-allowed transition ease-in-out hover:bg-gradient-to-tr duration-500 from-violet-700 to-sky-500 text-center'>
                    {UserData.lastName} {UserData.firstName} <br /> {UserData.email}
                  </div>
                </div>
              </div>
              <div className="basis-1/2 p-5 bg-gradient-to-tr from-violet-800 to-sky-500">

                <div className="my-2">
                  <p className="font-semibold">DATE OF BIRTH:</p>
                  <p className="px-5">{UserData.dateOfBirth}</p>
                </div>

                <div className="my-2">
                  <p className="font-semibold">GENDER:</p>
                  <p className="px-5">{UserData.gender}</p>
                </div>

                <div className="my-2">
                  <p className="font-semibold">SUB COUNTY:</p>
                  <p className="px-5">{UserData.location.subcountyName}</p>
                </div>

                <div className="my-2">
                  <p className="font-semibold">COUNTY:</p>
                  <p className="px-5">{UserData.location.county.countyName}</p>
                </div>

              </div>
            </div>
            <div className='px-3'>
              <div className="flex flex-row w-max">
                <button className='medicare-action-button'>
                  <UserPlusIcon className='h-6 w-6 mr-3' /> Add Appointment
                </button>
                <button className='medicare-action-button'>
                  <UserPlusIcon className='h-6 w-6 mr-3' /> Add Appointment
                </button>
                <button className='medicare-action-button'>
                  <UserPlusIcon className='h-6 w-6 mr-3' /> Add Appointment
                </button>
                <button className='medicare-action-button'>
                  <UserPlusIcon className='h-6 w-6 mr-3' /> Add Appointment
                </button>
              </div>
            </div>
          </div>
        )}
    </Base>
  )
}

export default Home