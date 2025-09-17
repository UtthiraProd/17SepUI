import { Carousal } from "../Common/Carousal"     
import "../../scss/publicProfile.scss"
import { Link, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from 'react-router-dom'
import { toast } from "react-toastify"
import { adminRegisterBroker,resetAdminRegisterBroker,} from "../../Features/Slices/adminBrokerSlice"
import{ValidateFields } from "../../Validation/Common/fieldValidation"
var   AddEditBrokerValidation = require('../../Validation/Config/AddEditBroker.json')



export function RegisterBroker() {

  const [searchParams] = useSearchParams();
  const dispatch = useDispatch ()
  const navigate= useNavigate();


  const [formData,setFormData] = useState({
    name:"",
    phoneNumber:"",
    email:"",
    matrimonyName:"",
    pincode:"",
    additionalNumber:"",
    commissionPercentage:"",
    registrationNumber:"",
    whatsAppNumber:"",
    address1:"",
    address2:"",
    district:"",
    state:"",
    brokerCategory:"",
    rank:"",
    roleId:"",
    userId:"",
    userName:"",
    password:"",
    confirmPassword:"",
    
  })

  const{name,phoneNumber,email,matrimonyName,pincode,additionalNumber,whatsAppNumber,registrationNumber,commissionPercentage,
    address1,address2,district,state,brokerCategory,rank,userName,password,confirmPassword} = formData

    const onchange = (e) => {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value
      }))
    }

    const onsubmit = (e) => {
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
      
      const adminBrokerData = {name,phoneNumber,email,matrimonyName,pincode,whatsAppNumber,additionalNumber,registrationNumber,
        commissionPercentage,address1,address2,district,state,brokerCategory,rank,userName,password,confirmPassword}
        console.log(adminBrokerData)
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
    
    
        if (!hasRequiredfieldValidation && !hasOtherfieldValidation) {        
      dispatch(adminRegisterBroker(adminBrokerData))
    }
  }
    const{isAdminCreateBrokerLoading,isAdminCreateBrokerSuccess,AdminCreateBrokerMessage,brokerId }=useSelector((state)=>state.admin)

    useEffect(()=>{

      if(isAdminCreateBrokerSuccess == true){
        toast.success(AdminCreateBrokerMessage)
        dispatch(resetAdminRegisterBroker())
        navigate('/AdminAddBrokerImage?id='+ brokerId)
      }

      if(isAdminCreateBrokerSuccess == false && AdminCreateBrokerMessage){
        toast.error(AdminCreateBrokerMessage)
        dispatch(resetAdminRegisterBroker())
      }

      
    },[isAdminCreateBrokerLoading,isAdminCreateBrokerSuccess,AdminCreateBrokerMessage,brokerId],dispatch)


  // const oniconClick = () => {
  //   const input = document.createElement("input");
  //   input.type = "file";
  //   input.click();
  // };

  const cancel =()=>{
    navigate('/AdminBrokerList')
  }

  const backViewDetailsUrl ='/AdminBrokerList'
  const onbackClick = (e) => {
 e.preventDefault();
 navigate(backViewDetailsUrl)
}  

    return (
      <>
         <Link onClick={onbackClick} className="dropdown-item d-flex align-items-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#1aa179" className="bi bi-arrow-left-circle" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z" />
          </svg><p className="h6 mb-0 ms-2">Go Back</p></Link>

      <form onSubmit={onsubmit}>
        <div className="container">
        <div className="navbar ">
                 <div> <h2>Add Broker</h2>
              </div>
            
            </div>
            <div className="d-flex mt-3"><h6>1.Basic Details</h6></div>
            <div className="row mt-3">
              <div className="form-group col-md-4">
                <label htmlFor="name">Name <span style={{ color: 'red' }}><b>*</b></span></label><br />
                <input className="form-control border border-success" onChange={onchange} type="text" id="name" name="name" placeholder="Enter name"/>
              </div>
                <div className="form-group col-md-4">
                <label htmlFor="description">Matrimony name <span style={{ color: 'red' }}><b>*</b></span></label><br />
                <input className="form-control border border-success" onChange={onchange}  type="text" id="matrimonyName" name="matrimonyName" placeholder="Enter Matrimony name"/>
              </div>

              <div className="form-group col-md-4">
                <label htmlFor="email">Email <span style={{ color: 'red' }}><b>*</b></span></label><br />
                <input className="form-control border border-success" onChange={onchange}  type="email" id="email" name="email" placeholder="Enter Email"/>
              </div>
            </div>

            <div className="row mt-3">
              <div className="form-group col-md-4">
                <label htmlFor="address1">Address1 <span style={{ color: 'red' }}><b>*</b></span></label><br />
                <input className="form-control border border-success" onChange={onchange}  type="text" id="address1" name="address1" placeholder="Enter Address 1"/>
              </div>
              <div className="form-group col-md-4">
                <label htmlFor="address2">Address2 <span style={{ color: 'red' }}><b>*</b></span></label><br />
                <input className="form-control border border-success" onChange={onchange}  type="text" id="address2" name="address2" placeholder="Enter Address 2"/>
              </div>
              <div className="form-group col-md-4">
                <label htmlFor="district">District <span style={{ color: 'red' }}><b>*</b></span></label><br />
                <select className="form-control border border-success" onChange={onchange}  name="district" id="district">
                  <option value="">Select</option>
                  <option value="Kanyakumari">Kanyakumari</option>
                  <option value="Thirunelveli">Thirunelveli</option>
                </select>
              </div>
            </div>

            <div className="row mt-3">
              <div className="form-group col-md-4">
                <label htmlFor="state">State <span style={{ color: 'red' }}><b>*</b></span></label><br />
                <select className="form-control border border-success" onChange={onchange}  name="state" id="state">
                  <option value="">Select</option>
                  <option value="Tamil Nadu">Tamil Nadu</option>
                </select>
              </div>

              <div className="form-group col-md-4">
                <label htmlFor="pincode">Pincode <span style={{ color: 'red' }}><b>*</b></span></label><br />
                <input className="form-control border border-success" onChange={onchange}  type="number" id="pincode" name="pincode" placeholder="Enter Pincode "/>
              </div>
               <div className="form-group col-md-4">
                <label htmlFor="registrationNumber">Registration Number</label><br />
                <input className="form-control border border-success" onChange={onchange}  type="text" id="registrationNumber" name="registrationNumber" placeholder="Enter Reg Number"/>
              </div> 
                           
            </div>

            <div className="row mt-3"> 
              <div className="form-group col-md-4">
                <label htmlFor="brokerCategory">Broker Category <span style={{ color: 'red' }}><b>*</b></span></label><br />
                <select className="form-control border border-success" onChange={onchange} type="text" name="brokerCategory" id="brokerCategory">
                  <option value="">Select</option>
                 <option value="Gold">Gold</option>
                 <option value="Silver">Silver</option>
                 <option value="Bronze">Bronze</option>
                </select>
              </div>

              <div className="form-group col-md-4">
                <label htmlFor="rank">Rank <span style={{ color: 'red' }}><b>*</b></span></label><br />
                <input className="form-control border border-success" onChange={onchange}  type="number" id="rank" name="rank" placeholder="Enter rank "/>
              </div>
              <div className="form-group col-md-4">
                <label htmlFor="commissionPercentage">Commission Percentage </label><br />
                <input className="form-control border border-success" onChange={onchange}  type="text" id="commissionPercentage" name="commissionPercentage" placeholder="Enter Commission Percentage "/>
              </div>              
            </div>

               <div className="row mt-3">
               <div className="form-group col-md-4">
                <label htmlFor="phoneNumber">Phone Number <span style={{ color: 'red' }}><b>*</b></span></label><br />
                <input className="form-control border border-success" onChange={onchange}  type="number" id="phoneNumber" name="phoneNumber" placeholder="Enter Phone Number"/>
              </div> 

                <div className="form-group col-md-4">
                <label htmlFor="additionalNumber">Additional Number </label><br />
                <input className="form-control border border-success" onChange={onchange}  type="number" id="additionalNumber" name="additionalNumber" placeholder="Enter Phone Number"/>
              </div>               
                 <div className="form-group col-md-4">
                <label htmlFor="whatsAppNumber">Whatapps Number </label><br />
                <input className="form-control border border-success" onChange={onchange}  type="number" id="whatsAppNumber" name="whatsAppNumber" placeholder="Enter Phone Number"/>
              </div>  
               </div>        

            {/* <br /> */}

            {/* <div className="d-flex mt-3"><h6>2.Upload</h6></div> */}
          
          <div className="row">
            {/* <label htmlFor="">Upload Image</label><br /><br /> */}
            {/* <div className="btn btn-success ms-2 mt-3" style={{width:130}} onChange={handleChange}> <svg style={{marginRight:10}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-upload" viewBox="0 0 16 16">
  <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5"/>
  <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708z"/>
</svg>upload</div> */}

{/* <input className="form-control" type="file" style={{width:320}} onChange={handleChange} id="formFile"></input> */}
          </div>

          <br />
          <div className="d-flex mt-3"><h6>2.Login Details</h6></div>
          <div className="row mt-3">
              <div className="form-group col-md-4">
                <label htmlFor="name">Login User Name</label><br />
                {/* <h5>{email}</h5> */}
                <input type="text" id="email" name="email" disabled value={email} className="form-control border border-success"/>
                  </div>
              <div className="form-group col-md-4">
                <label htmlFor="password">Temporary login password</label><br />
                <input className="form-control border border-success" type="text" onChange={onchange} id="password" name="password" placeholder="Enter Password"/>
              </div>
              <div className="form-group col-md-4">
                <label htmlFor="password">Confirm temporary login password</label><br />
                <input className="form-control border border-success" type="text" onChange={onchange} id="confirmPassword" name="confirmPassword" placeholder="Enter Password"/>
              </div>
            </div>
<br />
{/* <div className="button-container">
<button className=" btn btn-success ms-4" type="submit " style={{width:150}}>Create Broker</button>
<button className="btn btn-secondary " type="">Cancel</button>
</div> */}

<div className="row">
<button className=" col-2 btn btn-success ms-2" type="submit " style={{width:150}}>Create Broker</button>
<button className="col-1 btn btn-secondary  ms-5" style={{width:100}}type=""onClick={cancel} >Cancel</button>
</div>
        </div>
</form>

        
      </>
    )
  }