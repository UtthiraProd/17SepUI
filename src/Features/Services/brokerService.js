import authAxious from '../Config/interceptor'

const API_URL_REGISTER_PROFILE ='/brokerProfile/registerProfile'
const API_URL_FETCH_PROFILE ='/brokerProfile/getbrokerProfileId'
const API_URL_FETCH_BROKER_DETAILS ='/brokerProfile/getBrokerDetailsById'
const API_URL_DELETE_PROFILE ='/brokerProfile/delete'
const API_URL_UPDATE_PROFILE ='/brokerProfile/updateProfile'
const API_URL_FETCH_PROFILE_URLS ='cloud/getProfileImageUrl'
const API_URL_GET_NEW_PUBLIC_PROFILE_LIST = '/broker/getBrokerApproveProfileList'
const API_URL_BROKER_APPROVE_DETAILS ='/broker/BrokerApproveDetailsById'
const API_URL_PUBLIC_USER_REGISTER = '/broker/PUProfileRegisterInMarriageProfileTable'
const API_URL_REJECT_PROFILE = '/broker/RejectProfile'
const API_URL_MATCH_PROFILE = '/broker/getMatchProfile'
const API_URL_GET_PUPROFILE_IMAGE ='/cloud/getPUImageUrl'
const API_URL_GET_BROKER_TO_BROKER = '/broker/BrokerToBroker'
const API_URL_GET_search_Profile_BrokToBrok = '/broker/searchProfileBrokToBrok'
const API_GET_BROK_PROF_BY_ID = '/broker/getBrokProfById'
const API_GET_GET_BROKER_PROFILE_IMAGE = '/cloud/getBrokerProfileImageUrl'
const API_GET_BROKER_GETAILS = '/broker/GetBrokerDetails'

// const API_URL_REMOVE_PROFILE ='cloud/removeProfileImage'
// const API_URL_FETCH_PROFILE_DETAILS ='/profile/getProfileDetails'
// const API_URL_SEARCH_PROFILE = '/profile/searchProfile'
// const API_URL_UDATE_HOROSCOPE ='/profile/updateHoroscope'
// const API_URL_SET_PROFILE ='/profile/setProfilePhoto'

const registerProfile = async(data) =>{
    const response = await authAxious.post(API_URL_REGISTER_PROFILE,{data})
    return response.data;
}

const updateProfile = async(data) =>{
    const response = await authAxious.post(API_URL_UPDATE_PROFILE,{data})
    return response.data;
}

const getbrokerDetailsById = async(data) =>{
    const response = await authAxious.get(API_URL_FETCH_BROKER_DETAILS,{"brokerId":data})
    return response.data;
}

const getProfileImageUrl = async(data) =>{
    const response = await authAxious.get(API_URL_FETCH_PROFILE_URLS,data)
    return response.data.data;
}
const getPUImageUrl = async(data) =>{
    const response = await authAxious.post(API_URL_GET_PUPROFILE_IMAGE,data)
    return response.data;
}
const deleteProfile = async(data) =>{
    const response = await authAxious.delete(API_URL_DELETE_PROFILE,data)
    return response.data;
}


const getNewPUProfileList = async(data) =>{
    const response = await authAxious.post(API_URL_GET_NEW_PUBLIC_PROFILE_LIST,data)
    return response.data;
}

const BrokerApproveDetailsById = async(data)=>{
    const response = await authAxious.post(API_URL_BROKER_APPROVE_DETAILS,data)
    return response.data;
}

const PUProfileRegisterInMarriageProfileTable = async(data)=>{
    const response = await authAxious.post(API_URL_PUBLIC_USER_REGISTER,data)
    return response.data;
}

const RejectProfile = async(data)=>{
    const response = await authAxious.post(API_URL_REJECT_PROFILE,data)
    return response.data;
}

const getMatchProfile = async(data)=>{
    const response = await authAxious.post(API_URL_MATCH_PROFILE,data)
    return response.data;
}

const getBrokerToBroker = async(data)=>{
    const response = await authAxious.post(API_URL_GET_BROKER_TO_BROKER,data)
    return response.data;
}

const searchProfileBrokToBrok = async(data)=>{
    const response = await authAxious.post(API_URL_GET_search_Profile_BrokToBrok,data)
    return response.data;
}

const getBrokProfById = async(data)=>{
    const response = await authAxious.post(API_GET_BROK_PROF_BY_ID,data)
    return response.data
}

const getBrokerProfileImageUrl = async(data)=>{
    const response = await authAxious.post(API_GET_GET_BROKER_PROFILE_IMAGE,data)
    return response.data
}
const GetBrokerDetails = async(data)=>{
    const responce = await authAxious.post(API_GET_BROKER_GETAILS,data)
    return responce.data
}

// const fetchprofileByBroker = async(data) =>{
//     //const response = await authAxious.post(API_URL_FETCH_PROFILE,{"brokerId":data})
//     const response = await authAxious.post(API_URL_FETCH_PROFILE,data)
//     return response.data;
// }

// const fetchprofileDetailsById = async(data) =>{
//     const response = await authAxious.post(API_URL_FETCH_PROFILE_DETAILS,{"profileId":data})
//     return response.data;
// }


// const serchProfiles = async(data) =>{
//     const response = await authAxious.post(API_URL_SEARCH_PROFILE,data)
//     return response.data;
// }

// const setProfilePicture = async(data) =>{
//     const response = await authAxious.post(API_URL_SET_PROFILE,data)
//     return response.data;
// }

// const removeProfileImage = async(data) =>{
//     const response = await authAxious.post(API_URL_REMOVE_PROFILE,data)
//     return response.data;
// }


// const updateHoroscope = async(data) =>{
//     const response = await authAxious.post(API_URL_UDATE_HOROSCOPE,data)
//     return response.data;
// }

const BrokerService ={
    registerProfile,
    updateProfile,
    // fetchprofileByBroker,
    // fetchprofileDetailsById,
    getbrokerDetailsById,
    getProfileImageUrl,
    getPUImageUrl,
    // removeProfileImage,
    // serchProfiles,
    deleteProfile,
    // updateHoroscope,
    // setProfilePicture
    getNewPUProfileList,
    BrokerApproveDetailsById,
    PUProfileRegisterInMarriageProfileTable,
    RejectProfile,
    getMatchProfile,
    getBrokerToBroker,
    searchProfileBrokToBrok,
    getBrokProfById,
    getBrokerProfileImageUrl,
    GetBrokerDetails
}

export default BrokerService 