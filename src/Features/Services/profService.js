import authAxious from '../Config/interceptor'
import sessionData from "../../sessionData"

const API_URL_REGISTER_PROFILE = '/brokerProfile/'
const API_URL_UPDATE_PROFILE = '/brokerProfile/updateProfile'

const API_URL_FETCH_PROFILE = '/profile/getAllProfilesByBrokerId'

const API_URL_FETCH_PROFILE_URLS = 'cloud/getProfileImageUrl'
const API_URL_FETCH_PROFILE_URLS_BROKER_USER = 'cloud/getBrokerUserProfileImageUrl'
const API_URL_FETCH_VIEWED_PROFILE_IMAGE_URLS = 'cloud/getBrokerUserProfileViewedImageUrl'
const API_URL_REMOVE_PROFILE = 'cloud/removeProfileImage'

const API_URL_SEARCH_PROFILE = '/brokerProfile/searchProfile'
const API_URL_SEARCH_PROFILE_BROKER_USER = '/brokerUser/getAllProfilesByBrokerId'

const API_URL_FETCH_BROKER_DETAILS = '/brokerProfile/getBrokerDetailsById'
const API_URL_FETCH_BROKER_DETAILS_BROKER_USER = '/brokerUser/getBrokerDetails'

const API_URL_FETCH_PROFILE_DETAILS = '/brokerProfile/getProfileDetailsById'
const API_URL_FETCH_PROFILE_DETAILS_BROKER_USER = '/brokerUser/getProfileDetails'

const API_URL_PROFILE_GET_HOROSCOPE_DETAILS = '/brokerUser/getProfileHoroscopeDetails'

const API_URL_DELETE_PROFILE = '/brokerProfile/deleteProfile'
const API_URL_UDATE_HOROSCOPE = '/brokerProfile/updateHoroscope'
const API_URL_SET_PROFILE = '/brokerProfile/setProfilePhoto'

const API_URL_BROKER_APPROVED = '/profile/brokerApproved'
const API_URL_BROKER_CREATED_PROFILE = '/profile/getBrokerCreatedProfiles'
const API_URL_GET_ADMIN_APPROVED_PROFILES = '/profile/getAdminApprovedProfiles'
const API_URL_FIND_USER = '/brokerProfile/userFind'
const API_URL_ADD_COMMAND ='/brokerProfile/addCommand'
const API_URL_DELETE_COMMAND = '/brokerProfile/deletecommand'
const API_GET_ALL_COMMAND ='/brokerProfile/getAllCommand'
const API_GET_PUProfile_BrokerAllow = '/brokerProfile/PUProfileBrokerAllow'
const API_GET_PUViewImage_BrokerAllow = '/brokerProfile/PUViewImageBrokerAllow'




const BROKER_USER_ROLE = "BrokerUser"
const PUBLIC_USER_ROLE = "User"

const registerProfile = async (data) => {
    const response = await authAxious.post(API_URL_REGISTER_PROFILE, { data })
    return response.data;
}

const updateProfile = async (data) => {
    const response = await authAxious.post(API_URL_UPDATE_PROFILE, { data })
    return response.data;
}
const fetchprofileByBroker = async (data) => {
    //const response = await authAxious.post(API_URL_FETCH_PROFILE,{"brokerId":data})
    const response = await authAxious.post(API_URL_FETCH_PROFILE, data)
    return response.data;
}

const fetchprofileDetailsById = async (data) => {
    let url;
    console.log(sessionData.getUserData().role)
    if (sessionData.getUserData().role == BROKER_USER_ROLE) {
        url = API_URL_FETCH_PROFILE_DETAILS_BROKER_USER
    }
    else {
        url = API_URL_FETCH_PROFILE_DETAILS
    }


    const response = await authAxious.post(url, { "profileId": data })
    return response.data;
}

const getProfileHoroscopeDetailsById = async (data) => {
    debugger
    const response = await authAxious.post(API_URL_PROFILE_GET_HOROSCOPE_DETAILS, { "profileId": data })
    return response.data
}
const userFind = async (data) => {
    const response = await authAxious.post(API_URL_FIND_USER, { "profileId": data })
    return response.data
}

const getbrokerDetailsById = async (data) => {
    let url;

    if (sessionData.getUserData().role == BROKER_USER_ROLE)
        url = API_URL_FETCH_BROKER_DETAILS_BROKER_USER
    else
        url = API_URL_FETCH_BROKER_DETAILS

    const response = await authAxious.post(url, { "brokerId": data })
    return response.data;
}
const serchProfiles = async (data) => {
    let url;
    if (sessionData.getUserData().role == BROKER_USER_ROLE)
        url = API_URL_SEARCH_PROFILE_BROKER_USER
    else
        url = API_URL_SEARCH_PROFILE

    const response = await authAxious.post(url, data)
    return response.data;
}

const getProfileImageUrl = async (data) => {

    let url;
    if (sessionData.getUserData().role == BROKER_USER_ROLE)
        url = API_URL_FETCH_PROFILE_URLS_BROKER_USER
    else
        url = API_URL_FETCH_PROFILE_URLS

    const response = await authAxious.post(url, data)
    return response.data;
}

const getBrokerUserProfileViewedImageUrl = async (data) => {
    const response = await authAxious.post(API_URL_FETCH_VIEWED_PROFILE_IMAGE_URLS, data)
    return response.data;
}

const setProfilePicture = async (data) => {
    const response = await authAxious.post(API_URL_SET_PROFILE, data)
    return response.data;
}

const removeProfileImage = async (data) => {
    const response = await authAxious.post(API_URL_REMOVE_PROFILE, data)
    return response.data;
}

const deleteProfile = async (data) => {
    const response = await authAxious.post(API_URL_DELETE_PROFILE, data)
    return response.data;
}

const updateHoroscope = async (data) => {
    const response = await authAxious.post(API_URL_UDATE_HOROSCOPE, data)
    return response.data;
}

const getBrokerApprovedProfiles = async (data) => {
    const response = await authAxious.post(API_URL_BROKER_APPROVED, data)
    return response.data;
}

const getBrokerCreatedProfiles = async (data) => {
    const response = await authAxious.post(API_URL_BROKER_CREATED_PROFILE, data)
    return response.data;
}

const getAdminApprovedProfiles = async (data) => {
    const response = await authAxious.post(API_URL_GET_ADMIN_APPROVED_PROFILES, data)
    return response.data;
}
const addCommand = async (data) => {
    const response = await authAxious.post(API_URL_ADD_COMMAND, data)
    return response.data;
}
const deleteCommand =async(data)=>{
    const response =await authAxious.post(API_URL_DELETE_COMMAND,data)
    return response.data;
}
const getallcommand =async()=>{
    const response =await authAxious.get(API_GET_ALL_COMMAND)
    return response.data;
}

const PUProfileBrokerAllow =async(data)=>{
    const response =await authAxious.post(API_GET_PUProfile_BrokerAllow,data)
    return response.data;
}

const PUViewImageBrokerAllow =async(data)=>{
    const response =await authAxious.post(API_GET_PUViewImage_BrokerAllow,data)
    return response.data;
}

const profileService = {
    registerProfile,
    updateProfile,
    fetchprofileByBroker,
    fetchprofileDetailsById,
    getbrokerDetailsById,
    getProfileImageUrl,
    getBrokerUserProfileViewedImageUrl,
    removeProfileImage,
    serchProfiles,
    deleteProfile,
    updateHoroscope,
    setProfilePicture,
    getBrokerApprovedProfiles,
    getBrokerCreatedProfiles,
    getAdminApprovedProfiles,
    userFind,
    getProfileHoroscopeDetailsById,
    addCommand,
    deleteCommand,
    getallcommand,
    PUProfileBrokerAllow,
    PUViewImageBrokerAllow
}

export default profileService 
