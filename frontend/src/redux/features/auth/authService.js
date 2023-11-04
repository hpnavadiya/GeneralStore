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

// Get LogedIn user status
const getLoginStatus = async () => {
    const response = await axios.get(API_URL + "getLoginStatus")
    return response.data;
}

const authService = {
    register
}

export default authService;