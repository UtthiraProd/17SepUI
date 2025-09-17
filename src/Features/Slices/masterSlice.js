import{createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import masterService  from '../Services/masterService'

const initialState ={
    masterDataList:[{"stars":[],"states":[]}],
    isMasterError:false,
    isMasterSuccess:false,
    isMasterLoading:false,
    isMastermessage:'',

    isCreateQualificationLoading:false,
    isCreateQualificationSuccess:false,
    isCreateQualificationError:false,
    isCreateQualificationMessage:'',

    isQualificationListError:false,
    isQualificationSuccess:false,
    isQualificationLoading:false,
    qualifications:[],

    isQualificationByIdloading:false,
    isQualificationByIdSuccess:false,
    isQualificationByIdError:false,
    isQualificationByIdMessage:false,
    qualification:{},

    isUpdateQualificationLoading:false,
    isUpdateQualificationSuccess:false,
    isUpdateQualificationError:false,
    isUpdateQualificationMessage:'',

    isDeleteQualificationLoading:false,
    isDeleteQualificationSuccess:false,
    isDeleteQualificationError:false,
    isDeleteQualificationMessage:'',

    isDistrictListError:false,
    isDistrictListSuccess:false,
    isDistrictListLoading:false,
    districts:[],
    
    isGetByDistrictNameLoading:false,
    isGetByDistrictNameSuccess:false,
    isGetByDistrictNameError:false,
    districts:[],
    
    iscreateDistrictLoading:false,
    iscreateDistrictSuccess:false,
    iscreateDistrictError:false,
    createDistrictMessage:'',

    isDeleteDistrictLoading:false,
    isDeleteDistrictSuccess:false,
    isDeleteDistrictError:false,
    DeleteDistrictMessage:'',

    isUpdateDistrictLoading:false,
    isUpdateDistrictSuccess:false,
    isUpdateDistrictError:false,
    updateDistrictMessage:'',

    isAllLocationLoading:false,
    isAllLocationSuccess:false,
    isAllLocationError:false,
    AllLocations:[],

    iscreateAllLocationLoading:false,
    iscreateAllLocationSuccess:false,
    iscreateAllLocationError:false,
    createAllLocationMessage:'',

   
    isCreateForeignCountryLoading:false,
    isCreateForeignCountrySuccess:false,
    isCreateForeignCountryError:false,
    isCreateForeignCountryMessage:'',

    isGetAllForeignCountryLoading:false,
    isGetAllForeignCountrySuccess:false,
    isGetAllForeignCountryError:false,
    isGetAllForeignCountryMessage:'',
    ForeignCountries:[],
   
    isGetCountryByIDLoading:false,
    isGetCountryByIDSuccess:false,
    isGetCountryByIDError:false,
    isGetCountryByIDMessage:'',
    ForeignCountryDetail:{},

    isDeleteCountryLoading:false,
    isDeleteCountrySuccess:false,
    isDeleteCountryError:false,
    isDeleteCountryMessage:'',

    isUpdateCountryLoading:false,
    isUpdateCountrySuccess:false,
    isUpdateCountryError:false,
    isUpdateCountryMessage:'',

    isJobListLoading:false,
    isJobListSuccess:false,
    isJobListError:false,
    jobs:[],

    isCreateJobLoading:false,
    isCreateJobSuccess:false,
    isCreateJobError:false,
    CreateJobMessage:'',

    isDeleteJobLoading:false,
    isDeleteJobSuccess:false,
    isDeleteJobError:false,
    DeleteJobMessage:'',

    isGetAllCasteLoading:false,
    isGetAllCasteSuccess:false,
    isGetAllCasteError:false,
    GetAllcasteslist:[],

    isCreateCasteLoading:false,
    isCreateCasteSuccess:false,
    isCreateCasteError:false,
    CreateCasteMessage:'',

    
    isGetAllReligionError:false,
    isGetAllReligionSuccess:false,
    isGetAllReligionLoading:false,
    religionsList:[],

    isCreateReligionLoading:false,
    isCreateReligionSuccess:false,
    isCreateReligionError:false,
    CreateReligionMessage:'',

    isGetByCasteNameLoading:false,
    isGetByCasteNameSuccess:false,
    isGetByCasteNameError:false,
    GetAllcasteslist:[],

    isGetByCountryNameLoading:false,
    isGetByCountryNameSuccess:false,
    isGetByCountryNameError:false,
    ForeignCountries:[],

    isgetLocationNameLoading:false,
    isgetLocationNameSuccess:false,
    isgetLocationNameError:false,
    AllLocations:[],

    isGetAllMotherTongueLoading:false,
    isGetAllMotherTongueSuccess:false,
    isGetAllMotherTongueError:false,
    isGetAllMotherTongueList:[],

    isCreateMotherTongueLoading:false,
    isCreateMotherTongueSuccess:false,
    isCreateMotherTongueError:false,
    CreateMotherTonguemessage:'',

    isUpdateMotherTongueLoading:false,
    isUpdateMotherTongueSuccess:false,
    isUpdateMotherTongueError:false,
    UpdateMotherTonguemessage:'',

    isDeleteMotherTongueLoading:false,
    isDeleteMotherTonguesuccess:false,
    isDeleteMotherTongueError:false,
    DeleteMotherTonguemessage:'',

    isGetByMotherTongueNameLoading:false,
    isGetByMotherTongueNameSuccess:false,
    isGetByMotherTongueNameError:false,
    isGetAllMotherTongueList:[],

    isDeleteCasteLoading:false,
    isDeleteCasteSuccess:false,
    isDeleteCasteError:false,
    DeleteCasteMessage:'',

    isUpdateCasteLoading:false,
    isUpdateCasteSuccess:false,
    isUpdateCasteError:false,
    UpdateCasteMessage:'',

    isgetJobByNameLoading:false,
    isgetJobByNameSuccess:false,
    isgetJobByNameError:false,
    jobs:[],
    
    isupdatejobLoading:false,
    isupdatejobSuccess:false,
    isupdatejobError:false,
    UpdatejobMesssage:'',

    isdeletelocationLoading:false,
    isdeletelocationSuccess:false,
    isdeletelocationError:false,
    DeletelocationMessage:'',

    isGetAllStateLoading:false,
    isGetAllStateSuccess:false,
    isGetAllStateError:false,
    AllStates: [],

    isCreateStateLoading:false,
    isCreateStateSuccess:false,
    isCreateStateError:false,
    isCreateStateMessage: '',

    isUpdateStateLoading:false,
    isUpdateStateSuccess:false,
    isUpdateStateError:false,
    isUpdateStateMessage:'',

    isDeleteStateLoading:false,
    isDeleteStateSuccess:false,
    isDeleleStateError:false,
    isDeleteStateMessage:'',
    
    isGetStateByNameLoading:false,
    isGetStateByNameSuccess:false,
    isGetStateByNameError:false,
    AllStates:[],

    isUpdateReligionLoding:false,
    isUpdateReligionSuccess:false,
    isUpdateReligionError:false,
    UpdateReligionMessage:'',

    isDeleteReligionLoding:false,
    isDeleteReligionSuccess:false,
    isDeleteReligionError:false,
    DeleteReligionMessage:'',

    isGetByReligionNameLoading:false,
    isGetByReligionNameSuccess:false,
    isGetByReligionNameError:false,
    religionsList:[],

    isUpdateOtherLocationLoading:false,
    isUpdateOtherLocationSuccess:false,
    isUpdateOtherLocationError:false,
    updateOtherlocationMessage:''

}

export const getAllStars = createAsyncThunk(
    'master/getAllStars',
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

export const getAllRasis = createAsyncThunk(
    'master/getAllRasis',
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

export const getAllReligions = createAsyncThunk(
    'master/getAllReligions',
    async(thunkAPI)=>{
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

export const getAllQualifications= createAsyncThunk(
    'master/getAllQualifications',
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


export const getQualificationById=createAsyncThunk(
   'master/getQualificationById',
   async(id,thunkAPI) =>{
    try{
        return await masterService.getQualificationById(id)
    }
    catch(error){
        const message = (error.response && error.response.data &&
            error.response.data.message) || error.message || error.tostring()

            return thunkAPI.rejectWithValue(message)
    }
   }
)

export const createQualification=createAsyncThunk(
    'master/createQualification',
    async(data,thunkAPI)=>{
        try{
            return await masterService.createQualification(data)
        }
        catch(error){
            const message = (error.response && error.response.data &&
                error.response.data.message) || error.message || error.tostring()
    
                return thunkAPI.rejectWithValue(message)
        }
    }
)

export const getjobById= createAsyncThunk(
    'master/getjobById',
    async(user,thunkAPI)=>{
        try{
             return await masterService.getjobById()
        }
        catch(error){
            const message = (error.response && error.response.data &&
                error.response.data.message) || error.message || error.tostring()

                return thunkAPI.rejectWithValue(message)
        }
    }
)

export const getAllJobs= createAsyncThunk(
    'master/getAllJobs',
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
export const createjob=createAsyncThunk(
    'master/createjob',
    async(data,thunkAPI)=>{
        try{
            return await masterService.createjob(data)
        }
        catch(error){
            const message = (error.response && error.response.data &&
                error.response.data.message) || error.message || error.tostring()
    
                return thunkAPI.rejectWithValue(message)
        }
    }
)
export const getAlllocation=createAsyncThunk(
    'master/getAlllocation',
    async(thunkAPI)=>{
        try{
            return await masterService.getAlllocation()
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

export const createdistricts=createAsyncThunk(
    'master/createdistricts',
    async(data,thunkAPI)=>{
        try{
            return await masterService.createdistricts(data)
        }
        catch(error){
            const message = (error.response && error.response.data &&
                error.response.data.message) || error.message || error.tostring()
    
                return thunkAPI.rejectWithValue(message)
        }
    }
)
export const getByDistrictName = createAsyncThunk(
    'master/getByDistrictName',
    async(district,thunkAPI)=>{
        try{
            return await masterService.getByDistrictName(district)
        }
        catch(error){
            const message = (error.response && error.response.data &&
                error.response.data.message) || error.message || error.tostring()

                return thunkAPI.rejectWithValue(message)
        }
    }
)

export const updateDistrict=createAsyncThunk(
    'master/updateDistrict',
    async(data,thunkAPI)=>{
        try{
            return await masterService.updateDistrict(data)
        }
        catch(error){
            const message = (error.response && error.response.data &&
                error.response.data.message) || error.message || error.tostring()
    
                return thunkAPI.rejectWithValue(message)
        }
    }
)

export const deleteDistrict = createAsyncThunk(
    'master/deleteDistrict',
    async(data,thunkAPI)=>{
        try{
            return await masterService.deleteDistrict(data)
        }
        catch(error){
            const message = (error.response && error.response.data &&
                error.response.data.message) || error.message || error.tostring()

                return thunkAPI.rejectWithValue(message)
        }
    }
)

export const createotherlocation = createAsyncThunk(
    '/master/craeteotherlocation',
    async(data,thunkAPI)=>{
        try{
            return await masterService.createotherlocation(data)
        }
        catch(error){
            const message=(error.response && error.response.data && 
                error.response.data.message) || error.message || error.tostring()
                return thunkAPI.rejectWithValue(message)
        }
    }
)

export const updateOtherlocation= createAsyncThunk(
    'master/updateOtherlocation',
    async(data,thunkAPI)=>{
        try{
            return await masterService.updateOtherlocation(data)
        }
        catch(error){
            const message=(error.response && error.response.data 
                && error.response.data.message) || error.message || error.tostring()

                return thunkAPI.rejectWithValue(message)
        }
    }
)

export const getAllForeignCountries=createAsyncThunk(
    'master/getAllForeignCountries',
    async(thunkAPI)=>{
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

export const createForeignCountry=createAsyncThunk(
    'master/createForeignCountry',
    async(data,thunkAPI)=>{
        try{
            return await masterService.createForeignCountry(data)
        }
        catch(error){
            const message = (error.response && error.response.data &&
                error.response.data.message) || error.message || error.tostring()
    
                return thunkAPI.rejectWithValue(message)
        }
    }
)

export const getForeignCountryById =createAsyncThunk(
    'master/getForeignCountryById',
    async(id,thunkAPI)=>{
        try{
            return await masterService.getForeignCountryById(id)
        }
        catch(error){
            const message = (error.response && error.response.data &&
                error.response.data.message) || error.message || error.tostring()
                return thunkAPI.rejectWithValue(message)
        }
    }
)

export const deleteCountry=createAsyncThunk(
    'master/deleteCountry',
    async(data,thunkAPI)=>{
        try{
            return await masterService.deleteCountry(data)
        }
        catch(error){
            const message = (error.response && error.response.data &&
                error.response.data.message) || error.message || error.tostring()
    
                return thunkAPI.rejectWithValue(message)
        }
    }
)

export const updateCountry=createAsyncThunk(
    'master/updateCountry',
    async(data,thunkAPI)=>{
        try{
            return await masterService.updateCountry(data)
        }
        catch(error){
            const message = (error.response && error.response.data &&
                error.response.data.message) || error.message || error.tostring()
    
                return thunkAPI.rejectWithValue(message)
        }
    }
)

export const deleteJob=createAsyncThunk(
    'master/deleteJob',
    async(data,thunkAPI)=>{
        try{
            return await masterService.deleteJob(data)
        }
        catch(error){
            const message = (error.response && error.response.data &&
                error.response.data.message) || error.message || error.tostring()
    
                return thunkAPI.rejectWithValue(message)
        }
    }
)

export const getAllCastes = createAsyncThunk(
    'master/getAllCastes',
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

export const createcaste = createAsyncThunk(
    'master/createcaste',
    async(data,thunkAPI)=>{
        try{
            return await masterService.createcaste(data)
        }
        catch(error){
            const message = (error.response && error.response.data &&
                error.response.data.message) || error.message || error.tostring()

                return thunkAPI.rejectWithValue(message)
        }
    }
)

export const deleteQualification=createAsyncThunk(
    'master/deleteQualification',
    async(data,thunkAPI)=>{
        try{
            return await masterService.deleteQualification(data)
        }
        catch(error){
            const message = (error.response && error.response.data && 
                error.response.data.message) || error.message || error.tostring()
                 
                return thunkAPI.rejectWithValue(message) 
        }
    }
)

export const createreligion = createAsyncThunk(
    'master/createreligion',
    async(data,thunkAPI)=>{
        try{
            return await masterService.createreligion(data)
        }
        catch(error){
            const message = (error.response && error.response.data &&
                error.response.data.message) || error.message || error.tostring()

                return thunkAPI.rejectWithValue(message)
            }
        }
        )

    export const updateQualification =createAsyncThunk(
        'master/updateQualification',
        async(data,thunkAPI)=>{
            try{
                return await masterService.updateQualification(data)
            }
            catch(error){
                const message = (error.response && error.response.data &&
                    error.response.data.message) || error.message || error.tostring()
    
                    return thunkAPI.rejectWithValue(message)
                }
        }
    ) 
    export const getQualificationByName=createAsyncThunk(
       'master/getQualificationByName',
       async(qualification,thunkAPI) =>{
        try{
            return await masterService.getQualificationByName(qualification)
        }
        catch(error){
            const message = (error.response && error.response.data &&
                error.response.data.message) || error.message || error.tostring()
    
                return thunkAPI.rejectWithValue(message)
        }
       }
    )
    
    
    export const getByCasteName = createAsyncThunk(
                'master/getByCasteName',
                async(caste,thunkAPI)=>{
                    try{
                        return await masterService.getByCasteName(caste)
                    }
                    catch(error){
                        const message=(error.response && error.response.data 
                            && error.response.data.message) || error.message || error.tostring()
            
                            return thunkAPI.rejectWithValue(message)
                    }
                }
            )
    
            export const getByCountryName = createAsyncThunk(
                'master/getByCountryName',
                async(foreignCountry,thunkAPI)=>{
                    try{
                        return await masterService.getByCountryName(foreignCountry)
                    }
                    catch(error){
                        const message=(error.response && error.response.data 
                            && error.response.data.message) || error.message || error.tostring()
            
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
    
            export const createMotherTongue = createAsyncThunk(
                "master/creatMotherTongue",
                async(data,thunkAPI)=>{
                    try{
                        return await masterService.createMotherTongue(data)
                    }
                    catch(error){
                        const message=(error.response && error.response.data 
                            && error.response.data.message) || error.message || error.tostring()
            
                            return thunkAPI.rejectWithValue(message)
                    }
                }
            )
    
            export const updateMotherTongue = createAsyncThunk(
                'master/updateMotherTongue',
                async(data,thunkAPI)=>{
                    try{
                        return await masterService.updateMotherTongue(data)
                    }
                    catch(error){
                        const message=(error.response && error.response.data 
                            && error.response.data.message) || error.message || error.tostring()
            
                            return thunkAPI.rejectWithValue(message)
                    }
                }
            )
    
            export const deleteMotherTongue = createAsyncThunk(
                'master/deleteMotherTongue',
                async(data,thunkAPI)=>{
                    try{
                        return await masterService.deleteMotherTongue(data)
                    }
                    catch(error){
                        const message=(error.response && error.response.data 
                            && error.response.data.message) || error.message || error.tostring()
            
                            return thunkAPI.rejectWithValue(message)
                    }
                }
            )
    
            export const getByMotherTongueName = createAsyncThunk(
                'master/getByMotherTongueName',
                async(motherTongue,thunkAPI)=>{
                    try{
                        return await masterService.getByMotherTongueName(motherTongue)
                    }
                    catch(error){
                        const message=(error.response && error.response.data 
                            && error.response.data.message) || error.message || error.tostring()
            
                            return thunkAPI.rejectWithValue(message)
                    }
                }
            )
            
export const deleteCaste = createAsyncThunk(
    'master/deleteCaste',
    async(data,thunkAPI)=>{
        try{
            return await masterService.deleteCaste(data)
        }
        catch(error){
            const message = (error.response && error.response.data &&
                error.response.data.message) || error.message || error.tostring()

                return thunkAPI.rejectWithValue(message)
        }
    }
)

export const updateCaste = createAsyncThunk(
    'master/updateCaste',
    async(data,thunkAPI)=>{
        try{
            return await masterService.updateCaste(data)
        }
        catch(error){
            const message = (error.response && error.response.data &&
                error.response.data.message) || error.message || error.tostring()

                return thunkAPI.rejectWithValue(message)
        }
    }
)
export const updatejob= createAsyncThunk(
    'master/updatejob',
    async(data,thunkAPI)=>{
        try{
            return await masterService.updatejob(data)
        }
        catch(error){
            const message=(error.response && error.response.data 
                && error.response.data.message) || error.message || error.tostring()

                return thunkAPI.rejectWithValue(message)
        }
    }
)

export const getJobByName= createAsyncThunk(
    'master/getJobByName',
    async(job,thunkAPI)=>{
        try{
             return await masterService.getJobByName(job)
        }
        catch(error){
            const message = (error.response && error.response.data &&
                error.response.data.message) || error.message || error.tostring()

                return thunkAPI.rejectWithValue(message)
        }
    }
)

export const deletelocation =createAsyncThunk(
    'master/deletelocation',
    async(data,thunkAPI)=>{
        try{
        return await masterService.deletelocation(data)
    }
    catch(error){
        const message = (error.response && error.response.data &&
            error.response.data.message) || error.message || error.tostring()

            return thunkAPI.rejectWithValue(message)
    }
}
)


    export const getAllStates = createAsyncThunk(
        'master/getAllStates',
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

    export const createState = createAsyncThunk(
        'master/createState',
        async(data,thunkAPI)=>{
            try{
                return await masterService.createState(data)
            }catch(error){
                const message = (error.response && error.response.data &&
                    error.response.data.message) || error.message || error.tostring()
    
                    return thunkAPI.rejectWithValue(message)
                }
        }
    )

    export const updateState = createAsyncThunk(
        'master/updateState',
        async(data,thunkAPI)=>{
            try{
                return await masterService.updateState(data)
            }catch(error){
                const message = (error.response && error.response.data &&
                    error.response.data.message) || error.message || error.tostring()
    
                    return thunkAPI.rejectWithValue(message)
                }
        }
    )

    export const deleleState = createAsyncThunk(
        'master/deleteState',
        async(data,thunkAPI)=>{
            try{
                return await masterService.deleleState(data)
            }catch(error){
                const message = (error.response && error.response.data &&
                    error.response.data.message) || error.message || error.tostring()
    
                    return thunkAPI.rejectWithValue(message)
                }
        }
    )

    export const getStateByName = createAsyncThunk(
        'master/getStateByName',
        async(name,thunkAPI)=>{
            try{
                return await masterService.getStateByName(name)
            }
            catch(error){
                const message = (error.response && error.response.data &&
                    error.response.data.message) || error.message || error.tostring()
    
                    return thunkAPI.rejectWithValue(message)
                }
        }
    )

    export const updatereligion = createAsyncThunk(
        'master/updatereligion',
        async(data,thunkAPI)=>{
            try{
                return await masterService.updatereligion(data)
            }
            catch(error){
                const message = (error.response && error.response.data &&
                    error.response.data.message) || error.message || error.tostring()
    
                    return thunkAPI.rejectWithValue(message)
                }
        }
    )    
    
    export const deletereligion = createAsyncThunk(
        'master/deletereligion',
        async(data,thunkAPI)=>{
            try{
                return await masterService.deletereligion(data)
            }
            catch(error){
                const message = (error.response && error.response.data &&
                    error.response.data.message) || error.message || error.tostring()
    
                    return thunkAPI.rejectWithValue(message)
            }
        }
    )    

    export const getByReligionName = createAsyncThunk(
        'master/getByReligionName',
        async(religion,thunkAPI)=>{
            try{
                return await masterService.getByReligionName(religion)
            }
            catch(error){
                const message = (error.response && error.response.data &&
                    error.response.data.message) || error.message || error.tostring()
    
                    return thunkAPI.rejectWithValue(message)
            }
        }
    )

    export const getLocationByName= createAsyncThunk(
    'master/getLocationByName',
    async(location,thunkAPI)=>{
        try{
             return await masterService.getLocationByName(location)
        }
        catch(error){
            const message = (error.response && error.response.data &&
                error.response.data.message) || error.message || error.tostring()

                return thunkAPI.rejectWithValue(message)
        }
    }
)


export const masterSlice = createSlice({
    name:'master',
    initialState,
    reducers:{
        resetMaster:(state)=>{
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
            state.message = ''
            state.masterDataList = [{"stars":[],"states":[]}]
        },
        resetcreateDistrict:(state)=>{
            state.iscreateDistrictLoading = false
            state.iscreateDistrictSuccess = false
            state.iscreateDistrictError = false
            state.createDistrictMessage=''
        },
        resetUpdateDistrict:(state)=>{
            state.isUpdateDistrictLoading=false
            state.isUpdateDistrictSuccess=false
            state.isUpdateDistrictError=false
            state.updateDistrictMessage=''
        },
        resetDeleteDistrict:(state)=>{
            state.isDeleteDistrictLoading=false
            state.isDeleteDistrictSuccess=false
            state.isDeleteDistrictError=false
            state.DeleteDistrictMessage=''
        },
        resetGetDistrictByName:(state)=>{
            state.isGetByDistrictNameLoading=false
            state.isGetByDistrictNameSuccess=false
            state.isGetByDistrictNameError=false
            state.districts=[]
        },
        resetDistrictsByState:(state)=>{
            state.isDistrictListLoading=false
            state.isDistrictListSuccess=false
            state.isDistrictListError=false
        },
        resetgetalllocation:(state)=>{
            state.isAllLocationLoading=false
            state.isAllLocationSuccess=false
            state.isAllLocationError=false
        },
        resetCreateCountry:(state)=>{
            state.isCreateForeignCountryLoading=false
            state.isCreateForeignCountrySuccess=false
            state.isCreateForeignCountryError=false
            state.isCreateForeignCountryMessage=''
         },
         resetGetallCountry:(state)=>{
             state.isGetAllForeignCountryLoading=false
             state.isGetAllForeignCountrySuccess=false
             state.isGetAllForeignCountryError=false
             state.isGetAllForeignCountryMessage=''
         },
         resetCountryByID:(state)=>{
            state.isGetCountryByIDLoading=false
            state.isGetCountryByIDSuccess=false
            state.isGetCountryByIDError=false
            state.isDeleteCountryMessage=''
            state.ForeignCountryDetail={}
        },
        resetDeleteCountry:(state)=>{
            state.isDeleteCountryLoading=false
            state.isDeleteCountrySuccess=false
            state.isDeleteCountryError=false
            state.isDeleteCountryMessage=''
        },
        resetUpdateCountry:(state)=>{
            state.isUpdateCountryLoading=false
            state.isUpdateCountryLoading=false
            state.isUpdateCountryError=false
            state.isUpdateCountryMessage=''
        },
        resetcreateotherlocation:(state)=>{
            state.iscreateAllLocationLoading=false
            state.iscreateAllLocationSuccess=false
            state.iscreateAllLocationError=false
            state.createAllLocationMessage=''
        },
        resetupdateOtherlocation:(state)=>{
            state.isUpdateOtherLocationLoading=false
            state.isUpdateOtherLocationSuccess=false
            state.isUpdateOtherLocationError=false
            state.updateOtherlocationMessage=''
        },
        resetCreateQualification:(state)=>{
            state.isCreateQualificationLoading=false
            state.isCreateQualificationSuccess=false
            state.isCreateQualificationError=false
            state.isCreateQualificationMessage=''
        },
        resetGetQualification:(state)=>{
            state.isQualificationLoading=false
            state.isQualificationSuccess=false
            state.isQualificationListError=false
        },
        resetdeleteQualification:(state)=>{
            state.isDeleteQualificationLoading=false
            state.isDeleteQualificationSuccess=false
            state.isDeleteQualificationError=false
            state.isDeleteQualificationMessage=''
        },
        resetUpdateQualification:(state)=>{
            state.isUpdateQualificationLoading=false
            state.isUpdateQualificationSuccess=false
            state.isUpdateQualificationError=false
            state.isUpdateQualificationMessage=''
        },
        resetcreatejob:(state)=>{
            state.isCreateJobLoading=false
            state.isCreateJobSuccess=false
            state.isCreateJobError=false
            state.CreateJobMessage=''
        },
        resetgetalljob:(state)=>{
            state.isJobListLoading=false
            state.isJobListSuccess=false
            state.isJobListError=false
        },
        resetdeletejob:(state)=>{
            state.isDeleteJobLoading=false
            state.isDeleteJobSuccess=false
            state.isDeleteJobError=false
            state.DeleteJobMessage=''
        },
        resetgetallCaste:(state)=>{
            state.isGetAllCasteLoading=false
            state.isGetAllCasteSuccess=false
            state.isGetAllCasteError=false
        },
        resetCreateCaste:(state)=>{
            state.isCreateCasteLoading=false
            state.isCreateCasteSuccess=false
            state.isCreateCasteError=false
            state.CreateCasteMessage=''
        },
        resetgetallreligion:(state)=>{
            state.isGetAllReligionLoading=false
            state.isGetAllReligionSuccess=false
            state.isGetAllReligionError=false
        },
        resetcreatereligion:(state)=>{
            state.isCreateReligionLoading = false
            state.isCreateReligionSuccess = false
            state.isCreateReligionError = false
            state.CreateReligionMessage = ''
        },
        resetGetByCasteName:(state)=>{
            state.isGetByCasteNameLoading = false
            state.isGetByCasteNameSuccess = false
            state.isGetByCasteNameError = false
        },
        resetGetByCountryName:(state)=>{
            state.isGetByCountryNameLoading = false
            state.isGetByCountryNameSuccess = false
            state.isGetByCountryNameError = false
        },
        resetgetAllMotherTongue:(state)=>{
            state.isGetAllMotherTongueLoading = false
            state.isGetAllMotherTongueSuccess = false
            state.isGetAllMotherTongueError = false
        },
        resetcreateMotherTongue:(state)=>{
            state.isCreateMotherTongueLoading = false
            state.isCreateMotherTongueSuccess = false
            state.isCreateMotherTongueError = false
            state.CreateMotherTonguemessage = ''
        },
        resetupdateMotherTongue:(state)=>{
            state.isUpdateMotherTongueLoading = false
            state.isUpdateMotherTongueSuccess = false
            state.isUpdateMotherTongueError = false
            state.UpdateMotherTonguemessage = ''
        },
        resetdeleteMotherTongue:(state)=>{
            state.isDeleteMotherTongueLoading = false
            state.isDeleteMotherTonguesuccess = false
            state.isDeleteMotherTongueError = false
            state.DeleteMotherTonguemessage = ''
        },
        resetgetByMotherTongueName:(state)=>{
            state.isGetByMotherTongueNameLoading = false
            state.isGetByMotherTongueNameSuccess = false
            state.isGetByMotherTongueNameError = false
        },
        resetupdatecaste:(state)=>{
            state.isUpdateCasteLoading = false
            state.isUpdateCasteSuccess = false
            state.isUpdateCasteError = false
            state.UpdateCasteMessage = ''
        },
         resetDeleteCaste:(state)=>{
            state.isDeleteCasteLoading = false
            state.isDeleteCasteSuccess = false
            state.isDeleteCasteError = false
            state.DeleteCasteMessage = ''
        },  
                
       resetupdatejob:(state)=>{
             state.isupdatejobLoading=false
             state.isupdatejobSuccess=false
             state.isupdatejobError=false
             state.UpdatejobMesssage=''
                },
        resetGetJobByName:(state)=>{
             state.isgetJobByNameLoading=false
             state.isgetJobByNameSuccess=false
             state.isgetJobByNameError=false
                },
        resetdeletelocation:(state)=>{
            state.isdeletelocationLoading=false
            state.isdeletelocationError=false
            state.isdeletelocationSuccess=false
                },
                
                resetGetAllStates:(state)=>{
                    state.isGetAllStateLoading = false
                    state.isGetAllStateSuccess = false
                    state.isGetAllStateError = false
                },
                resetCreateState:(state)=>{
                    state.isCreateStateLoading = false
                    state.isCreateStateSuccess = false
                    state.isCreateStateError = false
                    state.isCreateStateMessage = ''
                },
                resetUpdateState:(state)=>{
                    state.isUpdateStateLoading = false
                    state.isUpdateStateSuccess = false
                    state.isUpdateStateError = false
                    state.isUpdateStateMessage =''
                },
                resetDeleteState:(state)=>{
                    state.isDeleteStateLoading = false
                    state.isDeleteStateSuccess = false
                    state.isDeleleStateError = false
                    state.isDeleteStateMessage =''
                },
                resetGetStateByName:(state)=>{
                    state.isGetStateByNameLoading = false
                    state.isGetStateByNameSuccess = false
                    state.isGetStateByNameError = false
                },

                resetupdatereligion:(state)=>{
                    state.isUpdateReligionLoding = false
                    state.isUpdateReligionSuccess = false
                    state.isUpdateReligionError = false
                    state.UpdateReligionMessage = ''
                },
                resetdeletereligion:(state)=>{
                    state.isDeleteReligionLoding = false
                    state.isDeleteReligionSuccess = false
                    state.isDeleteReligionError = false
                    state.DeleteReligionMessage = ''
                },
                resetGetByReligionName:(state)=>{
                    state.isGetByReligionNameLoading = false
                    state.isGetByReligionNameSuccess = false
                    state.isGetByReligionNameError = false
                }


    }, 
    extraReducers:(builder)=>{
        builder
        .addCase(getAllStars.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(getAllStars.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.masterDataList.stars = action.payload
        })
        .addCase(getAllStars.rejected,(state,action)=>{
            state.isLoading = false
            state.isError = true
            state.masterDataList.stars = []
            
        })

        .addCase(createQualification.pending,(state)=>{
            state.isCreateQualificationLoading=true;
        })
        .addCase(createQualification.fulfilled,(state,action)=>{
           state.isCreateQualificationLoading=false
           state.isCreateQualificationSuccess=true;
           if(action.payload.isSuccess==false){
            state.isCreateQualificationSuccess=false
            state.isCreateQualificationError=action.payload.message
           }
           state.isCreateQualificationMessage=action.payload.message;
        })
        .addCase(createQualification.rejected,(state,action)=>{
           state.isCreateQualificationLoading=false
           state.isCreateQualificationError=true
           state.isCreateQualificationMessage=action.payload.message;
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
         .addCase(getQualificationById.pending,(state)=>{
            state.isQualificationByIdloading =true;
         })
         .addCase(getQualificationById.fulfilled,(state,action)=>{
            state.isQualificationByIdloading = false
            state.isQualificationByIdSuccess = true
            if(action.payload.isSuccess ==true){
                state.qualification =action.payload.qualification
            }
            else{
                state.isMastermessage =action.payload.message;
                state.qualification={}
            }
         })
         .addCase(getQualificationById.rejected,(state,action)=>{
            state.isQualificationByIdloading =false
            state.isQualificationByIdSuccess =false
            state.isQualificationByIdError =true
            state.isQualificationByIdMessage =action.payload
            state.qualification ={}
         })

         .addCase(deleteQualification.pending,(state)=>{
            state.isDeleteQualificationLoading = true;
         })
        .addCase(deleteQualification.fulfilled,(state,action)=>{
             state.isDeleteQualificationLoading = false
             state.isDeleteQualificationSuccess = true
             state.isDeleteQualificationMessage = action.payload.message
         })
        .addCase(deleteQualification.rejected,(state,action)=>{
             state.isDeleteQualificationLoading = false
             state.isDeleteQualificationError = true
             state.isDeleteQualificationMessage =action.payload.message
         })

         .addCase(updateQualification.pending,(state)=>{
            state.isUpdateQualificationLoading=true;
         })
         .addCase(updateQualification.fulfilled,(state,action)=>{
            state.isUpdateQualificationLoading=false
            state.isUpdateQualificationSuccess=true
            if(action.payload.isSuccess == false){
                state.isUpdateQualificationSuccess=false
                state.isUpdateQualificationError = action.payload.message
            }
            state.isUpdateQualificationMessage=action.payload.message
         })
         .addCase(updateQualification.rejected,(state,action)=>{
            state.isUpdateQualificationLoading=false
            state.isUpdateQualificationError=true
            state.isUpdateQualificationMessage=action.payload.message
         })

            .addCase(getQualificationByName.pending,(state)=>{
                     state.isQualificationByIdloading =true;
                  })
                  .addCase(getQualificationByName.fulfilled,(state,action)=>{
                     state.isQualificationByIdloading = false
                     state.isQualificationByIdSuccess = true
                     state.qualifications =action.payload            
                  })
                  .addCase(getQualificationByName.rejected,(state,action)=>{
                     state.isQualificationByIdloading =false
                     state.isQualificationByIdSuccess =false
                     state.isQualificationByIdError =true
                     state.qualifications=[]
                  })

         .addCase(getAllJobs.pending,(state)=>{
            state.isJobListLoading=true
         })
         .addCase(getAllJobs.fulfilled,(state,action)=>{
            state.isJobListLoading=false
            state.isJobListSuccess=true
            state.jobs=action.payload
         })
         .addCase(getAllJobs.rejected,(state,action)=>{
            state.isJobListLoading=false
            state.isJobListSuccess=false
            state.isJobListError=true
            state.jobs=[]
         })
         .addCase(createjob.pending,(state)=>{
            state.isCreateJobLoading=true
         })
         .addCase(createjob.fulfilled,(state,action)=>{
            state.isCreateJobSuccess=true
            state.CreateJobMessage=action.payload.message
         })
         .addCase(createjob.rejected,(state,action)=>{
            state.isCreateJobSuccess=false
            state.isCreateJobError=true
            state.CreateJobMessage=action.payload
         })

         .addCase(getAlllocation.pending,(state)=>{
            state.isAllLocationLoading=true
         })
         .addCase(getAlllocation.fulfilled,(state,action)=>{
            state.isAllLocationLoading=false
            state.isAllLocationSuccess=true
            state.AllLocations=action.payload
         })
         .addCase(getAlllocation.rejected,(state,action)=>{
            state.isAllLocationLoading=false
            state.isAllLocationSuccess=false
            state.isAllLocationError=true
            state.AllLocations=[]
         })
         .addCase(createotherlocation.pending,(state)=>{
            state.iscreateAllLocationLoading=true
         })
         .addCase(createotherlocation.fulfilled,(state,action)=>{
            state.iscreateAllLocationLoading=false
            state.iscreateAllLocationSuccess=true
            state.createAllLocationMessage=action.payload.message
         })
         .addCase(createotherlocation.rejected,(state,action)=>{
            state.isAllLocationLoading=false
            state.isAllLocationError=true
            state.isCreateQualificationMessage=action.payload
         })

         .addCase(updateOtherlocation.pending,(state)=>{
            state.isUpdateOtherLocationLoading=true
         })
         .addCase(updateOtherlocation.fulfilled,(state,action)=>{
            state.isUpdateOtherLocationLoading=false
            state.isUpdateOtherLocationSuccess=action.payload.isSuccess
            state.updateOtherlocationMessage=action.payload.message
         })
         .addCase(updateOtherlocation.rejected,(state,action)=>{
            state.isUpdateOtherLocationSuccess=false
            state.isUpdateOtherLocationError=true
            state.updateOtherlocationMessage=action.payload.message
         })

                 .addCase(getByDistrictName.pending,(state)=>{
                     state.isGetByDistrictNameLoading = true
                 })
                 .addCase(getByDistrictName.fulfilled,(state,action)=>{
                     state.isGetByDistrictNameLoading = false
                     state.isGetByDistrictNameSuccess = true
                     state.districts = action.payload
                 })
                 .addCase(getByDistrictName.rejected,(state,action)=>{
                     state.isGetByDistrictNameSuccess = false
                     state.isGetByDistrictNameError = true
                     state.districts = []
                 })

         .addCase(createdistricts.pending,(state)=>{
            state.iscreateDistrictLoading=true;
         })
         .addCase(createdistricts.fulfilled,(state,action)=>{
            state.iscreateDistrictLoading=false
            state.iscreateDistrictSuccess=action.payload.isSuccess
            state.createDistrictMessage=action.payload.message
         })
         .addCase(createdistricts.rejected,(state,action)=>{
            state.iscreateDistrictLoading=false
            state.iscreateDistrictSuccess=false
            state.iscreateDistrictError=true
            state.createDistrictMessage=action.payload.message
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
               state.isDistrictListSuccess=false
               state.isDistrictListError = true
               state.districts = []
        })
                 .addCase(updateDistrict.pending,(state)=>{
                    state.isUpdateDistrictLoading=true
                 })
                 .addCase(updateDistrict.fulfilled,(state,action)=>{
                    state.isUpdateDistrictLoading=false
                    state.isUpdateDistrictSuccess=action.payload.isSuccess
                    state.updateDistrictMessage=action.payload.message
                 })
                 .addCase(updateDistrict.rejected,(state,action)=>{
                    state.isUpdateDistrictSuccess=false
                    state.isUpdateDistrictError=true
                    state.updateDistrictMessage=action.payload.message
                 })

                .addCase(deleteDistrict.pending,(state)=>{
                    state.isDeleteDistrictLoading=true
                })
                .addCase(deleteDistrict.fulfilled,(state,action)=>{
                    state.isDeleteDistrictLoading=false
                    state.isDeleteDistrictSuccess=true
                    state.DeleteDistrictMessage=action.payload.message
                })
                .addCase(deleteDistrict.rejected,(state,action)=>{
                    state.isDeleteDistrictSuccess=false
                    state.isDeleteDistrictError=true
                    state.DeleteDistrictMessage=action.payload.message
                })         
        .addCase(getAllForeignCountries.pending,(state)=>{
            state.isGetAllForeignCountryLoading = true;
         })
        .addCase(getAllForeignCountries.fulfilled,(state,action)=>{
             state.isGetAllForeignCountryLoading = false
             state.isGetAllForeignCountrySuccess = true
             state.ForeignCountries = action.payload;
         })
        .addCase(getAllForeignCountries.rejected,(state)=>{
             state.isGetAllForeignCountryLoading = false
             state.isGetAllForeignCountryError = true
             state.ForeignCountries = []
         })

         .addCase(createForeignCountry.pending,(state)=>{
            state.isCreateForeignCountryLoading=true
         })
         .addCase(createForeignCountry.fulfilled,(state,action)=>{
            state.isCreateForeignCountrySuccess=true
            state.isCreateForeignCountryMessage=action.payload.message
         })
         .addCase(createForeignCountry.rejected,(state,action)=>{
            state.isCreateForeignCountrySuccess=false
            state.isCreateForeignCountryError=true
            state.isCreateForeignCountryMessage=action.payload
         })

         .addCase(deleteJob.pending,(state)=>{
            state.isDeleteJobLoading=true
         })
         .addCase(deleteJob.fulfilled,(state,action)=>{
            state.isDeleteJobSuccess=true
            state.DeleteJobMessage=action.payload.message
         })
         .addCase(deleteJob.rejected,(state,action)=>{
            state.isDeleteJobSuccess=false
            state.isDeleteJobError=true
            state.DeleteJobMessage=action.payload
         })
         .addCase(getAllCastes.pending,(state)=>{
            state.isGetAllCasteLoading = true;
                })
        .addCase(getAllCastes.fulfilled,(state,action)=>{
            state.isGetAllCasteLoading = false
            state.isGetAllCasteSuccess = true
            state.GetAllcasteslist = action.payload
                })
        .addCase(getAllCastes.rejected,(state,action)=>{
            state.isGetAllCasteLoading = false
            state.isDistrictListError = true
            state.GetAllcasteslist = []
                })
        .addCase(createcaste.pending,(state)=>{
            state.isCreateCasteLoading=true
        })
        .addCase(createcaste.fulfilled,(state,action)=>{
            state.isCreateCasteLoading=false
            state.isCreateCasteSuccess=true
            state.CreateCasteMessage=action.payload.message;
        })
        .addCase(createcaste.rejected,(state,action)=>{
            state.isCreateCasteLoading=false
            state.isCreateCasteSuccess=false
            state.isCreateCasteError=true
            state.CreateCasteMessage=action.payload.message;
        })

        .addCase(getAllReligions.pending,(state)=>{
            state.isGetAllReligionLoading = true;
         })
        .addCase(getAllReligions.fulfilled,(state,action)=>{
           state.isGetAllReligionLoading = false
           state.isGetAllReligionSuccess = true
           state.religionsList = action.payload
         })
       .addCase(getAllReligions.rejected,(state,action)=>{
          state.isGetAllReligionLoading = false
          state.isGetAllReligionError = true
          state.religionsList = []
         })

         .addCase(createreligion.pending,(state)=>{
            state.isCreateReligionLoading = true
         })
         .addCase(createreligion.fulfilled,(state,action)=>{
            state.isCreateReligionLoading = false
            state.isCreateReligionSuccess = action.payload.isSuccess
            state.CreateReligionMessage = action.payload.message
         })
         .addCase(createreligion.rejected,(state,action)=>{
            state.isCreateReligionSuccess = false
            state.isCreateReligionError = true
            state.CreateReligionMessage = action.payload.message
         })
         .addCase(getByCasteName.pending,(state)=>{
                     state.isGetByCasteNameLoading = true
                 })   
                 .addCase(getByCasteName.fulfilled,(state,action)=>{
                     state.isGetByCasteNameLoading = false
                     state.isGetByCasteNameSuccess = true
                     state.GetAllcasteslist = action.payload
                 })  
                 .addCase(getByCasteName.rejected,(state,action)=>{
                     state.isGetByCasteNameLoading = false
                     state.isGetByCasteNameSuccess = false
                     state.isGetByCasteNameError = true
                     state.GetAllcasteslist = []
                 }) 
                 .addCase(getByCountryName.pending,(state)=>{
                     state.isGetByCountryNameLoading = true
                 })
                 .addCase(getByCountryName.fulfilled,(state,action)=>{
                     state.isGetByCountryNameLoading = false
                     state.isGetByCountryNameSuccess = true
                     state.ForeignCountries = action.payload
                 })
                 .addCase(getByCountryName.rejected,(state,action)=>{
                     state.isGetByCountryNameLoading = false
                     state.isGetByCountryNameSuccess = false
                     state.isGetByCountryNameError = true
                     state.ForeignCountries = []
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
                 .addCase(createMotherTongue.pending,(state)=>{
                     state.isCreateMotherTongueLoading = true
                 })
                 .addCase(createMotherTongue.fulfilled,(state,action)=>{
                     state.isCreateMotherTongueLoading = false
                     state.isCreateMotherTongueSuccess = action.payload.isSuccess
                     state.CreateMotherTonguemessage = action.payload.message
                 })
                 .addCase(createMotherTongue.rejected,(state,action)=>{
                     state.isCreateMotherTongueLoading = false
                     state.isCreateMotherTongueSuccess = false
                     state.isCreateMotherTongueError = true
                     state.CreateMotherTonguemessage = action.payload.message
                 })
                 .addCase(updateMotherTongue.pending,(state)=>{
                     state.isUpdateMotherTongueLoading = true
                 })
                 .addCase(updateMotherTongue.fulfilled,(state,action)=>{
                     state.isUpdateMotherTongueLoading = false
                     state.isUpdateMotherTongueSuccess = action.payload.isSuccess
                     state.UpdateMotherTonguemessage = action.payload.message
                 })
                 .addCase(updateMotherTongue.rejected,(state,action)=>{
                     state.isUpdateMotherTongueSuccess = false
                     state.isUpdateMotherTongueSuccess = false
                     state.isUpdateMotherTongueError = true
                     state.UpdateMotherTonguemessage = action.payload.message
                 })
                 .addCase(deleteMotherTongue.pending,(state)=>{
                     state.isDeleteMotherTongueLoading = true
                 })
                 .addCase(deleteMotherTongue.fulfilled,(state,action)=>{
                     state.isDeleteMotherTongueLoading = false
                     state.isDeleteMotherTonguesuccess = action.payload.isSuccess
                     state.DeleteMotherTonguemessage = action.payload.message
                 })
                 .addCase(deleteMotherTongue.rejected,(state,action)=>{
                     state.isDeleteMotherTongueLoading = false
                     state.isDeleteMotherTonguesuccess = false
                     state.isDeleteMotherTongueError = true
                     state.DeleteMotherTonguemessage = action.payload.message
                 })
                 .addCase(getByMotherTongueName.pending,(state)=>{
                     state.isGetByMotherTongueNameLoading = true
                 })
                 .addCase(getByMotherTongueName.fulfilled,(state,action)=>{
                     state.isGetByMotherTongueNameLoading = false
                     state.isGetByMotherTongueNameSuccess = true
                     state.isGetAllMotherTongueList = action.payload
                 })
                 .addCase(getByMotherTongueName.rejected,(state,action)=>{
                     state.isGetByMotherTongueNameLoading = false
                     state.isGetByMotherTongueNameSuccess = false
                     state.isGetByMotherTongueNameError = true
                     state.isGetAllMotherTongueList = []
                 })
        .addCase(updatejob.pending,(state)=>{
            state.isupdatejobLoading=true
        })
        .addCase(updatejob.fulfilled,(state,action)=>{
            state.isupdatejobSuccess=action.payload.isSuccess;
            state.UpdatejobMesssage=action.payload.message
        })
        .addCase(updatejob.rejected,(state,action)=>{
            state.isupdatejobSuccess=false
            state.isupdatejobError=true
            state.UpdatejobMesssage=action.payload
        })
        .addCase(getJobByName.pending,(state)=>{
            state.isgetJobByNameLoading=true
         })
        .addCase(getJobByName.fulfilled,(state,action)=>{
            state.isgetJobByNameLoading=false
            state.isgetJobByNameSuccess=true
            state.jobs=action.payload
         })
        .addCase(getJobByName.rejected,(state,action)=>{
            state.isgetJobByNameSuccess=false
            state.isgetJobByNameError=true
            state.jobs=[]
         }) 
        
        .addCase(getLocationByName.pending,(state)=>{
            state.isgetLocationNameLoading=true
         })
        .addCase(getLocationByName.fulfilled,(state,action)=>{
            state.isgetLocationNameLoading=false
            state.isgetLocationNameSuccess=true
            state.AllLocations=action.payload
         })
        .addCase(getLocationByName.rejected,(state,action)=>{
            state.isgetLocationNameSuccess=false
            state.isgetLocationNameError=true
            state.AllLocations=[]
         })           
         
         .addCase(deletelocation.pending,(state)=>{
            state.isdeletelocationLoading=true
         })
         .addCase(deletelocation.fulfilled,(state,action)=>{
            state.isdeletelocationSuccess=action.payload.isSuccess
            state.DeletelocationMessage=action.payload.message
         })
         .addCase(deletelocation.rejected,(state,action)=>{
            state.isdeletelocationSuccess=false
            state.isdeletelocationError=true
            state.DeletelocationMessage=action.payload.message
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
         
                  .addCase(createState.pending,(state)=>{
                     state.isCreateStateLoading = true
                  })
                  .addCase(createState.fulfilled,(state,action)=>{
                     state.isCreateStateLoading = false
                     state.isCreateStateSuccess = true
                     if(action.payload.isSuccess==false){
                         state.isCreateStateSuccess = false
                         state.isCreateStateError = action.payload.message
                     }
                     state.isCreateStateMessage = action.payload.message
                  })
                  .addCase(createState.rejected,(state,action)=>{
                     state.isCreateStateError = true
                     state.isCreateStateMessage = action.payload.message
                  })
         
                  .addCase(updateState.pending,(state)=>{
                     state.isUpdateStateLoading = false
                  })
                  .addCase(updateState.fulfilled,(state,action)=>{
                     state.isUpdateStateLoading = false
                     state.isUpdateStateSuccess = true
                     if(action.payload.isSuccess==false){
                         state.isUpdateStateSuccess = false
                         state.isUpdateStateError = action.payload.message
                     }
                     state.isUpdateStateMessage = action.payload.message
                  })
                  .addCase(updateState.rejected,(state,action)=>{
                     state.isUpdateStateLoading = false
                     state.isUpdateStateError = true
                     state.isUpdateStateMessage = action.payload.message
                  })
         
                  .addCase(deleleState.pending,(state)=>{
                     state.isDeleteStateLoading = true
                  })
                  .addCase(deleleState.fulfilled,(state,action)=>{
                     state.isDeleteStateLoading = false
                     state.isDeleteStateSuccess = true
                     if(action.payload.isSuccess == false){
                         state.isDeleteStateSuccess = false
                         state.isDeleleStateError = action.payload.message
                     }
                     state.isDeleteStateMessage=action.payload.message
                  })
                  .addCase(deleleState.rejected,(state,action)=>{
                     state.isDeleteStateSuccess = false
                     state.isDeleleStateError = true
                     state.isDeleteStateMessage=action.payload.message
                  })
         
                  .addCase(getStateByName.pending,(state)=>{
                     state.isGetStateByNameLoading = true
                  })
                  .addCase(getStateByName.fulfilled,(state,action)=>{
                     state.isGetStateByNameLoading=false
                     state.isGetStateByNameSuccess = true
                     state.AllStates= action.payload
                  })
                   .addCase(getStateByName.rejected,(state,action)=>{
                    state.isGetStateByNameSuccess = false
                    state.isGetStateByNameError = true
                    state.AllStates=[]
                  })
                  .addCase(updateCaste.pending,(state)=>{
                     state.isUpdateCasteLoading = true
                  })
                  .addCase(updateCaste.fulfilled,(state,action)=>{
                    state.isUpdateCasteLoading = false
                    state.isUpdateCasteSuccess = action.payload.isSuccess
                    state.UpdateCasteMessage = action.payload.message
                  })
                 .addCase(updateCaste.rejected,(state,action)=>{
                    state.isUpdateCasteLoading = false
                    state.isUpdateCasteSuccess = false
                    state.isUpdateCasteError = true
                    state.UpdateCasteMessage = action.payload.message
                 })
                 .addCase(updateCountry.pending,(state)=>{
                    state.isUpdateCountryLoading = true
                  })
                 .addCase(updateCountry.fulfilled,(state,action)=>{
                    state.isUpdateCountryLoading = false
                    state.isUpdateCountrySuccess = action.payload.isSuccess
                    state.isUpdateCountryMessage = action.payload.message                 
                 })
                  .addCase(updateCountry.rejected,(state,action)=>{
                    state.isUpdateCountryLoading = false
                    state.isUpdateCountrySuccess = false
                    state.isUpdateCountryError = true
                    state.isUpdateCountryMessage = action.payload.message                  
                })  
                   .addCase(deleteCountry.pending,(state)=>{
                     state.isDeleteCountryLoading = true
                 })
                    .addCase(deleteCountry.fulfilled,(state,action)=>{
                        state.isDeleteCountryLoading = false
                        state.isDeleteCountrySuccess = action.payload.isSuccess
                        state.isDeleteCountryMessage = action.payload.message                        
                 })
                    .addCase(deleteCountry.rejected,(state,action)=>{
                        state.isDeleteCountryLoading = false
                        state.isDeleteCountrySuccess = false
                        state.isDeleteCountryError = true
                        state.isDeleteCountryMessage = action.payload.message                       
                 })
                    .addCase(deleteCaste.pending,(state)=>{
                         state.isDeleteCasteLoading = true
                 })
                 .addCase(deleteCaste.fulfilled,(state,action)=>{
                    state.isDeleteCasteLoading = false
                    state.isDeleteCasteSuccess = true
                    state.DeleteCasteMessage = action.payload.message
                })                               
                .addCase(deleteCaste.rejected,(state,action)=>{
                    state.isDeleteCasteLoading = false
                    state.isDeleteCasteSuccess = false
                    state.isDeleteCasteError = true
                    state.DeleteCasteMessage =action.payload.message
                })
                
                .addCase(updatereligion.pending,(state)=>{
                                     state.isUpdateReligionLoding = true
                                  })
                                  .addCase(updatereligion.fulfilled,(state,action)=>{
                                     state.isUpdateReligionLoding = false
                                     state.isUpdateReligionSuccess = action.payload.isSuccess
                                     state.UpdateReligionMessage = action.payload.message
                                  })
                                  .addCase(updatereligion.rejected,(state,action)=>{
                                     state.isUpdateReligionLoding = false
                                     state.isUpdateReligionSuccess = false
                                     state.isUpdateReligionError = true
                                     state.UpdateReligionMessage = action.payload.message
                                  })
                         
                                  .addCase(deletereligion.pending,(state)=>{
                                     state.isDeleteReligionLoding = true
                                  })
                                  .addCase(deletereligion.fulfilled,(state,action)=>{
                                     state.isDeleteReligionLoding = false
                                     state.isDeleteReligionSuccess = action.payload.isSuccess
                                     state.DeleteReligionMessage = action.payload.message
                                  })
                                  .addCase(deletereligion.rejected,(state,action)=>{
                                     state.isDeleteReligionLoding = false
                                     state.isDeleteReligionSuccess = false
                                     state.isDeleteReligionError = true
                                     state.DeleteReligionMessage = action.payload.message
                                  })
        .addCase(getByReligionName.pending,(state)=>{
            state.isGetByReligionNameLoading = true
        })
        .addCase(getByReligionName.fulfilled,(state,action)=>{
             state.isGetByReligionNameLoading = false
             state.isGetByReligionNameSuccess = true
             state.religionsList = action.payload
        })
        .addCase(getByReligionName.rejected,(state,action)=>{
             state.isGetByReligionNameSuccess = false
             state.isGetByReligionNameError = true
             state.religionsList = []
        })
    }    
   
})

export const {resetCreateCountry,resetCountryByID,resetCreateQualification,resetQualificationById,
    resetGetQualification,resetGetallCountry,resetMaster,resetcreatejob,resetgetjobById,resetgetalljob,
    resetcreateotherlocation,resetcreateDistrict,resetCreateCaste,resetcreatereligion,resetgetallreligion,
    resetgetallCaste,resetUpdateQualification,resetdeleteQualification,resetgetAllMotherTongue,resetUpdateDistrict,resetDeleteDistrict,
    resetcreateMotherTongue,resetupdateMotherTongue,resetdeleteMotherTongue,resetGetByCasteName,resetupdatecaste,resetGetDistrictByName,
    resetDeleteCaste,resetupdatejob,resetdeletejob,resetdeletelocation,resetDeleteCountry,resetUpdateCountry,
    resetCreateState,resetGetAllStates,resetDeleteState,resetUpdateState,resetupdatereligion,resetdeletereligion,
    resetGetByReligionName,resetupdateOtherlocation,resetgetalllocation
} = masterSlice.actions

export default masterSlice.reducer