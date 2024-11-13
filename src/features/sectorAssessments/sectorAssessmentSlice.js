import { createSlice } from "@reduxjs/toolkit";
import { getAssessment, submitAssessmentRun } from "./sectorAssessmentActions";

const initialState = {
    assessment: {
        status: 'idle',
        data: null,
        error: null,
    },
    assessmentRun: {
        status: 'idle',
        data: null,
        error: null,
    },
}

const sectorAssessmentSlice = createSlice({
    name: 'sectorAssessment',
    initialState,
    reducers: {
        unSetSectorAssessment(state) {
          state.assessment.status = 'idle';
          state.assessment.data = null;
          state.assessment.error = null;
          state.assessmentRun.status = 'idle';
          state.assessmentRun.data = null;
          state.assessmentRun.error = null;
        },
    },
    extraReducers: (builder) => {
      builder
        .addCase(getAssessment.pending, (state) => {
          state.assessment.status = 'loading';
        })
        .addCase(getAssessment.fulfilled, (state, action) => {
          state.assessment.status = 'succeeded';
          state.assessment.data = action.payload;
        })
        .addCase(getAssessment.rejected, (state, action) => {
          state.assessment.status = 'failed';
          state.assessment.error = action.payload;
        })
        .addCase(submitAssessmentRun.pending, (state) => {
          state.assessmentRun.status = 'loading';
        })
        .addCase(submitAssessmentRun.fulfilled, (state, action) => {
          state.assessmentRun.status = 'succeeded';
        })
        .addCase(submitAssessmentRun.rejected, (state, action) => {
          state.assessment.status = 'failed';
          state.assessment.error = action.payload;
        });
    },
  });

export const { setSectorAssessment } = sectorAssessmentSlice.actions;

export default sectorAssessmentSlice.reducer;