import authAxious from '../Config/interceptor'
const API_URL_MASTER_ALL_STARS ='/master/getAllStars'
const API_URL_MASTER_ALL_RASIS ='/master/getAllRasi'
const API_URL_MASTER_ALL_DISTRICTS_BySTATE ='/master/getAllDistrictsByState'
const API_URL_MASTER_ALL_JOBS ='/master/getAllJobs'
const API_URL_MASTER_ALL_QUALIFICATIONS ='/master/getAllQualifications'
const API_URL_MASTER_ALL_RELIGIONS ='/master/getAllReligion'
const API_URL_MASTER_ALL_CASTES = '/master/getAllCaste'
const API_URL_MASTER_ALL_FOREIGN_COUNTRIES ='/master/getForeignCountries'
const API_URL_MASTER_ALL_JOB_LOCATIONS ='/master/getotherLocation'
const API_URL_MASTER_ALL_SETTLE_LOCATIONS ='/master/getotherLocation'
const API_URL_MASTER_QUALIFICATIONS_BY_ID='/master/getQualificationById'
const API_URL_CREATE_QUALIFICATION='/master/createQualification'
const API_GET_JOB_BYID='/master/getjobById'
const API_URL_CREATE_JOB='/master/createjob'
const API_CREATE_OTHER_LOCATION='/master/createotherlocation'
const API_UPDATE_OTHER_LOCATION='/master/updateOtherlocation'
const API_OTHER_LOCATION='/master/getotherLocation'
const API_URL_CREATE_DISTRICT='/master/createdistricts'
const API_URL_UPDATE_DISTRICT='/master/updateDistrict'
const API_URL_DELETE_DISTRICT='/master/deleteDistrict'
const API_URL_GETBYNAME_DISTRICT='/master/getByDistrictName'
const API_URL_CREATE_FOREIGN_COUNTRIES='/master/createForeignCountry'
const API_URL_DELETE_JOB='/master/deletejob'
const API_URL_CREATE_CASTE = '/master/createcaste'
const API_URL_CREATE_RELIGIONS='/master/createreligion'
const API_URL_DELETE_QUALIFICATION='/master/deleteQualification'
const API_URL_MASTER_QUALIFICATIONS_BY_NAME='/master/getQualificationByName'
const API_URL_UPDATE_JOB='/master/updatejob'
const API_URL_DELETE_CASTE='/master/deletecaste'
const API_URL_UPDATE_CASTE = '/master/updatecaste'
const API_URL_DELETE_FOREIGN_COUNTRY='/master/deleteCountry'
const API_URL_UPDATE_FOREIGN_COUNTRY='/master/updateCountry'
const API_URL_UPDATE_QUALIFICATION='/master/updateQualification'
const API_URL_GET_BY_NAME_CASTE='master/getByCasteName'
const API_URL_GET_BY_NAME_COUNTRY='master/getByCountryName'
const API_URL_GET_ALL_MOTHER_TONGUE='master/getAllMotherTongue'
const API_URL_CREATE_MOTHER_TONGUE='master/createMotherTongue'
const API_URL_UPDATE_MOTHER_TONGUE='master/updateMotherTongue'
const API_URL_DELETE_MOTHER_TONGUE='master/deleteMotherTongue'
const API_URL_GETBY_NAMNE_MOTHERTONGUE='master/getByMotherTongueName'
const API_GET_JOB_BY_NAME ='/master/getJobByName'
const API_DELETE_OTHER_LOCATION='/master/deletelocation'
const API_URL_GET_ALL_STATES = '/master/getAllStates'
const API_URL_CREATE_STATE = '/master/addState'
const API_URL_UPDATE_STATE = '/master/updateState'
const API_URL_DELETE_STATE = '/master/deleteState'
const API_URL_GET_STATE_NAME = '/master/getStateByName'
const API_URL_UPDATE_RELIGION = '/master/updatereligion'
const API_URL_DELETE_RELIGION = '/master/deletereligion'
const APL_URL_GRT_BY_RELIGION_NAME = '/master/getByReligionName'
const API_URL_GET_LOCATION_BY_NAME='/master/getLocationByName'


const getAllStars = async() =>{
    const response = await authAxious.get(API_URL_MASTER_ALL_STARS)
    return response.data;
}
const getAllRasis = async() =>{
    const response = await authAxious.get(API_URL_MASTER_ALL_RASIS)
    return response.data;
}
const getAllDistricts = async() =>{
    const response = await authAxious.get(API_URL_MASTER_ALL_DISTRICTS_BySTATE)
    return response.data;
}

const updateDistrict = async(data)=>{
    const responce =await authAxious.post(API_URL_UPDATE_DISTRICT,{data})
    return responce.data;
}

const getAllJobs = async() =>{
    const response = await authAxious.get(API_URL_MASTER_ALL_JOBS)
    return response.data;
}
const getAllQualifications = async() =>{
    const response = await authAxious.get(API_URL_MASTER_ALL_QUALIFICATIONS)
    return response.data;
}

const getAllReligions = async() =>{
    const response = await authAxious.get(API_URL_MASTER_ALL_RELIGIONS)
    return response.data;
}
const updatereligion = async (data) =>{
    const responce = await authAxious.post(API_URL_UPDATE_RELIGION,{data})
    return responce.data;
}

const getAllCastes = async() =>{
    const response = await authAxious.get(API_URL_MASTER_ALL_CASTES)
    return response.data;
}

const getAllForeignCountries = async() =>{
    const response = await authAxious.get(API_URL_MASTER_ALL_FOREIGN_COUNTRIES)
    return response.data;
}

const getAllJobLocations = async() =>{
    const response = await authAxious.get(API_URL_MASTER_ALL_JOB_LOCATIONS)
    return response.data;
}
const getAllSettleLocations = async() =>{
    const response = await authAxious.get(API_URL_MASTER_ALL_SETTLE_LOCATIONS)
    return response.data;
}

const createQualification=async(data)=>{
    const response=await authAxious.post(API_URL_CREATE_QUALIFICATION,{data})
    return response.data;
}

const getQualificationById =async(id) =>{
    const response =await authAxious.get(API_URL_MASTER_QUALIFICATIONS_BY_ID,{id})
    return response.data;
}

const getQualificationByName =async(qualification) =>{
    const response =await authAxious.get(`${API_URL_MASTER_QUALIFICATIONS_BY_NAME}?qualification=${qualification}`)
    return response.data;
}

const createotherlocation= async(data)=>{
    const response = await authAxious.post(API_CREATE_OTHER_LOCATION,{data})
    return response.data;
}

const updateOtherlocation= async(data)=>{
    const response = await authAxious.post(API_UPDATE_OTHER_LOCATION,{data})
    return response.data;
}

const getAlllocation=async()=>{
    const response =await authAxious.get(API_OTHER_LOCATION)
    return response.data;
}

const createdistricts = async(data) =>{
    const response = await authAxious.post(API_URL_CREATE_DISTRICT,{data})
    return response.data;
}

const deleteDistrict = async(data) =>{
    const response = await authAxious.delete(API_URL_DELETE_DISTRICT,{data})
    return response.data
}
const getByDistrictName = async(district)=>{
    const responce = await authAxious.get(`${API_URL_GETBYNAME_DISTRICT}?district=${district}`)
    return responce.data;
}

const createjob = async(data) =>{
    const response = await authAxious.post(API_URL_CREATE_JOB,{data})
    return response.data;
}


const createForeignCountry = async(data) =>{
    const response = await authAxious.post(API_URL_CREATE_FOREIGN_COUNTRIES,{data})
    return response.data;
}

const deleteJob= async(data)=>{
    const responce =await authAxious.delete(API_URL_DELETE_JOB,{data})
    return responce.data;
}
const deleteQualification= async(data)=>{
    const responce =await authAxious.delete(API_URL_DELETE_QUALIFICATION,{data})
    return responce.data;
}

const updateQualification=async(data)=>{
    const response =await authAxious.post(API_URL_UPDATE_QUALIFICATION,{data})
    return response.data;
}

const createcaste = async(data)=>{
    const response = await authAxious.post(API_URL_CREATE_CASTE,{data})
    return response.data;
}

const createreligion = async(data)=>{
    const responce = await authAxious.post(API_URL_CREATE_RELIGIONS,{data})
    return responce.data;
}

const updatejob=async(data)=>{
    const response =await authAxious.post(API_URL_UPDATE_JOB,{data})
    return response.data;
}

const getjobById =async(id) =>{
    const response =await authAxious.get(API_GET_JOB_BYID,{id})
    return response.id;
}

const deleteCaste = async(data)=>{
    const responce = await authAxious.delete(API_URL_DELETE_CASTE,{data})
    return responce.data;
}

const updateCaste = async(data)=>{
    const responce = await authAxious.post(API_URL_UPDATE_CASTE,{data})
    return responce.data;
}

const deleteCountry = async(data)=>{
    const responce = await authAxious.delete(API_URL_DELETE_FOREIGN_COUNTRY,{data})
    return responce.data;
}

const updateCountry = async(data)=>{
    const responce = await authAxious.post(API_URL_UPDATE_FOREIGN_COUNTRY,{data})
    return responce.data;
}

const getByCountryName = async(foreignCountry)=>{
    const responce = await authAxious.get(`${API_URL_GET_BY_NAME_COUNTRY}?foreignCountry=${foreignCountry}`)
    return responce.data;
}

const getAllMotherTongue = async()=>{
    const responce = await authAxious.get(API_URL_GET_ALL_MOTHER_TONGUE)
    return responce.data;
}

const createMotherTongue = async(data)=>{
    const responce = await authAxious.post(API_URL_CREATE_MOTHER_TONGUE,{data})
    return responce.data;
}

const updateMotherTongue = async(data)=>{
    const responce = await authAxious.post(API_URL_UPDATE_MOTHER_TONGUE,{data})
    return responce.data;
}

const deleteMotherTongue = async(data)=>{
    const responce = await authAxious.delete(API_URL_DELETE_MOTHER_TONGUE,{data})
    return responce.data;
}

const getByMotherTongueName = async(motherTongue)=>{
    const responce = await authAxious.get(`${API_URL_GETBY_NAMNE_MOTHERTONGUE}?motherTongue=${motherTongue}`)
    return responce.data;
}

const getByCasteName = async(caste)=>{
    const responce = await authAxious.get(`${API_URL_GET_BY_NAME_CASTE}?caste=${caste}`)
    return responce.data;
}
const getJobByName=async(job)=>{
    const response=await authAxious.get(`${API_GET_JOB_BY_NAME}?job=${job}`)
    return response.data;
}
const deletelocation =async(data)=>{
    const response =await authAxious.delete(API_DELETE_OTHER_LOCATION,{data})
    return response.data;
}

const getAllStates =async()=>{
    const responce = await authAxious.post(API_URL_GET_ALL_STATES)
    return responce.data;
}
 
const createState = async(data)=>{
    const responce = await authAxious.post(API_URL_CREATE_STATE,{data});
    return responce.data
}

const updateState = async(data)=>{
    const responce = await authAxious.post(API_URL_UPDATE_STATE,{data})
    return responce.data
}

const deleleState = async(data)=>{
    const responce = await authAxious.delete(API_URL_DELETE_STATE,{data})
    return responce.data
}
const getStateByName =async(name)=>{
    const responce = await authAxious.get(`${API_URL_GET_STATE_NAME}?name=${name}`)
    return responce.data
}
const deletereligion = async (data) =>{
    const responce = await authAxious.delete(API_URL_DELETE_RELIGION,{data})
    return responce.data;
}
const getByReligionName = async (religion) => {
    const responce = await authAxious.get(`${APL_URL_GRT_BY_RELIGION_NAME}?religion=${religion}`)
    return responce.data
}
const getLocationByName=async(location)=>{
    const response=await authAxious.get(`${API_URL_GET_LOCATION_BY_NAME}?location=${location}`)
    return response.data;
}
const masterService ={
    getAllStars,
    getAllRasis,
    getAllDistricts,
    getAllJobs,
    getAllQualifications,
    getAllReligions,
    getAllCastes,
    getAllForeignCountries,
    getAllJobLocations,
    getAllSettleLocations,
    createQualification,
    getQualificationById,
    createotherlocation,
    updateOtherlocation,
    getAlllocation,
    createdistricts,
    updateDistrict,
    deleteDistrict,
    getByDistrictName,
    createjob,
    createForeignCountry,
    deleteJob,
    createcaste,
    createreligion,
    deleteQualification,
    updateQualification,
    getQualificationByName,
    updatejob,
    getjobById,
    deleteCaste,
    updateCaste,
    deleteCountry,
    updateCountry,
    getByCasteName,
    getByCountryName,
    getAllMotherTongue,
    createMotherTongue,
    updateMotherTongue,
    deleteMotherTongue,
    getByMotherTongueName,
    getJobByName,
    deletelocation, getAllStates,
    createState,
    updateState,
    deleleState,
    getStateByName,
    updatereligion,
    deletereligion,
    getByReligionName,
    getLocationByName
}

export default masterService 
