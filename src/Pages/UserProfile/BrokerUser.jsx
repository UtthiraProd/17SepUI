import maleavatar from '../../img/Male_avatar.svg'
import femaleavatar from '../../img/Female_avatar.svg'
import { useState } from 'react'
import { resetGetLoginUserProfile,getLoginUserProfile,resetgetLoginUserName,getLoginUserName,resetUserDetailsByid} from '../../Features/Slices/userProfileSlice'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'


export function BrokerUser(){

const dispatch = useDispatch ()
const navigate = useNavigate ()

  const [searchParams] = useSearchParams();
  const userId = searchParams.get('id');
  const [currentPage, setCurrentPage] = useState(1);
  const pageIndex = searchParams.get('pageIndex')
  const pageStartIndex = searchParams.get('pageStartIndex')


  const [searchData, setSearchData] = useState({
    brokerId :''
  })  

  const {brokerId} = searchData
 
const {isGetLoginUserProfileLoading,isGetLoginserProfileSuccess,getLoginUserProfileList,getLoginUserPorfileImageList,
  getLoginUserProfileTotal,getLoginUserProfileTotals,totalPages,isGetLoginUserNameLoading,
isGetLoginUserNameSuccess,brokerUserImageList} = useSelector((state)=>state.userPro)

useEffect(() => {
  const searchData = { brokerId, skip: currentPage, pagesize: 9 };  

    if (pageIndex && pageStartIndex ) {             
        setStartPage(parseInt(pageStartIndex))
        setCurrentPage(parseInt(pageIndex))
        onPageChange(parseInt(pageIndex))
      }
   else {
       setCurrentPage(1)
       onPageChange(parseInt(1))
       dispatch(getLoginUserProfile(searchData))
    }
  // dispatch(getLoginUserProfile(searchData)); 
  // dispatch(resetUserDetailsByid());
}, []);



 const handleGetLoginUserSearch = (e)=>{

        if( e.target.value.length>2){
           dispatch(getLoginUserName(e.target.value))
        }
        else if(e.target.value.length == 0){
          dispatch(getLoginUserProfile())
          // dispatch(resetGetLoginUserProfile())
        }
      }

      const onUserList =(user)=>{
        navigate('/UserProfileList' )
      }


        const [startPage, setStartPage] = useState(1);
        
            const handleNext = () => {
              if(totalPages)
              {
                if (currentPage <totalPages) {
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
                  "skip":page,
                  "pagesize":9
              }
              dispatch(getLoginUserProfile(searchData))
              };

              const userDetails = (userId) => {
                navigate('/UserDetails?id=' + userId + '&name=brokerUser' +"&pageIndex=" + currentPage + "&pageStartIndex="+startPage );
              };

    return(<>
    {/* <h5 className="ms-2">Home</h5><br /> */}

    {/* {(isGetLoginUserProfileLoading || isGetLoginUserNameLoading) && (
         
  <div className="overlay">
    <div className="loading-spinner"></div>
  </div>
    )} */}

    <nav className="navbar navbar-light">
<div className="container-fluid">
        <a className="navbar-brand"><h3>Users</h3></a>
        <div className="d-flex">
          
          <input className="form-control border-success rounded-0" type="search"  id="search" name="search" placeholder="Search"  onChange={handleGetLoginUserSearch}  aria-label="Search"/>

          <button className="btn btn-success me-2 rounded-0"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
          </svg></button>

          <button className="btn btn-outline-success col-4" type="submit" onClick={()=>onUserList()} >Create User</button>
        </div>
      </div>
</nav><br />
Page {currentPage} of {totalPages}
<div>

<div style={{ display: 'flex', justifyContent: 'left', alignItems: 'left', marginTop: '20px' }}>
  <nav aria-label="Page navigation example">
    <ul className="pagination">
      <li className="page-item" onClick={handlePrevious} disabled={currentPage === 1}>
        <a className="page-link" style={{ backgroundColor: '#ffffff', color: '#1aa179' }} href="#" aria-label="Previous">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>

      {Array.from({ length: Math.min(totalPages,5) }, (_, index) => {
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

      <li className="page-item" onClick={handleNext} disabled={currentPage ===totalPages}>
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
    {isGetLoginUserProfileLoading && (
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

{(!isGetLoginUserProfileLoading && getLoginUserProfileList) ? (
<div className="container" >
   <div className="row row-cols-1 row-cols-lg-3 g-2 gx-lg-5">
    {getLoginUserProfileList.map((loginUserProfile,index)=>(
       <div key={index} className="float-end">
   
         <div className="row  rounded-2 border border-dark ">
            <div className="col-5 p-3" style={{height:195}}>
                <div style={{ height: "160px"}}> 
                {/* <img src={maleavatar} alt="example"  style={{width:150}}/> */}
                 
                  {loginUserProfile.sex === 'Male' ? (
                
                    <img
                      className="centered-image" 
                      src={(brokerUserImageList.find(item=>item.profileID === loginUserProfile.profileID)?.imageBase64 || maleavatar)}
                       onError={(e) => { e.target.onerror = null; e.target.src = maleavatar; }}
                      alt="Profile"
                    />
                
                    ) : loginUserProfile.sex === 'Female' ? (
                
                      <img
                      className="centered-image"
                       src={(brokerUserImageList.find(item=>item.profileID === loginUserProfile.profileID)?.imageBase64 || femaleavatar)}
                         onError={(e) => { e.target.onerror = null; e.target.src = femaleavatar; }}
                       alt="Profile"
                       />
                
                
                      ) : (
                       <p>Gender not specified.</p>
                       )}
                </div>
            
            </div>

            <div className="col-6 mt-3">
            <label htmlFor='' className=' text-success text-decoration-none ' onClick={()=>userDetails(loginUserProfile._id)} > <h5>{loginUserProfile.name}</h5></label>  <br /> 
            <div className='row md-4'>

            <div className='col-4 '>
             <label htmlFor="">Age</label>
             <b>{loginUserProfile.age}</b>
            </div>

            <div className='col-6'>
            <label htmlFor="">District</label>
            <b>{loginUserProfile.district}</b>
            </div><br /><br />

            </div>

            <div className='row mt-2'>

            <div className='col-6'>
            <label htmlFor="">Plan</label><br />
            <b>
              {loginUserProfile.planName ? loginUserProfile.planName : <span className="error-text">No plan</span>}
            </b>

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

                {Array.from({ length: Math.min(totalPages, 5) }, (_, index) => {
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

                <li className="page-item" onClick={handleNext} disabled={currentPage === totalPages}>
                  <a className="page-link" style={{ backgroundColor: '#ffffff', color: '#1aa179' }} href="#" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
</div>

Page {currentPage} of {totalPages}

 

    </>)
      
}