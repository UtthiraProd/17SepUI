import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useSearchParams } from 'react-router-dom' 
import { getMatchProfile, resetgetMatchProfile,getMatchStar,setStarFilters,resetStarFilters } from '../../Features/Slices/brokSlice';
import { useNavigate } from 'react-router-dom';
import maleavatar from '../../img/Male_avatar.svg'
import femaleavatar from '../../img/Female_avatar.svg'
import { useState } from "react"
import {getAllStars} from "../../Features/Slices/profSlice"
import { use } from 'react';
import { getProfileDetailsById } from "../../Features/Slices/profSlice"

export function MatchProfile() {

    const dispatch = useDispatch()
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const profileId = searchParams.get('id')
    const brokerId = searchParams.get('brokerId')
    const pageIndex = searchParams.get('pageIndex')
    const pageStartIndex = searchParams.get('pageStartIndex')
    const matchPageIndex = searchParams.get('matchPageIndex')
    const matchStartIndex = searchParams.get('matchStartIndex')

    // const [selectedStars, setSelectedStars] = useState([]);


     const [currentPage, setCurrentPage] = useState(1);

    const onProfileClick = (id) => {
    navigate('/MatchprofileDetail?id=' + id+ "&profId="+ profileId +'&pageIndex=' + pageIndex + '&pageStartIndex=' + pageStartIndex + "&matchPageIndex=" + currentPage + '&matchStartIndex=' + startPage,);
              dispatch(resetgetMatchProfile())
  }
 
     const backuButtonUrl = () =>{
    navigate('/BrokerProfile?id=' + profileId+ "&name=profileList&pageIndex=" + pageIndex + '&pageStartIndex=' + pageStartIndex)
  }
    const {isgetMatchProfileLoading,isgetMatchProfileSuccess,MatchProfile,matchImageList,totalRecourd,filters} = useSelector((state) =>state.brok);

     const {isStarListLoading,isStarListSuccess} = useSelector((state) =>state.prof);

    //  const selectedStarsFromStore = useSelector(state => state.matchProfile.filters.selectedStars)

    // const [searchData, setFormData] = useState({
    //   star:'',
    // })


    // const {star} = searchData

    const selectedStarsFromStore = useSelector((state) => state.brok.filters?.selectedStars);

   const [selectedStars, setSelectedStars] = useState(selectedStarsFromStore || []);


// const handleCheckboxChange = (e, star) => {
//   const isChecked = e.target.checked;
//   const value = star.star;

//   // Update selectedStars array
//   setSelectedStars(prev =>
//     isChecked
//       ? [...prev, value]  // Add star
//       : prev.filter(s => s !== value)  // Remove star
//   );

//   // Update searchData form state
//   setFormData(prev => ({
//     ...prev,
//     [value]: isChecked ? value : "", // If checked, set value; else clear it
//   }));
// };


const handleCheckboxChange = (e, star) => {
  const isChecked = e.target.checked;
  const value = star.star;

  const updatedStars = isChecked
    ? [...selectedStars, value]
    : selectedStars.filter(s => s !== value);

  setSelectedStars(updatedStars);

  // Update Redux store too
  dispatch(setStarFilters(updatedStars));
};

const { stars,
  } =
    useSelector(
      (state) => state.prof
    )


    useEffect(() => {
         dispatch(getProfileDetailsById(profileId))
   })

     const profile =
    useSelector(
      (state) => state.prof
    )
   
   
    useEffect(()=>{
            
                 if (!isStarListLoading && !isStarListSuccess) {
                   dispatch(getAllStars())
           }

          //  if (isgetMatchProfileLoading === false && isgetMatchProfileSuccess === false) {
               if (matchStartIndex && matchPageIndex) {
                    setStartPage(parseInt(matchStartIndex))
                    setCurrentPage(parseInt(matchPageIndex))
                    onPageChange(parseInt(matchPageIndex))
                  }
                  else {
                    setCurrentPage(1)
                    onPageChange(parseInt(1))
                    dispatch(getMatchProfile({matchProfile:profileId, "skip":currentPage,
                   "pagesize":9}))
                  //  dispatch(resetgetMatchProfile())
                    // dispatch(searchProfile(searchData))
                  }
              //  }  
    
    },[],dispatch);
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

  

  useEffect(() => {
  if (MatchProfile && MatchProfile.length > 0) {
    const matchedStars = MatchProfile
      .map(profile => profile.star) // assuming profile.star is a string
      .filter(Boolean); // remove undefined/null

    const uniqueStars = [...new Set(matchedStars)];
    setSelectedStars(uniqueStars);
  }
}, [MatchProfile]);


const onSearchClick = () => {
  const searchData = {
    matchProfile:profileId, "skip":currentPage,"pagesize":9,selectedStars
  };
  dispatch(getMatchProfile(searchData))

  
    setCurrentPage(1);
    setStartPage(1);

      if (onHandleShow.current) {
      onHandleClose.current.hide();
    }

}


    const getProfileImage = (match) => {
    const imageEntry = matchImageList?.find(item => item.profileID === match.profileID);
    if (imageEntry?.imageBase64) return imageEntry.imageBase64;
    return match.sex === 'Male' ? maleavatar : femaleavatar;
  };

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
    
            dispatch(getMatchProfile({matchProfile:profileId,"skip":page,"pagesize":9,selectedStars}));
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



const onResetClick = () => {
  setSelectedStars([]); // Clear all selected checkboxes
  // dispatch(resetStarFilters());

  setCurrentPage(1);
  setStartPage(1);

  const defaultSearchData = {
    matchProfile: profileId,
    skip: 0,
    pagesize: 9,
    selectedStars: []     // Send empty array to remove filters
  };

  dispatch(getMatchProfile(defaultSearchData)); // API call with no stars
  // dispatch(resetgetMatchProfile())

  // Close modal/drawer if open
  if (onHandleShow.current) {
    onHandleClose.current.hide();
  }
};
     

  const onRefresh = () => {
   dispatch(getMatchProfile({matchProfile:profileId, "skip":currentPage,
     "pagesize":9}))

      setCurrentPage(1);  
    setStartPage(1)
  }

  useEffect(() => {
  if (filters?.selectedStars) {
    setSelectedStars(filters.selectedStars);
  }
}, [filters?.selectedStars]);

    return(<>
    <div className="d-flex justify-content-end" >
           <button className="btn btn-outline-success  " style={{ position: "relative", right: "4cm", top: "1cm" }}  onClick={() => onRefresh()}><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-arrow-clockwise" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z" />
                  <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466" />
                </svg></button>
   </div>
   <div className='d-flex justify-content-end'><button class="btn btn-success " type="button"onClick={handleToggle}>Matched Stars</button></div>

<div className="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel"  ref={onHandleShow}>
  <div className="offcanvas-header">
    <h5 class="offcanvas-title" id="offcanvasRightLabel">Stars</h5>
    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>
  <div class="offcanvas-body">
    
  <div className="form-group col-md-4">
  <label htmlFor="star">
    Star <span style={{ color: 'red' }}><b>*</b></span>
  </label>

  {stars && stars.length > 0 && stars.map((star) => (
    <div className="form-check" key={star._id}>
      <input
        className="form-check-input custom-dark-outline"
        type="checkbox"
        id={`star-${star._id}`}
        value={star.star}
        checked={selectedStars.includes(star.star)}  // ✅ Auto-check
        onChange={(e) => handleCheckboxChange(e, star)}
      />
      <label className="form-check-label" htmlFor={`star-${star._id}`}>
        {star.star}
      </label>
    </div>
  ))}
</div>

  </div>
<div className='col-md-12 mt-3 ms-2'>
<div className="row">
  <div className="col-md-6">  <button className="secondarybutton" type="submit" onClick={onSearchClick}>Submit</button></div>
  <div className="col-md-6 "> <button className="secondarybutton"  type="submit" onClick={onResetClick}>Reset</button></div>
</div>
</div>
</div>

            <div className="dropdown-item d-flex align-items-center mb-5" >
          <svg onClick={backuButtonUrl} style={{ cursor: 'pointer' }} xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#1aa179" className="bi bi-arrow-left-circle" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z" />
          </svg>
          <p className="h6 mb-0 ms-2" onClick={backuButtonUrl} style={{ cursor: 'pointer' }}>Go Back</p>
        </div>
       
    <p className='h4'>Matching Profile </p><br />
    <p className='h5'>
  Star : <span style={{ color: '#1dba8bff' }}>{profile?.profileDetails?.star}</span>
</p>
    
<br />

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


<div className="card-container">
          {isgetMatchProfileLoading && (
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

{(!isgetMatchProfileLoading && MatchProfile) ? (
    <div className='container'>
                    
        <div className="container py-0" >
        <div className="row row-cols-1 row-cols-md-4 py-3 ">
        {MatchProfile.map((match, index) =>(
          <div key={index}> 
                        <div className="card"style={{
                          border: '2px solid teal',  // Blue border with 2px width
                          borderRadius: '5px',       // Rounded corners
                          padding: '10px'            // Inner spacing
                        }}>
                          
                        <div className="upper-div" style={{ backgroundColor: '#ffffff' }}>
                        <img className="centered-image" src={getProfileImage(match)} alt="Profile" />
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
                                <span onClick={()=>onProfileClick(match._id)} className="profile-name" title={match.name}>
                                  {match.name}
                                </span>
                                <span className="profile-age ms-1">
                                  {calculateAge(match.DOB)} yr
                                </span>
                              </div>
                            </a>
                            <p className="card-text field" title={`${match.job}, ${match.district}`}>
                              <strong>{match.job}, {match.district}</strong></p>
                          </div>
                          
                        </div>
          </div>
        ))}
         </div>
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

    </>)
}