import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState, useRef } from 'react';
import maleavatar from '../../img/Male_avatar.svg'
import femaleavatar from '../../img/Female_avatar.svg'
import { Link, useNavigate } from "react-router-dom";
import {
  deleteUserLogin, getPlanByBroker, resetPlanByBroker, getUserDetailsById, createPlanSchedule, resetUserDetailsByid,
  resetcreatePlanSchedule, resetDeleteUserLogin,getProfileImageUrl
} from "../../Features/Slices/userProfileSlice"
import { balanceQuota, reset, resetBalanceQuota } from '../../Features/Slices/planSlice';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from "react-toastify"
import { useSearchParams } from 'react-router-dom';

export function UserDetails() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [SearchParams] = useSearchParams();
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const userId = SearchParams.get('id')
  const brokerId = SearchParams.get('id')
  const backScreenName = SearchParams.get('name')
  const profileid = SearchParams.get('id')
  const pageIndex = SearchParams.get('pageIndex')
  const pageStartIndex = SearchParams.get('pageStartIndex')

  const { isGetPlanByBrokerLoading, isGetPlanByBrokerSuccess, isGetPlanByBrokerError, userPlanList,
    isGetUserByIdLoading, isGetUserByIdSuccess, userDetail, balanceAmount, userDetailImage,
    isDeleteUserSuccess, isDeleteUserLoading, isDeleteUserMessage, isDeleteUserError,
    isCreatePlanSheduleSuccess, isCreatePlanSheduleLoading, isCreatePlanSheduleMessage,
    isCreatePlanSheduleError } = useSelector((state) => state.userPro)

  useEffect(() => {
    if (isCreatePlanSheduleSuccess) {
      toast.success(isCreatePlanSheduleMessage)
      dispatch(balanceQuota({ profileId: userId }));
      dispatch(resetcreatePlanSchedule())
      dispatch(resetUserDetailsByid(userId))

    }
    if (isCreatePlanSheduleError) {
      toast.error(isCreatePlanSheduleMessage)
      dispatch(resetcreatePlanSchedule())
      dispatch(resetUserDetailsByid())
      dispatch(resetPlanByBroker())

    }
    if (!isGetPlanByBrokerLoading && !isGetPlanByBrokerSuccess) {
      dispatch(getPlanByBroker())
    }
    if (isGetUserByIdLoading == false && isGetUserByIdSuccess == false) {
      dispatch(getUserDetailsById(userId))
      dispatch(resetUserDetailsByid())
    }

    if (isDeleteUserSuccess == true && isDeleteUserMessage) {
      toast.success(isDeleteUserMessage)
      dispatch(resetDeleteUserLogin())
      if (backScreenName == "brokerProfile") {
        navigate('/BrokerProfile?id=' + profileid + "&brId=" + null + "&name=profileList&pageIndex=" + pageIndex + '&pageStartIndex=' +pageStartIndex, { replace: false })
      }
      else if (backScreenName == "brokerUser") {
        navigate('/BrokerUser', { replace: true })
      }
    }
    if (isDeleteUserSuccess == false && isDeleteUserMessage) {
      toast.error(isDeleteUserMessage)
      dispatch(resetDeleteUserLogin())
    }
  }, [isGetPlanByBrokerLoading, isGetPlanByBrokerSuccess, isGetPlanByBrokerError, userPlanList,
    isGetUserByIdLoading, isGetUserByIdSuccess, balanceAmount, userDetailImage,
    userDetail, isDeleteUserSuccess, isDeleteUserMessage, isDeleteUserError,
    isCreatePlanSheduleSuccess, isCreatePlanSheduleMessage, isCreatePlanSheduleError], dispatch)

  const [show, setShow] = useState(false)
  const [deleteName, setDeleteName] = useState({
  })

  const handleClose = () => setShow(false)
  const handleShow = (name) => {
    setShow(true)
    setDeleteName(name)
  }

  const onDelete = (e) => {
    setDeleteName(e.target.value)
  }

  const deleteUser = (e) => {
    e.preventDefault()

    if (name == deleteName) {
      const userDetail = { profileId: userId, deleteName }
      dispatch(deleteUserLogin(userDetail))
      console.log(userDetail)
    }
    else {
      toast.error("The name you entered doesn't match. Please try again.")
    }
  }

  //Create Plan Shedule


  //*---- Select Plans By Broker Start----*//
  const [formData, setFormData] = useState({
    profileID: '',
    planName: '',
    planID: '',
    planPeriod: '',
    planDuration: '',
    viewCountLimit: '',
    downloadCountLimit: '',
    viewImageCountLimit: ''
  })

  const { profileID, planID, planPeriod, planDuration, viewCountLimit, downloadCountLimit, viewImageCountLimit } = formData

  const onchange = (e) => {
    const selectedId = e.target.value;
    const plan = userPlanList.find(plan => plan._id === selectedId);
    if (plan && userDetail.length > 0) {
      setFormData({
        profileID: userId,
        planName: plan.planName,
        planID: plan._id,
        planPeriod: plan.planPeriod,
        planDuration: plan.planDuration,
        viewCountLimit: plan.viewCountLimit,
        downloadCountLimit: plan.downloadCountLimit,
        planCost: plan.planCost,
        viewPerNoOfdays: plan.viewPerNoOfdays,
        viewImageCountLimit: plan.viewImageCountLimit

      });
    }
    else {
      setFormData('')
    }
  }

  const planShedule = (e) => {
    e.preventDefault()

    if (!formData.planID) {
      toast.error("Please select a plan first.");
      return;
    }
    const planData = { profileID, planID, planPeriod, planDuration, viewCountLimit, downloadCountLimit, viewImageCountLimit }
    dispatch(createPlanSchedule(planData));
    setIsFormSubmitted(true);

    if (onHandleShow.current) {
      onHandleClose.current.hide();
    }
  }
  //*---- Select Plans By Broker End----*//

  const backuButtonUrl = () => {
    dispatch(resetUserDetailsByid())
    if (backScreenName == "brokerUser") {
      navigate('/BrokerUser'+'?pageIndex='+pageIndex + "&pageStartIndex="+pageStartIndex,);
    }
    else if (backScreenName == "brokerProfile") {
      navigate('/BrokerProfile?id=' + userId + '&brId=' + null + "&name=profileList&pageIndex=" + pageIndex + '&pageStartIndex=' + pageStartIndex, {replace: false});
    }
  }

  //**Get Balance Quota **//
  const { isBalanceQuotaLoading,
    isBalanceQuotaSuccess,
    isBalanceQuotaError,
    balanceQuotaDetails,
    expiryDate,
    planCatagory } = useSelector((state) => state.plan)

  useEffect(() => {
    if (!isBalanceQuotaLoading && !isBalanceQuotaSuccess) {
      dispatch(balanceQuota({ profileId: userId }));
      dispatch(reset())
    }
  }, [], dispatch);


  const formatDate = (dateTime) => {

    const date = new Date(dateTime);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(date.getDate()).padStart(2, '0');
    return `${day}/${month}/${year}`; // Format as YYYY-MM-DD
  }

  const [isshow, issetShow] = useState(false);
  const onHandleShow = useRef(true);
  const onHandleClose = useRef(null);

  const handleToggle = () => {
    if (!onHandleClose.current) {
      onHandleClose.current = new window.bootstrap.Offcanvas(onHandleShow.current);
    }
    if (isshow) {
      onHandleClose.current.hide();
    } else {
      onHandleClose.current.show();
    }
  };

  const onCancel = () => {
    if (onHandleShow.current) {
      onHandleClose.current.hide();
    }
    setFormData('')
  }

  const [formDat, setFormDat] = useState({
    name: '',
    phoneNumber: '',
    email: '',

  });

  const { name, phoneNumber, email, profileId, sex } = formDat
  console.log(formDat)
  useEffect(() => {
    if (isGetUserByIdSuccess == true && userDetail.length > 0) {
      const user = userDetail[0]
      setFormDat({
        name: user.name || '',
        phoneNumber: user.phoneNumber || '',
        email: user.email || '',
        profileId: user.profileID,
        sex: user.sex || '',

      })
    }
  }, [isGetUserByIdSuccess, isGetUserByIdLoading, userDetail], dispatch)

    useEffect(() => {
      dispatch(getProfileImageUrl({  profileId :profileid}));
    }, [ profileId]);

    const {brokerUserImage } = useSelector((state) => state.userPro)

  return (
    <>

      <div className="dropdown-item d-flex align-items-center">
        <svg onClick={backuButtonUrl} style={{ cursor: 'pointer' }} xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#1aa179" className="bi bi-arrow-left-circle" viewBox="0 0 16 16">
          <path fillRule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z" />
        </svg>
        <p className="h6 mb-0 ms-2" onClick={backuButtonUrl} style={{ cursor: 'pointer' }}>Go Back</p>
      </div>

      <h5 className="mt-4">User Details</h5>

      <div className="container">
        <div className="row row-cols-1 row-cols-lg-1 g-2 gx-lg-5">
          <div>
            <div className="row">
          <div className="col-4 mt-3">
  <div style={{ width: 180 }}>
    {sex === 'Male' ? (
      <img
        className="centered-image"
        src={brokerUserImage || maleavatar}
        onError={(e) => { e.target.onerror = null; e.target.src = maleavatar; }}
        alt="Profile"
      />
    ) : sex === 'Female' ? (
      <img
        className="centered-image"
        src={brokerUserImage || femaleavatar}
        onError={(e) => { e.target.onerror = null; e.target.src = femaleavatar; }}
        alt="Profile"
      />
    ) : (
      <p>Gender not specified.</p>
    )}
  </div>
</div>
              <h5 className="mt-5 ">Basic Details</h5>

              <div className='row row-cols-1 row-cols-lg-4'><br /><br />
                <div>
                  <label htmlFor="">Name</label>
                  <h6 >{name}</h6>
                </div>
                <div>
                  <label htmlFor="">Phone Number</label>
                  <h6>{phoneNumber}</h6>
                </div>
                <div>
                  <label htmlFor="">Email</label>
                  <h6>{email}</h6>
                </div>
                <div>
                  <label htmlFor="">Profile ID</label>
                  <h6>{sex === 'Male' ? (
                    `UM${profileId}`
                  ) : sex === 'Female' ? (
                    `UF${profileId}`
                  ) : (
                    <p>Gender not specified.</p>
                  )}</h6>

                  {/* <h6>{profileId}</h6> */}
                </div>
              </div>


              <h5 className="mt-5">Login Details </h5>
              <div className="row row-cols-1 gy-2">
                <div>
                  <label>Login User Name :   <strong className='text-success'>{email}</strong></label>
                </div>
              </div></div>
          </div>



          {/* Active User Plan */}
          <div >
            <div className='row'>
              <h5 className='mt-4'>User Plan</h5>
              <div className='col-md-4 col-lg-4 ms-2'>
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
                      {(planCatagory.planName || planCatagory.viewImageCountLimit) && (
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
              <h5 className='mt-4'>Today's Quota</h5>
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


          <br /><br />
          <div className="col-12 mt-4">
            <button className="btn btn-danger" name="name" id="name" type="submit" onClick={() => handleShow(userId)}>Delete login</button>
            <button className="btn btn-outline-success mx-4" onClick={handleToggle}> Activate User</button>
          </div>

        </div>
      </div>

      <div className="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel" ref={onHandleShow}>
        <div className="offcanvas-header mt-3">
          <h5 className="offcanvas-title" id="offcanvasRightLabel">Renew Plan</h5>
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <hr />
        {/* <form> */}
        <div className="offcanvas-body">
          <span className="text-success"><b>Remaining Balance: </b> </span>
          <p>₹{typeof balanceAmount === 'object' ? balanceAmount?.balanceAmount ?? 'N/A' : balanceAmount}</p>
          <br />

          <label className='form-label'>Plan</label>
          <select name="planID" id="planID" className='form-control' onChange={onchange}>
            <option value="">Select</option>
            {userPlanList.map((userPlan, index) => (
              <option key={index} value={userPlan._id}>{userPlan.brokerName} {userPlan.planName}</option>
            ))}
          </select>

          {formData.planID && (
            <div className="container mt-4">
              <div className="row">
                <div className=''>
                  <div className="row p-2 rounded-2 plan border border-dark">
                    <div className="col-9">
                      <strong>Plan: {formData.planName}</strong>
                    </div><br />

                    <div className="col-6">
                      <h6 className="mb-0">Plan Cost</h6>
                      <span>₹{formData.planCost}</span>

                      <h6 className="mb-0 mt-3">View Limit</h6>
                      <span name='viewCountLimit' id='viewCountLimit'>{formData.viewCountLimit} views everyday</span>
                    </div>

                    <div className="col-6">
                      <h6 className="mb-0">Duration</h6>
                      <span name="planPeriod" id="planPeriod"><p name="planDuration" id="planDuration">{formData.planDuration} {formData.planPeriod} </p> </span>

                      <h6 className="mb-0 mt-3">Download Limit</h6>
                      <span name="downloadCountLimit" id="downloadCountLimit">{formData.downloadCountLimit} downloads everyday</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className='mt-5'>
            <button className='btn btn-dark' onClick={onCancel}>Cancel</button>
            <button className='btn btn-success ms-3' onClick={planShedule}>Create</button>
          </div>
        </div>
        {/* </form> */}
      </div>
      {(isGetUserByIdLoading || isDeleteUserLoading || isCreatePlanSheduleLoading) && (
        <div className="overlay">
          <div className="loading-spinner"></div>
        </div>
      )}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete User</Modal.Title>
        </Modal.Header>
        <form onSubmit={deleteUser}>
          <Modal.Body>
            <div className="form-group">
              <h6>Delete</h6>

              <p>
                This will permanently delete the User{' '}
                <strong style={{ color: 'red' }}>"{name}"</strong>. Please re-enter the
                User name to confirm.
              </p>

              <input className="form-control" name="deleteName" id="deleteName" type="text" onChange={onDelete} />
            </div>

          </Modal.Body>
          <Modal.Footer>
            <Button className="btn btn-dark" onClick={handleClose}>Close</Button>
            <Button type="submit" className="btn btn-danger" onClick={handleClose}>Delete</Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  )
}



