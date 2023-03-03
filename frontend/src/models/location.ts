export const DefaultCountyProps = {
    countyCode : "",
    countyName : "",
}

export interface countyModel{
    countyCode : string
    countyName : string
}

export const DefaultSubCountyProps = {
    subcountyCode : "",
    subcountyName : "",
    county : DefaultCountyProps
}

export interface locationModel{
    subcountyCode : string
    subcountyName : string
    county : countyModel
}