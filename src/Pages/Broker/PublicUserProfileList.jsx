import { useEffect,useState ,useRef} from "react"
import { useDispatch, useSelector } from "react-redux"
import { getallPUprofile, setPUprofileFilters } from "../../Features/Slices/adminBrokerSlice"
import { getAllReligions, getAllCastes } from "../../Features/Slices/profSlice"
import maleavatar from '../../img/Male_avatar.svg'
import femaleavatar from '../../img/Female_avatar.svg'
import { useNavigate, useSearchParams } from "react-router-dom"


export function PublicUserProfileList(){
  const [searchParams] = useSearchParams()
  const searchFilter = searchParams.get('search')
  const pageIndex = searchParams.get('pageIndex')
  const pageStartIndex= searchParams.get('pageStartIndex')
  const [currentPage, setCurrentPage] = useState(1);
  const [brokerAssignCount, setbrokerAssignCount] = useState(0);
  const [startPage, setStartPage] = useState(1);
  const navigate = useNavigate()
  const dispatch=useDispatch() 

  let gender = "";
  let dashboardFilter = "";


  if (searchFilter) {
    if (searchFilter.split("-")[1] == "F")
      gender = "Female"
    if (searchFilter.split("-")[1] == "M")
      gender = "Male"
    dashboardFilter = searchFilter.split("-")[0]
  }

  const profile =useSelector((state) => state.prof)

  const {GetAllPUProfile, images, GetAllPUProfileTotal, GetAllBrokerAssigend, filters } = useSelector((state)=>state.admin)

    const [searchData, setFormData] = useState({
    name: filters?.name || '',
    sex: filters?.sex || '',
    religion: filters?.religion || '',
    caste: filters?.caste || '',
    brokerID: filters?.brokerID || ''
  })
  
  const {name, sex, religion, caste,brokerID} = searchData

    const onSearchchange = (e) => {
     setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
};

useEffect(() => {
  if (GetAllBrokerAssigend !== undefined && GetAllBrokerAssigend !== null) {
    setbrokerAssignCount(GetAllBrokerAssigend);
  }
}, [GetAllBrokerAssigend]);

useEffect(()=>{
   
    const searchData = {name,sex, religion, caste,brokerID,"skip": currentPage, "pagesize": 9}

    if(pageIndex && pageStartIndex){
      setStartPage(parseInt(pageStartIndex))
      setCurrentPage(parseInt(pageIndex))
      onPageChange(parseInt(pageIndex))
    }
    else{
      setCurrentPage(1)
      onPageChange(parseInt(1))
      dispatch(getallPUprofile(searchData))
    }


    if (!profile.isReligionLoading && !profile.isReligionSuccess) {
        dispatch(getAllReligions())
        }
    
    if (!profile.iscasteLoading && !profile.iscasteSuccess) {
        dispatch(getAllCastes())
    }
        
},[dispatch])

const onSearchClick = () => {
  const newFilters = {name, sex, religion, caste, brokerID}
  dispatch(setPUprofileFilters(newFilters)) 

  setCurrentPage(1);
  setStartPage(1);

  const searchData = {"skip": 1,"pagesize": 9 ,name,sex,religion,caste,brokerID};
  
  dispatch(getallPUprofile(searchData))
  // dispatch(resetgetallPUprofile())
  .then((response) => {
      setStartPage(1)
      setCurrentPage(1)
  })

  if (onHandleShow.current) {
    onHandleClose.current.hide();
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

  const onPageChange = (page) => {
      // alert(page)
      setCurrentPage(page)
      // debugger
      const searchData = {
        name, sex, religion,caste,brokerID,
        "skip": page, "pagesize": 9
      }
      dispatch(getallPUprofile(searchData))
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
    if (GetAllPUProfileTotal) {
      if (currentPage < GetAllPUProfileTotal) {
        onPageChange(currentPage + 1);
        if (currentPage >= startPage + 4) {
          setStartPage(startPage + 1);
        }
      }
    }
  };

const onProfileClick =(id)=>{
  navigate('/PUprofileDetails?id='+id +"&pageIndex="+currentPage +"&pageStartIndex="+ startPage)
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
      brokerID:'',
    })
    setFormData(emptyFilters)
    dispatch(setPUprofileFilters(emptyFilters))
  }

    const getPUProfileImage = (profiledoc) => {
    const imageEntry = images?.find(item => item._id === profiledoc._id);
    if (imageEntry?.imageBase64) return imageEntry.imageBase64;
    return profiledoc.sex === 'Male' ? maleavatar : femaleavatar;
  };

    return(
    <>
    <nav class="navbar navbar-expand-lg">
      <a className="navbar-brand "><h3>Pending Profiles</h3></a>
      <div className="ms-auto">
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

              <div className="col-md-12 mt-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input type="text" value={searchData.name} onChange={onSearchchange} className="form-control form-select-sm" name="name" id="name" placeholder="Enter name"/>
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
   <label htmlFor="brokerID" className="form-label">No.of broker assigned </label>
      <select value={searchData.brokerID} id="brokerID" name="brokerID" className="form-control form-select-sm" onChange={onSearchchange}>
      <option value="">Select</option>

        {Array.from({ length: brokerAssignCount }, (_, brokerID) => (
          <option key={brokerID._id} value={brokerID}>{brokerID}</option>
        ))}
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

<p>Page {currentPage} of {GetAllPUProfileTotal}</p>

        <div>
          <div style={{ display: 'flex', justifyContent: 'left', alignItems: 'left', marginTop: '20px' }}>
            <nav aria-label="Page navigation example">
              <ul className="pagination">
                <li className="page-item" onClick={handlePrevious} disabled={currentPage === 1}>
                  <a className="page-link" style={{ backgroundColor: '#ffffff', color: '#1aa179' }} href="#" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                  </a>
                </li>

                {Array.from({ length: Math.min(GetAllPUProfileTotal, 5) }, (_, index) => {
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

                <li className="page-item" onClick={handleNext} disabled={currentPage === GetAllPUProfileTotal}>
                  <a className="page-link" style={{ backgroundColor: '#ffffff', color: '#1aa179' }} href="#" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>


    <div>
<div className="container">
   
    <div className="row row-cols-md-1 row-cols-lg-3 py-5 ">
  { GetAllPUProfile.map((profile) => (
    <div key={profile._id}  className=" mb-4 ">

       
          <div className="row border border-dark rounded py-2" style={{ width: '400px', height: '210px'}}>

          <div className="col mb-5" 
            style={{width: '150px',height: '190px',display: 'flex',alignItems: 'center',justifyContent: 'center',overflow: 'hidden',}}>
            <img src={getPUProfileImage(profile)} style={{width: '190px', height: '200px', objectFit: 'cover', borderRadius: '4px'}} alt="Profile" />
          </div>

            <div className="col mt-1">
              <a href="" className="text-decoration-none text-success">
              <p onClick={()=>onProfileClick(profile._id  )} >  <h4>{profile.name}</h4></p></a>
              <div className="mt-3"> District: <b>{profile.district}</b>  </div>
              <div className="mt-2"> Gender: <b>{profile.sex} </b></div>
              <div className=" text-danger mt-3">
              <b> {profile.brokerID.length} Assigned </b></div>
           </div>
          </div>
          
    </div>
  ))}
  </div>
  </div>

</div>
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

                {Array.from({ length: Math.min(GetAllPUProfileTotal, 5) }, (_, index) => {
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

                <li className="page-item" onClick={handleNext} disabled={currentPage === GetAllPUProfileTotal}>
                  <a className="page-link" style={{ backgroundColor: '#ffffff', color: '#1aa179' }} href="#" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>

        </div>

        Page {currentPage} of {GetAllPUProfileTotal}
    </>)
}