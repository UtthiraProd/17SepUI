import { useEffect, useState, useRef } from "react"
import { useDispatch,useSelector } from "react-redux"
import { useSearchParams } from "react-router-dom"
import { getPUprofileById, PUProfileImageUrl, AdmindeletePUprofile,resetAdmindeletePUprofile,getAllPUMarriageProfile, resetgetPUprofileById } from "../../Features/Slices/adminBrokerSlice"
import { Link ,useNavigate } from "react-router-dom"
import { formatToTwoDigits } from '../../Utils/formatters'
import { Carousal } from "../Common/Carousal"
import { toast } from "react-toastify"


export function PUMarriageProfDetail(){

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const onHandleShow = useRef(true);
    const onHandleClose = useRef(null);
    const [currentImageUrl, setCurrentImageUrl] = useState('')
    const [show, setShow] = useState(false);
    const [searchParams] = useSearchParams();
    const profileID = searchParams.get('id');
     const pageIndex = searchParams.get('pageIndex')
    const pageStartIndex= searchParams.get('pageStartIndex')
    const formatDate = (dateTime) => {
    const date = new Date(dateTime);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(date.getDate()).padStart(2, '0');
    return `${day}/${month}/${year}`; // Format as YYYY-MM-DD

  }

  const { isgetPUprofileDetailLoading,isPUProfileImageUrlSuccess, isPUProfileImageUrlLoading, isgetPUprofileDetailSuccess, PUprofileDetail,
     ImageUrl,isAdmindeletePUprofileLoading, isAdmindeletePUprofileSuccess,Admindeleteprofile} = useSelector((state) => state.admin)


  useEffect(() => {
    if (isgetPUprofileDetailLoading == false && isgetPUprofileDetailSuccess == false) {
      dispatch(getPUprofileById(profileID))
    }
     dispatch(PUProfileImageUrl({ profileID }));

    // if(isAdmindeletePUprofileSuccess == false && isAdmindeletePUprofileLoading == false ) {
    //  dispatch(AdmindeletePUprofile( {profileID:profileID} )) 
    // //  
    // }

    if(isAdmindeletePUprofileSuccess == true && Admindeleteprofile){
      toast.success(Admindeleteprofile)
      dispatch(resetAdmindeletePUprofile())
     navigate('/PUMarriageProfiles')
    }
  },[ isgetPUprofileDetailLoading, isgetPUprofileDetailSuccess, profileID, isAdmindeletePUprofileLoading ],dispatch)


  const ondeleteProf = () =>{
    dispatch(AdmindeletePUprofile({profileID:profileID}));
  }

  const hasHoroScopeDataR = (horoScope) => {
    return (
      horoScope?.meenaR?.trim() ||
      horoScope?.meshaR?.trim() ||
      horoScope?.vrishbaR?.trim() ||
      horoScope?.mithunaR?.trim() ||
      horoScope?.khumbhaR?.trim() ||
      horoScope?.karkataR?.trim() ||
      horoScope?.makaraR?.trim() ||
      horoScope?.simhaR?.trim() ||
      horoScope?.dhanuR?.trim() ||
      horoScope?.vrishikaR?.trim() ||
      horoScope?.tulaR?.trim() ||
      horoScope?.kanyaR?.trim()
    );
  };


  const hasHoroScopeDataA = (horoScope) => {
    return (
      horoScope?.meenaA?.trim() ||
      horoScope?.meshaA?.trim() ||
      horoScope?.vrishbaA?.trim() ||
      horoScope?.mithunaA?.trim() ||
      horoScope?.khumbhaA?.trim() ||
      horoScope?.karkataA?.trim() ||
      horoScope?.makaraA?.trim() ||
      horoScope?.simhaA?.trim() ||
      horoScope?.dhanuA?.trim() ||
      horoScope?.vrishikaA?.trim() ||
      horoScope?.tulaA?.trim() ||
      horoScope?.kanyaA?.trim()
    );
  };


  const Image = (imageUrl) => {
  setCurrentImageUrl(imageUrl);
  };

  const GoBack = () =>{
    // navigate ('/PUMarriageProfiles')
     navigate ('/PUMarriageProfiles?id'+'&pageIndex='+pageIndex+'&pageStartIndex='+pageStartIndex)
    dispatch(resetgetPUprofileById())
  }

    return(<>

    <div onClick={GoBack} >
          <Link className="dropdown-item d-flex align-items-center"  >
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#1aa179" className="bi bi-arrow-left-circle" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z" />
            </svg><p className="mb-0 ms-2" >Go Back</p></Link></div>

    <div className="container " id="brokdetail">
       {/* <h3>Profile details</h3> */}
       
       <p className="h4">1. Profile details</p>
       <div className="row">
       <div className="col-md-8">

              {/* <div className="row">
                <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Name</label>
                <div className="col-8">
                  <label className="form-control-plaintext">: {PUprofileDetail?.name}</label>
                </div>
              </div> */}

              <div className="row">
                  <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Name</label>
                  <div className="col-8">
                    <label className="form-control-plaintext">: {PUprofileDetail?.name}</label>
                  </div>
                </div>

                <div className="row">
                  <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Sex</label>
                  <div className="col-8">
                    <label className="form-control-plaintext">: {PUprofileDetail?.sex}</label>
                  </div>
                </div>

                <div className="row">
                  <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Marital Status</label>
                  <div className="col-8">
                    <label className="form-control-plaintext">: {PUprofileDetail?.maritalstatus}</label>
                  </div>
                </div>

                <div className="row">
                  <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Blood group</label>
                  <div className="col-8">
                    <label className="form-control-plaintext">: {PUprofileDetail?.bloodGroup}</label>
                  </div>
                </div>

                <div className="row">
                  <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Height (cm)</label>
                  <div className="col-8">
                    <label className="form-control-plaintext">: {PUprofileDetail?.height}</label>
                  </div>
                </div>

                <div className="row">
                  <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Weight (kg)</label>
                  <div className="col-8">
                    <label className="form-control-plaintext">: {PUprofileDetail?.weight} </label>
                  </div>
                </div>

                <div className="row">
                  <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Colour</label>
                  <div className="col-8">
                    <label className="form-control-plaintext">: {PUprofileDetail?.colour}</label>
                  </div>
                </div>

                <div className="row">
                  <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Food preference</label>
                  <div className="col-8">
                    <label className="form-control-plaintext">: {PUprofileDetail?.foodPreference}</label>
                  </div>
                </div>

                <div className="row">
                  <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Mother tongue</label>
                  <div className="col-8">
                    <label className="form-control-plaintext">: {PUprofileDetail?.motherTongue}</label>
                  </div>
                </div>

                <div className="row">
                  <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Religion</label>
                  <div className="col-8">
                    <label className="form-control-plaintext">: {PUprofileDetail?.religion}</label>
                  </div>
                </div>

                <div className="row">
                  <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Caste</label>
                  <div className="col-8">
                    <label className="form-control-plaintext">: {PUprofileDetail?.caste}</label>
                  </div>
                </div>

                <div className="row">
                  <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Sub Caste</label>
                  <div className="col-8">
                    <label className="form-control-plaintext">: {PUprofileDetail?.subcaste}</label>
                  </div>
                </div>
                </div>
                <div className="col-4">
                                {isPUProfileImageUrlSuccess && !isPUProfileImageUrlLoading && (
                                  ImageUrl && ImageUrl.length > 0 ? (
                                    <div>
                                      <Carousal imageUrls={ImageUrl} onImageChange={Image} />
                                      {/* <ShareImageToWhatsApp imageUrl={currentImageUrl} /> */}
                                    </div>
                                  ) : (
                                    <div>
                                      <Link className="dropdown-item">
                                        <br /><br /><br />
                                        <p>
                                          <span style={{ fontWeight: 'bold', color: '#ff5722' }}>Image</span> not available.
                                          <span
                                            style={{ cursor: 'pointer', color: '#1aa179', display: 'inline-flex', alignItems: 'center', marginLeft: '8px' }}
                                          >
                                          </span>
                                        </p>
                                      </Link>
                                    </div>
                                  )
                                )}
                                 </div>
                </div>

        <div className="row">
          <div className="col mt-3">
              <p className="h4">2. Education and Occupation</p>

              <div className="row">
                <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Qualification</label>
                <div className="col-8">
                  <label className="form-control-plaintext">: {PUprofileDetail?.additionalQualification ? `${PUprofileDetail?.additionalQualification},${PUprofileDetail?.qualification}`:
                  PUprofileDetail?.qualification}</label>
                </div>
              </div>

              <div className="row">
                <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Job Title</label>
                <div className="col-8">
                  <label className="form-control-plaintext">: {PUprofileDetail?.job}</label>
                </div>
              </div>

              <div className="row">
                <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Job Description</label>
                <div className="col-8">
                  <label className="form-control-plaintext">: {PUprofileDetail?.jobDescription}</label>
                </div>
              </div>

              <div className="row">
                <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Salary per month</label>
                <div className="col-8">
                  <label className="form-control-plaintext">: {PUprofileDetail?.salary}</label>
                </div>
              </div>

              

           {PUprofileDetail?.jobLocation && !PUprofileDetail?.foreignCountry && (
  <div className="row">
    <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Job location</label>
    <div className="col-8">
      <label className="form-control-plaintext">: {PUprofileDetail.jobLocation}</label>
    </div>
  </div>
)}

{PUprofileDetail?.foreignCountry && !PUprofileDetail?.jobLocation && (
  <div className="row">
    <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Job Country</label>
    <div className="col-8">
      <label className="form-control-plaintext">: {PUprofileDetail.foreignCountry}</label>
    </div>
  </div>
)}
  </div>
  </div>

<div className="row">

              <p className="h4 mt-3">3. Family Details</p>

              <div className="row">
                <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Father Name</label>
                <div className="col-8">
                  <label className="form-control-plaintext">: {PUprofileDetail?.fatherName}</label>
                </div>
              </div>

              <div className="row">
                <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Father occupation</label>
                <div className="col-8">
                  <label className="form-control-plaintext">: {PUprofileDetail?.fatherOccupation}</label>
                </div>
              </div>

              <div className="row">
                <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Mother Name</label>
                <div className="col-8">
                  <label className="form-control-plaintext">: {PUprofileDetail?.motherName}</label>
                </div>
              </div>

              <div className="row">
                <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Mother occupation</label>
                <div className="col-8">
                  <label className="form-control-plaintext">: {PUprofileDetail?.motherOccupation}</label>
                </div>
              </div>

              <div className="row">
                <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Sister(s) Married</label>
                <div className="col-8">
                  <label className="form-control-plaintext">: {PUprofileDetail?.sistersMarried}</label>
                </div>
              </div>

              <div className="row">
                <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Sister(s) Unmarried</label>
                <div className="col-8">
                  <label className="form-control-plaintext">: {PUprofileDetail?.sistersUnmarried}</label>
                </div>
              </div>

              <div className="row">
                <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Brother(s) Married</label>
                <div className="col-8">
                  <label className="form-control-plaintext">: {PUprofileDetail?.brothersMarried}</label>
                </div>
              </div>

              <div className="row">
                <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Brother(s) Unmarried</label>
                <div className="col-8">
                  <label className="form-control-plaintext">: {PUprofileDetail?.brothersUnmarried}</label>
                </div>
              </div>

              <div className="row">
                <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Settled Location</label>
                <div className="col-8">
                  <label className="form-control-plaintext">: {PUprofileDetail?.settledLocation}</label>
                </div>
              </div>
            </div>

      <div className="row"> 

        <p className="h4 mt-3">4. Family Contact details</p>
              <div className="row">
                <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Contact person</label>
                <div className="col-8">
                  <label className="form-control-plaintext">: {PUprofileDetail?.contactPerson}</label>
                </div>
              </div>

              <div className="row">
                <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Contact number</label>
                <div className="col-8">
                  <label className="form-control-plaintext">: {PUprofileDetail?.phoneNumber}</label>
                </div>
              </div>

              <div className="row">
                <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Address of family's Residence</label>
                <div className="col-8">
                  <label className="form-control-plaintext">: {PUprofileDetail?.address1}, {PUprofileDetail?.address2}, {PUprofileDetail?.district}, {PUprofileDetail?.state}</label>
                </div>
              </div>
      </div>

      <div className="row mt-3">
        <p className="h4" >5. Additional Information</p>

              <div className="row">
                <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Self Description</label>
                <div className="col-8">
                  <label className="form-control-plaintext">: {PUprofileDetail?.selfDescription}</label>
                </div>
              </div>

              <div className="row">
                <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Expectation from marriage</label>
                <div className="col-8">
                  <label className="form-control-plaintext">: {PUprofileDetail?.expectationFromMarriage}</label>
                </div>
              </div>

              <div className="row">
                <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Notes</label>
                <div className="col-8">
                  <label className="form-control-plaintext">: {PUprofileDetail?.notes}</label>
                </div>
              </div>
      </div>

      <div className="row mt-3">
        <p className="h3">Horoscope Details</p>
        <>
                    <div id="dvhoroscope" className="row">
        
                      <div className="col-md-4">
                        <div className="row">
                          <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Date of Birth</label>
                          <div className="col-8">
                            <label className="form-control-plaintext">: {formatDate(PUprofileDetail?.DOB)}</label>
                          </div>
                        </div>
        
                        <div className="row">
                          <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Birth Time</label>
                          {/* <div className="col-8">
                            <label className="form-control-plaintext">: {formatToTwoDigits(profile?.profileDetails?.birthHour)}:{formatToTwoDigits(profile?.profileDetails?.birthMin)} {profile?.profileDetails?.meridiem}</label>
                          </div> */}
        <div className="col-8">
          <label className="form-control-plaintext">:
            {
              PUprofileDetail?.birthHour != null &&
              PUprofileDetail?.birthMin != null &&
              PUprofileDetail?.meridiem
                ? ` ${formatToTwoDigits(PUprofileDetail.birthHour)}:${formatToTwoDigits(PUprofileDetail.birthMin)} ${PUprofileDetail.meridiem}`
                : ''
            }
          </label>
        </div>
        
                        </div>
        
                        <div className="row">
                          <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Place of Birth</label>
                          <div className="col-8">
                            <label className="form-control-plaintext">: {PUprofileDetail?.POB}</label>
                          </div>
                        </div>
        
                        <div className="row">
                          <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Star</label>
                          <div className="col-8">
                            <label className="form-control-plaintext">: {PUprofileDetail?.star}</label>
                          </div>
                        </div>
        
                        <div className="row">
                          <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Rasi</label>
                          <div className="col-8">
                            <label className="form-control-plaintext">: {PUprofileDetail?.rasi}</label>
                          </div>
                        </div>
        
                        <div className="row">
                          <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Dhosam</label>
                          <div className="col-8">
                            <label className="form-control-plaintext">: {PUprofileDetail?.dhosam}</label>
                          </div>
                        </div>
        
                        <div className="row">
                          <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">திசைஇருப்பு</label>
                          <div className="col-8">
                            <label className="form-control-plaintext">: {PUprofileDetail?.horoScope?.dhasa}</label>
                          </div>
                        </div>
        
                        <div className="row">
                          <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">வருடம்</label>
                          <div className="col-8">
                            <label className="form-control-plaintext">: {PUprofileDetail?.horoScope?.year}</label>
                          </div>
                        </div>
        
                        <div className="row">
                          <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">மாதம்</label>
                          <div className="col-8">
                            <label className="form-control-plaintext">: {PUprofileDetail?.horoScope?.month}</label>
                          </div>
                        </div>
        
                        <div className="row">
                          <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">நாள்</label>
                          <div className="col-8">
                            <label className="form-control-plaintext">: {PUprofileDetail?.horoScope?.day}</label>
                          </div>
                        </div>
        
                        <br /><br />
                      </div>

        {/* { isgetPUprofileDetailSuccess && !isgetPUprofileDetailLoading && ( */}
                      <div className="col-md-8">
           {PUprofileDetail?.horoScope && hasHoroScopeDataR(PUprofileDetail.horoScope) ? (       
                          <div className="row">
                            <div className="row">
                              <div className="col-3 horo-column">&nbsp;
                                {PUprofileDetail?.horoScope?.meenaR?.split(' ').map((item, index) => (
                                  <span className={item === 'ல' ? 'red-text' : ''} key={index}>
                                    {item === ' ' ? '\u00A0' : item} {/* Handle spaces */}
                                  </span>
                                ))}
                              </div>
        
                              <div className="col-3 horo-column">&nbsp;
                                {PUprofileDetail?.horoScope?.meshaR?.split(' ').map((item, index) => (
                                  <span className={item === 'ல' ? 'red-text' : ''} key={index}>
                                    {item === ' ' ? '\u00A0' : item} {/* Handle spaces */}
                                  </span>
                                ))}
                              </div>
        
                              <div className="col-3 horo-column">&nbsp;
                                {PUprofileDetail?.horoScope?.vrishbaR?.split(' ').map((item, index) => (
                                  <span className={item === 'ல' ? 'red-text' : ''} key={index}>
                                    {item === ' ' ? '\u00A0' : item} {/* Handle spaces */}
                                  </span>
                                ))}
                              </div>
        
                              <div className="col-3 horo-column">&nbsp;
                                {PUprofileDetail?.horoScope?.mithunaR?.split(' ').map((item, index) => (
                                  <span className={item === 'ல' ? 'red-text' : ''} key={index}>
                                    {item === ' ' ? '\u00A0' : item} {/* Handle spaces */}
                                  </span>
                                ))}
                              </div>
                            </div>
        
                            <div className="row">
                              <div className="col-3 horo-column">&nbsp;
                                {PUprofileDetail?.horoScope?.khumbhaR?.split(' ').map((item, index) => (
                                  <span className={item === 'ல' ? 'red-text' : ''} key={index}>
                                    {item === ' ' ? '\u00A0' : item} {/* Handle spaces */}
                                  </span>
                                ))}
                              </div>
        
                              <div className="col-6 text-center"><br /><h5><b>ராசி</b></h5></div>
                              <div className="col-3 horo-column">&nbsp;
                                {PUprofileDetail?.horoScope?.karkataR?.split(' ').map((item, index) => (
                                  <span className={item === 'ல' ? 'red-text' : ''} key={index}>
                                    {item === ' ' ? '\u00A0' : item} {/* Handle spaces */}
                                  </span>
                                ))}
                              </div>
                            </div>
        
        
                            <div className="row">
                              <div className="col-3 horo-column">&nbsp;
                                {PUprofileDetail?.horoScope?.makaraR?.split(' ').map((item, index) => (
                                  <span className={item === 'ல' ? 'red-text' : ''} key={index}>
                                    {item === ' ' ? '\u00A0' : item} {/* Handle spaces */}
                                  </span>
                                ))}
                              </div>
        
        
                              <div className="col-6"></div>
                              <div className="col-3 horo-column">&nbsp;
                                {PUprofileDetail?.horoScope?.simhaR?.split(' ').map((item, index) => (
                                  <span className={item === 'ல' ? 'red-text' : ''} key={index}>
                                    {item === ' ' ? '\u00A0' : item} {/* Handle spaces */}
                                  </span>
                                ))}
                              </div>
                            </div>
        
        
                            <div className="row">
                              <div className="col-3 horo-column">&nbsp;
                                {PUprofileDetail?.horoScope?.dhanuR?.split(' ').map((item, index) => (
                                  <span className={item === 'ல' ? 'red-text' : ''} key={index}>
                                    {item === ' ' ? '\u00A0' : item} {/* Handle spaces */}
                                  </span>
                                ))}
                              </div>
        
        
                              <div className="col-3 horo-column">&nbsp;
                                {PUprofileDetail?.horoScope?.vrishikaR?.split(' ').map((item, index) => (
                                  <span className={item === 'ல' ? 'red-text' : ''} key={index}>
                                    {item === ' ' ? '\u00A0' : item} {/* Handle spaces */}
                                  </span>
                                ))}
                              </div>
        
        
                              <div className="col-3 horo-column">&nbsp;
                                {PUprofileDetail?.horoScope?.tulaR?.split(' ').map((item, index) => (
                                  <span className={item === 'ல' ? 'red-text' : ''} key={index}>
                                    {item === ' ' ? '\u00A0' : item} {/* Handle spaces */}
                                  </span>
                                ))}
                              </div>
        
        
                              <div className="col-3 horo-column">&nbsp;
                                {PUprofileDetail?.horoScope?.kanyaR?.split(' ').map((item, index) => (
                                  <span className={item === 'ல' ? 'red-text' : ''} key={index}>
                                    {item === ' ' ? '\u00A0' : item} {/* Handle spaces */}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>

                ) : (
                   <div className="row text-center">
                      <p>
                        <span style={{ fontWeight: 'bold', color: '#ff5722' }}>ராசி</span> not available.
                        <span
                          style={{ cursor: 'pointer', color: '#1aa179', display: 'inline-flex', alignItems: 'center', marginLeft: '8px' }}
                        >
                        </span>
                      </p>
                  </div>
                )}

                {PUprofileDetail?.horoScope && hasHoroScopeDataA(PUprofileDetail?.horoScope) ? (
        
                          <div className="row mt-3">
                            <div className="row">
                              <div className="col-3 horo-column">&nbsp;
                                {PUprofileDetail?.horoScope?.meenaA?.split(' ').map((item, index) => (
                                  <span style={{ color: item === 'ல' ? 'red' : 'black' }} key={index}>
                                    {item === ' ' ? '\u00A0' : item} {/* Handle spaces as well */}
                                  </span>
                                ))}
                              </div>
        
        
                              <div className="col-3 horo-column">&nbsp;
                                {PUprofileDetail?.horoScope?.meshaA?.split(' ').map((item, index) => (
                                  <span style={{ color: item === 'ல' ? 'red' : 'black' }} key={index}>
                                    {item === ' ' ? '\u00A0' : item} {/* Handle spaces as well */}
                                  </span>
                                ))}
                              </div>
        
        
                              <div className="col-3 horo-column">&nbsp;
                                {PUprofileDetail?.horoScope?.vrishbaA?.split(' ').map((item, index) => (
                                  <span style={{ color: item === 'ல' ? 'red' : 'black' }} key={index}>
                                    {item === ' ' ? '\u00A0' : item} {/* Handle spaces as well */}
                                  </span>
                                ))}
                              </div>
        
        
                              <div className="col-3 horo-column">&nbsp;
                                {PUprofileDetail?.horoScope?.mithunaA?.split(' ').map((item, index) => (
                                  <span style={{ color: item === 'ல' ? 'red' : 'black' }} key={index}>
                                    {item === ' ' ? '\u00A0' : item} {/* Handle spaces as well */}
                                  </span>
                                ))}
                              </div>
                            </div>
        
        
                            <div className="row">
                              <div className="col-3 horo-column">&nbsp;
                                {PUprofileDetail?.horoScope?.khumbhaA?.split(' ').map((item, index) => (
                                  <span style={{ color: item === 'ல' ? 'red' : 'black' }} key={index}>
                                    {item === ' ' ? '\u00A0' : item} {/* Handle spaces as well */}
                                  </span>
                                ))}
                              </div>
        
        
                              <div className="col-6 text-center"><br /><h5><b>அம்சம்</b></h5></div>
        
                              <div className="col-3 horo-column">&nbsp;
                                {PUprofileDetail?.horoScope?.karkataA?.split(' ').map((item, index) => (
                                  <span style={{ color: item === 'ல' ? 'red' : 'black' }} key={index}>
                                    {item === ' ' ? '\u00A0' : item} {/* Handle spaces as well */}
                                  </span>
                                ))}
                              </div>
                            </div>
        
        
                            <div className="row">
                              <div className="col-3 horo-column">&nbsp;
                                {PUprofileDetail?.horoScope?.makaraA?.split(' ').map((item, index) => (
                                  <span style={{ color: item === 'ல' ? 'red' : 'black' }} key={index}>
                                    {item === ' ' ? '\u00A0' : item} {/* Handle spaces as well */}
                                  </span>
                                ))}
                              </div>
        
        
                              <div className="col-6"></div>
                              <div className="col-3 horo-column">&nbsp;
                                {PUprofileDetail?.horoScope?.simhaA?.split(' ').map((item, index) => (
                                  <span style={{ color: item === 'ல' ? 'red' : 'black' }} key={index}>
                                    {item === ' ' ? '\u00A0' : item} {/* Handle spaces as well */}
                                  </span>
                                ))}
                              </div>
                            </div>
        
        
                            <div className="row">
                              <div className="col-3 horo-column">&nbsp;
                                {PUprofileDetail?.horoScope?.dhanuA?.split(' ').map((item, index) => (
                                  <span style={{ color: item === 'ல' ? 'red' : 'black' }} key={index}>
                                    {item === ' ' ? '\u00A0' : item} {/* Handle spaces as well */}
                                  </span>
                                ))}
                              </div>
        
        
                              <div className="col-3 horo-column">&nbsp;
                                {PUprofileDetail?.horoScope?.vrishikaA?.split(' ').map((item, index) => (
                                  <span style={{ color: item === 'ல' ? 'red' : 'black' }} key={index}>
                                    {item === ' ' ? '\u00A0' : item} {/* Handle spaces as well */}
                                  </span>
                                ))}
                              </div>
        
        
                              <div className="col-3 horo-column">&nbsp;
                                {PUprofileDetail?.horoScope?.tulaA?.split(' ').map((item, index) => (
                                  <span style={{ color: item === 'ல' ? 'red' : 'black' }} key={index}>
                                    {item === ' ' ? '\u00A0' : item} {/* Handle spaces as well */}
                                  </span>
                                ))}
                              </div>
        
        
                              <div className="col-3 horo-column">&nbsp;
                                {PUprofileDetail?.horoScope?.kanyaA?.split(' ').map((item, index) => (
                                  <span style={{ color: item === 'ல' ? 'red' : 'black' }} key={index}>
                                    {item === ' ' ? '\u00A0' : item} {/* Handle spaces as well */}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                ) : (
                  <div className="row text-center">
                      <p>
                        <span style={{ fontWeight: 'bold', color: '#ff5722' }}>அம்சம்</span> not available.
                        <span
                          style={{ cursor: 'pointer', color: '#1aa179', display: 'inline-flex', alignItems: 'center', marginLeft: '8px' }}
                        >
                        </span>
                      </p>
                  </div>
                )}  
                      </div> 
                     {/* )}         */}
                    </div>  
                                   
                  </>
      </div>

  </div>
  <button className="btn btn-danger me-5 col-2 pd-5" onClick={ondeleteProf} style={{ marginLeft: 10 }} type="button">Delete</button>
    </>)
}