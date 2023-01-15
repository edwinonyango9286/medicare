import { AuthBackend } from "../backend";
import { useQuery } from "react-query";
import { gql } from "graphql-request";

export const useGetUserData = () =>{
		const UserDataQuery = gql`
		query{
			userData{
				firstName
				lastName
				email
				dateOfBirth
				nationalId
				phoneNumber
				image
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