import maleavatar from '../../img/Male_avatar.svg'
import femaleavatar from '../../img/Female_avatar.svg'
import { useSelector } from 'react-redux'
import { useEffect,useState } from 'react'
import { getMarriageProfiles} from '../../Features/Slices/userProfileSlice'
import { useDispatch } from 'react-redux'
import { useNavigate, useSearchParams } from 'react-router-dom'
import "../../scss/profileList.scss"


export function UserProfileList(){

const navigate =useNavigate()
const dispatch = useDispatch ()

// const search = useLocation().search
  const [searchParams] = useSearchParams();
    const brokerId = searchParams.get('id')
    const pageIndex = searchParams.get('pageIndex')
    const pageStartIndex = searchParams.get('pageStartIndex')
   
    const [currentPage, setCurrentPage] = useState(1);


const [searchData,setFormData] = useState({
            BrokerId:brokerId,
            name:'',
            phoneNumber:'',
            profileID:'',
            email:''
        })
     const {BrokerId,name,phoneNumber,profileID,email} = searchData   


  const onSearchchange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }


  const {isGetMarriageProfileLoading,isGetMarriageProfileSuccess,profilesList,totalRecourd,totalRecords,profileImage}=useSelector((state)=>state.userPro)

  useEffect(()=>{
    const searchData ={
      BrokerId,name,phoneNumber,profileID,email,
      "skip":currentPage,
        "pagesize":9
    }
  
  //  if(!isGetMarriageProfileLoading && !isGetMarriageProfileSuccess){
  //     dispatch(getMarriageProfiles(searchData))
  //   }

    if (pageIndex && pageStartIndex) {
        setStartPage(parseInt(pageStartIndex))
        setCurrentPage(parseInt(pageIndex))
        onPageChange(parseInt(pageIndex))
      }
      
      else {
        setCurrentPage(1)
        onPageChange(parseInt(1))
        dispatch(getMarriageProfiles(searchData))
      }

  },[])

const onSearchClick=()=>{
  const searchData={BrokerId,name,phoneNumber,profileID,email,
    "skip":currentPage,"pagesize":9
  }

  dispatch(getMarriageProfiles(searchData))
}


   const [startPage, setStartPage] = useState(1);
  
      const handleNext = () => {
        if(totalRecourd)
        {
          if (currentPage <totalRecourd) {
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
  
          const searchData ={
            BrokerId,name,phoneNumber,profileID,email,
            "skip":page,
            "pagesize":9
        }
        dispatch(getMarriageProfiles(searchData))
        };
      
        const onProfileClick =(id)=>{
          navigate('/BrokerProfile?id=' + id + "&id=" + brokerId + "&name=userProfile" +"&pageIndex=" + currentPage + "&pageStartIndex="+ startPage , { replace: true})
          
        }

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


const onResetClick = () => {
  resetFilter();
};

function resetFilter() {
  const emptyFilters = {

    name: '',
    phoneNumber: '',
    profileID: '',
    email: ''
  };
  setFormData(emptyFilters);
}

  const onRefresh = () => {
    const searchData={BrokerId,
    "skip":1,"pagesize":9
  }
    
    dispatch(getMarriageProfiles(searchData))
    resetFilter();
    setCurrentPage(1);
    setStartPage(1)
    
  }

    const backuButtonUrl = () => {
         navigate('/BrokerUser');
    }
  


    return(<>

     <div className="dropdown-item d-flex align-items-center ms-2" >
          <svg onClick={backuButtonUrl} style={{ cursor: 'pointer' }} xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="#1aa179" className="bi bi-arrow-left-circle" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z" />
          </svg>
          <p className="h6 mb-0 ms-2" onClick={backuButtonUrl} style={{ cursor: 'pointer' }}>Go Back</p>
        </div>

    <div id="dvpendinglist">
      <div className='row'>
     
      </div>

      <nav className="navbar navbar-light">
    <div className="container-fluid">
            <a className="navbar-brand"><h3>Profiles</h3></a>
            <div className="d-flex me-5">
                             <button className="btn btn-outline-success me-2" onClick={() => onRefresh()} ><svg xmlns="http://www.w3.org/2000/svg" width="20" height="26" fill="currentColor" class="bi bi-arrow-clockwise" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z" />
                  <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466" />
                </svg></button>
              <button className="btn btn-outline-success col-4 " style={{width:100}} type="submit" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight" >SearchUser</button>
            </div>
          </div>
    </nav>



    Page {currentPage} of {totalRecourd}
    <div>

<div style={{ display: 'flex', justifyContent: 'left', alignItems: 'left', marginTop: '20px' }}>
  <nav aria-label="Page navigation example">
    <ul className="pagination">
      <li className="page-item" onClick={handlePrevious} disabled={currentPage === 1}>
        <a className="page-link" style={{ backgroundColor: '#ffffff', color: '#1aa179' }} href="#" aria-label="Previous">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>

      {Array.from({ length: Math.min(totalRecourd,5) }, (_, index) => {
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

      <li className="page-item" onClick={handleNext} disabled={currentPage ===totalRecourd}>
        <a className="page-link" style={{ backgroundColor: '#ffffff', color: '#1aa179' }} href="#" aria-label="Next">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</div>
</div>


        <div className="container">
  <div className="row row-cols-md-1 row-cols-lg-4">
    {isGetMarriageProfileLoading && (
      <>
        {[1, 2, 3 ,4,5,6,7,8,9].map((_, idx) => (
          <div
            key={idx}
            className="rounded m-2 card-skeleton"
            style={{ width: '400px', height: '210px' }}
          >
            <div className="row">
              {/* Image skeleton */}
              <div
                className="col"
                style={{
                  width: '150px',
                  height: '190px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden'
                }}
              >
                <div
                  className="skeleton skeleton-image"
                  style={{
                    width: '150px',
                    height: '150px',
                    borderRadius: '4px'
                  }}
                ></div>
              </div>

              {/* Text skeleton */}
              <div className="col mt-4">
                <div
                  className="skeleton skeleton-title"
                  style={{ width: '60%', height: '20px', marginBottom: '20px' }}
                ></div>
                <div
                  className="skeleton skeleton-description"
                  style={{ width: '80%', height: '15px', marginBottom: '15px' }}
                ></div>
                <div
                  className="skeleton skeleton-description"
                  style={{ width: '70%', height: '15px' }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </>
    )}
  </div>
</div>

{(!isGetMarriageProfileLoading && profilesList) ? (
<div className='container'>
<div className="row row-cols-1 row-cols-lg-3 g-3 gx-lg-5">
  
{profilesList.map((userProfile,index) => (
     <div key={index}  >
       <div className="row p-2 rounded-2 border border-dark">
       <div className="col-5">
       <div style={{ height: "160px"}}> 

        {userProfile.sex === 'Male' ? (
       <img 
       className="centered-image" src={profileImage 
       ? (profileImage.find(item => item.profileID === userProfile.profileID)?.imageBase64 || maleavatar) 
       : maleavatar} 
       alt="Profile" 
       />

      ) : userProfile.sex === 'Female' ? (

      <img 
      className="centered-image " 

      src={profileImage
      ? (profileImage.find(item => item.profileID === userProfile.profileID)?.imageBase64 || femaleavatar) 
      : femaleavatar} 
       alt="Profile" 
     />

) : (
<p>Gender not specified.</p>
)}
  </div>
            
            </div>
        <div className='col-7'>
          <div className='row'>
            <h5>
          <label htmlFor="" className='name'><a  onClick={()=>onProfileClick(userProfile._id)} className=" text-success text-decoration-none" href=""><b>{userProfile.name}</b></a> </label><br /> </h5>
          <div className='col-5'>
          <label htmlFor="" className=''>Age</label><br />
          <label htmlFor=""><b>{calculateAge(userProfile.DOB)}</b></label>
          </div>
          <div className='col-6'>
          <label htmlFor="" className=''>District</label>
          <label htmlFor=""><b>{userProfile.district}</b></label>
          </div>
          <div> 
           <label htmlFor="" className='mt-2'>Job</label><br />
           <label htmlFor=""><b>{userProfile.job}</b></label>
         </div>
          </div>
          
        </div>

       </div>

    </div>
     ))}
                      

</div>
</div>
):(null)}

       <div>  
          <div style={{ display: 'flex', justifyContent: 'left', alignItems: 'left', marginTop: '20px' }}>
            <nav aria-label="Page navigation example">
              <ul className="pagination">
                <li className="page-item" onClick={handlePrevious} disabled={currentPage === 1}>
                  <a className="page-link" style={{ backgroundColor: '#ffffff', color: '#1aa179' }} href="#" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                  </a>
                </li>

                {Array.from({ length: Math.min(totalRecourd, 5) }, (_, index) => {
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

                <li className="page-item" onClick={handleNext} disabled={currentPage === totalRecourd}>
                  <a className="page-link" style={{ backgroundColor: '#ffffff', color: '#1aa179' }} href="#" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
</div>

Page {currentPage} of {totalRecourd}

    </div>
    
        
    
  <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
  <div class="offcanvas-header mt-5">
    <h5 id="offcanvasRightLabel ">Create User</h5>
    <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>
  <div class="offcanvas-body">
    <form onSubmit={onsubmit}></form>
    <label htmlFor="">Name</label>
    <input type="text"  className='form-control' id='name' name='name' placeholder='Enter name' value={searchData.name} onChange={onSearchchange} /> <br />
    <label htmlFor="">Phone Number</label>
    <input type="text"  className='form-control' id='phoneNumber' name='phoneNumber' placeholder='Enter number' value={searchData.phoneNumber} onChange={onSearchchange}/><br />
    {/* <label htmlFor="">Email</label>
    <input type="text"  className='form-control' placeholder='Enter email' /><br /> */}
    <label htmlFor="">Profile ID</label>
    <input type="text"  className='form-control'id='profileID' name='profileID' placeholder='Enter Id' value={searchData.profileID} onChange={onSearchchange}/><br />

<div className='roe'>
  <div className='col'>
   <button type='submit' className="btn btn-outline-success ms-5" data-bs-dismiss="offcanvas" onClick={()=>onSearchClick()}>Apply</button>
   <button  className="btn btn-outline-success ms-5"  onClick={() => onResetClick()} >Reset</button>
    </div>
    <div>
      
    </div>
    </div>
  </div>
</div>
  
    </>) 
}



