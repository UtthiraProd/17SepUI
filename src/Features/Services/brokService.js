import authAxious from '../Config/interceptor'
//import axios from 'axios'

const API_URL_GET_BROKERS ='/admin/getAllBroker'
//const API_URL_FETCH_BROKERS ='http://localhost:5000/api/broker/getAllBroker1'
const API_URL_FETCH_BROKERS ='/admin/getAllBroker'
const API_URL_REGISTER_BROKER ='/broker'
const API_URL_BROKER_DETAILS_BY_ID ='/broker/getBrokerDetailById'
const API_URL_top_Up_Plan_Broker = '/broker/topUpPlanBroker'

// const authAxious = axios.create({
//     baseURL:'http://localhost:5000/api',
//     headers:{
//         Authorization:`Bearer ${sessionStorage.getItem("Authorization-key")}`
//     },
// })

const getAllBrokers = async() =>{
    const response = await authAxious.post(API_URL_GET_BROKERS)
    return response.data;
}

// const fetchAllBrokers = async() =>{
//     const response = await authAxious.get(API_URL_FETCH_BROKERS)
//     return response.data;
// }

const fetchAllBrokers = async(data) =>{
    const response = await authAxious.post(API_URL_FETCH_BROKERS,data)
    return response.data;
}

const registerBroker = async(data) =>{
    const response = await authAxious.post(API_URL_REGISTER_BROKER,{data})
    return response.data;
}

const getBrokerDetailById = async(data) =>{
    const response = await authAxious.post(API_URL_BROKER_DETAILS_BY_ID,{"brokerId":data})
    return response.data;
}

const topUpPlanBroker = async(data)=>{
    const responce = await authAxious.post(API_URL_top_Up_Plan_Broker,{data})
    return responce.data;
}

const brokService ={
    getAllBrokers,
    fetchAllBrokers,
    registerBroker,
    getBrokerDetailById,
    topUpPlanBroker
    
}

export default brokService 
