import{createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import BUProfileService from '../../Services/BrokerUser/BUProfileService'
import masterService  from '../../Services/masterService'
import profileService  from '../../Services/profService'



const initialState ={
    profiles:[],
    profileTotal:0,
    profileTotals:0,
    profileImageList:[],


    religions:[],
    isReligionError:false,
    isReligionSuccess:false,
    isReligionLoading:false,

    castes:[],
    iscasteError:false,
    iscasteSuccess:false,
    iscasteLoading:false,


   isAllProfilesByBrokerIdLoading :false,
    isAllProfilesByBrokerIdSuccess :false,
   isAllProfilesByBrokerIdError :false,


   isBrokerUserDetailLoading : false,
   isBrokerUserDetailSuccess: false,
   isBrokerUserDetailError: false,
   userDetails : {},

    isBalanceQuotaLoading: false,
    isBalanceQuotaSuccess: false,
    isBalanceQuotaError: false,
    balanceQuotaDetails: [],
    expiryDate: {},
    planCatagory:{},

    isPlanExistsLoading:false,
    isPlanExistsSuccess:false,
    isPlanExistsError:false

}

export const BUGetprofilebyid= createAsyncThunk(
    'BUProf/BUGetprofilebyid',
    async(data,thunkAPI)=>{
        try{
            return await BUProfileService.BUGetprofilebyid(data)
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

export const brokerUserDetails = createAsyncThunk(
    'BUProf/brokerUserDetails',
    async(data,thunkAPI)=>{
        try{
           
             return await BUProfileService.brokerUserDetails(data)
        }
        catch(error){
            const message = (error.response && error.response.data &&
                error.response.data.message) || error.message || error.tostring()

                return thunkAPI.rejectWithValue(message)
        }
    }
)

export const userBalanceQuota = createAsyncThunk(
    'BUProf/userBalanceQuota',
    async(data,thunkAPI)=>{
        try{
            return await BUProfileService.userBalanceQuota(data)
        }
        catch(error){
            const message = (error.response && error.response.data &&
                error.response.data.message) || error.message || error.tostring()

                return thunkAPI.rejectWithValue(message)
        }
    }
)

export const BUplanexists =createAsyncThunk(
    'BUProf/BUplanexists',
    async(data,thunkAPI)=>{
        try{
            return await BUProfileService.BUplanexists(data)
        }
        catch(error){
            const message = (error.responce && error.responce.data && 
                error.responce.data.message
            ) || error.message || error.tostring()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const BUProfSlice = createSlice({
    name:'BUProf',
    initialState,
    reducers:{
        resetProfileList:(state)=>{
            state.profiles = []
            state.profileTotal=0
            state.profileTotals =0
            state.profileImageList =[]
            state.isAllProfilesByBrokerIdLoading = false
            state.isAllProfilesByBrokerIdSuccess = false
            state.isAllProfilesByBrokerIdError = false
        },
        resetBrokUserDetails :(state)=>{
            state.userDetails = {}
            state.isBrokerUserDetailLoading = false
            state.isBrokerUserDetailSuccess = false
            state.isAllProfilesByBrokerIdError = false
        },
        resetBalanceQuota:(state)=>{
           state.isBalanceQuotaLoading = false
           state.isBalanceQuotaSuccess = false
           state.isBalanceQuotaError = false
           state.balanceQuotaDetails = []
           state.expiryDate = {}
           state.planCatagory = null
        },
        resetBUplanexists:(state)=>{
            state.isPlanExistsLoading =false
            state.isPlanExistsSuccess=false
            state.isPlanExistsError=false
        }
    },
    extraReducers:(builder)=>{
        builder

    .addCase(BUGetprofilebyid.pending,(state)=>{
        state.isAllProfilesByBrokerIdLoading = true;
    })
    .addCase(BUGetprofilebyid.fulfilled,(state,action)=>{
        state.isAllProfilesByBrokerIdLoading = false
        state.isAllProfilesByBrokerIdSuccess = true
        state.profiles = action.payload.profiles
        state.profileTotal =  action.payload.totalRecourd
        state.profileTotals =  action.payload.totalRecords
        state.profileImageList =action.payload.imageUrls
    })
    .addCase(BUGetprofilebyid.rejected,(state,action)=>{
        state.isAllProfilesByBrokerIdLoading = false
        state.isAllProfilesByBrokerIdError = true
        state.allProfilesByBrokerIdmessage = action.payload
        state.profiles = []
        state.profileTotal = 0
        state.profileTotals =  0
        state.profileImageList =[]
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

            .addCase(brokerUserDetails.pending,(state)=>{
                state.isBrokerUserDetailLoading = true
            })
            .addCase(brokerUserDetails.fulfilled,(state,action)=>{
                state.isBrokerUserDetailSuccess = action.payload.isSuccess
                state.userDetails = action.payload.userDetails
            })
            .addCase(brokerUserDetails.rejected,(state,action)=>{
                state.isBrokerUserDetailError = true
                state.userDetails = {}
            })

             .addCase(userBalanceQuota.pending, (state) => {
                    state.isBalanceQuotaLoading = true;
                    state.isBalanceQuotaError = false;
                    state.isBalanceQuotaSuccess = false;
                  })
                  .addCase(userBalanceQuota.fulfilled, (state, action) => {
                    state.isBalanceQuotaLoading = false;
                    state.isBalanceQuotaSuccess = true;
                    state.balanceQuotaDetails = action.payload.schedule;
                    state.expiryDate = action.payload.expiryDate;
                    state.planCatagory = action.payload.planCatagory;
                  })
                  .addCase(userBalanceQuota.rejected, (state) => {
                    state.isBalanceQuotaLoading = false;
                    state.isBalanceQuotaError = true;
                    state.balanceQuotaDetails = [];
                  })

        .addCase(BUplanexists.pending,(state)=>{
              state.isPlanExistsLoading=true;
            })
        .addCase(BUplanexists.fulfilled,(state,action)=>{
              state.isPlanExistsSuccess=true;
              state.planExists = action.payload.planExists
            })
        .addCase(BUplanexists.rejected,(state)=>{
              state.isPlanExistsError=true;
            })
    }
})

export const{resetBrokUserDetails,resetBalanceQuota,resetBUplanexists}= BUProfSlice.actions

export default BUProfSlice.reducer