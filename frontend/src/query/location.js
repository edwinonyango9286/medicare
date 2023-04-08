import axios from 'axios'
import { makeUrl } from './user'

export const all_locations = () => {
    return axios.get(
        makeUrl("location/all/")
    )
}