import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useSearchParams } from 'react-router-dom'
import React, { useState, useRef, useEffect } from 'react';
import { uploadPUProfileImage, getProfileDetailsById, resetImageUploadByState } from "../../Features/Slices/PublicUser/publicUserSlice"
// import { resetImageUploadByState } from "../../Features/Slices/profSlice"
import { toast } from "react-toastify"
import maleavatar from '../../img/Male_avatar.svg'
import femaleavatar from '../../img/Female_avatar.svg'
import { Link } from "react-router-dom";
import "../../scss/horoscopeCheckboxGrid.scss"
// import "../../scss/profileList.scss"
// import "../../scss/common.scss"

export function PURegisterImage() {

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const profileIdParam = searchParams.get('id')

  const backScreenName = searchParams.get('name')
  const profileId = searchParams.get('id')

  const profileUploadImage =
    useSelector(
      (state) => state.public
    )

  useEffect(() => {
    if (profileUploadImage.isUploadProfileSuccess) {
      if (profileUploadImage.uploadProfilemessage.isSuccess) {
        toast.success(profileUploadImage.uploadProfilemessage.message)
        dispatch(resetImageUploadByState())

        setTimeout(function () {
          navigate('/PUAddHoroscope?id=' + profileIdParam + "&name=PUNewProfile", { replace: true })
        }, 1000);
      }
      else {
        toast.error(profileUploadImage.uploadProfilemessage.message)
        dispatch(resetImageUploadByState())
      }
    }
  }, [profileUploadImage.isUploadProfileSuccess, profileUploadImage.uploadProfilemessage], dispatch)


  useEffect(() => {
    dispatch(getProfileDetailsById({ profileId: profileIdParam }))
  }, [])


  const backViewDetailsUrl = () => {
    if (backScreenName == "PUNewProfile") {
      navigate('/publicUserProfile?id=' + profileId + "&name=PUNewProfile", { replace: true })
    }

    if (backScreenName === "VieProDetails") {
      navigate('/publicUserProfile?id=' + profileId + "&name=VieProDetails", { replace: true })
    }

  }

  const onClickNext = () => {
    navigate('/PUAddHoroscope?id=' + profileIdParam + "&name=PUNewProfile", { replace: true })
  }

  function uploadImage() {
    if (!filedata) {
      toast.error("Please Add Your Image..!")
    }

    if (filedata != undefined) {
      dispatch(uploadPUProfileImage([filedata, "data"]))
    }

  }

  const [fileurl, setFileUrl] = useState();
  const [filedata, setFiledata] = useState();

  function handleChange(e) {
    console.log(e.target.files);


    const formData = new FormData()
    //var newFile = new File(e.target.files[0], "magesh");

    const uploadedFile = e.target.files[0];
    const newName = `${Date.now()}`;
    const fileExtension = uploadedFile.name.split('.').pop();
    const modifiedFile = new File([uploadedFile], newName + "." + fileExtension, { type: uploadedFile.type });
    setFileUrl(URL.createObjectURL(modifiedFile));
    formData.append("file", modifiedFile)
    formData.append("profileId", profileIdParam)
    setFiledata(formData)
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

  return (<>

    {(profileUploadImage.isUploadProfileLoading) && (
      <div className="overlay">
        <div className="loading-spinner"></div>
      </div>
    )}


    <div>
      <div onClick={backViewDetailsUrl}>
        <Link className="dropdown-item d-flex align-items-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="#1aa179" className="bi bi-arrow-left-circle" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z" />
          </svg><p className="h6 mb-0 ms-2">Go Back</p></Link>
      </div>

      <div>
        <br />
      </div>
      <p className="h4">Upload Image</p>
      {(profileUploadImage && profileUploadImage.profileDetails) ? (
        <>
          <div className='container row'>
            <div className='row row-cols-1 row-cols-lg-3'>

               <div className="col">
                    <div className="border border-success rounded ps-2 pb-3" >
                        <div className="row ">
                          <div className='col-4' style={{ height: "140px", paddingTop: '10px' }}>                        
                      {/* Add Image */}
                      {profileUploadImage.profileDetails.sex ==="Male" ? (
                        <img src={fileurl || maleavatar} style={{ borderRadius: '5%', padding: '0px' }} />
                      ):profileUploadImage.profileDetails.sex ==="Female" ? (
                        <img src={fileurl || femaleavatar} style={{ borderRadius: '5%', padding: '0px'}} />
                      ):(
                         <p>Gender not specified.</p>
                      )}                  
                          </div>
                            
                            <div className='col-8'> 
                                <div className='row'>
                                 <h5>
                                 <label htmlFor="" className='name text-success mt-2'><b>{profileUploadImage.profileDetails.name}</b> </label><br />
                                 </h5>
                                    
                                    <div className='col-5'>
                                        <label htmlFor="" className=''>Age</label><br />
                                        <label htmlFor=""><b>{calculateAge(profileUploadImage.profileDetails.DOB)}</b></label>
                                    </div>
                                    <div className='col-6'>
                                        <label htmlFor="" className=''>District</label>
                                        <label htmlFor=""><b>{profileUploadImage.profileDetails.district}</b></label>
                                    </div>
                                    <div>
                                        <label htmlFor="" className='mt-2'>Job</label><br />
                                        <label htmlFor=""><b>{profileUploadImage.profileDetails.job}</b></label>
                                    </div>
                                </div>

                            </div>

                        </div>
                    </div>
                </div>

              

              <div className='col ms-md-5'>
                <div className="mb-3">
                  <label htmlFor="formFile" className="form-label">Choose your photo</label>
                  <div className='col-md-12'>

                    <input className="form-control" type='file' onChange={handleChange} id="formFile"></input>
                    <span style={{ color: "red" }}>* image size should be less than 26 MB</span>
                  </div>
                  <div className="row p-2">
                    <div className="col-md-4"> <img src={fileurl} /></div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <button className="secondarybutton" onClick={onClickNext} >Skip</button>
                    </div>
                    <div className="col-md-6">
                      <button onClick={() => uploadImage()} className="primarybutton" >Save & Next</button>
                    </div>
                  </div>
                </div>

              </div>

              {/* <div className="row p-2">
                <div className="col-md-4">
                  <button onClick={() => uploadImage()} className="primarybutton" >Save Image</button>
                </div>
              </div> */}
            </div>
          </div>


        </>
      ) : null}
    </div>

  </>
  )

}
