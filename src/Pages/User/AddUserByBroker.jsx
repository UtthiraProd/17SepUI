import { Carousal } from "../Common/Carousal"
import "../../scss/publicProfile.scss"
import "../../scss/profileList.scss"
import { useLocation } from 'react-router-dom'
import {useDispatch, useSelector} from  'react-redux'
import { useEffect, useState } from "react";
import { useNavigate,useSearchParams } from 'react-router-dom'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {toast} from "react-toastify"
import {registerProfile, resetRegisterProfile,resetRegisterMessages,getAllStars,
  getAllRasis,getAllDistricts,getAllJobs,getAllQualifications,getAllReligions,
  getAllCastes} from "../../Features/Slices/profSlice"
import{ValidateFields } from "../../Validation/Common/fieldValidation"

var   RegisterProfileValidation = require('../../Validation/Config/RegisterProfile.json')




export function AddUserByBroker() {
 
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const brokerIdParam = searchParams.get('id')
    const [DOBBirth, setDOBDate] = useState(null);
    let isImageCanUpload = false
    //dispatch(reset())
    const [formData,setFormData] = useState({
      name:'',
      usertype:'',
      email:'',
      password:'',
      confirmPassword:'',
      phoneNumber:'',
      sex:'',
      ProfileId:'',
      userCategory:'',
      address1:'',
      address2:'',
      district:'',
      state:'',
      startDate:'',
      expiryDate:'',
      profileData:'',
      usercategory:''
      
    })
    const {name,usertype,email,address1,address2,state,district,password,
      confirmPassword,startDate,expiryDate,profileData,usercategory,
      phoneNumber,sex,ProfileId,userCategory} = formData

    const onchange = (e) => {

      //alert(e.target.name)

        setFormData((prevState)=>({
            ...prevState,
            [e.target.name]:e.target.value
        }))
    }

    const {broker,isError,isSuccess,isLoading,message,isStarListSuccess,
      RegisterProfilemessage,isRegisterProfileSuccess,isRegisterProfileError,
      registerProfilemessage,registerProfileId,
      profileDetails,isStarListLoading,stars,isRasiListLoading,isRasiListSuccess,rasis
      ,isDistrictListLoading,isDistrictListSuccess,districts,qualifications,
      isQualificationLoading,isQualificationSuccess,
      jobs,isJobListLoading,isJobListSuccess,religions,isReligionError,
      isReligionSuccess,isReligionLoading,castes,iscasteError,iscasteSuccess,iscasteLoading} =
    useSelector(
      (state) => state.prof
    )

    useEffect(()=>{
        if(isError){
            toast.error(message)
        }
        if(isSuccess)
        {
            navigate('/BrokerList', { replace: true });
        }
   if(!isDistrictListLoading && !isDistrictListSuccess)
   {
    dispatch(getAllDistricts())
    console.log(districts)
  }

  if(!isStarListLoading && !isStarListSuccess)
  {
     dispatch(getAllStars())
  }
  if(!isRasiListLoading && !isRasiListSuccess)
  {
    dispatch(getAllRasis())
  }

  if(!isJobListLoading && !isJobListSuccess)
  {
    dispatch(getAllJobs())
  }

  if(!isQualificationLoading && !isQualificationSuccess)
  {
    dispatch(getAllQualifications())
  }

  if(!isReligionLoading && !isReligionSuccess)
  {
    dispatch(getAllReligions())
  }

  if(!iscasteLoading && !iscasteSuccess)
  {
    dispatch(getAllCastes())
  }
    // if(DOBBirth == "" || DOBBirth == null)
    //   document.getElementById("DOB").style.borderColor = "red";
    //   else
    //   document.getElementById("DOB").style.borderColor = ""; 
       
    },[broker,isError,isSuccess,isLoading,message,navigate],dispatch)

    const [isFormSubmitted, setIsFormSubmitted] = useState(false);

    useEffect(() => {
      debugger
      if (isRegisterProfileSuccess ) {
        toast.success("Profile added successfully")
        dispatch(resetRegisterMessages())
        navigate('/AddProfileImage?id='+ registerProfileId, { replace: true });
      }
      else if(isRegisterProfileError == true)
     {
        toast.error(registerProfilemessage)
        dispatch(resetRegisterMessages())
     }
    }, [isRegisterProfileSuccess, isRegisterProfileError]);


    

    const onSubmit = (e) =>{
        e.preventDefault();

        setFormData((prevState)=>({
            ...prevState,
            [e.target.name]:e.target.name
        }))

        
    let hasRequiredfieldValidation = false
    let hasOtherfieldValidation = false
    
    const brokerReqFields = {
      usertype,userCategory,name,DOBBirth,sex,phoneNumber,address1,address2,district,state,email,
    password,confirmPassword,startDate,expiryDate
    }

    for (const [key, value] of Object.entries(brokerReqFields)) {

        if(value == ""){
          hasRequiredfieldValidation = true;
         return toast.error('Please fill all (*)required field')
        }
    }

    const UserData ={
      name,email,password,confirmPassword,phoneNumber,sex,ProfileId,userCategory}

    if(hasRequiredfieldValidation == false)
      {
          for (const [key, value] of Object.entries(profileData)) {
            let arrValidation = RegisterProfileValidation.filter(validateprofile => validateprofile.fieldName === key)
            for (const currentObject of arrValidation) {
                let message = ValidateFields(currentObject, value);
                if (message != '') {
                  hasOtherfieldValidation = true
                  toast.error(message)
                  return
                }
            }
          }
        }

      
        if(!hasRequiredfieldValidation && !hasOtherfieldValidation){
         dispatch(registerProfile(UserData))
         setIsFormSubmitted(true);

  // if(isRegisterProfileSuccess == true)
  // {
  //   toast.success("Profile added successfully")
  //   navigate('/AddProfileImage?id='+ registerProfileId, { replace: true });
  // }
  // else if(isRegisterProfileError == true)
  // {
  //   toast.success(registerProfilemessage)
  // }

  }
       
        
    }


    const onCancelClick = () =>{
      if(JSON.parse(localStorage["User"]).role == "Broker")
      navigate('/ProfileList?', { replace: true });
      else
      navigate('/BrokerList', { replace: true });
  }

 const onResetClick =()=>{
  var registerProfileelement = document.getElementById("frmregisterprofile");
  registerProfileelement.reset()
   dispatch(resetRegisterProfile())
 }






  return (
    <>
    <div>
    
    <p className="h4">Add Users</p>
    <br/>
   
    <p className="h6"><b>User Category</b></p>

        <form action="" id="frmregisterprofile" onSubmit={onSubmit}>
      <div id="dvRegisterProfile" className="row">
        <div className="col-md-12">
          
            <div className="row">

            <div className="form-group col-md-4">
                <label htmlFor="usertype">Profile ID <span style={{color: 'red'}}><b>*</b></span></label>
                <input type="text"  className={ name =='' ? "form-control bordererror": "form-control"} name="name" id="name"  onChange={onchange}></input>
              </div>

              <div className="form-group col-md-4">
                <label htmlFor="usercategory">User Category <span style={{color: 'red'}}><b>*</b></span></label>
                <select className={ usercategory =='' ? "form-select form-select-sm bordererror": "form-select form-select-sm"} name="usercategory" id="usercategory"  onChange={onchange} aria-label=".form-select-sm example">
                <option value="">Select</option>
                <option value={"Silver"}>Silver</option>
                </select>
              </div>

            </div>


            <br/><br/><p className="h6"><b>User Details</b></p>


            <div className="row">

            <div className="form-group col-md-4">
                <label htmlFor="name">Name <span style={{color: 'red'}}><b>*</b></span></label>
                <input type="text"  className={ name =='' ? "form-control bordererror": "form-control"} name="name" id="name"  onChange={onchange}></input>
              </div>


             



              <div className="form-group col-md-4">
                <label htmlFor="phoneNumber">Phone Number <span style={{color: 'red'}}><b>*</b></span></label>
                <input type="text"  className={ phoneNumber =='' ? "form-control bordererror": "form-control"} name="phoneNumber"  id="phoneNumber" onChange={onchange}></input>
              </div>
              
            </div>
        


              <br/><br/>

              <p className="h6"><b>Login Details</b></p>


              <div className="row">

              <div className="form-group col-md-4">
                  <label htmlFor="email">Email <span style={{color: 'red'}}><b>*</b></span></label>
                  <input type="text"  className={ name =='' ? "form-control bordererror": "form-control"} name="email" id="email"  onChange={onchange}></input>
              </div>

              <div className="form-group col-md-4">
                  <label htmlFor="password">Password <span style={{color: 'red'}}><b>*</b></span></label>
                  <input type="text"  className={ name =='' ? "form-control bordererror": "form-control"} name="password" id="password"  onChange={onchange}></input>
              </div>

              <div className="form-group col-md-4">
                  <label htmlFor="confirmpassword">Confirm Password <span style={{color: 'red'}}><b>*</b></span></label>
                  <input type="text"  className={ name =='' ? "form-control bordererror": "form-control"} name="confirmpassword" id="confirmpassword"  onChange={onchange}></input>
              </div>

              </div>


             

              <br/>
              

        </div>
            
       
      </div>
   
      <div className="row"></div>
    <div>
    <div className="button-container">
      <button className="primarybutton" type="submit">Save</button>
      <button onClick={()=>onResetClick()} className="secondarybutton" >Reset</button>
      <button onClick={()=>onCancelClick()} className="secondarybutton">Cancel</button>
      </div>
     </div>
      </form>  
      </div>

      

    </>

    

    
  )

  
  
}

