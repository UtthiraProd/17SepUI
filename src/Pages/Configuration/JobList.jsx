import { useState,useEffect} from "react"
import { useSelector,useDispatch } from "react-redux"
import{getAllJobs,createjob,resetcreatejob,resetgetalljob, deleteJob,resetdeletejob,updatejob,getJobByName,resetupdatejob} from '../../Features/Slices/masterSlice'
import { Link, useNavigate, useSearchParams } from "react-router-dom"
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';   
import { toast } from "react-toastify";

import { ValidateFields } from "../../Validation/Common/fieldValidation"
var CreateJob = require('../../Validation/Config/Configuration.json')


export function JobList(){
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const [searchParams]=useSearchParams();
    
    
    const JobId=searchParams.get('id')
    // console.log(JobId)

const{isJobListLoading,isJobListSuccess,jobs,isCreateJobLoading,isCreateJobSuccess,CreateJobMessage,
      isDeleteJobSuccess,isDeleteJobLoading,DeleteJobMessage,isDeleteJobError,isupdatejobLoading,isupdatejobSuccess,
      UpdatejobMesssage,isjobByIdLoading,isjobByIdSuccess,isgetJobByNameLoading,isgetJobByNameSuccess}=useSelector((state)=>state.master)


useEffect(()=>{
if(isJobListLoading ===false && isJobListSuccess === false)
  {dispatch(getAllJobs()) }

if(mode=="Add"){

if(isCreateJobSuccess && CreateJobMessage){
  toast.success(CreateJobMessage)
  dispatch(resetgetalljob())
  dispatch(resetcreatejob())
}
else if (CreateJobMessage && isCreateJobSuccess == false)
{
  toast.error(CreateJobMessage)
  dispatch(resetcreatejob())
}
}

  else{
    if(isDeleteJobSuccess && DeleteJobMessage){
      toast.success(DeleteJobMessage);
      dispatch(resetgetalljob());
      dispatch(resetdeletejob());
    }
    else if (!isDeleteJobSuccess && DeleteJobMessage)
    {
    toast.error(DeleteJobMessage);
    return
    }
  }

  if(mode=="EditJob"){
    if (isupdatejobSuccess==true) {
      toast.success(UpdatejobMesssage); 
      dispatch(resetgetalljob());
      dispatch(resetupdatejob());
    } 
     else if(UpdatejobMesssage && isupdatejobSuccess==false) 
      {
      toast.error(UpdatejobMesssage);
      dispatch(resetupdatejob());
     }
  }

},[isJobListLoading,isJobListSuccess,jobs,isCreateJobLoading,isCreateJobSuccess,CreateJobMessage,
     isDeleteJobSuccess,isDeleteJobLoading,DeleteJobMessage,isupdatejobLoading,isupdatejobSuccess,
     UpdatejobMesssage,isjobByIdLoading,isjobByIdSuccess,isgetJobByNameSuccess,isgetJobByNameLoading,isDeleteJobError],dispatch)



const backViewDetailsUrl ='/ProfileList'
const onbackClick = (e) => {
  e.preventDefault();
  navigate(backViewDetailsUrl)
}                                                                                               

const [mode,setMode]=useState(false);
const [show,setShow]=useState(false);
const[currentjob,setcurrentjob]=useState();


const [ModelPopupData, setModePopupData]=useState({
  title:"Add Job",
  subtitle:"Job",
  button1:"Cancel",
  button2:"Submit"
})

const{title,subtitle,button1,button2,variant,text}=ModelPopupData


const handleJobSearch=(e)=>{

  if(e.target.value !=undefined && e.target.value !=null && e.target.value.length>2)
  {
     dispatch(getJobByName(e.target.value))
  }
  else if( e.target.value.length == 0)
  {
    dispatch(getAllJobs())
  }

}

const handleClose =()=>setShow(false);

const handleShow=(popuptype,job)=>{
  // console.log(job)
  setShow(true)
  setMode(popuptype)
  if(popuptype =="Add"){
    setModePopupData({
      title:"Add Job",
      subtitle:"Add",
      button1:"Cancel",
      button2:"Add",
      variant:"success"
    })
    setFormData("")
  }
  else 
   
     if("DeleteJob"){
    setModePopupData({
      title:"Delete Job",
      subtitle:"Delete",
      button1:"Cancel",
      button2:"Delete",
      variant:"danger",
      // text: 'This will permanently delete the caste "' + (job.job) + '" Please re-enter the caste name to confirm.'
      text:  <p>
    This will permanently delete the job{' '}
    <strong style={{ color: 'red' }}>"{job.job}"</strong>. Please re-enter the
    job name to confirm.
  </p>
    })
    setcurrentjob(job) 
    setFormData ("") 
                   
  }

  if(popuptype =="EditJob"){
    setModePopupData({
      title:"Edit Job",
      subtitle:"Edit",
      button1:"Cancel",
      button2:"Save",
      variant:"success"
    })
        setcurrentjob(job) 
        setFormData (job)
  }
}

const[formData,setFormData]=useState({
  job:''
})

const{job}=formData;
const onchange=(e)=>{
setFormData((prevState)=>({
  ...prevState,
  [e.target.name]:e.target.value
}))
}
// const [searchdata,setSearchData]=useState({
//   job:''
// })

// const{job}=searchdata


const onsubmit=(e)=>{
  e.preventDefault();

  if(mode=="Add")
  {

    let hasRequiredfieldValidation = false
    let hasOtherfieldValidation = false

    const jobReqField = {job}

    for (const [key,value] of Object.entries(jobReqField)){
      if(value === ''){
        hasRequiredfieldValidation = true;
        return toast.error("Please Fill all (*) required field")

      }
    }

    const jobsubmit ={job}

    if(hasRequiredfieldValidation === false){
      for (const [key,value] of Object.entries(jobsubmit)){
        let arrValidation = CreateJob.filter(ValidatePlan =>ValidatePlan.fieldName ===key)
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
    dispatch(createjob(jobsubmit))}

    }

   else
    if (mode == "DeleteJob"){
         if (currentjob.job == job) {
          dispatch(deleteJob({ id: currentjob._id,job})); 
           }
           else{
            toast.error("The name you entered doesn’t match. Please try again.")
           }
  }
  if(mode=="EditJob"){

    let hasRequiredfieldValidation = false
    let hasOtherfieldValidation = false

    const jobReqField = {job}

    for (const [key,value] of Object.entries(jobReqField)){
      if(value === ''){
        hasRequiredfieldValidation = true;
        return toast.error("Please Fill all (*) required field")

      }
    }

    const jobsubmit ={job}

    if(hasRequiredfieldValidation === false){
      for (const [key,value] of Object.entries(jobsubmit)){
        let arrValidation = CreateJob.filter(ValidatePlan =>ValidatePlan.fieldName ===key)
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
    if (currentjob && currentjob._id) 
      dispatch(updatejob({id:currentjob._id,job}))}
  }
}


return(<>

<Link onClick={onbackClick} className="text-success text-decoration-none"><h3>Home<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-house-door" viewBox="0 0 15 18">
  <path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4z"/>
</svg></h3></Link>
  
<nav className="navbar navbar-light">
  <div className="container-fluid">
    <a className="navbar-brand"><h3>Jobs</h3></a>
    <div className="d-flex">
      <input className="form-control border-success rounded-0" id="search" name="search" type="text" placeholder="Search (min. 3 letters)"  onChange={handleJobSearch} aria-label="Search"/>

      <button className="btn btn-success me-2 rounded-0"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
</svg></button>

      <button className="btn btn-outline-success col-4" type="submit" onClick={()=>handleShow("Add")} >Add Job</button>
    </div>
  </div>
</nav>

<div className="container py-0">
  <div className="">
    <div className="row row-cols-1 row-cols-lg-3 g-2 g-lg-3">
        {jobs.map((jobs,index)=>(
         <div key={index} className="col">
          <div className="p-3 border border-dark rounded ">
            Job <Link onClick={()=>handleShow("EditJob",jobs)} style={{marginLeft:'250px'}}>
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="" className="bi bi-pencil-square" viewBox="0 0 16 16">
  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
  <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
</svg>
</Link>
<Link onClick={()=>handleShow("DeleteJob",jobs)} style={{marginLeft:'40px'}}>
<svg  xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="" className="bi bi-trash" viewBox="0 0 16 16">
  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
</svg>
</Link> <br />
          
           <b>{jobs.job} </b>        
          </div>
           </div>
        ))}
    </div>
  </div>
</div>


<Modal show={show} onHide={handleClose} >
        <Modal.Header closeButton onClick={handleClose}>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <form onSubmit={onsubmit}>
        <Modal.Body>
          <div className="form-group">
          <h4>{subtitle}</h4>
          {text}
            <input  className="form-control" type="text" name="job" id="job" placeholder="Enter the job" value={formData.job} onChange={onchange}/>
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
