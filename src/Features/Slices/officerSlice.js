import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import officerservice from '../Services/officerService'

const initialState={
    // isOfficerRegisterLoading:false,
    // isOfficerRegisterSuccess:false,
    // isOfficerRegisterError:false,
    // OfficerRegisterMessage:'',

    isGetAllStudentLoading:false,
    isGetAllStudentSuccess:false,
    isGetAllStudentError:false,
    GetAllStudentList:[],

    isUpdateStudentLoading:false,
    isUpdateStudentSuccess:false,
    isUpdateStudentError:false,
    UpdateStudentmessage:''

   
}
// export const officerregister=createAsyncThunk(
//     'officer/officerregister',
//     async(data,thunkAPI)=>{
//         try{
//             return await officerservice.createofficer(data)
//         }
//         catch(error){
//             const message = (error.response && error.response.data &&
//                 error.response.data.message) || error.message || error.tostring()
    
//                 return thunkAPI.rejectWithValue(message)
//         }
//     }
// )

export const getAllStudent = createAsyncThunk(
    'student/getAllStudent',
    async(data,thunkAPI)=>{
        try{
            return await officerservice.getAllStudent(data)
        }
        catch(error){
            const message = (error.response && error.response.data &&
                error.response.data.message) || error.message || error.tostring()
    
                return thunkAPI.rejectWithValue(message)
        }
    }
)

export const updateStudent = createAsyncThunk(
    'student/updateStudent',
    async(data,thunkAPI)=>{
        try{
            return await officerservice.updateStudent(data)
        }
        catch(error){
            const message = (error.response && error.response.data &&
                error.response.data.message) || error.message || error.tostring()
    
                return thunkAPI.rejectWithValue(message)
        }
    }
)




export const officerSlice= createSlice({
    name:'student',
        initialState,
 
        reducers:{
        //  resetOfficerRegister:(state)=>{
        //      state.isOfficerRegisterLoading=false
        //      state.isOfficerRegisterSuccess=false
        //      state.isOfficerRegisterError=false
        //      state.OfficerRegisterMessage=''
        //  },
         resetgetAllStudent:(state)=>{
            state.isGetAllStudentLoading = false
            state.isGetAllStudentSuccess = false
            state.isGetAllStudentError = false
         },

         resetupdateStudent:(state)=>{
            state.isUpdateStudentLoading = false
            state.isUpdateStudentSuccess = false
            state.isUpdateStudentError = false
            state.UpdateStudentmessage = ''
         }
        
        },
   
        extraReducers:(builder)=>{
        builder
        
        // .addCase(officerregister.pending,(state)=>{
        //    state.isOfficerRegisterLoading=true
        // })
        // .addCase(officerregister.fulfilled,(state,action)=>{
        //     state.isOfficerRegisterLoading=false
        //     state.isOfficerRegisterSuccess=true
        //     state.OfficerRegisterMessage=action.payload.message;
        // })
        // .addCase(officerregister.rejected,(state,action)=>{
        //     state.isOfficerRegisterLoading=false
        //     state.isOfficerRegisterSuccess=false
        //     state.isOfficerRegisterError=true
        //     state.OfficerRegisterMessage=action.payload.message;
        // })
        .addCase(getAllStudent.pending,(state)=>{
            state.isGetAllStudentLoading = true
        })
        .addCase(getAllStudent.fulfilled,(state,action)=>{
            state.isGetAllStudentLoading = false
            state.isGetAllStudentSuccess = action.payload.isSuccess
            state.GetAllStudentList = action.payload
        })
        .addCase(getAllStudent.rejected,(state,action)=>{
            state.isGetAllStudentLoading = false
            state.isGetAllStudentSuccess = false
            state.isGetAllStudentError = true
            state.GetAllStudentList = []
        })
        .addCase(updateStudent.pending,(state)=>{
            state.isUpdateStudentLoading = true
        })
        .addCase(updateStudent.fulfilled,(state,action)=>{
            state.isUpdateStudentLoading = false
            state.isUpdateStudentSuccess = action.payload.isSuccess
            state.UpdateStudentmessage = action.payload.message
        })
        .addCase(updateStudent.rejected,(state,action)=>{
            state.isUpdateStudentLoading = false
            state.isUpdateStudentSuccess = false
            state.isUpdateStudentError = true
            state.UpdateStudentmessage = action.payload.message
        })
    
    }
})


export const {resetgetAllStudent,resetupdateStudent}=officerSlice.actions
export default officerSlice.reducer