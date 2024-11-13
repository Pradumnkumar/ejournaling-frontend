import { combineReducers } from "@reduxjs/toolkit";
import userReducer from '../features/user/userSlice';
import sectorAssessmentReducer from '../features/sectorAssessments/sectorAssessmentSlice'

const rootReducer = combineReducers({
    user: userReducer,
    sectorAssessment: sectorAssessmentReducer,
});

export default rootReducer;