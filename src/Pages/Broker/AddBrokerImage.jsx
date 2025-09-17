
import {useDispatch, useSelector} from  'react-redux'
import { useNavigate,useSearchParams } from 'react-router-dom'
import { useEffect, useState } from "react";
import {uploadfile} from "../../Features/Slices/brokSlice"
import {getBrokerDetailById} from "../../Features/Slices/brokSlice"
import {toast} from "react-toastify"
export function AddBrokerImage() {

    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const brokerIdParam = searchParams.get('id')


   const brokerUploadImage =
      useSelector(
        (state) => state.brok
      )

      const {isUploadProfileSuccess,UploadProfilemessage} =
      useSelector(
        (state) => state.brok
      )

      useEffect(()=>{
        if(isUploadProfileSuccess)
        {
        // dispatch(resetRegisterBroker())
         if(UploadProfilemessage.isSuccess)
         {
           toast.success(UploadProfilemessage.message)
         }
         else
         {
          toast.error(UploadProfilemessage.message)
         }

         //toast.success("Profile photo added successfully")
        }
        
     },[isUploadProfileSuccess,UploadProfilemessage,navigate],dispatch)

      useEffect(()=>{
       dispatch(getBrokerDetailById(brokerIdParam))

    },[])

    const onCancelClick = () =>{
      navigate('/BrokerList')
  }



    function uploadImage(){

      
          dispatch(uploadfile([filedata,"filedata"]))
      }

      const [fileurl, setFileUrl] = useState();
      const [filedata, setFiledata] = useState();
      
     
      function handleChange(e) {
       console.log(e.target.files);
       
       
       const formData = new FormData()
       //var newFile = new File(e.target.files[0], "magesh");

       const uploadedFile = e.target.files[0];
       const newName = `${Date.now()}${uploadedFile.name}`;
       const modifiedFile = new File([uploadedFile], newName, { type: uploadedFile.type });
       setFileUrl(URL.createObjectURL(modifiedFile));
       formData.append("file",modifiedFile)
       formData.append("brokerId",brokerIdParam)
       setFiledata(formData)
     }

    return(<>

    <div className="content">
    {(brokerUploadImage && brokerUploadImage.brokerDetails)?(<div>
    <div><p className="h4">Upload Image</p>
    

    <div className="row">
    <label  style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Broker Name</label>
    <div className="col-8">
      
        <label  className="form-control-plaintext">: {brokerUploadImage.brokerDetails.name}</label>
    </div>
  </div>

    <div className="row">
    <label  style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Matrimony name</label>
    <div className="col-8">
      
        <label  className="form-control-plaintext">: {brokerUploadImage.brokerDetails.description}</label>
    </div>
  </div>
  <div className="row">
    <label  style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Address 1</label>
    <div className="col-8">
    <label  className="form-control-plaintext">: {brokerUploadImage.brokerDetails.address1}</label>
    </div>
  </div>

  <div className="row">
    <label  style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Address 2</label>
    <div className="col-8">
    <label  className="form-control-plaintext">: {brokerUploadImage.brokerDetails.address2}</label>
    </div>
  </div>

  <div className="row">
    <label  style={{ fontWeight: 'bold' }} className="col-4 col-form-label">District</label>
    <div className="col-8">
    <label  className="form-control-plaintext">: {brokerUploadImage.brokerDetails.district}</label>
    </div>
  </div>


  <div className="row">
    <label  style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Phone number</label>
    <div className="col-8">
    <label  className="form-control-plaintext">: {brokerUploadImage.brokerDetails.phoneNumber}</label>
    </div>
  </div>
  <div className="row">
    <label  style={{ fontWeight: 'bold' }} className="col-4 col-form-label">State</label>
    <div className="col-8">
    <label  className="form-control-plaintext">: {brokerUploadImage.brokerDetails.state}</label>
    </div>
  </div>

  <div className="row p-2"></div>

  <p className="h4">Upload profile photo</p>

<div className="row p-2">
  <div className="col-md-4 ">
  
  <div className="mb-3">
<label htmlFor="formFile" className="form-label">Choose your photo</label>
<input className="form-control" type="file"  onChange={handleChange} id="formFile"></input>
</div>
  </div>
</div>
<div className="row  p-2">
      <div className="col-md-4"> <img src={fileurl} /></div>
      </div>
      
      

      <div className="row p-2">
       <div className="col-md-4">
       <button onClick={()=>uploadImage()} className="btn btn-primary me-md-2" >Upload</button>
       <button onClick={()=>onCancelClick()} className="btn btn-danger">Cancel</button>
        </div>
      </div>
</div>
    </div>):null}
    
</div>
    </>
    )

}