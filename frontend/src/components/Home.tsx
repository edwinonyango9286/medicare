import React from 'react';
import { useQuery } from "react-query";
import {request,gql} from 'graphql-request';
import Base from './Base';
import { backend } from '../backend'


function Home(){

    const GetAllLocations = gql`
        query{
            allLocations{
                countyCode
                countyName
                constituencyCode
                constituencyName
            }
        }
    `;

    const LoadAllLocations = () => backend.request(GetAllLocations);

    const {data,error,isLoading,isSuccess} = useQuery("AllLocations",LoadAllLocations);

    if(isLoading) return <div>Loading.....</div>

    if(error) return <div>Something went wrong!</div>

    return(
        <Base>
            <div className="relative text-slate-900">
                {isSuccess &&(
                    <select>
                        {data.allLocations.map((location,index)=>(
                            // <div key={index}>
                            //     {location.countyCode}
                            //     {location.countyName}
                            //     {location.constituencyCode}
                            //     {location.constituencyName}
                            // </div>
                            <option key={index} value={location.constituencyCode}>{location.constituencyName}</option>
                        ))}
                    </select>
                )}
            </div>
        </Base>
    )
}

export default Home;
