import{createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import profileService  from '../Services/profService'
import masterService  from '../Services/masterService'
import azureService  from '../Services/azureService'
import { tr } from 'date-fns/locale'

const initialState ={
    profiles:[],
    profileTotal:0,
    profileTotals:0,
    profileImageList:[],
    isAllProfilesByBrokerIdLoading:false,
    isAllProfilesByBrokerIdSuccess:false,
    searchFilters: null,
   currentPage: 1,
   startPage: 1,
   filters: {},

    
    profileDetails:{},
    createdBy:{},
    updatedBy:{},   
    isError:false,
    isSuccess:false,
    isLoading:false,
    message:'',

    isRegisterProfileError:false,
    isRegisterProfileSuccess:false,
    isRegisterProfileLoading:false,
    registerProfilemessage:'',
    registerProfileId:'',

    isUpdatedProfileLoading:false,
    isUpdatedProfileSuccess:false,
    updatedProfilemessage:'',
    isUpdatedProfileError:false,

    isBrokerDetailError:false,
    isBrokerDetailSuccess:false,
    isBrokerDetailLoading:false,
    prokerDetails:{},

    isStarListError:false,
    isStarListSuccess:false,
    isStarListLoading:false,
    stars:[],

    isDistrictListError:false,
    isDistrictListSuccess:false,
    isDistrictListLoading:false,
    districts:[],

    isForeignListError:false,
    isForeignListSuccess:false,
    isForeignListLoading:false,
    foreignCountrys:[],

    isJobLocationError:false,
    isJobLocationSuccess:false,
    isJobLocationLoading:false,
    jobLocations:[],
    
    isSettleLocationError:false,
    isSettleLocationSuccess:false,
    isSettleLocationLoading:false,
    settleLocations:[],
    
    isRasiListError:false,
    isRasiListSuccess:false,
    isRasiListLoading:false,
    rasis:[],

    isJobListError:false,
    isJobListSuccess:false,
    isJobListLoading:false,
    jobs:[],

    isQualificationListError:false,
    isQualificationSuccess:false,
    isQualificationLoading:false,
    qualifications:[],

    religions:[],
    isReligionError:false,
    isReligionSuccess:false,
    isReligionLoading:false,

    castes:[],
    iscasteError:false,
    iscasteSuccess:false,
    iscasteLoading:false,

    isImageListError:false,
    isImageSuccess:false,
    isImageLoading:false,
    imageMessage:'',
    Images:[],

    isUploadProfileError:false,
    isUploadProfileSuccess:false,
    isUploadProfileLoading:false,
    uploadProfilemessage:'',

    isRemoveProfileImageError:false,
    isRemoveProfileImageSuccess:false,
    isRemoveProfileImageLoading:false,
    removeProfileImagemessage:null,

    
    isdeleteProfileError:false,
    isdeleteProfileSuccess:false,
    isdeleteProfileLoading:false,
    messageResetdeleteProfile:'',

    isUpdateHoroscopeProfileError:false,
    isUpdateHoroscopeSuccess:false,
    isUpdateHoroscopeLoading:false,
    messageUpdateHoroscope:'',

    issetProfilePictureError : false,
    issetProfilePictureSuccess:false,
    issetProfilePictureLoading:false,
    messagesetProfile:'',

    isGetBrokerApprovedLoading:false,
    isGetBrokerApprovedSuccess:false,
    isGetBrokerApprovedError:false,
    isBrokerApprovedMessage:'',
    brokerApprovedProfiles:[],
    brokerApprovedprofileImageList:[],
    brokerApprovedprofileTotal:0,
    brokerApprovedprofileTotals:0,

    // isGetBrokerCreateLoading:false,
    // isGetBrokerCreateSuccess:false,
    // isGetBrokerCreateError:false,
    
    brokerCreatedProfiles:[],
    brokerCreatedprofileTotal:0,
    brokerCreatedprofileTotals:0,
    brokerCreatedprofileImageList:[],

    adminApprovedProfiles:[],
    adminApprovedTotal:0,
    adminApprovedTotals:0,
    adminApprovedImagesList:[],
    isAdminApprovedProfilesLoading:false,
    isAdminApprovedProfilesSuccess:false,
    isAdminApprovedProfilesError:false,

    isGetUserLoading:false,
    isGetUserSuccess:false,
    alreadyExists:'',
    isGetUserError:false,

    isProfileHoroscopeDetailsByIdLoading:false,
    isProfileHoroscopeDetailsByIdSuccess:false,
    ProfileHoroscopeDetailsByIdmessage:'',
    isProfileHoroscopeDetailsByIdError:'',

    isGetAllStateLoading:false,
    isGetAllStateSuccess:false,
    isGetAllStateError:false,
    AllStates: [],    

    isGetAllMotherTongueLoading:false,
    isGetAllMotherTongueSuccess:false,
    isGetAllMotherTongueError:false,
    isGetAllMotherTongueList:[],    

    isProfileDetailsByIdLoading:false,
    isProfileDetailsByIdSuccess:false,
    isProfileDetailsByIdError:false,
    profileDetailsByIdmessage:'',

        isAddcommandLoading:false,
    isAddcommandSuccess:false,
    isAddcommandError:false,
    CommandMessage:'',

    isDeleteCommandLoading:false,
    isDeleteCommandSuccess:false,
    isDeleteCommandError:false,
    DeleteCommandMessage:'',

    isAllcommandLoading:false,
    isAllcommandSuccess:false,
    isAllcommandError:false,
    AllCommand:'',

    isPUProfileBrokerLoading:false,
    isPUProfileBrokerSuccess:false,
    isPUProfileBrokerError:false,

    isPUViewImageBrokerLoading:false,
    isPUViewImageBrokerSuccess:false,
    isPUViewImageBrokerError:false


}

export const registerProfile = createAsyncThunk(
    'prof/registerProfile',
    async(data,thunkAPI)=>{
        try{
             return await profileService.registerProfile(data)
        }
        catch(error){
            const message = (error.response && error.response.data &&
                error.response.data.message) || error.message || error.tostring()

                return thunkAPI.rejectWithValue(message)
        }
    }
)

export const updateProfile = createAsyncThunk(
    'prof/updateProfile',
    async(data,thunkAPI)=>{
        try{
             return await profileService.updateProfile(data)
        }
        catch(error){
            const message = (error.response && error.response.data &&
                error.response.data.message) || error.message || error.tostring()

                return thunkAPI.rejectWithValue(message)
        }
    }
)




// export const getAllProfilesByBrokerId = createAsyncThunk(
//     'brok/getAllProfilesByBrokerId',
//     async(data,thunkAPI)=>{
//         try{
           
//              return await profileService.fetchprofileByBroker(data)
//         }
//         catch(error){
//             const message = (error.response && error.response.data &&
//                 error.response.data.message) || error.message || error.tostring()

//                 return thunkAPI.rejectWithValue(message)
//         }
//     }
// )

export const searchProfile = createAsyncThunk(
    'brok/searchProfile',
    async(data,thunkAPI)=>{
        try{
           
             return await profileService.serchProfiles(data)
        }
        catch(error){
            const message = (error.response && error.response.data &&
                error.response.data.message) || error.message || error.tostring()

                return thunkAPI.rejectWithValue(message)
        }
    }
)

export const getProfileDetailsById = createAsyncThunk(
    'brok/getProfileDetailsById',
    async(data,thunkAPI)=>{
        try{
           
             return await profileService.fetchprofileDetailsById(data)
        }
        catch(error){
            const message = (error.response && error.response.data &&
                error.response.data.message) || error.message || error.tostring()

                return thunkAPI.rejectWithValue(message)
        }
    }
)


export const getProfileHoroscopeDetailsById = createAsyncThunk(
    'brok/getProfileHoroscopeDetailsById',
    async(data,thunkAPI)=>{
        try{
           debugger
             return await profileService.getProfileHoroscopeDetailsById(data)
        }
        catch(error){
            const message = (error.response && error.response.data &&
                error.response.data.message) || error.message || error.tostring()

                return thunkAPI.rejectWithValue(message)
        }
    }
)

export const getbrokerDetailsById = createAsyncThunk(
    'brok/getbrokerDetailsById',
    async(data,thunkAPI)=>{
        try{
           
             return await profileService.getbrokerDetailsById(data)
        }
        catch(error){
            const message = (error.response && error.response.data &&
                error.response.data.message) || error.message || error.tostring()

                return thunkAPI.rejectWithValue(message)
        }
    }
)

export const getAllStars = createAsyncThunk(
    'brok/getAllStars',
    async(user,thunkAPI)=>{
        try{
             return await masterService.getAllStars()
           }
        catch(error){
            const message = (error.response && error.response.data &&
                error.response.data.message) || error.message || error.tostring()

                return thunkAPI.rejectWithValue(message)
        }
    }
)


export const uploadfile = createAsyncThunk(
    'brok/uploadfile',
    async(fileData,thunkAPI)=>{
        try{
             return await azureService.uploadfile(fileData);
        }
        catch(error){
            const message = (error.response && error.response.data &&
                error.response.data.message) || error.message || error.tostring()

                return thunkAPI.rejectWithValue(message)
        }
    }
)

export const updateHoroscope = createAsyncThunk(
    'brok/updateHoroscope',
    async(data,thunkAPI)=>{
        try{
             return await profileService.updateHoroscope(data);
        }
        catch(error){
            const message = (error.response && error.response.data &&
                error.response.data.message) || error.message || error.tostring()

                return thunkAPI.rejectWithValue(message)
        }
    }
)

export const getAllRasis = createAsyncThunk(
    'brok/getAllRasis',
    async(user,thunkAPI)=>{
        try{
             return await masterService.getAllRasis()
        }
        catch(error){
            const message = (error.response && error.response.data &&
                error.response.data.message) || error.message || error.tostring()

                return thunkAPI.rejectWithValue(message)
        }
    }
)

export const getAllDistricts = createAsyncThunk(
    'brok/getAllDistricts',
    async(user,thunkAPI)=>{
        try{
             return await masterService.getAllDistricts()
        }
        catch(error){
            const message = (error.response && error.response.data &&
                error.response.data.message) || error.message || error.tostring()

                return thunkAPI.rejectWithValue(message)
        }
    }
)
export const getAllForeignCountries = createAsyncThunk(
    'foreign/getAllForeignCountries',
    async(user,thunkAPI)=>{
        try{
            return await masterService.getAllForeignCountries()
        }
        catch(error){
            const message = (error.response && error.response.data &&
                error.response.data.message) || error.message || error.tostring()

                return thunkAPI.rejectWithValue(message)
        }
    }
)

export const getAllJobLocations = createAsyncThunk (
    'joblocation/getAllJobLocations',
    async(user, thunkAPI)=>{
        try { 
        return await masterService.getAllJobLocations()  
           }
    catch (error){
        const message = (error.response && error.response.data &&
            error.response.data.message) || error.message || error.tostring()

            return thunkAPI.rejectWithValue(message)
    }
}
)
export const getAllSettleLocations = createAsyncThunk (
    'settlelocation/getAllSettleLocations',
    async(user, thunkAPI)=>{
        try { 
        return await masterService.getAllSettleLocations()  
           }
    catch (error){
        const message = (error.response && error.response.data &&
            error.response.data.message) || error.message || error.tostring()

            return thunkAPI.rejectWithValue(message)
    }
}
)

export const getAllJobs= createAsyncThunk(
    'brok/getAllJobs',
    async(user,thunkAPI)=>{
        try{
             return await masterService.getAllJobs()
        }
        catch(error){
            const message = (error.response && error.response.data &&
                error.response.data.message) || error.message || error.tostring()

                return thunkAPI.rejectWithValue(message)
        }
    }
)

export const getAllQualifications= createAsyncThunk(
    'brok/getAllQualifications',
    async(user,thunkAPI)=>{
        try{
             return await masterService.getAllQualifications()
        }
        catch(error){
            const message = (error.response && error.response.data &&
                error.response.data.message) || error.message || error.tostring()

                return thunkAPI.rejectWithValue(message)
        }
    }
)

export const getAllReligions = createAsyncThunk(
    'brok/getAllReligions',
    async(user,thunkAPI)=>{
        try{
             return await masterService.getAllReligions();
        }
        catch(error){
            const message = (error.response && error.response.data &&
                error.response.data.message) || error.message || error.tostring()

                return thunkAPI.rejectWithValue(message)
        }
    }
)

export const getAllCastes = createAsyncThunk(
    'brok/getAllCastes',
    async(user,thunkAPI)=>{
        try{
             return await masterService.getAllCastes();
        }
        catch(error){
            const message = (error.response && error.response.data &&
                error.response.data.message) || error.message || error.tostring()

                return thunkAPI.rejectWithValue(message)
        }
    }
)


export const getProfileImageUrl = createAsyncThunk(
    'brok/getProfileImageUrl',
    async(data,thunkAPI)=>{
        try{
           
             return await profileService.getProfileImageUrl(data)
        }
        catch(error){
            const message = (error.response && error.response.data &&
                error.response.data.message) || error.message || error.tostring()

                return thunkAPI.rejectWithValue(message)
        }
    }
)

export const getBrokerUserProfileViewedImageUrl = createAsyncThunk(
    'brok/getBrokerUserProfileViewedImageUrl',
    async(data,thunkAPI)=>{
        try{
           
             return await profileService.getBrokerUserProfileViewedImageUrl(data)
        }
        catch(error){
            const message = (error.response && error.response.data &&
                error.response.data.message) || error.message || error.tostring()

                return thunkAPI.rejectWithValue(message)
        }
    }
)



export const removeProfileImage = createAsyncThunk(
    'brok/removeProfileImage',
    async(data,thunkAPI)=>{
        try{
           
             return await profileService.removeProfileImage(data)
        }
        catch(error){
            const message = (error.response && error.response.data &&
                error.response.data.message) || error.message || error.tostring()

                return thunkAPI.rejectWithValue(message)
        }
    }
)

export const setProfilePicture = createAsyncThunk(
    'brok/setProfilePicture',
    async(data,thunkAPI)=>{
        try{
           
             return await profileService.setProfilePicture(data)
        }
        catch(error){
            const message = (error.response && error.response.data &&
                error.response.data.message) || error.message || error.tostring()

                return thunkAPI.rejectWithValue(message)
        }
    }
)


export const deleteProfile = createAsyncThunk(
    'brok/deleteProfile',
    async(data,thunkAPI)=>{
        try{
           
             return await profileService.deleteProfile(data)
        }
        catch(error){
            const message = (error.response && error.response.data &&
                error.response.data.message) || error.message || error.tostring()

                return thunkAPI.rejectWithValue(message)
        }
    }
)

export const getBrokerApprovedProfiles = createAsyncThunk(
    'brok/getBrokerApprovedProfiles',
     async(data,thunkAPI)=>{
        try{
            return await profileService.getBrokerApprovedProfiles(data)
        }
        catch(error){
            const message = (error.response && error.response.data &&
                error.response.data.message) || error.message || error.tostring()

                return thunkAPI.rejectWithValue(message)
        }
     }
)

export const getAdminApprovedProfiles = createAsyncThunk(
    'brok/getAdminApprovedProfiles',
    async(data,thunkAPI)=>{
        try{
            return await profileService.getAdminApprovedProfiles(data)
        }
        catch(error){
            const message = (error.response && error.response.data &&
                error.response.data.message) || error.message || error.tostring()

                return thunkAPI.rejectWithValue(message)
        }
    }
)

export const getBrokerCreatedProfiles = createAsyncThunk(
    'brok/getBrokerCreatedProfiles',
    async(data,thunkAPI)=>{
        try{
            return await profileService.getBrokerCreatedProfiles(data)
        }catch(error){
            const message = (error.response && error.response.data &&
                error.response.data.message) || error.message || error.tostring()

                return thunkAPI.rejectWithValue(message)
        }
    }
)

export const userFind=createAsyncThunk(
    'brok/userFind',
    async(data,thunkAPI)=>{
        try{
            return await profileService.userFind(data)
        }
        catch(error){
            const  message=(error.response && error.response.data && error.response.data.message)
            || error.message || error.tostring()
            return thunkAPI.rejectWithValue(message)
        }
        
      }
    )

            export const getAllMotherTongue = createAsyncThunk(
                "master/getAllMotherTongue",    
                async(thunkAPI)=>{
                    try{
                        return await masterService.getAllMotherTongue()
                    }
                    catch(error){
                        const message=(error.response && error.response.data 
                            && error.response.data.message) || error.message || error.tostring()
            
                            return thunkAPI.rejectWithValue(message)
                    }
                }
            )   


    export const getAllStates = createAsyncThunk(
        'brok/getAllStates',
        async(thunkAPI)=>{
            try{
                return await masterService.getAllStates()
            }catch(error){
                const message = (error.response && error.response.data &&
                    error.response.data.message) || error.message || error.tostring()
    
                    return thunkAPI.rejectWithValue(message)
                }
        }
    )
export const addCommand = createAsyncThunk(
    'prof/addCommand',
    async(data,thunkAPI)=>{
        try{
             return await profileService.addCommand(data)
        }
        catch(error){
            const message = (error.response && error.response.data &&
                error.response.data.message) || error.message || error.tostring()

                return thunkAPI.rejectWithValue(message)
        }
    }
)
export const deleteCommand =createAsyncThunk(
    'prof/deleteCommand',
    async(data,thunkAPI)=>{
        try{
            return await profileService.deleteCommand(data)
        }
        catch(error){
            const message =(error.response && error.response.data && error.response.data.message)
            || error.message ||  error.tostring()
             return thunkAPI.rejectWithValue(message)
        }
    }
)
export const getallcommand = createAsyncThunk(
    'prof/getallcommand',
    async(data,thunkAPI)=>{
        try{
             return await profileService.getallcommand()
        }
        catch(error){
            const message = (error.response && error.response.data &&
                error.response.data.message) || error.message || error.tostring()

                return thunkAPI.rejectWithValue(message)
        }
    }
)

export const PUProfileBrokerAllow = createAsyncThunk(
    'prof/PUProfileBrokerAllow',
    async(data,thunkAPI)=>{
        try{
             return await profileService.PUProfileBrokerAllow(data)
        }
        catch(error){
            const message = (error.response && error.response.data &&
                error.response.data.message) || error.message || error.tostring()

                return thunkAPI.rejectWithValue(message)
        }
    }
)

export const PUViewImageBrokerAllow = createAsyncThunk(
    'prof/PUViewImageBrokerAllow',
    async(data,thunkAPI)=>{
        try{
             return await profileService.PUViewImageBrokerAllow(data)
        }
        catch(error){
            const message = (error.response && error.response.data &&
                error.response.data.message) || error.message || error.tostring()

                return thunkAPI.rejectWithValue(message)
        }
    }
)


export const profSlice = createSlice({
    name:'prof',
    initialState,
    reducers:{
        resetRegisterProfile:(state)=>{
            state.isRegisterProfileLoading = false
            state.isRegisterProfileSuccess = false
            state.isRegisterProfileError = false
            state.registerProfilemessage =''
            state.registerProfileId =''
        },
        resetRegisterMessages:(state)=>{
            state.isRegisterProfileSuccess = false
            state.isRegisterProfileError = false
            state.registerProfilemessage =''
        },
        resetUpdatedProfile:(state)=>{
            state.isUpdatedProfileLoading = false
            state.isUpdatedProfileSuccess = false
            state.isUpdatedProfileError = false
            state.updatedProfilemessage =''
        },
        resetUpdatedProfileMessage:(state)=>{
            state.isUpdatedProfileSuccess = false
            state.isUpdatedProfileError = false
        },
        resetDeleteProfileMessage:(state)=>{
            state.isdeleteProfileError = false
        },
        resetAllProfilesByBrokerId:(state)=>{
            state.isAllProfilesByBrokerIdLoading = false
            state.isAllProfilesByBrokerIdSuccess = false
            state.isAllProfilesByBrokerIdError   = false
            state.allProfilesByBrokerIdmessage   = ''
        },
        resetProfileDetailsById:(state)=>{
            state.isProfileDetailsByIdLoading = false
            state.isProfileDetailsByIdError = false
            state.isProfileDetailsByIdSuccess = false
            state.profileDetailsByIdmessage = ''
        },
        resetProfileHoroscopeDetailsById:(state)=>{
            state.isProfileHoroscopeDetailsByIdLoading = false
            state.isProfileHoroscopeDetailsByIdError = false
            state.isProfileHoroscopeDetailsByIdSuccess = false
            state.isProfileHoroscopeDetailsByIdError = false
            state.ProfileHoroscopeDetailsByIdmessage = ''
        },
        resetDistrictsByState:(state)=>{
            state.isDistrictListLoading = false
            state.isDistrictListSuccess = false
            state.isDistrictListError = false
        },
        resetImageUploadByState:(state)=>{
            state.uploadProfilemessage = ''
            state.isUploadProfileSuccess = false
            state.isUploadProfileLoading = false
            state.isUploadProfileError = false
        },
        resetProfileList:(state)=>{
            state.profiles = []
            state.profileTotal=0
            state.profileTotals =0
            state.profileImageList =[]
            state.isAllProfilesByBrokerIdLoading = false
            state.isAllProfilesByBrokerIdSuccess = false
            state.isAllProfilesByBrokerIdError = false
        },
        resetdeleteProfile:(state)=>{
            state.isdeleteProfileError = false
            state.isdeleteProfileSuccess = false
            state.isdeleteProfileLoading = false
            state.messagedeleteProfile =''
        },
        resetUpdateHoroscope:(state)=>{
            state.isUpdateHoroscopeProfileError = false
            state.isUpdateHoroscopeSuccess = false
            state.isUpdateHoroscopeLoading = false
            state.messageUpdateHoroscope =''
        },
        resetProfilePicture:(state)=>{
            state.issetProfilePictureError = false
            state.issetProfilePictureSuccess = false
            state.issetProfilePictureLoading = false
            state.messagesetProfile =''
        },
        resetBrokerApproved:(state)=>{
            state.isGetBrokerApprovedLoading=false
            state.isGetBrokerApprovedSuccess=false
            state.isGetBrokerApprovedError=false
            state.brokerApprovedProfiles = []
            state.brokerApprovedprofileTotal = 0
            state.brokerApprovedprofileTotals = 0
            state.brokerApprovedprofileImageList = []
        },
        resetBrokerCreatedProfile:(state)=>{
            state.isGetBrokerCreateLoading=false
            state.isGetBrokerCreateSuccess=false
            state.isGetBrokerCreateError=false
        },
        resetgetAdminApprovedProfiles:(state)=>{
            state.isAdminApprovedProfilesLoading = false
            state.isAdminApprovedProfilesSuccess = false
            state.isAdminApprovedProfilesError = false
        },
        resetGetAlreadyExistsUser:(state)=>{
            state.isGetUserLoading = false
            state.isGetUserSuccess = false
            state.isGetUserError = false
        },
         resetGetProfileImageUrl:(state)=>{
            state.isImageListError = false
            state.isImageSuccess = false
            state.isImageLoading = false
            state.imageMessage = ''
            state.Images =[]
        },
         resetMessage:(state)=>{
            state.imageMessage = ''
         },
         resetgetBrokerUserProfileViewedImageUrl:(state)=>{
            state.isImageListError = false
            state.isImageSuccess = false
            state.isImageLoading = false
            state.imageMessage = ''
            state.Images =[]
        },
        resetGetProfileDetailsById:(state)=>{
            state.isProfileDetailsByIdLoading = false
            state.isProfileDetailsByIdSuccess = false
            state.profileDetails = {}
            state.createdBy = ''
            state.updatedBy = ''
        },
        resetRemoveProfileImage: (state) =>{
            state.isRemoveProfileImageError = false
            state.isRemoveProfileImageSuccess = false
            state.isRemoveProfileImageLoading = false
            state.removeProfileImagemessage = ''
        },
         resetaddcommand: (state) =>{
            state.isAddcommandLoading = false
            state.isAddcommandSuccess = false
            state.isAddcommandError = false
            state.CommandMessage = ''
        }  ,
        resetPUProfileBrokerAllow:(state)=>{
            state.isPUProfileBrokerLoading = false
            state.isPUProfileBrokerSuccess = false
            state.isPUProfileBrokerError = false
        },
        resetPUViewImageBrokerAllow:(state)=>{
            state.isPUViewImageBrokerLoading = false
            state.isPUViewImageBrokerSuccess = false
            state.isPUViewImageBrokerError = false
        },
        setFilters: (state, action) => {
         state.filters = action.payload;
        },
         resetsetFilters: (state, action) => {
         state.filters = action.payload;
        },
    },
    extraReducers:(builder)=>{
        builder
        .addCase(registerProfile.pending,(state)=>{
            state.isRegisterProfileLoading = true;
        })
        .addCase(registerProfile.fulfilled,(state,action)=>{
            state.isRegisterProfileLoading = false
            state.isRegisterProfileSuccess = true
            state.registerProfileId = action.payload.Id
        })
        .addCase(registerProfile.rejected,(state,action)=>{
            state.isRegisterProfileLoading = false
            state.isRegisterProfileError = true
            state.registerProfilemessage = action.payload
            state.profiles = []
        })
        .addCase(updateProfile.pending,(state)=>{
            state.isUpdatedProfileLoading = true;
        })
        .addCase(updateProfile.fulfilled,(state,action)=>{
            state.isUpdatedProfileLoading = false
            state.isUpdatedProfileSuccess = true
            state.updatedProfilemessage = action.payload.message
        })
        .addCase(updateProfile.rejected,(state,action)=>{
            state.isUpdatedProfileLoading = false
            state.isUpdatedProfileError = true
            state.updatedProfilemessage = action.payload.message
        })
        
        .addCase(searchProfile.pending,(state)=>{
            state.isAllProfilesByBrokerIdLoading = true;
        })
        .addCase(searchProfile.fulfilled,(state,action)=>{
            state.isAllProfilesByBrokerIdLoading = false
            state.isAllProfilesByBrokerIdSuccess = true
            state.profiles = action.payload.profiles
            state.profileTotal =  action.payload.totalRecourd
            state.profileTotals =  action.payload.totalRecords
            state.profileImageList =action.payload.images
        })
        .addCase(searchProfile.rejected,(state,action)=>{
            state.isAllProfilesByBrokerIdLoading = false
            state.isAllProfilesByBrokerIdError = true
            state.allProfilesByBrokerIdmessage = action.payload
            state.profiles = []
            state.profileTotal = 0
            state.profileTotals =  0
            state.profileImageList =[]
        })
        .addCase(getProfileDetailsById.pending,(state)=>{
            state.isProfileDetailsByIdLoading = true;
        })
        .addCase(getProfileDetailsById.fulfilled,(state,action)=>{
            state.isProfileDetailsByIdLoading = false
            state.isProfileDetailsByIdSuccess = true
            state.profileDetails = action.payload.profileDetails
            state.createdBy = action.payload.createdBy
            state.updatedBy = action.payload.updatedBy

        })
        .addCase(getProfileDetailsById.rejected,(state,action)=>{
            state.isProfileDetailsByIdLoading = false
            state.isProfileDetailsByIdError = true
            state.profileDetailsByIdmessage = action.payload
            state.profileDetails ={}
        })

        
        .addCase(getProfileHoroscopeDetailsById.pending,(state)=>{
           
            state.isProfileHoroscopeDetailsByIdLoading = true;
        })
        .addCase(getProfileHoroscopeDetailsById.fulfilled,(state,action)=>{
            state.isProfileHoroscopeDetailsByIdLoading = false
            if(action.payload.isSuccess)
            {
            state.isProfileHoroscopeDetailsByIdSuccess = true
            state.profileDetails.horoScope = action.payload.data
            state.ProfileHoroscopeDetailsByIdmessage = action.payload.message
            }
            else
            {
            state.isProfileHoroscopeDetailsByIdSuccess = false
            state.ProfileHoroscopeDetailsByIdmessage = action.payload.message
            }

        })
        .addCase(getProfileHoroscopeDetailsById.rejected,(state,action)=>{
            state.isProfileHoroscopeDetailsByIdLoading = false
            state.isProfileHoroscopeDetailsByIdError = true
            state.ProfileHoroscopeDetailsByIdmessage = action.payload
            state.profileDetails.horoScope ={}
        })
        .addCase(getbrokerDetailsById.pending,(state)=>{
            state.isBrokerDetailLoading = true;
        })
        .addCase(getbrokerDetailsById.fulfilled,(state,action)=>{
            state.isBrokerDetailLoading = false
            state.isBrokerDetailSuccess = true
            state.brokerDetails = action.payload
        })
        .addCase(getbrokerDetailsById.rejected,(state,action)=>{
            state.isBrokerDetailLoading = false
            state.isBrokerDetailError = true
            state.brokerDetails = {}
        })
        .addCase(getAllStars.pending,(state)=>{
            state.isStarListLoading = true;
        })
        .addCase(getAllStars.fulfilled,(state,action)=>{
            state.isStarListLoading = false
            state.isStarListSuccess = true
            state.stars = action.payload
        })
        .addCase(getAllStars.rejected,(state,action)=>{
            state.isStarListLoading = false
            state.isStarListError = true
            state.stars = []
            
        })
        .addCase(getAllRasis.pending,(state)=>{
            state.isRasiListLoading = true;
        })
        .addCase(getAllRasis.fulfilled,(state,action)=>{
            state.isRasiListLoading = false
            state.isRasiListSuccess = true
            state.rasis = action.payload
        })
        .addCase(getAllRasis.rejected,(state,action)=>{
            state.isRasiListLoading = false
            state.isRasiListError = true
            state.rasis = []
            
        })
        .addCase(getAllDistricts.pending,(state)=>{
            state.isDistrictListLoading = true;
        })
        .addCase(getAllDistricts.fulfilled,(state,action)=>{
            state.isDistrictListLoading = false
            state.isDistrictListSuccess = true
            state.districts = action.payload
        })
        .addCase(getAllDistricts.rejected,(state,action)=>{
            state.isDistrictListLoading = false
            state.isDistrictListError = true
            state.districts = []
            
        })
        //Foreign
        .addCase(getAllForeignCountries.pending,(state) =>{
              state.isForeignListLoading =true;
        })
        .addCase(getAllForeignCountries.fulfilled,(state,action) =>{
            state.isForeignListLoading =false
            state.isForeignListSuccess =true
            state.foreignCountrys =action.payload;
        })
        .addCase(getAllForeignCountries.rejected,(state,action) =>{
            state.isForeignListLoading =false
            state.isForeignListError =true
            state.foreignCountrys = [];
        })
        
        .addCase(getAllJobLocations.pending,(state)=>{
            state.isJobLocationLoading =true;
        })
        .addCase(getAllJobLocations.fulfilled,(state,action)=>{
            state.isJobLocationLoading =false
            state.isJobLocationSuccess =true
            state.jobLocations =action.payload;
        })
        .addCase(getAllJobLocations.rejected,(state,action)=>{
            state.isJobLocationLoading =false
            state.isJobLocationError =true
            state.jobLocations =[]
        })
        .addCase(getAllSettleLocations.pending,(state)=>{
            state.isSettleLocationLoading =true;
        })
        .addCase(getAllSettleLocations.fulfilled,(state,action)=>{
            state.isSettleLocationLoading=false
            state.isSettleLocationSuccess=true
            state.settleLocations=action.payload;
        })
        .addCase(getAllSettleLocations.rejected,(state,action)=>{
          state.isSettleLocationLoading=false
          state.isSettleLocationError=true
          state.settleLocations=[]
        })

        .addCase(getAllJobs.pending,(state)=>{
            state.isJobListLoading = true;
        })
        .addCase(getAllJobs.fulfilled,(state,action)=>{
            state.isJobListLoading = false
            state.isJobListSuccess = true
            state.jobs = action.payload
        })
        .addCase(getAllJobs.rejected,(state,action)=>{
            state.isJobListLoading = false
            state.isJobListError = true
            state.jobs = []
        })
        .addCase(getAllQualifications.pending,(state)=>{
            state.isQualificationLoading = true;
        })
        .addCase(getAllQualifications.fulfilled,(state,action)=>{
            state.isQualificationLoading = false
            state.isQualificationSuccess = true
            state.qualifications = action.payload
        })
        .addCase(getAllQualifications.rejected,(state,action)=>{
            state.isQualificationLoading = false
            state.isQualificationListError = true
            state.qualifications = []
        })
        .addCase(getAllReligions.pending,(state)=>{
            state.isReligionLoading = true;
        })
        .addCase(getAllReligions.fulfilled,(state,action)=>{
            state.isReligionLoading = false
            state.isReligionSuccess = true
            state.religions = action.payload
        })
        .addCase(getAllReligions.rejected,(state,action)=>{
            state.isReligionLoading = false
            state.isReligionError = true
            state.religions = []
            
        })
        .addCase(getAllCastes.pending,(state)=>{
            state.iscasteLoading = true;
        })
        .addCase(getAllCastes.fulfilled,(state,action)=>{
            state.iscasteLoading = false
            state.iscasteSuccess = true
            state.castes = action.payload
        })
        .addCase(getAllCastes.rejected,(state,action)=>{
            state.iscasteLoading = false
            state.iscasteError = true
            state.castes = []
            
        })

        .addCase(uploadfile.pending,(state)=>{
            state.isUploadProfileLoading = true;
        })
        .addCase(uploadfile.fulfilled,(state,action)=>{
            state.isUploadProfileLoading = false
            state.isUploadProfileSuccess = true
            state.UploadProfilemessage = action.payload.data
        })
        .addCase(uploadfile.rejected,(state,action)=>{
            state.isUploadProfileLoading = false
            state.isUploadProfileError = true
            state.isUploadProfileSuccess = false
            state.UploadProfilemessage = ''
        })

        .addCase(getProfileImageUrl.pending,(state)=>{
            state.isImageLoading = true;
        })
        .addCase(getProfileImageUrl.fulfilled,(state,action)=>{
           state.isImageLoading = false
          
            if(action.payload.isSuccess)
            {
              state.isImageSuccess = true
               state.imageMessage =  action.payload.message
               state.Images = action.payload.data
            }

            if(!action.payload.isSuccess)
            {
                state.isImageSuccess = false
                state.imageMessage =  action.payload.message
                state.Images = []
            }
        })
        .addCase(getProfileImageUrl.rejected,(state,action)=>{
            state.isImageLoading = false
            state.isImageListError = true
            state.Images = []
        })
        .addCase(getBrokerUserProfileViewedImageUrl.pending,(state)=>{
            state.isImageLoading = true;
        })
        .addCase(getBrokerUserProfileViewedImageUrl.fulfilled,(state,action)=>{
            
            state.isImageLoading = false
            state.isImageSuccess = true
            state.Images = action.payload.data
        })
        .addCase(getBrokerUserProfileViewedImageUrl.rejected,(state,action)=>{
            state.isImageLoading = false
            state.isImageListError = true
            state.Images = []
        })
        //removeProfileImage

        .addCase(removeProfileImage.pending,(state)=>{
            state.isRemoveProfileImageLoading = true;
        })
        .addCase(removeProfileImage.fulfilled,(state,action)=>{
            state.isRemoveProfileImageLoading = false
            state.isRemoveProfileImageSuccess = true
            state.removeProfileImagemessage = action.payload
        })
        .addCase(removeProfileImage.rejected,(state,action)=>{
            state.isRemoveProfileImageLoading = false
            state.isRemoveProfileImageError = true
            state.removeProfileImagemessage = null
        }).
        addCase(deleteProfile.pending,(state)=>{
            state.isdeleteProfileLoading = true;
        })
        .addCase(deleteProfile.fulfilled,(state,action)=>{
            state.isdeleteProfileLoading = false
            state.isdeleteProfileSuccess = true
            state.messagedeleteProfile = action.payload.message
        }) 
        .addCase(deleteProfile.rejected,(state,action)=>{
            state.isdeleteProfileLoading = false
            state.isdeleteProfileError = true
            state.messagedeleteProfile = action.payload
        }).
        addCase(updateHoroscope.pending,(state)=>{
            state.isUpdateHoroscopeLoading = true;
        })
        .addCase(updateHoroscope.fulfilled,(state,action)=>{
            state.isUpdateHoroscopeLoading = false
            state.isUpdateHoroscopeSuccess = true
            if(action.payload.isSuccess == false)
            {
                state.isUpdateHoroscopeSuccess = false
                state.isUpdateHoroscopeProfileError = true
            }
            state.messageUpdateHoroscope = action.payload.message
        }) 
        .addCase(updateHoroscope.rejected,(state,action)=>{
            state.isUpdateHoroscopeLoading = false
            state.isUpdateHoroscopeProfileError = true
            state.messageUpdateHoroscope = action.payload
        }).addCase(setProfilePicture.pending,(state)=>{
            state.issetProfilePictureLoading = true;
        })
        .addCase(setProfilePicture.fulfilled,(state,action)=>{
            state.issetProfilePictureLoading = false
            state.issetProfilePictureSuccess = true
            if(action.payload.isSuccess == false)
            {
                state.issetProfilePictureSuccess = false
                state.issetProfilePictureError = true
            }
            state.messagesetProfile = action.payload.message
        }) 
        .addCase(setProfilePicture.rejected,(state,action)=>{
            state.issetProfilePictureLoading = false
            state.issetProfilePictureError = true
            state.messagesetProfile = action.payload
        })

         .addCase(getBrokerApprovedProfiles.pending,(state)=>{
            state.isGetBrokerApprovedLoading = true
        })
         .addCase(getBrokerApprovedProfiles.fulfilled,(state,action)=>{
            state.isGetBrokerApprovedLoading = false
            state.isGetBrokerApprovedSuccess = true
            state.brokerApprovedProfiles = action.payload.brokerApprovedProfiles
            state.brokerApprovedprofileTotal = action.payload.totalRecourd
            state.brokerApprovedprofileTotals = action.payload.totalRecords
            state.brokerApprovedprofileImageList =action.payload.imageUrls
        })
         .addCase(getBrokerApprovedProfiles.rejected,(state,action)=>{
             state.isGetBrokerApprovedLoading = false
             state.isGetBrokerApprovedSuccess = false
             state.isGetBrokerApprovedError = true
             state.brokerApprovedProfiles = []
             state.brokerApprovedprofileTotal = 0
             state.brokerApprovedprofileTotals = 0
             state.brokerApprovedprofileImageList =[]
        
         })
        .addCase(getBrokerCreatedProfiles.pending,(state)=>{
            state.isGetBrokerCreateLoading = true
        })
        .addCase(getBrokerCreatedProfiles.fulfilled,(state,action)=>{
            state.isGetBrokerCreateLoading = false
            state.isGetBrokerCreateSuccess = true
            state.brokerCreatedProfiles = action.payload.brokerCreatedProfiles
            state.brokerCreatedprofileTotal =  action.payload.recourd
            state.brokerCreatedprofileTotals =  action.payload.recourds
            state.brokerCreatedprofileImageList =action.payload.brokerCreatedprofileImageList
        })
        .addCase(getBrokerCreatedProfiles.rejected,(state,action)=>{
            state.isGetBrokerCreateSuccess = false
            state.isGetBrokerCreateError = true
            state.brokerCreatedProfiles = []
            state.brokerCreatedprofileTotal =  0
            state.brokerCreatedprofileTotals = 0
            state.brokerCreatedprofileImageList = []

        })
        .addCase(getAdminApprovedProfiles.pending,(state)=>{
                    state.isAdminApprovedProfilesLoading = true
                })
                .addCase(getAdminApprovedProfiles.fulfilled,(state,action)=>{
                    state.isAdminApprovedProfilesLoading = false
                    state.isAdminApprovedProfilesSuccess = true
                    state.adminApprovedProfiles = action.payload.adminApprovedProfiles
                    state.adminApprovedTotal = action.payload.adminApprovedTotal
                    state.adminApprovedTotals = action.payload.adminApprovedTotals
                    state.adminApprovedImagesList = action.payload.adminApprovedImagesList
                })
                .addCase(getAdminApprovedProfiles.rejected,(state,action)=>{
                    state.isAdminApprovedProfilesLoading = false
                    state.isAdminApprovedProfilesSuccess = false
                    state.isAdminApprovedProfilesError = action.payload
                    state.adminApprovedProfiles = []
                    state.adminApprovedTotal = 0
                    state.adminApprovedTotals = 0
                    state.adminApprovedImagesList = []
                })

                .addCase(userFind.pending,(state)=>{
                    state.isGetUserLoading = true
                })
                .addCase(userFind.fulfilled, (state, action) => {
                    state.isGetUserSuccess = true;
                    state.isGetUserLoading = false;
                    state.alreadyExists = action.payload.exists
                })        
                .addCase(userFind.rejected,(state,action)=>{
                    state.isGetUserError =true
                    state.alreadyExists = null
                })

                          .addCase(getAllStates.pending,(state)=>{
                     state.isGetAllStateLoading = false
                  })
                  .addCase(getAllStates.fulfilled,(state,action)=>{
                     state.isGetAllStateLoading = false
                     state.isGetAllStateSuccess = true
                     state.AllStates = action.payload 
                  })
                  .addCase(getAllStates.rejected,(state)=>{
                     state.isGetAllStateSuccess = false
                     state.isGetAllStateError = true
                     state.AllStates =[]
                  })

                 .addCase(getAllMotherTongue.pending,(state)=>{
                     state.isGetAllMotherTongueLoading = true
                 })
                 .addCase(getAllMotherTongue.fulfilled,(state,action)=>{
                     state.isGetAllMotherTongueLoading = false
                     state.isGetAllMotherTongueSuccess = true
                     state.isGetAllMotherTongueList = action.payload
                 })
                 .addCase(getAllMotherTongue.rejected,(state,action)=>{
                     state.isGetAllMotherTongueLoading = false
                     state.isGetAllMotherTongueSuccess = false
                     state.isGetAllMotherTongueError = true
                     state.isGetAllMotherTongueList = []
                 }) 
    
          .addCase(addCommand.pending,(state)=>{
            state.isAddcommandLoading=true
        })
        .addCase(addCommand.fulfilled,(state,action)=>{
            state.isAddcommandSuccess=action.payload.isSuccess
            state.CommandMessage=action.payload.message
        })
        .addCase(addCommand.rejected,(state,action)=>{
            state.isAddcommandError=true
            state.CommandMessage=action.payload
        })
        .addCase(getallcommand.pending,(state)=>{
            state.isAllcommandLoading=true
        })
        .addCase(getallcommand.fulfilled,(state,action)=>{
            state.isAllcommandSuccess=true
            state.AllCommand=action.payload
        })
        .addCase(getallcommand.rejected,(state,action)=>{
            state.isAllcommandError=true
            state.AllCommand=[]
        })
            .addCase(deleteCommand.pending,(state)=>{
        state.isDeleteCommandLoading=true
    })
    .addCase(deleteCommand.fulfilled,(state,action)=>{
        state.isDeleteCommandSuccess=action.payload.isSuccess
        state.DeleteCommandMessage=action.payload.message
    })
    .addCase(deleteCommand.rejected,(state,action)=>{
        state.isDeleteCommandError=true
        state.DeleteCommandMessage=action.payload
    })

    .addCase(PUProfileBrokerAllow.pending,(state)=>{
        state.isPUProfileBrokerLoading = true
    })
    .addCase(PUProfileBrokerAllow.fulfilled,(state,action)=>{
        state.isPUProfileBrokerLoading = false
        state.isPUProfileBrokerSuccess = action.payload
    })
    .addCase(PUProfileBrokerAllow.rejected,(state,action)=>{
         state.isPUProfileBrokerLoading = false
        state.isPUProfileBrokerSuccess = false
        state.isPUProfileBrokerError = true
    })

    .addCase(PUViewImageBrokerAllow.pending,(state)=>{
        state.isPUViewImageBrokerLoading = true
    })
    .addCase(PUViewImageBrokerAllow.fulfilled,(state,action)=>{
        state.isPUViewImageBrokerLoading = false
        state.isPUViewImageBrokerSuccess = action.payload
    })
    .addCase(PUViewImageBrokerAllow.rejected,(state,action)=>{
        state.isPUViewImageBrokerLoading = false
        state.isPUViewImageBrokerSuccess = false
        state.isPUViewImageBrokerError = true
    })

    }
})

export const 
   {
    resetRegisterProfile,
    resetRegisterMessages,
    resetUpdatedProfileMessage,
    resetDeleteProfileMessage,
    resetUpdatedProfile,
    resetAllProfilesByBrokerId,
    resetProfileDetailsById,
    resetDistrictsByState,
    resetImageUploadByState,
    resetProfileList,
    resetdeleteProfile,
    resetUpdateHoroscope,
    resetProfilePicture,
    resetBrokerApproved,
    resetBrokerCreatedProfile,
    resetgetAdminApprovedProfiles,
    resetGetAlreadyExistsUser,
    resetGetProfileImageUrl,
    resetProfileHoroscopeDetailsById,
    resetGetProfileDetailsById,
    resetRemoveProfileImage,
    resetaddcommand,
    resetPUProfileBrokerAllow,
    resetPUViewImageBrokerAllow,
    setPagination, resetPagination,
    setFilters,
    resetsetFilters,
    resetMessage
    
   } = profSlice.actions
export default profSlice.reducer