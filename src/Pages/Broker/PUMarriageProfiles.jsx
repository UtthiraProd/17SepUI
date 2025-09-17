import { useSelector } from "react-redux"
import { getAllPUMarriageProfile, setPUMarriadeProfileFilter } from "../../Features/Slices/adminBrokerSlice"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import maleavatar from '../../img/Male_avatar.svg'
import femaleavatar from '../../img/Female_avatar.svg'
import { useState, useRef } from "react"
import { useNavigate,useSearchParams } from "react-router-dom"
import { getAllReligions, getAllCastes } from "../../Features/Slices/profSlice"



export function PUMarriageProfiles(){

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [currentPage, setCurrentPage] = useState(1);
    const [startPage, setStartPage] = useState(1);
    const [searchParams] = useSearchParams()
    const pageIndex = searchParams.get('pageIndex')
    const pageStartIndex= searchParams.get('pageStartIndex')
    const ageList = [21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50];

  const onSearchchange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
    [e.target.name]: e.target.value
    }))
};

    const {isgetAllPUMarriageProfileLoading,isgetAllPUMarriageProfileSuccess, GetAllPUMarriageProfile, getAllPUMarriageProfilePages,
        getAllPUMarriageProfileRecods, ProfileImage, filters} = useSelector((state)=>state.admin)

    const { isReligionLoading, isReligionSuccess, iscasteLoading, iscasteSuccess, religions, castes } = useSelector((state)=>state.prof)

    const [searchData, setFormData] = useState({
      name: filters?.name || '',
      sex: filters?.sex || '',
      religion: filters?.religion || '',
      caste: filters?.caste || '',
      status: filters?.status || ''
    })

  const {name, sex, religion, caste, ageFrom, ageTo, status} = searchData

    useEffect(()=>{
        if(!isgetAllPUMarriageProfileLoading && !isgetAllPUMarriageProfileSuccess){
            dispatch(getAllPUMarriageProfile())
        }

        if(!isReligionLoading && !isReligionSuccess){
          dispatch(getAllReligions())
        }

        if(!iscasteLoading && !iscasteSuccess){
          dispatch(getAllCastes())
        }

        const searchData = {name, sex, religion, caste, ageFrom, ageTo, status, "skip": currentPage, "pagesize": 9}
        
        if(pageIndex && pageStartIndex){
            setStartPage(parseInt(pageStartIndex))
            setCurrentPage(parseInt(pageIndex))
            onPageChange(parseInt(pageIndex))
        }
        else{
            setCurrentPage(1)
            onPageChange(parseInt(1))
            dispatch(getAllPUMarriageProfile(searchData))
        }

    },[dispatch])

    const onSearchClick = () => {
      const newFilters = {name, sex, religion, caste, ageFrom, ageTo, status}
      dispatch(setPUMarriadeProfileFilter(newFilters)) 
    
      setCurrentPage(1);
      setStartPage(1);
    
    const searchData = {"skip": 1,"pagesize": 9 , name, sex, religion, caste, ageFrom, ageTo, status};
      
      dispatch(getAllPUMarriageProfile(searchData))
      .then((response) => {
          setStartPage(1)
          setCurrentPage(1)
      })
    
      if (onHandleShow.current) {
        onHandleClose.current.hide();
      }
    };

    const onRefresh = () => {
    
    const searchData = { "skip":1, "pagesize": 9 }
      dispatch(getAllPUMarriageProfile(searchData))
      onResetClick()
      setCurrentPage(1);
      setStartPage(1)
    }

    const onResetClick = () => {
     resetFilter()
     setCurrentPage(1);
     setStartPage(1)
    }
    function resetFilter() {
    const emptyFilters =({
      name: '',
      sex: '',
      religion: '',
      caste: '',
      ageFrom: '', 
      ageTo:'',
      status:''
    })
      setFormData(emptyFilters)
      dispatch(setPUMarriadeProfileFilter(emptyFilters))
    }

    const onPageChange = (page) => {
      setCurrentPage(page)
    const searchData = {name, sex, religion, caste, ageFrom, ageTo, status, "skip": page, "pagesize": 9}
          dispatch(getAllPUMarriageProfile(searchData))
        }

    const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
      if (currentPage <= startPage) {
        setStartPage(startPage - 1);
      }
    }
    };

    const handleNext = () => {
    if (getAllPUMarriageProfilePages) {
      if (currentPage < getAllPUMarriageProfilePages) {
        onPageChange(currentPage + 1);
        if (currentPage >= startPage + 4) {
          setStartPage(startPage + 1);
        }
      }
    }
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

     const getPUProfileImage = (profiledoc) => {
        const imageEntry = ProfileImage?.find(item => item._id === profiledoc._id);
        if (imageEntry?.imageBase64) return imageEntry.imageBase64;
        return profiledoc.sex === 'Male' ? maleavatar : femaleavatar;
      };

      const PUdetails = (profileID) => {
        navigate('/PUMarriageProfDetail?id=' + profileID)
      }

    return(<>
    {/* <div className="text-success"><h3>Public Users</h3></div> */}

    <nav class="navbar navbar-expand-lg">
      <a className="navbar-brand "><h3>Public Users</h3></a>
      {/* <div className="d-flex align-items-center gap-2 mt-2 mt-md-0">
        
      </div> */}

      <div className="ms-auto">
        <button className="btn btn-outline-success m-2" onClick={onRefresh}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="22" fill="currentColor" className="bi bi-arrow-clockwise" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z" />
            <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466" />
          </svg>
        </button>

        <button className="btn btn-success me-2" type="button" style={{ backgroundColor: '#1aa179', color: "white", width: 100 }} onClick={handleToggle}>Filter</button>
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

            <form action="">

              <div className="col-md-12 mt-3">
                <label className="font-weight-bold form-label" htmlFor="sex">I'm looking for a</label>
                <select value={searchData.sex} className="form-control form-select-sm" name="sex" id="sex" onChange={onSearchchange} aria-label=".form-select-sm example">
                  <option value="">Select</option>
                  <option value={"Male"}>Male</option>
                  <option value={"Female"}>Female</option>
                </select>
              </div>

              {/* <div className="col-md-12 mt-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input type="text" value={searchData.name} onChange={onSearchchange} className="form-control form-select-sm" name="name" id="name" placeholder="Enter name"/>
              </div> */}

              <div className="col-md-12 mt-3">
                <label htmlFor="religion" className="form-label">Religion</label>
                <select value={searchData.religion} className="form-control form-select-sm" name="religion" id="religion" onChange={onSearchchange} aria-label=".form-select-sm example">
                  <option value="">Select</option>
                  
                  {((religions != null && religions.length > 0) &&
                    religions.map((religion) => (
                      <option key={religion._id} value={religion.religion}>{religion.religion}</option>
                    ))
                  )}

                </select>
              </div>
              <div className="col-md-12 mt-3">
                <label htmlFor="caste" className="form-label">Caste</label>
                <select value={searchData.caste} className="form-control form-select-sm" name="caste" id="caste" onChange={onSearchchange} aria-label=".form-select-sm example">
                  <option value="">Select</option>
            
                  {((castes != null && castes.length > 0) &&
                    castes.map((caste) => (
                      <option key={caste._id} value={caste.caste}>{caste.caste}</option>
                    ))
                  )}
                </select>
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
                <label className="font-weight-bold form-label" htmlFor="status">Status</label>
                <select value={searchData.status} className="form-control form-select-sm" name="status" id="status" onChange={onSearchchange} aria-label=".form-select-sm example">
                  <option value="">Select</option>
                  <option value={"New"}>New</option>
                  <option value={"Pending"}>Pending</option>
                  <option value={"Deleted"}>Deleted</option>
                </select>
              </div>

              <div className="col-md-12 mt-3">
                <div className="row">
                  <div className="col-md-6">  <button className="secondarybutton" onClick={() => onSearchClick()} type="button">Apply</button></div>
                  <div className="col-md-4"> <button className="secondarybutton" onClick={() => onResetClick()} type="button">Reset</button></div>
                </div>
              </div>
            </form>
            </div>
          </div>
        </div>

    <div>
      
      Page {currentPage} of {getAllPUMarriageProfilePages} 
         
          <div style={{ display: 'flex', justifyContent: 'left', alignItems: 'left', marginTop: '20px' }}>
            <nav aria-label="Page navigation example">
              <ul className="pagination">
                <li className="page-item" onClick={handlePrevious} disabled={currentPage === 1}>
                  <a className="page-link" style={{ backgroundColor: '#ffffff', color: '#1aa179' }} href="#" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                  </a>
                </li>

                {Array.from({ length: Math.min(getAllPUMarriageProfilePages, 5) }, (_, index) => {
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

                <li className="page-item" onClick={handleNext} disabled={currentPage === getAllPUMarriageProfilePages}>
                  <a className="page-link" style={{ backgroundColor: '#ffffff', color: '#1aa179' }} href="#" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>

        </div>

{getAllPUMarriageProfileRecods} profiles found.
    
    <div className="container">
        <div className="row row-cols-1 row-cols-md-3 py-3 ">
    {GetAllPUMarriageProfile.map((profiles)=>(
        <div key={profiles} className="col">

            <div className="row border border-dark rounded m-2 py-2" style={{ width: '400px', height: '210px'}}>

            <div className="col mb-5" style={{width: '100px',height: '190px',alignItems: 'center',justifyContent: 'center',overflow: 'hidden',}}>
                <img  src={getPUProfileImage(profiles)} style={{width: '190px', height: '200px', objectFit: 'cover', borderRadius: '3px'}} alt="Profile" />
            </div>

            <div className="col mt-1">
            <div className="text-success" onClick={() =>PUdetails(profiles._id)}><h4>{profiles.name}</h4></div>
            <div className="mt-3"> Qualification: <b>{profiles.qualification} </b></div>
            <div className="mt-2"> District: <b>{profiles.district}</b></div>
            <div className="mt-2"> Job: <b>{profiles.job}</b></div>
            </div>
            </div>
        </div>
        
    ))}
    </div>
    </div>

    <div>
          <div style={{ display: 'flex', justifyContent: 'left', alignItems: 'left', marginTop: '20px' }}>
            <nav aria-label="Page navigation example">
              <ul className="pagination">
                <li className="page-item" onClick={handlePrevious} disabled={currentPage === 1}>
                  <a className="page-link" style={{ backgroundColor: '#ffffff', color: '#1aa179' }} href="#" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                  </a>
                </li>

                {Array.from({ length: Math.min(getAllPUMarriageProfilePages, 5) }, (_, index) => {
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

                <li className="page-item" onClick={handleNext} disabled={currentPage === getAllPUMarriageProfilePages}>
                  <a className="page-link" style={{ backgroundColor: '#ffffff', color: '#1aa179' }} href="#" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>

        </div>

        Page {currentPage} of {getAllPUMarriageProfilePages}

    </>)
}