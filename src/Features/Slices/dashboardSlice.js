import{createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import dashboardService  from '../Services/dashboardService'


const initialState ={
    isDashboardError:false,
    isDashboardSuccess:false,
    isDashboardLoading:false,
    dashboardDetails:{},
}

export const getDashboardDetailByBrokerId = createAsyncThunk(
    'dash/getDashboardDetailByBrokerId',
    async(data,thunkAPI)=>{
        try{
             return await dashboardService.getDashboardDetailByBrokerId()
        }
        catch(error){
            const message = (error.response && error.response.data &&
                error.response.data.message) || error.message || error.tostring()

                return thunkAPI.rejectWithValue(message)
        }
    }
)

export const dashSlice = createSlice({
    name:'dash',
    initialState,
    reducers:{
        resetDashboardDetail:(state)=>{
            state.isDashboardError = false
            state.isDashboardSuccess = false
            state.isDashboardLoading = false
            state.dashboardDetails ={}
        },
    },
    extraReducers:(builder)=>{
        builder
        .addCase(getDashboardDetailByBrokerId.pending,(state)=>{
            console.log('loading')
            state.isDashboardLoading = true;
        })
        .addCase(getDashboardDetailByBrokerId.fulfilled,(state,action)=>{
            console.log('Fulfilled Action Payload:', action.payload); // Log the payload
            state.isDashboardLoading = false
            state.isDashboardSuccess = true
            state.dashboardDetails = action.payload
        })
        .addCase(getDashboardDetailByBrokerId.rejected,(state,action)=>{
            state.isDashboardLoading = false
            state.isDashboardError = true
            state.dashboardDetails = {}
        })
    }    
})

export const {resetDashboardDetail} = dashSlice.actions
export default dashSlice.reducer
