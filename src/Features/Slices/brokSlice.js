import{createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import brokService  from '../Services/brokService'
import azureService  from '../Services/azureService'
import axios from 'axios'
import  brokerService from '../Services/brokerService'
import { is } from 'date-fns/locale'
import { reset } from './authSlice'

const authAxious = axios.create({
    baseURL:'http://localhost:5000/api',
    headers:{
        Authorization:`Bearer ${localStorage.getItem("Authorization-key")}`
    },
})

const initialState ={
    brokers:[],
    broker:{},
    brokerImageUrl:'',
    brokeremail:'',
    brokerTotal:  0,
    brokerImageList:[],
    matchImageList:[],
    brokerDetails:{},
    isRegisterBrokerError:false,
    isRegisterBrokerSuccess:false,
    isRegisterBrokerLoading:false,
    message:'',
    RegisterBrokermessage:'',

    isBrokerDetailByIdError:false,
    isBrokerDetailByIdSuccess:false,
    isBrokerDetailByIdLoading:false,
    BrokerDetailByIdmessage:'',

    isUploadProfileError:false,
    isUploadProfileSuccess:false,
    isUploadProfileLoading:false,
    uploadProfilemessage:'',

    isTopUpPlanBrokerLoading:false,
    isTopUpPlanBrokerSuccess:false,
    isTopUpPlanBrokerError:false,
    TopUpPlanBrokerMessage:'',
    
    isNewPUProfileListLoading:false,
    isNewPUProfileListSuccess:false,
    isNewPUProfileListError:false,
    ApproveProfiles:[],
    ApproveImage:[],
    TotalProfile:  0,

    isProfiledetailLoading:false,
    isProfiledetailSuccess:false,
    isProfiledetailError:false,
    Profiledetails:{},
    ProfileImages:[],

    isPUProfileRegisterInMarriageProfileTableLoading:false,
    isPUProfileRegisterInMarriageProfileTableSuccess:false,
    isPUProfileRegisterInMarriageProfileTableError:false,
    PUProfileRegisterInMarriageProfileTableMessage:'',

    isRejectProfileLoading:false,
    isRejectProfileSuccess:false,
    isRejectProfileError:false,
    RejectedMessage:'',

    isgetMatchProfileLoading:false,
    isgetMatchProfileSuccess:false,
    isgetMatchProfileError:false,
    MatchProfile:[],
    filters: {
    selectedStars: []
    },

    isImageListError:false,
    isImageSuccess:false,
    isImageLoading:false,
    imageMessage:'',
    Images:[],

    isgetBrokerToBrokerLoadin: false,
    isgetBrokerToBrokerSuccess: false,
    isgetBrokerToBrokerError: false,
    BrokerToBroker:[],
    brokImageList:[],

    isAllProfilesByBrokerIdLoading: false,
    isAllProfilesByBrokerIdSuccess: false,
    isAllProfilesByBrokerIdError: false,
    allProfilesByBrokerIdmessage: false,
    profiles: [],
    profileTotal: 0,
    profileTotals:  0,
    profileImageList: [],
    filter: {},

     isgetBrokProfByIdLoading: false,
    isgetBrokProfByIdSuccess: false,
    isgetBrokProfByIdError: false,
    isgetBrokProfByIdMessae: false,
    ProfileDetail: {},

    isgetBrokerProfileImageUrlLoading: false,
    isgetBrokerProfileImageUrlSuccess: false,
    isgetBrokerProfileImageUrlError: false,
    ImageUrl: [],

    isGetBrokerDetailsLoading : false,
    isGetBrokerDetailsSuccess : false,
    isGetBrokerDetailsError : false,
    BrokerDetails : {},

}
//const token = sessionStorage.getItem("Authorization-key");


// export const fetchBrokers = createAsyncThunk('brok/fetchBrokers',()=>{
    
//     return axios.get('http://localhost:5000/api/broker/getAllBroker1').then((response)=> response.data
   
//     )
// })

// export const fetchBrokers12 = createAsyncThunk('brok/fetchBrokers',()=>{
   
    
//    return authAxious.get('/broker/getAllBroker1')
// .then((res) => res.data)
// .catch((error) => {
//   console.error(error)
// })


   
// })


export const fetchBrokers = createAsyncThunk(
    'brok/getAllBroker',
    async(data,thunkAPI)=>{
        try{
             return await brokService.fetchAllBrokers(data)
        }
        catch(error){
            const message = (error.response && error.response.data &&
                error.response.data.message) || error.message || error.tostring()

                return thunkAPI.rejectWithValue(message)
        }
    }
)

export const registerBroker = createAsyncThunk(
    'brok/registerBroker',
    async(data,thunkAPI)=>{
        try{
             return await brokService.registerBroker(data)
        }
        catch(error){
            const message = (error.response && error.response.data &&
                error.response.data.message) || error.message || error.tostring()

                return thunkAPI.rejectWithValue(message)
        }
    }
)




export const getAllBrokers = createAsyncThunk(
    'brok/getAllBrokers',
    async(data,thunkAPI)=>{
        try{
             //return await brokService.getAllBrokers()
             return await brokService.fetchAllBrokers()
        }
        catch(error){
            const message = (error.response && error.response.data &&
                error.response.data.message) || error.message || error.tostring()

                return thunkAPI.rejectWithValue(message)
        }
    }
)

export const getBrokerDetailById = createAsyncThunk(
    'brok/getBrokerDetailById',
    async(data,thunkAPI)=>{
        try{
             return await brokService.getBrokerDetailById(data)
        }
        catch(error){
            const message = (error.response && error.response.data &&
                error.response.data.message) || error.message || error.tostring()

                return thunkAPI.rejectWithValue(message)
        }
    }
)

export const uploadfile = createAsyncThunk(
    'brok/uploadBrokerImage',
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

export const topUpPlanBroker = createAsyncThunk(
    'brok/topUpPlanBroker',
    async(data,thunkAPI)=>{
        try{
            return await brokService.topUpPlanBroker(data)
        }
        catch(error){
            const message=(error.response && error.response.data 
                && error.response.data.message) || error.message || error.tostring()

                return thunkAPI.rejectWithValue(message)
        }
    }
)

export const getNewPUProfileList = createAsyncThunk(
    'brok/getNewPUProfileList',
    async(data,thunkAPI)=>{
        try{
            return await brokerService.getNewPUProfileList(data)
        }
        catch(error){
            const message=(error.response && error.response.data 
                && error.response.data.message) || error.message || error.tostring()

                return thunkAPI.rejectWithValue(message)
        }
    }

)

export const BrokerApproveDetailsById = createAsyncThunk(
    'brok/BrokerApproveDetailsById',
    async(data,thunkAPI)=>{
        try{
            return await brokerService.BrokerApproveDetailsById(data)
        }
        catch(error){
            const message=(error.response && error.response.data 
                && error.response.data.message) || error.message || error.tostring()

                return thunkAPI.rejectWithValue(message)
        }
    }

)

export const PUProfileRegisterInMarriageProfileTable = createAsyncThunk(
    'brok/PUProfileRegisterInMarriageProfileTable',
    async(data,thunkAPI)=>{
        try{
            return await brokerService.PUProfileRegisterInMarriageProfileTable(data)
        }
        catch(error){
            const message=(error.response && error.response.data 
                && error.response.data.message) || error.message || error.tostring()

                return thunkAPI.rejectWithValue(message)
        }
    }

)

export const RejectProfile = createAsyncThunk(
    'brok/RejectProfile',
    async(data,thunkAPI)=>{
        try{
            return await brokerService.RejectProfile(data)
        }
        catch(error){
            const message=(error.response && error.response.data 
                && error.response.data.message) || error.message || error.tostring()

                return thunkAPI.rejectWithValue(message)
        }
    }

)

export const getMatchProfile = createAsyncThunk(
    'brok/getMatchProfile',
    async(data,thunkAPI)=>{
        try{
            return await brokerService.getMatchProfile(data)
        }
        catch(error){
            const message=(error.response && error.response.data 
                && error.response.data.message) || error.message || error.tostring()

                return thunkAPI.rejectWithValue(message)
        }
    }

)

export const getPUImageUrl = createAsyncThunk(
    'brok/getPUImageUrl',
    async(data,thunkAPI)=>{
        try{
           
             return await brokerService.getPUImageUrl(data)
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
           
             return await brokerService.getProfileImageUrl(data)
        }
        catch(error){
            const message = (error.response && error.response.data &&
                error.response.data.message) || error.message || error.tostring()

                return thunkAPI.rejectWithValue(message)
        }
    }
)

export const getBrokerToBroker =createAsyncThunk(
   'broker/BrokerToBroker',
   async(data,thunkAPI)=>{
    try{
        return await brokerService.getBrokerToBroker(data)
    }
    catch(error){
        const message = (error.response && error.response.data &&
            error.response.data.message) || error.message || error.tostring()

            return thunkAPI.rejectWithValue(message)
        }
   }
)

export const searchProfileBrokToBrok = createAsyncThunk(
    'broker/searchProfileBrokToBrok',
    async(data,thunkAPI)=>{
        try{
           
             return await brokerService.searchProfileBrokToBrok(data)
        }
        catch(error){
            const message = (error.response && error.response.data &&
                error.response.data.message) || error.message || error.tostring()

                return thunkAPI.rejectWithValue(message)
        }
    }
)

export const getBrokProfById = createAsyncThunk(
    'broker/getBrokProfById',
    async(data,thunkAPI)=>{
        try{
            return await brokerService.getBrokProfById(data)
        }
        catch(error){
            const message = (error.response && error.response.data &&
                error.response.data.message) || error.message || error.tostring()

                return thunkAPI.rejectWithValue(message)
        }
    }
)

export const GetBrokerDetails = createAsyncThunk(
    'broker/GetBrokerDetails',
    async(data,thunkAPI)=>{
        try{
            return await brokerService.GetBrokerDetails(data)
        }
        catch(error){
            const message = (error.response && error.response.data &&
                error.response.data.message) || error.message || error.tostring()

                return thunkAPI.rejectWithValue(message)
        }
    }
)

export const getBrokerProfileImageUrl = createAsyncThunk(
    'broker/getBrokerProfileImageUrl',
    async(data,thunkAPI)=>{
        try{
            return await brokerService.getBrokerProfileImageUrl(data)
        }
        catch(error){
            const message = (error.response && error.response.data &&
                error.response.data.message) || error.message || error.tostring()
                return thunkAPI.rejectWithValue(message)
        }
    }
)

const initializeBrokerList = (state) =>{
    state.brokers = []
    state.broker ={}
}

export const brokSlice = createSlice({
    name:'brok',
    initialState,
    reducers:{
        resetRegisterBroker:(state)=>{
            state.isRegisterBrokerLoading = false
            state.isRegisterBrokerError = false
            state.isRegisterBrokerSuccess = false
            state.RegisterBrokermessage = ''
           // initializeBrokerList(state);
        },
        resetImageUploadByState:(state)=>{
            state.uploadProfilemessage = ''
            state.isUploadProfileSuccess = false
            state.isUploadProfileLoading = false
            state.isUploadProfileError = false
        },
        resetTopUpPlanBroker:(state)=>{
            state.isTopUpPlanBrokerLoading = false
            state.isTopUpPlanBrokerSuccess = false
            state.isTopUpPlanBrokerError = false
            state.TopUpPlanBrokerMessage = ''
        }, 
        resetBrokerDetails:(state)=>{
            state.isBrokerDetailByIdLoading = false
            state.isBrokerDetailByIdSuccess = false
            state.BrokerDetailByIdmessage =''
        },
        resetNewPUProfileList:(state)=>{
            state.isNewPUProfileListLoading = false
            state.isNewPUProfileListSuccess = false
            state.isNewPUProfileListError = false
            state.ApproveProfiles = []
            state.TotalProfile=  0

        },
        resetProfileDetails:(state)=>{
            state.isProfiledetailLoading = false
            state.isProfiledetailSuccess = false
            state.isProfiledetailError = false
            state.Profiledetails = {}
        },
        resetPUProfileRegisterInMarriageProfileTable:(state)=>{
            state.isPUProfileRegisterInMarriageProfileTableLoading = false
            state.isPUProfileRegisterInMarriageProfileTableSuccess = false
            state.isPUProfileRegisterInMarriageProfileTableError = false
            state.PUProfileRegisterInMarriageProfileTableMessage = ''
        },
        resetRejectProfile:(state)=>{
            state.isRejectProfileLoading = false
            state.isRejectProfileSuccess = false
            state.isRejectProfileError = false
            state.RejectedMessage = ''
        },
        resetgetMatchProfile:(state)=>{
            state.isgetMatchProfileLoading = false
            state.isgetMatchProfileSuccess = false
            state.isgetMatchProfileError = false
            state.MatchProfile = []
            state.totalRecourd = 0
            state.totalRecords = 0
        },
        resetfetchBrokers:(state)=>{
            state.isfetchBrokerLoading = false
            state.isfetchBrokerSuccess = false
            state.isfetchBrokerError = false
            state.brokers = []
            state.brokerTotal = 0
            state.brokerImageList = []
        },

        resetBrokerToBroker:(state)=>{
            state.isgetBrokerToBrokerLoadin = false
            state.isgetBrokerToBrokerSuccess = false
            state.isgetBrokerToBrokerError = false
            //state.BrokerToBroker = []
        },
        
        resetsearchProfileBrokToBrok:(state)=>{
            state.isAllProfilesByBrokerIdLoading = false
            state.isAllProfilesByBrokerIdSuccess = false
            state.allProfilesByBrokerIdmessage = false
            state.profiles = []
            state.profileTotal = 0
            state.profileTotals = 0
            state.profileImageList = []
        },
        setFilter: (state, action) => {
                state.filter = action.payload;
               },
            resetgetBrokProfById:(state)=>{
            state. isgetBrokProfByIdLoading=false
            state.isgetBrokProfByIdSuccess=false
            state.isgetBrokProfByIdError=false
        },

        resetgetBrokProfById:(state)=>{
            state. isgetBrokProfByIdLoading=false
            state.isgetBrokProfByIdSuccess=false
            state.isgetBrokProfByIdError=false
        },

        resetgetBrokerProfileImageUrl:(state)=>{
            state.isgetBrokerProfileImageUrlLoading = false
            state.isgetBrokerProfileImageUrlSuccess = false
            state.isgetBrokerProfileImageUrlError= false
        },

        setStarFilters: (state, action) => {
            state.filters.selectedStars = action.payload;
        },
        resetStarFilters: (state) => {
            state.filters.selectedStars = [];
        },
    },
    extraReducers:(builder)=>{
        builder
        .addCase(fetchBrokers.pending,(state)=>{
            state.isfetchBrokerLoading = true;
        })
        .addCase(fetchBrokers.fulfilled,(state,action)=>{
            state.isfetchBrokerLoading = false
            state.isfetchBrokerSuccess = true
           state.brokers = action.payload.brokerList
           state.brokerTotal =  action.payload.totalRecourd
           state.brokerImageList =action.payload.imageUrls
        })
        .addCase(fetchBrokers.rejected,(state,action)=>{
            state.isfetchBrokerLoading = false
            state.isfetchBrokerError = true
            state.fetchBrokermessage = action.payload
            state.brokers = []
            state.brokerTotal =  0
            state.brokerImageList =[]
        })
        .addCase(registerBroker.pending,(state)=>{
            state.isRegisterBrokerLoading = true;
        })
        .addCase(registerBroker.fulfilled,(state,action)=>{
            state.isRegisterBrokerLoading = false
            state.isRegisterBrokerSuccess = true
            state.broker = action.payload
        })
        .addCase(registerBroker.rejected,(state,action)=>{
            state.isRegisterBrokerLoading = false
            state.isRegisterBrokerError = true
            state.RegisterBrokermessage = action.payload
            state.broker = {}
        }) 
        .addCase(getBrokerDetailById.pending,(state)=>{
            state.isBrokerDetailByIdLoading = true;
        })
        .addCase(getBrokerDetailById.fulfilled,(state,action)=>{
            state.isBrokerDetailByIdLoading = false
            state.isBrokerDetailByIdSuccess = true
            state.brokerDetails = action.payload.brokerDetails
            state.brokerImageUrl = action.payload.imageUrl
            debugger;
            state.brokeremail = action.payload.email
        })
        .addCase(getBrokerDetailById.rejected,(state,action)=>{
            state.isBrokerDetailByIdLoading = false
            state.isBrokerDetailByIdError = true
            state.BrokerDetailByIdmessage = action.payload
            state.brokerDetails = {}
            state.brokerImageUrl = ''
            state.brokeremail = ''
        })
        .addCase(uploadfile.pending,(state)=>{
            state.isUploadProfileLoading = true;
        })
        .addCase(uploadfile.fulfilled,(state,action)=>{
            state.isUploadProfileLoading = false
            state.isUploadProfileSuccess = true
            debugger
            state.UploadProfilemessage = action.payload.data
        })
        .addCase(uploadfile.rejected,(state,action)=>{
            state.isUploadProfileLoading = false
            state.isUploadProfileError = true
            state.UploadProfilemessage = ''
        })
        .addCase(topUpPlanBroker.pending,(state)=>{
            state.isTopUpPlanBrokerLoading = true
        })
        .addCase(topUpPlanBroker.fulfilled,(state,action)=>{
            state.isTopUpPlanBrokerLoading = false
            state.isTopUpPlanBrokerSuccess = action.payload.isSuccess
            state.TopUpPlanBrokerMessage = action.payload.message
        })
        .addCase(topUpPlanBroker.rejected,(state,action)=>{
            state.isTopUpPlanBrokerLoading = false
            state.isTopUpPlanBrokerSuccess = false
            state.isTopUpPlanBrokerError = true
            state.TopUpPlanBrokerMessage = action.payload.message
        })
        .addCase(getNewPUProfileList.pending,(state)=>{
            state.isNewPUProfileListLoading = true
        })
        .addCase(getNewPUProfileList.fulfilled,(state,action)=>{
            state.isNewPUProfileListLoading = false
            state.isNewPUProfileListSuccess = true
            state.ApproveProfiles = action.payload.ApproveProfiles
            state.ApproveImage = action.payload.imageList
            state.TotalProfile=action.payload.totalRecourd
            state.totalRecord = action.payload.totalRecord
        })
        .addCase(getNewPUProfileList.rejected,(state,action)=>{
            state.isNewPUProfileListError = true
            state.ApproveProfiles = []
            state.TotalProfile=  0

        })

        .addCase(BrokerApproveDetailsById.pending,(state)=>{
            state.isProfiledetailLoading = true
        })
        .addCase(BrokerApproveDetailsById.fulfilled,(state,action)=>{
            state.isProfiledetailLoading = false
            state.isProfiledetailSuccess = true
            state.Profiledetails = action.payload.Profiledetails
        })
        .addCase(BrokerApproveDetailsById.rejected,(state,action)=>{
            state.isProfiledetailLoading = false
            state.isProfiledetailError = true
            state.Profiledetails = {}
        })

        .addCase(PUProfileRegisterInMarriageProfileTable.pending,(state)=>{
            state.isPUProfileRegisterInMarriageProfileTableLoading = true
        })
        .addCase(PUProfileRegisterInMarriageProfileTable.fulfilled,(state,action)=>{
            state.isPUProfileRegisterInMarriageProfileTableLoading = false
            state.isPUProfileRegisterInMarriageProfileTableSuccess = action.payload.isSuccess
            state.PUProfileRegisterInMarriageProfileTableMessage = action.payload.message
        })
        .addCase(PUProfileRegisterInMarriageProfileTable.rejected,(state,action)=>{
            state.isPUProfileRegisterInMarriageProfileTableLoading = false
            state.isPUProfileRegisterInMarriageProfileTableError = action.payload.isSuccess
            state.PUProfileRegisterInMarriageProfileTableMessage = action.payload.message
        })

        .addCase(RejectProfile.pending,(state)=>{
            state.isRejectProfileLoading = true
        })
        .addCase(RejectProfile.fulfilled,(state,action)=>{
            state.isRejectProfileLoading = false
            state.isRejectProfileSuccess = action.payload.isSuccess
            state.RejectedMessage = action.payload.message
        })
        .addCase(RejectProfile.rejected,(state,action)=>{
            state.isRejectProfileLoading = false
            state.isRejectProfileError = action.payload.isSuccess
            state.RejectedMessage = action.payload.message
        })

        .addCase(getMatchProfile.pending,(state)=>{
            state.isgetMatchProfileLoading = true
        })
        .addCase(getMatchProfile.fulfilled,(state,action)=>{
            state.isgetMatchProfileLoading = false
            state.isgetMatchProfileSuccess = action.payload.isSuccess
            state.MatchProfile = action.payload.MatchProfile
            state.matchImageList = action.payload.images
            state.totalRecourd = action.payload.totalPlanRecourd 
            state.totalRecords = action.payload.totalPlanRecourds
        })
        .addCase(getMatchProfile.rejected,(state,action)=>{
            state.isgetMatchProfileLoading = false
            state.isgetMatchProfileError = true
            state.MatchProfile = []
            state.totalRecourd = 0
            state.totalRecords =0
        })

                .addCase(getPUImageUrl.pending,(state)=>{
                    state.isImageLoading = true;
                })
                .addCase(getPUImageUrl.fulfilled,(state,action)=>{
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
                .addCase(getPUImageUrl.rejected,(state,action)=>{
                    state.isImageLoading = false
                    state.isImageListError = true
                    state.Images = []
                })

                .addCase(getBrokerToBroker.pending,(state)=>{
                            state.isgetBrokerToBrokerLoadin = true
                        })
                        .addCase(getBrokerToBroker.fulfilled,(state,action)=>{
                            state.isgetBrokerToBrokerLoadin = false
                            state.isgetBrokerToBrokerSuccess = true
                            state.BrokerToBroker = action.payload.BrokerToBroker
                            state.brokImageList = action.payload.brokImageList
                        })
                        .addCase(getBrokerToBroker.rejected,(state)=>{
                            state.isgetBrokerToBrokerSuccess = false
                            state.isgetBrokerToBrokerError = true
                            state.BrokerToBroker = []
                        })
                
                        .addCase(searchProfileBrokToBrok.pending,(state)=>{
                            state.isAllProfilesByBrokerIdLoading = true;
                        })
                        .addCase(searchProfileBrokToBrok.fulfilled,(state,action)=>{
                            state.isAllProfilesByBrokerIdLoading = false
                            state.isAllProfilesByBrokerIdSuccess = true
                            state.profiles = action.payload.profiles
                            state.profileTotal =  action.payload.totalRecourd
                            state.profileTotals =  action.payload.totalRecords
                            state.profileImageList =action.payload.images
                        })
                        .addCase(searchProfileBrokToBrok.rejected,(state,action)=>{
                            state.isAllProfilesByBrokerIdLoading = false
                            state.isAllProfilesByBrokerIdError = true
                            state.allProfilesByBrokerIdmessage = action.payload
                            state.profiles = []
                            state.profileTotal = 0
                            state.profileTotals =  0
                            state.profileImageList =[]
                        })
                        .addCase(getBrokProfById.pending,(state)=>{
                            state. isgetBrokProfByIdLoading = true
                        })
                        .addCase(getBrokProfById.fulfilled,(state,action)=>{
                            state. isgetBrokProfByIdLoading = false
                            state.isgetBrokProfByIdSuccess = true
                            state.isgetBrokProfByIdMessae = action.payload.isSuccess
                            state.ProfileDetail = action.payload.ProfileDetail
                        })
                        .addCase(getBrokProfById.rejected,(state,action)=>{
                             state. isgetBrokProfByIdLoading = false
                            state.isgetBrokProfByIdError = true
                            state.ProfileDetail = {}
                        })

        .addCase(getBrokerProfileImageUrl.pending,(state)=>{
            state.isgetBrokerProfileImageUrlLoading =true
        })
        .addCase(getBrokerProfileImageUrl.fulfilled,(state,action)=>{
            state.isgetBrokerProfileImageUrlLoading = false
            state.isgetBrokerProfileImageUrlSuccess = action.payload.isSuccess
            state.ImageUrl = action.payload.data
        })
        .addCase(getBrokerProfileImageUrl.rejected,(state,action)=>{
             state.isgetBrokerProfileImageUrlError = true
            state.ImageUrl = []
        })

        .addCase(GetBrokerDetails.pending,(state)=>{
            state.isGetBrokerDetailsLoading  = true
        })
        .addCase(GetBrokerDetails.fulfilled,(state,action)=>{
            state.isGetBrokerDetailsLoading  = false
            state.isGetBrokerDetailsSuccess = action.payload.isSuccess
            state.BrokerDetails = action.payload.BrokerDetails
        })
        .addCase(GetBrokerDetails.rejected,(state,action)=>{
            // state.isGetBrokerDetailsLoading  = false
            state.isGetBrokerDetailsSuccess=false
            state.isGetBrokerDetailsError=true
            state.BrokerDetails={}
        })
    }    
})


export const {resetRegisterBroker,resetTopUpPlanBroker,resetBrokerDetails,resetPUProfileRegisterInMarriageProfileTable,
    resetRejectProfile,resetfetchBrokers,resetgetMatchProfile,resetNewPUProfileList,resetProfileDetails, resetBrokerToBroker,
    resetsearchProfileBrokToBrok, resetgetBrokProfById,setFilter,resetgetBrokerProfileImageUrl,resetStarFilters ,setStarFilters
} = brokSlice.actions
export default brokSlice.reducer