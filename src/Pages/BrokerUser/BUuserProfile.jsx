import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { brokerUserDetails, userBalanceQuota } from '../../Features/Slices/BrokerUser/BUProfileSlice';
// import sampleBroker from '../../img/1735228367286sampleBroker2.png'
// import contactUs from '../../img/broker_svg_contact.svg';
import { useSearchParams } from "react-router-dom";


export function UserHome() {

  const [searchParams] = useSearchParams();
  const userId = searchParams.get('id');


  const dispatch = useDispatch()


  const { isBrokerUserDetailLoading, isBrokerUserDetailSuccess, isBrokerUserDetailError, userDetails,
    isBalanceQuotaSuccess, isBalanceQuotaLoading, balanceQuotaDetails, planCatagory, expiryDate
  } =
    useSelector((state) => state.BUProf)

  useEffect(() => {
    dispatch(brokerUserDetails(userId))
    dispatch(userBalanceQuota({ profileId: userId }));
  }, [dispatch])

  const formatDate = (dateTime) => {

    const date = new Date(dateTime);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(date.getDate()).padStart(2, '0');
    return `${day}/${month}/${year}`; // Format as YYYY-MM-DD

  }

  return (<>
    <div className='container'>
      <div className="row">
        <div className="col-md-12" style={{ fontWeight: 'bold' }}>My Profile</div>
      </div>

      <div className="row mb-4"></div>

      <div className="row">

        {/* <div className="col-md-4"> */}
        {/* <img 
                src={} 
                alt="Descriptive Alt Text" 
                className="img-fluid rounded-circle"  // Use rounded-circle for circular shape
                style={{ width: '200px', height: '200px' }} // Set width and height to be the same for a circle
            /> */}
        {/* </div> */}
        <div className="col-md-8">
          <div className="row">
            <div className="col-md-4">
              <label className="col-md-4 col-form-label custom-label">Name</label>
              <label className="form-control-plaintext custom-value" style={{ fontWeight: 'bold' }}>{userDetails.name}</label>
            </div>
            <div className="col-md-4">
              <label className="col-md-4 col-form-label custom-label" style={{ whiteSpace: 'nowrap' }}>Phone Number</label>
              <label style={{ fontWeight: 'bold' }} className="form-control-plaintext custom-value">{userDetails.phoneNumber} </label>
            </div>
            <div className="col-md-4">

              <label className="col-md-4 col-form-label custom-label">Email</label>
              <label style={{ fontWeight: 'bold' }} className="form-control-plaintext custom-value">{userDetails.email}</label>
            </div>
          </div>
          <div className="row">

          </div>

          <div className='row'>
            <h6 className='me-5'>User Plan</h6>
            <div className='col-md-6 col-lg-6 ms-2'>
              {planCatagory && balanceQuotaDetails?.length > 0 ? (
                <div className="col-12">
                  <div className="row p-2 pb-1 pt-2 rounded-2 plan border border-dark">
                    <div className="col-lg-6 text-success">
                      <h6 className="mb-2">Plan Cost :₹{planCatagory.planCost}</h6>
                    </div>
                    {expiryDate && (
                      <div className="col-lg-6 col-md-12 text-success">
                        <span className="mb-0 text-danger">
                          Expiry Date: {formatDate(expiryDate)}
                        </span>
                      </div>
                    )}
                    {(planCatagory.planName || planCatagory.viewCountLimit) && (
                      <div className="col-6">
                        <h6 className="mb-0">Plan Name</h6>
                        <span>{planCatagory.planName}</span>
                        <h6 className="mb-0 mt-2">View Image Limit</h6>
                        <span>{planCatagory.viewImageCountLimit} Views everyday</span>
                      </div>
                    )}
                    {(planCatagory.downloadCountLimit || planCatagory.planDuration) && (
                      <div className="col-6">
                        <h6 className="mb-0">Duration</h6>
                        <span>{planCatagory.planDuration} {planCatagory.planPeriod}</span>

                        <h6 className="mb-0 mt-2">Download Limit</h6>
                        <span>{planCatagory.downloadCountLimit} Downloads everyday</span>
                      </div>
                    )}
                  </div>
                </div>
              ) : (null)}
            </div>
          </div>
          <div className='row'>
            <h6 className='mt-4'>Today's Quota</h6>
            <div className='col-md-6 col-lg-6 ms-2'>
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
                  <div className="col-12">
                    <p className="m-0 text-nowrap">
                      <strong>User has no active plans.</strong>
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>


  </>)
}