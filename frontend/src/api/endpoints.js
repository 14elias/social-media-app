import axios from 'axios'
import { SERVER_URL } from '../constants/constants'
import { useNavigate } from 'react-router-dom'

const BASE_URL=SERVER_URL
const api=axios.create(
    {
        baseURL :BASE_URL,
       withCredentials:true
    }
)

api.interceptors.response.use(
    (response)=>response,
    async error =>{
        original_request=error.config
        if (error.response?.status === 401 && !original_request._retry){
            original_request._retry=true
            try{
                await refresh_token();
                return api(original_request)
            }catch(refresherror){
                window.location.href = '/login'
                return Promise.reject(refresherror)
            }
        }
        return Promise.reject(error)
    }
)

export const get_user_profile_data = async(username)=> {
    const response= await api.get(`/user_data/${username}/`);
    return response.data
} 

export const login = async (username, password) => {
    try {
        const response = await api.post('/token/', { username, password }, { withCredentials: true });
        return response.data;
    } catch (error) {
        return { error: error.response?.data || "Login failed" };
    }
};

const refresh_token = async () => {
    try {
        const response = await api.post('/token/refresh/', {}, { withCredentials: true });
        return response.data;
    } catch (error) {
        return { error: error.response?.data || "Token refresh failed" };
    }
};

export const create_user= async (username,password,email,first_name,last_name)=>{
    try{
        const response= await api.post('/create_user/',{username,password,email,first_name,last_name});
        return response.data
    }catch (error) {
        console.error("Error creating user:", error.response?.data || error.message);
        return { error: error.response?.data || "User creation failed" }; // ✅ Return meaningful error
    }

}

