import authAxious from "../Config/interceptor";

const API_URL_CREATE_PLAN ='/plan/createPlan'
const API_URL_GET_ALL_PLAN ='/plan/getAllPlan'
const API_URL_GET_BROKERID ='/plan/getBrokerId'
const API_URL_DELETE_PLAN ='/plan/deletePlan'
const API_URL_UPDATE_PLAN ='/plan/updatePlan'
// const API_URL_PLAN_DETAILS_BYID ='/plan/getPlanDetailsBYId'
const API_URL_GET_BALANCE_QUOTA ='/plan/balanceQuota'

const createPlan =async(data)=>{
    const response = await authAxious.post(API_URL_CREATE_PLAN,{data})
    return response.data
}

const getBrokerId = async(id)=>{
    const response = await authAxious.post(API_URL_GET_BROKERID,{id})
    return response.data
}

const deletePlan =async(data)=>{
    const response = await authAxious.delete(API_URL_DELETE_PLAN,{data})
    return response.data
}

const updatePlan = async(data)=>{
    const response = await authAxious.post(API_URL_UPDATE_PLAN,{data})
    return response.data
}

// const getPlanByName = async(planName)=>{
//     const responce = await authAxious.get(`${API_URL_GET_PLAN_NAME}?planName=${planName}`)
//     return responce.data
// }

const getAllPlan = async(data)=>{
    const responce = await authAxious.post(API_URL_GET_ALL_PLAN,{data})
    return responce.data
}

// const getPlanDetailsBYId = async(id)=>{
//     const responce = await authAxious.post(API_URL_PLAN_DETAILS_BYID,{params:id.id})
//     return responce.data
// }

const balanceQuota = async(data)=>{
    const response= await authAxious.post(API_URL_GET_BALANCE_QUOTA,{data})
    return response.data
}

const planService ={
    createPlan,
    getAllPlan,
    getBrokerId,
    deletePlan,
    updatePlan,
    // getPlanDetailsBYId,
    balanceQuota,
}
export default planService