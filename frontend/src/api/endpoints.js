import axios from 'axios'
import { SERVER_URL } from '../constants/constants'

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
        return { error: error.response?.data || "User creation failed" }; 
    }

}

export const get_auth=async ()=>{
    const response= await api.get(`/authenticated/`);
    return response.data
}

export const toggle_follow= async (username)=>{
        const response= await api.post('/toggle_follow/',{username});
        return response.data 
}

export const get_user_post=async(username)=>{
    const response= await api.get(`/posts/${username}`)
    return response.data
}

export const toggle_like= async (id)=>{
    const response= await api.post('/toggle_like/',{id})
    return response.data
}
export const create_post= async (formData)=>{
    const response= await api.post('/create_post/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    })
    return response.data
}

export const get_post =async(num)=>{
    const response=await api.get(`/get_posts/?page=${num}`)
    return response.data
}

export const get_username=async()=>{
    const response=await api.get('/get_username/')
    return response.data.username
}

export const search_user=async(search)=>{
    const response=await api.get(`/search/?query=${search}`)
    return response.data
}

export const logout=async()=>{
    const response= await api.post('/logout/')
    return response.data
}

export const update_user_profile=async(value)=>{
    const response=await api.patch('/update/',value,{headers:{'Content-Type':'multipart/form-data'}})
    return response.data
}

export const fetch_comments=async(id)=>{
    const response=await api.get(`/posts_by_id/${id}/comment/`)
    return response.data
}

export const add_comment=async(id,text)=>{
    const response=await api.post(`/posts_by_id/${id}/comment/`,{text})
    return response.data
}

export const delete_comment=async(id,comment_id)=>{
    const response=await api.delete(`/posts_by_id/${id}/comment/${comment_id}/`)
    return response.data

}

export const edit_comment=async(id,comment_id,text)=>{
    const response=await api.patch(`/posts_by_id/${id}/comment/${comment_id}/`,{text})
    return response.data

}