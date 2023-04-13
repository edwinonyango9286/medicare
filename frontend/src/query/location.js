import axios from 'axios'
import { BACKEND_REQUEST } from './user'

export const all_locations = () => {
    return BACKEND_REQUEST.get(
        "location/all/"
    )
}