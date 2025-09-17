import { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { getAllForeignCountries,createForeignCountry,resetGetallCountry,resetCreateCountry,
   resetCountryByID,resetDeleteCountry,resetUpdateCountry,updateCountry,deleteCountry,getByCountryName} from "../../Features/Slices/masterSlice";
import { toast } from "react-toastify";
import { useSearchParams } from "react-router-dom"

import { ValidateFields } from "../../Validation/Common/fieldValidation"
var CreateCountry = require('../../Validation/Config/Configuration.json')

export function ForeignCountryList(){
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const [searchParams] = useSearchParams();
    const CountryId =searchParams.get('id');

    const[formData,setFormData]=useState({
        foreignCountry:''
    })
    
    const{foreignCountry}=formData

    const onchange=(e)=>{
      setFormData((prevState)=>({
       ...prevState,
       [e.target.name]:e.target.value
      })) 
    }

    const onsubmit=(e)=>{
      e.preventDefault(); 

      if(mode == "Add"){

        
        let hasRequiredfieldValidation = false
        let hasOtherfieldValidation = false

        const countryReqField = {foreignCountry}

        for (const [key,value] of Object.entries(countryReqField)){
          if(value === ''){
            hasRequiredfieldValidation = true;
            return toast.error("Please Fill all (*) required field")
  
          }
        }
  
      const submit={foreignCountry}

      if(hasRequiredfieldValidation === false){
        for (const [key,value] of Object.entries(submit)){
          let arrValidation = CreateCountry.filter(ValidatePlan =>ValidatePlan.fieldName ===key)
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

      if (!hasRequiredfieldValidation && !hasOtherfieldValidation){
      dispatch(createForeignCountry(submit))
      }}

      else
      if(mode == "DeleteCountry"){
        if(currentcountry.foreignCountry == foreignCountry){
          dispatch(deleteCountry({id:currentcountry._id,foreignCountry}))
        }
        else{
          toast.error("The name you entered doesn’t match. Please try again.")
        }
      }

      if (mode == "EditCountry"){

        let hasRequiredfieldValidation = false
        let hasOtherfieldValidation = false

        const countryReqField = {foreignCountry}

        for (const [key,value] of Object.entries(countryReqField)){
          if(value === ''){
            hasRequiredfieldValidation = true;
            return toast.error("Please Fill all (*) required field")
  
          }
        }

        const submit={foreignCountry}

        if(hasRequiredfieldValidation === false){
          for (const [key,value] of Object.entries(submit)){
            let arrValidation = CreateCountry.filter(ValidatePlan =>ValidatePlan.fieldName ===key)
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

        if (!hasRequiredfieldValidation && !hasOtherfieldValidation){
        if(currentcountry && currentcountry._id){
          dispatch(updateCountry({id:currentcountry._id,foreignCountry}))
        }}
      }
    }
    
    const {ForeignCountries,isGetAllForeignCountryLoading,isGetAllForeignCountrySuccess,isGetAllForeignCountryMessage,
        isCreateForeignCountryLoading,isCreateForeignCountrySuccess,isCreateForeignCountryMessage,
        isUpdateCountryLoading,isUpdateCountrySuccess,isUpdateCountryMessage,
        isDeleteCountryLoading,isDeleteCountrySuccess,isDeleteCountryMessage
    }
    =useSelector(
        (state)=>state.master)

    useEffect(()=>{
        if(isGetAllForeignCountryLoading==false && isGetAllForeignCountrySuccess==false){
            dispatch(getAllForeignCountries())
        }
         
        // setTimeout(()=>{dispatch(getAllForeignCountries())},1000);
         if(mode == "Add"){
        if(isCreateForeignCountrySuccess == true && isCreateForeignCountryMessage){
            toast.success(isCreateForeignCountryMessage)
            dispatch(resetCreateCountry())
            dispatch(resetGetallCountry())}
            else
            if (isCreateForeignCountrySuccess  == false && isCreateForeignCountryMessage)
            {
              toast.error(isCreateForeignCountryMessage)
              
            }
      
      }
        
      if(mode == "DeleteCountry"){
        if(isDeleteCountrySuccess == true && isDeleteCountryMessage){
          toast.success(isDeleteCountryMessage)
          dispatch(resetDeleteCountry())
          dispatch(resetGetallCountry())
        }
        else
        if(isDeleteCountrySuccess == false && isDeleteCountryMessage){
          toast.error(isDeleteCountryMessage)
          dispatch(resetDeleteCountry())
          dispatch(resetGetallCountry())
        }
      }

        if(mode == "EditCountry"){
          if(isUpdateCountrySuccess == true && isUpdateCountryMessage){
            toast.success(isUpdateCountryMessage)
            dispatch(resetUpdateCountry())
            dispatch(resetGetallCountry())
          }
          else
          if(isUpdateCountrySuccess == false && isUpdateCountryMessage){
            toast.error(isUpdateCountryMessage)
            dispatch(resetUpdateCountry())
            dispatch(resetGetallCountry())
          }
        }
    },[isGetAllForeignCountrySuccess,isGetAllForeignCountryLoading,isCreateForeignCountrySuccess,isCreateForeignCountryMessage,
      isUpdateCountryLoading,isUpdateCountrySuccess,isUpdateCountryMessage,
      isDeleteCountryLoading,isDeleteCountrySuccess,isDeleteCountryMessage

    ],dispatch)

  

    const [show,setShow] = useState (false);
    const [mode,setMode] = useState (false);
    const [currentcountry,setcurrentcountry] = useState (null)

    const [ModelPopupData,setModePopupData] = useState({
      title:"Add Country",
      subtitle:"Add",
      button1:"Cancel",
      button2:"Submit"
    })

    const{title,subtitle,button1,button2,variant,type} = ModelPopupData

    const handleClose = () =>setShow (false)

    const handleShow = (popputype,foreignCountry)=>{
       setShow(true)
       setMode(popputype)
       if(popputype == "Add"){
        setModePopupData({
          title:"Add Country",
          subtitle:"Add",
          button1:"Cancel",
          button2:"Add",
          variant:"success"
        })
        setFormData("")
       }

       else
       if("DeleteCountry"){
        setModePopupData({
          title:"Delete Country",
          subtitle:"Delete",
          button1:"Cancel",
          button2:"Delete",
          variant:"danger",
          type: <p>
    This will permanently delete the foreignCountry{' '}
    <strong style={{ color: 'red' }}>"{foreignCountry.foreignCountry}"</strong>. Please re-enter the
    foreignCountry name to confirm.
  </p>
        })
        setcurrentcountry(foreignCountry)
        setFormData("")
       }

       if(popputype == "EditCountry"){
        setModePopupData({
          title:"Edit Country",
          subtitle:"Edit",
          button1:"Cancel",
          button2:"save",
          variant:"success"
        })
        setcurrentcountry(foreignCountry)
        setFormData(foreignCountry)
       }
    }
           
       
  const backViewDetailsUrl ='/ProfileList'
  const onBackClick=(e)=>{
      e.preventDefault();
      navigate(backViewDetailsUrl)}

      const handleCountrySearch = (e)=>{
        if(e.target.value !=undefined && e.target.value !=null && e.target.value.length>2)
        {
          dispatch(getByCountryName(e.target.value))
        }
        else if(e.target.value.length == 0)
        {
          dispatch(getAllForeignCountries())
        }
      }
    

    return(<>
     <Link onClick={onBackClick} className="text-success text-decoration-none"><h5>Home</h5></Link>
    <nav className="navbar">
      <div className="container-fluid">
        <h4>Foreign Country</h4>
        <div className="d-flex"> 
          <input className="form-control border-success rounded-0" type="text" id="search" name="search" placeholder="Search (min. 3 letters)" onChange={handleCountrySearch} aria-label="Search"></input>
          <div className="me-2 "><button className="btn btn-success rounded-0"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
      <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
    </svg></button></div>
          <button className="btn btn-outline-success col-4" type="submit" onClick={()=>handleShow("Add")}>Add more</button>
        </div>
      </div>
    </nav><br />

    <div className="container-fluid py-0">
    <div className="row row-cols-1 row-cols-lg-3 g-2 g-lg-3">
        {ForeignCountries.map((foreignCountry,index)=>(
            <div key={index} className="col">
                <div className="p-3 border border-dark rounded">
                    Foreign Country
                    <div className="float-end">

            <Link style={{marginLeft:'220px'}} onClick={()=>handleShow("EditCountry",foreignCountry)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="23"  className="bi bi-success" viewBox="0 0 16 16">
              <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
              <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
              </svg>
        </Link>

<Link style={{marginLeft:'10px'}} onClick={()=>handleShow("DeleteCountry",foreignCountry)}>
         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="24"  className="bi bi-trash bi-info" viewBox="0 0 16 16">
         <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
         <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
         </svg>
        </Link>
</div>
      <div className="flot-start">
         <b>{foreignCountry.foreignCountry} </b></div>
                  </div>
            </div>
        ))}
    </div>
    </div>

    <Modal show={show} onHide={handleClose}>  
        <Modal.Header closeButton onClick={handleClose}>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <form onSubmit={onsubmit}>
        <Modal.Body>
          <div className="form-group">
            <p>{subtitle}</p>
            {type}
            <input className="form-control" name="foreignCountry" id="foreignCountry" type="text" placeholder="Enter foreign Country" value={formData.foreignCountry} onChange={onchange}/>
          </div>
        </Modal.Body>
        
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            {button1}
          </Button>
          <Button type="submit" variant={variant} onClick={handleClose}>
          {button2}
          </Button>
        </Modal.Footer>
        </form>
      </Modal>

    </>)
}

