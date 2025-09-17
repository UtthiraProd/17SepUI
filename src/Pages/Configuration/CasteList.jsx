import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { useEffect } from "react"
import {getAllCastes,createcaste,resetCreateCaste,resetgetallCaste,resetDeleteCaste,deleteCaste,
  resetupdatecaste,updateCaste,getByCasteName} from "../../Features/Slices/masterSlice"
import { useDispatch } from "react-redux"
import { useState } from "react"
import { toast } from "react-toastify"
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom"
import { useSearchParams } from "react-router-dom"

import { ValidateFields } from "../../Validation/Common/fieldValidation"
var CreateCaste = require('../../Validation/Config/Configuration.json')


export function CasteList(){

    const dispatch = useDispatch ()
    const navigate = useNavigate ()
    const [searchParams] = useSearchParams ()

    const CasteId = searchParams.get('id')
    // console.log(CasteId)
    
    const [formData,setFormData]=useState({
        caste:''
    })

  const {caste}=formData

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

          const casteReqField = {caste}

          for (const [key,value] of Object.entries(casteReqField)){
            if(value === ''){
              hasRequiredfieldValidation = true;
              return toast.error("Please Fill all (*) required field")
    
            }
          }

        const Castesubmit = { caste }


        if(hasRequiredfieldValidation === false){
          for (const [key,value] of Object.entries(Castesubmit)){
            let arrValidation = CreateCaste.filter(ValidatePlan =>ValidatePlan.fieldName ===key)
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
        dispatch(createcaste(Castesubmit))
        }}

      else
      if (mode == "DeleteCaste"){
        if(currentcaste.caste == caste){
          dispatch(deleteCaste({id:currentcaste._id,caste}))
          console.log(currentcaste)
           }
           else{
            toast.error("The name you entered doesn’t match. Please try again.")
           }
         }

        if (mode == "EditCaste"){

          let hasRequiredfieldValidation = false
          let hasOtherfieldValidation = false

          const casteReqField = {caste}

          for (const [key,value] of Object.entries(casteReqField)){
            if(value === ''){
              hasRequiredfieldValidation = true;
              return toast.error("Please Fill all (*) required field")
    
            }
          }

          const Castesubmit = { caste }


          if(hasRequiredfieldValidation === false){
            for (const [key,value] of Object.entries(Castesubmit)){
              let arrValidation = CreateCaste.filter(ValidatePlan =>ValidatePlan.fieldName ===key)
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
          if(currentcaste && currentcaste._id){
            dispatch(updateCaste({id:currentcaste._id,caste}))
            console.log(updateCaste)
          }}
        }

      }
    

    const{isGetAllCasteLoading,isGetAllCasteSuccess,GetAllcasteslist,
      isCreateCasteLoading,isCreateCasteSuccess,CreateCasteMessage,
      isDeleteCasteLoading,isDeleteCasteSuccess,DeleteCasteMessage,
      isUpdateCasteLoading,isUpdateCasteSuccess,UpdateCasteMessage}=useSelector((state)=>state.master)

    useEffect(()=>{
        if(isGetAllCasteLoading == false && isGetAllCasteSuccess == false){
            dispatch(getAllCastes())
        }

        if(mode == "Add"){
        if(isCreateCasteSuccess == true && CreateCasteMessage){
            toast.success(CreateCasteMessage)
            dispatch(resetCreateCaste())
            dispatch(resetgetallCaste())
        }
        else 
        if(isCreateCasteSuccess == false && CreateCasteMessage  ){
          toast.error(CreateCasteMessage)
           dispatch(resetCreateCaste())
           dispatch(resetgetallCaste())
        }
      }

        if (mode == "DeleteCaste") {
          if(isDeleteCasteSuccess == true &&  DeleteCasteMessage){
             toast.success(DeleteCasteMessage)
             dispatch(resetDeleteCaste())
             dispatch(resetgetallCaste())
          }

          else
          if(isDeleteCasteSuccess == false && DeleteCasteMessage){
            toast.error(DeleteCasteMessage)
             dispatch(resetDeleteCaste())
             dispatch(resetgetallCaste())
          }
        }
       
       if(mode == "EditCaste"){
       if(isUpdateCasteSuccess == true && UpdateCasteMessage ){
        toast.success(UpdateCasteMessage)
        dispatch(resetupdatecaste())
        dispatch(resetgetallCaste())
       }

       else
       if(isUpdateCasteSuccess == false && UpdateCasteMessage){
        toast.error(UpdateCasteMessage)
        dispatch(resetupdatecaste())
        dispatch(resetgetallCaste())
       }
      }
    
        // setTimeout(()=>{dispatch(getAllCastes())},1000);
    },[isGetAllCasteLoading,isGetAllCasteSuccess,GetAllcasteslist,
      isCreateCasteLoading,isCreateCasteSuccess,CreateCasteMessage,
      isDeleteCasteLoading,isDeleteCasteSuccess,DeleteCasteMessage,
      isUpdateCasteLoading,isUpdateCasteSuccess,UpdateCasteMessage],dispatch)


    const backViewDetailsUrl ='/ProfileList'
    const onbackClick = (e) => {
      e.preventDefault();
      navigate(backViewDetailsUrl)    
    }
    
    
    const [mode,setMode] = useState (false);
    const [show,setShow] = useState (false);
    const [currentcaste,setcurrentcaste] = useState (null)

    const [ModelPopupData,setModePopupData] = useState({
      title:"Add Caste",
      subtitle:"Caste",
      button1:"Cancel",
      button2:"Submit"
    })
    
    const{title,subtitle,button1,button2,variant,type} = ModelPopupData

    const handleClose = () =>setShow(false);

    const handleShow = (popuptype,caste)=>{
      console.log(caste)
      setShow(true)
      setMode(popuptype)
      if(popuptype == "Add"){
        setModePopupData({
          title:"Add Caste",
          subtitle:"Caste",
          button1:"Cancel",
          button2:"Add",
          variant:"success"
        })
        setFormData("")
      }

      else{

        if (popuptype =="DeleteCaste"){
        setModePopupData({
          title:"Delete Caste",
          subtitle:"Delete",
          button1:"Cancel",
          button2:"Delete",
          variant:"danger",
          type: <p>
    This will permanently delete the caste{' '}
    <strong style={{ color: 'red' }}>"{caste.caste}"</strong>. Please re-enter the
    caste name to confirm.
  </p>
        })
        setcurrentcaste(caste)
        setFormData("")
      }}

      if(popuptype == "EditCaste"){
        setModePopupData({
          title:"Edit Caste",
          subtitle:"Edit",
          button1:"Cancel",
          button2:"Save",
          variant:'success'
        })
        setcurrentcaste(caste)
        setFormData(caste)
      }
    }

    const handleCasteSearch =(e)=>{
      if(e.target.value !=undefined && e.target.value !=null && e.target.value.length>2)
      {
        dispatch(getByCasteName(e.target.value))
      }
      else if(e.target.value.length == 0)
      {
        dispatch(getAllCastes())
      }
    }


    return(<>
        
<Link onClick={onbackClick}className="text-success text-decoration-none"><h3>Home<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-house-fill" viewBox="0 0 15 18">
  <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L8 2.207l6.646 6.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293z"/>
  <path d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293z"/>
</svg></h3> </Link>

<nav className="navbar navbar-light">
<div className="container-fluid">
        <a className="navbar-brand"><h3>Caste</h3></a>
        <div className="d-flex">
          <input className="form-control border-success rounded-0 " type="text"  id="search" name="search" placeholder="Search (min. 3 letters)" onChange={handleCasteSearch} aria-label="Search"/>

          <button className="btn btn-success me-2 rounded-0"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
          </svg></button>

          <button className="btn btn-outline-success col-4" type="submit" onClick={()=>handleShow("Add")} >Add more</button>
        </div>
      </div>
</nav>

<div className="container-fluid py-0">
        <div className="row row-cols-1 row-cols-lg-3 g-3 g-lg-3">
          {GetAllcasteslist.map((CasteList,index) => (
            <div key={index} className="float-end">
              <div className="p-3 border border-dark rounded ">
                Caste
               
                
                  <div className="float-end">
                    <Link onClick={()=>handleShow("EditCaste",CasteList)} style={{ marginRight: '50px' }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="" className="bi bi-pencil-square" viewBox="0 0 16 16">
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                      </svg>
                    </Link>
               
                    <Link onClick={()=>handleShow("DeleteCaste",CasteList)} style={{ marginRight: '40px' }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="" className="bi bi-trash" viewBox="0 0 16 16">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                      </svg>
                    </Link>
                    </div>
                    <div><b><h6>{CasteList.caste}</h6></b></div>
              </div>
            
            </div>
          ))}
        </div>
    </div>

  {(isCreateCasteLoading || isDeleteCasteLoading || isUpdateCasteLoading || isGetAllCasteLoading) && (
    
  <div className="overlay">
    <div className="loading-spinner"></div>
  </div>
)}
   
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <form onSubmit={onsubmit}>
        <Modal.Body>
          <div className="form-group">
          <h4>{subtitle}</h4>
          <h6>{type}</h6>
            <input  className="form-control" type="text" name="caste" id="caste" placeholder="Enter the Caste" value={formData.caste}  onChange={onchange} />
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