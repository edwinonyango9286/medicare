import { useQuery } from "react-query";
import { GraphQLClient} from "graphql-request";
import Cookies from "js-cookie"

export const API_URL = `http://localhost:8000/api`;
export const MEDIA_URL = `http://localhost:8000/media`;

export const backend = new GraphQLClient(API_URL,{})

export const ImageBackend = new GraphQLClient(API_URL,{
  headers: {
      ContentType:"multipart/form-data"
  }
});


export const AuthBackend = new GraphQLClient(API_URL, {
  headers: {
    Authorization: `JWT ${Cookies.get('session_id')}`,
  }
});

