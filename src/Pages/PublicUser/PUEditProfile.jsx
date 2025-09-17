
import { Carousal } from "../Common/Carousal"
import "../../scss/publicProfile.scss"
import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from 'react-router-dom'
import { toast } from "react-toastify"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import DatePicker from 'react-datepicker';
import { Link } from "react-router-dom";
import 'react-datepicker/dist/react-datepicker.css';
import { formatToTwoDigits } from '../../Utils/formatters'
import "../../scss/profileList.scss"
import {
  resetUpdatedProfile, getAllStars,
  getAllRasis, getAllDistricts, getAllJobs, getAllQualifications, getAllCastes,
   getProfileImageUrl, removeProfileImage,
  deleteProfile,
  uploadfile, setProfilePicture, resetProfilePicture,
  resetUpdatedProfileMessage,getAllStates,
  resetDeleteProfileMessage, getAllForeignCountries, getAllJobLocations, getAllSettleLocations,getAllMotherTongue,getAllReligions
} from "../../Features/Slices/profSlice"
import { uploadPUProfileImage,resetImageUploadByState } from "../../Features/Slices/PublicUser/publicUserSlice"

import{getProfileDetailsById,updateProfile, PURemoveProfileImage,resetRemoveProfileImage} from "../../Features/Slices/PublicUser/publicUserSlice"

import { ValidateFields } from "../../Validation/Common/fieldValidation"

var RegisterProfileValidation = require('../../Validation/Config/RegisterUser.json')



export function PUEditProfile() {

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [hasError, setHasError] = useState(false);
  const [DOBBirth, setDOBDate] = useState(null);
  const [ischeckbox,setcheckbox]=useState(false);
   

  const profileId = searchParams.get('id')

  const brokerID = searchParams.get('id')
  const backScreenName = searchParams.get('name')
  const pageIndex = searchParams.get('pageIndex')

  const { broker, isError, isSuccess, isLoading, message, isStarListSuccess,
    isStarListLoading, stars, isRasiListLoading, isRasiListSuccess, rasis
    , isDistrictListLoading, isDistrictListSuccess, districts, religions, qualifications, castes,
    isQualificationLoading, isQualificationSuccess, iscasteLoading, iscasteSuccess, jobs, isJobListLoading,
    isJobListSuccess,  Images,isdeleteProfileError,isGetAllStateLoading,isGetAllStateSuccess,
    isdeleteProfileSuccess, messagedeleteProfile,AllStates,
     isUpdatedProfileError, issetProfilePictureError, issetProfilePictureSuccess, issetProfilePictureLoading,
    messagesetProfile, isForeignListSuccess, isForeignListLoading, foreignCountrys, isJobLocationSuccess, isJobLocationLoading, jobLocations,
    isSettleLocationSuccess, isSettleLocationLoading, settleLocations,isGetAllMotherTongueList,isGetAllMotherTongueLoading,isGetAllMotherTongueSuccess,
     isReligionSuccess, isReligionLoading
  } =
    useSelector(
      (state) => state.prof
    )

    const {profileDetails,isUpdatedProfileLoading,isUpdatedProfileSuccess,updatedProfilemessage,getPUImageList,
      isRemoveProfileImageSuccess,removeProfileImagemessage,isRemoveProfileImageError}=
    useSelector(
      (state) => state.public
    )


  const [formData, setFormData] = useState(profileDetails)
  //setDOBDate(profileDetails.DOB)

  const { name, qualification, additionalQualification, POB, DOB, maritalstatus, birthTime, phoneNumber, job, salary,
    fatherOccupation, motherOccupation, sex, religion, caste, subcaste, star, district, state, address1,
    address2, rasi, sistersMarried, sistersUnmarried, brothersMarried, brothersUnmarried, notes,
    status, brokerId, fatherName, motherName, colour, height, weight, bloodGroup, jobDescription, jobLocation, foreignCountry,
    settledLocation, dhosam, selfDescription, contactPerson, foodPreference, motherTongue, expectationFromMarriage, deleteName,
    birthHour,birthMin,meridiem } = formData

  const onchange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  }

//   const onDOBchange = (e) => {
//     alert(e)
// setDOBDate(e)
//     setFormData((prevState) => ({
//       ...prevState,
//       [DOB]: e
//     }));
   
//   }

  useEffect(() => {

  if(foreignCountry!="")
   setcheckbox(true);

    if (isError != undefined && isError) {
      toast.error(message)
    }
    if (isSuccess != undefined && isSuccess) {
      navigate('/BrokerList', { replace: true });
    }
    if (!isDistrictListLoading && !isDistrictListSuccess) {
      dispatch(getAllDistricts())
      console.log(districts)
    }
  if (!isGetAllMotherTongueLoading && !isGetAllMotherTongueSuccess) {
      dispatch(getAllMotherTongue())
  }
     if (!isGetAllStateLoading && !isGetAllStateSuccess) {
        dispatch(getAllStates())
      }
    if (!isForeignListLoading && !isForeignListSuccess) {
      dispatch(getAllForeignCountries())
      console.log(foreignCountrys)
    }
    if (!isJobLocationLoading && !isJobLocationSuccess) {
      dispatch(getAllJobLocations())
    }
    if (!isSettleLocationLoading && !isSettleLocationSuccess) {
      dispatch(getAllSettleLocations())
    }

    if (!isStarListLoading && !isStarListSuccess) {
      dispatch(getAllStars())
    }
    if (!isRasiListLoading && !isRasiListSuccess) {
      dispatch(getAllRasis())
    }

    if (!isJobListLoading && !isJobListSuccess) {
      dispatch(getAllJobs())
    }

    if (!isQualificationLoading && !isQualificationSuccess) {
      dispatch(getAllQualifications())
    }

    if (!iscasteLoading && !iscasteSuccess) {
      dispatch(getAllCastes())
    }

     if (!isReligionLoading && !isReligionSuccess) {
          dispatch(getAllReligions())
        }

    dispatch(getProfileDetailsById({profileId:profileId}))

    setDOBDate(profileDetails.DOB)

    // dispatch(getProfileImageUrl({ "brokerId": null, "profileId": profileId }))

  }, [broker, isError, isSuccess, isLoading, message, navigate], dispatch)

  useEffect(() => {
    if(isRemoveProfileImageSuccess == true && removeProfileImagemessage){
         toast.success(removeProfileImagemessage)
         dispatch(resetRemoveProfileImage())
         navigate('/PublicUserProfile?id='+ profileId, { replace: true });
       }
   
       else if(isRemoveProfileImageSuccess == false && removeProfileImagemessage){
         toast.error(removeProfileImagemessage)
         dispatch(resetRemoveProfileImage())
       }
   
       else if(isRemoveProfileImageError == true){
         dispatch(resetRemoveProfileImage())
       }

    if (isdeleteProfileSuccess) {
      toast.success(messagedeleteProfile)
      dispatch(resetDeleteProfileMessage())
      // navigate('/ProfileList?id='+ brokerId, { replace: true });

      // navigate('/ProfileList?id='+ brokerId, { replace: true });
    }
    else if (isdeleteProfileError) {
      toast.error("Network Error!!!")
    }
    else if (isUpdatedProfileSuccess) {
      toast.success(updatedProfilemessage)
      dispatch(resetUpdatedProfileMessage())
      navigate ('/PublicUserProfile?id=' + profileId + "&name=VieProDetails")
    }

    else if (isUpdatedProfileError) {
      toast.error(updatedProfilemessage)
      dispatch(resetUpdatedProfileMessage())
    }
    else if (issetProfilePictureSuccess) {
      toast.success(messagesetProfile)
      dispatch(resetProfilePicture())
    }
    else if (issetProfilePictureError) {
      toast.success(messagesetProfile)
      dispatch(resetProfilePicture())
    }
    else if (issetProfilePictureSuccess) {
      toast.success(messagesetProfile)
    }

  }, [isRemoveProfileImageSuccess, removeProfileImagemessage, isdeleteProfileError,
    isdeleteProfileSuccess, messagedeleteProfile, isUpdatedProfileLoading,
    isUpdatedProfileSuccess, updatedProfilemessage, isUpdatedProfileError,
    issetProfilePictureSuccess, messagesetProfile]);

  const onSubmit = (e) => {
    e.preventDefault();

    // setFormData((prevState) => ({
    //   ...prevState,
    //   [e.target.name]: e.target.name
    // }))

    let hasRequiredfieldValidation = false
    let hasOtherfieldValidation = false

    const brokerReqFields = { DOBBirth }

    for (const [key, value] of Object.entries(brokerReqFields)) {

      if (!value) {
        hasRequiredfieldValidation = true;
        return toast.error('Please fill "Date of Birth" field')
      }
    }

    // if (name == '') {
    //   toast.error('Please fill the name field')
    // }
    // else if (sex == 'Select') {
    //   toast.error('Please select the gender')
    // }
    // else if (qualification == '') {
    //   toast.error('Please enter your qualification')
    // }
    // else {
    //   dispatch(updateProfile(profileData))
    // }

//         if (name && !/[a-zA-Z]/.test(name)) {
//   return toast.error('Please fill name field in text');
// }

   const allEmpty = !birthHour && !birthMin && !meridiem;
   const allFilled = birthHour && birthMin && meridiem;

    if (!allEmpty && !allFilled) {
      return toast.error ("Please select all three: Birth Hour, Birth Minute, and Meridiem.");
    }

// if (name && !/^[a-zA-Z]+$/.test(name)) {
//   return toast.error('Please fill name field in text');
// }

if (name.trim() === "") {
  return toast.error('Name cannot be empty or just spaces');
}

if (!/^[a-zA-Z\s]+$/.test(name)) {
  return toast.error('Please fill name field using only letters ');
}
    
  if (height && /[a-zA-Z]/.test(height)) {
  return toast.error('Please fill height field in number');
}
  if (weight && /[a-zA-Z]/.test(weight)) {
  return toast.error('Please fill weight field in number');
}
    else{
    const profileData = {
      profileId, name, qualification,additionalQualification, DOBBirth, POB, maritalstatus, birthTime, phoneNumber, job, salary,
      fatherOccupation, motherOccupation, sex, religion, star, caste, subcaste, district, state,
      address1, address2, rasi, sistersMarried, sistersUnmarried, brothersMarried, brothersUnmarried, notes, status, brokerId,
      fatherName, motherName, colour, height, weight, bloodGroup, jobDescription, jobLocation, foreignCountry, settledLocation, dhosam, selfDescription, 
      contactPerson, foodPreference, motherTongue, expectationFromMarriage,birthHour,birthMin,meridiem
    }

    if (hasRequiredfieldValidation == false) {
      for (const [key, value] of Object.entries(profileData)) {

        if(value != undefined && value!=null )
        {
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
    }
    const calculateAge = (dobString) => {
    const today = new Date();
    const dob = new Date(dobString);
    let age = today.getFullYear() - dob.getFullYear();
    const m = today.getMonth() - dob.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
      age--;
    }
    return age;
  };

if (sex === "Male" && calculateAge(DOBBirth) < 21) {
  return toast.error("Age should be atleast 21 years old.");
}
if (sex === "Female" && calculateAge(DOBBirth) < 18) {
  return toast.error("Age should be atleast 18 years old.");
}

else {

    if (!hasRequiredfieldValidation && !hasOtherfieldValidation) {    
      dispatch(updateProfile(profileData))
    }

   }
  }
}

  // const backViewDetailsUrl = '/BrokerProfile?id=' + profileId
  
  const backViewDetailsUrl =()=>{
     
       navigate('/PublicUserProfile?id=' + profileId)
  }

  const onCancelClick = () => {
   navigate('/PublicUserProfile?id=' + profileId)
  }

//  const onSaveClick =()=>{
//   navigate ('/BrokerProfile?id=' + profileId, { replace: true })
  
//  }

  const onResetClick = () => {
    var registerProfileelement = document.getElementById("frmregisterprofile");
    registerProfileelement.reset()
    dispatch(resetUpdatedProfile())
  }

  const onProfileImageDelete = (image,index) => {
    let imageName = image.split("/")[4].split("?")[0]
   const data = { "profileId": profileId,
                     "imageName": index,
                     }
       dispatch(PURemoveProfileImage(data))
   


  }
  const onsetProfile = (image) => {
    let updatedImage = []
    Images.map((img) => {
      if (img == image) {
        updatedImage.push({ name: getImageNameFromPath(img), isProfile: true })
      }
      else {
        updatedImage.push({ name: getImageNameFromPath(img), isProfile: false })
      }
    });
    const data = { "profileId": profileId, "images": updatedImage }

    dispatch(setProfilePicture(data))
  }

  const getImageNameFromPath = (imagePath) => {
    const imageNameWithQuery = imagePath.split('/').pop();
    const imageName = imageNameWithQuery.split('?')[0];
    return imageName;
  };
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const onDeleteClick = () => {

    if (deleteName != name) {
      setHasError(true)
      handleShow()
    }
    else {
      handleClose()
      const data = { "profileId": profileId }
      dispatch(deleteProfile(data))
    }
  }

  const formatDate = (dateTime) => {

    const date = new Date(dateTime);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(date.getDate()).padStart(2, '0');
    return `${day}/${month}/${year}`; // Format as YYYY-MM-DD

  }



  const onDeleteNamechange = () => {
    if (deleteName != name) {
      setHasError(true)
    }
    else {
      setHasError(false)
    }
  }

  function uploadImage() {
    if (filedata != undefined)
      dispatch(uploadPUProfileImage([filedata, "data"]))

  }

  const [fileurl, setFileUrl] = useState();
  const [filedata, setFiledata] = useState();


  function handleChange(e) {
    const formData = new FormData()
    const uploadedFile = e.target.files[0];
    const newName = `${Date.now()}`;
    const fileExtension = uploadedFile.name.split('.').pop();
    const modifiedFile = new File([uploadedFile], newName + "." + fileExtension, { type: uploadedFile.type });
    setFileUrl(URL.createObjectURL(modifiedFile));
    formData.append("file", modifiedFile)
    formData.append("profileId", profileId)
    setFiledata(formData)
  }

  const handleCheckboxChange = (e) => {
  const checked = e.target.checked;
  setcheckbox(checked);
  setFormData((prevState) => ({
    ...prevState,
    jobLocation: checked ? "" : prevState.jobLocation,       // clear if abroad
    foreignCountry: !checked ? "" : prevState.foreignCountry // clear if local
  }));
};

  const { isUploadProfileSuccess, uploadProfilemessage,isUploadProfileError } =
    useSelector(
      (state) => state.public
    )

  useEffect(() => {
    if (isUploadProfileSuccess ) {
       dispatch(resetImageUploadByState())
      if(uploadProfilemessage.isSuccess){
        toast.success(uploadProfilemessage.message)
      }
      else {
        toast.error(uploadProfilemessage.message)
      }
    }
  }, [isUploadProfileSuccess, uploadProfilemessage], dispatch)


  return (
    <>
      <div>
      
        <div className="dropdown-item d-flex align-items-center" >
                <svg onClick={backViewDetailsUrl} style={{ cursor: 'pointer' }} xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#1aa179" className="bi bi-arrow-left-circle" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z" />
                </svg>
                <p className="h5 mb-0 ms-2" onClick={backViewDetailsUrl} style={{ cursor: 'pointer' }}>Go Back</p>
            </div>
        
        <div>
          <br />
        </div>

        <p className="h4">Edit Profile</p>


        <form action="" id="frmregisterprofile" onSubmit={onSubmit}>

          <div className="row">

            <div className="form-group col-md-4">
              <label htmlFor="name">Name <span style={{ color: 'red' }}><b>*</b></span></label>
              <input type="text" className= "form-control border border-secondary" name="name" id="name" value={name} onChange={onchange}></input>
            </div>

            <div className="form-group col-md-4">
              <label htmlFor="sex">Gender <span style={{ color: 'red' }}><b>*</b></span></label>
              <select className="form-select form-control-sm custom-select border border-secondary" name="sex" id="sex" value={sex} onChange={onchange} aria-label=".form-select-sm example">
                <option value="">Select</option>
                <option value={"Male"}>Male</option>
                <option value={"Female"}>Female</option>
              </select>
            </div>

            <div className="form-group col-md-4">
              <label htmlFor="maritalstatus">Marital Status <span style={{ color: 'red' }}><b>*</b></span></label>
              <select className="form-select form-control-sm custom-select border border-secondary" name="maritalstatus" id="maritalstatus" value={maritalstatus} onChange={onchange} aria-label=".form-select-sm example">
                <option value="">Select</option>
                <option value={"Unmarried"}>Unmarried</option>
                <option value={"Widowed"}>Widowed</option>
                <option value={"Divorced"}>Divorced</option>
                <option value={"Awaiting Divorce"}>Awaiting Divorce</option>
              </select>
            </div>
          </div>


          <div className="row">

            <div className="form-group col-md-4">
              <label className="datepickerLabel" htmlFor="DOB">Date of Birth(DD/MM/YYYY) <span style={{ color: 'red' }}><b>*</b></span></label>
              {/* <input type="text"  className={ DOB =='' ? "form-control bordererror": "form-control"} name="DOB"  id="DOB" onChange={onchange}></input> */}
              {/* <DatePicker type="text" className= "form-control border border-secondary" id="DOB" value={formatDate(DOBBirth)}
                selected={DOBBirth}
              onChange={date => setDOBDate(date)}
                dateFormat="dd/MM/yyyy"
                placeholderText="Select a date"
              /> */}


<DatePicker
  id="DOB"
  className={`form-control border ${DOBBirth ? 'border-secondary' : 'border-danger'}`}
  selected={DOBBirth}
  onChange={(date) => {
    setDOBDate(date);
    setFormData((prev) => ({
      ...prev,
      DOB: date ? date.toISOString() : '',
    }));
  }}
  dateFormat="dd/MM/yyyy"
  placeholderText="Select a date"
/>


            </div>

                <div className="form-group col-md-4">
                  <div className="row">
                  <div className=" col-4">
                    <label htmlFor="birthTime">Birth Hour</label><br />
                  <select className= "form-select form-control-sm custom-select border border-secondary"  name="birthHour" id="birthHour" value={formatToTwoDigits(birthHour)} onChange={onchange}>
                    <option value="">Select</option>
                    <option value="01">01</option>
                    <option value="02">02</option>
                    <option value="03">03</option>
                    <option value="04">04</option>
                    <option value="05">05</option>
                    <option value="06">06</option>
                    <option value="07">07</option>
                    <option value="08">08</option>
                    <option value="09">09</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                  </select>
                  </div>
                   <div className=" col-4">
                    <label htmlFor="birthTime">Birth Min</label><br />
                  <select className= "form-select form-control-sm custom-select border border-secondary"  name="birthMin" id="birthMin" value={formatToTwoDigits(birthMin)} onChange={onchange}>
                    <option value="">Select</option>
                    <option value="00">00</option>
                    <option value="01">01</option>
                    <option value="02">02</option>
                    <option value="03">03</option>
                    <option value="04">04</option>
                    <option value="05">05</option>
                    <option value="06">06</option>
                    <option value="07">07</option>
                    <option value="08">08</option>
                    <option value="09">09</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                    <option value="13">13</option>
                    <option value="14">14</option>
                    <option value="15">15</option>
                    <option value="16">16</option>
                    <option value="17">17</option>
                    <option value="18">18</option>
                    <option value="19">19</option>
                    <option value="20">20</option>
                    <option value="21">21</option>
                    <option value="22">22</option>
                    <option value="23">23</option>
                    <option value="24">24</option>
                    <option value="25">25</option>
                    <option value="26">26</option>
                    <option value="27">27</option>
                    <option value="28">28</option>
                    <option value="29">29</option>
                    <option value="30">30</option>
                    <option value="31">31</option>
                    <option value="32">32</option>
                    <option value="33">33</option>
                    <option value="34">34</option>
                    <option value="35">35</option>
                    <option value="36">36</option>
                    <option value="37">37</option>
                    <option value="38">38</option>
                    <option value="39">39</option>
                    <option value="40">40</option>
                    <option value="41">41</option>
                    <option value="42">42</option>
                    <option value="43">43</option>
                    <option value="44">44</option>
                    <option value="45">45</option>
                    <option value="46">46</option>
                    <option value="47">47</option>
                    <option value="48">48</option>
                    <option value="49">49</option>
                    <option value="50">50</option>
                    <option value="51">51</option>
                    <option value="52">52</option>
                    <option value="53">53</option>
                    <option value="54">54</option>
                    <option value="55">55</option>
                    <option value="56">56</option>
                    <option value="57">57</option>
                    <option value="58">58</option>
                    <option value="59">59</option>
                  </select>
                  </div>
                  <div className=" col-4">
                 <label htmlFor="birthTime"></label><br />
                  <select className= "form-select form-control-sm custom-select border border-secondary"  name="meridiem" id="meridiem" value={meridiem} onChange={onchange}>
                    <option value="">Select</option>
                    <option value="AM">AM</option>
                    <option value="PM">PM</option>
                  </select>
                  </div>
                  </div>
                </div>

            <div className="form-group col-md-4">
              <label htmlFor="POB">Place of birth <span style={{ color: 'red' }}><b>*</b></span></label>
              <input type="text" className= "form-control border border-secondary" name="POB" id="POB" value={POB} onChange={onchange} ></input>
            </div>

          </div>


          <div className="row">

            <div className="form-group col-md-4">
              <label htmlFor="motherName">Blood group</label>
              {/* <input type="text" className="form-select form-select-sm custom-select" name="bloodGroup" id="bloodGroup" value={bloodGroup} onChange={onchange}></input> */}
              <select name="bloodGroup" id="bloodGroup" className="form-select form-control-sm custom-select border border-secondary" value={bloodGroup} onChange={onchange}>
                    <option value="select">select</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
            </div>

            <div className="form-group col-md-4">
              <label htmlFor="height">Height (cm)</label>
              <input type="text" className= "form-control border border-secondary" name="height" id="height" value={height} onChange={onchange}></input>
            </div>

            <div className="form-group col-md-4">
              <label htmlFor="weight">Weight (kg)</label>
              <input type="text" className= "form-control border border-secondary" name="weight" id="weight" value={weight} onChange={onchange}></input>
            </div>

          </div>

          <div className="row">

            <div className="form-group col-md-4">
              <label htmlFor="colour">Colour</label>
              <select className="form-select form-control-sm custom-select border border-secondary" name="colour" id="colour" value={colour} onChange={onchange} aria-label=".form-select-sm example">
                <option value="">Select</option>
                <option value={"Very fair"}>Very fair</option>
                <option value={"Fair"}>Fair</option>
                <option value={"Medium"}>Medium</option>
                <option value={"Dark Brown"}>Wheatish</option>
                <option value={"Olive"}>Olive</option>
                <option value={"Brown"}>Brown</option>
                <option value={"Dark Brown"}>Dark Brown</option>
                <option value={"Nil"}>Nil</option>
              </select>
            </div>

            <div className="form-group col-md-4">
              <label htmlFor="foodPreference">Food preference <span style={{ color: 'red' }}><b>*</b></span></label>
              <select className="form-select form-control-sm custom-select border border-secondary" name="foodPreference" id="foodPreference" value={foodPreference} onChange={onchange} aria-label=".form-select-sm example">
                <option value="">Select</option>
                <option value={"Vegetarian"}>Vegetarian</option>
                <option value={"Eggetarian"}>Eggetarian</option>
                <option value={"Non-Vegetarian"}>Non-Vegetarian</option>
                <option value={"Vegan"}>Vegan</option>
              </select>
            </div>

                <div className="form-group col-md-4">
                <label htmlFor="motherTongue">Mother tongue <span style={{ color: 'red' }}><b>*</b></span></label>
                <select className="form-select form-control-sm custom-select border border-secondary" name="motherTongue" id="motherTongue" value={motherTongue} onChange={onchange} aria-label=".form-select-sm example">
                    <option value="">Select</option>
                        {((isGetAllMotherTongueList != null && isGetAllMotherTongueList.length > 0) &&
                          isGetAllMotherTongueList.map((motherTongue) => (
                            <option key={motherTongue._id} value={motherTongue.motherTongue}>{motherTongue.motherTongue}</option>
                          ))
                        )}
                  </select>
                </div>
          </div>


          <div className="row">
            <div className="form-group col-md-4">
              <label htmlFor="religion">Religion <span style={{ color: 'red' }}><b>*</b></span></label>
              <select className="form-select form-control-sm custom-select border border-secondary" name="religion" id="religion" value={religion} onChange={onchange} aria-label=".form-select-sm example">
                <option value="">Select</option>
                {((religions != null && religions.length > 0) &&
                  religions.map((religion) => (
                    <option key={religion._id} value={religion.religion}>{religion.religion}</option>
                  ))
                )}
              </select>
            </div>

            <div className="form-group col-md-4">
              <label htmlFor="caste">Caste <span style={{ color: 'red' }}><b>*</b></span></label>
              <select className="form-select form-control-sm custom-select border border-secondary" name="caste" id="caste" value={caste} onChange={onchange} aria-label=".form-select-sm example">
                <option value="">Select</option>
                {((castes != null && castes.length > 0) &&
                  castes.map((caste) => (
                    <option key={caste._id} value={caste.caste}>{caste.caste}</option>
                  ))
                )}
              </select>
            </div>

            <div className="form-group col-md-4">
              <label htmlFor="subcaste">Sub Caste</label>
              <input type="text" className= "form-control border border-secondary" name="subcaste" id="subcaste" value={subcaste} onChange={onchange} ></input>
            </div>
          </div>


          <div className="row">

            <div className="form-group col-md-4">
              <label htmlFor="rasi">Rasi <span style={{ color: 'red' }}><b>*</b></span></label>
              <select className="form-select form-control-sm custom-select border border-secondary" name="rasi" id="rasi" value={rasi} onChange={onchange} aria-label=".form-select-sm example">
                <option value="">Select</option>
                {((rasis != null && rasis.length > 0) &&

                  rasis.map((rasi) => (
                    <option key={rasi._id} value={rasi.rasi}>{rasi.rasi}</option>
                  ))
                )}
              </select>
            </div>

            <div className="form-group col-md-4">
              <label htmlFor="star">Star <span style={{ color: 'red' }}><b>*</b></span></label>
              <select className="form-select form-control-sm custom-select border border-secondary" name="star" id="star" value={star} onChange={onchange} aria-label=".form-select-sm example">
                <option value="">Select</option>
                {((stars != null && stars.length > 0) &&

                  stars.map((star) => (
                    <option key={star._id} value={star.star}>{star.star}</option>
                  ))
                )}
              </select>
            </div>

            <div className="form-group col-md-4">
              <label htmlFor="dhosam">Dhosam</label>
              <select className="form-select form-control-sm custom-select border border-secondary" name="dhosam" id="dhosam" value={dhosam} onChange={onchange} aria-label=".form-select-sm example">
                <option value="">Select</option>
                <option value={"செவ்வாய் தோஷம்"}>செவ்வாய் தோஷம்</option>
                <option value={"ராகு-கேது தோஷம்"}>ராகு-கேது தோஷம்</option>
                <option value={"மாங்கல்ய தோஷம்"}>மாங்கல்ய தோஷம்</option>
                <option value={"சூரிய தோஷம்"}>சூரிய தோஷம்</option>
                <option value={"களத்திர தோஷம்"}>களத்திர தோஷம்</option>
              </select>
            </div>
          </div>
          <br />        <br />
          <p className="h5">2. Education and Occupation</p>

          <div className="row">

            <div className="form-group col-md-4">
              <label htmlFor="qualification">Qualification <span style={{ color: 'red' }}><b>*</b></span></label>
              <select className="form-select form-control-sm custom-select border border-secondary" name="qualification" id="qualification" value={qualification} onChange={onchange} aria-label=".form-select-sm example">
                <option value="">Select</option>
                {((qualifications != null && qualifications.length > 0) &&
                  qualifications.map((qualification) => (
                    <option key={qualification._id} value={qualification.qualification}>{qualification.qualification}</option>
                  ))
                )}
              </select>
            </div>

           <div className="form-group col-md-4">
                  <label htmlFor="additionalQualification">Additional Qualification</label>
            <input type="text" className= "form-control border border-secondary" name="additionalQualification" id="additionalQualification" placeholder="" onChange={onchange} aria-label=".form-select-sm example"></input>
               </div>

          </div>

          <div className="row">
            <div className="form-group col-md-4">
              <label htmlFor="job">Job Title <span style={{ color: 'red' }}><b>*</b></span></label>
              <select className="form-select form-control-sm custom-select border border-secondary" name="job" id="job" value={job} onChange={onchange} aria-label=".form-select-sm example">
                <option value="">Select</option>
                {((jobs != null && jobs.length > 0) &&
                  jobs.map((job) => (
                    <option key={job._id} value={job.job}>{job.job}</option>
                  ))
                )}
              </select>
            </div>

            <div className="form-group col-md-4">
              <label htmlFor="jobDescription">Job Description</label>
              <input type="text" className= "form-control border border-secondary" name="jobDescription" id="jobDescription" value={jobDescription} onChange={onchange} ></input>
            </div>
          </div>


          <div className="row">
            <div className="form-group col-md-4">
              <label htmlFor="salary">Salary per month</label>
              <input type="number" className= "form-control border border-secondary" name="salary" id="salary" value={salary} onChange={onchange} ></input>
            </div>
            
     <div className="form-group col-md-4">
             <label htmlFor="jobAbroad">Job in abroad?</label><br />
              <input type="checkbox" id="jobAbroad" style={{ width: 20, height: 20 }}  onChange={handleCheckboxChange}checked={ischeckbox}/>
     </div>

             { !ischeckbox && (
                <div className="form-group col-md-4">
               <label htmlFor="jobLocation">Job Location</label>
                    <select className="form-select form-control-sm custom-select border border-secondary" name="jobLocation" id="jobLocation"  value={formData.jobLocation} onChange={onchange}>
                      <option value="">Select</option>
                      {((jobLocations != null && jobLocations.length > 0) &&

                        jobLocations.map((location) => (
                          <option key={location._id} value={location.location}>{location.location}</option>
                        ))
                      )}
                    </select>
                </div>
                )}
             { ischeckbox && (
                <div className="form-group col-md-4">
                  <label htmlFor="foreignCountry">Foreign Country</label>
                    <select className="form-select form-control-sm custom-select border border-secondary"  name="foreignCountry" id="foreignCountry" value={formData.foreignCountry} onChange={onchange} >
                      <option value="">Select</option>

                      {((foreignCountrys != null && foreignCountrys.length > 0) &&

                        foreignCountrys.map((foreignCountry) => (
                          <option key={foreignCountry._id} value={foreignCountry.foreignCountry}>{foreignCountry.foreignCountry}</option>
                        ))
                      )}
                    </select>
                </div>
                 )}

          </div>


          <br />        <br />
          <p className="h5">3. Family details</p>


          <div className="row">

            <div className="form-group col-md-4">
              <label htmlFor="fatherName">Father Name</label>
              <input type="text" className= "form-control border border-secondary" name="fatherName" id="fatherName" value={fatherName} onChange={onchange}></input>
            </div>

            <div className="form-group col-md-4">
              <label htmlFor="fatherOccupation">Father Occupation </label>
              <input type="text" className= "form-control border border-secondary" name="fatherOccupation" id="fatherOccupation" value={fatherOccupation} onChange={onchange}></input>
              {/* <select className="form-select form-control-sm custom-select border border-secondary" name="fatherOccupation" id="fatherOccupation" value={fatherOccupation} onChange={onchange} aria-label=".form-select-sm example">
                <option value="">Select</option>
                {((jobs != null && jobs.length > 0) &&
                  jobs.map((job) => (
                    <option key={job._id} value={job.job}>{job.job}</option>
                  ))
                )}
              </select> */}
            </div>

            <div className="form-group col-md-4">
              <label htmlFor="motherName">Mother Name</label>
              <input type="text" className= "form-control border border-secondary" name="motherName" id="motherName" value={motherName} onChange={onchange}></input>
            </div>
          </div>


          <div className="row">

            <div className="form-group col-md-4">
              <label htmlFor="motherOccupation">Mother occupation </label>
               <input type="text" className= "form-control border border-secondary" name="motherOccupation" id="motherOccupation" value={motherOccupation} onChange={onchange}></input>
              {/* <select className="form-select form-control-sm custom-select border border-secondary" name="motherOccupation" id="motherOccupation" value={motherOccupation} onChange={onchange} aria-label=".form-select-sm example">
                <option value="">Select</option>
                {((jobs != null && jobs.length > 0) &&
                  jobs.map((job) => (
                    <option key={job._id} value={job.job}>{job.job}</option>
                  ))
                )}
              </select> */}


            </div>
            <div className="form-group col-md-4">
              <label htmlFor="sistersMarried">Sister(s) Married
              </label>
              <input type="number" className= "form-control border border-secondary" id="sistersMarried" value={sistersMarried} onChange={onchange} name="sistersMarried"></input>
            </div>
            <div className="form-group col-md-4">
              <label htmlFor="sistersUnmarried">Sister(s) Unmarried
              </label>
              <input type="number" className= "form-control border border-secondary" id="sistersUnmarried" value={sistersUnmarried} onChange={onchange} name="sistersUnmarried"></input>
            </div>

          </div>


          <div className="row">

            <div className="form-group col-md-4">
              <label htmlFor="brothersMarried">Brother(s) Married</label>
              <input type="number" className= "form-control border border-secondary" id="brothersMarried" value={brothersMarried} onChange={onchange} name="brothersMarried"></input>
            </div>

            <div className="form-group col-md-4">
              <label htmlFor="brothersUnmarried">Brother(s) Unmarried</label>
              <input type="number" className= "form-control border border-secondary" id="brothersUnmarried" value={brothersUnmarried} onChange={onchange} name="brothersUnmarried"></input>
            </div>
            <div className="form-group col-md-4">
              <label htmlFor="settledLocation">Settled Location</label>
              {/* <input type="text" className="form-control" id="settledLocation" value={settledLocation} onChange={onchange} name="settledLocation"></input> */}
              <select name="settledLocation" id="settledLocation" className="form-select form-control-sm custom-select border border-secondary" value={settledLocation} onChange={onchange}>
                <option value="">Select</option>
                {((settleLocations != null && settleLocations.length > 0) &&
                  settleLocations.map((location) => (
                    <option key={location._id} value={location.location}>{location.location}</option>
                  ))
                )}
              </select>
            </div>

          </div>


          <br />        <br />
          <p className="h5">4. Contact details</p>


          <div className="row">

            <div className="form-group col-md-4">
              <label htmlFor="contactPerson">Contact Person <span style={{ color: 'red' }}><b>*</b></span></label>
              <select className="form-select form-control-sm custom-select border border-secondary" name="contactPerson" id="contactPerson" value={contactPerson} onChange={onchange} aria-label=".form-select-sm example">
                <option value="">Select</option>
                <option value={"Self"}>Self</option>
                <option value={"Father"}>Father</option>
                <option value={"Mother"}>Mother</option>
                <option value={"Sister"}>Sister</option>
                <option value={"Brother"}>Brother</option>
                <option value={"Others"}>Others</option>
              </select>
            </div>
            <div className="form-group col-md-4">
              <label htmlFor="phoneNumber">Contact Number <span style={{ color: 'red' }}><b>*</b></span></label>
              <input type="number" className= "form-control border border-secondary" name="phoneNumber" id="phoneNumber" value={phoneNumber} onChange={onchange}></input>
            </div>


            <div className="form-group col-md-4">
            </div>

          </div>

          <div className="row">

          </div>




          <p className="h6" style={{ fontWeight: '500' }}>Address of Residence:</p>

          <div className="row">
            <div className="form-group col-12">
              <label htmlFor="address1">Address 1 <span style={{ color: 'red' }}><b>*</b></span></label>
              <input type="text" className= "form-control border border-secondary" name="address1" id="address1" value={address1} onChange={onchange}></input>
            </div>
          </div>


          <div className="row">
            <div className="form-group col-12">
              <label htmlFor="address2">Address 2 </label>
              <input type="text" className= "form-control border border-secondary" name="address2" id="address2" value={address2} onChange={onchange}></input>
            </div>
          </div>


          <div className="row">

                <div className="form-group col-md-4">
                  <label htmlFor="state">State <span style={{ color: 'red' }}><b>*</b></span></label>
                  {/* <input type="text"  readOnly className="form-control"  id="state" name="state" value={"Tamil nadu"} ></input> */}
                  <select className="form-select form-control-sm custom-select border border-secondary" name="state" id="state" value={state} onChange={onchange} aria-label=".form-select-sm example">
                    <option value="">Select</option>
                    {/* <option value="Tamil Nadu">Tamil Nadu</option> */}
                    {((AllStates != null && AllStates.length > 0) &&

                      AllStates.map((state) => (
                        <option key={state._id} value={state.name}>{state.name}</option>
                      ))
                    )}                     
                  </select>
                </div>

            <div className="form-group col-md-4">
              <label htmlFor="district">District <span style={{ color: 'red' }}><b>*</b></span></label>

              <select className="form-select form-control-sm custom-select border border-secondary" name="district" id="district" value={district} onChange={onchange} aria-label=".form-select-sm example">
                <option value="">Select</option>
                {((districts != null && districts.length > 0) &&

                  districts.map((district) => (
                    <option key={district._id} value={district.district}>{district.district}</option>
                  ))
                )}
              </select>
            </div>

            <div className="form-group col-md-4">

            </div>

          </div>


          <br />        <br />
          <p className="h5">5. Additional information</p>


          <div className="row">
            <div className="form-group col-12">
              <label htmlFor="selfDescription">Self Description</label>
              <textarea type="text" className="form-select form-select-sm custom-select" name="selfDescription" id="selfDescription" value={selfDescription} onChange={onchange}></textarea>
            </div>
          </div>

          <div className="row">
            <div className="form-group col-12">
              <label htmlFor="expectationFromMarriage">Expectation from marriage</label>
              <textarea type="text" className="form-select form-select-sm custom-select" name="expectationFromMarriage" id="expectationFromMarriage" value={expectationFromMarriage} onChange={onchange}></textarea>
            </div>
          </div>

          <div className="row">
            <div className="form-group col-12">
              <label htmlFor="notes">Notes</label>
              <textarea type="text" className="form-select form-select-sm custom-select" name="notes" id="notes" value={notes} onChange={onchange}></textarea>
            </div>
          </div>



          <div className="form-group col-md-4">
            <label htmlFor="status">Status <span style={{ color: 'red' }}><b>*</b></span></label>
            <select className="form-select form-control-sm custom-select border border-secondary" name="status" value={status} id="status" onChange={onchange} aria-label=".form-select-sm example">
              <option value="">Select</option>
              <option value={"New"}>New</option>
              <option value={"Marriage fixed - Payment Incomplete"}>Marriage fixed - Payment Incomplete</option>
              <option value={"Marriage fixed - Payment Complete"}>Marriage fixed - Payment Complete</option>
              <option value={"Marriage Complete"}>Marriage Complete</option>
            </select>

          </div>

          <br />

          <div className="row" >
            <div className="button-container">
              <button className="primarybutton" type="submit">Save Changes</button>
              <button onClick={() => onCancelClick()} className="secondarybutton">Cancel</button>
            </div>



            <div className="col-3"></div>
          </div>

          <br /><br /><br />
          <p className="h4">Uploaded Images</p>

          <div className="row p-2"></div>
          <div className="row mb-5">
            {

              getPUImageList.map((image,index) => (
                <div key={image} className="col-md-4">
                  <div className="row mb-2">
                    <img src={image} alt="..."></img>
                  </div>
                 <div className="row mb-2">
                    <div className="col-6 d-flex justify-content-center"><button type="button" onClick={() => onProfileImageDelete(image,index)} className="secondarybutton">Delete Image</button></div>
                    <div className="col-6 d-flex justify-content-center"><button type="button" onClick={() => onsetProfile(image)} className="secondarybutton me-3" style={{width:200,display:"none"}}>Set as profile Image</button></div>
                  </div>
                </div>
              ))
            }

          </div>


          <div className="row p-2"></div>

          <p className="h4">Upload profile photo</p>

          <div className="row p-2">
            <div className="col-md-4 ">

              <div className="mb-3">
                <label htmlFor="formFile" className="form-label">Choose your photo</label>
                <input className="form-control" type="file" onChange={handleChange} id="formFile"></input>
                <span style={{ color: "red" }}>* image size should be less than 26 MB</span>
              </div>
            </div>
          </div>
          <div className="row  p-2">
            <div className="col-md-4"> <img src={fileurl} /></div>
          </div>



          <div className="row p-2">
            <div className="col-md-4">
              <button onClick={() => uploadImage()} className="primarybutton" >Save Image</button>
              {/* <button onClick={() => onCancelClick()} className="btn btn-danger">Cancel</button> */}
            </div>
          </div>

        </form>

      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          {(hasError == true ? (<p className="errorText">Name should be profile name</p>) : null)}

          <div className="form-group">
            <input className="form-control" onKeyUpCapture={onDeleteNamechange} onChange={onchange} name="deleteName" id="deleteName" type="text" placeholder="Enter the name" />
          </div>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={onDeleteClick}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

    </>
  )
}
