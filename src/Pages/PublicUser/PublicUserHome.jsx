import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { publicUserDetails, resetPublicUserDetails, PUBalanceQuota ,resetviewplanActive,resetBalanceQuota} from '../../Features/Slices/PublicUser/publicUserSlice';
// import sampleBroker from '../../img/1735228367286sampleBroker2.png'
// import contactUs from '../../img/broker_svg_contact.svg';
import { useNavigate, useSearchParams } from "react-router-dom";
// import { userBalanceQuota,reset} from '../../Features/Slices/planSlice';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/esm/Button";


export function PublicUserHome() {

   const [searchParams] = useSearchParams();
   const userId = searchParams.get('id');
   // const planId =searchParams.get('id')

   const dispatch = useDispatch()
   const navigate = useNavigate()

   const { publicuserDetails, isPublicUserDetailLoading, isPublicUserDetailSuccess, isPublicUserDetailError, publicuserId,
      balanceQuotaDetails, planCategory, expiryDate,userStatus,planId ,isBalanceQuotaLoading,isBalanceQuotaSuccess} = useSelector((state) => state.public)

   useEffect(() => {
      if (isPublicUserDetailLoading == false && isPublicUserDetailSuccess == false) {
         dispatch(publicUserDetails())
      }
    
      if(isBalanceQuotaLoading === false && isBalanceQuotaSuccess === false){
         dispatch(PUBalanceQuota({ profileId: userId }))
      }

      if( isBalanceQuotaSuccess === true){
         dispatch(resetBalanceQuota())
      }
      

   }, [publicuserDetails, isPublicUserDetailLoading, isPublicUserDetailSuccess,isBalanceQuotaLoading,isBalanceQuotaSuccess], dispatch)

   const [formData, setFormData] = useState({
      name: '',
      phoneNumber: '',
      email: '',
   });

   const { name, phoneNumber, email } = formData

   useEffect(() => {
      if (isPublicUserDetailSuccess == true && publicuserDetails) {
         setFormData({
            name: publicuserDetails.name || '',
            phoneNumber: publicuserDetails.phoneNumber || '',
            email: publicuserDetails.email || '',

         })
      }
   }, [publicuserDetails, isPublicUserDetailLoading, isPublicUserDetailSuccess], dispatch)

   // const PublicUserProfile = () => {
   //    navigate('/PublicUserProfile?id=' + publicuserId + "&name=VieProDetails", { replace: true })
   // }
   /**Set Date Format */
   const formatDate = (dateTime) => {

      const date = new Date(dateTime);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
      const day = String(date.getDate()).padStart(2, '0');
      return `${day}/${month}/${year}`; // Format as YYYY-MM-DD

   }

      const [show,setShow] = useState (false)
       
           const handleClose = () =>setShow (false);
       
           const handleShow =()=>{
               setShow(true)
           }
   
        const PublicUserProfile = () => {
   
         if(userStatus === "Pending"){
            setShow(true)
         }

         if(userStatus === "Deleted"){
           setShow(true)
         }
   
         else if (userStatus === "New"){
            setShow(false)
      navigate('/PublicUserProfile?id=' + publicuserId +"&name=PU-ProfileList", { replace: true })
      }
     }

   const onAddProfileClick = () => {
    navigate('/PURegisterProfile', { replace: true });
  }


     const Additional = () => {

       if(userStatus === "Pending"){
            setShow(true)
         }

         if(userStatus === "Deleted"){
           setShow(true)
         }

         else if (userStatus === "New"){
         setShow(false)
         navigate('/AdditionalPlan?id=' + publicuserId );
       }
  }

  const viewplan = () =>{

    if(userStatus === "Pending"){
        setShow(true)
     }

    if(userStatus === "Deleted"){
       setShow(true)
     }

     else if (userStatus === "New"){
       setShow(false)
      
       navigate('/ViewPlan?id='+ publicuserId + "&planId=" +planId)
       
     }
  
  }

   return (<>


      <div className="row">
         <div className="col-md-12" style={{ fontWeight: 'bold' }}>My Profile</div><br /><br />
         {/* {isPublicUserDetailLoading && <div>Loading...</div>} */}
         {isPublicUserDetailLoading && isPublicUserDetailError ? <div>Error while loading</div> : null}
         {/* <div className="card-container col-md-6 ">
            {isPublicUserDetailLoading && (
               <>
                  <div className="section-skeleton p-5">
                  </div>
               </>

            )} </div> */}
      </div>


      {!isPublicUserDetailLoading && (
         <>
            <div className="row">
               <div className="col-md-8">
                  <div className="row">
                     <div className="col-md-3">
                        <label className="col-md-4 col-form-label custom-label">Name</label>
                        <label className="form-control-plaintext custom-value" style={{ fontWeight: 'bold' }}>{name}</label>
                     </div>
                     <div className="col-md-3">
                        <label className="col-md-4 col-form-label custom-label ms-" style={{ whiteSpace: 'nowrap' }}>Phone Number</label>
                        <label style={{ fontWeight: 'bold' }} className="form-control-plaintext custom-value ms-">{phoneNumber} </label>
                     </div>
                     <div className="col-md-3">

                        <label className="col-md-4 col-form-label custom-label ms-">Email</label>
                        <label style={{ fontWeight: 'bold' }} className="form-control-plaintext custom-value ms-">{email}</label>
                     </div>

                     <div className="col-md-3">
                        <button className='btn btn-outline-success mt-2 w-100 w-md-auto ms-0 ms-md-5' onClick={PublicUserProfile} >View My Profile </button>
                     </div>

                  </div>


               </div>
                <div className="col-md-2">
                        <button className='btn btn-outline-success mt-2 w-100 w-md-auto ms-0 ms-md-5'  onClick={Additional}> Additional Plan </button>
                     </div>

                <div className="col-md-2">
                        <button className='btn btn-outline-success mt-2 w-100 w-md-auto ms-0 ms-md-5'  onClick={viewplan}> View Plan </button>
                     </div>

            </div>
         </>)}
         <br />
  
      <div className='row'>
       
         <div className='col-md-6 col-lg-4 ms-2'>
            {planCategory && balanceQuotaDetails?.length > 0 ? (

               <div className="col-12">
                  <h6 className='me-5'>User Plan</h6>
                  <div className="row p-2 pb-1 pt-2 rounded-2 plan border border-dark">

                     <div className="col-lg-6 text-success">
                        <h6 className="mb-2">Plan Cost :₹{planCategory.planCost}</h6>
                     </div>
                     {expiryDate && (
                        <div className="col-lg-6 col-md-12 text-success">
                           <span className="mb-0 text-danger">
                              Expiry Date: {formatDate(expiryDate)}
                           </span>
                        </div>
                     )}
                     {(planCategory.planName || planCategory.viewImageCountLimit) && (
                        <div className="col-6">
                           <h6 className="mb-0">Plan Name</h6>
                           <span>{planCategory.planName}</span>
                           <h6 className="mb-0 mt-2">View Image Limit</h6>
                           <span>{planCategory.viewImageCountLimit} Views everyday</span>
                        </div>
                     )}
                     {(planCategory.downloadCountLimit || planCategory.planDuration) && (
                        <div className="col-6">
                           <h6 className="mb-0">Duration</h6>
                           <span>{planCategory.planDuration} {planCategory.planPeriod}</span>

                           <h6 className="mb-0 mt-2">Download Limit</h6>
                           <span>{planCategory.downloadCountLimit} Downloads everyday</span>
                        </div>
                     )}
                  </div>
               </div>
            ) : (null)}
         </div>
      </div>
      <br />
      <div className='row'>
         <h6 className="col-md-8">Today's Quota</h6>
           {/* <div className="card-container col-12"> */}
              {/* {isPublicUserDetailLoading && (
                <>
                             <div className="card-skeleton ">
 
                                <div className="skeleton skeleton-title"></div>
                                <div className="skeleton skeleton-description"></div>
                                <div className="skeleton skeleton-description"></div>
                            </div>
                </>

              )}  */}
              {/* </div> */}
              {!isPublicUserDetailLoading && (
         <div className='col-md-6 col-lg-4 ms-2'>
            {balanceQuotaDetails?.length > 0 ? (
               balanceQuotaDetails.map((quota, index) => (
                  <div key={index} className="row p-2 pb-1 pt-2 rounded-2 plan border border-dark">
                     <div className="col-12">
                        <p className="mt-1">Today Balance Quota</p>
                     </div>
                     <div className="col-6">
                        <h6 className="mb-1">Total View Image Left</h6>
                        <span>{quota.viewImageCountLimit - quota.currentViewImageCount}</span>
                     </div>
                     <div className="col-6">
                        <h6 className="mb-0">Total Downloads Left</h6>
                        <span>{quota.downloadCountLimit - quota.currentDownloadCount}</span>
                     </div>
                     <div className="col-12 mt-2 mb-1">
                        <span className="text-muted">
                           Credit balance today. Limit renews every day.
                        </span>
                     </div>
                  </div>
               ))
            ) : (
               <div className="row rounded-2 plan text-danger">
                  <div className="col-3">
                     <p className="m-0 text-nowrap">
                        <strong>User has no active plans.</strong>
                     </p>
                  </div>
               </div>
            )}
         </div>
          )}
          
                    
      </div>


        <Modal show={show} onHide={handleClose} style={{ marginTop: '15%' }}>
                  <Modal.Header closeButton>
                    <h5>Welcome {name}!</h5>
                  </Modal.Header>
                  <form  onSubmit={onsubmit}>
                  <Modal.Body>
                    <div className="form-group">
                    <p>Update your profile to help brokers find the best matches for you!</p>
                    </div>
                   
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="outline-dark" onClick={handleClose}>
                     I will do it later
                    </Button>
                    <Button type="submit" variant="success" onClick={onAddProfileClick}>
                      Update Profile
                    </Button>
                  </Modal.Footer>
                  </form>
                </Modal>

   </>)
}