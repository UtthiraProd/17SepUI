import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from '../Services/authService'
// import { act } from 'react'

const initialState = {
  user: '',
  User:'',
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',

  isOTPError: false,
  isOTPSuccess: false,
  isOTPLoading: false,
  messageOTP: '',

  isVerifyLoading: false,
  isVerifySuccess: false,
  isVerifyError: false,
  isVerifyMessage: '',

  isOTPResetError: false,
  isOTPResetSuccess: false,
  isOTPResetLoading: false,
  messageResetOTP: '',

  isSubmitResetError: false,
  isSubmitResetSuccess: false,
  isSubmitResetLoading: false,
  messageResetSubmit: '',

  isSuccessMessage: true,
  isMenuError: false,
  isMenuSuccess: false,
  isMenuLoading: false,
  menumessage: '',
  menuItems: [],

  phoneNumber: '',
  otp: '',
  isLoading: false,
  isSuccess: false,
  isError: false,
  ismessage: '',

  isForgotUserLoading: false,
  isForgotUserSuccess: false,
  isForgotUserError: false,
  isForgotUserMessage: '',

  isLogoutTrueLoading: false,
  isLogoutTrueSuccess: false,
  isLogoutTrueError: false,

  isEmailVerifyLoading: false,
  isEmailVerifySuccess: false,
  isEmailVerifyError: false,
  isEmailVerifyMessage: '',

  isResentOtpLoading: false,
  isResentOtpSuccess: false,
  isResentOtpError: false,
  isResentOtpMessage: ''
}

export const registeruser = createAsyncThunk(
  'auth/registeruser',
  async (user, thunkAPI) => {
    try {
      return await authService.registerUser(user)
    }
    catch (error) {
      const message = (error.response && error.response.data &&
        error.response.data.message) || error.message || error.tostring()

      return thunkAPI.rejectWithValue(message)
    }
  }
)



export const loginuser = createAsyncThunk(
  'auth/loginUser',
  async (user, thunkAPI) => {
    try {
      return await authService.loginUser(user)
    }
    catch (error) {
      const message = (error.response && error.response.data &&
        error.response.data.message) || error.message || error.tostring()

      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const getRegisterUserOTP = createAsyncThunk(
  'auth/getRegisterUserOTP',
  async (data, thunkAPI) => {
    try {
      return await authService.getUserRegisterOTP(data)
    }
    catch (error) {
      const message = (error.response && error.response.data &&
        error.response.data.message) || error.message || error.tostring()

      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const getResetPasswordOTP = createAsyncThunk(
  "auth/getResetPasswordOTP",
  async (userData, thunkAPI) => {
    try {
      return await authService.getResetPasswordOTP(userData);
    }
    catch (error) {
      const message = (error.response && error.response.data &&
        error.response.data.message) || error.message || error.tostring()
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getUserMenuDetailsById = createAsyncThunk(
  'auth/getUserMenuDetailsById',
  async (data, thunkAPI) => {
    try {

      return await authService.getUserMenuDetailsById()
    }
    catch (error) {
      const message = (error.response && error.response.data &&
        error.response.data.message) || error.message || error.tostring()

      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const resetUserPassword = createAsyncThunk(
  "auth/resetUserPassword",
  async (userData, thunkAPI) => {
    try {
      return await authService.resetUserPassword(userData);
    }
    catch (error) {

      const message = (error.response && error.response.data &&
        error.response.data.message) || error.message || error.tostring()
      return thunkAPI.rejectWithValue(message);
    }
  }
);


export const VerifyRegisterOTP = createAsyncThunk(
  "auth/VerifyRegisterOTP",
  async (data, thunkAPI) => {
    try {
      return await authService.VerifyRegisterOTP(data);
    }
    catch (error) {

      const message = (error.response && error.response.data &&
        error.response.data.message) || error.message || error.tostring()
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const getForgotUserOTP = createAsyncThunk(
  'auth/getForgotUserOTP',
  async (data, thunkAPI) => {
    try {
      return await authService.getForgotUserOTP(data);
    }
    catch (error) {

      const message = (error.response && error.response.data &&
        error.response.data.message) || error.message || error.tostring()
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const forgotUser = createAsyncThunk(
  'auth/forgotUser',
  async (data, thunkAPI) => {
    try {
      return await authService.forgotUser(data);
    }
    catch (error) {

      const message = (error.response && error.response.data &&
        error.response.data.message) || error.message || error.tostring()
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const logoutTrue = createAsyncThunk(
  'auth/logoutTrue',
  async (data, thunkAPI) => {
    try {
      return await authService.logoutTrue(data)
    }
    catch (error) {
      const message = (error.response && error.response.data
        && error.response.data.message) || error.message || error.tostring()

      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const verifyRegEmailOTP = createAsyncThunk(
  "auth/verifyRegEmailOTP",
  async (data, thunkAPI) => {
    try {
      return await authService.verifyRegEmailOTP(data);
    }
    catch (error) {

      const message = (error.response && error.response.data &&
        error.response.data.message) || error.message || error.tostring()
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const resentEmailOTP = createAsyncThunk(
  "auth/resentEmailOTP",
  async (data, thunkAPI) => {
    try {
      return await authService.resentEmailOTP(data);
    }
    catch (error) {
      const message = (error.response && error.response.data &&
        error.response.data.message) || error.message || error.tostring()
      return thunkAPI.rejectWithValue(message);
    }
  }
)


export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false
      state.isError = false
      state.isSuccess = false
      state.isSuccessMessage = true
      state.message = ''

      state.isOTPError = false
      state.isOTPSuccess = false
      state.isOTPLoading = false
      state.messageOTP = ''

      state.isVerifyLoading = false
      state.isVerifySuccess = false
      state.isVerifyError = false
      state.isVerifyMessage = ''


      state.isEmailVerifyLoading = false
      state.isEmailVerifySuccess = false
      state.isEmailVerifyError = false
      state.isEmailVerifyMessage = ''

      state.isOTPResetError = false
      state.isOTPResetSuccess = false
      state.isOTPResetLoading = false
      state.messageResetOTP = ''

      state.isSubmitResetError = false
      state.isSubmitResetSuccess = false
      state.isSubmitResetLoading = false
      state.messageResetSubmit = ''

      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.ismessage = '';

      state.isForgotUserLoading = false;
      state.isForgotUserSuccess = false;
      state.isForgotUserError = false;
      state.isForgotUserMessage = '';

      state.isLogoutTrueLoading = false
      state.isLogoutTrueSuccess = false
      state.isLogoutTrueError = false

      state.isResentOtpLoading = false;
      state.isResentOtpSuccess = false;
      state.isResentOtpError = false;
      state.isResentOtpMessage = ''
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registeruser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registeruser.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload.data
        state.User = action.payload.data
        state.message = action.payload.message
        state.isSuccessMessage = action.payload.isSuccess
      })
      .addCase(registeruser.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.isSuccessMessage = false
        state.user = null
      })
      .addCase(loginuser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginuser.fulfilled, (state, action) => {
        state.isLoading = false

        if (action.payload.isSuccess) {
          state.isSuccess = true
          state.user = action.payload.data
          state.User=action.payload.data
          state.logout = action.payload.logout
        }
        else if (action.payload.isSuccess === false) {
          state.isSuccess = false
          state.isError = true
          state.message = action.payload.message
          state.user = null
          state.User =null
        }

      })
      .addCase(loginuser.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.user = null
        state.User = null
      })
      .addCase(getUserMenuDetailsById.pending, (state) => {
        state.isMenuLoading = true;
      })
      .addCase(getUserMenuDetailsById.fulfilled, (state, action) => {
        state.isMenuLoading = false
        state.isMenuSuccess = true
        state.menuItems = action.payload

      })
      .addCase(getUserMenuDetailsById.rejected, (state, action) => {
        state.isMenuLoading = false
        state.isMenuError = true
        state.menuMessage = action.payload
        state.menuItems = null

      }).addCase(getRegisterUserOTP.pending, (state) => {
        state.isOTPLoading = true;
      })
      .addCase(getRegisterUserOTP.fulfilled, (state, action) => {
        state.isOTPLoading = false
        state.isOTPSuccess = true
        if (action.payload.isSuccess == false) {
          state.isOTPSuccess = false
          state.isOTPError = action.payload.message
        }
        state.messageOTP = action.payload.message
      })
      .addCase(getRegisterUserOTP.rejected, (state, action) => {
        state.isOTPLoading = false
        state.isOTPError = true
        state.messageOTP = action.payload.message;
      })


      .addCase(VerifyRegisterOTP.pending, (state) => {
        state.isVerifyLoading = true;
      })
      .addCase(VerifyRegisterOTP.fulfilled, (state, action) => {
        state.isVerifyLoading = false;
        state.isVerifySuccess = true;
        if (action.payload.isSuccess == false) {
          state.isVerifySuccess = false
          state.isVerifyError = action.payload.message
        }
        state.isVerifyMessage = action.payload.message;
      })
      .addCase(VerifyRegisterOTP.rejected, (state, action) => {
        state.isVerifyLoading = false;
        state.isVerifyError = true;
        state.isVerifyMessage = action.payload.message;
      })

      //getResetPasswordOTP
      .addCase(getResetPasswordOTP.pending, (state) => {
        state.isOTPResetLoading = true;
      })
      .addCase(getResetPasswordOTP.fulfilled, (state, action) => {
        state.isOTPResetLoading = false;
        state.isOTPResetSuccess = true;
        if (action.payload.isSuccess == false) {
          state.isOTPResetSuccess = false
          state.isOTPResetError = action.payload.message;
        }
        state.messageResetOTP = action.payload.message;
      })
      .addCase(getResetPasswordOTP.rejected, (state, action) => {
        state.isOTPResetLoading = false;
        state.isOTPResetError = true;
        state.messageResetOTP = action.payload.message;
      })

      .addCase(resetUserPassword.pending, (state) => {
        state.isSubmitResetLoading = true;
      })
      .addCase(resetUserPassword.fulfilled, (state, action) => {
        state.isSubmitResetLoading = false;
        state.isSubmitResetSuccess = true;
        if (action.payload.isSuccess == false) {
          state.isSubmitResetSuccess = false
          state.isSubmitResetError = action.payload.message
        }
        state.messageResetSubmit = action.payload.message;
      })
      .addCase(resetUserPassword.rejected, (state, action) => {
        state.isSubmitResetLoading = false;
        state.isSubmitResetError = true;
        state.messageResetSubmit = action.payload.message;
      })

      //forgotUser
      .addCase(getForgotUserOTP.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getForgotUserOTP.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        if (action.payload.isSuccess == false) {
          state.isSuccess = false
          state.isError = action.payload.message;
        }
        state.ismessage = action.payload.message;
      })
      .addCase(getForgotUserOTP.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.ismessage = action.payload.message;
      })
      .addCase(forgotUser.pending, (state) => {
        state.isForgotUserLoading = true;
      })
      .addCase(forgotUser.fulfilled, (state, action) => {
        state.isForgotUserLoading = false;
        state.isForgotUserSuccess = true;
        if (action.payload.isSuccess == false) {
          state.isForgotUserSuccess = false
          state.isForgotUserError = action.payload.message
        }
        state.isForgotUserMessage = action.payload.message
      })
      .addCase(forgotUser.rejected, (state, action) => {
        state.isForgotUserLoading = false;
        state.isForgotUserError = true;
        state.isForgotUserMessage = action.payload.message;
      })
      .addCase(logoutTrue.pending, (state) => {
        state.isLogoutTrueLoading = true
      })
      .addCase(logoutTrue.fulfilled, (state, action) => {
        state.isLogoutTrueLoading = false
        state.isLogoutTrueSuccess = action.payload.isSuccess
      })
      .addCase(logoutTrue.rejected, (state) => {
        state.isLogoutTrueLoading = false
        state.isLogoutTrueSuccess = false
        state.isLogoutTrueError = true
      })


      .addCase(verifyRegEmailOTP.pending, (state) => {
        state.isEmailVerifyLoading = true;
      })
      .addCase(verifyRegEmailOTP.fulfilled, (state, action) => {
        state.isEmailVerifyLoading = false;
        state.isEmailVerifySuccess = true;
        if (action.payload.isSuccess == false) {
          state.isEmailVerifySuccess = false
          state.isEmailVerifyError = action.payload.message
        }
        state.isEmailVerifyMessage = action.payload.message;
      })
      .addCase(verifyRegEmailOTP.rejected, (state, action) => {
        state.isEmailVerifyLoading = false;
        state.isEmailVerifyError = true;
        state.isEmailVerifyMessage = action.payload.message;
      })

      .addCase(resentEmailOTP.pending,(state)=>{
        state.isResentOtpLoading = true;
      })
      .addCase(resentEmailOTP.fulfilled,(state,action)=>{
        state.isResentOtpLoading = false;
        state.isResentOtpSuccess = true;
        if(action.payload.isSuccess === false){
          state.isResentOtpSuccess = false;
          state.isResentOtpError = action.payload.message;
        }
        state.isResentOtpMessage = action.payload.message
      })
      .addCase(resentEmailOTP.rejected,(state,action)=>{
        state.isResentOtpSuccess = false;
        state.isResentOtpError = true;
        state.isResentOtpMessage = action.payload.message
      })
  }
})

export const { reset } = authSlice.actions
export default authSlice.reducer