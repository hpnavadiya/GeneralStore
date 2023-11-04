import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API_URL = `${BACKEND_URL}/api/users`;

// Register User
                    // userData recive from form
const register = async(userData) => {
    const response = await axios.post(API_URL + "register", userData, {
        withCredentials: true,
    })
    return response.data
}

// Login User
const login = async (userData) => {
    const response = await axios.post(API_URL + "login", userData)
    return response.data
}

// Logout user
const logout = async () => {
    const response = await axios.get(API_URL + "logout")
    return response.data.message;
}

// Get LogedIn user status
const getLoginStatus = async () => {
    const response = await axios.get(API_URL + "getLoginStatus")
    return response.data;
}

const authService = {
    register
}

export default authService;