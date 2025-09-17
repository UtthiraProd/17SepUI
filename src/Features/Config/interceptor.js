import axios from 'axios'
import appConfig from '../../AppConfig.json'
import authService from '../Services/authService'
//axios.defaults.withCredentials = true
//const API = axios.create();
const bearerToken = sessionStorage.getItem("Authorization-key")
const loginUrl = "/users/login"
const resetUserUrl ="/users/resetUserPassword"
const resetUserOtpUrl="/users/getResetPasswordOTP"
const registerUserOtpUrl ="/users/getNewRegisterOTP"
const registerOtpVerifyUrl ="/users/VerifyRegisterOTP"
const registerUserUrl ="/users"
const menuDetailsbyIdUrl = "/users/getUserMenuDetailsById"
const forgotUserOtpUrl = "/users/getForgotUserOTP"
const fotgotOtpVerifyUrl ="/users/forgotUser"

//const loginUrl = "/users/login"
const authAxious = axios.create({
 baseURL: 'https://matapi-gcd0ewgnddbnfdf8.southindia-01.azurewebsites.net/api',  
    //  baseURL: 'http://localhost:4000/api',
})






authAxious.interceptors.request.use(
    function (config) {

        // Retrieve the session data from sessionStorage
        const storedtimer = sessionStorage.getItem("timer");
        // Check if session data exists and is valid
        if (storedtimer) {

            // Check if the session is expired
            if (Date.now() >= storedtimer && !config.url.includes(loginUrl)){

                // Clear the token from storage (localStorage/sessionStorage)
                //localStorage.removeItem('auth_token');
                //sessionStorage.removeItem('auth_token');

//Update session in database
debugger

                let user = JSON.parse(sessionStorage.getItem("user"));
                let data = { _id: user._id, isLoggedin: false};
                authService.logoutTrue(data)

                sessionStorage["timer"] = ""

                // Redirect the user to the login page
                window.location.href = '/';  // This is a workaround for now
                return Promise.reject(new Error("Session expired"));

            } 
            
            else {
                const sessionDuration =  parseInt(appConfig.timeoutDuration) * 60 * 1000; // 30 minutes session duration
                const newExpirationTime = Date.now() + sessionDuration; // Expiry time (current time + session duration)

                // Store the updated session data back in sessionStorage
                sessionStorage.setItem("timer", newExpirationTime);
            }
        }
        
        else if(!config.url.includes(loginUrl) && !config.url.includes(resetUserUrl) && 
         !config.url.includes(registerUserOtpUrl)  && !config.url.includes(menuDetailsbyIdUrl)&&
          !config.url.includes(resetUserOtpUrl) && !config.url.includes(registerUserUrl) 
          && !config.url.includes(forgotUserOtpUrl) && !config.url.includes(registerOtpVerifyUrl) && !config.url.includes(fotgotOtpVerifyUrl)) {
            // If no session data exists, redirect to login
            window.location.href = '/';  // This is a workaround for now
            return Promise.reject(new Error("No session data"));
        }


        if (sessionStorage.getItem("user") && JSON.parse(sessionStorage.getItem("user"))) {
        //alert(JSON.stringify(sessionStorage.getItem("user")))
       // if (sessionStorage.getItem("Authorization-key")) {
      // alert(JSON.parse(sessionStorage.getItem("user")).token)
            config.headers = {
                //"Authorization": 'Bearer ' + sessionStorage.getItem("Authorization-key"),
               "Authorization": 'Bearer ' + JSON.parse(sessionStorage.getItem("user")).token,
            };

        }

        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error)
    }
);

authAxious.interceptors.response.use(
    function (response) {
        //Any status code that lie within the range of 2xx cause this function to trigger
        //Do something with response data
        return response;
    },
    function (error) {
        //Any status code that lies outside the range of 2xx cause this function to trigger
        //Do something with response error
        return Promise.reject(error);
    }
)

// const interceptor ={
//     API,
//     authAxious,
// }

export default authAxious;
