import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { getBrokProfById ,resetgetBrokProfById, getBrokerProfileImageUrl, GetBrokerDetails} from "../../Features/Slices/brokSlice";
import{adminGetBrokerByID} from "../../Features/Slices/adminBrokerSlice"
import { toast } from "react-toastify";
import maleavatar from '../../img/Male_avatar.svg'
import { getProfileImageUrl, resetGetProfileImageUrl } from "../../Features/Slices/profSlice";
import { Carousal } from "../Common/Carousal"

export function BrokViewProfDetails(){
  const [searchParams] = useSearchParams()
  const brokerId = searchParams.get('brId')
  const brokerID = searchParams.get('brId')
  const profileId = searchParams.get('id')
  const [currentImageUrl, setCurrentImageUrl] = useState('')
  const pageIndex = searchParams.get('pageIndex')
  const pageStartIndex = searchParams.get('pageStartIndex')
 
  // let brokerID = brokerId

  const dispatch = useDispatch();
  const navigate = useNavigate();


const { isgetBrokProfByIdLoading, isgetBrokProfByIdSuccess, ProfileDetail, isgetBrokerProfileImageUrlLoading,
  isgetBrokerProfileImageUrlSuccess,  ImageUrl, isGetBrokerDetailsSuccess, isGetBrokerDetailsLoading, BrokerDetails} = useSelector((state)=>state.brok)
// const {Images}= useSelector((state)=>state.prof)

  useEffect(() => {
    if (isgetBrokProfByIdLoading == false && isgetBrokProfByIdSuccess == false) {
      dispatch(getBrokProfById({profileID:profileId}))
    }
    if(isGetBrokerDetailsLoading == false && isGetBrokerDetailsSuccess == false){
      dispatch(GetBrokerDetails({brokerID:brokerID}))
    }

  }, [ProfileDetail,dispatch])

  useEffect(() => {
      dispatch(getBrokerProfileImageUrl({ brokerId, profileId }));
    }, [brokerId, profileId])

  // useEffect(() => {
  //   dispatch(getProfileImageUrl({ brokerId, profileId }));
  // }, [brokerId, profileId]);

    const handleImageChange = (imageUrl) => {
  setCurrentImageUrl(imageUrl);
  };

  const GoBack = () => {
    dispatch(resetgetBrokProfById())
    dispatch(resetGetProfileImageUrl())
    navigate('/BrokerProfileList?id='+brokerID +"&pageStartIndex="+pageStartIndex +"&pageIndex="+pageIndex)
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
 const formatDate = (dateTime) => {

    const date = new Date(dateTime);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(date.getDate()).padStart(2, '0');
    return `${day}/${month}/${year}`; // Format as YYYY-MM-DD

  }

  return (<>

    <div onClick={GoBack} >
      <Link className="dropdown-item d-flex align-items-center"  >
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#1aa179" className="bi bi-arrow-left-circle" viewBox="0 0 16 16">
          <path fillRule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z" />
        </svg><p className="mb-0 ms-2" >Go Back</p></Link></div>
    <br />
    <p className="h3">Profile Details</p><br />
    <div className="row">

              

  <div className="col-md-8">

  <div className="card-container">
              {isgetBrokProfByIdLoading && (
                <>
                  <div className="section-skeleton">
                    <div className="skeleton skeleton-Detail-section1"></div>
                  </div>
                </>

              )} </div>

{!isgetBrokProfByIdLoading && (
  <>

    <div className="row">
      <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Name</label>
      <div className="col-8">
        <label className="form-control-plaintext">: {ProfileDetail?.name}</label>
      </div>
    </div>

                <div className="row">
                  <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Profile ID</label>
                  <div className="col-8">
                    <label className="form-control-plaintext">:
                      {ProfileDetail?.sex === 'Male' ? (
                        ` UM${ProfileDetail?.profileID}`
                      ) : ProfileDetail?.sex === 'Female' ? (
                        ` UF${ProfileDetail?.profileID}`
                      ) : (

                        <p>null</p>
                      )}
                      {/* {profile?.profileDetails?.profileID} */}
                    </label>
                  </div>
                </div>

    <div className="row">
      <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Gender</label>
      <div className="col-8">
        <label className="form-control-plaintext">: {ProfileDetail?.sex}</label>
      </div>
    </div>

    <div className="row">
      <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Marital Status</label>
      <div className="col-8">
        <label className="form-control-plaintext">: {ProfileDetail?.maritalstatus}</label>
      </div>
    </div>

    <div className="row">
      <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Date of Birth</label>
      <div className="col-8">
        <label className="form-control-plaintext">: {formatDate(ProfileDetail?.DOB)}</label>
      </div>
    </div>

    {/* <div className="row">
      <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Father Name</label>
      <div className="col-8">
        <label className="form-control-plaintext">: {ProfileDetail?.fatherName}</label>
      </div>
    </div>

    <div className="row">
      <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Mother Name</label>
      <div className="col-8">
        <label className="form-control-plaintext">: {ProfileDetail?.motherName}</label>
      </div>
    </div> */}

    <div className="row">
      <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Mother tongue</label>
      <div className="col-8">
        <label className="form-control-plaintext">: {ProfileDetail?.mothertongue}</label>
      </div>
    </div>

    <div className="row">
      <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Religion</label>
      <div className="col-8">
        <label className="form-control-plaintext">: {ProfileDetail?.religion}</label>
      </div>
    </div>

    <div className="row">
      <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Caste</label>
      <div className="col-8">
        <label className="form-control-plaintext">: {ProfileDetail?.caste}</label>
      </div>
    </div>

    <div className="row">
      <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Qualification</label>
      <div className="col-8">
        <label className="form-control-plaintext">: {ProfileDetail?.qualification}</label>
      </div>
    </div>

    <div className="row">
      <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Job Title</label>
      <div className="col-8">
        <label className="form-control-plaintext">: {ProfileDetail?.job}</label>
      </div>
    </div>

    <div className="row">
      <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Job Description</label>
      <div className="col-8">
        <label className="form-control-plaintext">: {ProfileDetail?.jobDescription}</label>
      </div>
    </div>

    <div className="row">
      <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">District</label>
      <div className="col-8">
        <label className="form-control-plaintext">: {ProfileDetail?.district}</label>
      </div>
    </div>

    <div className="row">
      <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">State</label>
      <div className="col-8">
        <label className="form-control-plaintext">: {ProfileDetail?.state}</label>
      </div>
    </div> 

    </>)}        
    </div>



    
    <div className="col-md-4 mt-3">

        <div className="card-container">
              {isgetBrokerProfileImageUrlLoading && (
                <>
                  <div className="section-skeleton">
                    <div className="skeleton skeleton-Detail-section1"></div>
                  </div>
                </>

              )} </div>

              {!isgetBrokerProfileImageUrlLoading && (
                <>
                     <div> 
                    {isgetBrokerProfileImageUrlSuccess && !isgetBrokerProfileImageUrlLoading && (
                      ImageUrl && ImageUrl.length > 0 ? (
                        <div>
                          <Carousal imageUrls={ImageUrl} onImageChange={handleImageChange} 
                           style={{ width: '100%', height: '100%', objectFit: 'cover' }}/>
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
                </>
              )}
       {/* <div className="col-md-5 p-3" style={{height:550}}> */}
  
    </div> 


  </div>



<p className="mt-3"><h2>Horoscope</h2></p>
 <div className="card-container">
              {isgetBrokProfByIdLoading && (
                <>
                  <div className="section-skeleton">
                    <div className="skeleton skeleton-Detail-section1"></div>
                  </div>
                </>

              )} </div>
     <div className="row row-cols-1 row-cols-md-3">

       

              {!isgetBrokProfByIdLoading && (<>
                <div className="col">
    <div className="row">
                  <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Dhosam</label>
                  <div className="col-8">
                    <label className="form-control-plaintext">: {ProfileDetail?.dhosam}</label>
                  </div>
                </div>

                <div className="row">
                  <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">திசைஇருப்பு</label>
                  <div className="col-8">
                    <label className="form-control-plaintext">: {ProfileDetail?.horoScope?.dhasa}</label>
                  </div>
                </div>

                <div className="row">
                  <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">வருடம்</label>
                  <div className="col-8">
                    <label className="form-control-plaintext">: {ProfileDetail?.horoScope?.year}</label>
                  </div>
                </div>

                <div className="row">
                  <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">மாதம்</label>
                  <div className="col-8">
                    <label className="form-control-plaintext">: {ProfileDetail?.horoScope?.month}</label>
                  </div>
                </div>

                <div className="row">
                  <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">நாள்</label>
                  <div className="col-8">
                    <label className="form-control-plaintext">: {ProfileDetail?.horoScope?.day}</label>
                  </div>
                </div>
    </div>
    <div className="col ">
            <div className="row-md">
              <div className="col-12 md-1">
                {ProfileDetail?.horoScope && hasHoroScopeDataR(ProfileDetail.horoScope) ? (
                  <div className="row">
                    <div className="row">
                      <div className="col-3 horo-column" style={{ fontSize: 12 }}>&nbsp;
                        {ProfileDetail?.horoScope?.meenaR?.split(' ').map((item, index) => (
                          <span className={item === 'ல' ? 'red-text' : ''} key={index}>
                            {item === ' ' ? '\u00A0' : item} {/* Handle spaces */}
                          </span>
                        ))}
                      </div>

                      <div className="col-3 horo-column" style={{ fontSize: 12 }}>&nbsp;
                        {ProfileDetail?.horoScope?.meshaR?.split(' ').map((item, index) => (
                          <span className={item === 'ல' ? 'red-text' : ''} key={index}>
                            {item === ' ' ? '\u00A0' : item} {/* Handle spaces */}
                          </span>
                        ))}
                      </div>

                      <div className="col-3 horo-column" style={{ fontSize: 12 }}>&nbsp;
                        {ProfileDetail?.horoScope?.vrishbaR?.split(' ').map((item, index) => (
                          <span className={item === 'ல' ? 'red-text' : ''} key={index}>
                            {item === ' ' ? '\u00A0' : item} {/* Handle spaces */}
                          </span>
                        ))}
                      </div>

                      <div className="col-3 horo-column" style={{ fontSize: 12 }}>&nbsp;
                        {ProfileDetail?.horoScope?.mithunaR?.split(' ').map((item, index) => (
                          <span className={item === 'ல' ? 'red-text' : ''} key={index}>
                            {item === ' ' ? '\u00A0' : item} {/* Handle spaces */}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-3 horo-column" style={{ fontSize: 12 }}>&nbsp;
                        {ProfileDetail?.horoScope?.khumbhaR?.split(' ').map((item, index) => (
                          <span className={item === 'ல' ? 'red-text' : ''} key={index}>
                            {item === ' ' ? '\u00A0' : item} {/* Handle spaces */}
                          </span>
                        ))}
                      </div>

                      <div className="col-6 text-center" ><br /><h5><b>ராசி</b></h5></div>
                      <div className="col-3 horo-column">&nbsp;
                        {ProfileDetail?.horoScope?.karkataR?.split(' ').map((item, index) => (
                          <span className={item === 'ல' ? 'red-text' : ''} key={index}>
                            {item === ' ' ? '\u00A0' : item} {/* Handle spaces */}
                          </span>
                        ))}
                      </div>
                    </div>


                    <div className="row">
                      <div className="col-3 horo-column" style={{ fontSize: 12 }}>&nbsp;
                        {ProfileDetail?.horoScope?.makaraR?.split(' ').map((item, index) => (
                          <span className={item === 'ல' ? 'red-text' : ''} key={index}>
                            {item === ' ' ? '\u00A0' : item} {/* Handle spaces */}
                          </span>
                        ))}
                      </div>


                      <div className="col-6"></div>
                      <div className="col-3 horo-column" style={{ fontSize: 12 }}>&nbsp;
                        {ProfileDetail?.horoScope?.simhaR?.split(' ').map((item, index) => (
                          <span className={item === 'ல' ? 'red-text' : ''} key={index}>
                            {item === ' ' ? '\u00A0' : item} {/* Handle spaces */}
                          </span>
                        ))}
                      </div>
                    </div>


                    <div className="row">
                      <div className="col-3 horo-column" style={{ fontSize: 12 }}>&nbsp;
                        {ProfileDetail?.horoScope?.dhanuR?.split(' ').map((item, index) => (
                          <span className={item === 'ல' ? 'red-text' : ''} key={index}>
                            {item === ' ' ? '\u00A0' : item} {/* Handle spaces */}
                          </span>
                        ))}
                      </div>


                      <div className="col-3 horo-column" style={{ fontSize: 12 }}>&nbsp;
                        {ProfileDetail?.horoScope?.vrishikaR?.split(' ').map((item, index) => (
                          <span className={item === 'ல' ? 'red-text' : ''} key={index}>
                            {item === ' ' ? '\u00A0' : item} {/* Handle spaces */}
                          </span>
                        ))}
                      </div>


                      <div className="col-3 horo-column" style={{ fontSize: 12 }}>&nbsp;
                        {ProfileDetail?.horoScope?.tulaR?.split(' ').map((item, index) => (
                          <span className={item === 'ல' ? 'red-text' : ''} key={index}>
                            {item === ' ' ? '\u00A0' : item} {/* Handle spaces */}
                          </span>
                        ))}
                      </div>


                      <div className="col-3 horo-column" style={{ fontSize: 12 }}>&nbsp;
                        {ProfileDetail?.horoScope?.kanyaR?.split(' ').map((item, index) => (
                          <span className={item === 'ல' ? 'red-text' : ''} key={index}>
                            {item === ' ' ? '\u00A0' : item} {/* Handle spaces */}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                ) : (
                  // Display this message if no horoscope data is found or all values are empty
                  <div className="row" >
                      
                  </div>
                  
                )}
                 </div>

                <br />


              </div>
    </div>
    <div className="col" >
                <div className="row-md">
              <div className="col-12 md-1">
                {ProfileDetail?.horoScope && hasHoroScopeDataA(ProfileDetail?.horoScope) ? (

                  <div className="row">
                    <div className="row">
                      <div className="col-3 horo-column"style={{ fontSize: 12 }}>&nbsp;
                        {ProfileDetail?.horoScope?.meenaA?.split(' ').map((item, index) => (
                          <span style={{ color: item === 'ல' ? 'red' : 'black' }} key={index}>
                            {item === ' ' ? '\u00A0' : item} {/* Handle spaces as well */}
                          </span>
                        ))}
                      </div>


                      <div className="col-3 horo-column"style={{ fontSize: 12 }}>&nbsp;
                        {ProfileDetail?.horoScope?.meshaA?.split(' ').map((item, index) => (
                          <span style={{ color: item === 'ல' ? 'red' : 'black' }} key={index}>
                            {item === ' ' ? '\u00A0' : item} {/* Handle spaces as well */}
                          </span>
                        ))}
                      </div>


                      <div className="col-3 horo-column"style={{ fontSize: 12 }}>&nbsp;
                        {ProfileDetail?.horoScope?.vrishbaA?.split(' ').map((item, index) => (
                          <span style={{ color: item === 'ல' ? 'red' : 'black' }} key={index}>
                            {item === ' ' ? '\u00A0' : item} {/* Handle spaces as well */}
                          </span>
                        ))}
                      </div>


                      <div className="col-3 horo-column"style={{ fontSize: 12 }}>&nbsp;
                        {ProfileDetail?.horoScope?.mithunaA?.split(' ').map((item, index) => (
                          <span style={{ color: item === 'ல' ? 'red' : 'black' }} key={index}>
                            {item === ' ' ? '\u00A0' : item} {/* Handle spaces as well */}
                          </span>
                        ))}
                      </div>
                    </div>


                    <div className="row">
                      <div className="col-3 horo-column"style={{ fontSize: 12 }}>&nbsp;
                        {ProfileDetail?.horoScope?.khumbhaA?.split(' ').map((item, index) => (
                          <span style={{ color: item === 'ல' ? 'red' : 'black' }} key={index}>
                            {item === ' ' ? '\u00A0' : item} {/* Handle spaces as well */}
                          </span>
                        ))}
                      </div>


                      <div className="col-6 text-center"><br /><h5><b>அம்சம்</b></h5></div>

                      <div className="col-3 horo-column"style={{ fontSize: 12 }}>&nbsp;
                        {ProfileDetail?.horoScope?.karkataA?.split(' ').map((item, index) => (
                          <span style={{ color: item === 'ல' ? 'red' : 'black' }} key={index}>
                            {item === ' ' ? '\u00A0' : item} {/* Handle spaces as well */}
                          </span>
                        ))}
                      </div>
                    </div>


                    <div className="row">
                      <div className="col-3 horo-column"style={{ fontSize: 12 }}>&nbsp;
                        {ProfileDetail?.horoScope?.makaraA?.split(' ').map((item, index) => (
                          <span style={{ color: item === 'ல' ? 'red' : 'black' }} key={index}>
                            {item === ' ' ? '\u00A0' : item} {/* Handle spaces as well */}
                          </span>
                        ))}
                      </div>


                      <div className="col-6"></div>
                      <div className="col-3 horo-column"style={{ fontSize: 12 }}>&nbsp;
                        {ProfileDetail?.horoScope?.simhaA?.split(' ').map((item, index) => (
                          <span style={{ color: item === 'ல' ? 'red' : 'black' }} key={index}>
                            {item === ' ' ? '\u00A0' : item} {/* Handle spaces as well */}
                          </span>
                        ))}
                      </div>
                    </div>


                    <div className="row">
                      <div className="col-3 horo-column"style={{ fontSize: 12 }}>&nbsp;
                        {ProfileDetail?.horoScope?.dhanuA?.split(' ').map((item, index) => (
                          <span style={{ color: item === 'ல' ? 'red' : 'black' }} key={index}>
                            {item === ' ' ? '\u00A0' : item} {/* Handle spaces as well */}
                          </span>
                        ))}
                      </div>


                      <div className="col-3 horo-column"style={{ fontSize: 12 }}>&nbsp;
                        {ProfileDetail?.horoScope?.vrishikaA?.split(' ').map((item, index) => (
                          <span style={{ color: item === 'ல' ? 'red' : 'black' }} key={index}>
                            {item === ' ' ? '\u00A0' : item} {/* Handle spaces as well */}
                          </span>
                        ))}
                      </div>


                      <div className="col-3 horo-column"style={{ fontSize: 12 }}>&nbsp;
                        {ProfileDetail?.tulaA?.split(' ').map((item, index) => (
                          <span style={{ color: item === 'ல' ? 'red' : 'black' }} key={index}>
                            {item === ' ' ? '\u00A0' : item} {/* Handle spaces as well */}
                          </span>
                        ))}
                      </div>


                      <div className="col-3 horo-column"style={{ fontSize: 12 }}>&nbsp;
                        {ProfileDetail?.horoScope?.kanyaA?.split(' ').map((item, index) => (
                          <span style={{ color: item === 'ல' ? 'red' : 'black' }} key={index}>
                            {item === ' ' ? '\u00A0' : item} {/* Handle spaces as well */}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                ) : (
                  // Display this message if no horoscope data is found or all values are empty
                  <div className="row">
                  </div>
                )}
 </div>
    </div>
        </div>   
              </>)}

    
</div> 

<div className="col-md-4 mt-3">
      <h2>Broker Details</h2>

       <div className="card-container">
              {isGetBrokerDetailsLoading && (
                <>
                  <div className="section-skeleton">
                    <div className="skeleton skeleton-Detail-section1"></div>
                  </div>
                </>

              )} </div>

              {!isGetBrokerDetailsLoading && (<>
              <div className="row">
      <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Broker name</label>
      <div className="col-8">
        <label className="form-control-plaintext">: {BrokerDetails?.name}</label>
      </div>
    </div>

        <div className="row">
      <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Matrimony Name</label>
      <div className="col-8">
        <label className="form-control-plaintext">: {BrokerDetails?.matrimonyName}</label>
      </div>
    </div>

        <div className="row">
      <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Phone Number</label>
      <div className="col-8">
        <label className="form-control-plaintext">: {BrokerDetails?.phoneNumber}</label>
      </div>
    </div>

        <div className="row">
      <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">District</label>
      <div className="col-8">
        <label className="form-control-plaintext">: {BrokerDetails?.district}</label>
      </div>
    </div>
              </>)}
  


      </div>
    
      

      

  </>)
}