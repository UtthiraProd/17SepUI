import { useSelector } from "react-redux"
import { createreligion, getAllReligions,resetcreatereligion,resetgetallreligion,
         updatereligion,resetupdatereligion,deletereligion,resetdeletereligion,
         getByReligionName} from "../../Features/Slices/masterSlice"
import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/esm/Button"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { ValidateFields } from "../../Validation/Common/fieldValidation"
var religionvalidation = require('../../Validation/Config/Configuration.json')

export function ReligionList(){

  const dispatch = useDispatch ()
  const navigate = useNavigate ()

  
  const [formData,setFormData]=useState({
     religion:''
  })

  const {religion}=formData
  
  const onchange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const onsubmit = (e) => {
    e.preventDefault();

    if (mode == "Add"){

       let hasRequiredfieldValidation = false
       let hasOtherfieldValidation = false

              const religions = { religion }

              for (const [key,value] of Object.entries(religions)){
                if(value === ''){
                  hasRequiredfieldValidation = true;
                  return toast.error("Please Fill all (*) required field")
        
                }
              }

    const religionData = {religion} 

     if(hasRequiredfieldValidation === false){
                  for (const [key,value] of Object.entries(religionData)){
                    let arrValidation = religionvalidation.filter(ValidatePlan =>ValidatePlan.fieldName ===key)
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

    if (!hasRequiredfieldValidation && !hasOtherfieldValidation)   {         
    dispatch(createreligion(religionData))
    }
  }

  else if (mode == "Edit Religion"){

      let hasRequiredfieldValidation = false
       let hasOtherfieldValidation = false

              const religions = { religion }

              for (const [key,value] of Object.entries(religions)){
                if(value === ''){
                  hasRequiredfieldValidation = true;
                  return toast.error("Please Fill all (*) required field")
        
                }
              }

    const religionData = {religion} 

      if(hasRequiredfieldValidation === false){
                  for (const [key,value] of Object.entries(religionData)){
                    let arrValidation = religionvalidation.filter(ValidatePlan =>ValidatePlan.fieldName ===key)
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
      if(currentreligion && currentreligion._id)
        dispatch (updatereligion({id:currentreligion._id,religion:religion}))
      }
    }
 if (mode == "Delete Religion")
    {
      if(currentreligion.religion==religion){
      dispatch(deletereligion({id:currentreligion._id,religion:religion}));  
      } 
      else{
        toast.error("The name you entered doesn't match. Please try again.")
      }   
    }
}

const [mode,setMode] = useState (false);
const [show,setShow] = useState (false);
const [currentreligion,setcurrentreligion] = useState (null);

  const{isGetAllReligionLoading,isGetAllReligionSuccess,religionsList,
    isCreateReligionSuccess,CreateReligionMessage,isUpdateReligionSuccess,
    UpdateReligionMessage,isDeleteReligionSuccess,DeleteReligionMessage}=useSelector((state)=>state.master)            
  
  useEffect(()=>{
    if(isGetAllReligionLoading == false && isGetAllReligionSuccess == false){
        dispatch(getAllReligions())
      }
      if (mode=="Add"){

     if(isCreateReligionSuccess ==true && CreateReligionMessage){
          toast.success(CreateReligionMessage)
          dispatch(resetcreatereligion())
          dispatch(resetgetallreligion())  
        }
      else if(isCreateReligionSuccess == false && CreateReligionMessage)
        toast.error(CreateReligionMessage)
          dispatch(resetcreatereligion())
      }
      if(mode == "Edit Religion"){

        if(isUpdateReligionSuccess == true && UpdateReligionMessage){
          toast.success(UpdateReligionMessage)
          dispatch(getAllReligions())
          dispatch(resetupdatereligion())
        }
        else if (isUpdateReligionSuccess == false && UpdateReligionMessage)
          toast.error(UpdateReligionMessage)
                  dispatch(getAllReligions())
          dispatch(resetupdatereligion())
      }
      if (mode == "Delete Religion"){

        if(isDeleteReligionSuccess == true && DeleteReligionMessage){
          toast.success(DeleteReligionMessage)
          dispatch(getAllReligions())
          dispatch(resetdeletereligion())
        }
        else if (isDeleteReligionSuccess == false && DeleteReligionMessage)
          toast.error(DeleteReligionMessage)
        }
  
    
  },[isGetAllReligionLoading,isGetAllReligionSuccess,religionsList,
    isCreateReligionSuccess,CreateReligionMessage,isUpdateReligionSuccess,
    UpdateReligionMessage,isDeleteReligionSuccess,DeleteReligionMessage],dispatch)

  const backViewDetailsUrl ='/ProfileList'

  const onbackClick = (e) => {
    e.preventDefault();
    navigate(backViewDetailsUrl)    
  }

  const [ModelPopupData,setModePopupData] = useState({
    title:"Add Religion",
    subtitle:"Religion",
    button1:"Cancel",
    button2:"Submit"
  })
  
  const{title,subtitle,button1,button2,variant,text} = ModelPopupData

  const handleClose = () =>setShow(false);

  const handleShow = (popuptype,  religion)=>{
    setShow(true)
    setMode(popuptype)
    if(popuptype == "Add"){
      setModePopupData({
        title:"Add Religion",
        subtitle:"Add",
        button1:"Cancel",
        button2:"Add",
        variant:"success"
      })
      setFormData("")
    }

    else{
      setModePopupData({
        title:"Delete Religion",
        subtitle:"Delete",
        button1:"Cancel",
        button2:"Delete",
        variant:"danger",
        // text:"This will permanently delete the religion '"+(religion.religion)+"'. Please re-enter the religion name to confirm."
        text:  <p>
            This will permanently delete the religion{' '}
            <strong style={{ color: 'red' }}>"{religion.religion}"</strong>. Please re-enter the
            religion name to confirm.
            </p>
      })
      setcurrentreligion(religion)
      setFormData('')
    }

    if(popuptype == "Edit Religion"){
      setModePopupData({
        title:"Edit Religion",
        subtitle:"Edit",
        button1:"Cancel",
        button2:"Save",
        variant:'success'
      })
      setcurrentreligion(religion)
      setFormData(religion)
    }
  }

  const religionSearch = (e) =>{
    if(e.target.value != undefined && e.target.value !=null && e.target.value.length>2)
    {
      dispatch(getByReligionName(e.target.value))
    }
    else if(e.target.value.length == 0){
      dispatch(getAllReligions())
    }
  }

  return(<>
  <Link onClick={onbackClick} className="text-success text-decoration-none"><h3>Home<svg xmlns="http://www.w3.org/2000/svg"  width="25" height="25" fill="currentColor" class="bi bi-house-fill" viewBox="0 0 15 18">
    <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L8 2.207l6.646 6.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293z"/>
    <path d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293z"/>
  </svg></h3></Link>

  <nav class="navbar navbar-light justify-content-between">
  <a class="navbar-brand "><h3>Religion</h3></a>
  <div className="d-flex">
    <input class="form-control  border-success rounded-0" type="text" id="search" name="search" placeholder="Search (min. 3 letters)" onChange={religionSearch} aria-label="Search"/>

    <button class="btn btn-success rounded-0 me-2 my-sm-0" type="submit"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
</svg></button>

<button className="btn btn-outline-success col-4" type="submit" onClick={()=>handleShow("Add")}>Add more</button>

  </div>
</nav>

   
<div className="container-fluid py-0">
  <div className="row row-cols-1 row-cols-lg-3 g-3 g-lg-3">
  {religionsList.map((religionList,index)=>(
    <div key={index} className="col">
    <div className="p-3 border border-dark rounded">

      Religion

      <div className="float-end">
      <Link onClick={()=>handleShow("Edit Religion",religionList)} style={{ marginRight: '50px' }}>
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="" className="bi bi-pencil-square" viewBox="0 0 16 16">
  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
  <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
  </svg>
  </Link>

  <Link onClick={()=>handleShow("Delete Religion",religionList)} style={{ marginRight: '40px' }}>
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="" className="bi bi-trash" viewBox="0 0 16 16">
  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
  </svg>
  </Link>
  </div>
  <div><b><h6>{religionList.religion}</h6></b></div>             
    </div>
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
            <input  className="form-control" type="text" name="religion" id="religion" value={formData.religion} placeholder="Enter the Religion" onChange={onchange} />
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