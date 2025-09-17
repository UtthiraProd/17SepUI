import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import {createPlan,getAllPlan,reset,getBrokerId,updatePlan,deletePlan} from "../../Features/Slices/planSlice"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import "../../scss/resetPassword.css";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { ValidateFields } from "../../Validation/Common/fieldValidation"
var CreateUserPlan = require('../../Validation/Config/AddEditUserPlan.json')

export function CreatePlan(){
   const dispatch = useDispatch()

   const [currentPage, setCurrentPage] = useState(1);

   const PLAN_FOR = "Broker"

   const [formData, setFormData] = useState({
      planName:'',
      isActive:'',
      planFor:'',
      brokerId:'',
      planPeriod:'',
      planDuration:'',
      planCost:'',
      viewPerNoOfdays:'',
      viewCountLimit:'',
      downloadCountLimit:'',
      viewImageCountLimit:''
   })

   const {planName,isActive,planFor,brokerId,planPeriod,planDuration,planCost,viewPerNoOfdays,viewCountLimit,downloadCountLimit,viewImageCountLimit} = formData

  const onchange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
        ...prevState,
        [name]: type === 'checkbox' ? checked : value
    }));
};

   const onsubmit =(e)=>{
      e.preventDefault();

      if(mode ==="Add"){
        let hasRequiredfieldValidation = false
        let hasOtherfieldValidation = false
        let planReqField

        if(planFor == PLAN_FOR)
        {
          planReqField ={planName,isActive,planFor,brokerId,planPeriod,planDuration,planCost,viewPerNoOfdays,viewCountLimit,downloadCountLimit,viewImageCountLimit}
        }
        else{
          planReqField ={planName,isActive,planFor,planPeriod,planDuration,planCost,viewPerNoOfdays,viewCountLimit,downloadCountLimit,viewImageCountLimit}
        }

        for (const [key,value] of Object.entries(planReqField)){
          if(value === ''){
            hasRequiredfieldValidation = true;
            return toast.error("Please Fill all (*) required field")
  
          }
        }

        const planData ={planName,isActive,planFor,brokerId,planPeriod,planDuration,planCost,viewPerNoOfdays,viewCountLimit,downloadCountLimit,viewImageCountLimit}

        if(hasRequiredfieldValidation === false){
          for (const [key,value] of Object.entries(planData)){
            let arrValidation = CreateUserPlan.filter(ValidatePlan =>ValidatePlan.fieldName ===key)
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
        if (!hasRequiredfieldValidation && !hasOtherfieldValidation) {
          dispatch(createPlan(planData))
      }
    }

      else
      if(mode ==="Update"){

        let hasRequiredfieldValidation = false
        let hasOtherfieldValidation = false

        const planReqField ={planName,planFor,brokerId}

        for (const [key,value] of Object.entries(planReqField)){
          if(value === ''){
            hasRequiredfieldValidation = true;
            return toast.error("Please Fill all (*) required field")
  
          }
        }

        const planUpdateData ={planName,isActive,planFor,brokerId,planPeriod,planDuration,planCost,viewPerNoOfdays,viewCountLimit,downloadCountLimit,viewImageCountLimit}

        if(hasOtherfieldValidation === false){
          for (const [key,value] of Object.entries(planUpdateData)){
            let arrValidation = CreateUserPlan.filter(ValidatePlan =>ValidatePlan.fieldName ===key)
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
          if (currentData && currentData._id) {
            dispatch(updatePlan({ id: currentData._id,planName,isActive,planFor,brokerId,planPeriod,planDuration,planCost,viewPerNoOfdays,viewCountLimit,downloadCountLimit,viewImageCountLimit}));
        }
        }
      }

      else
      if(mode ==="Search"){
        const searchData ={planName,planFor,brokerId,planPeriod,planDuration,planCost,viewPerNoOfdays,viewCountLimit,downloadCountLimit,viewImageCountLimit,
          "skip":currentPage,"pagesize":9,
        }
          dispatch(getAllPlan(searchData))
          dispatch(reset())
      }
   }

   const{isPlanCreateLoading,isPlanCreateSuccess,isPlanCreateError,isPlanCreateMessage,isGetAllPlanSuccess,isGetAllPlanLoading,PlanList,
      isBrokerLoading,isBrokerSuccess,isBrokerError,BrokerId,isPlanUpdateLoading,isPlanUpdateSuccess,isPlanUpdateMessage,isPlanUpdateError,isDeleteLoading,
      isDeleteSuccess,isDeleteError,isDeleteMessage,isPlanByNameLoading,isPlanByNameSuccess,totalRecourd,totalRecords,profileImage}= useSelector((state)=>state.plan)

   useEffect(()=>{
  
      if(isPlanCreateSuccess){
         toast.success(isPlanCreateMessage)
         dispatch(reset())
      }
      if(isPlanCreateError){
         toast.error(isPlanCreateMessage)
         dispatch(reset())
      }
      // if(isGetAllPlanLoading==false && isGetAllPlanSuccess ==false){
      //    dispatch(getAllPlan())
      // }

      if(isBrokerLoading === false && isBrokerSuccess === false){
         dispatch(getBrokerId())
      }
      if(isPlanUpdateSuccess){
         toast.success(isPlanUpdateMessage)
         dispatch(reset())
          dispatch(getAllPlan())
      }
      if(isPlanUpdateError){
         toast.success(isPlanUpdateMessage)
         dispatch(reset())
      }

      if(isDeleteSuccess){
         toast.success(isDeleteMessage)
         dispatch(reset())
      }
      if(isDeleteError){
         toast.error(isDeleteMessage)
         dispatch(reset())
      }
     
   },[isPlanCreateLoading,isPlanCreateSuccess,isPlanCreateError,isPlanCreateMessage,isGetAllPlanLoading,isGetAllPlanSuccess,PlanList,
      isBrokerLoading,isBrokerSuccess,isBrokerError,BrokerId,isPlanUpdateLoading,isPlanUpdateSuccess,isPlanUpdateMessage,isPlanUpdateError,isDeleteLoading
      ,isDeleteSuccess,isDeleteError,isDeleteMessage],dispatch)

      const [didGetAllPlan, setDidGetAllPlan] = useState(false);

      useEffect(() => {
        const searchData ={planName,planFor,brokerId,planPeriod,planDuration,planCost,viewPerNoOfdays,viewCountLimit,downloadCountLimit,viewImageCountLimit,
          "skip":currentPage,
          "pagesize":9
        }
        if (!didGetAllPlan && !isGetAllPlanLoading && !isGetAllPlanSuccess) {
          dispatch(getAllPlan(searchData));
          setDidGetAllPlan(true); // stop any further calls
          dispatch(reset())
        }
      }, [dispatch, isGetAllPlanLoading, isGetAllPlanSuccess, didGetAllPlan]);


      const [mode,setMode] = useState (false);
      const [show,setShow] = useState (false);
      const[currentData, setCurrentData] = useState(null)

      const [modelData, setModelData] = useState({
         title:"Add Plan",
         button1:"Add"
      })
      
      const {title,button1} = modelData

      const handleShow = (mode,plan) => {
      setShow(true);
      setMode(mode);
     if (mode === "Add") {
        setModelData({
            title: "Add Plan",
            button1:"Add"
        });
        setFormData({
            planName: '',
            isActive: '',
            planFor: '',
            brokerId: '',
            planPeriod: '',
            planDuration: '',
            planCost: '',
            viewPerNoOfdays: 1,
            viewCountLimit: '',
            downloadCountLimit: '',
            viewImageCountLimit:''
        });
    } 
    else 
    if(mode === "Update"){
        setModelData({
            title: "Edit Plan",
            button1:"Update"
        });
        setFormData({
         planName: plan.planName,
         isActive: plan.isActive,
         planFor: plan.planFor,
         brokerId: plan.brokerId,
         planPeriod: plan.planPeriod,
         planDuration: plan.planDuration,
         planCost: plan.planCost,
         viewPerNoOfdays: plan.viewPerNoOfdays,
         viewCountLimit: plan.viewCountLimit,
         downloadCountLimit: plan.downloadCountLimit,
         viewImageCountLimit:plan.viewImageCountLimit
     });
     setCurrentData(plan);
    }

    if(mode === "Search"){
      setModelData({
        title:"Filter Plan",
        button1:"Search"
      })
      setFormData({
        planName: '',
        planFor: '',
        brokerId: '',
        planPeriod: '',
        planDuration: '',
        planCost: '',
        viewCountLimit: '',
        downloadCountLimit: '',
        viewImageCountLimit:''
    });
    }
};

const handleClose = () => {
    setShow(false);
    setFormData({
        planName: '',
        isActive: '',
        planFor: '',
        brokerId: '',
        planPeriod: '',
        planDuration: '',
        planCost: '',
        viewPerNoOfdays: '',
        viewCountLimit: '',
        downloadCount: '',
        viewImageCountLimit
    });
};


//Delete function
const [view, setView] = useState(false)

const onHandleClose = ()=>setView(false)

const onView =(planName)=>{
   setView(true)
   setCurrentData(planName)
   setFormData("")
}
const onDelete = (e) => {
   e.preventDefault()

  if(currentData.planName === planName){
   dispatch(deletePlan({id:currentData._id,planName}))
  }
  else{
   toast.error("The name you entered doesn't match. Please try again.")
 }
 }

 const [startPage, setStartPage] = useState(1);

 const handleNext = () => {
  if(totalRecourd)
  {
    if (currentPage <totalRecourd) {
      onPageChange(currentPage + 1);
      if (currentPage >= startPage + 4) {
        setStartPage(startPage + 1);
      }
    }
  }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
      if (currentPage <= startPage) {
        setStartPage(startPage - 1);
      }
    }
  };

    const onPageChange = (page) => {
     setCurrentPage(page);

     const searchData ={planName,planFor,brokerId,planPeriod,planDuration,planCost,viewPerNoOfdays,viewCountLimit,downloadCountLimit,viewImageCountLimit,
      "skip":page,"pagesize":9
    }
      dispatch(getAllPlan(searchData))
   };

    return(<>
    <Link className="text-success text-decoration-none"><h5>Home<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-house-fill" viewBox="0 0 15 18">
      <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L8 2.207l6.646 6.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293z"/>
      <path d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293z"/>
    </svg></h5> </Link>
    <div id="dvuPlan">
    <nav className="navbar navbar-light">
    <div className="container-fluid">
        <a className="navbar-brand"><h3>Plans</h3></a>
        <div className="d-flex" style={{marginRight:130}}>
        <button className="btn btn-success col-9 me-4" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight"  onClick={()=>handleShow("Search")} >Filter Plan</button>
        <button className="btn btn-outline-success col-9" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" onClick={()=>handleShow("Add")} >Add Plan</button>
        </div>
      </div>
</nav>


Page {currentPage} of {totalRecourd}
    <div>

<div style={{ display: 'flex', justifyContent: 'left', alignItems: 'left', marginTop: '20px' }}>
  <nav aria-label="Page navigation example">
    <ul className="pagination">
      <li className="page-item" onClick={handlePrevious} disabled={currentPage === 1}>
        <a className="page-link" style={{ backgroundColor: '#ffffff', color: '#1aa179' }} href="#" aria-label="Previous">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>

      {Array.from({ length: Math.min(totalRecourd,5) }, (_, index) => {
        const pageNumber = startPage + index;
        return (
          <li key={pageNumber} className="page-item">
            <button
              className="page-link"
              onClick={() => onPageChange(pageNumber)}
              style={{
                backgroundColor: currentPage === pageNumber ? '#1aa179' : '#ffffff',
                color: currentPage === pageNumber ? 'white' : '#1aa179',
              }}
            >
              {pageNumber}
            </button>
          </li>
        );
      })}

      <li className="page-item" onClick={handleNext} disabled={currentPage ===totalRecourd}>
        <a className="page-link" style={{ backgroundColor: '#ffffff', color: '#1aa179' }} href="#" aria-label="Next">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</div>
</div>


<div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
    <div className="offcanvas-header">
        <h5 className="offcanvas-title" id="offcanvasRightLabel">{title}</h5>
        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close" onClick={handleClose}></button>
    </div>
    <hr />
    <div className="offcanvas-body">
        <form onSubmit={onsubmit}>
            <div className="form-group">
                <label htmlFor="planName" className="mb-1">Plan Name</label>
                <input type="text" name="planName" id="planName" className="form-control p-1" onChange={onchange} value={planName} disabled={mode === "Update"} placeholder="Enter the Plan Name"/>
            </div>
          {(mode ==="Add" || mode === "Update") &&(
            <div>
                <input type="checkbox" name="isActive" id="isActive" className="p-2 check" onChange={onchange}
                checked={isActive === 'true' || isActive === true} />
                <label htmlFor="isActive" className="mx-2">Is Active</label>
            </div>
            )}
            <div className="form-group"> 
                <label htmlFor="planFor" className="mb-1">Plan for</label>
                <select name="planFor" id="planFor" className="form-control p-1" onChange={onchange} value={planFor} disabled={mode === "Update"}>
                    <option value="Select">Select</option>
                    <option value="Broker">Broker</option>
                    <option value="Public">Public</option>
                </select>
            </div>
            {planFor === "Broker" && (
            <div className="form-group">
            <label htmlFor="brokerId" className="mb-1">Broker</label>
            <select className="form-control" name="brokerId" id="brokerId" onChange={onchange} value={brokerId} disabled={mode === "Update"}>
             <option value="">Select</option>
             {BrokerId.map((brokId, index) => (
             <option key={index} value={brokId._id}>{brokId.name}-{brokId.phoneNumber}</option>
            ))}
            </select>
            </div>
            )}
            <div className="form-group">
                <label htmlFor="planPeriod" className="mb-1">Period</label>
                <select name="planPeriod" id="planPeriod" className="form-control p-1" onChange={onchange} value={planPeriod}>
                    <option value="Select">Select</option>
                    <option value="Year">Yearly</option>
                    <option value="Month">Monthly</option>
                    <option value="Week">Weekly</option>
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="planDuration" className="mb-1">Duration</label>
                <input type="text" name="planDuration" id="planDuration" className="form-control p-1" onChange={onchange} value={planDuration} placeholder="Enter Duration"/>
            </div>
            <div className="form-group">
                <label htmlFor="planCost" className="mb-1">Plan Cost(in INR)</label>
                <input type="text" name="planCost" id="planCost" className="form-control p-1" onChange={onchange} value={planCost} placeholder="Enter Plancost" />
            </div>
            <div className="form-group">
                <label htmlFor="viewPerNoOfdays" className="mb-1">View interval (in days)</label>
                <input type="text" name="viewPerNoOfdays" id="viewPerNoOfdays" className="form-control p-1" onChange={onchange} value={1} placeholder="Enter View Days" />
            </div>
            <div className="form-group">
                <label htmlFor="viewCountLimit" className="mb-1">Number of views</label>
                <input type="text" name="viewCountLimit" id="viewCountLimit" className="form-control p-1" onChange={onchange} value={viewCountLimit} placeholder="View Count" />
            </div>
             <div className="form-group">
                <label htmlFor="viewImageCountLimit" className="mb-1">Number of Image views</label>
                <input type="text" name="viewImageCountLimit" id="viewImageCountLimit" className="form-control p-1" onChange={onchange} value={viewImageCountLimit} placeholder="Image view count"/>
            </div>
            <div className="form-group">
                <label htmlFor="downloadCount" className="mb-1">Number of downloads</label>
                <input type="text" name="downloadCountLimit" id="downloadCountLimit" className="form-control p-1" onChange={onchange} value={downloadCountLimit} placeholder="Download Count"/>
            </div>
           
            <div>
                <button type="button" className="btn btn-dark responsive" data-bs-dismiss="offcanvas" aria-label="Close"  style={{ marginLeft: 0 }}>Close</button>
                <button type="submit" className="btn btn-success ms-4 md" data-bs-dismiss="offcanvas" aria-label="Close" style={{ width: 70 }}>
                    {button1}
                </button>
            </div>
        </form>
    </div>
</div>


   <div className="container">
   <div className="row row-cols-1 row-cols-lg-3 g-2 gx-lg-5">
   {PlanList.map((plan,index)=>(
      <div key={index}>
         <div className="row p-2 rounded-2 plan border border-success">
            <div className="col-9">
             <h5 className="float-start text-success" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" 
             onClick={()=>handleShow("Update",plan)}>{plan.brokerName} {plan.planName}</h5></div>
             <div className="col-3">
             <Link onClick={() => handleShow("Update",plan)} className="me-4" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="" className="bi bi-pencil-square" viewBox="0 0 16 16">
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                        <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                      </svg>
                    </Link>
                    <Link onClick={()=>onView(plan)}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="" className="bi bi-trash" viewBox="0 0 16 16">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                      </svg>
                    </Link>
             </div>
             <br /><br />
            <div className="col-6">
             <h6 className="mb-0">Plan Cost</h6>
             <span>₹{plan.planCost}</span>
             <h6 className="mb-0 mt-3">View Limit</h6>
             <span>{plan.viewCountLimit} views everyday</span> 
            </div>
            <div className="col-6 ">
            <h6 className="mb-0" >Duration</h6>
             <span >{plan.planDuration} {plan.planPeriod}</span>
             <h6 className="mb-0 mt-3">Download Limit</h6>
             <span>{plan.downloadCountLimit} downloads everyday</span>
            </div>
         </div>
      </div>
   ))}
   </div>
   </div>

<div className="offcanvas offcanvas-start" data-bs-scroll="true" tabIndex="-1" id="offcanvasWithBothOptions" aria-labelledby="offcanvasWithBothOptionsLabel">
  <div className="offcanvas-header">
    <h5 className="offcanvas-title" id="offcanvasWithBothOptionsLabel">Plan Details</h5>
    <button type="button" className="btn-close"data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>
  <hr />
  <div className="offcanvas-body">
  {currentData && (
        <div className="row">
          <h5 className="text-success">{currentData.brokerName} {currentData.planName} </h5><br /><br />
            <div className="col-6">
            <h6>Active</h6>
            <p>{currentData.isActive ? "True" : "False"}</p>
            </div>
            <div className="col-6">
            <h6>Plan for</h6>
            <p>{currentData.brokerName}</p>
            </div>
            
            <div className="col-6">
            <h6>Plan Cost</h6>
            <p>₹{currentData.planCost}</p>
            </div>
            <div className="col-6">
            <h6>Duration</h6>
            <p>{currentData.planDuration} {currentData.planPeriod}</p>
            </div>
            <div className="col-6">
            <h6>View Limit</h6>
            <p>{currentData.viewCountLimit} Views everyday</p>
            </div>
            <div className="col-6">
            <h6>Download Limit</h6>
            <p> {currentData.downloadCountLimit} Downloads everyday</p>
            </div>
            <button type="button" className="btn btn-dark" data-bs-dismiss="offcanvas" aria-label="Close" style={{width:80, marginLeft:300,marginTop:300}}>Close</button>
        </div>
    )}
  </div>

</div>


<div>  
          <div style={{ display: 'flex', justifyContent: 'left', alignItems: 'left', marginTop: '20px' }}>
            <nav aria-label="Page navigation example">
              <ul className="pagination">
                <li className="page-item" onClick={handlePrevious} disabled={currentPage === 1}>
                  <a className="page-link" style={{ backgroundColor: '#ffffff', color: '#1aa179' }} href="#" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                  </a>
                </li>

                {Array.from({ length: Math.min(totalRecourd, 5) }, (_, index) => {
                  const pageNumber = startPage + index;
                  return (
                    <li key={pageNumber} className="page-item">
                      <button
                        className="page-link"
                        onClick={() => onPageChange(pageNumber)}
                        style={{
                          backgroundColor: currentPage === pageNumber ? '#1aa179' : '#ffffff',
                          color: currentPage === pageNumber ? 'white' : '#1aa179',
                        }}
                      >
                        {pageNumber}
                      </button>
                    </li>
                  );
                })}

                <li className="page-item" onClick={handleNext} disabled={currentPage === totalRecourd}>
                  <a className="page-link" style={{ backgroundColor: '#ffffff', color: '#1aa179' }} href="#" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
</div>

Page {currentPage} of {totalRecourd}


   <Modal show={view} onHide={onHandleClose} >
        <Modal.Header closeButton>
          <Modal.Title>Delete Plan</Modal.Title>
        </Modal.Header>
        <form onSubmit={onDelete}>
        <Modal.Body>
          <div className="form-group">
             <h5>Delete</h5>
          {currentData &&(
            <p>This will permanently delete the Plan{' '}
    <strong style={{ color: 'red' }}>"{currentData.planName}"</strong>. Please re-enter the
    plan name to confirm. </p>
          )}    
         
            <input  className="form-control" name="planName" id="planName" type="text"onChange={onchange} value={formData.planName}/>
          </div>
         
        </Modal.Body>
        <Modal.Footer>
          <Button  onClick={onHandleClose} className="btn btn-dark">Close</Button>
          <Button type="submit" className="btn btn-danger" onClick={onHandleClose}>Delete</Button>
        </Modal.Footer>
        </form>
      </Modal>

      </div>

    </>
    )
}
