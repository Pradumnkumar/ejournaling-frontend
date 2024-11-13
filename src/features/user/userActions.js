import axios from "axios";
import { notification } from "antd";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const loginUser = createAsyncThunk(
    'user/login',
    async (values, { rejectWithValue }) => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/user/token/', {
                email:  values.username,
                password: values.password
            });
            const token = response.data.token;
            localStorage.setItem('authToken', token);
            localStorage.setItem('user', values.username);
            return response.data;
        } catch(error) {
            notification.open({
            type: "error",
            message: error.response.data,
            description:
                "",
            });
            return rejectWithValue(error.response.data);
        }
    }
);

export const createUser = createAsyncThunk(
    'user/create',
    async (values, { rejectWithValue }) => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/user/create/', 
                values
            );
            return response.data;
        } catch(error) {
            notification.open({
            type: "error",
            message: error.response.data,
            description:
                "",
            });
            return rejectWithValue(error.response.data);
        }
    }
);

export const verifyUser = createAsyncThunk(
    'user/verify-otp',
    async (values, { rejectWithValue }) => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/user/verify-otp/', values);
            return response.data;
        } catch(error) {
            notification.open({
            type: "error",
            message: error.response.data,
            description:
                "",
            });
            return rejectWithValue(error.response.data);
        }
    }
);