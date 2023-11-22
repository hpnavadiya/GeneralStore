import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from './authService';
import { toast } from "react-toastify";

const initialState = {
    isLoggedIn: false,
    user: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};

// Register User
// Handling asynchronous actions in Redux
export const register = createAsyncThunk(
    "auth/register",
    async (userData, thunkAPI) => {
        console.log("-------------", userData)
        try {
            return await authService.register(userData)
        } catch (error) {
            const message = (
                error.response &&
                error.response.data &&
                error.response.data.message
            ) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// Login User
export const login = createAsyncThunk(
    "auth/login",
    async (userData, thunkAPI) => {
        try {
            return await authService.login(userData)
        } catch (error) {
            const message = (
                error.response &&
                error.response.data &&
                error.response.data.message
            ) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// Logout User
export const logout = createAsyncThunk(
    "auth/logout",
    async (_, thunkAPI) => {
        try {
            return await authService.logout()
        } catch (error) {
            const message = (
                error.response &&
                error.response.data &&
                error.response.data.message
            ) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// Get Login Status of User
export const getLoginStatus = createAsyncThunk(
    "auth/getLoginStatus",
    async (_, thunkAPI) => {
        try {
            return await authService.getLoginStatus()
        } catch (error) {
            const message = (
                error.response &&
                error.response.data &&
                error.response.data.message
            ) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// Get User
export const getUser = createAsyncThunk(
    "auth/getUser",
    async (_, thunkAPI) => {
        try {
            return await authService.getUser()
        } catch (error) {
            const message = (
                error.response &&
                error.response.data &&
                error.response.data.message
            ) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// Update User
export const updateUser = createAsyncThunk(
    "auth/updateUser",
    async (userData, thunkAPI) => {
        try {
            return await authService.updateUser(userData)
        } catch (error) {
            const message = (
                error.response &&
                error.response.data &&
                error.response.data.message
            ) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);


// Handle response

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        // By default is false
        RESET_AUTH(state) {
            state.isError = false;
            state.isSuccess = false;
            state.isLoading = false;
            state.message = "";
        },
    },
    extraReducers: (builder) => {
        builder
            // Register User
            .addCase(register.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isLoggedIn = true;
                state.user = action.payload
                toast.success("Registration successful")
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.user = null;
                toast.success(action.payload);
            })
            // login User
            .addCase(login.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isLoggedIn = true;
                state.user = action.payload
                toast.success("Login successful")
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.user = null;
                toast.success(action.payload);
            })
            // logout User
            .addCase(logout.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(logout.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isLoggedIn = false;
                state.user = null;
                toast.success(action.payload)
            })
            .addCase(logout.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                toast.success(action.payload);
            })
            // get Login Status of User
            .addCase(getLoginStatus.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getLoginStatus.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isLoggedIn = action.payload;
                if (action.payload.message === "invalid signature") {
                    state.isLoggedIn = false;
                }
            })
            .addCase(getLoginStatus.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            // Get User Details
            .addCase(getUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isLoggedIn = true;
                state.user = action.payload;
            })
            .addCase(getUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                toast.error(action.payload);
            })
            // Update User
            .addCase(updateUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isLoggedIn = true;
                state.user = action.payload;
                toast.success("User Updated");
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                toast.error(action.payload);
            });
    }
});

// register user
export const { RESET_AUTH } = authSlice.actions;

export default authSlice.reducer;
