import './App.scss';
import './scss/common.scss';
import authService from './Features/Services/authService.js'
import Config from './AppConfig.json'
import { Routes, Route } from 'react-router';
import { BrowserRouter, useLocation, Navigate } from 'react-router-dom';
import { useEffect } from "react";
import { Provider } from 'react-redux';
import store from './App/Store';
import { ToastContainer } from 'react-toastify';

// Import components
import { Login } from './Pages/User/Login';
import { ResetUser } from './Pages/User/ResetUser';
import { Register } from './Pages/User/Register';
// import { BrokerList } from './Pages/PublicUser/publicUserBrokerList.jsx';
import { ProfileList } from './Pages/Broker/ProfileList.jsx';
import { PublicProfile } from './Pages/Profile/PublicProfile';
import { RegisterProfile } from './Pages/Broker/RegisterProfile.jsx';
import { AddProfileImage } from './Pages/Broker/AddProfileImage';
import { EditProfile } from './Pages/Broker/EditProfile.jsx';
import { RegisterBroker } from './Pages/Broker/RegisterBroker';
import { BrokerHome } from './Pages/Broker/BrokerHome';
import { Dashboard } from './Pages/Common/Dashboard';
import { TermsOfUse } from './Pages/Common/TermsOfUse';
import { NavBar } from './Pages/Common/NavBar';
import { Footer } from './Pages/Common/Footer';
import { Pdfpage } from './Pages/TestFiles/Pdfpage';
import { Pdftest1 } from './Pages/TestFiles/Pdftest1';
import { AddBrokerImage } from './Pages/Broker/AddBrokerImage';
import { ImageCrop } from './Pages/TestFiles/ImageCrop';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import { AddUserByBroker } from './Pages/User/AddUserByBroker';
import { UsersByBrokerList } from './Pages/User/UsersByBrokerList.jsx';
import { EditUserByBroker } from './Pages/User/EditUserByBroker.jsx';
// import { OfficerRegister } from './Pages/Test/OfficerRegister.jsx';
// import { EditOfficer } from './Pages/Test/OfficerEdit.jsx';
import { JobList } from './Pages/Configuration/JobList.jsx'
import { QualificationList } from './Pages/Configuration/QualificationList.jsx'
import { ForeignCountryList } from './Pages/Configuration/ForeignCountryList.jsx'
import { BrokerProfile } from './Pages/Broker/BrokerProfile.jsx'
import { OtherLocationList } from './Pages/Configuration/OtherLocation.jsx'
import { DistrictList } from './Pages/Configuration/DistrictList.jsx'
import { CasteList } from './Pages/Configuration/CasteList.jsx'
import { StateList } from './Pages/Configuration/StateList.jsx'
import { ReligionList } from './Pages/Configuration/ReligionList.jsx';
import { ForgotUser } from './Pages/User/ForgotUser.jsx'
import { BrokerPendingList } from './Pages/Profile/BrokerPendingList.jsx'
import { PendingProfileDetails } from './Pages/Profile/PendingProDetails.jsx'
import { ForgotSend } from './Pages/User/ForgotSend.jsx'
import { AdminPendingList } from './Pages/Profile/AdminPendingList.jsx'
import { AdminProfile } from './Pages/Profile/AdminProfile.jsx'
import { AdminVerify } from './Pages/Profile/AdminVerify.jsx'
import { MotherTongueList } from './Pages/Configuration/MotherTongueList.jsx'
import { initGA, logPageView } from './analytics';
import { CreatePlan } from './Pages/Broker/UserPlan.jsx'
import { BrokerUser } from './Pages/UserProfile/BrokerUser.jsx'
import { AdminBrokerList } from './Pages/Broker/AdminBrokerList.jsx'
import { EditBroker } from './Pages/Broker/EditBroker.jsx'
import { BrokerDetails } from './Pages/Broker/BrokerDetails.jsx';
import { UserProfileList } from './Pages/UserProfile/UserProfileList.jsx'
import { ProfileDetails } from './Pages/UserProfile/profileDetails.jsx'
import { UserDetails } from './Pages/UserProfile/UserDetails.jsx'
import PaymentPage from './Components/RazorpayGPayButton';
import { BUProfileList } from './Pages/BrokerUser/BUProfileList.jsx'
import { BUProfile } from './Pages/BrokerUser/BUProfile.jsx'
import { UserHome } from './Pages/BrokerUser/BUuserProfile.jsx'
import { PublicUserBrokerList } from './Pages/PublicUser/publicUserBrokerList.jsx'
import { PURegisterProfile } from './Pages/PublicUser/PURegisterProfile.jsx'
import { PUAddProfileImage } from './Pages/PublicUser/PUAddProfileImage.jsx'
import { PublicUserProfile } from './Pages/PublicUser/PublicUserProfile.jsx'
import { PublicUserHome } from './Pages/PublicUser/PublicUserHome.jsx'
import { PUEditProfile } from './Pages/PublicUser/PUEditProfile.jsx'
import { PUProfileList } from './Pages/PublicUser/PUProfileList.jsx'
import { PUPlanSchedule } from './Pages/PublicUser/PUPlanSchedule.jsx'
import { AdminAddBrokerImage } from './Pages/Broker/AdminAddBrokerImage.jsx'
import { PUAddHoroscope } from './Pages/PublicUser/PUAddHoroscope.jsx'
import { PURegisterImage } from './Pages/PublicUser/PURegisterImage.jsx'
import {PUBrokProfileDetails} from './Pages/PublicUser/PUBrokProfileDetails.jsx'
import { PublicUserProfileList } from './Pages/Broker/PublicUserProfileList.jsx';
import { PUprofileDetails } from './Pages/Broker/PUprofileDetails.jsx';
import { NewPUProfileList } from './Pages/Broker/NewPUProfileList.jsx';
import { MatchProfile } from './Pages/Broker/MatchProfile.jsx';
import {MatchprofileDetail} from './Pages/Broker/MatchProfileDetails.jsx'
import { BrokerApproveDetails } from './Pages/Broker/BrokerApproveDetails.jsx';
import { BrokertoBrokerAccess } from './Pages/Broker/BrokertoBrokerAccess.jsx'; 
import { PUBrokerDetails } from './Pages/Broker/PUBrokerDetails.jsx';
import { AdditionalPlan } from './Pages/PublicUser/AdditionalPlan.jsx';
import { BrokerToBrokerList } from './Pages/BrokerToBroker/BrokerList.jsx';
import { BrokerProfileList } from './Pages/BrokerToBroker/BrokerProfileList.jsx';
import { BrokViewProfDetails } from './Pages/BrokerToBroker/BrokViewProfDetails.jsx';
import { ViewPlan } from './Pages/PublicUser/ViewPlan.jsx';
import { PUMarriageProfiles } from './Pages/Broker/PUMarriageProfiles.jsx';
import { PUMarriageProfDetail } from './Pages/Broker/PUMarriageProfDetail.jsx'


// Conditional Navbar component
function ConditionalNavBar() {
  const location = useLocation();
  return location.pathname !== '/ResetUser' &&
    location.pathname !== '/Login' &&
    location.pathname !== '/ForgotUser' &&
    location.pathname !== '/Registeruser' &&
    location.pathname !== '/TermsOfUse'
    ? <NavBar /> : null;
}

function ConditionalFooter() {
  const location = useLocation();
  return location.pathname !== '/ResetUser'
    && location.pathname !== '/Login' &&
    location.pathname !== '/ForgotUser' &&
    location.pathname !== '/Registeruser'&&
    location.pathname !== '/TermsOfUse'
    ? <Footer /> : null;
}


export default function App() {

  useEffect(() => {
    initGA(); // Initialize GA4
    logPageView(); // Log the initial page view

    // Optionally, track page views on route changes
    window.addEventListener('popstate', logPageView);

    return () => {
      window.removeEventListener('popstate', logPageView);
    };
  }, []);

  useEffect(() => {
  sessionStorage.setItem("sessionActive", "true");

  return () => {
    sessionStorage.removeItem("sessionActive");
  };
}, []);

    useEffect(() => {
    const storedUser = localStorage.getItem("User");
    if (!storedUser) return;
    
    let userData;

    try {
      userData = JSON.parse(storedUser);
    } catch (err) {
      console.error("Invalid JSON in localStorage User:", err);
      return;
    }
  
    // Check after parsing
    if (!userData || !userData._id) {
      return;
    }

     const isSessionActive = sessionStorage.getItem("sessionActive") === "true";

    if (userData.isLoggedin === true && isSessionActive) {
  
      const intervalDuration = parseInt(Config.timeDurationInminutes) * 60 * 1000;
  
      const interval = setInterval(() => {
        authService.activeUser({ userId: userData._id, isLoggedin: true });
      }, intervalDuration);
  
      return () => clearInterval(interval);
    }
  }, []);
  

  // useEffect(() => {
  //   const handleContextMenu = (e) => {
  //     e.preventDefault();
  //   };
  //   document.addEventListener('contextmenu', handleContextMenu);
  //   return () => {
  //     document.removeEventListener('contextmenu', handleContextMenu);
  //   };
  // }, []);


  // useEffect(() => {
  //   const handleLogoutOnUnload = () => {
  //     let user = JSON.parse(sessionStorage.getItem("user"));
  //               let data = { _id: user._id, isLoggedin: false};
  //           authService.logoutTrue(data)
  //   }

  //   window.addEventListener('unload', handleLogoutOnUnload);
  //   return () => {
  //     window.removeEventListener('unload', handleLogoutOnUnload);
  //   };
  // }, []);




  return (
    <BrowserRouter>
      <Provider store={store}>
        {/* Conditional NavBar */}
        <ConditionalNavBar />

        {/* Main content container */}
        <div className="container" style={{ minHeight: '610px', padding: '15px' }}>
          {/* <GoogleReCaptchaProvider reCaptchaKey="6LfOt60qAAAAAC7D3mqw1FwDQVGDcsWUwTX8PXXy"> */}
          <Routes>
            {/* Define Routes with leading slashes */}
            <Route path="/Login" element={<Login />} />
            {/* <Route path="/BrokerList" element={<BrokerList />} /> */}
            <Route path="/Registeruser" element={<Register />} />
            <Route path="/ProfileList" element={<ProfileList />} />
            <Route path="/PublicProfile" element={<PublicProfile />} />
            <Route path="/RegisterProfile" element={<RegisterProfile />} />
            <Route path="/AddProfileImage" element={<AddProfileImage />} />
            <Route path="/RegisterBroker" element={<RegisterBroker />} />
            <Route path="/EditProfile" element={<EditProfile />} />
            <Route path="/BrokerHome" element={<BrokerHome />} />
            <Route path="/AddBrokerImage" element={<AddBrokerImage />} />
            <Route path="/Pdfpage" element={<Pdfpage />} />
            <Route path="/Pdftest1" element={<Pdftest1 />} />
            <Route path="/ImageCrop" element={<ImageCrop />} />
            <Route path="/ResetUser" element={<ResetUser />} />
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/TermsOfUse" element={<TermsOfUse />} />
            <Route path="/AddUserByBroker" element={<AddUserByBroker />} />
            <Route path="/UsersByBrokerList" element={<UsersByBrokerList />} />
            <Route path="/EditUserByBroker" element={<EditUserByBroker />} />

            {/* <Route path="/OfficerRegister" element={<OfficerRegister/>}></Route> */}
            {/* <Route path="/WorkerRegister" element={<WorkerRegister/>}></Route> */}
            {/* <Route path="/EditOfficer" element={<EditOfficer/>}></Route> */}
            <Route path="/JobList" element={<JobList />}></Route>
            <Route path="/QualificationList" element={<QualificationList />}></Route>
            <Route path="/ForeignCountryList" element={<ForeignCountryList />} />
            <Route path="/BrokerProfile" element={<BrokerProfile />} />
            <Route path="/AdminProfile" element={<AdminProfile />} />
            <Route path="/OtherLocationList" element={<OtherLocationList />}></Route>
            <Route path="/DistrictList" element={<DistrictList />}></Route>
            <Route path="/CasteList" element={<CasteList />}></Route>
            <Route path="/ReligionList" element={<ReligionList />}></Route>
            <Route path="/StateList" element={<StateList />}></Route>
            <Route path='/BrokerPendingList' element={<BrokerPendingList />}></Route>
            {/* <Route path="/PendingProfileDetails" element={<PendingProfileDetails/>}></Route> */}
            <Route path="/SentSuccess" element={<ForgotSend />}></Route>
            <Route path="/AdminPendinglist" element={<AdminPendingList />}></Route>
            <Route path="/AdminProfile" element={<AdminProfile />}></Route>
            <Route path="/AdminVerify" element={<AdminVerify />}></Route>
            <Route path="/MotherTongueList" element={<MotherTongueList />}></Route>
            <Route path="/UserPlan" element={<CreatePlan />}></Route>
            <Route path="/BrokerUser" element={<BrokerUser />}></Route>
            <Route path="/AdminBrokerList" element={<AdminBrokerList />}></Route>
            <Route path="/EditBroker" element={<EditBroker />}></Route>
            <Route path="/BrokerDetails" element={<BrokerDetails />}></Route>
            <Route path="/UserProfileList" element={<UserProfileList />}></Route>
            <Route path="/ProfileDetails" element={<ProfileDetails />}></Route>
            <Route path="/UserDetails" element={<UserDetails />}></Route>
            <Route path="/Payment" element={<PaymentPage />} />
            <Route path="/BUProfileList" element={<BUProfileList />} />
            <Route path="/BUProfile" element={<BUProfile />} />
            <Route path="/UserHome" element={<UserHome />} />
            <Route path="/PublicUserBrokerList" element={<PublicUserBrokerList />} />
            <Route path="/PURegisterProfile" element={<PURegisterProfile />} />
            <Route path="/PUAddProfileImage" element={<PUAddProfileImage />} />
            <Route path="/PublicUserProfile" element={<PublicUserProfile />} />
            <Route path="/PublicUserHome" element={<PublicUserHome />} />
            <Route path="/PUEditProfile" element={<PUEditProfile />} />
            <Route path="/PUProfileList" element={<PUProfileList />} />
            <Route path="/PUPlanSchedule" element={<PUPlanSchedule />} />
            <Route path="/AdminAddBrokerImage" element={<AdminAddBrokerImage />} />
            <Route path="/PUAddHoroscope" element={<PUAddHoroscope />} />
            <Route path="/PURegisterImage" element={<PURegisterImage />} />
            <Route path="/PUBrokProfileDetails" element={<PUBrokProfileDetails/>}/>
            <Route path="/PublicUserProfileList"element={<PublicUserProfileList/>}></Route>
            <Route path="/PUprofileDetails"element={<PUprofileDetails/>}></Route>
            <Route path="/NewPUProfileList"element={<NewPUProfileList/>}></Route>
            <Route path="/MatchProfile"element={<MatchProfile/>}></Route>
            <Route path="/BrokerApproveDetails"element={<BrokerApproveDetails/>}></Route>
            <Route path="/BrokertoBrokerAccess" element={<BrokertoBrokerAccess/>}></Route>
            <Route path="/MatchprofileDetail" element={<MatchprofileDetail/>}></Route>
            <Route path="/PUBrokerDetails" element={<PUBrokerDetails/>}></Route>
            <Route path="/AdditionalPlan" element={<AdditionalPlan/>}></Route>
            <Route path="/BrokerToBrokerList" element={<BrokerToBrokerList/>}></Route>
            <Route path='/BrokerProfileList' element={<BrokerProfileList/>}></Route>
            <Route path='/BrokViewProfDetails' element={<BrokViewProfDetails/>}></Route>
            <Route path='/ViewPlan' element={<ViewPlan/>}></Route>
            <Route path='/PUMarriageProfiles' element={<PUMarriageProfiles/>} ></Route>
            <Route path='/PUMarriageProfDetail' element={<PUMarriageProfDetail/>} ></Route>
    
            

            



            <Route path='/ForgotUser' element={<ForgotUser />} />
            {/* Redirect root ("/") to "/Login" */}
            <Route path="/" element={<Navigate to="/Login" />} />

            {/* Fallback route for unknown paths */}
            <Route path="/*" element={<Login />} />
          </Routes>
          {/* </GoogleReCaptchaProvider> */}
        </div>

        {/* Toast notifications */}
        <ToastContainer />

        {/* Conditional Footer */}
        <ConditionalFooter />
      </Provider>
    </BrowserRouter>
  );
}
