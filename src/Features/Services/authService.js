import authAxious from '../Config/interceptor'
import appConfig from '../../AppConfig.json'
import axios from 'axios'
const API_URL_REGISTER_USER ='/users'
const API_URL_GET_USERREGISTER_OTP ='/users/getNewRegisterOTP'
const API_URL_GET_USERRESETPASSWORD_OTP ='/users/getResetPasswordOTP'
const API_URL_REGISTER_LOGIN ='/users/login'
const API_URL_RESET_PASSWORD ='/users/resetUserPassword'
const API_URL_GETUSER_MENU ='/users/getUserMenuDetailsById'
const API_URL_FORGOT_USER='/users/forgotUser'
const API_URL_SEND_OTP='/users/getForgotUserOTP'
const API_URL_VERIFY_REGISTER_OTP ='/users/VerifyRegisterOTP'
const API_URL_LOGOUT_TRUE = '/users/logoutTrue'
const API_URL_VERIFY_MOBILE_OTP = '/users/verifyRegEmailOTP'
const API_URL_RESENT_EMAIL_OTP = '/users/resentEmailOTP'
const API_URL_ACTIVE_USER ='/users/activeUser'


const registerUser = async(userData) =>{
    const response = await authAxious.post(API_URL_REGISTER_USER,userData)
   
   if(response.data.isSuccess)
   {

    sessionStorage["user"] =JSON.stringify(response.data.data)
    localStorage["User"] =JSON.stringify(response.data.data)

    const sessionDuration = parseInt(appConfig.timeoutDuration) * 60 * 1000; // 30 minutes session duration
    const newExpirationTime = Date.now() + sessionDuration; // Expiry time (current time + session duration)
    sessionStorage.setItem("timer", newExpirationTime);
    localStorage.setItem("timer", newExpirationTime)
   
    return response.data;
   }
   else if(response.data.isSuccess == false)
   {
    return response.data;
   }
   else{
    return null;
   }
}

const getResetPasswordOTP = async(userData) =>{
    const response = await authAxious.post(API_URL_GET_USERRESETPASSWORD_OTP,userData)
    return response.data;
}

const getUserRegisterOTP = async(data) =>{
    const response = await authAxious.post(API_URL_GET_USERREGISTER_OTP,data)
    return response.data;
}

const loginUser = async(userData) =>{
    const response = await authAxious.post(API_URL_REGISTER_LOGIN,userData)

   if(response.data.isSuccess)
   {
    sessionStorage["user"] =JSON.stringify(response.data.data)
    localStorage["User"] =JSON.stringify(response.data.data)

    const sessionDuration =  parseInt(appConfig.timeoutDuration) * 60 * 1000; // 30 minutes session duration
    const newExpirationTime = Date.now() + sessionDuration; // Expiry time (current time + session duration)
    sessionStorage.setItem("timer", newExpirationTime);
    localStorage.setItem("timer", newExpirationTime)
   
    return response.data;
   }
   else if(response.data.isSuccess == false)
   {
    return response.data;
   }
   else{
    return null;
   }
}

const getUserMenuDetailsById = async(data) =>{
    const response = await authAxious.post(API_URL_GETUSER_MENU)
    return response.data;
}

const resetUserPassword =  async(data) =>{
    const response = await authAxious.post(API_URL_RESET_PASSWORD,data)
    return response.data;
}
const getForgotUserOTP = async(data) => {
    const response = await authAxious.post(API_URL_SEND_OTP,{data});
    return response.data;
  };

const forgotUser = async (data) => {
       const response = await authAxious.post(API_URL_FORGOT_USER,data);
       return response.data;
     };

const VerifyRegisterOTP =async(data)=>{
    const response =await authAxious.post(API_URL_VERIFY_REGISTER_OTP,data);
    return response.data
};

const logoutTrue =async(data)=>{
    const response =await authAxious.post(API_URL_LOGOUT_TRUE,data);
    return response.data
}

const verifyRegEmailOTP = async(data) =>{
    const response = await authAxious.post(API_URL_VERIFY_MOBILE_OTP,data);
    return response.data
}

const resentEmailOTP = async(data) =>{
    const response = await authAxious.post(API_URL_RESENT_EMAIL_OTP,{data});
    return response.data
}

const activeUser = async(data) =>{      
    const response = await authAxious.post(API_URL_ACTIVE_USER,data);
    return response.data
}

const authService ={
    registerUser,
    loginUser,
    getUserMenuDetailsById,
    getUserRegisterOTP,
    getResetPasswordOTP,
    resetUserPassword,
    forgotUser,
    getForgotUserOTP,
    VerifyRegisterOTP,
    logoutTrue,
    verifyRegEmailOTP,
    resentEmailOTP,
    activeUser
}

export default authService 
