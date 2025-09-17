
import { useState,useEffect } from "react"
import { useDispatch,useSelector } from "react-redux"
import { getAllQualifications,deleteQualification,resetGetQualification,createQualification,resetQualificationById,getQualificationById, 
  resetCreateQualification, updateQualification,resetdeleteQualification,resetUpdateQualification,getQualificationByName} from "../../Features/Slices/masterSlice"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { toast } from "react-toastify";
import { useSearchParams } from "react-router-dom"

import { ValidateFields } from "../../Validation/Common/fieldValidation"
var CreateQualification = require('../../Validation/Config/Configuration.json')

export function QualificationList(){
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const [searchParams] = useSearchParams();
    const qualificationId =searchParams.get('id');

const[formData,setFormData]=useState({
  qualification:''
})

const{qualification}=formData

const onchange=(e)=>{
  setFormData((prevState)=>({
   ...prevState,
   [e.target.name]:e.target.value
  })) 
}

const onsubmit=(e)=>{
e.preventDefault()
                
  if(mode=="AddQualification")
  {

    let hasRequiredfieldValidation = false
    let hasOtherfieldValidation = false

    const qualificationReqField = {qualification}

    for (const [key,value] of Object.entries(qualificationReqField)){
      if(value === ''){
        hasRequiredfieldValidation = true;
        return toast.error("Please Fill all (*) required field")

      }
    }

    const submit={qualification}

    if(hasRequiredfieldValidation === false){
      for (const [key,value] of Object.entries(submit)){
        let arrValidation = CreateQualification.filter(ValidatePlan =>ValidatePlan.fieldName ===key)
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
    dispatch(createQualification(submit)) }
  }

  else
  if(mode =="DeleteQualification"){
    if(currentQualification.qualification == qualification ){
   dispatch(deleteQualification({id:currentQualification._id,qualification:qualification}))
  console.log(currentQualification)}

     else{
         toast.error("The name you entered doesn’t match. Please try again.")
        }
  }
  if(mode=="EditQualification"){

    let hasRequiredfieldValidation = false
    let hasOtherfieldValidation = false

    const qualificationReqField = {qualification}

    for (const [key,value] of Object.entries(qualificationReqField)){
      if(value === ''){
        hasRequiredfieldValidation = true;
        return toast.error("Please Fill all (*) required field")

      }
    }

    const submit={qualification}

    if(hasRequiredfieldValidation === false){
      for (const [key,value] of Object.entries(submit)){
        let arrValidation = CreateQualification.filter(ValidatePlan =>ValidatePlan.fieldName ===key)
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
    if(currentQualification && currentQualification._id){
      dispatch(updateQualification({id:currentQualification._id,qualification}))
    }}
  }
  
}
// setTimeout(() => { dispatch(getAllQualifications())},1000);

    const {isQualificationSuccess,isQualificationLoading,isCreateQualificationLoading,isCreateQualificationError,
      qualifications,isCreateQualificationSuccess,isCreateQualificationMessage,
      isQualificationByIdSuccess,isQualificationByIdloading,isUpdateQualificationSuccess,isUpdateQualificationMessage,
      isDeleteQualificationSuccess,isDeleteQualificationMessage}=
    useSelector((state)=>state.master)

    useEffect(()=>{
        if(isQualificationLoading==false && isQualificationSuccess==false){
          dispatch(getAllQualifications())
        }
        if(isCreateQualificationSuccess){
          toast.success(isCreateQualificationMessage)
          dispatch(resetCreateQualification())
          dispatch(resetGetQualification())
        }
        if(isCreateQualificationError){
          toast.error(isCreateQualificationMessage)
          dispatch(resetCreateQualification())
          dispatch(resetGetQualification())
        }
        else{
          if(isDeleteQualificationSuccess){
            toast.success(isDeleteQualificationMessage)
            dispatch(resetdeleteQualification())
            dispatch(resetGetQualification())
          }
        }
        if(mode=="EditQualification"){
          if(isUpdateQualificationSuccess){
            toast.success(isUpdateQualificationMessage)
            dispatch(resetUpdateQualification())
            dispatch(resetGetQualification())
          }
        }
        
    },[qualificationId,isQualificationSuccess,isQualificationLoading,isQualificationByIdloading,isQualificationByIdSuccess,
      isCreateQualificationLoading,isCreateQualificationSuccess,isCreateQualificationMessage,
      isDeleteQualificationSuccess,isDeleteQualificationMessage,isUpdateQualificationSuccess,isUpdateQualificationMessage],dispatch)

    const backViewDetailsUrl ='/ProfileList'
        const onBackClick=(e)=>{
            e.preventDefault();
            navigate(backViewDetailsUrl)}

            const [mode,setMode]=useState(false);
            const [show,setShow]=useState(false);
            const [currentQualification,setCurrentQualification]=useState(null);

            const [ModelPopupData, setModePopupData]=useState({
              title:"Add Qualification",
              subtitle:"Qualification",
              button1:"Cancel",
              button2:"Submit",
            })

            const{title,subtitle,button1,button2,variant,text}=ModelPopupData

            const handleClose =()=>setShow(false);

            const handleShow=(popuptype,qualification)=>{
              setShow(true)
              setMode(popuptype)
              if(popuptype =="AddQualification"){
                setModePopupData({
                  title:"Add Qualification",
                  subtitle:"Qualification",
                  button1:"Cancel",
                  button2:"Add",
                  variant:"success"
                })
                setFormData("")
              }
              else{
                if(popuptype =="DeleteQualification"){                
                  setModePopupData({
                  title:"Delete Qualification",
                  subtitle:"Delete",
                  button1:"Cancel",
                  button2:"Delete",
                  variant:"danger",
                  text:  <p>
    This will permanently delete the caste{' '}
    <strong style={{ color: 'red' }}>"{qualification.qualification}"</strong>. Please re-enter the
    caste name to confirm.
  </p>
                })
                setCurrentQualification(qualification)
                setFormData("")                
              }}

              if(popuptype =="EditQualification"){
                setModePopupData({
                  title:"Edit Qualification",
                  subtitle:"Edit",
                  button1:"Cancel",
                  button2:"Save",
                  variant:"success"
                })
                setCurrentQualification(qualification)
                setFormData(qualification)
              }
            }

             const handleQualificationSearch = (e)=>{
            
                    if(e.target.value !=undefined && e.target.value !=null && e.target.value.length>2){
                       dispatch(getQualificationByName(e.target.value))
                    }
                    else if(e.target.value.length == 0){
                      dispatch(getAllQualifications())
                    }
                  }
               
    return(<>
    <Link onClick={onBackClick}className="text-success text-decoration-none"><h4>Home<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-house-fill" viewBox="0 0 15 18">
  <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L8 2.207l6.646 6.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293z"/>
  <path d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293z"/>
</svg></h4> </Link>
<nav className="navbar">
  <div className="container-fluid">
    <h4>Qualifications</h4>
    <div className="d-flex"> <input type="text" className="form-control border-success rounded-0" placeholder="Search (min. 3 letters)"  onChange={handleQualificationSearch}></input>
      <div className="me-2 "><button className="btn btn-success rounded-0"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
</svg></button></div>
      <button className="btn btn-outline-success col-4" type="submit" onClick={()=>handleShow("AddQualification")}>Add more</button>
    </div>
  </div>
</nav><br />

    <div className="container-fluid py-0">
    <div className="row row-cols-1 row-cols-lg-3 g-2 g-lg-3">
        {qualifications.map((qualification,index)=>(
         <div key={index} className="col">
           <div className="p-3 border border-dark rounded">
           Qualification   
             <div className="float-end">
            <Link onClick={()=>handleShow("EditQualification",qualification)} style={{marginLeft:'250px'}}>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="23"  className="bi bi-success" viewBox="0 0 16 16">
              <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
              <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
              </svg>
        </Link>

<Link style={{marginLeft:'40px'}} onClick={()=>handleShow("DeleteQualification",qualification)}>
         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="24"  className="bi bi-trash" viewBox="0 0 16 16">
         <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
         <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
         </svg>
        </Link>
</div>         
           <div className="flot-start">
          <b>{qualification.qualification}</b></div>
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
            {text}
            <input className="form-control"  name="qualification" id="qualification" type="text" placeholder="Enter Qualification" value={formData.qualification}onChange={onchange}/>
          </div>
        </Modal.Body>
        
        <Modal.Footer>
          <Button variant="dark" onClick={handleClose}>
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