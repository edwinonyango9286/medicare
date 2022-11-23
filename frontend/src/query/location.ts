import { useQuery } from "react-query";
import { GraphQLClient, gql } from "graphql-request";
import { backend } from '../backend';

export function useGetLocations() {
    return useQuery("get-posts", async () => {
      const { getLocationList } = await backend.request(gql`
        query {
          allLocations {
            countyCode
          }
        }
      `);
      return getLocationList;
    });
  }