import { Link, useNavigate, useSearchParams } from "react-router-dom"
import maleavatar from '../../img/Male_avatar.svg'
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { adminGetBrokerByID, AssignBroker, resetadminGetBrokerByID,getBrokImageUrl,resetAssignBroker} from "../../Features/Slices/adminBrokerSlice";
import { toast } from "react-toastify";


export function PUBrokerDetails (){
                                           
    const [searchParams] = useSearchParams()
    const brokerId = searchParams.get('id')
    const profileID = searchParams.get('profileID')
    const pageIndex = searchParams.get('pageIndex')
    const pageStartIndex= searchParams.get('pageStartIndex')

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const{isGetBrokerByIdLoading, isGetBrokerByIdSuccess,brokerDetail,AssignBrokerMessage,isAssignBrokerSuccess,
          Images} = useSelector ((state)=> state.admin)

    useEffect(()=>{
        if(isGetBrokerByIdLoading == false && isGetBrokerByIdSuccess == false){
            dispatch(adminGetBrokerByID(brokerId))
            dispatch(resetadminGetBrokerByID())
        }

        if(isAssignBrokerSuccess === true && AssignBrokerMessage ) {
          toast.success(AssignBrokerMessage)
          navigate('/PublicUserProfileList')
          dispatch(resetAssignBroker())
         } 

        if(isAssignBrokerSuccess === false && AssignBrokerMessage){
        toast.error(AssignBrokerMessage)
        dispatch(adminGetBrokerByID(profileID))
         navigate('/PUprofileDetails?id='+profileID)
         dispatch(resetAssignBroker())
       }  
    },
    [AssignBrokerMessage],dispatch)

    useEffect(()=>{
      dispatch(getBrokImageUrl({brokerId}))
    },[brokerId])
    
    const assign = () =>{
      dispatch(AssignBroker({profileID:profileID,brokerId:brokerId}))
    }

    const GoBack = () =>{
        navigate('/PUprofileDetails?id='+profileID +"&pageIndex="+ pageIndex +"&pageStartIndex="+pageStartIndex)
    }

  //   const PUViewDetails = '/PUprofileDetails'
  // const GoBack = (e) => {
  //   e.preventDefault();
  //   navigate(PUViewDetails)
  // }
    return<>

    <div onClick={GoBack} >
    <Link className="dropdown-item d-flex align-items-center"  >
     <svg  xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#1aa179" className="bi bi-arrow-left-circle" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z" />
              </svg><p className="h5 mb-0 ms-2" >Go Back</p></Link></div>         
    <br />
    <center>
    <div className="row">
        <label htmlFor="" className="h2 text-success">{brokerDetail?.matrimonyName} </label>
    </div></center><br />

     <div className="text-center">
            <img   src={Images}
      onError={(e) => {
      e.target.onerror = null;
      e.target.src = maleavatar}}
      style={{ width: 225}} className="rounded" alt="profile" />
          </div><br /><br />

    <p ><h4>Basic Details:</h4></p><br />

    <div className="row">
        <div className="col-md-4">
          <label className="mb-md-3" style={{ fontWeight: 'bold' }}>Name </label>
          <label htmlFor="">:{brokerDetail?.name}</label>
        </div>

        <div className="col-md-4">
          <label className="mmb-md-3d" style={{ fontWeight: 'bold' }}>Phone Number </label>
          <label htmlFor="">:{brokerDetail?.phoneNumber}</label>
        </div>

        <div className="col-md-4">
          <label className="mb-md-3" style={{ fontWeight: 'bold' }}>Email</label>
          <label htmlFor="">: {brokerDetail?.email} </label>
        </div>
    </div>

    <div className="row">
        <div className="col-md-4">
          <label className="mt-md-3" style={{ fontWeight: 'bold' }}>Address </label>
          <label htmlFor="">: {brokerDetail?.address1}</label>
        </div>

        <div className="col-md-4">
          <label className="mt-md-3" style={{ fontWeight: 'bold' }}>Broker Category</label>
          <label htmlFor="">: {brokerDetail?.brokerCategory} </label>
        </div>

        <div className="col-md-4">
          <label className="mt-md-3" style={{ fontWeight: 'bold' }}>Rank </label>
          <label htmlFor="">: {brokerDetail?.rank}</label>
        </div>
    </div><br /><br />

<div className="row">
    <button type="submit" className="btn btn-outline-success" style={{width:200}} onClick={assign}>Assign</button>
    {/* <button type="submit" className="btn btn-outline-danger ms-3 rounded-2" style={{width:200}}> Reject</button> */}
</div>
    </>
}