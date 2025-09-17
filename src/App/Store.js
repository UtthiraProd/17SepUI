import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../Features/Slices/authSlice'
import brokReducer from '../Features/Slices/brokSlice'
import profReducer from '../Features/Slices/profSlice'
import dashSlice from '../Features/Slices/dashboardSlice'
import  masterSlice  from "../Features/Slices/masterSlice";
import planSlice from "../Features/Slices/planSlice";
import  adminBrokerSlice  from "../Features/Slices/adminBrokerSlice";
import userProfileSlice from "../Features/Slices/userProfileSlice";
import  BUProfSlice from "../Features/Slices/BrokerUser/BUProfileSlice";
import publicUserSlice from "../Features/Slices/PublicUser/publicUserSlice"

const store = configureStore({
    reducer:{
        auth:authReducer,
        brok:brokReducer,
        prof:profReducer,
        dash:dashSlice,
        master:masterSlice,
        plan:planSlice,
        admin:adminBrokerSlice,
        userPro:userProfileSlice,
        BUProf:BUProfSlice,
        public:publicUserSlice
    }
})

export default store
