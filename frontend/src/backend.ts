import { useQuery } from "react-query";
import { GraphQLClient, gql } from "graphql-request";

const API_URL = `http://192.168.48.206:8000/api`;

export const backend = new GraphQLClient(API_URL,{})

export const AuthBackend = new GraphQLClient(API_URL, {
  headers: {
    Authorization: `Bearer process.env.API_KEY`
  }
});

// export function useGetPost(postId) {
//   return useQuery(["get-post", postId], async () => {
//     const { getPost } = await graphQLClient.request(
//       gql`
//         query getPost($postId: ID!) {
//           getPost(_id: $postId) {
//             _id
//             content
//             description
//             title
//           }
//         }
//       `,
//       { postId }
//     );
//     return getPost;
//   });
// }
