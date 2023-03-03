import { DefaultSubCountyProps, locationModel } from "./location"

export const DefaultUserProps = {
    firstName : "",
    lastName : "",
    email : "",
    nationalId : "",
    phoneNumber : "",
    gender : "",
    location : DefaultSubCountyProps,
    imageUrl : "",
    dateOfBirth : ""
}

export interface UserModel {
    firstName : string
    lastName : string
    email : string
    nationalId : string
    phoneNumber : string
    gender : string
    location : locationModel
    imageUrl : string
    dateOfBirth : string
}

export interface ChatUserModel{
    id : string
    firstName : string
    lastName : string
}