import authAxious from "../Config/interceptor";

const API_URL_GET_MARRIAGE_PROFILES = '/userProfile/getMarriageProfiles'
const API_URL_GET_MARRIAGE_PROFILES_BY_ID='/userProfile/getMarriageProfileById'
const API_URL_GET_PLAN_BROKER ='/userProfile/getPlanByBroker'
const API_URL_USER_LOGIN_CREATE ='/users/userLoginCreate'
const API_URL_GET_USER_ID ='/userProfile/getUserDetailsById'
const API_URL_DELETE_USER ='/userProfile/deleteUserLogin'
const API_URL_GET_USER_PROFILE ='/userProfile/getLoginUserProfile'
const API_URL_CREATE_PLAN_SCHEDULE ='/plan/createPlanSchedule'
// const API_URL_FIND_USER = '/userProfile/userFind'
const API_URL_GET_LOGIN_USER_NAME = '/userProfile/getLoginUserName'
const API_URL_GET_BROKER_USER_OTP ='/users/getBrokerUserOTP'
const API_URL_BROK_OTP_VERIFY = '/users/brokerUserOTPVerify'
const API_URL_FETCH_PROFILE_URLS ='cloud/getProfileImageUrl'
const API_URL_GET_PUPROFILE_IMAGE = 'cloud/getPUProfileUrl'

const getMarriageProfiles = async(data)=>{
    const responce = await authAxious.post(API_URL_GET_MARRIAGE_PROFILES,data)
    return responce.data
}

const getMarriageProfileById=async(id)=>{
    const responce =await authAxious.get(API_URL_GET_MARRIAGE_PROFILES_BY_ID,{params:{id:id}})
    return responce.data
}

const getPlanByBroker = async(id)=>{
    const response = await authAxious.post(API_URL_GET_PLAN_BROKER,{id})
    return response.data
}

const userLoginCreate = async(data)=>{
    const response = await authAxious.post(API_URL_USER_LOGIN_CREATE,{data})
    return response.data
} 

const getUserDetailsById = async(id)=>{
    const response = await authAxious.get(API_URL_GET_USER_ID,{params:{id:id}})
    return response.data
}

const deleteUserLogin = async(data)=>{
    const response = await authAxious.delete(API_URL_DELETE_USER,{data})
    return response.data
}

const getLoginUserProfile = async(data)=>{
    const response = await authAxious.post(API_URL_GET_USER_PROFILE,data)
    return response.data
}
const createPlanSchedule = async(data)=>{
    const response =await authAxious.post(API_URL_CREATE_PLAN_SCHEDULE,{data})
    return response.data
}

// const userFind = async(id)=>{
//     const response = await authAxious.get(API_URL_FIND_USER,{params:{id:id}})
//     return response.data
// }

const getLoginUserName = async(name)=>{
    const responce = await authAxious.get(`${API_URL_GET_LOGIN_USER_NAME}?name=${name}`)
    return responce.data;
}

const getBrokerUserOTP = async(data)=>{
    const response = await authAxious.post(API_URL_GET_BROKER_USER_OTP,{data})
    return response.data;
}

const brokerUserOTPVerify = async(data)=>{
    const response = await authAxious.post(API_URL_BROK_OTP_VERIFY,{data})
    return response.data
}

const getProfileImageUrl = async(data) =>{
    const response = await authAxious.post(API_URL_FETCH_PROFILE_URLS,data)
    return response.data;
}

const getPUProfileImage = async(data) =>{
    const responce = await authAxious.post(API_URL_GET_PUPROFILE_IMAGE,data)
    return responce.data
}

const userProfileService ={
    getMarriageProfiles,
    getMarriageProfileById,
    getPlanByBroker,
    userLoginCreate,
    getUserDetailsById,
    deleteUserLogin,
    getLoginUserProfile,
    createPlanSchedule,
    // userFind
    getLoginUserName,
    getBrokerUserOTP,
    brokerUserOTPVerify,
    getProfileImageUrl,
    getPUProfileImage
}

export default userProfileService



