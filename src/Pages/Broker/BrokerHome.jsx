import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {useDispatch, useSelector} from  'react-redux'
import backaero from '../../img/arrow-left-circle-fill.svg'
import { Carousal } from "../Common/Carousal"
import { getUserMenuDetailsById } from "../../Features/Slices/authSlice"
import{ getBrokerDetailById,resetBrokerDetails,topUpPlanBroker,resetTopUpPlanBroker,getNewPUProfileList,resetNewPUProfileList} from "../../Features/Slices/brokSlice"
import profile1 from '../../img/sampleBroker1.jpg'
import sampleBroker from '../../img/broker_logo.png'
import contactUs from '../../img/broker_svg_contact.svg';
import "../../scss/broker.scss"
import { useNavigate } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

import { ValidateFields } from "../../Validation/Common/fieldValidation"
var TopUpPlanBroker = require('../../Validation/Config/TopUpPlanBroker.json')


export function BrokerHome() {

      const [searchParams] = useSearchParams();
      const brokerId = searchParams.get('id');
      
    const navigate=useNavigate()
    const dispatch = useDispatch()
    const brokerInfo =
    useSelector(
        (state) => state.brok
    )


useEffect(() => {
      if(!brokerInfo.isBrokerDetailByIdLoading && !brokerInfo.isBrokerDetailByIdSuccess){
        dispatch(getBrokerDetailById())
        dispatch(resetBrokerDetails())
      }
     
}, [brokerInfo.isBrokerDetailByIdLoading,brokerInfo.isBrokerDetailByIdSuccess],dispatch)

useEffect(() => {

    
   dispatch(getUserMenuDetailsById())
   
 }, [])

 const pending=(e)=>{
   e.preventDefault();
    
   navigate('/BrokerPendingList', { replace: true });
 }

 const [show, setShow] = useState(false)

 const onHandleClose =()=>{
  setShow(false)
}

 const onHandleShow =()=>{
  setShow(true)}

 const [formData, setFormData] =useState({
   balanceAmount:''
 })
 const {balanceAmount} = formData

 const onchange=(e)=>{
   setFormData((prevState)=>({
     ...prevState,
     [e.target.name]:e.target.value
   }))
   }


   useEffect(()=>{
     if(brokerInfo.isTopUpPlanBrokerSuccess){
      toast.success(brokerInfo.TopUpPlanBrokerMessage)
      dispatch(resetTopUpPlanBroker())
      dispatch(getBrokerDetailById())
      setFormData({ balanceAmount: '' })

     }
     if(brokerInfo.isTopUpPlanBrokerError){
      toast.error(brokerInfo.TopUpPlanBrokerMessage)
      dispatch(resetTopUpPlanBroker())
     }

      
   },[brokerInfo.isTopUpPlanBrokerSuccess,brokerInfo.TopUpPlanBrokerMessage],dispatch)

   const onsubmit =(e)=>{
      e.preventDefault();

      let hasRequiredfieldValidation = false
      let hasOtherfieldValidation = false

      const topupReqField ={balanceAmount}

      for (const [key,value] of Object.entries(topupReqField)){
        if(value === ''){
          hasRequiredfieldValidation = true;
          setShow(true)
          return toast.error("Please Enter the Amount")       
        }
      }

      
      const topUpData ={id:brokerId,balanceAmount:balanceAmount}
   
      if(hasOtherfieldValidation === false){
        for (const [key,value] of Object.entries(topUpData)){
          let arrValidation = TopUpPlanBroker.filter(ValidatePlan =>ValidatePlan.fieldName ===key)
          for (const currentObject of arrValidation){
            let message =ValidateFields(currentObject, value);
            if(message !== ''){
              hasOtherfieldValidation = true
              toast.error(message)
              return
            }
          }
        }
      }
      if(!hasOtherfieldValidation && !hasRequiredfieldValidation){
          dispatch(topUpPlanBroker({id:brokerInfo.brokerDetails._id,balanceAmount:balanceAmount}));
         dispatch(resetTopUpPlanBroker())
      }
    }

        const Pending = () => {
      navigate('/NewPUProfileList');
      dispatch(resetNewPUProfileList())
    }

    useEffect(()=>{
        if(brokerInfo.isNewPUProfileListLoading === false && brokerInfo.isNewPUProfileListSuccess === false){
          dispatch(getNewPUProfileList())
        }
    },[brokerInfo.isNewPUProfileListLoading, brokerInfo.isNewPUProfileListSuccess],dispatch)

    return (
    <>
<div className="row">
   <div className="col-md-12" style={{ fontWeight: 'bold' }}>My Profile</div>
</div>

<div className="row mb-4"></div>

<div className="row">
   
   <div className="col-md-4">
   <img 
                src={brokerInfo.brokerImageUrl || sampleBroker} 
                alt="Descriptive Alt Text" 
                className="rounded"  // Use rounded-circle for circular shape
                style={{ width: '200px', height: '200px' }} // Set width and height to be the same for a circle
            />
   </div>
   <div className="col-md-8">
      <div className="row">
      <div className="col-md-4">
    <label className="col-md-4 col-form-label custom-label">Name</label>
    <label className="form-control-plaintext custom-value" style={{ fontWeight: 'bold'}}>{brokerInfo.brokerDetails.name}</label>
</div>
         <div className="col-md-4">
         <label className="col-md-4 col-form-label custom-label" style={{ whiteSpace: 'nowrap' }}>Phone Number</label>
         <label style={{ fontWeight: 'bold'}} className="form-control-plaintext custom-value"> {brokerInfo.brokerDetails.phoneNumber}</label>
         </div>
         <div className="col-md-4">

         <label className="col-md-4 col-form-label custom-label">Email</label>
         <label style={{ fontWeight: 'bold'}} className="form-control-plaintext custom-value">{brokerInfo.brokeremail}</label>
         </div>
      </div>
      <div className="row">
      <div className="col-md-4">
      <label   className="col-md-4 col-form-label custom-label" style={{ whiteSpace: 'nowrap' }}>Matrimony name</label>
      <label  style={{ fontWeight: 'bold' }} className="form-control-plaintext custom-value">{brokerInfo.brokerDetails.matrimonyName}</label>
      </div>
      <div className="col-md-4">
        <label className="col-form-label custom-label">Address</label>
        <div style={{fontWeight: 'bold',
      whiteSpace: 'normal',
      wordWrap: 'break-word',
      // wordBreak: 'break-word',
    }} className="custom-address">{brokerInfo.brokerDetails.address1} {brokerInfo.brokerDetails.address2}
      </div>
    </div>
      <div className="col-md-4">
         <label htmlFor="" className="col-md-4 col-form-label">Approval</label><br />
         
      <button className="btn btn-danger" onClick={() => Pending()}>Pending</button>
      <span class="position-absolute top-40 start-90 translate-middle badge rounded-pill bg-success " style={{width:35,height:25}}>
     
      {brokerInfo.totalRecord || 0}
      {/* <span class="visually-hidden">Approved Pending</span> */}
      </span> 
     
     
   </div>
   <div className="col-md-4"> 
                <label htmlFor="">Top up Balance</label>
                <label  style={{ fontWeight: 'bold' }} className="form-control-plaintext custom-value">{brokerInfo.brokerDetails.balanceAmount}</label>
   </div>
   {/* <div className="col-md-4"> 
   <label htmlFor="" className="col-md-4 col-form-label">Top Up</label><br />
   <div className="btn btn-success" style={{ width: 115 }} onClick={()=>onHandleShow(brokerInfo.brokerDetails._id)}>
   <svg xmlns="http://www.w3.org/2000/svg" width="25" height="20" fill="currentColor" class="bi bi-currency-rupee" viewBox="0 0 16 16">
  <path d="M4 3.06h2.726c1.22 0 2.12.575 2.325 1.724H4v1.051h5.051C8.855 7.001 8 7.558 6.788 7.558H4v1.317L8.437 14h2.11L6.095 8.884h.855c2.316-.018 3.465-1.476 3.688-3.049H12V4.784h-1.345c-.08-.778-.357-1.335-.793-1.732H12V2H4z"/>
</svg> Top Up
        </div>
            </div> */}
        </div>
  

   </div>
</div>
<div className="row mb-4"></div>
<div className="row">
<div className="col-md-4"></div>
<div className="col-md-8">
   
   <div className="row">
   <div className="col-2">
      </div>
      <div className="col-8">
      {/* <div> <br /><br /><br /></div> */}
      <div className="app-container">
   
      <img src={contactUs} alt="Example" className="responsive-image" />
      </div>

      <div> <br /><br /></div>
      </div>
   </div>

   

   <div className="row">
      <div className="col-12">
      <label style={{ fontWeight: '400', fontStyle: 'italic'}}>***Please call us at <b className=" text-success ">9677453075</b> & <b className=" text-success ">8072475191</b> to inform us if the displayed details are incorrect. We will help you with the update***</label>
      </div>
      <br /><br /><br /><br />
   </div>
<b></b>
</div>
</div>

  
   <div className="content1">


{/* <p className="h4">My Details</p> */}

 {/* { (brokerInfo && brokerInfo.brokerDetails )?
 (

<div id="dvpublicProfile" className="row">
   <div className="col-md-8">
  
<div className="row">
<label  style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Name</label>
<div className="col-8">
 
   <label  className="form-control-plaintext">: {brokerInfo.brokerDetails.name}</label>
</div>
</div>
<div className="row">
<label  style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Phone Number</label>
<div className="col-8">
<label  className="form-control-plaintext">: {brokerInfo.brokerDetails.phoneNumber}</label>
</div>
</div>

<div className="row">
<label  style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Matrimony name</label>
<div className="col-8">
<label  className="form-control-plaintext">: {brokerInfo.brokerDetails.description}</label>
</div>
</div>

<div className="row">
<label  style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Address1</label>
<div className="col-8">
<label  className="form-control-plaintext">: {brokerInfo.brokerDetails.address1}</label>
</div>
</div>



<div className="row">
<label  style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Address2</label>
<div className="col-8">
<label  className="form-control-plaintext">: {brokerInfo.brokerDetails.address2}</label>
</div>
</div>

<div className="row">
<label  style={{ fontWeight: 'bold' }} className="col-4 col-form-label">State</label>
<div className="col-8">
<label  className="form-control-plaintext">: {brokerInfo.brokerDetails.state}</label>
</div>
</div>

<div className="row">
<label  style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Pincode</label>
<div className="col-8">
<label  className="form-control-plaintext">: {brokerInfo.brokerDetails.pincode}</label>
</div>
</div>

</div>
         
  


   <div className="col-md-4">
   {
   
     <div>
        
       <Carousal  imageUrls={ [brokerInfo.brokerImageUrl]} ></Carousal> 
     </div>
  }
     </div>

 </div>
 
 ):null
 
 } */}

 
 <div>
   </div> 

   
   </div>

   {/* <Modal show={show} onHide={onHandleClose}>
      <Modal.Header>
        <Modal.Title>Top Up</Modal.Title>
      </Modal.Header>
      <form onSubmit={onsubmit}>
      <Modal.Body>
        <div className="form-group">
        <h5></h5>
          <input  className="form-control" type="text" name="balanceAmount" id="balanceAmount" placeholder="Enter the amount" onChange={onchange}/>
        </div>
       
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHandleClose}>
          Cancel
        </Button>
        <Button type="submit" className="btn" onClick={onHandleClose}>
          TopUp
        </Button>
      </Modal.Footer>
      </form>
   </Modal> */}


    </>)
}
