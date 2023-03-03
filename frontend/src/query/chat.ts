import { AuthBackend } from "../backend";
import { useQuery } from "react-query";
import { gql } from "graphql-request";

export const useGetConversations = () => {
	const ConversationQuery = gql`
		query{
			conversations{
                id
                name
                lastMessage{
                    id
                    sender{
                        id
                    }
                    receiver{
                        id
                    }
                    message
                    createdAt
                }
                otherUser{
                    id
                    firstName
                    lastName
                    email
                    imageUrl
                }
            }
		}
	`;
		
	return useQuery("ActiveConversations",async () =>{
		const LoadConversations = await AuthBackend.request(ConversationQuery);
		return LoadConversations;
	});
}

export const useGetConversationByName = (conversation_name:string | undefined) => {
	const ConversationQuery = gql`
		query{
			conversationByName(conversationName:"${conversation_name}"){
                id
                name
                lastMessage{
                    id
                    sender{
                        id
                    }
                    receiver{
                        id
                    }
                    message
                    createdAt
                }
                otherUser{
                    id
                    firstName
                    lastName
                    email
                    imageUrl
                }
            }
		}
	`;
		
	return useQuery("ActiveConversations",async () =>{
		const LoadConversations = await AuthBackend.request(ConversationQuery);
		return LoadConversations;
	});
}

export const useGetMessages = (conversation_name: string | undefined) =>{
    const MessagesQuery = gql`
        query{
            messages(conversationName:"${conversation_name}"){
                id
                sender{
                    id
                    firstName
                    lastName
                }
                receiver{
                    id
                    firstName
                    lastName
                }
                message
                createdAt
                read
            }
        }
    `;

	return useQuery(`${conversation_name}`,async () =>{
		const LoadMessages = await AuthBackend.request(MessagesQuery);
		return LoadMessages;
	});
}