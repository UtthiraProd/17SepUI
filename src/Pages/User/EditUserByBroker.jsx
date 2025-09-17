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
import "../../scss/profileList.scss"

import {
  resetUpdatedProfile, getAllStars,
  getAllRasis, getAllDistricts, getAllJobs, getAllQualifications,getAllCastes,
  getProfileDetailsById, getProfileImageUrl, removeProfileImage,
  deleteProfile,
  updateProfile,uploadfile,setProfilePicture,resetProfilePicture,
  resetUpdatedProfileMessage,
  resetDeleteProfileMessage
} from "../../Features/Slices/profSlice"

export function EditUserByBroker() {

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [hasError, setHasError] = useState(false);
  const [DOBBirth, setDOBDate] = useState(null);

  const profileId = searchParams.get('id')

  const { broker, isError, isSuccess, isLoading, message, isStarListSuccess,
    isStarListLoading, stars, isRasiListLoading, isRasiListSuccess, rasis
    ,isDistrictListLoading,isDistrictListSuccess, districts,religions,qualifications,castes, 
    isQualificationLoading, isQualificationSuccess,iscasteLoading,iscasteSuccess,jobs, isJobListLoading,
     isJobListSuccess, profileDetails, Images,isRemoveProfileImageSuccess, 
     removeProfileImagemessage, isRemoveProfileImageError,isdeleteProfileError,
     isdeleteProfileSuccess,messagedeleteProfile,isUpdatedProfileLoading,isUpdatedProfileSuccess,
     updatedProfilemessage,isUpdatedProfileError,issetProfilePictureError,issetProfilePictureSuccess,issetProfilePictureLoading,
     messagesetProfile
     } =
    useSelector(
      (state) => state.prof
    )

  const [formData, setFormData] = useState(profileDetails)


  const dateOfBirthOnchange = (date) =>
    {
      setDOBDate(date)
      if(date == "" || date == null)
      document.getElementById("DOB").style.borderColor = "red";
      else
      document.getElementById("DOB").style.borderColor = "";
    }

  const { usertype,usercategory,name,DOB,sex,phoneNumber,address1,address2,district,state,email,
    password,confirmpassword,startDate,expiryDate,status,notes,brokerId, deleteName } = formData
  
  const onchange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  useEffect(() => {
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

    if(!iscasteLoading && !iscasteSuccess)
      {
        dispatch(getAllCastes())
      }
    
    dispatch(getProfileDetailsById(profileId))
    console.log('profileDetails')
    console.log(profileDetails)
    
    setDOBDate(profileDetails.DOB)

    dispatch(getProfileImageUrl({ "brokerId": null, "profileId": profileId }))

  }, [broker, isError, isSuccess, isLoading, message, navigate], dispatch)

  useEffect(() => {
    if (isRemoveProfileImageSuccess && removeProfileImagemessage != undefined && removeProfileImagemessage.isSuccess) {
      toast.success(removeProfileImagemessage.message)
      dispatch(getProfileImageUrl({ "brokerId": null, "profileId": profileId }))
    }
    else if (removeProfileImagemessage != undefined && removeProfileImagemessage.isSuccess == false) {
      toast.error(removeProfileImagemessage.message)
    }
    else if (isRemoveProfileImageError == true) {
      toast.error("Network Error!!!")
    }

    if(isdeleteProfileSuccess)
    {
      toast.success(messagedeleteProfile)
      dispatch(resetDeleteProfileMessage())
     // navigate('/ProfileList?id='+ brokerId, { replace: true });
     
     // navigate('/ProfileList?id='+ brokerId, { replace: true });
    }
    else if(isdeleteProfileError)
    {
        toast.error("Network Error!!!")
    }
    else if(isUpdatedProfileSuccess)
    {
      toast.success(updatedProfilemessage)
      dispatch(resetUpdatedProfileMessage())
    }
    else if(isUpdatedProfileError)
    {
      toast.error(updatedProfilemessage)
      dispatch(resetUpdatedProfileMessage())
    }
    else if(issetProfilePictureSuccess)
    {
      toast.success(messagesetProfile)
      dispatch(resetProfilePicture())
    }
    else if(issetProfilePictureError)
    {
      toast.success(messagesetProfile)
      dispatch(resetProfilePicture())
    }
    else if(issetProfilePictureSuccess)
    {
      toast.success(messagesetProfile)
    }

  }, [isRemoveProfileImageSuccess, removeProfileImagemessage,isdeleteProfileError,
    isdeleteProfileSuccess,messagedeleteProfile,isUpdatedProfileLoading,
    isUpdatedProfileSuccess,updatedProfilemessage,isUpdatedProfileError,
    issetProfilePictureSuccess,messagesetProfile]);

  const onSubmit = (e) => {
    e.preventDefault();

    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.name
    }))

    const profileData = {
      profileId,usertype,usercategory,name,DOB,sex,phoneNumber,address1,address2,district,state,email,
      password,confirmpassword,startDate,expiryDate
    }
   debugger
    if (name == '') {
      toast.error('Please fill the name field')
    }
    else if (sex == 'Select') {
      toast.error('Please select the gender')
    }
    else {
      dispatch(updateProfile(profileData))
    }


  }
  const backViewDetailsUrl ='/PublicProfile?id='+ profileId
  const onCancelClick = () => {
    navigate(backViewDetailsUrl)
  }

  const onResetClick = () => {
    var registerProfileelement = document.getElementById("frmregisterprofile");
    registerProfileelement.reset()
    dispatch(resetUpdatedProfile())
  }

  const onProfileImageDelete = (image) => {
    let imageName = image.split("/")[4].split("?")[0]
    const data = { "brokerId": null, "profileId": profileId, "imageName": imageName }
    dispatch(removeProfileImage(data))
  

  }
  const onsetProfile = (image)=>{
    let updatedImage = []
    Images.map((img) => {
      if(img ==image )
      {
        updatedImage.push({name:getImageNameFromPath(img),isProfile:true})
      }
      else
      {
        updatedImage.push({name:getImageNameFromPath(img),isProfile:false})
      }
    });
    const data = {"profileId": profileId,"images":updatedImage}

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
    debugger
    if (deleteName != name) {
      setHasError(true)
      handleShow()
    }
    else {
      handleClose()
      const data = {"profileId": profileId }
      dispatch(deleteProfile(data))
    }
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
    if(filedata !=undefined)
    dispatch(uploadfile([filedata, "data"]))
   
  }

  const [fileurl, setFileUrl] = useState();
  const [filedata, setFiledata] = useState();


  function handleChange(e) {
    const formData = new FormData()
    const uploadedFile = e.target.files[0];
    const newName = `${Date.now()}${uploadedFile.name}`;
    const modifiedFile = new File([uploadedFile], newName, { type: uploadedFile.type });
    setFileUrl(URL.createObjectURL(modifiedFile));
    formData.append("file", modifiedFile)
    formData.append("profileId", profileId)
    setFiledata(formData)
  }

  
  return (
    <>
      <div>

      <Link to={backViewDetailsUrl} className="dropdown-item d-flex align-items-center">
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#1aa179" className="bi bi-arrow-left-circle" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z"/>
</svg><p className="h6 mb-0 ms-2">Go Back</p></Link>

<div>
    <br />
</div>

        <p className="h4">Edit User</p>


        <form action="" id="frmregisterprofile" onSubmit={onSubmit}>
         
        <div id="dvRegisterProfile" className="row">
        <div className="col-md-12">
          
            <div className="row">

            <div className="form-group col-md-4">
                <label htmlFor="usertype">UserType <span style={{color: 'red'}}><b>*</b></span></label>
                  <select className={ usertype =='' ? "form-select form-select-sm bordererror": "form-select form-select-sm"} name="usertype" id="usertype"  onChange={onchange} aria-label=".form-select-sm example">
                  <option value="">Select</option>
                  <option value={"Client"}>Client</option>
                  <option value={"Employee"}>Employee</option>
                  </select>
              </div>

              <div className="form-group col-md-4">
                <label htmlFor="usercategory">User Category <span style={{color: 'red'}}><b>*</b></span></label>
                <select className={ usercategory =='' ? "form-select form-select-sm bordererror": "form-select form-select-sm"} name="usercategory" id="usercategory"  onChange={onchange} aria-label=".form-select-sm example">
                <option value="">Select</option>
                <option value={"Gold"}>Gold</option>
                <option value={"Silver"}>Silver</option>
                <option value={"Bronze"}>Silver</option>
                </select>
              </div>

            </div>


            <br /><p className="h6">User Details</p>


            <div className="row">

            <div className="form-group col-md-4">
                <label htmlFor="name">Name <span style={{color: 'red'}}><b>*</b></span></label>
                <input type="text"  className={ name =='' ? "form-control bordererror": "form-control"} name="name" id="name"  onChange={onchange}></input>
              </div>


              <div className="form-group col-md-4">
                <label className="datepickerLabel" htmlFor="DOB">Date of Birth(DD/MM/YYYY) <span style={{color: 'red'}}><b>*</b></span></label>
                <DatePicker type="text" className={ DOBBirth =='' ? "form-control bordererror": "form-control"} id="DOB" value={DOBBirth}
                selected={DOBBirth}
                onChange={date => dateOfBirthOnchange(date)}
                dateFormat="dd/MM/yyyy"
                placeholderText="Select a date"
                />
              </div>


              <div className="form-group col-md-4">
                <label htmlFor="sex">Gender <span style={{color: 'red'}}><b>*</b></span></label>
                 <select className={ sex =='' ? "form-select form-select-sm bordererror": "form-select form-select-sm"} name="sex" id="sex"  onChange={onchange} aria-label=".form-select-sm example">
                <option value="">Select</option>
                <option value={"Male"}>Male</option>
                <option value={"Female"}>Female</option>
                </select>
              </div>


              <div className="form-group col-md-4">
                <label htmlFor="phoneNumber">Phone Number <span style={{color: 'red'}}><b>*</b></span></label>
                <input type="text"  className={ phoneNumber =='' ? "form-control bordererror": "form-control"} name="phoneNumber"  id="phoneNumber" onChange={onchange}></input>
              </div>
              
            </div>
          
            <div className="row">
            <div className="form-group col-12">
                <label htmlFor="address1">Address 1 <span style={{color: 'red'}}><b>*</b></span></label>
                <input type="text"  className={ address1 =='' ? "form-control bordererror": "form-control"} name="address1"  id="address1" onChange={onchange}></input>
              </div>
            </div>
            

            <div className="row">
            <div className="form-group col-12">
                <label htmlFor="address2">Address 2 <span style={{color: 'red'}}><b>*</b></span></label>
                <input type="text"  className={ address2 =='' ? "form-control bordererror": "form-control"} name="address2"  id="address2" onChange={onchange}></input>
              </div>
            </div>


            <div className="row">
              <div className="form-group col-md-4">
                <label htmlFor="district">District <span style={{color: 'red'}}><b>*</b></span></label>
                <select className={ district =='' ? "form-select form-select-sm bordererror": "form-select form-select-sm"} name="district" id="district" onChange={onchange}  aria-label=".form-select-sm example">
                <option value="">Select</option>
                {( (districts!=null && districts.length > 0) &&
                
                districts.map((district) => (
                <option key={district._id} value={district.distric}>{district.distric}</option>
                  ))
                )}
                </select>
              </div>


              <div className="form-group col-md-4">
                <label htmlFor="state">State</label>
                <input type="text"  readOnly className="form-control"  id="state" name="state" value={"Tamil nadu"} ></input>
              </div>


              </div>

              <br/>

              <p className="h6">Login Details</p>


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


              <div className="row">

              <div className="form-group col-md-4">
                <label className="datepickerLabel" htmlFor="startDate">Subscription Start Date <span style={{color: 'red'}}><b>*</b></span></label>
                <DatePicker type="text" className={ startDate =='' ? "form-control bordererror": "form-control"} id="startDate" value={startDate}
                selected={startDate}
                onChange={date => dateOfBirthOnchange(date)}
                dateFormat="dd/MM/yyyy"
                placeholderText="Select a date"
                />
              </div>

              <div className="form-group col-md-4">
                <label className="datepickerLabel" htmlFor="expiryDate">Subscription Expiry Date <span style={{color: 'red'}}><b>*</b></span></label>
                <DatePicker type="text" className={ expiryDate =='' ? "form-control bordererror": "form-control"} id="expiryDate" value={expiryDate}
                selected={expiryDate}
                onChange={date => dateOfBirthOnchange(date)}
                dateFormat="dd/MM/yyyy"
                placeholderText="Select a date"
                />
              </div>

              </div>

              <br/>
              



            <div className="row">
            <div className="form-group col-12">
                <label htmlFor="notes">Notes</label>
                <textarea type="text"  className="form-control" name="notes"  id="notes" onChange={onchange}></textarea>
              </div>
            </div>

        </div>
            
       
      </div>
              
              <br />

              <div className="row" >
            <div className="button-container">
              <button className="primarybutton" type="submit">Save Changes</button>
              <button onClick={() => onCancelClick()} className="secondarybutton">Cancel</button>
            </div>

          
             </div>

             <br /><br /><br />

          

        </form>
     
                </div>
             
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          {(hasError == true ? (<p className="errorText">Name should be user name</p>) : null)}

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
