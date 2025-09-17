import authAxious from "../Config/interceptor";
// const API_URL_REGISTER_OFFICER='/officer/create'
// const API_URL_GET_ALL_OFFICER='/officer/getall'
// const API_URL_GET_OFFICER_BYID='/officer/getByID'
const API_URL_GET_ALL_STUDENT = '/student/getAllStudent'
const API_URL_UPDATE_STUDENT = '/student/updateStudent'


// const createofficer=async(data)=>{
//     const responce = await authAxious.post(API_URL_REGISTER_OFFICER,{data})
//     return responce.data
// }

// const getallofficer=async()=>{
//     const responce = await authAxious.get(API_URL_GET_ALL_OFFICER)
//     return responce.data
// }

// const getOfficeById=async(id)=>{
//     const responce=await authAxious.get(API_URL_GET_OFFICER_BYID,{id})
//     return responce.id
// }

const getAllStudent = async(data)=>{
    const responce = await authAxious.get(API_URL_GET_ALL_STUDENT,{data})
    return responce.data
}

const updateStudent = async(data)=>{
    const responce = await authAxious.post(API_URL_UPDATE_STUDENT,{data})
    return responce.data
}

const officerservice={
    // createofficer,getallofficer,getOfficeById,
    getAllStudent,updateStudent
}
export default officerservice