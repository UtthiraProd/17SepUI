import authAxious from '../Config/interceptor'
const API_URL_FILE_UPLOAD ='/cloud/uploadProfileImage'
const API_URL_FILE_UPDATE_IMAGE = '/cloud/updateImageName'
const API_URL_FILE_UPLOAD_BROKER_IMAE ='/cloud/uploadBrokerImage'
const API_URL_FILE_UPLOAD_PUBLIC_USER ='/cloud/uploadPUProfileImage'

const uploadfile = async(filedata,name) =>{

 try
 {
    const response = await authAxious.post(API_URL_FILE_UPLOAD,filedata[0])
    return response
 }
 catch(error)
 {
    return "Error while uploading photo"
 }
   
}

const uploadBrokerImage = async(filedata,name) =>{

   try
   {
      const response = await authAxious.post(API_URL_FILE_UPLOAD_BROKER_IMAE,filedata[0])
      return response
   }
   catch(error)
   {
      return "Error while uploading photo"
   }
     
  }

  const uploadPUProfileImage = async(filedata, name) =>{
   try{
      const response = await authAxious.post(API_URL_FILE_UPLOAD_PUBLIC_USER,filedata[0]);
      return response
   }
   catch(error)
   {
      return "Error while uploading photo"
   }
  }

const azureService ={
    uploadfile,
    uploadBrokerImage,
    uploadPUProfileImage
}

export default azureService 