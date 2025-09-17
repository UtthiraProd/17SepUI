import { getBrokerDetailById } from "../../Features/Slices/brokSlice"
import { adminGetBrokerByID, adminDeleteBroker, resetadminDeleteBroker, getBrokerPlan, resetgetBrokerPlan,
   topUpPlanBroker, resetTopUpPlanBroker,getBrokImageUrl,BrokertoPublic } from "../../Features/Slices/adminBrokerSlice"
import { fetchBrokers } from "../../Features/Slices/brokSlice"
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { useState } from "react"
import maleavatar from '../../img/Male_avatar.svg'
import "../../scss/broker.css"
import { Link, useNavigate, useSearchParams } from "react-router-dom"
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { toast } from "react-toastify"
import { startRazorpayPayment, verifyRazorpayPayment } from '../../Utils/razorpay';
// import { topUpPlanBroker,resetTopUpPlanBroker } from "../../Features/Slices/brokSlice"

import { ValidateFields } from "../../Validation/Common/fieldValidation"
var TopUpPlanBroker = require('../../Validation/Config/TopUpPlanBroker.json')


export function BrokerDetails() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [searchParams] = useSearchParams();
  const brokerId = searchParams.get('id');
  // alert(brokerId)
  // const[currentname,setcurrentname]=useState();

  const [ModelPopupData, setModePopupData] = useState({
    title: "",
    subtitle: "",
    btn1: "",
    btn2: "",
    variant: "",
  })

  const { title, subtitle, btn1, btn2, variant, type } = ModelPopupData

  const [mode, setMode] = useState(false);
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false);
  const [deletename, setdeletename] = useState()
  const [topUpAmount, setTopUpAmount] = useState()
  const [amount, setAmount] = useState('1');


  const  handlePay = () => {
    if (!amount || isNaN(amount)) {
      alert("Enter a valid amount");
      return;
    }

    startRazorpayPayment(topUpAmount,
      (response) => {
        console.log("✅ Payment Success:", response);

        const verifyResult =  verifyRazorpayPayment(response)


verifyRazorpayPayment(response).then(verifyResult => {

        if (verifyResult.success) {
          
          dispatch(topUpPlanBroker({ id: brokerId, balanceAmount: topUpAmount }));
          dispatch(resetTopUpPlanBroker())
        } else {
           toast.error("Payment failed!!.. Please try again later")
        }
});


        // Send to backend for verification if needed
      },
      (error) => {
        console.error("❌ Payment failed:", error);
      }
    );
  }




  const handleShow = (popuptype, a) => {
    setShow(true)
    setMode(popuptype)
    if (popuptype == "Delete") {
      setModePopupData({
        title: "Delete",
        subtitle: "Delete Broker",
        btn1: "cancel",
        btn2: "Delete",
        variant: "danger",
        type: <p>
          This will permanently delete the Broker{' '}
          <strong style={{ color: 'red' }}>"{name}"</strong>. Please re-enter the
          Broker name to confirm.
        </p>
      })
      // setcurrentname(name)
    }

    if (popuptype == "Update") {
      setModePopupData({
        title: "Top Up",
        subtitle: "Top Up",
        btn1: "cancel",
        btn2: "Submit",
        variant: "danger"
      })
      setTopUpAmount('')
    }
  }
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    email: '',
    address1: '',
    matrimonyName: '',
    brokerCategory: '',
    rank: '',
    planName: '',
    balanceAmount: '',
    isPublic:''

  });

  const onchange = (e) => {
    const { name, value } = e.target;

    if (name === "deletename") {
      setdeletename(value);
    }

    if (name === "topUpAmount") {
      setTopUpAmount(value);
    }
  };

  const { name, phoneNumber, email, address1, matrimonyName, brokerCategory, isPublic,rank, planName, balanceAmount } = formData

  const { isGetBrokerByIdSuccess, isGetBrokerByIdLoading, brokerDetail, isAdminDelateBrokerLoading, isAdminDelateBrokerSuccess, AdminDelateBrokerMessage,
    isGetAllBrokerPlanLoading, isGetAllBrokerPlanSuccess, GetAllBrokerPlanList, isTopUpPlanBrokerLoading, isTopUpPlanBrokerError, isTopUpPlanBrokerSuccess,
     TopUpPlanBrokerMessage,Images,BrokertoPublicSuccess,BrokertoPublicLoading,BrokertoPublicMessage
  } =
    useSelector(
      (state) => state.admin
    )

  useEffect(() => {


    if (isGetBrokerByIdLoading == false && isGetBrokerByIdSuccess == false)
      dispatch(adminGetBrokerByID(brokerId))
    dispatch(fetchBrokers())


    if (isAdminDelateBrokerSuccess == true && AdminDelateBrokerMessage) {
      toast.success(AdminDelateBrokerMessage);
      handleClose();
      navigate(backViewDetailsUrl);
    }
    if (isAdminDelateBrokerSuccess == false && AdminDelateBrokerMessage) {
      toast.error(AdminDelateBrokerMessage)
    }

    if (isGetAllBrokerPlanLoading == false && isGetAllBrokerPlanSuccess == false) {
      dispatch(getBrokerPlan(brokerId))
    }

    if (isTopUpPlanBrokerSuccess == true && TopUpPlanBrokerMessage) {
      toast.success(TopUpPlanBrokerMessage)
      dispatch(resetTopUpPlanBroker())
      dispatch(adminGetBrokerByID(brokerId))
    }

    if (isTopUpPlanBrokerError && TopUpPlanBrokerMessage) {
      toast.error(TopUpPlanBrokerMessage)
      dispatch(resetTopUpPlanBroker())
    }

  // if(BrokertoPublicSuccess == true && BrokertoPublicMessage){
  //   dispatch(BrokertoPublic(BrokertoPublicMessage))
  // }


  }, [isGetBrokerByIdSuccess, isGetBrokerByIdLoading, brokerDetail, isAdminDelateBrokerLoading, isAdminDelateBrokerSuccess,
    AdminDelateBrokerMessage, isTopUpPlanBrokerLoading, isTopUpPlanBrokerSuccess, TopUpPlanBrokerMessage, isTopUpPlanBrokerError,
    BrokertoPublicMessage,BrokertoPublicLoading], dispatch)

  const [isChecked, setIsChecked] = useState(false);
  const handleCheckboxChange = (e) => {
    const newCheckedValue = e.target.checked;
    setIsChecked(newCheckedValue);

if(BrokertoPublicSuccess == false && BrokertoPublicMessage){

  toast.success(BrokertoPublicMessage)
}
if(BrokertoPublicSuccess == true && BrokertoPublicMessage){

  toast.error(BrokertoPublicMessage)
}
    dispatch(BrokertoPublic({ brokerId:brokerId, isPublic: newCheckedValue }));
  };

     useEffect(() => {
    if (brokerDetail && brokerDetail.isPublic !== undefined) {
      // Ensure boolean value
      setIsChecked(brokerDetail.isPublic === true);
    }


  }, [brokerDetail]);



  const onsubmit = (e) => {
    e.preventDefault();

    if (mode == "Delete") {

      if (name == deletename) {
        const brokerDetail = { brokid: brokerId, deletename };
        dispatch(adminDeleteBroker(brokerDetail));
      }
      else {
        toast.error("The name you entered doesn't match. Please try again.")
      }
    }

    if (mode == "Update") {
      // if(topUpAmount){
      let hasRequiredfieldValidation = false
      let hasOtherfieldValidation = false

      const topupReqField = { balanceAmount: topUpAmount };

      for (const [key, value] of Object.entries(topupReqField)) {
        if (!value) {
          hasRequiredfieldValidation = true;
          setShow(true)
          return toast.error("Please Enter the Amount")
        }
      }

      const topUpData = { id: brokerId, balanceAmount: topUpAmount }

      if (hasOtherfieldValidation === false) {
        for (const [key, value] of Object.entries(topUpData)) {
          let arrValidation = TopUpPlanBroker.filter(ValidatePlan => ValidatePlan.fieldName === key)
          for (const currentObject of arrValidation) {
            let message = ValidateFields(currentObject, value);
            if (message !== '') {
              hasOtherfieldValidation = true
              toast.error(message)
              return
            }
          }
        }
      }
      if (!hasOtherfieldValidation && !hasRequiredfieldValidation) {
        handlePay()
      }
    }
    // }
  };

  useEffect(() => {

    if (isGetBrokerByIdSuccess == true && brokerDetail) {
      setFormData({
        name: brokerDetail.name || '',
        phoneNumber: brokerDetail.phoneNumber || '',
        email: brokerDetail.email || '',
        address1: brokerDetail.address1 || '',
        matrimonyName: brokerDetail.matrimonyName || '',
        brokerCategory: brokerDetail.brokerCategory || '',
        rank: brokerDetail.rank || '',
        balanceAmount: brokerDetail.balanceAmount || '',
        isPublic:brokerDetail.isPublic || ''
      })
    }
  }, [isGetBrokerByIdSuccess, isGetBrokerByIdLoading, brokerDetail], dispatch)

  const edit = (brokerId) => {
    navigate('/EditBroker?id=' + brokerId)
  }

  const editBrokImage = (brokerId) => {
    navigate('/AdminAddBrokerImage?id=' + brokerId)
  }


  const backViewDetailsUrl = '/AdminBrokerList'
  const onbackClick = (e) => {
    e.preventDefault();
    navigate(backViewDetailsUrl)
  }
  const assignbroker = (e) => {
    e.preventDefault();
    navigate('/BrokertoBrokerAccess?id=' +brokerId )

  }

    useEffect(() => {
      dispatch(getBrokImageUrl({ brokerId }));
    }, [brokerId]);

  return (<>

    <Link onClick={onbackClick} className="dropdown-item d-flex align-items-center">
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#1aa179" className="bi bi-arrow-left-circle" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z" />
      </svg><p className="h6 mb-0 ms-2">Go Back</p></Link>


    <div className="container " id="brokdetail">
      <h2>Broker details</h2>
      <div className=" brokimg mt-4">
        < svg onClick={() => editBrokImage(brokerId)} className="ms-4" xmlns="http://www.w3.org/2000/svg" width="25" height="20" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
          <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
          <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
        </svg>
      </div>

      <div className="row">
        <img   src={Images}
  onError={(e) => {
    e.target.onerror = null;
    e.target.src = maleavatar;
  }} style={{ width: 225 }} className=" rounded- " alt="profile" />
      </div>
      <br /><br /><br />

      <div className="row">
        <h4 >Basic Details  <svg onClick={() => edit(brokerId)} xmlns="http://www.w3.org/2000/svg" width="25" height="20" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
          <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
          <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
        </svg>
        </h4><br /><br />
        <div className="col-md-3">
          <label htmlFor="">Name :</label><br />
          <label style={{ fontWeight: 'bold' }} htmlFor="" >{name}</label><br /><br />
        </div>
        <div className="col-md-3">
          <label htmlFor="">Phone Number :</label><br />
          <label style={{ fontWeight: 'bold' }} htmlFor="">{phoneNumber}</label><br /><br />
        </div>
        <div className="col-md-3">
          <label htmlFor="">Email :</label><br />
          <label style={{ fontWeight: 'bold' }} htmlFor="">{email}</label><br /><br />
        </div>

        <div className="col-md-3"><label htmlFor="">Address :</label><br />
          <label style={{ fontWeight: 'bold' }} htmlFor="">{address1}</label><br /><br />

        </div>
      </div>
      <br />
      <div className="row">

        <div className="col-md-3">
          <label htmlFor="">Matrimony Name :</label><br />
          <label style={{ fontWeight: 'bold' }} htmlFor="">{matrimonyName}</label><br /><br />
        </div>
        <div className="col-md-3">
          <label htmlFor="">Broker Category :</label><br />
          <label style={{ fontWeight: 'bold' }} htmlFor="">{brokerCategory}</label><br /><br />
        </div>
        <div className="col-md-4">
          <label htmlFor="">Rank :</label><br />
          <label style={{ fontWeight: 'bold' }} htmlFor="">{rank}</label><br /><br />
        </div>
      </div><br />

      <div className="row">
        <h4>Login Details :
          {/* <svg xmlns="http://www.w3.org/2000/svg" width="25" height="20" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
  <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
</svg> */}
        </h4><br /><br />

        <div className="col-md-3">
          <label htmlFor="">Login User Name :</label><br />
          <label style={{ fontWeight: 'bold' }} htmlFor="">{email}</label><br /><br />
        </div>
        <div className="col-md-3">
          <label htmlFor=""></label><br /><br />
        </div>
        <div className="col-md-3">
          <label htmlFor=""></label>
        </div>
        <br /><br />
        <div> 
        <label htmlFor="" style={{color:"red"}}  className="ms-1">
          <h3> Public Broker:</h3></label>
          <input className="ms-2 mt-2" type="checkbox" name="isPublic" id="isPublic"checked={isChecked} onChange={handleCheckboxChange} style={{width:25,height:25}}/></div>
      
      </div><br />

      <div className="row"><h4>Credit Balance</h4><br /><br />

        <div className="col-md-2">
          <label htmlFor="">Top up Balance</label><br />
          <label style={{ fontWeight: 'bold' }} htmlFor="">{balanceAmount}</label><br /><br />
          <br /> </div>
        <div className="col-2">
          <div className="btn btn-success" onClick={() => handleShow("Update", brokerId)} style={{ width: 110 }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="20" fill="currentColor" class="bi bi-currency-rupee" viewBox="0 0 16 16">
              <path d="M4 3.06h2.726c1.22 0 2.12.575 2.325 1.724H4v1.051h5.051C8.855 7.001 8 7.558 6.788 7.558H4v1.317L8.437 14h2.11L6.095 8.884h.855c2.316-.018 3.465-1.476 3.688-3.049H12V4.784h-1.345c-.08-.778-.357-1.335-.793-1.732H12V2H4z" />
            </svg> Top Up
          </div>
        </div>
      </div><br /><br />

      <div className="row"><h4>User Plan</h4>



        <div className="container">
          <div className="row row-cols-1 row-cols-lg-3 g-2 gx-lg-5">
            {GetAllBrokerPlanList.map((brokerPlan, index) => (
              <div key={index}>

                <div className="row p-2 rounded-2 border border-dark plan">
                  <div className="col-9">
                    <h5 className="float-start text-success" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions">
                      {brokerPlan.brokerName} {brokerPlan.planName} Plan</h5></div>

                  <div className="col-6">
                    <h6 className="mb-0">Plan Cost</h6>
                    <span>₹{brokerPlan.planCost}</span>
                    <h6 className="mb-0 mt-3">View Limit</h6>
                    <span>{brokerPlan.viewCountLimit} views everyday</span>
                  </div>
                  <div className="col-6 ">
                    <h6 className="mb-0" >Duration</h6>
                    <span >{brokerPlan.planDuration} {brokerPlan.planPeriod}</span>
                    <h6 className="mb-0 mt-3">Download Limit</h6>
                    <span>{brokerPlan.downloadCountLimit} downloads everyday</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>



      </div>

      <br />

      <button className="btn btn-danger" type="submit" name="name" id="name" onClick={() => handleShow("Delete", brokerId)}>Delete Broker</button>
<button className="btn btn-success ms-5" type="Submit"onClick={assignbroker} >Assign Broker</button>
    </div>


    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <form onSubmit={onsubmit}>
        <Modal.Body>
          <div className="form-group">
            <h5>{subtitle}</h5>
            {type}
            {mode === "Delete" && (
              <input className="form-control" type="text" name="deletename" id="deletename" placeholder="Enter the name" onChange={onchange} />
            )}

            {mode === "Update" && (
              <input className="form-control" type="text" name="topUpAmount" id="topUpAmount" placeholder="Enter the amount" onChange={onchange} />
            )}
          </div>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            {btn1}
          </Button>
          <Button type="submit" variant={variant} className="btn" onClick={handleClose}>
            {btn2}
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  </>)

}