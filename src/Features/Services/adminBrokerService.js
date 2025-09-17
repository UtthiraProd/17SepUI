import authAxious from '../Config/interceptor'
const API_URL_ADMIN_REGISTER_BROKER = '/admin/adminRegisterBroker'
const API_URL_ADMIN_GET_BROKER_BY_ID = '/admin/adminGetBrokerByID'
const API_URL_ADMIN_UPDATE_BROKER='/admin/adminUpdateBroker'
const API_URL_ADMIN_DELETA_BROKER = '/admin/adminDeleteBroker'
const API_URL_GET_BROKER_PLAN = '/admin/getBrokerPlan'
const API_URL_top_Up_Plan_Broker ='/admin/topUpPlanBroker'
const API_URL_Get_Broker_image_Url  = 'cloud/getBrokImageUrl'
const API_URL_GET_ALL_PU_PROFILE ='/PUprofile/getPUprofile'
const API_URL_GET_PU_PROFILE_BY_ID ='/PUprofile/getPUprofilebyId'
const API_URL_GET_ALL_MAT_NAME = '/admin/getallMatName'
const API_URL_GET_ALL_BROKER_NAME = '/admin/getallBrokerName'
const API_URL_ASSIGN_BROKER = '/admin/AsignBroker'
const API_URL_GET_BROKER_TO_BROKER_ACCESS = '/admin/getBrokertoBroker'
const API_URL_GET_PU_PROFILE = '/PUprofile/getPUprofile'
const API_URL_GET_PU_PROFILE_URL = '/cloud/PUProfileImageUrl'
const API_URL_ADMIN_BROKER_TO_BROKER = '/admin/AssignBrokertoBroker'
const API_URL_BROKER_TO_PUBLIC ='/admin/BrokertoPublic'
const API_URL_GET_ALL_PU_MARRIAGE_PROFILES = '/PUprofile/getAllPUMarriageProfile'
const API_URL_ADMIM_DELETE_PU_PROFILE = '/PUprofile/AdmindeletePUprofile'


const adminRegisterBroker = async(data)=>{
    const responce = await authAxious.post(API_URL_ADMIN_REGISTER_BROKER,{data})
    return responce.data;
}

const adminGetBrokerById = async(id)=>{
    const responce = await authAxious.get(API_URL_ADMIN_GET_BROKER_BY_ID,{params:{id:id}})
    return responce.data;
}
const adminUpdateBroker=async(data)=>{
    const response =await authAxious.post(API_URL_ADMIN_UPDATE_BROKER,{data})
    return response.data;
}

const adminDeleteBroker = async(data)=>{
    const responce = await authAxious.delete(API_URL_ADMIN_DELETA_BROKER,{data})
    return responce.data;
}

const getBrokerPlan = async(id) =>{
    const response = await authAxious.get(API_URL_GET_BROKER_PLAN,{params:{id:id}})
    return response.data;
}

const topUpPlanBroker = async(data)=>{
    const responce = await authAxious.post(API_URL_top_Up_Plan_Broker,{data})
    return responce.data;
}

const getBrokImageUrl = async(data) =>{
    const response = await authAxious.post(API_URL_Get_Broker_image_Url,data)
    return response.data;
}

const getallPUprofile = async (data) =>{
    const responce = await authAxious.post(API_URL_GET_ALL_PU_PROFILE,data)
    return responce.data;
}

const getPUprofileById =async (id)=>{
    const responce =await authAxious.get(API_URL_GET_PU_PROFILE_BY_ID,{params:{id:id}})
    return responce.data;
}

const getallMatName = async () => {
    const responce = await authAxious.get(API_URL_GET_ALL_MAT_NAME)
    return responce.data;
}

const getallBrokerName = async () =>{
    const responce = await authAxious.get(API_URL_GET_ALL_BROKER_NAME)
    return responce.data;
}

const AssignBroker = async (data) =>{
    const responce = await authAxious.post(API_URL_ASSIGN_BROKER,data)
    return responce.data;
}

const getBrokerToBroker = async (data) => {
    const response = await authAxious.post(API_URL_GET_BROKER_TO_BROKER_ACCESS,data);
    return response.data;                           
}

const getPUProfile = async (data) =>{
    const responce = await authAxious.post(API_URL_GET_PU_PROFILE,data)
    return responce.data;
}

const PUProfileImageUrl = async (data) =>{
    const responce = await authAxious.post(API_URL_GET_PU_PROFILE_URL,data)
    return responce.data;
}
const BrokertoPublic = async (data) =>{
    const responce = await authAxious.post(API_URL_BROKER_TO_PUBLIC,data)
    return responce.data;
}
const adminAssignBrokertoBroker = async (data) => {
    const response = await authAxious.post(API_URL_ADMIN_BROKER_TO_BROKER,data)
    return response.data;
}
const getAllPUMarriageProfile = async(data)=>{
    const responce =await authAxious.post(API_URL_GET_ALL_PU_MARRIAGE_PROFILES,data)
    return responce.data
}
const AdmindeletePUprofile = async(data)=>{
    const responce =await authAxious.post(API_URL_ADMIM_DELETE_PU_PROFILE,data)
    return responce.data
}
// const getPUprofilebyId = async(data)=>{
//     const responce = await authAxious.get(API_URL_GET_PU_PROFILE_BY_ID,data)
//     return responce.data
// }


const adminBrokerService ={
    adminRegisterBroker,
    adminGetBrokerById,
    adminUpdateBroker,
    adminDeleteBroker,
    getBrokerPlan,
    topUpPlanBroker,
    getBrokImageUrl,
    getallPUprofile,
    getPUprofileById,
    getallMatName,
    getallBrokerName,
    AssignBroker,
    getPUProfile,
    PUProfileImageUrl,
     BrokertoPublic,
    getBrokerToBroker,
    adminAssignBrokertoBroker,
    getAllPUMarriageProfile,
    AdmindeletePUprofile
    // getPUprofilebyId
}

export default adminBrokerService