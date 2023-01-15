import { useQuery } from "react-query";
import { GraphQLClient, gql } from "graphql-request";

const API_URL = `http://192.168.48.206:8000/api`;

const backend = new GraphQLClient(API_URL,{})

const AuthBackend = new GraphQLClient(API_URL, {
  headers: {
    Authorization: `Bearer ${process.env.API_KEY}`
  }
});

// export function useGetPosts() {
//   return useQuery("get-posts", async () => {
//     const { getPostList } = await graphQLClient.request(gql`
//       query {
//         getPostList {
//           items {
//             _id
//             title
//             description
//             content
//           }
//         }
//       }
//     `);
//     return getPostList;
//   });
// }

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
