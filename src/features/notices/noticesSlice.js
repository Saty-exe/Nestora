import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notice: []
};

const noticeSlice = createSlice({
  name: "notice",
  initialState,

  reducers: {
     addNotice(state,action) {
        state.notice.push(action.payload)
     },
     removeNotice(state,action){
        state.notice = state.notice.filter((notice)=> notice.id !==action.payload.id)
     },
    updateNotice(state, action) {
  const notice = state.notice.find(
    (item) => item.id === action.payload.id
  );

  if (!notice) return;

  Object.assign(notice, action.payload);
}
  },
});

export const {
   addNotice,removeNotice, updateNotices
} = noticeSlice.actions;

export default noticeSlice.reducer;