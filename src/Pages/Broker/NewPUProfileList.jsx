import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getNewPUProfileList,resetNewPUProfileList } from '../../Features/Slices/brokSlice';
import React from 'react';
import maleavatar from '../../img/Male_avatar.svg'
import femaleavatar from '../../img/Female_avatar.svg'
import { Link, useNavigate, useSearchParams } from "react-router-dom"
import { useState } from 'react';

export function NewPUProfileList() {

const dispatch = useDispatch();
const navigate = useNavigate()
  const [currentPage, setCurrentPage] = useState(1);
  const [startPage, setStartPage] = useState(1);

  const [searchParams] = useSearchParams();
      const profileId = searchParams.get('id')
       const pageIndex = searchParams.get('pageIndex')
       const pageStartIndex = searchParams.get('pageStartIndex')

const { isNewPUProfileListLoading,isNewPUProfileListSuccess,ApproveProfiles,ApproveImage,TotalProfile  } = useSelector((state) => state.brok);

useEffect(()=>{
    const searchData = {
      "skip": currentPage, "pagesize": 6
    }
       if (pageIndex && pageStartIndex ) {             
               setStartPage(parseInt(pageStartIndex))
               setCurrentPage(parseInt(pageIndex))
               onPageChange(parseInt(pageIndex))
             }
         else {
             setCurrentPage(1)
             onPageChange(parseInt(1))
             dispatch(getNewPUProfileList(searchData))
             }
          // dispatch(resetNewPUProfileList(searchData))
      
    },[]);

  const onProfileClick = (id) => {
    navigate('/BrokerApproveDetails?id=' + id +"&pageIndex=" + currentPage + "&pageStartIndex="+startPage);
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


    const searchData = {
      "skip": page, "pagesize": 6
    }
   dispatch(getNewPUProfileList(searchData))
  }

    const handleNext = () => {  
    if (TotalProfile) {
      if (currentPage < TotalProfile) {
        onPageChange(currentPage + 1);
        if (currentPage >= startPage + 4) {
          setStartPage(startPage + 1);
        }
      }
    }
  };

    const GoBack = () => {
    navigate('/BrokerHome')
  }

return(<>

<div className="dropdown-item d-flex align-items-center"  >
        <svg onClick={GoBack} xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="#1aa179" className="bi bi-arrow-left-circle" viewBox="0 0 16 16"style={{ cursor: 'pointer' }}>
          <path fillRule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z" />
        </svg><p className="mb-0 ms-2" onClick={GoBack} >Go Back</p></div><br />
<p className="h4">New Public Profile List</p><br />


          
          <p>Page {currentPage} of {TotalProfile}</p>

          <div style={{ display: 'flex', justifyContent: 'left', alignItems: 'left', marginTop: '20px' }}>
            <nav aria-label="Page navigation example">
              <ul className="pagination">
                <li className="page-item" onClick={handlePrevious} disabled={currentPage === 1}>
                  <a className="page-link" style={{ backgroundColor: '#ffffff', color: '#1aa179' }} href="#" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                  </a>
                </li>

                {Array.from({ length: Math.min(TotalProfile, 5) }, (_, index) => {
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

                <li className="page-item" onClick={handleNext} disabled={currentPage === TotalProfile}>
                  <a className="page-link" style={{ backgroundColor: '#ffffff', color: '#1aa179' }} href="#" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                  </a>
                </li>
              </ul>
            </nav>

          </div>


          <div className="container">
  <div className="row row-cols-md-1 row-cols-lg-4">
    {isNewPUProfileListLoading && (
      <>
        {[1, 2, 3 ,4,5,6].map((_, idx) => (
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

{(!isNewPUProfileListLoading && ApproveProfiles) ? (

<div className="container">
  <div className="row row-cols-1 row-cols-lg-3 g-3 g-lg-3">     
    {ApproveProfiles.map((Profiles)=>(
      <div key={Profiles} className="col-4 mb-4">
          <div className='row border border-dark rounded p-3 ms-4'  >
            <div className="upper-div" style={{ backgroundColor: '#ffffff' }}>
           <div className="upper-div" style={{ backgroundColor: '#ffffff' }}>
                        {Profiles.sex === 'Male' ? (
                                            
                                                <img
                                                  className="centered-image" 
                                                  src={(ApproveImage.find(item=>item._id === Profiles._id)?.imageBase64 || maleavatar)}
                                                  onError={(e) => { e.target.onerror = null; e.target.src = maleavatar; }}
                                                  alt="Profile"
                                                />
                                            
                                                ) : Profiles.sex === 'Female' ? (
                                            
                                                  <img
                                                  className="centered-image"
                                                  src={(ApproveImage.find(item=>item._id === Profiles._id)?.imageBase64 || femaleavatar)}
                                                    onError={(e) => { e.target.onerror = null; e.target.src = femaleavatar; }}
                                                  alt="Profile"
                                                  />
                                            
                                            
                                                  ) : (
                                                  <p>Gender not specified.</p>
                                                  )}
            </div>
              <div className='col ms-5'>
                <div>
<p className="mb-2 custom-font" onClick={() => onProfileClick(Profiles._id)}><span style={{
                                backgroundColor: "#ffffff",
                                color: '#1aa179',
                                fontWeight: "bold",
                                fontSize: "22px",
                                textDecoration: 'none',  // Remove underline
                              }}>{Profiles.name}</span>
</p>
  <span className="card-text profile-link" style={{ fontWeight: 'bold', marginLeft: '5px' }}>Age:{calculateAge(Profiles.DOB)} yr</span><br />
    <p className="card-text profile-link" style={{ fontWeight: 'bold', marginLeft: '5px' }}><span>District:</span>{(Profiles.district)}</p>

                                </div>
              </div>
          </div>
          </div>



        </div>
    ))}
  </div>
</div>

):(null)}

            <nav aria-label="Page navigation example">
              <ul className="pagination" >
                <li className="page-item" onClick={handlePrevious} disabled={currentPage === 1}>
                  <a className="page-link" style={{ backgroundColor: '#ffffff', color: '#1aa179' }} href="#" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                  </a>
                </li>

                {

                  Array.from({ length: Math.min(TotalProfile, 5) }, (_, index) => {
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
                  })

                }

                <li className="page-item" onClick={handleNext} disabled={currentPage === TotalProfile}>
                  <a className="page-link" style={{ backgroundColor: '#ffffff', color: '#1aa179' }} href="#" aria-label="Previous">
                    <span aria-hidden="true">&raquo;</span>
                  </a>
                </li>
              </ul>
            </nav>

            <p>Page {currentPage} of {TotalProfile}</p>
</>)
 }