import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams,useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom"
import maleavatar from '../../img/Male_avatar.svg'
import { adminGetBrokerByID,uploadBrokerImage,resetImageUploadByState,getBrokImageUrl} from "../../Features/Slices/adminBrokerSlice"
import { toast } from "react-toastify"

export function AdminAddBrokerImage (){
    const dispatch = useDispatch ()
    const navigate = useNavigate ()

    const [searchParams] = useSearchParams();
    const brokerId = searchParams.get('id');

    const { isGetBrokerByIdSuccess, isGetBrokerByIdLoading, brokerDetail,isUploadBrokProfileSuccess,uploadBrokProfilemessage,
        isUploadBrokProfileLoading,Images
    } =useSelector((state) => state.admin)

      const [formData, setFormData] = useState({
      })

      const { name, phoneNumber, email, address1, matrimonyName, state, district } = formData

        useEffect(()=>{
          if(isGetBrokerByIdLoading == false && isGetBrokerByIdSuccess == false){
            dispatch(adminGetBrokerByID(brokerId))
          }
        },[isGetBrokerByIdLoading,isGetBrokerByIdSuccess,brokerDetail],dispatch)

    useEffect(() => {

    if (isGetBrokerByIdSuccess == true && brokerDetail) {
      setFormData({
        name: brokerDetail.name || '',
        phoneNumber: brokerDetail.phoneNumber || '',
        email: brokerDetail.email || '',
        address1: brokerDetail.address1 || '',
        matrimonyName: brokerDetail.matrimonyName || '',
        brokerCategory: brokerDetail.brokerCategory || '',
        state: brokerDetail.state || '',
        district: brokerDetail.district || ''

      })
    }
  }, [isGetBrokerByIdSuccess, isGetBrokerByIdLoading, brokerDetail], dispatch)


      useEffect(()=>{
  
        if(isUploadBrokProfileSuccess === true && uploadBrokProfilemessage){
          toast.success(uploadBrokProfilemessage.message)
           dispatch(resetImageUploadByState())
           navigate('/AdminBrokerList')
        }
  
        if(isUploadBrokProfileSuccess === false && uploadBrokProfilemessage){
          toast.error(uploadBrokProfilemessage.message)
          dispatch(resetImageUploadByState())
        }
  
        
      },[isUploadBrokProfileLoading,isUploadBrokProfileSuccess,uploadBrokProfilemessage],dispatch)

const backViewDetailsUrl =('/BrokerDetails?id=' + brokerId  )
const onbackClick = (e) => {
  e.preventDefault();
  navigate(backViewDetailsUrl)
} 

    useEffect(() => {
      dispatch(getBrokImageUrl({ brokerId }));
    }, [brokerId]);


    function uploadImage() {
      if (filedata != undefined)
        dispatch(uploadBrokerImage([filedata, "data"]))
      //  navigate(backViewDetailsUrl)
    }
  
    const [fileurl, setFileUrl] = useState();
    const [filedata, setFiledata] = useState();
  
  
  
    function handleChange(e) {
      console.log(e.target.files);
  
  
      const formData = new FormData()
      //var newFile = new File(e.target.files[0], "magesh");
  
      const uploadedFile = e.target.files[0];
      const newName = `${Date.now()}`;
      const fileExtension = uploadedFile.name.split('.').pop();
      const modifiedFile = new File([uploadedFile], newName + "." + fileExtension, { type: uploadedFile.type });
      setFileUrl(URL.createObjectURL(modifiedFile));
      formData.append("file", modifiedFile)
      formData.append("brokerId", brokerId)
      setFiledata(formData)
    }
  

    return(<>

            <Link onClick={onbackClick} className="text-success text-decoration-none"><h3> <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#1aa179" className="bi bi-arrow-left-circle" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z" />
              </svg></h3></Link><br />
        

    <p className="h4">Upload Image</p> <br />
    <div className="row">

      <div className="col-md-8">
<div className="row">
            < label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Name</label>
            <div className="col-4">

              <label className="form-control-plaintext ">: {name}</label>
            </div>
           
          </div>

          <div className="row">
            <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Address1</label>
            <div className="col-4">

              <label className="form-control-plaintext">: {address1}</label>
            </div>
          </div>
          <div className="row">
            <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">State</label>
            <div className="col-4">
              <label className="form-control-plaintext">: {state}</label>
            </div>
             
          </div>

          <div className="row">
            <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">District</label>
            <div className="col-4">
              <label className="form-control-plaintext">: {district}</label>
            </div>
           
          </div>

          <div className="row">
            <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">PhoneNumber</label>
            <div className="col-4">
              <label className="form-control-plaintext">: {phoneNumber}</label>
            </div>
          </div>

           <div className="row md-4">
            <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label md-4">Email</label>
            <div className="col-4">
              <label className="form-control-plaintext md-4">: {email}</label>
            </div>
          </div>

          <div className="row md-4">
            <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label md-4">MatrimonyName</label>
            <div className="col-4">
              <label className="form-control-plaintext md-4">: {matrimonyName}</label>
            </div>
          </div>
      </div>
      <div className="col-md-4">
         <div className="col-4 me-5 mt-5 " style={{ width:190 }}>
              <img src={Images}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = maleavatar;
                }}  className=" rounded- " alt="..." />
            </div>
      </div>
    </div>

    



        <div className="d-flex ms- mt-5 "><h6>Upload</h6></div>
        <div className="row">
            <label htmlFor="formFile" className="form-label">Choose your photo</label>
         <input className="form-control ms-2" type="file" style={{width:320}} onChange={handleChange} id="formFile"></input>
         <span style={{ color: "red" }}>* image size should be less 26 MB</span>
        </div>
        <div className="row  p-2">
            <div className="col-md-4 mt-2"> <img src={fileurl} /></div>
          </div>

        <button onClick={() => uploadImage()} className="primarybutton mt-3 ms-1" >Save Image</button>

    </>)

}