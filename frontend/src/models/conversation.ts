import { MessageModel } from "./message";
import { ChatUserModel } from "./user";

export interface ConversationModel {
  id: string;
  name: string;
  lastMessage: MessageModel | null;
  otherUser: ChatUserModel;
}