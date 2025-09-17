import appConfig from '../src/AppConfig.json';

const getLocalUser = () => {
  try {
    const userData = sessionStorage.getItem('user');
    // alert(userData)
    if (!userData) return null;
    return JSON.parse(userData);
  } catch (err) {
    console.error("Failed to parse session user data:", err);
    return null;
  }
};

const getUserData = () => {
  try {
    const data = localStorage.getItem('User');
    // alert(data)
    if (!data) return null;
    return JSON.parse(data);
  } 
  catch (err) {
    console.error("Error reading local user:", err);
    return null;
  }
};

  const sessionDuration = parseInt(appConfig.timeoutDuration) * 60 * 1000; // 30 minutes session duration
  const expirationTime = Date.now() + sessionDuration; // Expiry time (current time + session duration)

  const sessionData ={
    getUserData,
    getLocalUser,  
    expiresAt: expirationTime,
}

  // Store the session data in sessionStorage
  sessionStorage.setItem("session", JSON.stringify(sessionData));
  localStorage.setItem("localsession", JSON.stringify(sessionData));
  sessionStorage.setItem("timer", JSON.stringify(sessionData))
  localStorage.setItem("timer", JSON.stringify(sessionData))  
  
export default sessionData 