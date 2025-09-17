
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import publicUserService from '../../Services/PublicUser/publicUserService'
import azureService from '../../Services/azureService'


const initialState = {
    brokers: [],
    broker: {},
    brokerImageUrl: '',
    brokeremail: '',
    brokerTotal: 0,
    brokImageList: [],
    brokerDetails: {},
    userStatus: {},
    userExists: {},
    totalRecords: '',

    profiles: [],
    profileTotal: 0,
    totalRecord: 0,
    isGetProfileLoading: false,
    isGetProfileSuccess: false,
    isGetProfileError: false,
    profileImageList: [],
    filters: {},

    isRegisterProfileError: false,
    isRegisterProfileSuccess: false,
    isRegisterProfileLoading: false,
    registerProfilemessage: '',
    registerProfileId: '',

    isUpdateHoroscopeProfileError: false,
    isUpdateHoroscopeSuccess: false,
    isUpdateHoroscopeLoading: false,
    messageUpdateHoroscope: '',

    profileDetails: {},
    createdBy: {},
    updatedBy: {},
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',

    isdeleteProfileError: false,
    isdeleteProfileSuccess: false,
    isdeleteProfileLoading: false,
    messageResetdeleteProfile: '',

    isImageListError: false,
    isImageSuccess: false,
    isImageLoading: false,
    imageMessage: '',
    Images: [],

    isPublicUserDetailLoading: false,
    isPublicUserDetailSuccess: false,
    isPublicUserDetailError: false,
    publicuserDetails: {},
    publicuserId: '',
    publicUser: '',

    isUpdatedProfileLoading: false,
    isUpdatedProfileSuccess: false,
    updatedProfilemessage: '',
    isUpdatedProfileError: false,

    isPUProfileRegisterleLoading: false,
    isPUProfileRegisterSuccess: false,
    isPUProfileRegisterError: false,
    PUProfileRegisterMessage: '',

    isGetPlanLoading: false,
    isGetPlanSuccess: false,
    alreadyExists: '',
    planExists: '',
    activeplan: '',
    isGetPlanError: false,

    isGetPUPlanLoading: false,
    isGetPUPlanSuccess: false,
    isGetPUPlanError: false,
    isPUPlanList: [],

    isUpgradePlanLoading: false,
    isUpgradePlanSuccess: false,
    isUpgradePlanError: false,
    isUpgradePlanMessage: '',

    isBalanceQuotaLoading: false,
    isBalanceQuotaSuccess: false,
    isBalanceQuotaError: false,
    balanceQuotaDetails: [],
    expiryDate: {},
    planCategory: {},

    isUploadProfileError: false,
    isUploadProfileSuccess: false,
    isUploadProfileLoading: false,
    uploadProfilemessage: '',

    isUpdateHoroscopeProfileError: false,
    isUpdateHoroscopeSuccess: false,
    isUpdateHoroscopeLoading: false,
    messageUpdateHoroscope: '',

    isGetPUImageLoading: false,
    isGetPUImageSuccess: false,
    isGetPUImageError: false,
    getPUImageList: [],

    isMarriageProfileDetailLoading: false,
    isMarriageProfileDetailSuccess: false,
    isMarriageProfileDetailError: false,
    MarriageprofileDetail: '',
    BrokerDetails: {},

    isgetHoroscopeDetailsByIdLoading: false,
    isgetHoroscopeDetailsByIdSuccess: false,
    isgetHoroscopeDetailsByIdError: false,
    isGetHoroscopeMessage: false,
    horoScope: {},

    isRemoveProfileImageError:false,
    isRemoveProfileImageSuccess:false,
    isRemoveProfileImageLoading:false,
    removeProfileImagemessage:null,

    isAdditionalPlanLoading: false,
    isAdditionalPlanSuccess: false,
    isAdditionalPlanError: false,
    getAdditionalPlan:{},
    AdditionalPlanMessage:'',

    isgetAllPUplansLoading: false,
    isgetAllPUplansSuccess: false,
    isgetAllPUplansError: false,
    getAllPuplicUserplans: [],
    getplanName: [],

    isactivePlanLoading : false,
    isactivePlanSuccess : false,
    isactivePlanError : false,
    ActivePlan : {},
    ActivePlanMessage :'',

    isViewPlanlistLoading : false,
    isViewPlanlistSuccess : false,
    isViewPlanlistError : false,
    ViewPlanlist : [],

    isviewplanActiveLoading : false,
    isviewplanActiveSuccess : false,
    isviewplanActiveError : false,
    viewplanActiveMessage : ''
}


export const fetchBrokers = createAsyncThunk(
    'public/fetchBrokers',
    async (data, thunkAPI) => {
        try {
            return await publicUserService.fetchAllBrokers(data)
        }
        catch (error) {
            const message = (error.response && error.response.data &&
                error.response.data.message) || error.message || error.tostring()

            return thunkAPI.rejectWithValue(message)
        }
    }
)


export const getAllBrokers = createAsyncThunk(
    'public/getAllBrokers',
    async (data, thunkAPI) => {
        try {
            //return await brokService.getAllBrokers()
            return await publicUserService.fetchAllBrokers()
        }
        catch (error) {
            const message = (error.response && error.response.data &&
                error.response.data.message) || error.message || error.tostring()

            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const registerProfile = createAsyncThunk(
    'public/registerProfile',
    async (data, thunkAPI) => {
        try {
            return await publicUserService.registerProfile(data)
        }
        catch (error) {
            const message = (error.response && error.response.data &&
                error.response.data.message) || error.message || error.tostring()

            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const uploadPUProfileImage = createAsyncThunk(
    'public/uploadPUProfileImage',
    async (fileData, thunkAPI) => {
        try {
            return await azureService.uploadPUProfileImage(fileData);
        }
        catch (error) {
            const message = (error.response && error.response.data &&
                error.response.data.message) || error.message || error.tostring()

            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const updatePUHoroscope = createAsyncThunk(
    'public/updatePUHoroscope',
    async (data, thunkAPI) => {
        try {
            return await publicUserService.updatePUHoroscope(data);
        }
        catch (error) {
            const message = (error.response && error.response.data &&
                error.response.data.message) || error.message || error.tostring()

            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const getProfileDetailsById = createAsyncThunk(
    'public/getProfileDetailsById',
    async (data, thunkAPI) => {
        try {

            return await publicUserService.getProfileDetailsById(data)
        }
        catch (error) {
            const message = (error.response && error.response.data &&
                error.response.data.message) || error.message || error.tostring()

            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const deleteProfile = createAsyncThunk(
    'public/deleteProfile',
    async (data, thunkAPI) => {
        try {

            return await publicUserService.deleteProfile(data)
        }
        catch (error) {
            const message = (error.response && error.response.data &&
                error.response.data.message) || error.message || error.tostring()

            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const getProfileImageUrl = createAsyncThunk(
    'public/getProfileImageUrl',
    async (data, thunkAPI) => {
        try {

            return await publicUserService.getProfileImageUrl(data)
        }
        catch (error) {
            const message = (error.response && error.response.data &&
                error.response.data.message) || error.message || error.tostring()

            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const publicUserDetails = createAsyncThunk(
    'public/publicUserDetails',
    async (data, thunkAPI) => {
        try {

            return await publicUserService.publicUserDetails(data)
        }
        catch (error) {
            const message = (error.response && error.response.data &&
                error.response.data.message) || error.message || error.tostring()

            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const updateProfile = createAsyncThunk(
    'public/updateProfile',
    async (data, thunkAPI) => {
        try {
            return await publicUserService.updateProfile(data)
        }
        catch (error) {
            const message = (error.response && error.response.data &&
                error.response.data.message) || error.message || error.tostring()

            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const getAllProfilesByBrokers = createAsyncThunk(
    'public/getAllProfilesByBrokers',
    async (data, thunkAPI) => {
        try {
            return await publicUserService.getAllProfilesByBrokers(data)
        }
        catch (error) {
            const message = (error.response && error.response.data &&
                error.response.data.message) || error.message || error.tostring()

            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const PUProfileRegisterInMarriageProfileTable = createAsyncThunk(
    'public/PUProfileRegisterInMarriageProfileTable',
    async (data, thunkAPI) => {
        try {
            return await publicUserService.PUProfileRegisterInMarriageProfileTable(data)
        }
        catch (error) {
            const message = (error.response && error.response.data &&
                error.response.data.message) || error.message || error.tostring()

            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const PUExistsingPlan = createAsyncThunk(
    'public/PUExistsingPlan',
    async (data, thunkAPI) => {
        try {
            return await publicUserService.PUExistsingPlan(data)
        }
        catch (error) {
            const message = (error.response && error.response.data && error.response.data.message)
                || error.message || error.tostring()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const getPublicUserPlans = createAsyncThunk(
    'public,getPublicUserPlans',
    async (data, thunkAPI) => {
        try {
            return await publicUserService.getPublicUserPlans(data)
        }
        catch (error) {
            const message = (error.response && error.response.data &&
                error.response.data.message) || error.message || error.tostring()

            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const upgradePlan = createAsyncThunk(
    'public,upgradePlan',
    async (data, thunkAPI) => {
        try {
            return await publicUserService.upgradePlan(data)
        }
        catch (error) {
            const message = (error.response && error.response.data &&
                error.response.data.message) || error.message || error.tostring()

            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const PUBalanceQuota = createAsyncThunk(
    'public,PUBalanceQuota',
    async (data, thunkAPI) => {
        try {
            return await publicUserService.PUBalanceQuota(data)
        }
        catch (error) {
            const message = (error.response && error.response.data &&
                error.response.data.message) || error.message || error.tostring()

            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const getPUImageUrl = createAsyncThunk(
    'public/getPUImageUrl',
    async (data, thunkAPI) => {
        try {

            return await publicUserService.getPUImageUrl(data)
        }
        catch (error) {
            const message = (error.response && error.response.data &&
                error.response.data.message) || error.message || error.tostring()

            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const getMarriageProfileDetailById = createAsyncThunk(
    'public/getMarriageProfileDetailById',
    async (data, thunkAPI) => {
        try {

            return await publicUserService.getMarriageProfileDetailById(data)
        }
        catch (error) {
            const message = (error.response && error.response.data &&
                error.response.data.message) || error.message || error.tostring()

            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const getHoroscopeDetailsById = createAsyncThunk(
    'public/getHoroscopeDetailsById',
    async (data, thunkAPI) => {
        try {
            return await publicUserService.getHoroscopeDetailsById(data)
        }
        catch (error) {
            const message = (error.response && error.response.data &&
                error.response.data.message) || error.message || error.tostring()

            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const getPUProfileViewedImageURL = createAsyncThunk(
    'public/getPUProfileViewedImageURL',
    async (data, thunkAPI) => {
        try {

            return await publicUserService.getPUProfileViewedImageURL(data)
        }
        catch (error) {
            const message = (error.response && error.response.data &&
                error.response.data.message) || error.message || error.tostring()

            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const PURemoveProfileImage = createAsyncThunk(
    'public/PURemoveProfileImage',
    async(data,thunkAPI)=>{
        try{
           
             return await publicUserService.PURemoveProfileImage(data)
        }
        catch(error){
            const message = (error.response && error.response.data &&
                error.response.data.message) || error.message || error.tostring()

                return thunkAPI.rejectWithValue(message)
        }
    }
)

export const AdditionalPlans = createAsyncThunk(
    'public/AdditionalPlan',
    async (data, thunkAPI) => {
        try {

            return await publicUserService.AdditionalPlan(data)
        }
        catch (error) {
            const message = (error.response && error.response.data &&
                error.response.data.message) || error.message || error.tostring()

            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const getAllPUplans = createAsyncThunk(
    'public/getAllPUplans',
    async (data, thunkAPI) => {
        try {

            return await publicUserService.getAllPUplans(data)
        }
        catch (error) {
            const message = (error.response && error.response.data &&
                error.response.data.message) || error.message || error.tostring()

            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const activePlan = createAsyncThunk(
    'public/activePlan',
    async (data, thunkAPI) => {
        try {

            return await publicUserService.activePlan(data)
        }
        catch (error) {
            const message = (error.response && error.response.data &&
                error.response.data.message) || error.message || error.tostring()

            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const viewplan = createAsyncThunk(
    'public/viewplan',
    async (data, thunkAPI) => {
        try {

            return await publicUserService.viewplan(data)
        }
        catch (error) {
            const message = (error.response && error.response.data &&
                error.response.data.message) || error.message || error.tostring()

            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const viewplanActive = createAsyncThunk(
    'public/viewplanActive',
    async (data, thunkAPI) => {
        try {

            return await publicUserService.viewplanActive(data)
        }
        catch (error) {
            const message = (error.response && error.response.data &&
                error.response.data.message) || error.message || error.tostring()

            return thunkAPI.rejectWithValue(message)
        }
    }
)

const initializeBrokerList = (state) => {
    state.brokers = []
    state.broker = {}
}

export const publicUserSlice = createSlice({
    name: 'public',
    initialState,
    reducers: {
        resetfetchBrokers: (state) => {
            state.isfetchBrokerLoading = false
            state.isfetchBrokerSuccess = false
            state.isfetchBrokerError = false
            state.fetchBrokermessage = false
        },
        setFilterBrokList: (state, action) => {
            state.filters = action.payload;
        },
        resetRegisterProfile: (state) => {
            state.isRegisterProfileLoading = false
            state.isRegisterProfileSuccess = false
            state.isRegisterProfileError = false
            state.registerProfilemessage = ''
            state.registerProfileId = ''
        },
        resetRegisterMessages: (state) => {
            state.isRegisterProfileSuccess = false
            state.isRegisterProfileError = false
            state.registerProfilemessage = ''
        },
        resetImageUploadByState: (state) => {
            state.uploadProfilemessage = ''
            state.isUploadProfileSuccess = false
            state.isUploadProfileLoading = false
            state.isUploadProfileError = false
        },
        resetUpdateHoroscope: (state) => {
            state.isUpdateHoroscopeProfileError = false
            state.isUpdateHoroscopeSuccess = false
            state.isUpdateHoroscopeLoading = false
            state.messageUpdateHoroscope = ''
        },
        resetGetProfileDetailsById: (state) => {
            state.isProfileDetailsByIdLoading = false
            state.isProfileDetailsByIdSuccess = false
            state.profileDetails = {}
            state.createdBy = ''
            state.updatedBy = ''
        },
        resetdeleteProfile: (state) => {
            state.isdeleteProfileError = false
            state.isdeleteProfileSuccess = false
            state.isdeleteProfileLoading = false
            state.messagedeleteProfile = ''
        },
         resetDeleteProfileMessage:(state)=>{
            state.isdeleteProfileError = false
        },
        resetGetProfileImageUrl: (state) => {
            state.isImageListError = false
            state.isImageSuccess = false
            state.isImageLoading = false
            state.imageMessage = ''
            state.Images = []
        },
        resetGetPUProfileImageMessage: (state) => {
            state.imageMessage = ''
        },
        resetGetPUProfileViewedImageURL:(state) => {
            state.isImageListError = false
            state.isImageSuccess = false
            state.isImageLoading = false
            state.imageMessage = ''
        },
        resetPublicUserDetails: (state) => {
            state.isPublicUserDetailLoading = false
            state.isPublicUserDetailSuccess = false
            state.isPublicUserDetailError = false
            state.publicuserDetails = {}
            state.publicuserId = ''
        },
        //  resetUpdateProfile:(state)=>{
        //     state.isUpdateProfileLoading = false
        //     state.isUpdateProfileSuccess = false
        //     state.isUpdateProfileError = false
        //     state.UpdateProfilemessage =''
        //     state.UpdateProfileId =''
        // },

        resetUpdatedProfile: (state) => {
            state.isUpdatedProfileLoading = false
            state.isUpdatedProfileSuccess = false
            state.isUpdatedProfileError = false
            state.updatedProfilemessage = ''
        },
        resetUpdatedProfileMessage: (state) => {
            state.isUpdatedProfileSuccess = false
            state.isUpdatedProfileError = false
        },
        resetGetProfiles: (state) => {
            state.isGetProfileLoading = false
            state.isGetProfileSuccess = false
            state.isGetProfileError = false
            state.profiles = []
        },
        setFilters: (state, action) => {
            state.filters = action.payload;
        },
        resetPUProfileRegisterInMarriageProfileTable: (state) => {
            state.isPUProfileRegisterleLoading = false
            state.isPUProfileRegisterSuccess = false
            state.isPUProfileRegisterError = false
            state.PUProfileRegisterMessage = ''
        },
        resetGetAlreadyExistsUser: (state) => {
            state.isGetPlanLoading = false
            state.isGetPlanSuccess = false
            state.isGetPlanError = false
        },
        resetGetPUPlan: (state) => {
            state.isGetPUPlanLoading = false
            state.isGetPUPlanSuccess = false
            state.isGetPUPlanError = false
            // state.isPUPlanList = []
        },
        resetUpgradePlan: (state) => {
            state.isUpgradePlanLoading = false
            state.isUpgradePlanSuccess = false
            state.isUpgradePlanError = false
            state.isUpgradePlanMessage = ''
        },
        resetBalanceQuota: (state) => {
            state.isBalanceQuotaLoading = false
            state.isBalanceQuotaSuccess = false
            state.isBalanceQuotaError = false
            //state.balanceQuotaDetails = []
            //state.expiryDate = {}
           // state.planCategory = {}
        },
        resetgetMarriageProfileDetailById: (state) => {
            state.isMarriageProfileDetailLoading = false
            state.isMarriageProfileDetailSuccess = false
            state.isMarriageProfileDetailError = false
            state.MarriageprofileDetail = {}
        },
        resetHoroscopeDetailsById: (state) => {
            state.isgetHoroscopeDetailsByIdLoading = false
            state.isgetHoroscopeDetailsByIdSuccess = false
            state.isgetHoroscopeDetailsByIdError = false
            state.getProfileHoroscope = ''
        },
         resetRemoveProfileImage: (state) =>{
            state.isRemoveProfileImageError = false
            state.isRemoveProfileImageSuccess = false
            state.isRemoveProfileImageLoading = false
            state.removeProfileImagemessage = ''
        },
        resetAdditionalPlan: (state) =>{
            state.isAdditionalPlanLoading= false
            state.isAdditionalPlanSuccess= false
            state.isAdditionalPlanError= false
            state.getAdditionalPlan={}
            state.AdditionalPlanMessage=''
        },
        resetGetAllPUPlans: (state) =>{
            state.isgetAllPUplansLoading= false
            state.isgetAllPUplansSuccess= false
            state.isgetAllPUplansError= false
            state.getAllPuplicUserplans= []
            state.getplanName= []
        },
        resetActivePlan: (state) =>{
            state.isactivePlanLoading = false
            state.isactivePlanSuccess = false
            state.isactivePlanError = false
            state.ActivePlan = {}
            state.ActivePlanMessage = ''
        },
        resetGetProfileImageUrl: (state) =>{
            state.isGetPUImageLoading = false
            state.isGetPUImageSuccess = false
            state.isGetPUImageError = false
            state.getPUImageList=[]
        },
        resetViewPlanlist: (state) =>{
            state.isViewPlanlistLoading = false
            state.isViewPlanlistSuccess = false
            state.isViewPlanlistError = false
        },
        resetviewplanActive:(state) =>{
            state.isviewplanActiveLoading = false
            state.isviewplanActiveSuccess = false
            state.isviewplanActiveError = false
            state.viewplanActiveMessage = ''
        }

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchBrokers.pending, (state) => {
                state.isfetchBrokerLoading = true;
            })
            .addCase(fetchBrokers.fulfilled, (state, action) => {
                state.isfetchBrokerLoading = false
                state.isfetchBrokerSuccess = true
                state.brokers = action.payload.brokerList
                state.brokerTotal = action.payload.totalRecord
                state.brokImageList = action.payload.brokImageList
                state.totalRecords = action.payload.totalRecords
                state.userStatus = action.payload.userStatus
                state.userExists = action.payload.userExists
            })
            .addCase(fetchBrokers.rejected, (state, action) => {
                state.isfetchBrokerLoading = false
                state.isfetchBrokerError = true
                state.fetchBrokermessage = action.payload
                state.brokers = []
                state.brokerTotal = 0
                state.brokImageList = []
            })

            .addCase(registerProfile.pending, (state) => {
                state.isRegisterProfileLoading = true;
            })
            .addCase(registerProfile.fulfilled, (state, action) => {
                state.isRegisterProfileLoading = false
                state.isRegisterProfileSuccess = true
                state.registerProfileId = action.payload.Id
            })
            .addCase(registerProfile.rejected, (state, action) => {
                state.isRegisterProfileLoading = false
                state.isRegisterProfileError = true
                state.registerProfilemessage = action.payload
                state.profiles = []
            })

            .addCase(uploadPUProfileImage.pending, (state) => {
                state.isUploadProfileLoading = true;
            })
            .addCase(uploadPUProfileImage.fulfilled, (state, action) => {
                state.isUploadProfileLoading = false
                state.isUploadProfileSuccess = true
                state.uploadProfilemessage = action.payload.data
            })
            .addCase(uploadPUProfileImage.rejected, (state, action) => {
                state.isUploadProfileLoading = false
                state.isUploadProfileError = true
                state.isUploadProfileSuccess = false
                state.uploadProfilemessage = action.payload.data
            })

            .addCase(updatePUHoroscope.pending, (state) => {
                state.isUpdateHoroscopeLoading = true;
            })
            .addCase(updatePUHoroscope.fulfilled, (state, action) => {
                state.isUpdateHoroscopeLoading = false
                state.isUpdateHoroscopeSuccess = true
                if (action.payload.isSuccess == false) {
                    state.isUpdateHoroscopeSuccess = false
                    state.isUpdateHoroscopeProfileError = action.payload.message
                }
                state.messageUpdateHoroscope = action.payload.message
            })
            .addCase(updatePUHoroscope.rejected, (state, action) => {
                state.isUpdateHoroscopeLoading = false
                state.isUpdateHoroscopeProfileError = true
                state.messageUpdateHoroscope = action.payload.message
            })

            .addCase(getProfileDetailsById.pending, (state) => {
                state.isProfileDetailsByIdLoading = true;
            })
            .addCase(getProfileDetailsById.fulfilled, (state, action) => {
                state.isProfileDetailsByIdLoading = false
                state.isProfileDetailsByIdSuccess = true
                state.profileDetails = action.payload.profileDetails
                state.createdBy = action.payload.createdBy
                state.updatedBy = action.payload.updatedBy

            })
            .addCase(getProfileDetailsById.rejected, (state, action) => {
                state.isProfileDetailsByIdLoading = false
                state.isProfileDetailsByIdError = true
                state.profileDetailsByIdmessage = action.payload
                state.profileDetails = {}
            })

            .addCase(deleteProfile.pending, (state) => {
                state.isdeleteProfileLoading = true;
            })
            .addCase(deleteProfile.fulfilled, (state, action) => {
                state.isdeleteProfileLoading = false
                state.isdeleteProfileSuccess = true
                state.messagedeleteProfile = action.payload.message
            })
            .addCase(deleteProfile.rejected, (state, action) => {
                state.isdeleteProfileLoading = false
                state.isdeleteProfileError = true
                state.messagedeleteProfile = action.payload
            })

            .addCase(getProfileImageUrl.pending, (state) => {
                state.isImageLoading = true;
            })
            .addCase(getProfileImageUrl.fulfilled, (state, action) => {
                state.isImageLoading = false
                debugger
                if (action.payload.isSuccess) {
                    state.isImageSuccess = true
                    state.Images = action.payload.data
                    state.imageMessage = action.payload.message
                }

                if (!action.payload.isSuccess) {
                    state.isImageSuccess = false
                    state.imageMessage = action.payload.message
                    state.Images = []
                }
            })
            .addCase(getProfileImageUrl.rejected, (state, action) => {
                state.isImageLoading = false
                state.isImageListError = true
                state.Images = []
            })

            .addCase(publicUserDetails.pending, (state) => {
                state.isPublicUserDetailLoading = true
            })
            .addCase(publicUserDetails.fulfilled, (state, action) => {
                state.isPublicUserDetailLoading = false
                state.isPublicUserDetailSuccess = action.payload.isSuccess
                state.publicuserDetails = action.payload.publicuserDetails
                state.publicuserId = action.payload.publicuserId
                state.publicuserRegister = action.payload.publicuserRegister
                state.userStatus = action.payload.publicUser
                state.planId = action.payload.planID
            })
            .addCase(publicUserDetails.rejected, (state, action) => {
                state.isPublicUserDetailLoading = false
                state.isPublicUserDetailSuccess = false
                state.isPublicUserDetailError = true
                state.publicuserDetails = {}
            })

            .addCase(updateProfile.pending, (state) => {
                state.isUpdatedProfileLoading = true;
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                state.isUpdatedProfileLoading = false
                state.isUpdatedProfileSuccess = true
                state.updatedProfilemessage = action.payload.message
            })
            .addCase(updateProfile.rejected, (state, action) => {
                state.isUpdatedProfileLoading = false
                state.isUpdatedProfileError = true
                state.updatedProfilemessage = action.payload.message
            })

            .addCase(getAllProfilesByBrokers.pending, (state, action) => {
                state.isGetProfileLoading = true
            })
            .addCase(getAllProfilesByBrokers.fulfilled, (state, action) => {
                state.isGetProfileLoading = false
                state.isGetProfileSuccess = true
                state.profiles = action.payload.profiles
                state.profileTotal = action.payload.profileTotal
                state.totalRecord = action.payload.totalRecord
                state.imageUrlList = action.payload.imageUrl
                state.activeplan = action.payload.activePlan
            })
            .addCase(getAllProfilesByBrokers.rejected, (state, action) => {
                state.isGetProfileError = true
                state.profiles = []
                state.profileTotal = 0
                state.totalRecord = 0
            })

            .addCase(PUProfileRegisterInMarriageProfileTable.pending, (state) => {
                state.isPUProfileRegisterleLoading = true
            })
            .addCase(PUProfileRegisterInMarriageProfileTable.fulfilled, (state, action) => {
                state.isPUProfileRegisterleLoading = false
                state.isPUProfileRegisterSuccess = action.payload.isSuccess
                state.PUProfileRegisterMessage = action.payload.message
            })
            .addCase(PUProfileRegisterInMarriageProfileTable.rejected, (state, action) => {
                state.isPUProfileRegisterleLoading = false
                state.isPUProfileRegisterSuccess = false
                state.isPUProfileRegisterError = true
                state.PUProfileRegisterMessage = action.payload.message
            })

            .addCase(PUExistsingPlan.pending, (state) => {
                state.isGetPlanLoading = true
                state.isGetPlanSuccess = false
                state.isGetPlanError = false
            })
            .addCase(PUExistsingPlan.fulfilled, (state, action) => {
                state.isGetPlanLoading = false
                state.isGetPlanSuccess = true
                state.alreadyExists = action.payload.PUexists
                state.planExists = action.payload.planExists
            })
            .addCase(PUExistsingPlan.rejected, (state) => {
                state.isGetPlanLoading = false
                state.isGetPlanSuccess = false
                state.isGetPlanError = true
            })

            .addCase(getPublicUserPlans.pending, (state) => {
                state.isGetPUPlanLoading = true
            })
            .addCase(getPublicUserPlans.fulfilled, (state, action) => {
                state.isGetPUPlanLoading = false
                state.isGetPUPlanSuccess = true
                state.isPUPlanList = action.payload.publicUserPlan
                state.planIDs = action.payload.planIDs
            })
            .addCase(getPublicUserPlans.rejected, (state, action) => {
                state.isGetPUPlanSuccess = false
                state.isGetPUPlanError = true
                state.isPUPlanList = []
            })

            .addCase(upgradePlan.pending, (state) => {
                state.isUpgradePlanLoading = true
            })
            .addCase(upgradePlan.fulfilled, (state, action) => {
                state.isUpgradePlanSuccess = true
                if (action.payload.isSuccess === false) {
                    state.isUpgradePlanSuccess = false
                    state.isUpgradePlanError = action.payload.message
                }
                state.isUpgradePlanMessage = action.payload.message
            })
            .addCase(upgradePlan.rejected, (state, action) => {
                state.isUpgradePlanError = true
                state.isUpgradePlanMessage = action.payload.message
            })

            .addCase(PUBalanceQuota.pending, (state) => {
                state.isBalanceQuotaLoading = true
            })
            .addCase(PUBalanceQuota.fulfilled, (state, action) => {
                debugger
                state.isBalanceQuotaSuccess = true
                state.balanceQuotaDetails = action.payload.schedule;
                state.planId = action.payload.planId
                state.expiryDate = action.payload.expiryDate;
                state.planCategory = action.payload.planCategory;
            })
            .addCase(PUBalanceQuota.rejected, (state, action) => {
                state.isBalanceQuotaError = true
                state.balanceQuotaDetails = []
            })

            .addCase(getPUImageUrl.pending, (state) => {
                state.isGetPUImageLoading = true
            })
            .addCase(getPUImageUrl.fulfilled, (state, action) => {
                state.isGetPUImageLoading = false
                debugger
                if (action.payload.isSuccess) {
                    state.isGetPUImageSuccess = true
                    state.getPUImageList = action.payload.data
                }

                if (!action.payload.isSuccess) {
                    state.isGetPUImageSuccess = false
                    state.imageMessage = action.payload.message
                    state.getPUImageList = []
                }
                state.isGetPUImageSuccess = true
                state.getPUImageList = action.payload.data
            })
            .addCase(getPUImageUrl.rejected, (state, action) => {
                state.isGetPUImageSuccess = false
                state.isGetPUImageError = true
                state.getPUImageList = []
                state.imageMessage=''
            })

            .addCase(getMarriageProfileDetailById.pending, (state) => {
                state.isMarriageProfileDetailLoading = true;
            })
            .addCase(getMarriageProfileDetailById.fulfilled, (state, action) => {
                state.isMarriageProfileDetailLoading = false
                state.isMarriageProfileDetailSuccess = true
                state.MarriageprofileDetail = action.payload.MarriageprofileDetail
                state.BrokerDetails = action.payload.BrokerDetails
            })
            .addCase(getMarriageProfileDetailById.rejected, (state, action) => {
                state.isMarriageProfileDetailLoading = false
                state.isMarriageProfileDetailError = true
                state.MarriageprofileDetail = {}
            })

            .addCase(getHoroscopeDetailsById.pending, (state) => {
                debugger
                state.isgetHoroscopeDetailsByIdLoading = true;
            })
            .addCase(getHoroscopeDetailsById.fulfilled, (state, action) => {
                state.isgetHoroscopeDetailsByIdLoading = false
                state.isgetHoroscopeDetailsByIdSuccess = true
                if (action.payload.isSuccess === false) {
                    state.isgetHoroscopeDetailsByIdSuccess = false
                    state.isgetHoroscopeDetailsByIdError = action.payload.message
                }
                state.MarriageprofileDetail.horoScope = action.payload.data
                state.isGetHoroscopeMessage = action.payload.message
            })
            .addCase(getHoroscopeDetailsById.rejected, (state, action) => {
                state.isgetHoroscopeDetailsByIdLoading = false
                state.isgetHoroscopeDetailsByIdError = true
                state.isGetHoroscopeMessage = action.payload.message
                state.MarriageprofileDetail.horoScope = {}
            })


            .addCase(getPUProfileViewedImageURL.pending, (state) => {
                state.isImageLoading = true;
            })
            .addCase(getPUProfileViewedImageURL.fulfilled, (state, action) => {
                state.isImageLoading = false
                state.isImageSuccess = true
                state.Images = action.payload.data
            })
            .addCase(getPUProfileViewedImageURL.rejected, (state, action) => {
                state.isImageLoading = false
                state.isImageListError = true
                state.Images = []
                state.imageMessage=''
            })

            .addCase(PURemoveProfileImage.pending,(state)=>{
                state.isRemoveProfileImageLoading = true;
            })
            .addCase(PURemoveProfileImage.fulfilled,(state,action)=>{
                state.isRemoveProfileImageLoading = false
                state.isRemoveProfileImageSuccess = action.payload.isSuccess
                state.removeProfileImagemessage = action.payload.message
            })
            .addCase(PURemoveProfileImage.rejected,(state,action)=>{
                state.isRemoveProfileImageLoading = false
                state.isRemoveProfileImageError = true
                state.removeProfileImagemessage = null
            })

            .addCase(AdditionalPlans.pending, (state)=>{
                state.isAdditionalPlanLoading = true
            })
            .addCase(AdditionalPlans.fulfilled,(state, action) =>{
                state.isAdditionalPlanLoading = false
                state.isAdditionalPlanSuccess = action.payload.isSuccess
                state.getAdditionalPlan = action.payload.Additionalplan
                state.AdditionalPlanMessage = action.payload.message
            })
            .addCase(AdditionalPlans.rejected,(state,action) =>{
                state.isAdditionalPlanSuccess = false
                state.isAdditionalPlanError = true
                state.getAdditionalPlan = action.payload.isSuccess
                state.AdditionalPlanMessage = action.payload.message
            })

            .addCase(getAllPUplans.pending,(state) =>{
                state.isgetAllPUplansLoading = true
            })
            .addCase(getAllPUplans.fulfilled,(state, action)=>{
                state.isgetAllPUplansLoading = false
                state.isgetAllPUplansSuccess = action.payload.isSuccess
                state.getAllPuplicUserplans = action.payload.getAllPuplicUserplans
                state.getplanName = action.payload.plan
                state.planactive = action.payload.planactive
            })
            .addCase(getAllPUplans.rejected,(state,action)=>{
                state.isgetAllPUplansSuccess = false
                state.isgetAllPUplansError = true
            })

            .addCase(activePlan.pending,(state) =>{
                state.isactivePlanLoading = true
            })
            .addCase(activePlan.fulfilled,(state,action)=>{
                state.isactivePlanLoading = false
                state.isactivePlanSuccess = action.payload.isSuccess
                state.ActivePlan = action.payload.plans
                state.ActivePlanMessage = action.payload.message
            })
            .addCase(activePlan.rejected,(state,action)=>{
                state.isactivePlanSuccess = false
                state.isactivePlanError = true
            })

            .addCase(viewplan.pending,(state) =>{
                state.isViewPlanlistLoading = true
            })
            .addCase(viewplan.fulfilled,(state,action)=>{
                state.isViewPlanlistLoading = false
                state.isViewPlanlistSuccess = true
                state.ViewPlanlist = action.payload
            })
            .addCase(viewplan.rejected,(state,action)=>{
                state.isViewPlanlistSuccess = false
                state.isViewPlanlistError = true
                state.ViewPlanlist = []
            })

            .addCase(viewplanActive.pending,(state)=>{
                state.isviewplanActiveLoading = true
            })
            .addCase(viewplanActive.fulfilled,(state,action)=>{
                state.isviewplanActiveLoading = false
                state.isviewplanActiveSuccess = action.payload.isSuccess
                state.viewplanActiveMessage = action.payload.message
            })
            .addCase(viewplanActive.rejected,(state,action)=>{
                state.isviewplanActiveLoading = false
                state.isviewplanActiveSuccess = false
                state.isviewplanActiveError = true
                state.viewplanActiveMessage = action.payload.message
            })
    }
})


export const { resetRegisterProfile, resetImageUploadByState, resetUpdateHoroscope, resetGetProfileDetailsById, resetGetProfileImageUrl,
    resetRegisterMessages, resetdeleteProfile, resetPublicUserDetails, resetUpdateProfile, resetGetProfiles,resetActivePlan,
    restLoginUser, resetPUProfileRegisterInMarriageProfileTable, resetfetchBrokers, resetGetPUPlan, resetUpgradePlan, resetgetMarriageProfileDetailById, resetHoroscopeDetailsById,
    resetGetPUProfileImageUrl,resetGetPUProfileViewedImageURL,resetGetPUProfileImageMessage,resetUpdatedProfile, resetRemoveProfileImage,resetAdditionalPlan,
    resetGetAllPUPlans,setFilters,resetviewplanActive,resetViewPlanlist,setFilterBrokList,resetBalanceQuota
} = publicUserSlice.actions
export default publicUserSlice.reducer