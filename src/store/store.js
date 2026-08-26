import {configureStore,combineReducers} from "@reduxjs/toolkit"
import noticeReducer from "../features/notices/noticesSlice"
import staffReducer from "../features/staff/staffSlice"
import tenantReducer from "../features/tenant/tenantSlice"
import mealReducer from "../features/meal/mealSlice"
import bookingReducer from "../features/booking/bookingSlice"
import feedbackReducer from "../features/feedback/feedBackSlice"
import complaintReducer from "../features/complaints/complaintSlice"
import visitorReducer from "../features/visitor/visitorSlice"
import {persistStore,persistReducer} from 'redux-persist'

const storage = {
  getItem: (key) => {
    return Promise.resolve(
      window.localStorage.getItem(key)
    );
  },

  setItem: (key, value) => {
    window.localStorage.setItem(key, value);

    return Promise.resolve();
  },

  removeItem: (key) => {
    window.localStorage.removeItem(key);

    return Promise.resolve();
  },

};
const rootReducer = combineReducers({
    staff: staffReducer,
    tenant: tenantReducer,
    notice: noticeReducer,
    booking: bookingReducer,
    visitor: visitorReducer,
    meal: mealReducer,
    complaint: complaintReducer,
    feedback: feedbackReducer,
    

})
const persistConfig = {
    key: "root", 
    storage
}
const persistedReducer = persistReducer(
    persistConfig,
    rootReducer
)
export const store = configureStore({
    

    reducer: persistedReducer,
    middleware: (getDefaultMiddleware)=> getDefaultMiddleware({
        serializableCheck: false,
    }).concat()
})
export const persistor = persistStore(store)