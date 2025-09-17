import{createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import adminBrokerService from '../Services/adminBrokerService'
import azureService  from '../Services/azureService'

const initialState = {

    isAdminCreateBrokerLoading:false,
    isAdminCreateBrokerSuccess:false,
    isAdminCreateBrokerError:false,
    AdminCreateBrokerMessage:'',
    brokerId:'',

    isGetBrokerByIdLoading:false,
    isGetBrokerByIdSuccess:false,
    isGetBrokerByIdError:false,
    brokerDetail:{},

    isAdminUpdateBrokerLoading:false,
    isAdminUpdateBrokerSuccess:false,
    isAdminUpdateBrokerError:false,
    AdminUpdateBrokerMessage:'',

    isAdminDelateBrokerLoading:false,
    isAdminDelateBrokerSuccess:false,
    isAdminDelateBrokerError:false,
    AdminDelateBrokerMessage:'',

    isGetAllBrokerPlanLoading:false,
    isGetAllBrokerPlanSuccess:false,
    isGetAllBrokerPlanError:false,
    GetAllBrokerPlanList:[],

    isTopUpPlanBrokerLoading:false,
    isTopUpPlanBrokerSuccess:false,
    isTopUpPlanBrokerError:false,
    TopUpPlanBrokerMessage:'',

    isUploadBrokProfileError:false,
    isUploadBrokProfileSuccess:false,
    isUploadBrokProfileLoading:false,
    uploadBrokProfilemessage:'',

    isGetBrokImageListError:false,
    isGetBrokImageSuccess:false,
    isGetBrokImageLoading:false,
    isGetBrokImageMessage:'',
    Images:[],

    isGetAllPUProfileLoading:false,
    isGetAllPUProfileSuccess:false,
    isGetAllPUProfileError:false,
    GetAllPUProfile:[],
    GetAllPUProfileTotal:0,
    GetAllPUProfileTotals:0,
    images:[],
    GetAllBrokerAssigend:0,

    isgetPUprofileDetailLoading:false,
    isgetPUprofileDetailSuccess:false,
    isgetPUprofileDetailError:false,
    PUprofileDetail:{},

    isgetallMatNameLoading:false,
    isgetallMatNameSuccess:false,
    isgetallMatNameErro:false,
    MatName:[],

    isgetallBrokerNameLoading:false,
    isgetallBrokerNameSuccess:false,
    isgetallBrokerNameError:false,
    BrokerName:[],

    isAssignBrokerLoading:false,
    isAssignBrokerSuccess:false,
    isAssignBrokerError:false,
    AssignBrokerMessage:'',

    isPUProfileImageUrlLoading:false,
    isPUProfileImageUrlSuccess:false,
    isPUProfileImageUrlError:false,
    ImageUrl:[],

    BrokertoPublicLoading:false,
    BrokertoPublicSuccess:false,
    BrokertoPublicError:false,
    BrokertoPublicMessage:'',

    isBrokertoBrokerLoading:false,
    isBrokertoBrokerSuccess:false,
    isBrokertoBrokerError:false, 
    BrokerToBroker:[],
    brokerTotal:  0,
    selectedBrokerIdList:[],
     brokImageList: [],

    isAdminAsignBrokertoBrokerLoading:false,
    isAdminAsignBrokertoBrokerSuccess:false,
    isAdminAsignBrokertoBrokerError:false,
    AdminAsignBrokertoBrokerMessage :'',

    isBrokertoBrokerLoading:false,
    isBrokertoBrokerSuccess:false,
    isBrokertoBrokerError:false,
    BrokerToBroker:[],

    isPUProfileImageUrlLoading:false,
    isPUProfileImageUrlSuccess:false,
    isPUProfileImageUrlError:false,
    ImageUrl:[],

    isgetAllPUMarriageProfileLoading:false,
    isgetAllPUMarriageProfileSuccess:false,
    isgetAllPUMarriageProfileError:false,
    getAllPUMarriageProfilePages:0,
    getAllPUMarriageProfileRecods:0,
    ProfileImage:[],
    GetAllPUMarriageProfile:[],

    isAdmindeletePUprofileLoading:false,
    isAdmindeletePUprofileSuccess:false,
    isAdmindeletePUprofileError:false,
    Admindeleteprofile:""
    
}

export const adminRegisterBroker = createAsyncThunk(
    'admin/adminRegisterBroker',
    async(data,thunkAPI)=>{
        try{
            return await adminBrokerService.adminRegisterBroker(data)
        }
        catch(error){
            const message=(error.response && error.response.data 
                && error.response.data.message) || error.message || error.tostring()

                return thunkAPI.rejectWithValue(message)
        }
    }
)

export const adminGetBrokerByID = createAsyncThunk(
    'admin/adminGetBrokerByID',
    async(id,thunkAPI)=>{
        try{
            return await adminBrokerService.adminGetBrokerById(id)
        }
        catch(error){
            const message=(error.response && error.response.data 
                && error.response.data.message) || error.message || error.tostring()

                return thunkAPI.rejectWithValue(message)
        }
    }
)

export const adminUpdateBroker= createAsyncThunk(
    'admin/adminUpdateBroker',
    async(data,thunkAPI)=>{
        try{
            return await adminBrokerService.adminUpdateBroker(data)
        }
        catch(error){
            const message=(error.response && error.response.data 
                && error.response.data.message) || error.message || error.tostring()

                return thunkAPI.rejectWithValue(message)
        }
    }
)

export const adminDeleteBroker = createAsyncThunk(
    'admin/adminDeleteBroker',
    async(data,thunkAPI)=>{
        try{
            return await adminBrokerService.adminDeleteBroker(data)
        }
        catch(error){
            const message=(error.response && error.response.data 
                && error.response.data.message) || error.message || error.tostring()

                return thunkAPI.rejectWithValue(message)
}
}
)

export const getBrokerPlan = createAsyncThunk(
    "admin/getBrokerPlan",    
    async(id,thunkAPI)=>{
        try{
            return await adminBrokerService.getBrokerPlan(id)
        }
        catch(error){
            const message=(error.response && error.response.data 
                && error.response.data.message) || error.message || error.tostring()

                return thunkAPI.rejectWithValue(message)
        }
    }
)

export const topUpPlanBroker = createAsyncThunk(
    'brok/topUpPlanBroker',
    async(data,thunkAPI)=>{
        try{
            return await adminBrokerService.topUpPlanBroker(data)
        }
        catch(error){
            const message=(error.response && error.response.data 
                && error.response.data.message) || error.message || error.tostring()

                return thunkAPI.rejectWithValue(message)
        }
    }
)

export const uploadBrokerImage = createAsyncThunk(
    'admin/uploadBrokerImage',
    async(fileData,thunkAPI)=>{
        try{
             return await azureService.uploadBrokerImage(fileData);
        }
        catch(error){
            const message = (error.response && error.response.data &&
                error.response.data.message) || error.message || error.tostring()

                return thunkAPI.rejectWithValue(message)
        }
    }
)

export const getBrokImageUrl = createAsyncThunk(
    'admin/getBrokImageUrl',
    async(data,thunkAPI)=>{
        try{
           
             return await adminBrokerService.getBrokImageUrl(data)
        }
        catch(error){
            const message = (error.response && error.response.data &&
                error.response.data.message) || error.message || error.tostring()

                return thunkAPI.rejectWithValue(message)
        }
    }
)

export const getallPUprofile = createAsyncThunk(
    'admin/getallPUprofile',async(data,thunkAPI)=>{
        try{
            return await adminBrokerService.getallPUprofile(data)
        }
         catch(error){
            const message = (error.response && error.response.data &&
                error.response.data.message) || error.message || error.tostring()

                return thunkAPI.rejectWithValue(message)
        }
    }
)

export const getPUprofileById = createAsyncThunk(
    'admin/getPUprofileById',async(id,thunkAPI)=>{
        try{
            return await adminBrokerService.getPUprofileById(id)
        }
        catch(error){
            const message = (error.response && error.response.data &&
                error.response.data.message) || error.message || error.tostring()
                return thunkAPI.rejectWithValue(message)
        }
    }
)

export const getallMatName = createAsyncThunk(
    'admin/getallMatName',async(thunkAPI)=>{
        try{
            return await adminBrokerService.getallMatName()
        }
        catch(error){
            const message = (error.response && error.response.data &&
                error.response.data.message) || error.message || error.tostring()
                return thunkAPI.rejectWithValue(message)
        }
    }
)

export const getallBrokerName = createAsyncThunk(
    'admin/getallBrokerName',async(thunkAPI)=>{
        try{
            return await adminBrokerService.getallBrokerName()
        }
        catch(error){
            const message = (error.response && error.response.data &&
                error.response.data.message) || error.message || error.tostring()
                return thunkAPI.rejectWithValue(message)
        }
    }
)

export const AssignBroker = createAsyncThunk(
    'admin/AssignBroker',async(data,thunkAPI)=>{
        try{
            return await adminBrokerService.AssignBroker(data)
        }
         catch(error){
            const message = (error.response && error.response.data &&
                error.response.data.message) || error.message || error.tostring()
                return thunkAPI.rejectWithValue(message)
        }
    }
)

export const PUProfileImageUrl = createAsyncThunk(
    'admin/PUProfileImageUrl',
    async(data,thunkAPI)=>{
        try{
            return await adminBrokerService.PUProfileImageUrl(data)
        }
        catch(error){
            const message = (error.response && error.response.data &&
                error.response.data.message) || error.message || error.tostring()
                return thunkAPI.rejectWithValue(message)
        }
    }
)


export const BrokertoPublic=createAsyncThunk(
    'admin/BrokertoPublic',async(data,thunkAPI)=>{
        try{
            return await adminBrokerService.BrokertoPublic(data)
        }
        catch(error){
            const message =(error.responce && error.responce.data &&
                error.responce.data.message
            )|| error.message || error.tostring()
            return thunkAPI.rejectWithValue(message)
        }
    }
)
export const getBrokerToBroker = createAsyncThunk(
    'admin/getBrokerToBroker',
    async(data,thunkAPI)=>{ 
        try{
            return await adminBrokerService.getBrokerToBroker(data)
        }
        catch(error){
            const message = (error.response && error.response.data &&
                error.response.data.message) || error.message || error.tostring()
                return thunkAPI.rejectWithValue(message)
        }
    }
    
)
export const adminAssignBrokertoBroker = createAsyncThunk(
   'admin/adminAssignBrokertoBroker',
   async(data,thunkAPI)=>{
    try{
        return await adminBrokerService.adminAssignBrokertoBroker(data)
    }
     catch(error){
            const message = (error.response && error.response.data &&
                error.response.data.message) || error.message || error.tostring()
                return thunkAPI.rejectWithValue(message)
        }
   } 
)

export const getAllPUMarriageProfile = createAsyncThunk(
    'admin/getAllPUMarriageProfile',
    async(data,thunkAPI)=>{
        try{
            return await adminBrokerService.getAllPUMarriageProfile(data)
        }
        catch(error){
            const message = (error.response && error.response.data &&
                error.response.data.message) || error.message || error.tostring()
                return thunkAPI.rejectWithValue(message)
        }
    }
)

export const AdmindeletePUprofile = createAsyncThunk(
    'admin/AdmindeletePUprofile',
    async(data,thunkAPI)=>{
        try{
            return await adminBrokerService.AdmindeletePUprofile(data)
        }
        catch(error){
            const message = (error.response && error.response.data &&
                error.response.data.message) || error.message || error.tostring()
                return thunkAPI.rejectWithValue(message)
        }
    }
)


export const adminBrokerSlice = createSlice({
    name:'admin',
    initialState,
    reducers:{

        resetAdminRegisterBroker:(state)=>{
            state.isAdminCreateBrokerLoading = false
            state.isAdminCreateBrokerSuccess = false
            state.isAdminCreateBrokerError = false
            state.AdminCreateBrokerMessage = ''
            state.brokerId = ''
        },
        resetAdminUpdateBroker:(state)=>{
            state.isAdminUpdateBrokerLoading = false
            state.isAdminUpdateBrokerSuccess = false
            state.isAdminUpdateBrokerError = false
            state.AdminUpdateBrokerMessage = ''
        },
//         resetadminDeleteBroker:(state)=>{
//             state.isAdminDelateBrokerLoading = false,
//             state.isAdminDelateBrokerSuccess = false,
//             state.isAdminDelateBrokerError = false,
//             state.AdminDelateBrokerMessage =''
//     },
       resetgetBrokerPlan:(state)=>{
          state.isGetAllBrokerPlanLoading = false
          state.isGetAllBrokerPlanSuccess = false
          state.isGetAllBrokerPlanError = false
        },
       resetTopUpPlanBroker:(state)=>{
            state.isTopUpPlanBrokerLoading = false
            state.isTopUpPlanBrokerSuccess = false
            state.isTopUpPlanBrokerError = false
            state.TopUpPlanBrokerMessage = ''
        },
         resetImageUploadByState:(state)=>{
            state.uploadBrokProfilemessage = ''
            state.isUploadBrokProfileSuccess = false
            state.isUploadBrokProfileLoading = false
            state.isUploadBrokProfileError = false
        },
          resetgetBrokImageUrl:(state)=>{
            state.isGetBrokImageListError = false
            state.isGetBrokImageSuccess = false
            state.isGetBrokImageLoading = false
            state.isGetBrokImageMessage = ''
            state.Images =[]
        },
         resetgetallPUprofile:(state)=>{
            state.isGetAllPUProfileLoading = false
            state.isGetAllPUProfileSuccess = false
            state.isGetAllPUProfileError = false
            state.GetAllPUProfile=[]
         },
        setPUprofileFilters: (state, action) => {
            state.filters = action.payload;
        },

         resetgetPUprofileById:(state)=>{
            state.isgetPUprofileDetailLoading =false
            state.isgetPUprofileDetailSuccess =false
            state.isgetPUprofileDetailError=false
            state.PUprofileDetail={}
         },
         resetgetallMatName:(state)=>{
            state.isgetallMatNameLoading=false
            state.isgetallMatNameSuccess=false
            state.isgetallMatNameErro=false
            state.MatName=[]
         },
         resetgetallBrokerName:(state)=>{
            state.isgetallBrokerNameLoading=false
            state.isgetallBrokerNameSuccess=false
            state.isgetallBrokerNameError=false
            state.BrokerName=[]
         },
         resetadminGetBrokerByID:(state)=>{
            state.isGetBrokerByIdLoading=false
            state.isGetBrokerByIdSuccess=false
            state.isGetBrokerByIdError=false
            state.brokerDetail={}
         },
         resetAssignBroker:(state)=>{
            state.isAssignBrokerLoading = false
            state.isAssignBrokerSuccess = false
            state.isAssignBrokerError = false
            state.AssignBrokerMessage = ''
         },
         resetBrokertoBroker:(state)=>{
                state.isBrokertoBrokerLoading = false
                state.isBrokertoBrokerSuccess = false
                state.isBrokertoBrokerError = false
                state.BrokerToBroker = []
                state.brokerTotal = 0
        },
        resetisAdminAsignBrokertoBroker:(state)=>{
            state.isAdminAsignBrokertoBrokerLoading = false
            state.isAdminAsignBrokertoBrokerSuccess = false
            state.isAdminAsignBrokertoBrokerError = false
            state.AdminAsignBrokertoBrokerMessage = ''
        },
         returnPUProfileImageUrl:(state)=>{
            state.isPUProfileImageUrlLoading = false
            state.isPUProfileImageUrlSuccess = false
            state.isPUProfileImageUrlError = false
            state.ImageUrl = []
         },
         setPUMarriadeProfileFilter:(state, action)=>{
            state.filters= action.payload
         },
         resetAdmindeletePUprofile:(state, action)=>{
            state.isAdmindeletePUprofileLoading = false
            state.isAdmindeletePUprofileSuccess = false
            state.isAdmindeletePUprofileError = false
            state.Admindeleteprofile = ""
         }


    },
    extraReducers:(builder)=>{
    builder

    .addCase(adminRegisterBroker.pending,(state)=>{
        state.isAdminCreateBrokerLoading = true
    })
    .addCase(adminRegisterBroker.fulfilled,(state,action)=>{
        state.isAdminCreateBrokerLoading = false
        state.isAdminCreateBrokerSuccess = action.payload.isSuccess
        state.AdminCreateBrokerMessage = action.payload.message
        state.brokerId = action.payload.brokerId
    })
    .addCase(adminRegisterBroker.rejected,(state,action)=>{
        state.isAdminCreateBrokerLoading = false
        state.isAdminCreateBrokerSuccess = false
        state.isAdminCreateBrokerError = true
        state.AdminCreateBrokerMessage = action.payload.message
    })
    .addCase(adminGetBrokerByID.pending,(state)=>{
        state.isGetBrokerByIdLoading=true
    })
    .addCase(adminGetBrokerByID.fulfilled,(state,action)=>{
        state.isGetBrokerByIdSuccess=action.payload.isSuccess
        state.brokerDetail=action.payload.brokerDetail
    })
    .addCase(adminGetBrokerByID.rejected,(state,action)=>{
        state.isGetBrokerByIdSuccess=false
        state.isGetBrokerByIdError=true
        state.brokerDetail={}
    })

    
    .addCase(adminUpdateBroker.pending,(state)=>{
        state.isAdminUpdateBrokerLoading=true
    })
    .addCase(adminUpdateBroker.fulfilled,(state,action)=>{
        state.isAdminUpdateBrokerLoading=false
        state.isAdminUpdateBrokerSuccess=action.payload.isSuccess
        state.AdminUpdateBrokerMessage=action.payload.message
    })
    .addCase(adminUpdateBroker.rejected,(state,action)=>{
        state.isAdminUpdateBrokerSuccess=false
        state.isAdminUpdateBrokerError=true
        state.adminUpdateBroker=action.payload
    })
    .addCase(adminDeleteBroker.pending,(state)=>{
        state.isAdminDelateBrokerLoading = true
    })
    .addCase(adminDeleteBroker.fulfilled, (state, action) => {
        state.isAdminDelateBrokerSuccess = action.payload.isSuccess;
        state.AdminDelateBrokerMessage = action.payload.message;
    })
      .addCase(adminDeleteBroker.rejected, (state, action) => {
        state.isAdminDelateBrokerError = true;
        state.AdminDelateBrokerMessage = action.payload;
    })
    .addCase(getBrokerPlan.pending,(state)=>{
        state.isGetAllBrokerPlanLoading = true
    })
    .addCase(getBrokerPlan.fulfilled,(state,action)=>{
        state.isGetAllBrokerPlanLoading = false
        state.isGetAllBrokerPlanSuccess = action.payload.isSuccess
        state.GetAllBrokerPlanList = action.payload.GetAllBrokerPlanList
    })
    .addCase(getBrokerPlan.rejected,(state,action)=>{
        state.isGetAllBrokerPlanLoading = false
        state.isGetAllBrokerPlanSuccess = false
        state.isGetAllBrokerPlanError = true
        state.GetAllBrokerPlanList = []
    })

   .addCase(topUpPlanBroker.pending,(state)=>{
        state.isTopUpPlanBrokerLoading = true
     })
    .addCase(topUpPlanBroker.fulfilled,(state,action)=>{
        state.isTopUpPlanBrokerLoading = false
        state.isTopUpPlanBrokerSuccess = true
        if(action.payload.isSuccess === false){
            state.isTopUpPlanBrokerSuccess = false
            state.isTopUpPlanBrokerError = action.payload.message
        }
        state.TopUpPlanBrokerMessage = action.payload.message
    })
    .addCase(topUpPlanBroker.rejected,(state,action)=>{
        state.isTopUpPlanBrokerLoading = false
        state.isTopUpPlanBrokerSuccess = false
        state.isTopUpPlanBrokerError = true
        state.TopUpPlanBrokerMessage = action.payload.message
    })

    .addCase(uploadBrokerImage.pending,(state)=>{
        state.isUploadBrokProfileLoading = true;
    })
    .addCase(uploadBrokerImage.fulfilled,(state,action)=>{
        state.isUploadBrokProfileLoading = false
        state.isUploadBrokProfileSuccess = true
        state.uploadBrokProfilemessage = action.payload.data
    })
    .addCase(uploadBrokerImage.rejected,(state,action)=>{
        state.isUploadBrokProfileLoading = false
        state.isUploadBrokProfileError = true
        state.isUploadBrokProfileSuccess = false
        state.uploadBrokProfilemessage = ''
    })

    .addCase(getBrokImageUrl.pending,(state)=>{
        state.isGetBrokImageLoading = true
    })
    .addCase(getBrokImageUrl.fulfilled,(state,action)=>{
        state.isGetBrokImageLoading = false
        state.isGetBrokImageSuccess = true
        state.Images = action.payload.data    
    })
    .addCase(getBrokImageUrl.rejected,(state,action)=>{
        state.isGetBrokImageLoading = false
        state.isGetBrokImageSuccess = false
        state.isGetBrokImageListError = true
        state.Images = []
    })
    .addCase(getallPUprofile.pending,(state)=>{
        state.isGetAllPUProfileLoading=true
    })
    .addCase(getallPUprofile.fulfilled,(state,action)=>{
        state.isGetAllPUProfileLoading=false
        state.isGetAllPUProfileSuccess=action.payload.isSuccess
        state.GetAllPUProfile=action.payload.profile
        state.GetAllPUProfileTotal = action.payload.totalPages
        state.GetAllPUProfileTotals = action.payload.totalRecords
        state.images = action.payload.images
        state.GetAllBrokerAssigend = action.payload.brokerAssigend
    })
    .addCase(getallPUprofile.rejected,(state,action)=>{
        state.isGetAllPUProfileSuccess=false
        state.isGetAllPUProfileError=true
        state.GetAllPUProfile=[]
        state.GetAllPUProfileTotal = 0
        state.GetAllPUProfileTotals = 0
        state.images = []
        state.GetAllBrokerAssigend = 0
    })

    .addCase(getPUprofileById.pending,(state)=>{
        state.isgetPUprofileDetailLoading=true
    })
    .addCase(getPUprofileById.fulfilled,(state,action)=>{
        state.isgetPUprofileDetailSuccess=action.payload.isSuccess
        state.PUprofileDetail=action.payload.PUprofileDetail
    })
    .addCase(getPUprofileById.rejected,(state,action)=>{
        state.isgetPUprofileDetailError=true
        state.PUprofileDetail={}
    })

    .addCase(getallMatName.pending,(state)=>{
        state.isgetallMatNameLoading=true
    })
    .addCase(getallMatName.fulfilled,(state,action)=>{
        state.isgetallMatNameLoading=false
        state.isgetallMatNameSuccess=true
        state.MatName=action.payload
    })
    .addCase(getallMatName.rejected,(state)=>{
        state.isgetallMatNameLoading=false
        state.isgetallMatNameErro=true
        state.MatName=[]
    })

    .addCase(getallBrokerName.pending,(state)=>{
        state.isgetallBrokerNameLoading=true
    })
    .addCase(getallBrokerName.fulfilled,(state,action)=>{
        state.isgetallBrokerNameLoading=false
        state.isgetallBrokerNameSuccess=true
        state.BrokerName=action.payload
    })
    .addCase(getallBrokerName.rejected,(state,action)=>{
        state.isgetallBrokerNameLoading=false
        state.isgetallBrokerNameError=true
        state.BrokerName=[]
    })

    .addCase(AssignBroker.pending,(state)=>{
        state.isAssignBrokerLoading = true
    })
    .addCase(AssignBroker.fulfilled,(state,action)=>{
        state.isAssignBrokerLoading = false
        state.isAssignBrokerSuccess = action.payload.isSuccess
        state.AssignBrokerMessage = action.payload.message
    })
    .addCase(AssignBroker.rejected,(state,action)=>{
        state.isAssignBrokerError = true    
        state.AssignBrokerMessage=action.payload
    })
    .addCase(PUProfileImageUrl.pending,(state)=>{
        state.isPUProfileImageUrlLoading = true
    })
    .addCase(PUProfileImageUrl.fulfilled,(state,action)=>{
        state.isPUProfileImageUrlLoading = false
        state.isPUProfileImageUrlSuccess = action.payload.isSuccess
        state.ImageUrl = action.payload.data
    })
    .addCase(PUProfileImageUrl.rejected,(state,action)=>{
        state.isPUProfileImageUrlSuccess = false
        state.isPUProfileImageUrlError = true
        state.ImageUrl = []
    })
     .addCase(BrokertoPublic.pending,(state)=>{
            state.BrokertoPublicLoading=true
        })
        .addCase(BrokertoPublic.fulfilled,(state,action)=>{
            state.BrokertoPublicSuccess=action.payload.isSuccess
            state.BrokertoPublicMessage=action.payload.message
        })
        .addCase(BrokertoPublic.rejected,(state,action)=>{
            state.BrokertoPublicError=true
            state.BrokertoPublicMessage=action.payload
        })
    
       .addCase(getBrokerToBroker.pending,(state)=>{
            state.isBrokertoBrokerLoading = true
        })
        .addCase(getBrokerToBroker.fulfilled,(state,action)=>{
            debugger
            state.isBrokertoBrokerLoading = false
            state.isBrokertoBrokerSuccess = true
            state.BrokerToBroker = action.payload.BrokerToBroker
              state.brokerTotal =  action.payload.totalRecourd
              state.selectedBrokerIdList = action.payload.selectedBrokerIdList
              state.brokImageList = action.payload.brokImageList
              
        })
        .addCase(getBrokerToBroker.rejected,(state,action)=>{
            state.isBrokertoBrokerLoading = false
            state.isBrokertoBrokerError = true
            state.BrokerToBroker = []
              state.brokerTotal =  0
              state.brokImageList = []

        }) 
        .addCase(adminAssignBrokertoBroker.pending,(state)=>{
            state.isAdminAsignBrokertoBrokerLoading = true
        })
        .addCase(adminAssignBrokertoBroker.fulfilled,(state,action)=>{
            state.isAdminAsignBrokertoBrokerSuccess = action.payload.isSuccess
            state.AdminAsignBrokertoBrokerMessage=action.payload.message
        })
        .addCase(adminAssignBrokertoBroker.rejected,(state,action)=>{
            state.isAdminAsignBrokertoBrokerError=true
            state.AdminAsignBrokertoBrokerMessage=action.payload
        })

        .addCase(getAllPUMarriageProfile.pending,(state)=>{
            state.isgetAllPUMarriageProfileLoading = true
        })
        .addCase(getAllPUMarriageProfile.fulfilled,(state,action)=>{
            state.isgetAllPUMarriageProfileSuccess = true
            state.GetAllPUMarriageProfile = action.payload.marriageProfile
            state.getAllPUMarriageProfilePages = action.payload.totalPages
            state.getAllPUMarriageProfileRecods = action.payload.totalRecords
            state.ProfileImage = action.payload.PUImage
        })
        .addCase(getAllPUMarriageProfile.rejected,(state,action)=>{
            state.isgetAllPUMarriageProfileError = true
            state.GetAllPUMarriageProfile = []
            state.getAllPUMarriageProfilePages = 0
            state.getAllPUMarriageProfileRecods = 0
            state.ProfileImage = []
        })

        .addCase(AdmindeletePUprofile.pending,(state)=>{
            state.isAdmindeletePUprofileLoading = true
        })
        .addCase(AdmindeletePUprofile.fulfilled,(state,action)=>{
            state.isAdmindeletePUprofileLoading = false
            state.isAdmindeletePUprofileSuccess = action.payload.isSuccess
            state.Admindeleteprofile = action.payload.message
        })
        .addCase(AdmindeletePUprofile.rejected,(state,action)=>{
            state.isAdmindeletePUprofileLoading = false
            state.isAdmindeletePUprofileError = true
            state.Admindeleteprofile = action.payload.message
        })
}
})

export const{resetAdminRegisterBroker,resetAdminUpdateBroker,resetadminDeleteBroker,resetgetBrokerPlan,resetTopUpPlanBroker,
    resetImageUploadByState,resetgetPUprofileById,resetgetallPUprofile,resetgetallMatName,resetgetallBrokerName,
    resetadminGetBrokerByID,resetAssignBroker,resetBrokertoBroker,returnPUProfileImageUrl,resetisAdminAsignBrokertoBroker,
    setPUprofileFilters, setPUMarriadeProfileFilter,resetAdmindeletePUprofile} = adminBrokerSlice.actions

export default adminBrokerSlice.reducer