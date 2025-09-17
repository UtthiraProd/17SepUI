
import authAxious from '../../Config/interceptor'
//import axios from 'axios'

const API_URL_GET_BROKERS ='/public/getAllBroker'
const API_URL_FETCH_BROKERS ='/public/getAllBroker'
const API_URL_REGISTER_PROFILE ='/public/registerProfile'
const API_URL_FILE_UPLOAD ='/cloud/uploadProfileImage'
const API_URL_UPDATE_HOROSCOPE ='/public/UpdatePUHoroscope'
const API_URL_FETCH_PROFILE_DETAILS ='/public/getProfileDetailsById'
const API_URL_DELETE_PROFILE ='/public/deleteProfile'
const API_URL_FETCH_PROFILE_URLS ='/cloud/getPUProfileImageURL'
const API_URL_FETCH_VIEWED_PROFILE_IMAGE_URLS = 'cloud/getPUProfileViewedImageURL'
const API_URL_PUBLIC_USER_DETAILS ='/public/publicUserDetails'
const API_URL_UPDATE_PROFILE ='/public/updateProfile'
const API_URL_GET_PROFILES_BY_BROKER = '/public/getAllProfilesByBrokers'
const API_URL_PUBLIC_USER_REGISTER = '/public/PUProfileRegisterInMarriageProfileTable'
const API_URL_PUExistsing_Plan = '/public/PUExistsingPlan'
const API_URL_UPGRADE_PLAN = '/publicPlan/upgradePlan'
const API_URL_GET_PUBLIC_PLANS = '/publicPlan/getPublicUserPlans'
const API_URL_GET_BALANCE_QUOTA = '/publicPlan/PUBalanceQuota'
const API_URL_GET_PUPROFILE_IMAGE ='/cloud/getPUImageUrl'
const API_URL_GET_GET_MERRIAGE_PROFILE_DETAIL_BYID = '/public/getMarriageProfileDetailById'
const API_URL_GET_HOROSCOPE_DETAILS = '/public/getHoroscopeDetailsById'
const API_URL_REMOVE_PROFILE = '/cloud/PURemoveProfileImage'
const API_URL_ADDITIONAL_PLAN = '/publicPlan/AdditionalPlan'
const API_URL_GET_ALL_PUPLANS = '/publicPlan/getAllPUplans'
const API_URL_ACTIVE_PLAN = '/publicPlan/activePlan'
const API_URL_VIEW_PLAN = '/publicPlan/viewplan'
const API_URL_Viewplan_Active = '/publicPlan/viewplanActive'


const getAllBrokers = async() =>{
    const response = await authAxious.post(API_URL_GET_BROKERS)
    return response.data;
}

const fetchAllBrokers = async(data) =>{
    const response = await authAxious.post(API_URL_FETCH_BROKERS,data)
    return response.data;
}

const registerProfile = async(data) =>{
    const response = await authAxious.post(API_URL_REGISTER_PROFILE,{data})
    return response.data;
}

// const uploadfile = async(filedata,name) =>{

//  try
//  {
//     const response = await authAxious.post(API_URL_FILE_UPLOAD,filedata[0])
//     return response
//  }
//  catch(error)
//  {
//     return "Error while uploading photo"
//  }
   
// }

const updatePUHoroscope = async(data) =>{
    const response = await authAxious.post(API_URL_UPDATE_HOROSCOPE,data)
    return response.data;
}

const getProfileDetailsById = async(data) =>{
    const response = await authAxious.post(API_URL_FETCH_PROFILE_DETAILS,data)
    return response.data;
}

const deleteProfile = async(data) =>{
    const response = await authAxious.post(API_URL_DELETE_PROFILE,data)
    return response.data;
}

const getProfileImageUrl = async(data) =>{
 const response = await authAxious.post(API_URL_FETCH_PROFILE_URLS,data)
    return response.data;
}

const publicUserDetails = async(data)=>{
    const response = await authAxious.post(API_URL_PUBLIC_USER_DETAILS,{data})
    return response.data;
}

const updateProfile = async(data) =>{
    const response = await authAxious.post(API_URL_UPDATE_PROFILE,{data})
    return response.data;
}

const getAllProfilesByBrokers = async(data) =>{
    const response = await authAxious.post(API_URL_GET_PROFILES_BY_BROKER,{data})
    return response.data;
}

const PUProfileRegisterInMarriageProfileTable = async(data) =>{
    const response = await authAxious.post(API_URL_PUBLIC_USER_REGISTER,{data})
    return response.data;
}

const PUExistsingPlan = async(data) =>{
    const response = await authAxious.post(API_URL_PUExistsing_Plan,{data})
    return response.data;
}

const upgradePlan = async(data) =>{
    const response = await authAxious.post(API_URL_UPGRADE_PLAN,{data})
    return response.data
}

const getPublicUserPlans = async(data) =>{
    const response = await authAxious.post(API_URL_GET_PUBLIC_PLANS,{data})
    return response.data
}
const PUBalanceQuota = async(data) =>{
    const response = await authAxious.post(API_URL_GET_BALANCE_QUOTA,{data})
    return response.data
}

const getPUImageUrl = async(data) =>{
    const response = await authAxious.post(API_URL_GET_PUPROFILE_IMAGE,data)
    return response.data
}

const getMarriageProfileDetailById = async(data)=>{
    const response = await authAxious.post(API_URL_GET_GET_MERRIAGE_PROFILE_DETAIL_BYID,data)
    return response.data;
}

const getHoroscopeDetailsById = async(data)=>{
    const response = await authAxious.post(API_URL_GET_HOROSCOPE_DETAILS,data)
    return response.data
}

const getPUProfileViewedImageURL = async(data) =>{
    const response = await authAxious.post(API_URL_FETCH_VIEWED_PROFILE_IMAGE_URLS,data)
    return response.data;
}

const PURemoveProfileImage = async(data) =>{
    const response = await authAxious.post(API_URL_REMOVE_PROFILE,data)
    return response.data;
}

const AdditionalPlan = async(data) =>{
    const response = await authAxious.post(API_URL_ADDITIONAL_PLAN,{data})
    return response.data;
}

const getAllPUplans = async(data) =>{
    const response = await authAxious.post(API_URL_GET_ALL_PUPLANS,data)
    return response.data;
}

const activePlan = async(data) =>{
    const response = await authAxious.post(API_URL_ACTIVE_PLAN,data)
    return response.data;
}

const viewplan = async(data) =>{
    const response = await authAxious.post(API_URL_VIEW_PLAN,data)
    return response.data;
}

const viewplanActive = async(data) =>{
    const response = await authAxious.post(API_URL_Viewplan_Active,data)
    return response.data;
}

const publicUserService ={
    getAllBrokers,
    fetchAllBrokers,
    registerProfile,
    // uploadfile,
    updatePUHoroscope,
    getProfileDetailsById,
    deleteProfile,
    getProfileImageUrl,
    publicUserDetails,
    updateProfile,
    getAllProfilesByBrokers,
    PUProfileRegisterInMarriageProfileTable,
    PUExistsingPlan,
    upgradePlan,
    getPublicUserPlans,
    PUBalanceQuota,
    getPUImageUrl,
    getMarriageProfileDetailById,
    getHoroscopeDetailsById,
    getPUProfileViewedImageURL,
    PURemoveProfileImage,
    getPUProfileViewedImageURL,
    AdditionalPlan,
    getAllPUplans,
    activePlan,
    viewplan,
    viewplanActive
}

export default publicUserService 
