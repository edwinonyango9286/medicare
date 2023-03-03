import { AuthBackend } from "../backend";
import { useQuery } from "react-query";
import { gql } from "graphql-request";

export const useGetUserData = () =>{
	const UserDataQuery = gql`
		query{
			userData{
				id
				firstName
				lastName
				email
				dateOfBirth
				nationalId
				phoneNumber
				imageUrl
				gender
				location{
					county{
						countyName
						countyCode
					}
					subcountyName
					subcountyCode
				}
			}
		}
	`;
	
	return useQuery("UserData",async () =>{
		const LoadProfile = await AuthBackend.request(UserDataQuery);
		return LoadProfile;
	});

}

export const useGetDoctors = () => {
	const DoctorQuery = gql`
		query{
			doctors(groupId:"1"){
				staff{
					id
					firstName
					lastName
					email
					phoneNumber
					image
				}
				hospital{
					name
					location{
						county{
							countyName
							countyCode
						}
						subcountyName
						subcountyCode
					}
				}
				proffesion{
					type
				}
			}
		}
	`;
		
	return useQuery("AllDOctors",async () =>{
		const LoadDoctors = await AuthBackend.request(DoctorQuery);
		return LoadDoctors;
	});
}