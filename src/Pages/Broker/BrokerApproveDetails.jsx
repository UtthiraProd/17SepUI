import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { BrokerApproveDetailsById,PUProfileRegisterInMarriageProfileTable,resetRejectProfile,
  resetPUProfileRegisterInMarriageProfileTable,RejectProfile,getNewPUProfileList,getPUImageUrl,resetProfileDetails} from '../../Features/Slices/brokSlice';
import { useLocation, useSearchParams,useNavigate } from 'react-router-dom'
import { use } from "react";
import { toast } from "react-toastify"
import { Carousal } from "../Common/Carousal"
import { formatToTwoDigits } from '../../Utils/formatters'

export function BrokerApproveDetails() {

    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [searchParams] = useSearchParams();
    const profileId = searchParams.get('id')
    const brokerId = searchParams.get('brId')
    const pageIndex = searchParams.get('pageIndex')
    const pageStartIndex = searchParams.get('pageStartIndex')
    // alert(brokerId)
    const {isProfiledetailLoading, isProfiledetailSuccess, Profiledetails,isPUProfileRegisterInMarriageProfileTableSuccess,PUProfileRegisterInMarriageProfileTableMessage,
      isRejectProfileSuccess,RejectedMessage,ProfileImages,isImageSuccess,Images
    } = useSelector((state) => state.brok);

    useEffect(()=>{
        if(isProfiledetailLoading ===  false && isProfiledetailSuccess === false){
            dispatch(BrokerApproveDetailsById({profileId:profileId}))
            // dispatch(resetProfileDetails())
        }
         if (isPUProfileRegisterInMarriageProfileTableSuccess === true && PUProfileRegisterInMarriageProfileTableMessage) {
              toast.success(PUProfileRegisterInMarriageProfileTableMessage)
              navigate('/NewPUProfileList')
              dispatch(resetPUProfileRegisterInMarriageProfileTable())
            }
         if (isPUProfileRegisterInMarriageProfileTableSuccess === false && PUProfileRegisterInMarriageProfileTableMessage){
          toast.error(PUProfileRegisterInMarriageProfileTableMessage)
          dispatch(resetPUProfileRegisterInMarriageProfileTable())
         } 
         if (isRejectProfileSuccess ===  true && RejectedMessage){
          toast.success(RejectedMessage)
          dispatch(resetRejectProfile())
          navigate('/NewPUProfileList')
          dispatch(getNewPUProfileList())
         }
        
    },[isProfiledetailLoading, isProfiledetailSuccess,Profiledetails,isPUProfileRegisterInMarriageProfileTableSuccess,PUProfileRegisterInMarriageProfileTableMessage,
      isRejectProfileSuccess,RejectedMessage,ProfileImages
    ],dispatch);

    const onBackClick = () => {
    navigate('/NewPUProfileList?' +'&pageIndex='+pageIndex + "&pageStartIndex="+pageStartIndex,);
    dispatch(resetProfileDetails())
          }

    const onAcceptClick = () => {
      dispatch(PUProfileRegisterInMarriageProfileTable({ profileId:profileId }));
    };

    const onRejectClick = () => {
      dispatch(RejectProfile({profileId:profileId}))
    }

      useEffect(() => {
        dispatch(getPUImageUrl({profileId:profileId }));
      }, [profileId]);

        var rasiNames = []
  var amsamNames = []

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

    const formatDate = (dateTime) => {

    const date = new Date(dateTime);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(date.getDate()).padStart(2, '0');
    return `${day}/${month}/${year}`; // Format as YYYY-MM-DD

  }

    return(<>

    <div className="dropdown-item d-flex align-items-center" >
        <svg onClick={onBackClick} style={{ cursor: 'pointer' }} xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#1aa179" className="bi bi-arrow-left-circle" viewBox="0 0 16 16">
          <path fillRule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z" />
        </svg>
        <p className="h6 mb-0 ms-2" style={{ cursor: 'pointer' }}>Go Back</p>
      </div>
      <div> <br /> </div>
    <p className="h4">Profile Details</p>

    <div className="row">
<div className="col-md-8">
        <div className="card-container">
            {isProfiledetailLoading && (
              <>
                <div className="section-skeleton">
                  <div className="skeleton skeleton-Detail-section1"></div>
                </div>
              </>
            )} </div>
        {isProfiledetailSuccess && !isProfiledetailLoading && (
            <>

        <p className="h5">1. Personal details</p><br />
            <div className="row">
                <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Name</label>
                <div className="col-8">
                  <label className="form-control-plaintext">: {Profiledetails.name}</label>
                </div>
              </div>

            <div className="row">
                <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Sex</label>
                <div className="col-8">
                  <label className="form-control-plaintext">: {Profiledetails.sex}</label>
                </div>
              </div>

            <div className="row">
                <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Marital Status</label>
                <div className="col-8">
                  <label className="form-control-plaintext">: {Profiledetails.maritalstatus}</label>
                </div>
              </div>

            <div className="row">
                <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Blood group</label>
                <div className="col-8">
                  <label className="form-control-plaintext">: {Profiledetails.bloodGroup}</label>
                </div>
              </div>

            <div className="row">
                <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Height (cm)</label>
                <div className="col-8">
                  <label className="form-control-plaintext">: {Profiledetails.height}</label>
                </div>
              </div>
             
            <div className="row">
                <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Weight (kg)</label>
                <div className="col-8">
                  <label className="form-control-plaintext">: {Profiledetails.weight}</label>
                </div>
              </div>

            <div className="row">
                <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Colour</label>
                <div className="col-8">
                  <label className="form-control-plaintext">: {Profiledetails.colour}</label>
                </div>
              </div>

            <div className="row">
                <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Food preference</label>
                <div className="col-8">
                  <label className="form-control-plaintext">: {Profiledetails.foodPreference}</label>
                </div>
              </div>

            <div className="row">
                <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Mother tongue</label>
                <div className="col-8">
                  <label className="form-control-plaintext">: {Profiledetails.motherTongue}</label>
                </div>
              </div> 

            <div className="row">
                <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Religion</label>
                <div className="col-8">
                  <label className="form-control-plaintext">: {Profiledetails.religion}</label>
                </div>
              </div>

            <div className="row">
                <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Caste</label>
                <div className="col-8">
                  <label className="form-control-plaintext">: {Profiledetails.caste}</label>
                </div>
              </div>

            <div className="row">
                <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Sub Caste</label>
                <div className="col-8">
                  <label className="form-control-plaintext">: {Profiledetails.subcaste}</label>
                </div>
              </div> <br /><br />

            <p className="h5">2. Education and Occupation</p>


            <div className="row">
                <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Qualification</label>
                <div className="col-8">
                  <label className="form-control-plaintext">: {Profiledetails.qualification}</label>
                </div>
              </div> 

            <div className="row">
                <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Job Title</label>
                <div className="col-8">
                  <label className="form-control-plaintext">: {Profiledetails.job}</label>
                </div>
              </div>  

            <div className="row">
                <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Job Description</label>
                <div className="col-8">
                  <label className="form-control-plaintext">: {Profiledetails.jobDescription}</label>
                </div>
              </div>  

            <div className="row">
                <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Salary per month</label>
                <div className="col-8">
                  <label className="form-control-plaintext">: {Profiledetails.salary}</label>
                </div>
              </div> 

            <div className="row">
                <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Job in abroad ?</label>
                <div className="col-8">
                  <label className="form-control-plaintext">: {Profiledetails.jobInAbroad}</label>
                </div>
              </div>  

            <div className="row">
                <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Job location</label>
                <div className="col-8">
                  <label className="form-control-plaintext">: {Profiledetails.jobLocation}</label>
                </div>
              </div>

            <div className="row">
                <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Job Country</label>
                <div className="col-8">
                  <label className="form-control-plaintext">: {Profiledetails.foreignCountry}</label>
                </div>
              </div><br /><br /> 



            <p className="h5">3. Family Details</p>

            
           <div className="row">
                <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Father Name</label>
                <div className="col-8">
                  <label className="form-control-plaintext">: {Profiledetails.fatherName}</label>
                </div>
              </div>

              <div className="row">
                <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Father occupation</label>
                <div className="col-8">
                  <label className="form-control-plaintext">: {Profiledetails.fatherOccupation}</label>
                </div>
              </div>
              
              <div className="row">
                <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Mother Name</label>
                <div className="col-8">
                  <label className="form-control-plaintext">: {Profiledetails.motherName}</label>
                </div>
              </div>

              <div className="row">
                <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Mother occupation</label>
                <div className="col-8">
                  <label className="form-control-plaintext">: {Profiledetails.motherOccupation}</label>
                </div>
              </div>

              <div className="row">
                <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Sister(s) Married</label>
                <div className="col-8">
                  <label className="form-control-plaintext">: {Profiledetails.sistersMarried}</label>
                </div>
              </div>

              <div className="row">
                <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Sister(s) Unmarried</label>
                <div className="col-8">
                  <label className="form-control-plaintext">: {Profiledetails.sistersUnmarried}</label>
                </div>
              </div>

              <div className="row">
                <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Brother(s) Married</label>
                <div className="col-8">
                  <label className="form-control-plaintext">: {Profiledetails.brothersMarried}</label>
                </div>
              </div>

              <div className="row">
                <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Brother(s) Unmarried</label>
                <div className="col-8">
                  <label className="form-control-plaintext">: {Profiledetails.brothersUnmarried}</label>
                </div>
              </div>

              <div className="row">
                <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Settled Location</label>
                <div className="col-8">
                  <label className="form-control-plaintext">: {Profiledetails.settledLocation}</label>
                </div>
              </div><br /><br />

             <p className="h5">4. Family Contact details</p>

             <div className="row">
                <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Contact person</label>
                <div className="col-8">
                  <label className="form-control-plaintext">: {Profiledetails.contactPerson}</label>
                </div>
              </div>

             <div className="row">
                <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Contact number</label>
                <div className="col-8">
                  <label className="form-control-plaintext">: {Profiledetails.phoneNumber}</label>
                </div>
              </div>

              <div className="row">
                <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Address of family's Residence</label>
                <div className="col-8">
                  <label className="form-control-plaintext">: {Profiledetails.address1}, {Profiledetails.address2}, {Profiledetails.district}, {Profiledetails.state}</label>
                </div>
              </div> <br /><br /> 

             <p className="h5">5. Additional Information</p> 

              <div className="row">
                <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Self Description</label>
                <div className="col-8">
                  <label className="form-control-plaintext">: {Profiledetails.selfDescription}</label>
                </div>
              </div>

              <div className="row">
                <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Expectation from marriage</label>
                <div className="col-8">
                  <label className="form-control-plaintext">: {Profiledetails.expectationFromMarriage}</label>
                </div>
              </div>

              <div className="row">
                <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Notes</label>
                <div className="col-8">
                  <label className="form-control-plaintext">: {Profiledetails.notes}</label>
                </div>
              </div><br /><br />
          </>
        )}  
    </div>

        <div className="col-md-4">
                      {isProfiledetailSuccess && !isProfiledetailLoading && (
                        Profiledetails && isImageSuccess && Images.length > 0 ? (
                          <div>
                            <Carousal imageUrls={Images} />
                          </div>
                        ) : (
                          <div>
                              <p>
                                <span style={{ fontWeight: 'bold', color: '#ff5722' }}>Image</span> not available.

                              </p>
                          </div>
                        )
                      )}
        </div>
 </div>

             <p className="h5">5. Horoscope Details</p>

             <div className="row">

              <div className="col-md-5">

              <div className="row">
                <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Date of Birth</label>
                <div className="col-8">
                  <label className="form-control-plaintext">: {formatDate(Profiledetails?.DOB)}</label>
                </div>
              </div>
                
             <div className="row">
                <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Birth Time</label>
                {/* <div className="col-8">
                  <label className="form-control-plaintext">: {formatToTwoDigits(Profiledetails.birthHour)}:{formatToTwoDigits(Profiledetails.birthMin)} {Profiledetails.meridiem}</label>
                  
                </div> */}
                <div className="col-8">
                  <label className="form-control-plaintext">:
                    {
                      Profiledetails?.birthHour != null &&
                      Profiledetails?.birthMin != null &&
                      Profiledetails?.meridiem
                        ? ` ${formatToTwoDigits(Profiledetails?.birthHour)}:${formatToTwoDigits(Profiledetails?.birthMin)} ${Profiledetails?.meridiem}`
                        : ''
                    }
                  </label>
                </div>
              </div>

             <div className="row">
                <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Star</label>
                <div className="col-8">
                  <label className="form-control-plaintext">: {Profiledetails.star}</label>
                </div>
              </div>

              <div className="row">
                <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Rasi</label>
                <div className="col-8">
                  <label className="form-control-plaintext">: {Profiledetails.rasi}</label>
                </div>
              </div>

             <div className="row">
                <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Dhosam</label>
                <div className="col-8">
                  <label className="form-control-plaintext">: {Profiledetails.dhosam}</label>
                </div>
              </div>
                                                                 
            <div className="row">
                <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">திசைஇருப்பு</label>
                <div className="col-8">
                  <label className="form-control-plaintext">: {Profiledetails.dhasa}</label>
                </div>
              </div>

              <div className="row">
                <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">வருடம்</label>
                <div className="col-8">
                  <label className="form-control-plaintext">: {Profiledetails.year}</label>
                </div>
              </div>

              <div className="row">
                <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">மாதம்</label>
                <div className="col-8">
                  <label className="form-control-plaintext">: {Profiledetails.month}</label>
                </div>
              </div>

              <div className="row">
                <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">நாள்</label>
                <div className="col-8">
                  <label className="form-control-plaintext">: {Profiledetails.day}</label>
                </div>
              </div>
            <div>
              
            </div>
  
           </div>

              <div className="col-md-7">
                {Profiledetails?.horoScope && hasHoroScopeDataR(Profiledetails.horoScope) ? (
                   <div className="row">
                <div className="row">
                  <div className="col-3 horo-column">&nbsp;
                        {Profiledetails?.horoScope?.meenaR?.split(' ').map((item, index) => (
                          <span className={item === 'ல' ? 'red-text' : ''} key={index}>
                            {item === ' ' ? '\u00A0' : item} {/* Handle spaces */}
                          </span>
                        ))}
                  </div>

                  <div className="col-3 horo-column">&nbsp;
                        {Profiledetails?.horoScope?.meshaR?.split(' ').map((item, index) => (
                          <span className={item === 'ல' ? 'red-text' : ''} key={index}>
                            {item === ' ' ? '\u00A0' : item} {/* Handle spaces */}
                          </span>
                        ))}
                      </div>

                  <div className="col-3 horo-column">&nbsp;
                        {Profiledetails?.horoScope?.vrishbaR?.split(' ').map((item, index) => (
                          <span className={item === 'ல' ? 'red-text' : ''} key={index}>
                            {item === ' ' ? '\u00A0' : item} {/* Handle spaces */}
                          </span>
                        ))}
                      </div>

                      <div className="col-3 horo-column">&nbsp;
                        {Profiledetails?.horoScope?.mithunaR?.split(' ').map((item, index) => (
                          <span className={item === 'ல' ? 'red-text' : ''} key={index}>
                            {item === ' ' ? '\u00A0' : item} {/* Handle spaces */}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-3 horo-column">&nbsp;
                        {Profiledetails?.horoScope?.khumbhaR?.split(' ').map((item, index) => (
                          <span className={item === 'ல' ? 'red-text' : ''} key={index}>
                            {item === ' ' ? '\u00A0' : item} {/* Handle spaces */}
                          </span>
                        ))}
                      </div>

                      <div className="col-6 text-center"><br /><h5><b>ராசி</b></h5></div>
                      <div className="col-3 horo-column">&nbsp;
                        {Profiledetails?.horoScope?.karkataR?.split(' ').map((item, index) => (
                          <span className={item === 'ல' ? 'red-text' : ''} key={index}>
                            {item === ' ' ? '\u00A0' : item} {/* Handle spaces */}
                          </span>
                        ))}
                      </div>
                    </div>


                    <div className="row">
                      <div className="col-3 horo-column">&nbsp;
                        {Profiledetails?.horoScope?.makaraR?.split(' ').map((item, index) => (
                          <span className={item === 'ல' ? 'red-text' : ''} key={index}>
                            {item === ' ' ? '\u00A0' : item} {/* Handle spaces */}
                          </span>
                        ))}
                      </div>


                      <div className="col-6"></div>
                      <div className="col-3 horo-column">&nbsp;
                        {Profiledetails?.horoScope?.simhaR?.split(' ').map((item, index) => (
                          <span className={item === 'ல' ? 'red-text' : ''} key={index}>
                            {item === ' ' ? '\u00A0' : item} {/* Handle spaces */}
                          </span>
                        ))}
                      </div>
                    </div>


                    <div className="row">
                      <div className="col-3 horo-column">&nbsp;
                        {Profiledetails?.horoScope?.dhanuR?.split(' ').map((item, index) => (
                          <span className={item === 'ல' ? 'red-text' : ''} key={index}>
                            {item === ' ' ? '\u00A0' : item} {/* Handle spaces */}
                          </span>
                        ))}
                      </div>


                      <div className="col-3 horo-column">&nbsp;
                        {Profiledetails?.horoScope?.vrishikaR?.split(' ').map((item, index) => (
                          <span className={item === 'ல' ? 'red-text' : ''} key={index}>
                            {item === ' ' ? '\u00A0' : item} {/* Handle spaces */}
                          </span>
                        ))}
                      </div>


                      <div className="col-3 horo-column">&nbsp;
                        {Profiledetails?.horoScope?.tulaR?.split(' ').map((item, index) => (
                          <span className={item === 'ல' ? 'red-text' : ''} key={index}>
                            {item === ' ' ? '\u00A0' : item} {/* Handle spaces */}
                          </span>
                        ))}
                      </div>


                      <div className="col-3 horo-column">&nbsp;
                        {Profiledetails?.horoScope?.kanyaR?.split(' ').map((item, index) => (
                          <span className={item === 'ல' ? 'red-text' : ''} key={index}>
                            {item === ' ' ? '\u00A0' : item} {/* Handle spaces */}
                          </span>
                        ))}
                      </div>
                  </div>
                </div>
                ): (   
                <p><span style={{ fontWeight: 'bold', color: '#ff5722' }}>ராசி</span> not available.</p>
                )}
             
              
                 <br></br><br /><br />

               {Profiledetails?.horoScope && hasHoroScopeDataA(Profiledetails?.horoScope) ? (
                 <div className="row">
                    <div className="row">
                      <div className="col-3 horo-column">&nbsp;
                        {Profiledetails?.horoScope?.meenaA?.split(' ').map((item, index) => (
                          <span style={{ color: item === 'ல' ? 'red' : 'black' }} key={index}>
                            {item === ' ' ? '\u00A0' : item} {/* Handle spaces as well */}
                          </span>
                        ))}
                      </div>


                      <div className="col-3 horo-column">&nbsp;
                        {Profiledetails?.horoScope?.meshaA?.split(' ').map((item, index) => (
                          <span style={{ color: item === 'ல' ? 'red' : 'black' }} key={index}>
                            {item === ' ' ? '\u00A0' : item} {/* Handle spaces as well */}
                          </span>
                        ))}
                      </div>


                      <div className="col-3 horo-column">&nbsp;
                        {Profiledetails?.horoScope?.vrishbaA?.split(' ').map((item, index) => (
                          <span style={{ color: item === 'ல' ? 'red' : 'black' }} key={index}>
                            {item === ' ' ? '\u00A0' : item} {/* Handle spaces as well */}
                          </span>
                        ))}
                      </div>


                      <div className="col-3 horo-column">&nbsp;
                        {Profiledetails?.horoScope?.mithunaA?.split(' ').map((item, index) => (
                          <span style={{ color: item === 'ல' ? 'red' : 'black' }} key={index}>
                            {item === ' ' ? '\u00A0' : item} {/* Handle spaces as well */}
                          </span>
                        ))}
                      </div>
                    </div>


                    <div className="row">
                      <div className="col-3 horo-column">&nbsp;
                        {Profiledetails?.horoScope?.khumbhaA?.split(' ').map((item, index) => (
                          <span style={{ color: item === 'ல' ? 'red' : 'black' }} key={index}>
                            {item === ' ' ? '\u00A0' : item} {/* Handle spaces as well */}
                          </span>
                        ))}
                      </div>


                      <div className="col-6 text-center"><br /><h5><b>அம்சம்</b></h5></div>

                      <div className="col-3 horo-column">&nbsp;
                        {Profiledetails?.horoScope?.karkataA?.split(' ').map((item, index) => (
                          <span style={{ color: item === 'ல' ? 'red' : 'black' }} key={index}>
                            {item === ' ' ? '\u00A0' : item} {/* Handle spaces as well */}
                          </span>
                        ))}
                      </div>
                    </div>


                    <div className="row">
                      <div className="col-3 horo-column">&nbsp;
                        {Profiledetails?.horoScope?.makaraA?.split(' ').map((item, index) => (
                          <span style={{ color: item === 'ல' ? 'red' : 'black' }} key={index}>
                            {item === ' ' ? '\u00A0' : item} {/* Handle spaces as well */}
                          </span>
                        ))}
                      </div>


                      <div className="col-6"></div>
                      <div className="col-3 horo-column">&nbsp;
                        {Profiledetails?.horoScope?.simhaA?.split(' ').map((item, index) => (
                          <span style={{ color: item === 'ல' ? 'red' : 'black' }} key={index}>
                            {item === ' ' ? '\u00A0' : item} {/* Handle spaces as well */}
                          </span>
                        ))}
                      </div>
                    </div>


                    <div className="row">
                      <div className="col-3 horo-column">&nbsp;
                        {Profiledetails?.horoScope?.dhanuA?.split(' ').map((item, index) => (
                          <span style={{ color: item === 'ல' ? 'red' : 'black' }} key={index}>
                            {item === ' ' ? '\u00A0' : item} {/* Handle spaces as well */}
                          </span>
                        ))}
                      </div>


                      <div className="col-3 horo-column">&nbsp;
                        {Profiledetails?.horoScope?.vrishikaA?.split(' ').map((item, index) => (
                          <span style={{ color: item === 'ல' ? 'red' : 'black' }} key={index}>
                            {item === ' ' ? '\u00A0' : item} {/* Handle spaces as well */}
                          </span>
                        ))}
                      </div>


                      <div className="col-3 horo-column">&nbsp;
                        {Profiledetails?.horoScope?.tulaA?.split(' ').map((item, index) => (
                          <span style={{ color: item === 'ல' ? 'red' : 'black' }} key={index}>
                            {item === ' ' ? '\u00A0' : item} {/* Handle spaces as well */}
                          </span>
                        ))}
                      </div>


                      <div className="col-3 horo-column">&nbsp;
                        {Profiledetails?.horoScope?.kanyaA?.split(' ').map((item, index) => (
                          <span style={{ color: item === 'ல' ? 'red' : 'black' }} key={index}>
                            {item === ' ' ? '\u00A0' : item} {/* Handle spaces as well */}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                    <div className="row" >
                    <p> 
                      <span style={{ fontWeight: 'bold', color: '#ff5722' }}>அம்சம்</span> not available.</p>
                    </div>
                )}            
              </div> 
            </div>

  <div className="row">
  <button className="col-2 btn btn-success ms-2" type="submit" style={{width:150}} onClick={onAcceptClick} >Accept</button>
  <button className="col-1 btn btn-danger ms-3" style={{width:150}} type="" onClick={onRejectClick}>Reject</button>
</div>
    </>)
}