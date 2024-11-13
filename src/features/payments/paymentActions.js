import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const createOrder = createAsyncThunk(
    'payment/createOrder',
    async (orders, { rejectWithValue }) => {
        const token = localStorage.getItem('authToken');
        const headers = {
          'Accept': 'application/json',
          'Authorization': `Token ${token}`
        };
        const payload = {
            orders
        }
        const response = await axios.post('http://127.0.0.1:8000/api/payment/create-order/', payload, { headers });
        return response.data;
    }
);

export const verifyPayment = createAsyncThunk(
    'payment/verifyPayment',
    async (payment_data, { rejectWithValue }) => {
        const token = localStorage.getItem('authToken');
        const headers = {
          'Accept': 'application/json',
          'Authorization': `Token ${token}`
        };
        const response = await axios.post('http://127.0.0.1:8000/api/payment/verify-payment/', payment_data, { headers });
        return response.data;
    }
);
