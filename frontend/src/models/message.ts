import { ChatUserModel } from "./user";

export interface MessageModel {
  id: string;
  sender : ChatUserModel;
  receiver : ChatUserModel;
  message : string;
  createdAt : string;
}