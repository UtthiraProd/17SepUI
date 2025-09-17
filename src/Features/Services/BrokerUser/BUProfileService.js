import authAxious from "../../Config/interceptor";

const API_URL_BU_GET_PROFILE_BY_ID='/brokerUser/getAllProfilesByBrokerId'
const API_URL_BROKER_USER_DETAILS ='/brokerUser/brokerUserDetails'
const API_URL_GET_BALANCE_QUOTA = '/brokerUser/userBalanceQuota'
const API_URL_BU_PLAN_EXISTS = '/brokerUser/BUplanexists'

const BUGetprofilebyid =async(data)=>{
    const responce =await authAxious.post(API_URL_BU_GET_PROFILE_BY_ID,data)
    return responce.data;
}

const brokerUserDetails = async(data)=>{
    const response = await authAxious.post(API_URL_BROKER_USER_DETAILS,{data})
    return response.data;
}

const userBalanceQuota = async(data)=>{
    const response= await authAxious.post(API_URL_GET_BALANCE_QUOTA,{data})
    return response.data
}

const BUplanexists = async(data)=>{
     const responce =await authAxious.post(API_URL_BU_PLAN_EXISTS,{data})
     return responce.data
}

const BUProfileService={
    BUGetprofilebyid,
    brokerUserDetails,
    userBalanceQuota,
    BUplanexists
}

export default BUProfileService