import { Link, useNavigate } from 'react-router-dom'
import maleavatar from '../../img/Male_avatar.svg'
import { getMarriageProfileById, userFind, userLoginCreate } from '../../Features/Slices/userProfileSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify'



export function ProfileDetails(){

    const [SearchParams ]=useSearchParams();  
    const profID = SearchParams.get('id')
    const navigate=useNavigate()
    const dispatch=useDispatch()

    const [formData,setFormData]=useState({}) 

    const  {name,sex,maritalstatus,religion,caste,subcaste,qualification,DOB,POB,birthTime,rasi,star,phoneNumber,job,salary,fatherOccupation,
      motherOccupation,address1,address2,sistersMarried,sistersUnmarried,brothersMarried,brothersUnmarried,notes,district,state}=formData            

    const{isGetProfileByIdLoading,isGetProfileByIdSuccess,profileDetail,isCreateLoginSuccess,isCreateLoginMessage,isCreateLoginError,
      isGetUserLoading,isGetUserSuccess,alreadyExists,isGetUserError
    }=useSelector((state)=>state.userPro)

    useEffect (()=>{
         if (isGetProfileByIdLoading == false && isGetProfileByIdSuccess==false){
            dispatch(getMarriageProfileById(profID))
         }

         if(isCreateLoginSuccess){
            toast.success(isCreateLoginMessage)
         }
         if(isCreateLoginError){
          toast.error(isCreateLoginMessage)
         }

         if (!isGetUserSuccess && !isGetUserLoading) {
          // dispatch(userFind(profID))
        }
      
    },[isGetProfileByIdLoading,isGetProfileByIdSuccess,profileDetail,profID,isCreateLoginSuccess,isCreateLoginMessage,isCreateLoginError,
      isGetUserLoading,isGetUserSuccess,alreadyExists,isGetUserError],dispatch)
    
    useEffect (()=>{
      if (isGetProfileByIdSuccess == true && profileDetail){
            setFormData({
           name:profileDetail.name || '',
           sex:profileDetail.sex || '',
           maritalstatus:profileDetail.maritalstatus ||'',
           religion:profileDetail.religion || '',
           caste:profileDetail.caste || '',
           subcaste:profileDetail.subcaste || '',
           qualification:profileDetail.qualification || '',
           DOB:profileDetail.DOB || '',
           POB:profileDetail.POB || '',
           birthTime:profileDetail.birthTime || '',
           rasi:profileDetail.rasi || '',
           star:profileDetail.star || '',
           phoneNumber:profileDetail.phoneNumber || '',
           job:profileDetail.job || '',
           salary:profileDetail.salary || '',
           fatherOccupation:profileDetail.fatherOccupation || '',
           motherOccupation:profileDetail.motherOccupation || '',
           address1:profileDetail.address1 || '',
           address2:profileDetail.address2 || '',
           sistersMarried:profileDetail.sistersMarried || '',
           sistersUnmarried:profileDetail.sistersUnmarried || '',
           brothersMarried:profileDetail.brothersMarried || '',
           brothersUnmarried:profileDetail.brothersUnmarried || '',
           notes:profileDetail.notes || '',
           district:profileDetail.district || '',
           state:profileDetail.state || ''
       },[isGetProfileByIdSuccess,profileDetail],dispatch)
      }
    })      
    const backViewDetailsUrl ='/UserProfileList'
    const onbackClick = (e) => {
   e.preventDefault();
   navigate(backViewDetailsUrl)
   }  

   const [createData,setCreateData]=useState({
      email:"",
      password:"",
      confirmPassword:""
    }) 
    const{email,password,confirmPassword}=createData

     const onchange =(e)=>{
      setCreateData((prevState)=>({
         ...prevState,
         [e.target.name]:e.target.value
      }))
    }
    
    const onsubmit =(e)=>{
         e.preventDefault();
   
         if(!email || !password || !confirmPassword){
           handleShow(true)
           toast.error(isCreateLoginMessage)
         }
   
         const userLogin = {email,password,confirmPassword,profID}
         dispatch(userLoginCreate(userLogin))
         console.log(userLogin)
       }
       
    
   const [show, setShow] = useState(false)
   

   const handleClose = ()=>setShow(false)

   const handleShow =()=>{
      setShow(true)
      setCreateData("")
}


const userDetails =(e)=>{
    navigate('/userDetails?id=' + profID)
 
}

    return(<>

     <Link onClick={onbackClick} className="text-success text-decoration-none"><h3> <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#1aa179" className="bi bi-arrow-left-circle" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z" />
              </svg></h3></Link>



    <div className="container " id="brokdetail">
        <h2>Profile details</h2><br /><br />
        <div className=" brokimg  me-5">
        < svg  className="" xmlns="http://www.w3.org/2000/svg" width="25" height="20" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
  <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
</svg>
</div>
         
<div className="row">
        <img src={maleavatar} style={{width:225}} className=" rounded- " alt="..." /> 
        </div>
        <br /><br /><br />

        <div className="row">
  <h4 >Basic Details  <svg  xmlns="http://www.w3.org/2000/svg" width="25" height="20" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
  <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
</svg>
</h4><br /><br />
<div className="col-md-2">
    <label htmlFor="">Name :</label><br />
    <label style={{ fontWeight: 'bold'}} htmlFor="" >{name}</label><br /><br />
</div>
     <div className="col-md-2">
        <label htmlFor="">Sex :</label><br />
        <label style={{ fontWeight: 'bold'}} htmlFor="">{sex}</label><br /><br />
     </div>
     <div className="col-md-2">
           <label htmlFor="">Marital Status :</label><br />
           <label style={{ fontWeight: 'bold'}} htmlFor="">{maritalstatus}</label><br /><br />
     </div>

     <div className="col-md-2"><label htmlFor="">Religion :</label><br />
     <label style={{ fontWeight: 'bold'}} htmlFor="">{religion}</label><br /><br />

     </div>
     <div className="col-md-2">
           <label htmlFor="">Caste :</label><br />
           <label style={{ fontWeight: 'bold'}} htmlFor="">{caste}</label><br /><br />
     </div>

     <div className="col-md-2"><label htmlFor="">Subcaste :</label><br />
     <label style={{ fontWeight: 'bold'}} htmlFor="">{subcaste}</label><br /><br />

     </div>
 </div><br /><br />

 <div className='row'>

 <div className="col-md-2">
    <label htmlFor="">Qualification :</label><br />
    <label style={{ fontWeight: 'bold'}} htmlFor="" >{qualification}</label><br /><br />
</div>
     <div className="col-md-2">
        <label htmlFor="">Date of Birth :</label><br />
        <label style={{ fontWeight: 'bold'}} htmlFor="">{DOB}</label><br /><br />
     </div>
     <div className="col-md-2">
           <label htmlFor="">Place of Birth :</label><br />
           <label style={{ fontWeight: 'bold'}} htmlFor="">{POB}</label><br /><br />
     </div>

     <div className="col-md-2"><label htmlFor="">Birth Time :</label><br />
     <label style={{ fontWeight: 'bold'}} htmlFor="">{birthTime}</label><br /><br />

     </div>
     <div className="col-md-2">
           <label htmlFor="">Rasi :</label><br />
           <label style={{ fontWeight: 'bold'}} htmlFor="">{rasi}</label><br /><br />
     </div>

     <div className="col-md-2"><label htmlFor="">Star :</label><br />
     <label style={{ fontWeight: 'bold'}} htmlFor="">{star}</label><br /><br />

     </div>

 </div>
<br /><br />

 <div className='row'>
 <div className="col-md-2">
    <label htmlFor="">Phone Number :</label><br />
    <label style={{ fontWeight: 'bold'}} htmlFor="" >{phoneNumber}</label><br /><br />
</div>
     <div className="col-md-2">
        <label htmlFor="">Job :</label><br />
        <label style={{ fontWeight: 'bold'}} htmlFor="">{job}</label><br /><br />
     </div>
     <div className="col-md-2">
           <label htmlFor="">Salary :</label><br />
           <label style={{ fontWeight: 'bold'}} htmlFor="">{salary}</label><br /><br />
     </div>

     <div className="col-md-2"><label htmlFor="">Father Occupation :</label><br />
     <label style={{ fontWeight: 'bold'}} htmlFor="">{fatherOccupation}</label><br /><br />

     </div>
     <div className="col-md-2">
           <label htmlFor="">Mother Occupation:</label><br />
           <label style={{ fontWeight: 'bold'}} htmlFor="">{motherOccupation}</label><br /><br />
     </div>
 </div>
 <br /><br />

 <div className='row'>
 <div className="col-md-4"> 
    <label htmlFor="">Address:</label><br />
    <label style={{ fontWeight: 'bold'}} htmlFor="" >{address1} , {address2} , {phoneNumber} , {district} , {state}</label><br /><br />
</div>
     <div className="col-md-2">
        <label htmlFor="">Sister Married :</label><br />
        <label style={{ fontWeight: 'bold'}} htmlFor="">{sistersMarried}</label><br /><br />
     </div>
     <div className="col-md-2">
           <label htmlFor="">Sister UnMarried :</label><br />
           <label style={{ fontWeight: 'bold'}} htmlFor="">{sistersUnmarried}</label><br /><br />
     </div>

     <div className="col-md-2"><label htmlFor="">Brother Married :</label><br />
     <label style={{ fontWeight: 'bold'}} htmlFor=""></label>{brothersMarried}<br /><br />

     </div>
     <div className="col-md-2">
           <label htmlFor="">Brother Unmarried :</label><br />
           <label style={{ fontWeight: 'bold'}} htmlFor="">{brothersUnmarried}</label><br /><br />
     </div>
 </div>
   <br /><br />
   <div className='row'>
   <div className="col-md-6">
           <label htmlFor="">Notes :</label><br />
           <label style={{ fontWeight: 'bold'}} htmlFor="">{notes}</label><br /><br />
     </div>
   </div><br /><br /><br />

   <div className="row">
  <h4 >Horoscope Information <svg  xmlns="http://www.w3.org/2000/svg" width="25" height="20" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
  <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
</svg>
</h4><br /><br />

 </div>
 <br /><br /><br />
 {isGetUserLoading && (
  <p className='text-muted'>Checking login status...</p>
)}

{isGetUserSuccess && alreadyExists && (
  <div className='col-10 bg-secondary bg-gradient text-light p-2'>
    Login has been created for the user.
    <a href="" className='text-decoration-none text-dark mx-3' onClick={userDetails}>
      Click to view details
    </a>
  </div>
)}

{isGetUserSuccess && !alreadyExists && (
  <div className='row row-cols-md-3 row-cols-lg-3'>
    <button
      className='col-2 btn btn-outline-success ms-2'
      onClick={handleShow}
      type='button'
      style={{ width: 130 }}
    >
      Create login
    </button>
  </div>
)}

    </div>
    <Modal show={show} onHide={handleClose} style={{marginTop:100}}>
        <Modal.Header closeButton>
          <Modal.Title>
            <h5>Create Login</h5></Modal.Title>
        </Modal.Header>
        <form onSubmit={onsubmit}>
        <Modal.Body>
          <div className="form-group">
           <label htmlFor="email">Login User Name</label>
            <input  className="form-control border border-dark" name="email" id="email" type="text" value={email} onChange={onchange}/>
          </div>
          <div className="form-group">
           <label htmlFor="password">Login Password</label>
            <input  className="form-control border border-dark" name="password" id="password" type="password" value={password} onChange={onchange}/>
          </div> <div className="form-group">
           <label htmlFor="confirmPassword">Confirm Login Password</label>
            <input  className="form-control border border-dark" name="confirmPassword" id="confirmPassword" type="password" value={confirmPassword} onChange={onchange}/>
          </div>
         
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn btn-dark" type='reset' onClick={handleClose}>Close</Button>
          <Button type="submit" className="btn btn-success" onClick={handleClose}>Create</Button>
        </Modal.Footer>
        </form>
      </Modal>
</>)
    

}