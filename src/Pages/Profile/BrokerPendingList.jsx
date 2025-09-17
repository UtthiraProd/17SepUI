import { useEffect, useState } from "react";
import "../../scss/broker.scss"
import { getBrokerCreatedProfiles} from "../../Features/Slices/profSlice"
import sessionData from "../../sessionData";
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from "react-toastify"
import { Link } from "react-router-dom";
import matimage1 from '../../img/sampleBroker1.jpg'
import maleavatar from '../../img/Male_avatar.svg'
import femaleavatar from '../../img/Female_avatar.svg'
import { useLocation,useSearchParams } from 'react-router-dom'
import "../../scss/profileList.scss"
import "../../scss/common.scss"


export function BrokerPendingList() {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const search = useLocation().search
   
    const [searchParams] = useSearchParams();
    console.log(searchParams);
    const brokerId = searchParams.get('id')
  
 
    const [currentPage, setCurrentPage] = useState(1);
    const [searchData,setFormData] = useState({
        searchBrokerId:brokerId,
        })

    const {searchBrokerId} = searchData

    const onSearchchange = (e) => {
        setFormData((prevState)=>({
                ...prevState,
                [e.target.name]:e.target.value
        }))
    }

    const profiles =
        useSelector(
            (state) => state.prof
        )

    useEffect(() => {
       const searchData ={
        searchBrokerId,
        "skip":currentPage,
        "pagesize":8
    }
    dispatch(getBrokerCreatedProfiles(searchData))
    }, [])


    const onProfileClick = (id) => {
        navigate('/BrokerProfile?id='+ id + "&brId="+ brokerId, { replace: true });
    }

    const [startPage, setStartPage] = useState(1);

    const handleNext = () => {
      if(profiles.brokerCreatedprofileTotal)
      {
        if (currentPage < profiles.brokerCreatedprofileTotal) {
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
          searchBrokerId,
          "skip":page,
          "pagesize":8
      }
      dispatch(getBrokerCreatedProfiles(searchData))
      };



    return (
        <>
            <div id="dvpendinglist">
              <div className="row">
             <div className="col-md-4"><h4>Approved Pending List</h4></div>
              </div>
                 <br/>

                Page {currentPage} of {profiles.brokerCreatedprofileTotal}

                <div>

          <div style={{ display: 'flex', justifyContent: 'left', alignItems: 'left', marginTop: '20px' }}>
            <nav aria-label="Page navigation example">
              <ul className="pagination">
                <li className="page-item" onClick={handlePrevious} disabled={currentPage === 1}>
                  <a className="page-link" style={{ backgroundColor: '#ffffff', color: '#1aa179' }} href="#" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                  </a>
                </li>

                {Array.from({ length: Math.min( profiles.brokerCreatedprofileTotal,5) }, (_, index) => {
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

                <li className="page-item" onClick={handleNext} disabled={currentPage === profiles.brokerCreatedprofileTotal}>
                  <a className="page-link" style={{ backgroundColor: '#ffffff', color: '#1aa179' }} href="#" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
</div>

                <div className="card-container"> 
                  {profiles.isGetBrokerCreateLoading && ( 
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

                {/* {profile.isGetBrokerCreateLoading && profile.isError ? <div>Error while loading</div> : null} */}
                {/* {(profiles && !profiles.isGetBrokerCreateLoading && profiles.brokerCreatedProfiles) ? ( */}

                    <div className="container py-0" >
                        {
                            <div className="container py-0" >
                                <div><p>{profiles.brokerCreatedprofileTotals} records found...</p></div>
                                <div className="row row-cols-1 row-cols-md-4 py-3 ">
                                    {profiles.brokerCreatedProfiles.map((ApprovedBrok) => (
                                            <div key={ApprovedBrok._id}  className="col" >
                                              
                                                <div  className="card">
                                                <div className="upper-div"  style={{ backgroundColor: '#ffffff' }}   >
                                                
                                                {ApprovedBrok.sex === 'Male' ? (

                                                      <img 
                                                      className="centered-image" 

                                                      src={profiles.brokerCreatedprofileImageList 
                                                      ? (profiles.brokerCreatedprofileImageList.find(item => item.profileID === ApprovedBrok.profileID)?.imageUrl || maleavatar) 
                                                      : maleavatar} 
                                                      alt="Profile" 
                                                      />

                                                  ) : ApprovedBrok.sex === 'Female' ? (

                                                    <img 
                                                    className="centered-image" 

                                                    src={profiles.brokerCreatedprofileImageList 
                                                    ? (profiles.brokerCreatedprofileImageList.find(item => item.profileID === ApprovedBrok.profileID)?.imageUrl || femaleavatar) 
                                                    : femaleavatar} 
                                                    alt="Profile" 
                                                    />

                                                  ) : (
                                                    <p>Gender not specified.</p>
                                                  )}




                                              </div>
                                                    <div className="card-body">
                                                        <a
                                                          href="#"
                                                          onClick={() => onProfileClick(ApprovedBrok._id)}
                                                          className="card-text profile-link"
                                                          style={{
                                                            backgroundColor: "#ffffff",
                                                            color: '#1aa179',
                                                            fontWeight: "bold",
                                                            fontSize: "20px",
                                                            textDecoration: 'none',  // Remove underline
                                                          }}
                                                        >
                                                          <span className="name" style={{ fontWeight: 'bold', fontSize: '20px' }}>{ApprovedBrok.name}</span>, 
                                                          <span style={{ fontStyle: 'normal', fontSize: '16px', color: '#555' }}> {ApprovedBrok.age} yr</span>
                                                        </a>
                                                        <p className="card-text field">{ApprovedBrok.job}, {ApprovedBrok.district}</p>
                                                    </div>  
                                                </div>
                                            </div>

                                        ))}
                                </div>
                            </div>
                        }
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

                {Array.from({ length: Math.min(profiles.brokerCreatedprofileTotal, 5) }, (_, index) => {
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

                <li className="page-item" onClick={handleNext} disabled={currentPage === profiles.brokerCreatedprofileTotal}>
                  <a className="page-link" style={{ backgroundColor: '#ffffff', color: '#1aa179' }} href="#" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>

</div>

Page {currentPage} of {profiles.brokerCreatedprofileTotal}
            </div>
        </>
    )
}
