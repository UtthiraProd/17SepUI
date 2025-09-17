import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userProfileService from "../Services/userProfileService";

const initialState = {
    isGetMarriageProfileLoading: false,
    isGetMarriageProfileSuccess: false,
    isGetMarriageProfileError: false,
    profilesList: [],
    totalRecourd: 0,
    totalRecords: 0,
    profileImage: [],

    isGetProfileByIdLoading: false,
    isGetProfileByIdSuccess: false,
    isGetProfileByIdError: false,
    profileDetail: {},

    isGetPlanByBrokerLoading: false,
    isGetPlanByBrokerSuccess: false,
    isGetPlanByBrokerError: false,
    userPlanList: [],

    isGetUserByIdLoading: false,
    isGetUserByIdSuccess: false,
    isGetUserByIdError: false,
    userDetail: {},
    balanceAmount: {},
    userDetailImage: [],

    isDeleteUserLoading: false,
    isDeleteUserSuccess: false,
    isDeleteUserError: false,
    isDeleteUserMessage: '',

    isGetLoginUserProfileLoading: false,
    isGetLoginserProfileSuccess: false,
    isGetLoginUserProfileError: false,
    getLoginUserProfileList: [],
    getLoginUserPorfileImageList: [],
    getLoginUserProfileTotal: 0,
    getLoginUserProfileTotals: 0,
    brokerUserImageList:[],

    isCreatePlanSheduleLoading: false,
    isCreatePlanSheduleSuccess: false,
    isCreatePlanSheduleError: false,
    isCreatePlanSheduleMessage: '',

    isGetLoginUserNameLoading: false,
    isGetLoginUserNameSuccess: false,
    isGetLoginUserNameError: false,
    getLoginUserProfileList: [],

    isCreateLoginLoading: false,
    isCreateLoginSuccess: false,
    isCreateLoginError: false,
    isCraeteLoginAlreadyExists: false,
    isCreateLoginMessage: '',

    isGetOtpLoading: false,
    isGetOtpSuccess: false,
    isGetOtpError: false,
    isGetOtpMessage: '',

    isOtpVerifyLoading: false,
    isOtpVerifySuccess: false,
    isOtpVerifyError: false,
    otpVerified: '',

    isGetBrokUserImageLoading: false,
    isGetBrokUserImageSuccess: false,
    isGetBrokUserImageError: false,
    brokerUserImage: [],

}

export const getMarriageProfiles = createAsyncThunk(
    'userPro/getMarriageProfiles',
    async (data, thunkAPI) => {
        try {
            return await userProfileService.getMarriageProfiles(data)
        }
        catch (error) {
            const message = (error.response && error.response.data &&
                error.response.data.message) || error.message || error.tostring()

            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const getMarriageProfileById = createAsyncThunk(
    'userPro/getMarriageProfileById',
    async (id, thunkAPI) => {
        try {
            return await userProfileService.getMarriageProfileById(id)
        }
        catch (error) {
            const message = (error.response && error.response.data && error.response.data.message)
                || error.message || error.tostring()
            return thunkAPI.rejectWithValue(message)
        }

    }
)

export const getPlanByBroker = createAsyncThunk(
    'userPro,getPlanByBroker',
    async (id, thunkAPI) => {
        try {
            return await userProfileService.getPlanByBroker(id)
        }
        catch (error) {
            const message = (error.response && error.response.data &&
                error.response.data.message) || error.message || error.tostring()

            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const userLoginCreate = createAsyncThunk(
    'userPro,userLoginCreate',
    async (data, thunkAPI) => {
        try {
            return await userProfileService.userLoginCreate(data)
        }
        catch (error) {
            const message = (error.response && error.response.data &&
                error.response.data.message) || error.message || error.tostring()

            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const getUserDetailsById = createAsyncThunk(
    'userPro,getUserDetailsById',
    async (id, thunkAPI) => {
        try {
            return await userProfileService.getUserDetailsById(id)
        }
        catch (error) {
            const message = (error.response && error.response.data &&
                error.response.data.message) || error.message || error.tostring()

            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const deleteUserLogin = createAsyncThunk(
    'userPro,deleteUserLogin',
    async (data, thunkAPI) => {
        try {
            return await userProfileService.deleteUserLogin(data)
        }
        catch (error) {
            const message = (error.response && error.response.data &&
                error.response.data.message) || error.message || error.tostring()

            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const getLoginUserProfile = createAsyncThunk(
    'userPro/getLoginUserProfile',
    async (data, thunkAPI) => {
        try {

            return await userProfileService.getLoginUserProfile(data)
        }
        catch (error) {
            const message = (error.response && error.response.data &&
                error.response.data.message) || error.message || error.tostring()

            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const createPlanSchedule = createAsyncThunk(
    'userPro,createPlanSchedule',
    async (data, thunkAPI) => {
        try {
            return await userProfileService.createPlanSchedule(data)
        }
        catch (error) {
            const message = (error.response && error.response.data &&
                error.response.data.message) || error.message || error.tostring()

            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const getLoginUserName = createAsyncThunk(
    'userPro/getLoginUserName',
    async (name, thunkAPI) => {
        try {
            return await userProfileService.getLoginUserName(name)
        }
        catch (error) {
            const message = (error.response && error.response.data
                && error.response.data.message) || error.message || error.tostring()

            return thunkAPI.rejectWithValue(message)
        }
    }
)


export const getBrokerUserOTP = createAsyncThunk(
    'userPro/getBrokerUserOTP',
    async (data, thunkAPI) => {
        try {
            return await userProfileService.getBrokerUserOTP(data)
        }
        catch (error) {
            const message = (error.response && error.response.data
                && error.response.data.message) || error.message || error.tostring()

            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const brokerUserOTPVerify = createAsyncThunk(
    'userPro/brokerUserOTPVerify',
    async (data, thunkAPI) => {
        try {
            return await userProfileService.brokerUserOTPVerify(data)
        }
        catch (error) {
            const message = (error.response && error.response.data
                && error.response.data.message) || error.message || error.tostring()

            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const getProfileImageUrl = createAsyncThunk(
    'userPro/getProfileImageUrl',
    async(data,thunkAPI)=>{
        try{
           
             return await userProfileService.getProfileImageUrl(data)
        }
        catch(error){
            const message = (error.response && error.response.data &&
                error.response.data.message) || error.message || error.tostring()

                return thunkAPI.rejectWithValue(message)
        }
    }
)

export const userProfileSlice = createSlice({
    name: 'userPro',
    initialState,
    reducers: {
        resetProfileList: (state) => {
            state.isGetMarriageProfileLoading = false
            state.isGetMarriageProfileSuccess = false
            state.isGetMarriageProfileError = false
            state.profilesList = []
            state.totalRecourd = 0
            state.totalRecords = 0
            state.profileImage = []
        },
        resetPlanByBroker: (state) => {
            state.isGetPlanByBrokerLoading = false
            state.isGetPlanByBrokerSuccess = false
            state.isGetPlanByBrokerError = false
        },
        resetGetLoginUserProfile: (state) => {
            state.isGetLoginUserProfileLoading = false
            state.isGetLoginserProfileSuccess = false
            state.isGetLoginUserProfileError = false
            state.getLoginUserProfileList = []
            state.getLoginUserPorfileImageList = []
            state.getLoginUserProfileTotal = 0
            state.getLoginUserProfileTotals = 0
            state.brokerUserImageList = []
        },
        resetUserLoginCreate: (state) => {
            state.isCreateLoginLoading = false
            state.isCreateLoginSuccess = false
            state.isCreateLoginError = false
            state.isCreateLoginMessage = ''
        },
        resetgetLoginUserName: (state) => {
            state.isGetLoginUserNameLoading = false
            state.isGetLoginUserNameSuccess = false
            state.isGetLoginUserNameError = false
        },
        resetGetUserLoginOtp: (state) => {
            state.isGetOtpLoading = false
            state.isGetOtpSuccess = false
            state.isGetOtpError = false
            state.isGetOtpMessage = ''
        },
        resetBrokerUserOtpVerify: (state) => {
            state.isOtpVerifyLoading = false
            state.isOtpVerifySuccess = false
            state.isOtpVerifyError = false
            state.otpVerified = ''
        },
        resetUserDetailsByid: (state) => {
            state.isGetUserByIdLoading = false
            state.isGetUserByIdSuccess = false
            state.isGetUserByIdError = false
        },

        resetcreatePlanSchedule: (state) => {
            state.isCreatePlanSheduleLoading = false
            state.isCreatePlanSheduleSuccess = false
            state.isCreatePlanSheduleMessage = ''
            state.isCreatePlanSheduleError = false
        },

        resetDeleteUserLogin: (state) => {
            state.isDeleteUserLoading = false
            state.isDeleteUserSuccess = false
            state.isDeleteUserError = false
            state.isDeleteUserMessage = ''
        }

    },
    extraReducers: (builder) => {
        builder
            .addCase(getMarriageProfiles.pending, (state) => {
                state.isGetMarriageProfileLoading = true
            })
            .addCase(getMarriageProfiles.fulfilled, (state, action) => {
                state.isGetMarriageProfileLoading = false
                state.isGetMarriageProfileSuccess = true
                state.profilesList = action.payload.profilesList
                state.totalRecourd = action.payload.totalProfile
                state.totalRecords = action.payload.totalProfiles
                state.profileImage = action.payload.images
            })
            .addCase(getMarriageProfiles.rejected, (state, action) => {
                state.isGetMarriageProfileLoading = false
                state.isGetMarriageProfileError = true
                state.profilesList = []
                state.totalRecourd = 0
                state.totalRecords = 0
                state.profileImage = []
            })
            .addCase(getMarriageProfileById.pending, (state) => {
                state.isGetProfileByIdLoading = true
            })
            .addCase(getMarriageProfileById.fulfilled, (state, action) => {
                state.isGetProfileByIdLoading = false
                state.isGetProfileByIdSuccess = action.payload.isSuccess
                state.profileDetail = action.payload.profileDetail
            })
            .addCase(getMarriageProfileById.rejected, (state, action) => {
                state.isGetProfileByIdSuccess = false
                state.isGetProfileByIdError = true
                state.profileDetail = {}
            })
            .addCase(getPlanByBroker.pending, (state) => {
                state.isGetPlanByBrokerLoading = true
            })
            .addCase(getPlanByBroker.fulfilled, (state, action) => {
                state.isGetPlanByBrokerSuccess = true
                state.userPlanList = action.payload
            })
            .addCase(getPlanByBroker.rejected, (state, action) => {
                state.isGetPlanByBrokerError = true
                state.userPlanList = []
            })

            .addCase(userLoginCreate.pending, (state) => {
                state.isCreateLoginLoading = true
            })
            .addCase(userLoginCreate.fulfilled, (state, action) => {
                state.isCreateLoginLoading = false
                state.isCreateLoginSuccess = true
                state.isCraeteLoginAlreadyExists = action.payload.isSuccess
                if (action.payload.isSuccess == false) {
                    state.isCreateLoginSuccess = false
                    state.isCreateLoginError = action.payload.message

                }
                state.isCreateLoginMessage = action.payload.message
            })
            .addCase(userLoginCreate.rejected, (state, action) => {
                state.isCreateLoginError = true
                state.isCreateLoginMessage = action.payload.message
            })

            .addCase(getUserDetailsById.pending, (state) => {
                state.isGetUserByIdLoading = true
            })
            .addCase(getUserDetailsById.fulfilled, (state, action) => {
                state.isGetUserByIdSuccess = action.payload.isSuccess
                state.userDetail = action.payload.userDetail
                state.balanceAmount = action.payload.balanceAmount
                state.userDetailImage = action.payload.imageUrls
            })
            .addCase(getUserDetailsById.rejected, (state, action) => {
                state.isGetUserByIdError = true
                state.userDetail = {}
                state.balanceAmount = {}
            })

            .addCase(deleteUserLogin.pending, (state) => {
                state.isDeleteUserLoading = true
            })
            .addCase(deleteUserLogin.fulfilled, (state, action) => {
                state.isDeleteUserLoading = false
                state.isDeleteUserSuccess = action.payload.isSuccess
                state.isDeleteUserMessage = action.payload.message
            })
            .addCase(deleteUserLogin.rejected, (state, action) => {
                state.isDeleteUserLoading = false
                state.isDeleteUserSuccess = false
                state.isDeleteUserError = true
                state.isDeleteUserMessage = action.payload.message
            })

            .addCase(getLoginUserProfile.pending, (state, action) => {
                state.isGetLoginUserProfileLoading = true
            })
            .addCase(getLoginUserProfile.fulfilled, (state, action) => {
                state.isGetLoginUserProfileLoading = false
                state.isGetLoginserProfileSuccess = true
                state.getLoginUserProfileList = action.payload.loginUserProfile
                state.getLoginUserPorfileImageList = action.payload.imageUrls
                state.getLoginUserProfileTotal = action.payload.totalRecourd
                state.getLoginUserProfileTotals = action.payload.totalRecords
                state.totalPages = action.payload.totalPages
                state.brokerUserImageList = action.payload.imageUrl
            })
            .addCase(getLoginUserProfile.rejected, (state, action) => {
                state.isGetLoginUserProfileLoading = false
                state.isGetLoginserProfileSuccess = false
                state.isGetLoginUserProfileError = true
                state.getLoginUserProfileList = []
                state.getLoginUserPorfileImageList = []
                state.getLoginUserProfileTotal = 0
                state.getLoginUserProfileTotals = 0
            })

            .addCase(createPlanSchedule.pending, (state) => {
                state.isCreatePlanSheduleLoading = true
            })
            .addCase(createPlanSchedule.fulfilled, (state, action) => {
                state.isCreatePlanSheduleSuccess = true;
                if (action.payload.isSuccess === false) {
                    state.isCreatePlanSheduleSuccess = false;
                    state.isCreatePlanSheduleError = action.payload.message;
                }
                state.isCreatePlanSheduleMessage = action.payload.message;
            })
            .addCase(createPlanSchedule.rejected, (state, action) => {
                state.isCreatePlanSheduleError = true
                state.isCreatePlanSheduleMessage = action.payload
            })
            .addCase(getLoginUserName.pending, (state) => {
                state.isGetLoginUserNameLoading = true
            })
            .addCase(getLoginUserName.fulfilled, (state, action) => {
                state.isGetLoginUserNameLoading = false
                state.isGetLoginUserNameSuccess = true
                state.getLoginUserProfileList = action.payload
            })
            .addCase(getLoginUserName.rejected, (state, action) => {
                state.isGetLoginUserNameLoading = false
                state.isGetLoginUserNameSuccess = false
                state.isGetLoginUserNameError = true
                state.getLoginUserProfileList = []
            })
            .addCase(getBrokerUserOTP.pending, (state) => {
                state.isGetOtpLoading = true
            })
            .addCase(getBrokerUserOTP.fulfilled, (state, action) => {
                state.isGetOtpLoading = false
                state.isGetOtpSuccess = true
                if (action.payload.isSuccess === false) {
                    state.isGetOtpSuccess = false
                    state.isGetOtpError = action.payload.message
                }
                state.isGetOtpMessage = action.payload.message
            })
            .addCase(getBrokerUserOTP.rejected, (state, action) => {
                state.isGetOtpError = true
                state.isGetOtpMessage = action.payload.message
            })

            .addCase(brokerUserOTPVerify.pending, (state) => {
                state.isOtpVerifyLoading = true
            })
            .addCase(brokerUserOTPVerify.fulfilled, (state, action) => {
                state.isOtpVerifyLoading = false
                state.isOtpVerifySuccess = true
                if (action.payload.isSuccess === false) {
                    state.isOtpVerifySuccess = false
                    state.isOtpVerifyError = action.payload.message
                }
                state.otpVerified = action.payload.message
            })
            .addCase(brokerUserOTPVerify.rejected, (state, action) => {
                state.isOtpVerifyError = true
                state.otpVerified = action.payload.message
            })

            .addCase(getProfileImageUrl.pending,(state)=>{
                state.isGetBrokUserImageLoading = true;
            })
            .addCase(getProfileImageUrl.fulfilled,(state,action)=>{
                state.isGetBrokUserImageLoading = false
                state.isGetBrokUserImageSuccess = true
                state.brokerUserImage = action.payload.data
            })
            .addCase(getProfileImageUrl.rejected,(state,action)=>{
                state.isGetBrokUserImageLoading = false
                state.isGetBrokUserImageSuccess = false
                state.isGetBrokUserImageError = true
                state.brokerUserImage = []
            })
    }
})

export const { resetProfileList, resetPlanByBroker, resetUserLoginCreate, resetgetLoginUserName, resetGetLoginUserProfile,
    resetGetUserLoginOtp, resetBrokerUserOtpVerify, resetUserDetailsByid, resetcreatePlanSchedule, resetDeleteUserLogin } = userProfileSlice.actions
export default userProfileSlice.reducer
