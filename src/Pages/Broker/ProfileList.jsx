import { useEffect, useState, useRef } from "react";
import "../../scss/broker.scss"
import { getAllProfilesByBrokerId, getAllReligions, searchProfile, resetProfileList, getAllCastes, getAllJobs, setFilters
 } from "../../Features/Slices/profSlice"
import sessionData from "../../sessionData";
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from "react-toastify"
import { Link } from "react-router-dom";
import matimage1 from '../../img/sampleBroker1.jpg'
import maleavatar from '../../img/Male_avatar.svg'
import femaleavatar from '../../img/Female_avatar.svg'
import { useLocation, useSearchParams } from 'react-router-dom'
import backaero from '../../img/arrow-left-circle-fill.svg'
import { NumericSpinner } from "../Common/NumericSpinner"
import "../../scss/profileList.scss"
import "../../scss/common.scss"



export function ProfileList() {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [searchParams] = useSearchParams();
  const search = useLocation().search
  const pageIndex = searchParams.get('pageIndex')
  const pageStartIndex = searchParams.get('pageStartIndex')
  const brokerId = searchParams.get('id')
  const searchFilter = searchParams.get('search')
  const ageList = [21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50];
  const [data, setData] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  let gender = "";
  let dashboardFilter = "";

  // if(pageIndex && pageIndex !=undefined)
  //   setCurrentPage(pageIndex)

  if (searchFilter) {
    if (searchFilter.split("-")[1] == "F")
      gender = "Female"
    if (searchFilter.split("-")[1] == "M")
      gender = "Male"
    dashboardFilter = searchFilter.split("-")[0]
  }

 const profile =
    useSelector(
      (state) => state.prof
    )
 

  const [searchData, setFormData] = useState({

  name: profile.filters?.name || '',
  sex: profile.filters?.sex || gender,
  religion: profile.filters?.religion || '',
  caste: profile.filters?.caste || '',
  ageFrom: profile.filters?.ageFrom || '',
  ageTo: profile.filters?.ageTo || '',
  searchBrokerId: profile.filters?.searchBrokerId || brokerId,
  dashboardFilter: profile.filters?.dashboardFilter || dashboardFilter,
  job: profile.filters?.job || '',
  profileID: profile.filters?.profileID || ''
  })

  const { name, sex, religion, caste, ageFrom, ageTo, searchBrokerId, job, profileID } = searchData

  const onSearchchange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  useEffect(() => {

    if (!profile.isReligionLoading && !profile.isReligionSuccess) {
      dispatch(getAllReligions())
    }

    if (!profile.iscasteLoading && !profile.iscasteSuccess) {
      dispatch(getAllCastes())
    }

    if (!profile.isJobListLoading && !profile.isJobListSuccess) {
      dispatch(getAllJobs())
    }
    const searchData = {
      name, sex, religion, caste, ageFrom, ageTo, searchBrokerId, dashboardFilter, job, profileID,
      "skip": currentPage, "pagesize": 8
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
      dispatch(searchProfile(searchData))
    }

    
  }, [])


  const onProfileClick = (id) => {
    //e.preventDefault();
    navigate('/BrokerProfile?id=' + id + "&brId=" + brokerId + "&name=profileList"+"&pageIndex=" + currentPage + "&pageStartIndex="+ startPage, { replace: true });
  }

  const onProfileEditClick = (id) => {
    //e.preventDefault();
    navigate('/EditProfile?id=' + id + "&brId=" + brokerId, { replace: true });
  }

  const onAddProfileClick = () => {
    navigate('/RegisterProfile', { replace: true });
  }
  const onSearchClick = () => {
       const newFilters = {
          name, sex, religion, caste, ageFrom, ageTo, searchBrokerId, dashboardFilter, job, profileID,
      };
        dispatch(setFilters(newFilters));

    setCurrentPage(1);
    setStartPage(1);

    const searchData = {
      name, sex, religion, caste, ageFrom, ageTo, searchBrokerId, dashboardFilter, job, profileID,
      "skip": 1, "pagesize": 8
    }
    dispatch(searchProfile(searchData))
    
    .then((response) => {
           setStartPage(1)
           setCurrentPage(1)
        })
        // dispatch(resetProfileList())
        
    if (onHandleShow.current) {
      onHandleClose.current.hide();
    }
  }

  const onResetClick = () => {
    resetFilter();
  }

  function resetFilter() {
    const emptyFilters =({
      name: '',
      sex: '',
      religion: '',
      caste: '',
      ageFrom: '',
      ageTo: '',
      searchBrokerId: brokerId,
      job: '',
      profileID: ''
    })

    setFormData(emptyFilters);
    dispatch(setFilters(emptyFilters))
  }

  const [startPage, setStartPage] = useState(1);
  // let totalPages = 1;

const profileName = (e)=>{
  if(e.target.value !=undefined && e.target.value !=null && e.target.value){
     dispatch(searchProfile(e.target.value))
  }
  // else
  //  if(e.target.value.length == 0){
  //   dispatch(getAllDistricts())
  // }
}

  const handleNext = () => {
    if (profile.profileTotal) {
      if (currentPage < profile.profileTotal) {
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
    setCurrentPage(page)
    debugger
    const searchData = {  
      name, sex, religion, caste, ageFrom, ageTo, searchBrokerId, dashboardFilter, job, profileID,
      "skip": page, "pagesize": 8
    }
    dispatch(searchProfile(searchData))

    // dispatch(setPagination({ currentPage: page, startPage: startPage }));  
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

  const [isViewedImageProfile, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isViewedImageProfile);
  };

  const onRefresh = () => {
    const searchData = {
      searchBrokerId: brokerId,
      "skip": 1, "pagesize": 8
    }
    dispatch(resetProfileList())
    dispatch(searchProfile(searchData))
    resetFilter();
    setCurrentPage(1);
    setStartPage(1)
    
  }

  const getProfileImage = (profiledoc) => {
  const imageEntry = profile.profileImageList?.find(item => item.profileID === profiledoc.profileID);
  if (imageEntry?.imageBase64) return imageEntry.imageBase64;
  return profiledoc.sex === 'Male' ? maleavatar : femaleavatar;
};


  return (
    <>
      <div id="dvprofilelist">

        {/* <Link to="/BrokerList" className="dropdown-item">
            <img src={backaero}  alt="Go back"></img></Link> */}

        <div className="row">
          <nav className="navbar navbar-light">
            <div className="container-fluid">
              <h2>Profiles</h2>
              <div className="d-flex" >
                <button className="btn btn-outline-success me-2" onClick={() => onRefresh()} ><svg xmlns="http://www.w3.org/2000/svg" width="20" height="26" fill="currentColor" class="bi bi-arrow-clockwise" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z" />
                  <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466" />
                </svg></button>
                <button className="btn btn-success me-2" type="button" style={{ backgroundColor: '#1aa179', color: "white", width: 100 }} onClick={handleToggle}>Filter</button>
                <button className="btn btn-success me-md-2" style={{ backgroundColor: '#1aa179', color: "white" }} onClick={() => onAddProfileClick()} type="submit">Add Profile</button>
              </div>
            </div>
          </nav>
        </div>

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
                <label htmlFor="religion" className="form-label">Religion</label>
                <select value={searchData.religion} className="form-control form-select-sm" name="religion" id="religion" onChange={onSearchchange} aria-label=".form-select-sm example">
                  <option value="">Select</option>
                  {/* <option value={"Hindu"}>Hindu</option>
              <option value={"Christian"}>Christian</option> */}

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
                  {/* <option value={"Nadar"}>Nadar</option>
              <option value={"Devar"}>Devar</option> */}
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


              {/* <div className="col-md-12 form-check mt-3">
        <input
        type="checkbox"
        className="form-check-input"
        id="singleCheck"
        checked={isViewedImageProfile}
        onChange={(e) => setIsChecked(e.target.checked)}
      />
      <label className="form-check-label" htmlFor="singleCheck">
         Today Viewed Image Profiles
      </label>
          </div> */}
              <div className="col-md-12 mt-3">
                <div className="row">
                  <div className="col-md-6">  <button className="secondarybutton" onClick={(profileName) => onSearchClick(profileName)} type="submit">Apply</button></div>
                  <div className="col-md-4"> <button className="secondarybutton" onClick={() => onResetClick()} type="submit">Reset</button></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <br />
        {/* </form> */}

        Page {currentPage} of {profile.profileTotal}

        <div>

          {/* Commented by Nalini to stop the pagination from loading everytime  */}
          {/* {(profile && !profile.isAllProfilesByBrokerIdLoading && profile.profiles && profile.profileTotal) ? (  */}
          {/* {(profile && !profile.isAllProfilesByBrokerIdLoading && profile.profiles && profile.profileTotal) ? ( */}

          <div style={{ display: 'flex', justifyContent: 'left', alignItems: 'left', marginTop: '20px' }}>
            <nav aria-label="Page navigation example">
              <ul className="pagination">
                <li className="page-item" onClick={handlePrevious} disabled={currentPage === 1}>
                  <a className="page-link" style={{ backgroundColor: '#ffffff', color: '#1aa179' }} href="#" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                  </a>
                </li>

                {Array.from({ length: Math.min(profile.profileTotal, 5) }, (_, index) => {
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

                <li className="page-item" onClick={handleNext} disabled={currentPage === profile.profileTotal}>
                  <a className="page-link" style={{ backgroundColor: '#ffffff', color: '#1aa179' }} href="#" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                  </a>
                </li>
              </ul>
            </nav>

          </div>



        </div>

        <div className="card-container">
          {profile.isAllProfilesByBrokerIdLoading && (
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

        {/*  <div className="d-flex flex-column justify-content-center align-items-center"><div className="spinner-border text-info" style={{width: '3rem', height: '3rem'}}></div><div>Loading...</div></div>}   */}
        {profile.isAllProfilesByBrokerIdLoading && profile.isError ? <div>Error while loading</div> : null}
        {(profile && !profile.isAllProfilesByBrokerIdLoading && profile.profiles) ? (



          <div className="container py-0" >
            {
              <div className="container py-0" >
                <div><p>{profile.profileTotals} records found...</p></div>
                <div className="row row-cols-1 row-cols-md-4 py-3 ">
                  {profile.profiles.
                    map((profiledoc) => (


                      <div key={profiledoc._id} className="col" >

                        <div className="card" onClick={() => onProfileClick(profiledoc._id)}style={{
                          border: '2px solid teal',  // Blue border with 2px width
                          borderRadius: '5px',       // Rounded corners
                          padding: '10px'            // Inner spacing
                        }}>
                          <div className="upper-div" style={{ backgroundColor: '#ffffff' }}>
                          <img className="centered-image" src={getProfileImage(profiledoc)} alt="Profile" />

                         {/*    {profiledoc.sex === 'Male' ? (

                              <img
                                className="centered-image"

                                src={profile.profileImageList
                                  ? (profile.profileImageList.find(item => item.profileID === profiledoc.profileID)?.imageUrl || maleavatar)
                                  : maleavatar}
                                alt="Profile"
                              />

                            ) : profiledoc.sex === 'Female' ? (

                              <img
                                className="centered-image"

                                src={profile.profileImageList
                                  ? (profile.profileImageList.find(item => item.profileID === profiledoc.profileID)?.imageUrl || femaleavatar)
                                  : femaleavatar}
                                alt="Profile"
                              />


                            ) : (
                              <p>Gender not specified.</p>
                            )} */}




                          </div>
                          {/* <img className="img-fluid card-img-top" style={{ height: '200px', objectFit: 'cover' }} src={ profile.profileImageList?(profile.profileImageList.find(item => item.profileID === profiledoc.profileID)).imageUrl:matimage1 }  alt="..."></img> */}
                          <div className="card-body">
                            {/*<h5 className="card-title" style={{backgroundColor:"#ffffff",color:'#1aa179',fontWeight: "bold",fontSize: "24px"}}>{profiledoc.name}</h5> */}

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
                                <span className="profile-name" title={profiledoc.name}>
                                  {profiledoc.name}
                                </span>
                                <span className="profile-age ms-1">
                                  {calculateAge(profiledoc.DOB)} yr
                                </span>
                              </div>
                            </a>


                            {/*<p className="card-text field">Profile Id: {profiledoc.profileID}</p> */}
                            <p className="card-text field" title={`${profiledoc.job}, ${profiledoc.district}`}>
                              <strong>{profiledoc.job}, {profiledoc.district}</strong></p>
                            {/* <a href="#" onClick={onProfileClick} className="btn btn-primary">View Detail</a> */}
                            {/*<a href="#" onClick={() => onProfileClick(profiledoc._id)} className="btn btn-primary me-md-2">View Detail</a> */}


                            {/* { 
                                                        role == "Broker"?
                                                          (<a href="#"  onClick={() => onProfileEditClick(profiledoc._id)} className="btn btn-success">Edit Profile</a>):null
                                                        } */}
                          </div>
                        </div>
                      </div>

                    ))}
                </div>
              </div>
            }


          </div>
        ) : null
        }

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

                {Array.from({ length: Math.min(profile.profileTotal, 5) }, (_, index) => {
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

                <li className="page-item" onClick={handleNext} disabled={currentPage === profile.profileTotal}>
                  <a className="page-link" style={{ backgroundColor: '#ffffff', color: '#1aa179' }} href="#" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>

        </div>

        Page {currentPage} of {profile.profileTotal}
      </div>
    </>
  )
}
