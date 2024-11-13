import axios from "axios";
import { createAsyncThunk } from '@reduxjs/toolkit';
import { notification } from "antd";

export const getAssessment = createAsyncThunk(
    'sectorAssessment/getAssessment',
    async (_, { rejectWithValue }) => {
      try {
        const token = localStorage.getItem('authToken');
        const headers = {
          'Accept': 'application/json',
          'Authorization': `Token ${token}`
        };
        const response = await axios.get('http://127.0.0.1:8000/api/sector-assessment/assessment/', { headers });
        localStorage.setItem('sectorAssessment', JSON.stringify(response.data));
        return response.data;
      } catch (error) {
        console.log(error);
        notification.open({
          type: "error",
          message: "Error fetching assessment",
          description: error.response.data,
        });
        return rejectWithValue(error.response.data);
      }
    }
  );

  export const submitAssessmentRun = createAsyncThunk(
    'sectorAssessment/sendAssessmentRun',
    async (values, { rejectWithValue }) => {
      try {
        const token = localStorage.getItem('authToken');
        const headers = {
          'Accept': 'application/json',
          'Authorization': `Token ${token}`
        };
        values.user = localStorage.getItem('user');
        values.is_finished = true;
        const response = await axios.post('http://127.0.0.1:8000/api/sector-assessment/assessment-run/post', values, { headers });
        return response.data;
      } catch (error) {
        notification.open({
          type: "error",
          message: "Error Posting assessment Attempt",
          description: error.response.data,
        });
        return rejectWithValue(error.response.data);
      }
    }
  );

//   question_attempt_sample_response
//   {
//     "assessment": 1,
//     "user": "admin@admin.com",
//     "question_counter": 2147483647,
//     "question_attempt": [{
//       "user": 1,
//       "question": 1,
//       "choice": 1
//     }],
//     "time_taken": "00:01:00",
//     "is_finished": true
//   }