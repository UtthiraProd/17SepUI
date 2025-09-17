import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import { getAllDistricts,createdistricts,resetcreateDistrict,
  resetUpdateDistrict,updateDistrict,getByDistrictName,deleteDistrict,resetDeleteDistrict
 } from "../../Features/Slices/masterSlice"

import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/esm/Button" 
import { ValidateFields } from "../../Validation/Common/fieldValidation"
var districtvalidation = require('../../Validation/Config/Configuration.json')

export function DistrictList(){

const dispatch = useDispatch()  
const navigate=useNavigate()

const [formData,setFormData]=useState({
  district:''
  })

  const {district}=formData

  const onchange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const [mode,setMode] = useState (false)
  const [show,setShow] = useState (false)
  const [currentdistrict,setcurrentdistrict]= useState (null)

const{iscreateDistrictSuccess,iscreateDistrictLoading,createDistrictMessage,districts,isDistrictListLoading,isDistrictListSuccess,
  isUpdateDistrictSuccess,isUpdateDistrictMessage,isupdateDistrictLoading,updateDistrictMessage,isDeleteDistrictLoading,isDeleteDistrictSuccess,
  DeleteDistrictMessage,isGetByDistrictNameLoading,isGetByDistrictNameSuccess,isGetByDistrictNameError
}=useSelector((state)=>state.master)

const onsubmit = (e) => {
  e.preventDefault();
  
      if (mode == "Add"){

         let hasRequiredfieldValidation = false
         let hasOtherfieldValidation = false

              const districts = {district}

              for (const [key,value] of Object.entries(districts)){
                if(value === ''){
                  hasRequiredfieldValidation = true;
                  return toast.error("Please Fill all (*) required field")
        
                }
              }

      const districtdata = {district} 

        if(hasRequiredfieldValidation === false){
              for (const [key,value] of Object.entries(districtdata)){
                let arrValidation = districtvalidation.filter(ValidatePlan =>ValidatePlan.fieldName ===key)
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
      dispatch(createdistricts(districtdata))
      }
    }
     if(mode == "Edit District"){

       let hasRequiredfieldValidation = false
         let hasOtherfieldValidation = false

              const districts = {district}

              for (const [key,value] of Object.entries(districts)){
                if(value === ''){
                  hasRequiredfieldValidation = true;
                  return toast.error("Please Fill all (*) required field")
        
                }
              }

      const districtdata = {district} 

        if(hasRequiredfieldValidation === false){
              for (const [key,value] of Object.entries(districtdata)){
                let arrValidation = districtvalidation.filter(ValidatePlan =>ValidatePlan.fieldName ===key)
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
      if(currentdistrict && currentdistrict._id)
        dispatch (updateDistrict({id:currentdistrict._id,district:district}))
    }
    }
    if(mode == "Delete District")
      {
      if(currentdistrict.district == district){
        dispatch(deleteDistrict({id:currentdistrict._id,district}));
      }
      else{
        toast.error("The name you entered doesn't match. Please try again.")
      }
    }
    
}

const DistrictName = (e)=>{
  if(e.target.value !=undefined && e.target.value !=null && e.target.value.length>2){
     dispatch(getByDistrictName(e.target.value))
  }
  else
   if(e.target.value.length == 0){
    dispatch(getAllDistricts())
  }
}

useEffect(()=>{
    if(isDistrictListLoading == false && isDistrictListSuccess == false){
        dispatch(getAllDistricts())
      }
      if (mode=="Add"){

        if(iscreateDistrictSuccess== true){
          toast.success(createDistrictMessage)
          dispatch(resetcreateDistrict())
          dispatch(getAllDistricts())
        }
        else if(iscreateDistrictSuccess == false && createDistrictMessage){
                toast.error(createDistrictMessage)
                dispatch(resetcreateDistrict())
              }
      }

      if (mode == "Edit District"){
        if(isUpdateDistrictSuccess == true && updateDistrictMessage){
          toast.success(updateDistrictMessage)
          dispatch(resetUpdateDistrict())
          dispatch(getAllDistricts())
        } 
        else if(isUpdateDistrictSuccess == false && updateDistrictMessage){
          toast.error(updateDistrictMessage)
        }
      }
      if(mode == "Delete District"){
        if(isDeleteDistrictSuccess == true && DeleteDistrictMessage){
          toast.success(DeleteDistrictMessage)
          dispatch(resetDeleteDistrict())
          dispatch(getAllDistricts())
        }
        else if (isDeleteDistrictSuccess == false && DeleteDistrictMessage){
          toast.error(DeleteDistrictMessage)
        }
      }
      
    },[iscreateDistrictSuccess,iscreateDistrictLoading,createDistrictMessage,districts,isDistrictListLoading,isDistrictListSuccess,
      isUpdateDistrictSuccess,isupdateDistrictLoading,updateDistrictMessage,isDeleteDistrictLoading,isDeleteDistrictSuccess,DeleteDistrictMessage,
      isGetByDistrictNameLoading,isGetByDistrictNameSuccess,isGetByDistrictNameError
    ],dispatch)

    const backViewDetailsUrl ='/ProfileList'

    const onbackClick = (e) => {
      e.preventDefault();
      navigate(backViewDetailsUrl)    
    }

    const [ModelPopupData,setModePopupData] = useState({
      title:"Add District",
      subtitle:"District",
      button1:"Cancel",
      button2:"Submit"
    })

    const{title,subtitle,button1,button2,variant,text} = ModelPopupData

    const handleClose = () =>setShow(false);

    const handleShow = (popuptype,district)=>{
      setShow(true)
      setMode(popuptype)
      if(popuptype == "Add"){
        setModePopupData({
      title:"Add District",
      subtitle:"District",
      button1:"Cancel",
      button2:"Add",
      variant:"success"
        })
        setFormData("")
      }
      else{
        setModePopupData({
          title:"Delete District",
          subtitle:"Delete",
          button1:"Cancel",
          button2:"Delete",
          variant:"danger",
          // text:"This will permanently delete the district '"+(district.district)+"' Please re-enter the district name to confirm."
          text:  <p>
            This will permanently delete the district{' '}
            <strong style={{ color: 'red' }}>"{district.district}"</strong>. Please re-enter the
            district name to confirm.
            </p>
        })
        setFormData('')
        setcurrentdistrict(district)
      }
      if (popuptype == "Edit District"){
        setModePopupData({
          title:"Edit District",
          subtitle:"Edit",
          button1:"Cancel",
          button2:"Save",
          variant:"success"
           })
           setcurrentdistrict(district)
           setFormData(district)
      }
    }


  return(<>

<Link onClick={onbackClick} className="text-success text-decoration-none"><h3>Home<svg xmlns="http://www.w3.org/2000/svg"  width="25" height="25" fill="currentColor" class="bi bi-house-fill" viewBox="0 0 15 18">
    <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L8 2.207l6.646 6.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293z"/>
    <path d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293z"/>
  </svg></h3></Link>

<nav class="navbar navbar-light">
  <a class="navbar-brand "><h3>Districts</h3></a>
  <div className="d-flex">
    <input class="form-control  border-success rounded-0" type="text" placeholder="Search (min. 3 letters)" id="search" name="search" onChange={DistrictName} aria-label="Search"/>
    <button class="btn btn-success rounded-0 me-2 my-sm-0" type="submit"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
</svg></button>

<button className="btn btn-outline-success col-4" type="submit" onClick={()=>handleShow("Add")}>Add more</button>

  </div>
</nav>

 <div className="container-fluid py-0">
 <div className="row row-cols-1 row-cols-lg-3 g-3 g-lg-3">
  {districts.map((DistrictList,index)=>(
    <div key={index} className="col">
      <div  className="p-3 border border-dark rounded" >
      District
        <div className="float-end">

<Link onClick={()=>handleShow("Edit District",DistrictList)} style={{marginLeft:'50px'}}>
       <svg  xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="" class="bi bi-pencil-square" viewBox="0 0 16 16">
  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
  <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
</svg></Link>

<Link onClick={()=>handleShow("Delete District",DistrictList)} style={{marginLeft:'30px'}}>
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="" className="bi bi-trash" viewBox="0 0 16 16">
  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
  </svg></Link>

</div>
 <div><b><h6>{DistrictList.district}</h6></b></div> </div>
      
    </div>
  ))}
 </div>
 </div>

 <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <form onSubmit={onsubmit}>
        <Modal.Body>
          <div className="form-group">
          <h2>{subtitle}</h2>
          {text}
            <input  className="form-control" type="text" name="district" id="district" value={formData.district} placeholder="Enter the District" onChange={onchange} />
          </div>
         
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
          {button1}
          </Button>
          <Button type="submit"variant={variant} onClick={handleClose}>
         {button2}
          </Button>
        </Modal.Footer>
        </form>
      </Modal>

  </>)
}