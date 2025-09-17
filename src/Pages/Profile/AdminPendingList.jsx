import { useEffect, useState } from "react";
import "../../scss/broker.scss"
import { getAllProfilesByBrokerId,getAllReligions,searchProfile, resetProfileList,getAllCastes } from "../../Features/Slices/profSlice"
import sessionData from "../../sessionData";
import { useDispatch, useSelector } from 'react-redux'
import { replace, useNavigate } from 'react-router-dom'
import { toast } from "react-toastify"
import { Link } from "react-router-dom";
import matimage1 from '../../img/sampleBroker1.jpg'
import maleavatar from '../../img/Male_avatar.svg'
import femaleavatar from '../../img/Female_avatar.svg'
import { useLocation,useSearchParams } from 'react-router-dom'
import backaero from '../../img/arrow-left-circle-fill.svg'
import { NumericSpinner } from "../Common/NumericSpinner"
import "../../scss/profileList.scss"
import { button } from "react-bootstrap";

export function AdminPendingList() {

    const navigate = useNavigate()  
    const dispatch = useDispatch()

    const search = useLocation().search
   
    const [searchParams] = useSearchParams();
    console.log(searchParams);
    const brokerId = searchParams.get('id')
    const searchFilter = searchParams.get('search')
    const role = sessionData.getUserData().role
    const ageList = [21,22,23,24,25,26,27,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50];

    const [data, setData] = useState([]); 
    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    let gender= "";
    let dashboardFilter = "";

    if(searchFilter)
    {
      if(searchFilter.split("-")[1]=="F")
       gender = "Female"
      if(searchFilter.split("-")[1]=="M")
       gender = "Male"
      dashboardFilter = searchFilter.split("-")[0]
    }
   

    const [searchData,setFormData] = useState({
        sex:gender,
        religion:'',
        caste:'',
        ageFrom:'',
        ageTo:'',
        searchBrokerId:brokerId,
        dashboardFilter:dashboardFilter
        })

    const {sex,religion,caste,ageFrom,ageTo,searchBrokerId} = searchData

    const onSearchchange = (e) => {
        setFormData((prevState)=>({
                ...prevState,
                [e.target.name]:e.target.value
        }))
    }

    const profile =
        useSelector(
            (state) => state.prof
        )

        
    useEffect(() => {

      if(!profile.isReligionLoading && !profile.isReligionSuccess)
      {
         dispatch(getAllReligions())
      }

      if(!profile.iscasteLoading && !profile.iscasteSuccess)
      {
         dispatch(getAllCastes())
      }
       // dispatch(getAllProfilesByBrokerId({"brokerId":brokerId,"skip":currentPage,"pagesize":10}))
       const searchData ={
        sex,religion,caste,ageFrom,ageTo,searchBrokerId,dashboardFilter,
        "skip":currentPage,"pagesize":8
    }
    dispatch(searchProfile(searchData))

    }, [])


    const onProfileClick = (id) => {
        
        navigate('/AdminProfile?id='+ id + "&brId="+ brokerId, { replace: true });
    }

    const onProfileEditClick= (id) => {
        //e.preventDefault();
        navigate('/EditProfile?id='+ id + "&brId="+ brokerId, { replace: true });
    }

    const onAddProfileClick=()=>{
      navigate('/RegisterProfile', { replace: true });
    }
    const onSearchClick=()=>{
        const searchData ={
            sex,religion,caste,ageFrom,ageTo,searchBrokerId,dashboardFilter,
            "skip":currentPage,"pagesize":8
        }
        
        dispatch(resetProfileList())
        dispatch(searchProfile(searchData))
    }

   const onResetClick=()=>{
      setFormData({
        sex:'',
        religion:'',
        caste:'',
        ageFrom:'',
        ageTo:'',
        searchBrokerId:brokerId
        })

      const searchData ={
        sex,religion,caste,ageFrom,ageTo,dashboardFilter
    }
      //dispatch(resetProfileList())
     // dispatch(searchProfile(searchData))
  }

    const [startPage, setStartPage] = useState(1);
    // let totalPages = 1;
  

    const handleNext = () => {
      if(profile.profileTotal)
      {
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
        setCurrentPage(page);


        const searchData ={
          sex,religion,caste,ageFrom,ageTo,searchBrokerId,dashboardFilter,
          "skip":page,"pagesize":8
      }

     
     // dispatch(resetProfileList())
      dispatch(searchProfile(searchData))

        //alert(page)
        //alert(currentPage)
       // dispatch(getAllProfilesByBrokerId({"brokerId":brokerId,"skip":page,"pagesize":10}))
        // You could also fetch data for the new page here
      };

    



    return (
        <>
            <div id="dvprofilelist">
           
            {/* <Link to="/BrokerList" className="dropdown-item">
            <img src={backaero}  alt="Go back"></img></Link> */}

              <div className="row">
             <div className="col-md-4"><h1>Approval Pending List</h1></div>
            
              </div>

                
                {/* <form id="frmsearchprofile"> */}
                <div  className="row">
                    {/* <div className="col-md-2">
                    <label className="font-weight-bold" htmlFor="sex">I'm looking for a</label>
                 <select value={searchData.sex} className="form-select form-select-sm" name="sex" id="sex" onChange={onSearchchange} aria-label=".form-select-sm example">
                <option value="">Select</option>
                <option value={"Male"}>Male</option>
                <option value={"Female"}>Female</option>
                </select>
                    </div> */}
                    <div className="form-group col-md-2">

                    
                {/* <label htmlFor="ageFrom">Age -From</label>
                 <select value={searchData.ageFrom} className="form-select form-select-sm" name="ageFrom" id="ageFrom" onChange={onSearchchange} aria-label=".form-select-sm example">
                 <option value="">Select</option>
                 {
                    
                 ageList.map((item, index) => (
                 <option key={index} value={item}>{item}</option>
                 ))}
                </select>
                 */}


                    </div>
                    {/* <div className="col-md-2">
                    <label htmlFor="ageTo">Age -To</label>
                  <select value={searchData.ageTo} className="form-select form-select-sm" name="ageTo" id="ageTo" onChange={onSearchchange} aria-label=".form-select-sm example">
                  <option value="">Select</option>
                  {
                 ageList.map((item, index) => (
                 <option key={index} value={item}>{item}</option>
                 ))}
                </select> 
                
                    </div> */}
                    {/* ? */}

                    <div className="col-md-2">
  
                <div className="groupButtoncontainer"> 
                    
                    {/* <button className="secondarybutton" onClick={()=>onSearchClick()} type="submit">Search</button>
                    <button className="secondarybutton" onClick={()=>onResetClick()} type="submit">Reset</button> */}
                    </div>
                </div>
                </div>

                 <br/>
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
                                <div className="row row-cols-1 row-cols-md-4 py-3 ">
                                    {profile.profiles.
                                        map((profiledoc) => (
                                          
      
                                            <div key={profiledoc._id}  className="col" >
                                              
                                                <div  className="card" style={{
                                              border: '2px solid teal',  // Blue border with 2px width
                                              borderRadius: '5px',       // Rounded corners
                                              padding: '10px'            // Inner spacing
                                          }}>
                                                <div className="upper-div"  style={{ backgroundColor: '#ffffff' }}   >
                                                
                                                {profiledoc.sex === 'Male' ? (

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
                                                  )}




                                              </div>
                                                    {/* <img className="img-fluid card-img-top" style={{ height: '200px', objectFit: 'cover' }} src={ profile.profileImageList?(profile.profileImageList.find(item => item.profileID === profiledoc.profileID)).imageUrl:matimage1 }  alt="..."></img> */}
                                                    <div className="card-body">
                                                        {/*<h5 className="card-title" style={{backgroundColor:"#ffffff",color:'#1aa179',fontWeight: "bold",fontSize: "24px"}}>{profiledoc.name}</h5> */}
                                                       
                                                         <p style={{
                                                            backgroundColor: "#ffffff",
                                                            color: '#1aa179',
                                                            fontWeight: "bold",
                                                            fontSize: "20px",
                                                          }}> {profiledoc.name}</p> 
                                                       
                                                        <p className="card-text field">Profile Id: {profiledoc.profileID}</p>
                                                        {/* <p className="card-text field">Age: {profiledoc.age}</p> */}
                                                        <p className="card-text field">District: {profiledoc.district}</p>
                                                        {/* <p className="card-text field">Job: {profiledoc.job}</p> */}
                                                        <br />  
                                                        <button className="btn btn-success" onClick={()=>onProfileClick(profiledoc._id)}>view Profile</button>
                                                        
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
