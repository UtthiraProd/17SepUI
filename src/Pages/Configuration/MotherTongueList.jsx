import { Link } from "react-router-dom";
import { getAllMotherTongue,resetcreateMotherTongue,createMotherTongue ,resetgetAllMotherTongue,
        updateMotherTongue,resetupdateMotherTongue,resetdeleteMotherTongue,deleteMotherTongue,
        getByMotherTongueName
        } from "../../Features/Slices/masterSlice";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Button from "react-bootstrap/esm/Button";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import { toast } from "react-toastify";
import { useSearchParams } from "react-router-dom";           
import { useNavigate } from "react-router-dom";

import { ValidateFields } from "../../Validation/Common/fieldValidation"
var MotherTonguevalidation = require('../../Validation/Config/Configuration.json')

export function MotherTongueList (){

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [searchParams] = useSearchParams ()
    // const MotherTongue = searchParams.get ('id') 

    const [formData,setFormData] = useState({
      motherTongue:""
    })

    const {motherTongue} =formData

     const onchange = (e) => {
            setFormData((prevState) => ({
              ...prevState,
              [e.target.name]: e.target.value
            }))
          }
    
          const onsubmit = (e) => {
            e.preventDefault();
    
              if(mode == "Add"){

              let hasRequiredfieldValidation = false
              let hasOtherfieldValidation = false

              const MotherTongue = {motherTongue}
 
              for (const [key,value] of Object.entries(MotherTongue)){
                if(value === ''){
                  hasRequiredfieldValidation = true;
                  return toast.error("Please Fill all (*) required field")
        
                }
              }
    
            const motherTongueDate = { motherTongue }

            if(hasRequiredfieldValidation === false){                     
              for (const [key,value] of Object.entries(motherTongueDate)){
                let arrValidation = MotherTonguevalidation.filter(ValidatePlan =>ValidatePlan.fieldName ===key)
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
              dispatch(createMotherTongue(motherTongueDate))
            }
            
            }

            else
            if(mode == "EditMotherTongue"){

              let hasRequiredfieldValidation = false
              let hasOtherfieldValidation = false

              const MotherTongue = {motherTongue}

              for (const [key,value] of Object.entries(MotherTongue)){
                if(value === ''){
                  hasRequiredfieldValidation = true;
                  return toast.error("Please Fill all (*) required field")
        
                }
              }

              const motherTongueDate = { motherTongue }

              if(hasRequiredfieldValidation === false){
                for (const [key,value] of Object.entries(motherTongueDate)){
                  let arrValidation = MotherTonguevalidation.filter(ValidatePlan =>ValidatePlan.fieldName ===key)
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
              if(currentMotherTongue && currentMotherTongue._id){
                dispatch(updateMotherTongue({id:currentMotherTongue._id,motherTongue:motherTongue}))
              }}
            }

            if(mode == "DeleteMotherTongue"){

              if(currentMotherTongue.motherTongue == motherTongue){
                dispatch(deleteMotherTongue({id:currentMotherTongue._id,motherTongue:motherTongue}))
              }
              else{
                toast.error("The name you entered doesn’t match. Please try again.")
              }
            }

          }

const{isGetAllMotherTongueLoading,isGetAllMotherTongueSuccess,isGetAllMotherTongueList,
  isCreateMotherTongueLoading,isCreateMotherTongueSuccess,CreateMotherTonguemessage,
  isUpdateMotherTongueLoading,isUpdateMotherTongueSuccess,UpdateMotherTonguemessage,
  isDeleteMotherTongueLoading,isDeleteMotherTonguesuccess,DeleteMotherTonguemessage
}=useSelector((state)=>state.master)

useEffect(()=>{
    if(isGetAllMotherTongueLoading == false && isGetAllMotherTongueSuccess == false){
        dispatch(getAllMotherTongue())
    }

    if(mode == "Add"){
      if(isCreateMotherTongueSuccess == true && CreateMotherTonguemessage){
       toast.success(CreateMotherTonguemessage)
       dispatch(resetcreateMotherTongue())
       dispatch(resetgetAllMotherTongue())
      }
      else
      if(isCreateMotherTongueSuccess == false && CreateMotherTonguemessage){
        toast.error(CreateMotherTonguemessage)
        dispatch(resetcreateMotherTongue())
        dispatch(resetgetAllMotherTongue())
      }
    }

    else
    if(mode == "EditMotherTongue"){
      if(isUpdateMotherTongueSuccess == true && UpdateMotherTonguemessage){
        toast.success(UpdateMotherTonguemessage)
        dispatch(resetupdateMotherTongue())
        dispatch(resetgetAllMotherTongue())
      }
      else
      if(isUpdateMotherTongueSuccess == false && UpdateMotherTonguemessage){
        toast.error(UpdateMotherTonguemessage)
        dispatch(resetupdateMotherTongue())
        dispatch(resetgetAllMotherTongue())
      }
    }

    if(mode == "DeleteMotherTongue"){
      if(isDeleteMotherTonguesuccess == true && DeleteMotherTonguemessage){
        toast.success(DeleteMotherTonguemessage)
        dispatch(resetdeleteMotherTongue())
        dispatch(resetgetAllMotherTongue())
      }

      else
      if(isDeleteMotherTonguesuccess == false && DeleteMotherTonguemessage){
        toast.error(DeleteMotherTonguemessage)
        dispatch(resetdeleteMotherTongue())
        dispatch(resetgetAllMotherTongue())
      }
    }

},[isGetAllMotherTongueLoading,isGetAllMotherTongueSuccess,isGetAllMotherTongueList,
  isCreateMotherTongueLoading,isCreateMotherTongueSuccess,CreateMotherTonguemessage,
  isUpdateMotherTongueLoading,isUpdateMotherTongueSuccess,UpdateMotherTonguemessage,
  isDeleteMotherTongueLoading,isDeleteMotherTonguesuccess,DeleteMotherTonguemessage
],dispatch)

      const [mode,setMode] = useState (false)
      const [show,setShow] = useState (false)
      
      const [currentMotherTongue,setcurrentMotherTonge] = useState (null)

      const [ModelPopupData,setModePopupData] = useState ({
        title:"Add MotherTongue",
        subtitle:"MotherTongue",
        button1:"Cancel",
        button2:"Submit"
      })

      const{title,subtitle,button1,button2,variant,type} = ModelPopupData

      const handleClose = () =>setShow (false);

      const handleShow = (popuptype,motherTongue)=>{

        setShow (true)
        setMode (popuptype)

        if(popuptype == "Add"){
          setModePopupData({
            title:"Add MotherTongue",
            subtitle:"MotherTongue",
            button1:"Cancel",
            button2:"Add",
            variant:"success"
          })
          setFormData("")
        }

        if(popuptype == "EditMotherTongue"){
          setModePopupData({
            title:"Edit MotherTongue",
            subtitle:"Edit",
            button1:"Cancel",
            button2:"Save",
            variant:"success"
          })
          setcurrentMotherTonge(motherTongue)
          setFormData(motherTongue)
        }

        if(popuptype == "DeleteMotherTongue"){
          setModePopupData({
            title:"Delete MotherTongue",
            subtitle:"Delete",
            button1:"Cancel",
            button2:"Delete",
            variant:"danger",
            type:<p>
    This will permanently delete the motherTongue{' '}
    <strong style={{ color: 'red' }}>"{motherTongue.motherTongue}"</strong>. Please re-enter the
    motherTongue name to confirm.
  </p>
          })
          setcurrentMotherTonge(motherTongue)
          setFormData("")
        }
      }

      const handleMotherTongueSearch = (e)=>{

        if(e.target.value !=undefined && e.target.value !=null && e.target.value.length>2){
           dispatch(getByMotherTongueName(e.target.value))
        }
        else if(e.target.value.length == 0){
          dispatch(getAllMotherTongue())
        }
      }

      const backViewDetailsUrl ='/ProfileList'
      const onbackClick = (e) => {
        e.preventDefault();
        navigate(backViewDetailsUrl)    
      }

    return(<>
    
    <Link onClick={onbackClick} className="text-success text-decoration-none"><h3>Home<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-house-fill" viewBox="0 0 15 18">
      <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L8 2.207l6.646 6.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293z"/>
      <path d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293z"/>
    </svg></h3> </Link>
    
    <nav className="navbar navbar-light">
    <div className="container-fluid">
            <a className="navbar-brand"><h3>Mother Tongue</h3></a>
            <div className="d-flex">
              <input className="form-control border-success rounded-0" type="text"  id="search" name="search" placeholder="Search (min. 3 letters)" onChange={handleMotherTongueSearch} />
    
              <button className="btn btn-success me-2 rounded-0"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
              </svg></button>
    
              <button className="btn btn-outline-success col-4" type="submit" onClick={()=>handleShow("Add")}>Add more</button>
            </div>
          </div>
    </nav>
    
    <div className="container-fluid py-0">
            <div className="row row-cols-1 row-cols-lg-3 g-3 g-lg-3">
              {isGetAllMotherTongueList.map((MotherToungeList,index) => (
                <div key={index} className="float-end">
                  <div className="p-3 border border-dark rounded ">
                    Mother Tongue
                   
                    
                      <div className="float-end">
                        <Link  onClick={()=>handleShow("EditMotherTongue",MotherToungeList)} style={{ marginRight: '50px' }}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="" className="bi bi-pencil-square" viewBox="0 0 16 16" >
                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                          </svg>
                        </Link>
                   
                        <Link onClick={()=>handleShow("DeleteMotherTongue",MotherToungeList)} style={{ marginRight: '40px' }}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="" className="bi bi-trash" viewBox="0 0 16 16">
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                          </svg>
                        </Link>
                        </div>
                        <div><b><h6>{MotherToungeList.motherTongue}</h6></b></div>
                  </div>
                
                </div>
              ))}
            </div>
        </div>



        <div>
      
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <form onSubmit={onsubmit} >
        <Modal.Body>
          <div className="form-group">
          <h5>{subtitle}</h5>
            {type}
            <input  className="form-control" type="text" name="motherTongue" id="motherTongue" placeholder="Enter the MotherTongue" value={formData.motherTongue} onChange={onchange}/>
          </div>
         
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            {button1}
          </Button>
          <Button type="submit"  variant={variant} onClick={handleClose}>
            {button2}
          </Button>
        </Modal.Footer>
        </form>
      </Modal>

        </div>
    </>)
}