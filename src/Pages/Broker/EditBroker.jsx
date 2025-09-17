import {adminGetBrokerByID,adminUpdateBroker, resetAdminUpdateBroker} from "../../Features/Slices/adminBrokerSlice"
import { useSelector,useDispatch } from "react-redux"
import { useEffect } from "react"
import { useState } from "react"
import { Navigate, useNavigate, useSearchParams } from "react-router-dom"
import "../../scss/broker.css"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import{ValidateFields } from "../../Validation/Common/fieldValidation"
var   AddEditBrokerValidation = require('../../Validation/Config/AddEditBroker.json')


export function EditBroker(){

  const dispatch=useDispatch()
  const navigate=useNavigate()
  const [searchParams] = useSearchParams();
  const brokId = searchParams.get('id');

     
  const [formData,setFormData]=useState({
    name:'',
    phoneNumber:'',
    email:'',
    address1:'',
    matrimonyName:'',
    brokerCategory:'',
    rank:'',
    address2:'',
    district:'',
    state:'',
    pincode:'',
    whatsAppNumber:'',
    additionalNumber:'',
    commissionPercentage:'',
    registrationNumber:''

});
const onchange=(e)=>{
  setFormData((prevState)=>({
    ...prevState,
    [e.target.name]:e.target.value
  }))
  }

const {name,phoneNumber,email,address1,matrimonyName,brokerCategory,rank,address2,district,state,pincode,
       whatsAppNumber,additionalNumber,commissionPercentage,registrationNumber}=formData;


const {isGetBrokerByIdSuccess,isGetBrokerByIdLoading,brokerDetail,
  isAdminCreateBrokerLoading,isAdminCreateBrokerSuccess,isAdminUpdateBrokerLoading,isAdminUpdateBrokerSuccess,AdminUpdateBrokerMessage} =
useSelector(
  (state) => state.admin
)  

useEffect(() => {

  if(!isGetBrokerByIdSuccess && !isGetBrokerByIdLoading)
    dispatch(adminGetBrokerByID(brokId))

  if(isAdminUpdateBrokerSuccess == true && AdminUpdateBrokerMessage){
    toast.success(AdminUpdateBrokerMessage)
    navigate('/AdminBrokerList')
  }

  if(isAdminUpdateBrokerSuccess == false && AdminUpdateBrokerMessage){
    toast.error(AdminUpdateBrokerMessage)
    dispatch(resetAdminUpdateBroker())
  }




}, [isGetBrokerByIdSuccess,isGetBrokerByIdLoading,brokerDetail, 
  isAdminCreateBrokerLoading,isAdminCreateBrokerSuccess,AdminUpdateBrokerMessage,brokId],dispatch)


useEffect(() => {
       
  if(isGetBrokerByIdSuccess == true && brokerDetail){
    setFormData({
      name:brokerDetail.name || '',
      phoneNumber:brokerDetail.phoneNumber || '',
      email:brokerDetail.email || '',
      address1:brokerDetail.address1 || '',
      matrimonyName:brokerDetail.matrimonyName || '',
      brokerCategory:brokerDetail.brokerCategory || '',
      rank:brokerDetail.rank || '',
      address2:brokerDetail.address2 || '',
      district:brokerDetail.district || '',
      state:brokerDetail.state || '' ,
      pincode:brokerDetail.pincode || '',
      whatsAppNumber:brokerDetail.whatsAppNumber || '',
      additionalNumber:brokerDetail.additionalNumber ||'',
      commissionPercentage:brokerDetail.commissionPercentage || '',
      registrationNumber:brokerDetail.registrationNumber || ''
    })
  }
}, [isGetBrokerByIdSuccess,isGetBrokerByIdLoading,brokerDetail],dispatch)

const onsubmit=(e)=>{
  e.preventDefault();
  let hasRequiredfieldValidation = false
      let hasOtherfieldValidation = false
  
      const brokerReqFields = {
        name,phoneNumber,email,matrimonyName,pincode,address1,address2,district,state,brokerCategory,rank
      }
  
      for (const [key, value] of Object.entries(brokerReqFields)) {
  
        if (value == "") {
          hasRequiredfieldValidation = true;
          return toast.error('Please fill all (*)required field')
        }
      }      
      
      const adminBrokerData = {brokId,name,phoneNumber,email,matrimonyName,pincode,whatsAppNumber,additionalNumber,commissionPercentage,
        registrationNumber,address1,address2,district,state,brokerCategory,rank}


        if (hasRequiredfieldValidation == false) {
          for (const [key, value] of Object.entries(adminBrokerData)) {
            let arrValidation = AddEditBrokerValidation.filter(validateprofile => validateprofile.fieldName === key)
            for (const currentObject of arrValidation) {
              let message = ValidateFields(currentObject, value);
              if (message != '') {
                hasOtherfieldValidation = true
                toast.error(message)
                return
              }
            }
          }
        }
    
    
        if (!hasRequiredfieldValidation && !hasOtherfieldValidation){
  dispatch(adminUpdateBroker(adminBrokerData))
  console.log(brokId)
        }
}

  const oniconClick = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.click();
  };

  
const backViewDetailsUrl =('/BrokerDetails?id=' + brokId  )
const onbackClick = (e) => {
  e.preventDefault();
  navigate(backViewDetailsUrl)
}  

const cancel =()=>{
  navigate('/BrokerDetails')
}

    return (
        <>
        <Link onClick={onbackClick} className="text-success text-decoration-none"><h3> <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#1aa179" className="bi bi-arrow-left-circle" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z" />
          </svg></h3></Link>
        <form onSubmit={onsubmit}>
    <div className="container" id="editbrok">
  
      <div className="navbar">
        <div><h2>Edit Broker</h2></div>
      </div>
  
      <div className="row row-cols-1">
        <div className="d-flex mt-3"><h6>1. Basic Details</h6></div>
        <div className="row mt-3">
          <div className="form-group col-12 col-md-4">
            <label htmlFor="name">Name <span style={{ color: 'red' }}><b>*</b></span></label><br />
            <input className="form-control border border-success" onChange={onchange} type="text" id="name" name="name" value={name} placeholder="Enter name" />
          </div>
          <div className="form-group col-12 col-md-4">
            <label htmlFor="matrimonyName">Matrimony name <span style={{ color: 'red' }}><b>*</b></span></label><br />
            <input className="form-control border border-success" onChange={onchange} type="text" id="matrimonyName" name="matrimonyName"  value={matrimonyName} placeholder="Enter Matrimony name" />
          </div>
          <div className="form-group col-12 col-md-4">
            <label htmlFor="email">Email <span style={{ color: 'red' }}><b>*</b></span></label><br />
            <input className="form-control border border-success" onChange={onchange} type="email" id="email" name="email" value={email} placeholder="Enter Email" />
          </div>
        </div>
  
        <div className="row mt-3">
          <div className="form-group col-12 col-md-4">
            <label htmlFor="address1">Address1 <span style={{ color: 'red' }}><b>*</b></span></label><br />
            <input className="form-control border border-success" onChange={onchange} type="text" id="address1" name="address1" value={address1} placeholder="Enter Address 1" />
          </div>
          <div className="form-group col-12 col-md-4">
            <label htmlFor="address2">Address2 <span style={{ color: 'red' }}><b>*</b></span></label><br />
            <input className="form-control border border-success" onChange={onchange} type="text" id="address2" name="address2" value={address2} placeholder="Enter Address 2" />
          </div>
          <div className="form-group col-12 col-md-4">
            <label htmlFor="district">District <span style={{ color: 'red' }}><b>*</b></span></label><br />
            <select className="form-control border border-success" onChange={onchange} name="district" value={district} id="district">
              <option value="">Select</option>
              <option value="Kanyakumari">Kanyakumari</option>
              <option value="Thirunelveli">Thirunelveli</option>
            </select>
          </div>
        </div>
  
        <div className="row mt-3">
          <div className="form-group col-12 col-md-4">
            <label htmlFor="state">State <span style={{ color: 'red' }}><b>*</b></span></label><br />
            <select className="form-control border border-success" onChange={onchange} name="state" value={state} id="state">
              <option value="">Select</option>
              <option value="Tamil Nadu">Tamil Nadu</option>
            </select>
          </div>
  
          <div className="form-group col-12 col-md-4">
            <label htmlFor="pincode">Pincode <span style={{ color: 'red' }}><b>*</b></span></label><br />
            <input className="form-control border border-success" onChange={onchange} type="number" id="pincode" name="pincode" value={pincode} placeholder="Enter Pincode" />
          </div>
          <div className="form-group col-12 col-md-4">
            <label htmlFor="commissionPercentage">Commission Percentage</label><br />
            <input className="form-control border border-success" onChange={onchange} type="text" id="commissionPercentage" name="commissionPercentage" value={commissionPercentage} placeholder="Enter commissionPercentage" />
          </div>          
        </div>
  
        <div className="row mt-3">
          <div className="form-group col-12 col-md-4">
            <label htmlFor="brokerCategory">Broker Category <span style={{ color: 'red' }}><b>*</b></span></label><br />
            <select className="form-control border border-success" onChange={onchange} type="text" name="brokerCategory" value={brokerCategory} id="brokerCategory">
              <option value="">Select</option>
              <option value="Gold">Gold</option>
              <option value="Silver">Silver</option>
              <option value="Bronze">Bronze</option>
            </select>
          </div>
  
          <div className="form-group col-12 col-md-4">
            <label htmlFor="rank">Rank <span style={{ color: 'red' }}><b>*</b></span></label><br />
            <input className="form-control border border-success" onChange={onchange} type="number" id="rank" name="rank" value={rank} placeholder="Enter rank" />
          </div>
          <div className="form-group col-12 col-md-4">
            <label htmlFor="registrationNumber">Registration Number</label><br />
            <input className="form-control border border-success" onChange={onchange} type="text" id="registrationNumber" name="registrationNumber" value={registrationNumber} placeholder="Enter Registration Number" />
          </div>
        </div>
  
        <div className="row mt-3">
         <div className="form-group col-12 col-md-4">
            <label htmlFor="phoneNumber">Phone Number <span style={{ color: 'red' }}><b>*</b></span></label><br />
            <input className="form-control border border-success" onChange={onchange} type="text" id="phoneNumber" name="phoneNumber" value={phoneNumber} placeholder="Enter Phone Number" />
          </div>
          <div className="form-group col-md-4">
                <label htmlFor="additionalNumber">Additional Number </label><br />
                <input className="form-control border border-success" onChange={onchange}  type="number" id="additionalNumber" name="additionalNumber" value={additionalNumber} placeholder="Enter Phone Number"/>
              </div>               
                 <div className="form-group col-md-4">
                <label htmlFor="whatsAppNumber">WhatsApp Number </label><br />
                <input className="form-control border border-success" onChange={onchange}  type="number" id="whatsAppNumber" name="whatsAppNumber" value={whatsAppNumber} placeholder="Enter Phone Number"/>
              </div>  
        </div>
  
        <br />
  
        <div className="d-flex mt-3"><h6>2. Upload</h6></div>
  
        <div className="row">
          <label htmlFor="">Upload Image</label><br />
          <div className="btn btn-success ms-2" style={{ width: 130 }} onClick={oniconClick}>
            <svg style={{ marginRight: 10 }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-upload" viewBox="0 0 16 16">
              <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
              <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708z" />
            </svg>
            upload
          </div>
      
        </div>

        
        
        {/* <div className="button-container  btt">
          <button className="btn btn-success " type="submit" style={{ width: 130 }}>Edit Broker</button>
          <button className="btn btn-secondary " type="">Cancel</button>
        </div> */}

        <div className="row mt-5">
<button className=" col-2 btn btn-success ms-2" type="submit " style={{ width: 130 }}>Submit</button>
<button className="col-1 btn btn-secondary  ms-5" style={{width:100}}type="" onClick={cancel}>Cancel</button>
</div>

      </div>
    </div>
  </form>
  
      
        </>
      )
}