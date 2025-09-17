import { useEffect,useRef,useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getAllReligions, getAllCastes, getAllQualifications, getAllJobs } from "../../Features/Slices/profSlice"
import { useSelector,useDispatch } from "react-redux";
// import { getAllProfilesByBrokers, resetGetProfiles } from "../../Features/Slices/PublicUser/publicUserSlice";
import { searchProfile } from "../../Features/Slices/profSlice";
import { searchProfileBrokToBrok, resetsearchProfileBrokToBrok, setFilter } from "../../Features/Slices/brokSlice";
import maleavatar from '../../img/Male_avatar.svg'
import femaleavatar from '../../img/Female_avatar.svg'
import { useLocation } from "react-router-dom";


export function BrokerProfileList(){

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [searchParams] = useSearchParams()
    // const profileID = searchParams.get('_id')
    const pageStartIndex= searchParams.get('pageStartIndex')
    const pageIndex = searchParams.get('pageIndex')
    const [startPage, setStartPage] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const brokerID = searchParams.get('id');
    const searchFilter = searchParams.get('search')
    // alert(brokerID)
    const [show, setShow] = useState(false);
    const onHandleShow = useRef(true);
    const onHandleClose = useRef(null);
    const Location =useLocation()
    const [data, setData] = useState({})
    const ageList = [21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50];
    let gender = "";

     if (searchFilter) {
    if (searchFilter.split("-")[1] == "F")
      gender = "Female"
    if (searchFilter.split("-")[1] == "M")
      gender = "Male"
  }

    // const {religion, caste, ageFrom, ageTo, qualification } = data

    // const { profiles, isGetProfileLoading, isGetProfileSuccess, isGetProfileError,
    //     imageUrlList } = useSelector((state) => state.public)

    const { profiles, profileTotal, profileTotals, isAllProfilesByBrokerIdError,isAllProfilesByBrokerIdLoading,isAllProfilesByBrokerIdSuccess, profileImageList, filter} = useSelector((state) =>state.brok)

    const [searchData, setFormData] = useState({
        pagesize: '',
        skip: '',
        qualification: filter?.qualification || '',
        religion: filter?.religion || '',
        caste: filter?.caste || '',
        name: filter?.name || '',
        sex: filter?.sex || gender,
        job: filter?.job || '',
        profileID: filter?.profileID || '',
        ageFrom: filter?.ageFrom || '',
        ageTo: filter?.ageTo || ''
    })

    const { religion, caste, qualification , job, name , sex, profileID , ageFrom, ageTo } = searchData

    const onSearchchange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const profile = useSelector((state) => state.prof)

    useEffect(() => {
        if (!profile.isReligionLoading && !profile.isReligionSuccess) {
            dispatch(getAllReligions())
        }
    
        if (!profile.iscasteLoading && !profile.iscasteSuccess) {
            dispatch(getAllCastes())
        }
    
        if(!profile.isQualificationLoading && !profile.isQualificationSuccess){
            dispatch(getAllQualifications())
        }
        if (!profile.isJobListLoading && !profile.isJobListSuccess) {
            dispatch(getAllJobs())
        }
        // if(!isAllProfilesByBrokerIdLoading && !isAllProfilesByBrokerIdSuccess){
        //     dispatch(searchProfileBrokToBrok({brokerId: brokerID}));
        //     dispatch(resetsearchProfileBrokToBrok())
        // }
     
        const searchData = { brokerId: brokerID, "skip": 1, "pagesize": 8, religion, caste, qualification, job,
                             name, sex, profileID, ageFrom, ageTo}
    
        if(pageIndex && pageStartIndex){
            setStartPage(parseInt(pageStartIndex))
            setCurrentPage(parseInt(pageIndex))
            onPageChange(parseInt(pageIndex))
        }
        else{
            setCurrentPage(1)
            onPageChange(parseInt(1))
            dispatch(searchProfileBrokToBrok(searchData));
            dispatch(resetsearchProfileBrokToBrok())
        }
        
        // optional navigation state, meaning: "I'm coming from the 'Broker' page."
        
    }, [brokerID, dispatch])

    const [isViewedImageProfile, setIsChecked] = useState(false);

    const handleCheckboxChange = () => {
        setIsChecked(!isViewedImageProfile);
    };

    const onSearchClick = () => {

    const newFilters = {brokerId: brokerID, religion,caste,qualification,job,name,sex,profileID,ageFrom,ageTo,"skip": 1, "pagesize": 8}
    
    dispatch(setFilter(newFilters))
        setStartPage(1)
        setCurrentPage(1)

    // if (Location?.state?.from === 'broker') {
    //     dispatch(setFilter())
    // }

    const searchData = {brokerId: brokerID,religion,caste,qualification,job,name,sex,profileID,ageFrom,ageTo,"skip": 1, "pagesize": 8,}

    dispatch(searchProfileBrokToBrok(searchData))
    .then((response) => {
           setStartPage(1)
           setCurrentPage(1)
        })
        
        if (onHandleShow.current) {
            onHandleClose.current.hide();
        }
        }

    const onRefresh = () => {

    const searchData = {brokerId: brokerID,"skip":1, "pagesize": 8}
    dispatch(searchProfileBrokToBrok(searchData))
    // dispatch(resetsearchProfileBrokToBrok())
    onResetClick()
    setCurrentPage(1);
    setStartPage(1)
    
    
    }

    const onResetClick = () => {

        const emptyFilters = ({
            qualification: '',
            religion: '',
            caste:'',
            job:'',
            sex:'',
            name:'',
            profileID:'',
            ageFrom:'',
            ageTo:''
        })

        setFormData(emptyFilters);
        dispatch(setFilter(emptyFilters))
    }

    // const onProfileClick = (profiles) => {
    //     let hasImage = profileImageList.find(item => item.profileID === profiles.profileID)?.imageBase64;
    //     let _image;
    //     if (hasImage) _image = "1"
    //     else _image = "0"
    //     navigate('/PUBrokProfileDetails?id=' + profiles._id + "&brokID=" + brokerID + '&name=PUProfileList&image=' + _image + "&pageIndex=" + currentPage + "&pageStartIndex="+startPage, { replace: true })
    // }

    const onProfileClick = ( profileID ) =>{
        navigate('/BrokViewProfDetails?id='+ profileID +"&brId=" + brokerID + "&pageIndex="+currentPage +"&pageStartIndex="+startPage)
    }

    const handleToggle = () => {
    if (!onHandleClose.current) {
        onHandleClose.current = new window.bootstrap.Offcanvas(onHandleShow.current);
    }
    if (show) {
        onHandleClose.current.hide();
    } else {
        onHandleClose.current.show();
    }
    };

    const onPageChange = (page) => {
        setCurrentPage(page);
    
    const searchData = {brokerId: brokerID, religion, caste,qualification,job,ageFrom,ageTo,sex,name,profileID,
            "skip": page, "pagesize": 8}
    dispatch(searchProfileBrokToBrok(searchData))
    };

    const handleNext = () => {
        if (profileTotal) {
            if (currentPage < profileTotal) {
                onPageChange(currentPage + 1);
                if (currentPage >= startPage + 4) {
                    setStartPage(startPage + 1);
                }
            }
        }
    };

    const handlePrevious = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
            if (currentPage <= startPage) {
                setStartPage(startPage - 1);
            }
        }
    };


    const backuButtonUrl = () => {
        navigate('/BrokerToBrokerList')
        dispatch(resetsearchProfileBrokToBrok())
    }
    
    const getProfileImage = (profiles) => {
        const imageEntry = profileImageList?.find(item => item.profileID === profiles.profileID);
        if (imageEntry?.imageBase64) return imageEntry.imageBase64;
        return profiles.sex === 'Male' ? maleavatar : femaleavatar;
    };

       

    return(<>

    <div className="dropdown-item d-flex align-items-center md-5" >
        <svg onClick={backuButtonUrl} style={{ cursor: 'pointer' }} xmlns="http://www.w3.org/2000/svg" width="28" height="30" fill="#1aa179" className="bi bi-arrow-left-circle ms-2" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z" />
        </svg>
            <p className="h5 mb-0 ms-2 md-5" onClick={backuButtonUrl} >Go Back</p>
    </div>
    
    <nav className="navbar navbar-light">
        <div className="container-fluid d-flex justify-content-between align-items-center flex-wrap">
            <div className="d-flex align-items-center">
                <h3 className="mb-0 mt-3">Profiles</h3>
            </div>

            <div className="d-flex align-items-center gap-2 mt-2 mt-md-0">
                <button className="btn btn-outline-success" onClick={onRefresh}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="22" fill="currentColor" className="bi bi-arrow-clockwise" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z" />
                        <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466" />
                    </svg>
                </button>

                <button className="btn btn-success me-5 col-7 pd-5" style={{ marginLeft: 10 }} type="button" onClick={handleToggle}>Filter</button>
            </div>
        </div>
    </nav>

    

    <div className="row">

        <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel" ref={onHandleShow}>
            <div className="offcanvas-header">
                <h5 className="offcanvas-title" id="offcanvasRightLabel">Find</h5>
                <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close" ></button>
            </div>
            <hr />

            <div className="offcanvas-body">
                <div className="col-md-12">
                <label className="font-weight-bold form-label" htmlFor="sex">I'm looking for a</label>
                <select value={searchData.sex} className="form-control form-select-sm" name="sex" id="sex" onChange={onSearchchange} aria-label=".form-select-sm example">
                  <option value="">Select</option>
                  <option value={"Male"}>Male</option>
                  <option value={"Female"}>Female</option>
                </select>
              </div>

                <div className="col-md-12 mt-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input type="text" value={searchData.name} onChange={onSearchchange} className="form-control form-select-sm" name="name" id="name" placeholder="Enter name"/>
              </div>

                <div className="col-md-12 mt-3">
                <label htmlFor="caste" className="form-label">Profile ID</label>
                <input type="text" value={searchData.profileID} onChange={onSearchchange} className="form-control form-select-sm" name="profileID" id="profileID" placeholder="Enter profileID"></input>
              </div>

                <div className="form-group col-md-12 mt-3">
                <label htmlFor="ageFrom" className="form-label">Age -From</label>
                <select value={searchData.ageFrom} className="form-control form-select-sm" name="ageFrom" id="ageFrom" onChange={onSearchchange} aria-label=".form-select-sm example">
                  <option value="">Select</option>
                  {
                    ageList.map((item, index) => (
                      <option key={index} value={item}>{item}</option>
                    ))}
                </select>
              </div>

                <div className="col-md-12 mt-3">
                <label htmlFor="ageTo" className="form-label">Age -To</label>
                <select value={searchData.ageTo} className="form-control form-select-sm" name="ageTo" id="ageTo" onChange={onSearchchange} aria-label=".form-select-sm example">
                  <option value="">Select</option>
                  {
                    ageList.map((item, index) => (
                      <option key={index} value={item}>{item}</option>
                    ))}
                </select>

              </div> 


                <div className="col-md-12 mt-3">
                    <label htmlFor="caste" className="form-label">Qualification</label>
                    <select value={searchData.qualification} className="form-control form-select-sm" name="qualification" id="qualification" onChange={onSearchchange} aria-label=".form-select-sm example">
                        <option value="">Select</option>

                            {((profile.qualifications != null && profile.qualifications.length > 0) &&
                            profile.qualifications.map((qualification) => (
                        <option key={qualification._id} value={qualification.qualification}>{qualification.qualification}</option>
                                    ))
                            )}
                    </select>
                </div>

                <div className="col-md-12 mt-3">
                    <label htmlFor="religion" className="form-label">Religion</label>
                    <select value={searchData.religion} className="form-control form-select-sm" name="religion" id="religion" onChange={onSearchchange} aria-label=".form-select-sm example">
                        <option value="">Select</option>

                            {((profile.religions != null && profile.religions.length > 0) &&
                                profile.religions.map((religion) => (
                        <option key={religion._id} value={religion.religion}>{religion.religion}</option>
                                    ))
                            )}

                    </select>
                </div>

                <div className="col-md-12 mt-3">
                    <label htmlFor="caste" className="form-label">Caste</label>
                    <select value={searchData.caste} className="form-control form-select-sm" name="caste" id="caste" onChange={onSearchchange} aria-label=".form-select-sm example">
                        <option value="">Select</option>

                            {((profile.castes != null && profile.castes.length > 0) &&
                                profile.castes.map((caste) => (
                                    <option key={caste._id} value={caste.caste}>{caste.caste}</option>
                                ))
                            )}
                    </select>
                </div>

                 <div className="col-md-12 mt-3">
                <label htmlFor="caste" className="form-label">Job Title </label>
                <select value={searchData.job} className="form-control form-select-sm" name="job" id="job" onChange={onSearchchange} aria-label=".form-select-sm example">
                  <option value="">Select</option>
                  {/* <option value={"Nadar"}>Nadar</option>
              <option value={"Devar"}>Devar</option> */}
                  {((profile.jobs != null && profile.jobs.length > 0) &&
                    profile.jobs.map((job) => (
                      <option key={job._id} value={job.job}>{job.job}</option>
                    ))
                  )}
                </select>
              </div>
                <div className="col-md-12 form-check mt-3" style={{display:"none"}}>
                    <input type="checkbox" className="form-check-input border border-info" id="singleCheck"
                        checked={isViewedImageProfile}
                        onChange={(e) => setIsChecked(e.target.checked)}
                    />
                    <label className="form-check-label" htmlFor="singleCheck">
                        Today Viewed Image Profiles
                    </label>
                </div>

                <div className="col-md-12 mt-3">
                    <div className="row">
                        <div className="col-md-6">  <button className="secondarybutton" onClick={() => onSearchClick()} type="submit">Apply</button></div>
                        <div className="col-md-4"> <button className="secondarybutton" onClick={() => onResetClick()} type="submit">Reset</button></div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    Page {currentPage} of {profileTotal}

    <div>
    <div style={{ display: 'flex', justifyContent: 'left', alignItems: 'left', marginTop: '20px' }}>
        <nav aria-label="Page navigation example">
            <ul className="pagination">
                <li className="page-item" onClick={handlePrevious} disabled={currentPage === 1}>
                    <a className="page-link" style={{ backgroundColor: '#ffffff', color: '#1aa179' }} href="#" aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                        </a>
                </li>

                {Array.from({ length: Math.min(profileTotal, 5) }, (_, index) => {
                    const pageNumber = startPage + index;
    return (
        <li key={pageNumber} className="page-item">
            <button className="page-link" onClick={() => onPageChange(pageNumber)}
                style={{backgroundColor: currentPage === pageNumber ? '#1aa179' : '#ffffff',
                        color: currentPage === pageNumber ? 'white' : '#1aa179',
                        }}>
                {pageNumber}
            </button>
        </li>
            );
                })}

        <li className="page-item" onClick={handleNext} disabled={currentPage === profileTotal}>
            <a className="page-link" style={{ backgroundColor: '#ffffff', color: '#1aa179' }} href="#" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
            </a>
        </li>
        </ul>
        </nav>
    </div>
    </div>

      <div className="card-container">
          {isAllProfilesByBrokerIdLoading && (
            <>
              <div className="card-skeleton">

                <div className="skeleton skeleton-image"></div>
                <div className="skeleton skeleton-title"></div>
                <div className="skeleton skeleton-description"></div>
                <div className="skeleton skeleton-description"></div>
              </div>

              <div className="card-skeleton">
                <div className="skeleton skeleton-image"></div>
                <div className="skeleton skeleton-title"></div>
                <div className="skeleton skeleton-description"></div>
                <div className="skeleton skeleton-description"></div>
              </div>

              <div className="card-skeleton">
                <div className="skeleton skeleton-image"></div>
                <div className="skeleton skeleton-title"></div>
                <div className="skeleton skeleton-description"></div>
                <div className="skeleton skeleton-description"></div>
              </div>

              <div className="card-skeleton">
                <div className="skeleton skeleton-image"></div>
                <div className="skeleton skeleton-title"></div>
                <div className="skeleton skeleton-description"></div>
                <div className="skeleton skeleton-description"></div>
              </div>


              <div className="card-skeleton">
                <div className="skeleton skeleton-image"></div>
                <div className="skeleton skeleton-title"></div>
                <div className="skeleton skeleton-description"></div>
                <div className="skeleton skeleton-description"></div>
              </div>

              <div className="card-skeleton">
                <div className="skeleton skeleton-image"></div>
                <div className="skeleton skeleton-title"></div>
                <div className="skeleton skeleton-description"></div>
                <div className="skeleton skeleton-description"></div>
              </div>

              <div className="card-skeleton">
                <div className="skeleton skeleton-image"></div>
                <div className="skeleton skeleton-title"></div>
                <div className="skeleton skeleton-description"></div>
                <div className="skeleton skeleton-description"></div>
              </div>

              <div className="card-skeleton">
                <div className="skeleton skeleton-image"></div>
                <div className="skeleton skeleton-title"></div>
                <div className="skeleton skeleton-description"></div>
                <div className="skeleton skeleton-description"></div>
              </div>
            </>
          )
          } </div>

    {isAllProfilesByBrokerIdError ? <div></div> : null}

    {!isAllProfilesByBrokerIdLoading && isAllProfilesByBrokerIdSuccess && (
        <>

    <div className="container py-0" >
    {
        <div className="container py-0" >
            <div><p>{profileTotals} records found...</p></div>
            <div className="row row-cols-1 row-cols-md-4 py-3 ">
                {profiles.map((profiles) => (

                <div key={profiles._id} className="col" >

                    <div className="card" style={{border: '2px solid teal', borderRadius: '5px', padding: '10px' }}>
                        <div onClick={()=>onProfileClick(profiles._id)} className="upper-div" style={{ backgroundColor: '#ffffff' }}   >                                              
                            <img className="centered-image" src={getProfileImage(profiles)} alt="Profile" />
                        </div>

                        <div className="card-body">
                            <a href="#" className="card-text profile-link"
                                style={{backgroundColor: "#ffffff", color: '#1aa179',fontWeight: "bold",fontSize: "20px",
                                        textDecoration: 'none'}}
                            >

                            <div onClick={()=>onProfileClick(profiles._id)} className="profile-wrapper">
                                <span className="profile-name">{profiles.name}</span>
                                {/* <span className="profile-age ms-2">
                                                                {/* {calculateAge(profiles.DOB)} yr */}
                                                            {/* </span> */}
                            </div>
                            </a>

                            <p className="card-text field" title={`${profiles.job}, ${profiles.district}`}>
                            <strong>{profiles.job}, {profiles.district}</strong></p>
                        </div>
                    </div>
                </div>

                ))}
            </div>
        </div>
    }
</div>

</>)}

<div>
                        {/* Commented by Nalini to stop the pagination from loading everytime  */}

                        {/* {(profile && !profile.isAllProfilesByBrokerIdLoading && profile.profiles && profile.profileTotal) ? (  */}
    <div style={{ display: 'flex', justifyContent: 'left', alignItems: 'left', marginTop: '20px' }}>
        <nav aria-label="Page navigation example">
            <ul className="pagination">
                <li className="page-item" onClick={handlePrevious} disabled={currentPage === 1}>
                    <a className="page-link" style={{ backgroundColor: '#ffffff', color: '#1aa179' }} href="#" aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                    </a>
                </li>

                {Array.from({ length: Math.min(profileTotal, 5) }, (_, index) => {
                const pageNumber = startPage + index;
                return (
                    <li key={pageNumber} className="page-item">
                        <button className="page-link"onClick={() => onPageChange(pageNumber)}
                            style={{backgroundColor: currentPage === pageNumber ? '#1aa179' : '#ffffff',
                                color: currentPage === pageNumber ? 'white' : '#1aa179',}}>
                            {pageNumber}
                        </button>
                    </li>
                    );
                })}

                    <li className="page-item" onClick={handleNext} disabled={currentPage === profileTotal}>
                        <a className="page-link" style={{ backgroundColor: '#ffffff', color: '#1aa179' }} href="#" aria-label="Next">
                            <span aria-hidden="true">&raquo;</span>
                        </a>
                    </li>
            </ul>
        </nav>
    </div>
</div>
    </>)
}