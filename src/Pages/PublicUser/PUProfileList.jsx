import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllProfilesByBrokers, resetGetProfiles ,setFilters} from "../../Features/Slices/PublicUser/publicUserSlice";
import { useSearchParams, useLocation } from "react-router-dom";
import maleavatar from '../../img/Male_avatar.svg'
import femaleavatar from '../../img/Female_avatar.svg'
import { useNavigate } from "react-router-dom";
import { getAllReligions, getAllCastes, getAllQualifications } from "../../Features/Slices/profSlice"



export function PUProfileList() {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const Location = useLocation()
    const [searchParams] = useSearchParams();
    const brokerID = searchParams.get('id')
    const pageStartIndex= searchParams.get('pageStartIndex')
    const [currentPage, setCurrentPage] = useState(1);
    const [startPage, setStartPage] = useState(1);
    const pageIndex = searchParams.get('pageIndex')
   
    const backScreenName = searchParams.get('name')
    // const ageList = [21, 22, 23, 24, 25, 26, 27, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50];


 const { profiles, profileTotal, totalRecord, isGetProfileLoading, isGetProfileSuccess, isGetProfileError, imageUrlList,
         filters
      } = useSelector((state) => state.public)

    const [data, setData] = useState({
        pagesize: '',
        skip: '',
        brokerId: brokerID,
        religion: filters?.religion ||'',
        caste: filters?.caste || '',
        qualification:filters?.qualification ||''
    })

    const {sex, pagesize, skip, brokerId, religion, caste, ageFrom, ageTo, qualification } = data


    const onProfileClick = (profiles) => {
        let hasImage = imageUrlList.find(item => item.profileID === profiles.profileID)?.imageBase64;
        let _image;
        if (hasImage) _image = "1"
        else _image = "0"
        navigate('/PUBrokProfileDetails?id=' + profiles._id + "&brokID=" + brokerID + '&name=PUProfileList&image=' + _image + "&pageIndex=" + currentPage + "&pageStartIndex="+startPage, { replace: true })
    }

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

    const onPageChange = (page) => {
        setCurrentPage(page);


        const data = {
            brokerId: brokerID,
            "skip": page, "pagesize": 8, religion, caste, ageFrom, ageTo,qualification
        }
        dispatch(getAllProfilesByBrokers(data))




    };

    const calculateAge = (dobString) => {
        const today = new Date();
        const dob = new Date(dobString);
        let age = today.getFullYear() - dob.getFullYear();
        const m = today.getMonth() - dob.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
            age--;
        }
        return age;
    };

    const backuButtonUrl = () => {
        navigate('/PublicUserBrokerList',{ replace: true })
        dispatch(resetGetProfiles())
    }

    const onRefresh = () => {
        const searchData = {
            brokerId: brokerID,
            "skip":1, "pagesize": 8
        }
        dispatch(getAllProfilesByBrokers(searchData))
        onResetClick()
         setCurrentPage(1);
        setStartPage(1)
    }

    const [show, setShow] = useState(false);
    const onHandleShow = useRef(true);
    const onHandleClose = useRef(null);

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

    const onResetClick = () => {
        const emptyFilters=({

            religion: '',
            caste: '',
            ageFrom: '',
            ageTo: '',
            brokerId: brokerID,
            qualification:''
        })

         setData(emptyFilters);
         dispatch(setFilters(emptyFilters))

        // const searchData = {
        //     religion, caste,qualification
        // }
    }

    const onSearchchange = (e) => {
        setData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const profile =
        useSelector(
            (state) => state.prof
        )

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
        const data = {
            brokerId: brokerID,"skip": 1,"pagesize": 8,religion,caste, qualification
        }
               if (pageIndex && pageStartIndex) {
                 setStartPage(parseInt(pageStartIndex))
                 setCurrentPage(parseInt(pageIndex))
                 onPageChange(parseInt(pageIndex))
                 // dispatch(searchProfile(searchData))
               }
               
               else {
                 setCurrentPage(1)
                 onPageChange(parseInt(1))
                 dispatch(getAllProfilesByBrokers(data))
               }
        // const emptyData = {brokerId: brokerID, religion: '', caste: '', qualification:''}
        // if(Location?.state?.from == 'PublicUser'){
        //     dispatch(setFilters(emptyData))
        // }
           

        // onRefresh();

    }, [dispatch])

    const [isViewedImageProfile, setIsChecked] = useState(false);

    const handleCheckboxChange = () => {
        setIsChecked(!isViewedImageProfile);
    };

    const onSearchClick = () => {

          const newFilters = {
              brokerId: brokerID, religion,caste, qualification
          };
          dispatch(setFilters(newFilters));

          if(Location?.state?.from == 'BrokerUser'){
            dispatch(setFilters())
        }

          setCurrentPage(1);
          setStartPage(1);

            const data = {
            brokerId: brokerID,"skip": 1,"pagesize": 8,religion,caste, qualification
        }

        dispatch(getAllProfilesByBrokers(data))
        .then((response) => {
           setStartPage(1)
           setCurrentPage(1)
        })
    
        if (onHandleShow.current) {
            onHandleClose.current.hide();
        }
    }

    const getProfileImage = (profiles) => {
        const imageEntry = imageUrlList?.find(item => item.profileID === profiles.profileID);
        if (imageEntry?.imageBase64) return imageEntry.imageBase64;
        return profiles.sex === 'Male' ? maleavatar : femaleavatar;
    };

    return (
        <>
            <div>

                <nav className="navbar navbar-light">
                    <div className="container-fluid d-flex justify-content-between align-items-center flex-wrap">
                        <div className="d-flex align-items-center">
                            <h3 className="mb-0">Profiles</h3>
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

                <div className="dropdown-item d-flex align-items-center md-5" >
                    <svg onClick={backuButtonUrl} style={{ cursor: 'pointer' }} xmlns="http://www.w3.org/2000/svg" width="28" height="30" fill="#1aa179" className="bi bi-arrow-left-circle ms-2" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z" />
                    </svg>
                    <p className="h6 mb-0 ms-2 md-5" onClick={backuButtonUrl} style={{ cursor: 'pointer' }}>Go Back</p>
                </div> <br />


                <div className="row">


                    <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel" ref={onHandleShow}>
                        <div className="offcanvas-header">
                            <h5 className="offcanvas-title" id="offcanvasRightLabel">Find</h5>

                            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close" ></button>
                        </div>
                        <hr />
                        <div className="offcanvas-body">

                            {/* <div className="form-group col-md-12 ">
                                <label htmlFor="ageFrom" className="form-label">Age -From</label>
                                <select value={data.ageFrom} className="form-control form-select-sm" name="ageFrom" id="ageFrom" onChange={onSearchchange} aria-label=".form-select-sm example">
                                    <option value="">Select</option>
                                    {
                                        ageList.map((item, index) => (
                                            <option key={index} value={item}>{item}</option>
                                        ))}
                                </select>
                            </div>
                            <div className="col-md-12 mt-3">
                                <label htmlFor="ageTo" className="form-label">Age -To</label>
                                <select value={data.ageTo} className="form-control form-select-sm" name="ageTo" id="ageTo" onChange={onSearchchange} aria-label=".form-select-sm example">
                                    <option value="">Select</option>
                                    {
                                        ageList.map((item, index) => (
                                            <option key={index} value={item}>{item}</option>
                                        ))}
                                </select>

                            </div> */}

                             <div className="col-md-12 mt-3">
                                <label htmlFor="caste" className="form-label">Qualification</label>
                                <select value={data.qualification} className="form-control form-select-sm" name="qualification" id="qualification" onChange={onSearchchange} aria-label=".form-select-sm example">
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
                                <select value={data.religion} className="form-control form-select-sm" name="religion" id="religion" onChange={onSearchchange} aria-label=".form-select-sm example">
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
                                <select value={data.caste} className="form-control form-select-sm" name="caste" id="caste" onChange={onSearchchange} aria-label=".form-select-sm example">
                                    <option value="">Select</option>

                                    {((profile.castes != null && profile.castes.length > 0) &&
                                        profile.castes.map((caste) => (
                                            <option key={caste._id} value={caste.caste}>{caste.caste}</option>
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

                <div>

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
                                                <button
                                                    className="page-link"
                                                    onClick={() => onPageChange(pageNumber)}
                                                    style={{
                                                        backgroundColor: currentPage === pageNumber ? '#1aa179' : '#ffffff',
                                                        color: currentPage === pageNumber ? 'white' : '#1aa179',
                                                    }}
                                                >
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
                        {isGetProfileLoading && !isGetProfileSuccess && (
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

                    {isGetProfileError ? <div>Error while loading</div> : null}
                    {/* {(!isGetProfileLoading && isGetProfileSuccess) ? ( */}
                    <div className="container py-0" >
                        {
                            <div className="container py-0" >
                                <div><p>{totalRecord} records found...</p></div>
                                <div className="row row-cols-1 row-cols-md-4 py-3 ">
                                    {profiles.map((profiles) => (


                                        <div key={profiles._id} className="col" >

                                            <div className="card" style={{
                                                border: '2px solid teal',  // Blue border with 2px width
                                                borderRadius: '5px',       // Rounded corners
                                                padding: '10px'            // Inner spacing
                                            }}>
                                                <div className="upper-div" style={{ backgroundColor: '#ffffff' }}   >                                               
                                                    <img className="centered-image" src={getProfileImage(profiles)} alt="Profile" />
                                                </div>
                                                <div className="card-body">
                                                    <a
                                                        href="#"
                                                        className="card-text profile-link"
                                                        style={{
                                                            backgroundColor: "#ffffff",
                                                            color: '#1aa179',
                                                            fontWeight: "bold",
                                                            fontSize: "20px",
                                                            textDecoration: 'none',  // Remove underline
                                                        }}
                                                    >
                                                        <div className="profile-wrapper">
                                                            <span className="profile-name" onClick={() => onProfileClick(profiles)}>
                                                                {profiles.name}
                                                            </span>
                                                            <span className="profile-age ms-2">
                                                                {/* {calculateAge(profiles.DOB)} yr */}
                                                            </span>
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
                    {/* ) : null
                } */}



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
                                                <button
                                                    className="page-link"
                                                    onClick={() => onPageChange(pageNumber)}
                                                    style={{
                                                        backgroundColor: currentPage === pageNumber ? '#1aa179' : '#ffffff',
                                                        color: currentPage === pageNumber ? 'white' : '#1aa179',
                                                    }}
                                                >
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

                    Page {currentPage} of {profileTotal}
                </div>
            </div>
        </>
    )
}