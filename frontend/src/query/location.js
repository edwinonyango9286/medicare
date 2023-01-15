import { useQuery } from "react-query";
import { GraphQLClient, gql } from "graphql-request";
import { backend } from '../backend';
import { getCookie } from "typescript-cookie";

export function useGetCounties() {
  return useQuery("all-counties", async () => {
    const getLocationList = await backend.request(gql`
      query {
        counties {
          countyCode
          countyName
        }
      }
    `);
    return getLocationList;
  });
}

export function useGetSubcounties() {
  return useQuery("allSubcounties", async () => {
    const getLocationList = await backend.request(gql`
      query {
        subcounties {
          subcountyCode
          subcountyName
          county{
            countyCode
            countyName
          }
        }
      }
    `);
    return getLocationList;
  });
}

export function useGetCountySubcounties() {
  return useQuery("countySubcounties", async () => {
    const getLocationList = await backend.request(gql`
      query {
        countySubcounties(countyCode:"${getCookie('usercounty')}") {
          subcountyCode
          subcountyName
          county{
            countyCode
            countyName
          }
        }
      }
    `);
    return getLocationList;
  });
}