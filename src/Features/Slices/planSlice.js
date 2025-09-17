import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import planService from "../Services/planService"

const initialState ={

    isPlanCreateLoading:false,
    isPlanCreateSuccess:false,
    isPlanCreateError:false,
    isPlanCreateMessage: '',

    isGetAllPlanLoading:false,
    isGetAllPlanSuccess:false,
    isGetAllPlanError:false,
    PlanList:[],
    totalRecourd:0,
    totalRecords:0,
    profileImage:[],

    isBrokerLoading:false,
    isBrokerSuccess:false,
    isBrokerError:false,
    BrokerId:[],

    isDeleteLoading:false,
    isDeleteSuccess:false,
    isDeleteError:false,
    isDeleteMessage:'',

    isPlanUpdateLoading:false,
    isPlanUpdateSuccess:false,
    isPlanUpdateError:false,
    isPlanUpdateMessage: '',

    // isPlanDetailsByIDLoading:false,
    // isPlanDetailsByIDSuccess:false,
    // isPlanDetailsByIDError:false,
    // PlanDetails:{},

    isBalanceQuotaLoading: false,
    isBalanceQuotaSuccess: false,
    isBalanceQuotaError: false,
    balanceQuotaDetails: [],
    expiryDate: {},
    planCatagory:{},
    balanceAmount:null,
}

export const createPlan = createAsyncThunk(
    'plan/createPlan',
    async(data,thunkAPI)=>{
        try{
           return await planService.createPlan(data)
        }
        catch(error){
            const message = (error.response && error.response.data &&
                error.response.data.message) || error.message || error.tostring()

                return thunkAPI.rejectWithValue(message)
        }
    }  
)


export const getBrokerId = createAsyncThunk(
    'plan/getBrokerId',
    async(id,thunkAPI)=>{
        try{
            return await planService.getBrokerId(id)
        }
        catch(error){
            const message = (error.response && error.response.data &&
                error.response.data.message) || error.message || error.tostring()

                return thunkAPI.rejectWithValue(message)
        }
    }
)

export const deletePlan = createAsyncThunk(
    'plan/deletePlan',
    async(data,thunkAPI)=>{
        try{
            return await planService.deletePlan(data)
        }
        catch(error){
            const message = (error.response && error.response.data &&
                error.response.data.message) || error.message || error.tostring()

                return thunkAPI.rejectWithValue(message)
        }
    }
)

export const updatePlan = createAsyncThunk(
    'plan/updatePlan',
    async(data,thunkAPI)=>{
        try{
            return await planService.updatePlan(data)
        }
        catch(error){
            const message = (error.response && error.response.data &&
                error.response.data.message) || error.message || error.tostring()

                return thunkAPI.rejectWithValue(message)
        }
    }
)

export const getAllPlan = createAsyncThunk(
    'plan/getAllPlan',
    async(data,thunkAPI)=>{
        try{
            return await planService.getAllPlan(data)
        }
        catch(error){
            const message = (error.response && error.response.data &&
                error.response.data.message) || error.message || error.tostring()

                return thunkAPI.rejectWithValue(message)
        }
    }
)

// export const getPlanDetailsBYId = createAsyncThunk(
//     'plan/getPlanDetailsBYId',
//     async(id,thunkAPI)=>{
//         try{
//             return await planService.getPlanDetailsBYId(id)
//         }
//         catch(error){
//             const message = (error.response && error.response.data &&
//                 error.response.data.message) || error.message || error.tostring()

//                 return thunkAPI.rejectWithValue(message)
//         }
//     }
// )

export const balanceQuota = createAsyncThunk(
    'plan/balanceQuota',
    async(data,thunkAPI)=>{
        try{
            return await planService.balanceQuota(data)
        }
        catch(error){
            const message = (error.response && error.response.data &&
                error.response.data.message) || error.message || error.tostring()

                return thunkAPI.rejectWithValue(message)
        }
    }
)

export const planSlice = createSlice({
    name:'plan',
    initialState,
    reducers:{
        reset:(state)=>{
            state.isPlanCreateLoading = false
            state.isPlanCreateSuccess = false
            state.isPlanCreateError = false
            state.isPlanCreateMessage =''

            state.isGetAllPlanLoading = false
            state.isGetAllPlanSuccess = false
            state.isGetAllPlanError = false
            state.PlanList = []
            state.totalRecourd = 0
            state.totalRecords = 0
            state.profileImage = []

            state.isBrokerLoading = false
            state.isBrokerSuccess = false
            state.isBrokerError = false

            state.isDeleteLoading = false
            state.isDeleteSuccess = false
            state.isDeleteError = false
            state.isDeleteMessage =''

            state.isPlanUpdateLoading = false
            state.isPlanUpdateSuccess = false
            state.isPlanUpdateError = false
            state.isPlanUpdateMessage =''

            state.isPlanDetailsByIDLoading = false
            state.isPlanDetailsByIDSuccess = false
            state.isPlanDetailsByIDError = false

           state.isBalanceQuotaLoading = false
           state.isBalanceQuotaSuccess = false
           state.isBalanceQuotaError = false
           state.balanceQuotaDetails = []
           state.expiryDate = {}
           state.planCatagory = {}
           state.balanceAmount =0
        },
        resetBalanceQuota:(state)=>{
           state.isBalanceQuotaLoading = false
           state.isBalanceQuotaSuccess = false
           state.isBalanceQuotaError = false
           state.balanceQuotaDetails = []
           state.expiryDate = {}
           state.planCatagory = {}
           state.balanceAmount =0
        }
    },

    extraReducers:(builder)=>{
        builder

        .addCase(createPlan.pending,(state)=>{
            state.isPlanCreateLoading = true
        })
        .addCase(createPlan.fulfilled,(state,action)=>{
            state.isPlanCreateLoading = false
            state.isPlanCreateSuccess =true
            if(action.payload.isSuccess == false){
                state.isPlanCreateSuccess =false
                state.isPlanCreateError =action.payload.message
            }
            state.isPlanCreateMessage =action.payload.message
        })
        .addCase(createPlan.rejected,(state,action)=>{
            state.isPlanCreateError =true
            state.isPlanCreateMessage = action.payload.message
        })

       .addCase(getBrokerId.pending,(state)=>{
           state.isBrokerLoading = true
       })
       .addCase(getBrokerId.fulfilled,(state,action)=>{
          state.isBrokerSuccess = true
          state.BrokerId = action.payload
       })
       .addCase(getBrokerId.rejected,(state,action)=>{
          state.isBrokerError = true
          state.BrokerId = []
       })
       .addCase(deletePlan.pending,(state)=>{
         state.isDeleteLoading = true
       })
       .addCase(deletePlan.fulfilled,(state,action)=>{
        state.isDeleteSuccess = true
        if(action.payload.isSuccess==false){
            state.isDeleteSuccess =false
            state.isDeleteError = action.payload.message
        }
        state.isDeleteMessage =action.payload.message
       })
       .addCase(deletePlan.rejected,(state,action)=>{
        state.isDeleteError = true
        state.isDeleteMessage =action.payload.message
       })

       .addCase(updatePlan.pending,(state)=>{
        state.isPlanUpdateLoading = true
       })
       .addCase(updatePlan.fulfilled,(state,action)=>{
        state.isPlanUpdateSuccess = true
        if(action.payload.isSuccess==false){
            state.isPlanUpdateSuccess =false
            state.isPlanUpdateError = action.payload.message
        }
        state.isPlanUpdateMessage = action.payload.message
       })
       .addCase(updatePlan.rejected,(state,action)=>{
        state.isPlanUpdateError = true
        state.isPlanUpdateMessage = action.payload.message
       })
       
       .addCase(getAllPlan.pending,(state)=>{
          state.isGetAllPlanLoading = true
       })
       .addCase(getAllPlan.fulfilled,(state,action)=>{
         state.isGetAllPlanSuccess = true
         state.PlanList =action.payload.PlanList
         state.totalRecourd = action.payload.totalPlanRecourd 
         state.totalRecords = action.payload.totalPlanRecourds
         state.profileImage = action.payload.planImage
       })
       .addCase(getAllPlan.rejected,(state,action)=>{
         state.isGetAllPlanError = true
         state.PlanList =[]
         state.totalRecourd = 0
         state.totalRecords =0
         state.profileImage =[]
       })

    //    .addCase(getPlanDetailsBYId.pending,(state)=>{
    //     state.isPlanDetailsByIDLoading = true
    //    })
    //    .addCase(getPlanDetailsBYId.fulfilled,(state,action)=>{
    //     state.isPlanDetailsByIDSuccess = true
    //     state.PlanDetails =action.payload.PlanDetails
    //    })
    //    .addCase(getPlanDetailsBYId.rejected,(state,action)=>{
    //     state.isPlanDetailsByIDError = true
    //     state.PlanDetails ={}
    //    })

         .addCase(balanceQuota.pending, (state) => {
        state.isBalanceQuotaLoading = true;
        state.isBalanceQuotaError = false;
        state.isBalanceQuotaSuccess = false;
      })
      .addCase(balanceQuota.fulfilled, (state, action) => {
        state.isBalanceQuotaLoading = false;
        state.isBalanceQuotaSuccess = true;
        state.balanceQuotaDetails = action.payload.schedule;
        state.expiryDate = action.payload.expiryDate;
        state.planCatagory = action.payload.planCatagory;
        state.balanceAmount = action.payload.balanceAmount;
      })
      .addCase(balanceQuota.rejected, (state) => {
        state.isBalanceQuotaLoading = false;
        state.isBalanceQuotaError = true;
        state.balanceQuotaDetails = [];
       
      })
    } 
})

export const {reset,resetBalanceQuota} = planSlice.actions
export default planSlice.reducer