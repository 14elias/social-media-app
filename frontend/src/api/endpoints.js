import axios from 'axios'
import { SERVER_URL } from '../constants/constants'

const BASE_URL=SERVER_URL
const api=axios.create(
    {
        baseURL :BASE_URL,
       withCredentials:true
    }
)

export const get_user_profile_data = async(username)=> {
    const response= await api.get(`/user_data/${username}/`);
    return response.data
} 