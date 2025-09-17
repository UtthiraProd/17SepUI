import authAxious from '../Config/interceptor'

const API_URL_FETCH_DASHBOARD_DETAILS_BY_BROKER_ID ='/dashboard/getDashboardDetailByBrokerId'

const getDashboardDetailByBrokerId = async() =>{
    const response = await authAxious.post(API_URL_FETCH_DASHBOARD_DETAILS_BY_BROKER_ID)
    console.log('API Response:', response.data);
    return response.data;
}

const dashboardService ={
    getDashboardDetailByBrokerId
}

export default dashboardService 
