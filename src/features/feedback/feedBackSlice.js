import { createSlice } from "@reduxjs/toolkit";
import feedbackData from "./feedbackData";

const initialState = {
    feedback: [...feedbackData]
}
export const feedbackSlice = createSlice({
    name: "feedback",
    initialState,

    reducers: {
        addFeedback(state,action) {
            state.feedback.push(action.payload)
        },
        removeFeedback(state,action) {
            state.feedback = state.feedback.filter((item)=> item.id !== action.payload.id)
        }
    }

})
export default feedbackSlice.reducer

export const {addFeedback,removeFeedback} = feedbackSlice.actions