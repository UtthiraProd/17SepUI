import { useEffect, useState, useRef } from "react";
import "../../scss/broker.css"
import { fetchBrokers, resetRegisterBroker, resetfetchBrokers, setFilterBrokList, setFilters } from "../../Features/Slices/PublicUser/publicUserSlice"
import { getAllDistricts, resetProfileList, searchProfile } from "../../Features/Slices/profSlice"
import { adminGetBrokerByID } from "../../Features/Slices/adminBrokerSlice"
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from "react-toastify"
import { Link } from "react-router-dom";
import matimage1 from '../../img/matimage1.jpg'
import maleavatar from '../../img/Male_avatar.svg'
import { useSearchParams } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/esm/Button";
import { useLocation } from 'react-router-dom';
import {
  publicUserDetails, resetPublicUserDetails, PUProfileRegisterInMarriageProfileTable, resetPUProfileRegisterInMarriageProfileTable,
  PUExistsingPlan,getAllPUplans,activePlan,resetActivePlan,resetGetAllPUPlans} from '../../Features/Slices/PublicUser/publicUserSlice';


export function PublicUserBrokerList() {
   const [selectedPlan, setSelectedPlan] = useState("");

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [currentPage, setCurrentPage] = useState(1);
  const [startPage, setStartPage] = useState(1);
  const [searchParams] = useSearchParams();
  const brokerId = searchParams.get('_id')
  const profileId = searchParams.get('id')
  const planID = searchParams.get('_id')
  // alert(planID)
  const pageIndex = searchParams.get('pageIndex')

  const location = useLocation();
  const fromSource = location.state?.from || ""; // "login" or "register"

  const [showModal, setShowModal] = useState(false);
  const [step, setStep] = useState("initial"); // "initial" or "update"

  // const [data, setData] = useState({
  //       name: filters?.name ||'',
  //       district: filters?.district || '',
  //       matrimonyName:filters?.matrimonyName ||'',
  //       phoneNumber:filters?.phoneNumber ||'',
  //       broker:filters?.broker ||''
  //   })

  //   const {name, district, matrimonyName, phoneNumber, broker } = data


  const {
    isDistrictListLoading, isDistrictListSuccess, districts } =
    useSelector(
      (state) => state.prof
    )

  // const brokerList = brokerList
  const { isfetchBrokerLoading, brokers, isError, isSuccess, isLoading, message, brokImageList,totalRecords, brokerTotal, brokersWithCounts, userStatus, userExists, isfetchBrokerSuccess,
 publicuserDetails, isPublicUserDetailLoading, isPublicUserDetailSuccess, publicuserId,isactivePlanSuccess,ActivePlanMessage,
    isPUProfileRegisterSuccess, PUProfileRegisterMessage, isPUProfileRegisterError,isPUProfileRegisterleLoading ,isgetAllPUplansSuccess,isgetAllPUplansLoading,getplanName,planactive,
    activeplan,isactivePlanLoading, filters
   } =
    useSelector(
      (state) => state.public
    )

    const [searchData, setFormData] = useState({
        name: filters?.name ||'',
        district: filters?.district || '',
        matrimonyName:filters?.matrimonyName ||'',
        phoneNumber:filters?.phoneNumber ||'',
        broker:filters?.broker ||''
  })
  const { name, district, matrimonyName, phoneNumber, broker } = searchData

  useEffect(() => {
    const searchData = {
      name, district, matrimonyName, phoneNumber,
      "skip": currentPage, "pagesize": 9
    }
    dispatch(fetchBrokers(searchData))
    dispatch(resetGetAllPUPlans())
    dispatch(resetActivePlan())
    dispatch(getAllPUplans())

    if (!isDistrictListLoading && !isDistrictListSuccess) {
      dispatch(getAllDistricts())
    }
  }, [])
          useEffect(() => {

      if (pageIndex && pageIndex != undefined && pageIndex != null && pageIndex != 'null') {
        setCurrentPage(pageIndex)
        //onPageChange(parseInt(pageIndex))
      }

    }, [])
  

  const handleNext = () => {
    if (brokerTotal) {
      if (currentPage < brokerTotal) {
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


    const searchData = {
      name, district, matrimonyName, phoneNumber,
      "skip": page, "pagesize": 9
    }


    dispatch(fetchBrokers(searchData))

  };

  const onSearchchange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const onSearchClick = () => {

    const newFilters = {name, district, matrimonyName, phoneNumber}
    dispatch(setFilterBrokList(newFilters))

    if(fromSource == 'login'){
      dispatch(setFilterBrokList())
    }

    const searchData = {
      name, district, matrimonyName, phoneNumber,
      "skip": currentPage, "pagesize": 9
    }

    //dispatch(resetProfileList())
    dispatch(fetchBrokers(searchData))

    if (onHandleShow.current) {
      onHandleClose.current.hide();
    }
  }

  const cardStyle = {
    width: "10rem"
  }



  const Names = publicuserDetails?.name || 'User';
  const userStatuss = publicuserDetails?.status?.toLowerCase(); // normalize


  useEffect(() => {

    dispatch(setFilters())

    if (!isPublicUserDetailLoading && !isPublicUserDetailSuccess) {
      dispatch(publicUserDetails());
    }

    if (isPUProfileRegisterSuccess == true && PUProfileRegisterMessage) {
      toast.success(PUProfileRegisterMessage)
      dispatch(resetPUProfileRegisterInMarriageProfileTable())
    }

    if (isPUProfileRegisterSuccess == false && PUProfileRegisterMessage) {
      toast.error(PUProfileRegisterMessage)
      dispatch(resetPUProfileRegisterInMarriageProfileTable())
    }

    if (!isgetAllPUplansLoading && !isgetAllPUplansSuccess) {
      dispatch(getAllPUplans())
    }

      if (isactivePlanSuccess == true && ActivePlanMessage) {
      toast.success(ActivePlanMessage)
      setPlan(false);
      dispatch(resetActivePlan())
      dispatch(getAllPUplans());
      dispatch(PUExistsingPlan({}))
    }

  }, [dispatch, isPublicUserDetailLoading, isPublicUserDetailSuccess, isPUProfileRegisterSuccess, PUProfileRegisterMessage, isgetAllPUplansSuccess,isgetAllPUplansLoading,
    isactivePlanSuccess,ActivePlanMessage]);

  useEffect(() => {
    if (isPublicUserDetailSuccess && userStatus === "Pending") {
      if (fromSource === "register") {
        setStep("initial");
        setShowModal(true);
      } else if (fromSource === "login") {
        setStep("update");
        setShowModal(true);
      }
    }
  }, [isPublicUserDetailSuccess, userStatus]);

  const { alreadyExists, isGetPlanLoading, isGetPlanSuccess,planExists } = useSelector((state) => state.public)

  const [plan, setPlan] = useState(false)

  const handleBrokerClick = (id) => {
    if (userStatus === "Pending") {
      setStep("update");
      setShowModal(true);
    }

    else if(userStatus === "Deleted"){
       setShowModal(true)
    }
    
     else if ( planExists === false || alreadyExists === false) {
      setPlan(true)
    }

    else if(activeplan === true){
       setPlan(true)
    }

   else if (userStatus === "New" && planExists === true && alreadyExists === true) {
        navigate('/PUProfileList?id=' + id)
    }

  };

  const onAddProfileClick = () => {
    navigate('/PURegisterProfile', { replace: true });
  }

  const handleNextClick = () => {
    setStep("update");
  };

  const handleClose = () => {
    setShowModal(false);
  };


  const [formDat, setFormDat] = useState({
    Name: '',

  });

  const { Name } = formDat

  useEffect(() => {
    if (isPublicUserDetailSuccess == true && publicuserDetails) {
      setFormDat({
        Name: publicuserDetails.name || '',
      })
    }
  }, [publicuserDetails, isPublicUserDetailLoading, isPublicUserDetailSuccess], dispatch)


  //   const onRegisterClick = () => {
  //   dispatch (PUProfileRegisterInMarriageProfileTable({brokerId:_id}))

  // }      

  const onRegisterClick = (brokerId) => {
     if(userStatus === "Pending"){
      setShowModal(true)
    }
    else if(userStatus === "Deleted"){
       setShowModal(true)
    }

     else if(userStatus === "New"){
    dispatch(PUProfileRegisterInMarriageProfileTable({ brokerId: brokerId }));
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

  const onRefresh = () => {
    setCurrentPage(1);
    const searchData = {
      "skip": 1, "pagesize": 9
    }
    dispatch(resetfetchBrokers())
    dispatch(fetchBrokers(searchData))
    resetFilter();
  }

  const onResetClick = () => {
    resetFilter();
  }

  function resetFilter() {
    const emptyFilters =({
      name: '',
      district: '',
      matrimonyName: '',
      phoneNumber: ''
    })
    
    setFormData(emptyFilters)
    dispatch(setFilterBrokList(emptyFilters))
  }

  useEffect(() => {
    dispatch(PUExistsingPlan({}));
  }, [])


  const handleClosePlan = () => setPlan(false);

 const PublicUserId = publicuserId
  const updatPlan = () => {
    setPlan(false)
    navigate('/PUPlanSchedule?id=' + PublicUserId, { replace: true })
  }

   const showActivePlan = () => {
    dispatch(activePlan({planID:getplanName[0]._id}))
    dispatch(resetfetchBrokers())
    // dispatch(fetchBrokers(searchData))   
    // dispatch(getAllPUplans())
    // dispatch(PUExistsingPlan())
    setPlan(false)
  };

//   useEffect(() => {
//   if (planactive) {
//     setPlan(false); // auto-close if API confirms active plan
//   }
// }, [planactive]);

//   useEffect(() => {
//   if (planactive === false) {
//     setPlan(false);
//     dispatch(resetGetAllPUPlans())
//   }
// }, [planactive]);


  return (
    <>
      <div id="btnbrokerlist" >
        <div className="navbar ">
          <div> <h1>Brokers</h1>
          

          </div>
          <div className="d-flex" >
            <button className="btn btn-outline-success me-2" onClick={onRefresh} ><svg xmlns="http://www.w3.org/2000/svg" width="20" height="26" fill="currentColor" class="bi bi-arrow-clockwise" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z" />
              <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466" />
            </svg></button>
            <button className="btn btn-success me-2" type="button" style={{ backgroundColor: '#1aa179', color: "white", width: 100 }} onClick={handleToggle}>Filter</button>
          </div>
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
                <label className="font-weight-bold form-label" htmlFor="sex">District</label>
                <select value={searchData.district} onChange={onSearchchange} className="form-control border border-success" name="district" id="district" aria-label=".form-select-sm example">
                  <option value="">Select</option>
                  {((districts != null && districts.length > 0) &&

                    districts.map((district) => (
                      <option key={district._id} value={district.district}>{district.district}</option>
                    ))
                  )}
                </select>
              </div>

              <div className="form-group col-md-12 mt-3">
                <label htmlFor="name" className="form-label">Broker Name</label>
                {/* <input value={searchData.name} onChange={onSearchchange} type="text" className="form-control border border-success" name="name" id="name" placeholder="Enter name"></input> */}
             <select name="name" id="name" className="form-control border border-success" value={searchData.name} onChange={onSearchchange}>
                <option value="Select">Select</option>
                 {((brokers != null && brokers.length > 0) &&

            brokers.map((name) => (
              <option key={name._id} value={name.name}>{name.name}</option>
            ))
          )}
            </select>
              </div>

              <div className="col-md-12 mt-3">
                <label htmlFor="ageTo" className="form-label">Phone number</label>
                {/* <input type="text" value={searchData.phoneNumber} onChange={onSearchchange} className="form-control border border-success" name="phoneNumber" id="phoneNumber" placeholder="Enter Phone No"></input> */}
             <select name="phoneNumber" id="phoneNumber" className="form-control border border-success" value={searchData.phoneNumber} onChange={onSearchchange}>
                <option value="Select">Select</option>
                 {((brokers != null && brokers.length > 0) &&

            brokers.map((name) => (
              <option key={name._id} value={name.phoneNumber}>{name.phoneNumber}</option>
            ))
          )}
            </select>
              </div>

              <div className="col-md-12 mt-3">
                <label htmlFor="religion" className="form-label">Matrimony</label>
                {/* <input type="text" value={searchData.matrimonyName} onChange={onSearchchange} className="form-control border border-success" name="matrimonyName" id="matrimonyName" placeholder="Enter Matrimony"></input> */}
             <select name="matrimonyName" id="matrimonyName" className="form-control border border-success" value={searchData.matrimonyName} onChange={onSearchchange}>
                <option value="Select">Select</option>
                 {((brokers != null && brokers.length > 0) &&

            brokers.map((name) => (
              <option key={name._id} value={name.matrimonyName}>{name.matrimonyName}</option>
            ))
          )}
            </select>                
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


        <div style={{ display: 'flex', justifyContent: 'left', alignItems: 'left', marginTop: '20px' }}>
          <nav aria-label="Page navigation example">
            <ul className="pagination">
              <li className="page-item" onClick={handlePrevious} disabled={currentPage === 1}>
                <a className="page-link" style={{ backgroundColor: '#ffffff', color: '#1aa179' }} href="#" aria-label="Previous">
                  <span aria-hidden="true">&laquo;</span>
                </a>
              </li>

              {Array.from({ length: Math.min(brokerTotal, 5) }, (_, index) => {
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

              <li className="page-item" onClick={handleNext} disabled={currentPage === brokerTotal}>
                <a className="page-link" style={{ backgroundColor: '#ffffff', color: '#1aa179' }} href="#" aria-label="Next">
                  <span aria-hidden="true">&raquo;</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>

        {isfetchBrokerLoading && <div>Loading...</div>}
        {isfetchBrokerLoading && isError ? <div>Error while loading</div> : null}

        <div className="card-container">
              {(isfetchBrokerLoading) &&(
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

              )} </div>
        {!isfetchBrokerLoading && brokers? (

          <div className="container py-3" >
            <div><p>{totalRecords} records found...</p></div>
            {

              <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4" >

                {brokers.map((broker) => (
                  <div key={broker._id} className="col d-flex justify-content-center" >
                    <div className="card border border-success rounded w-100"  onClick={(e) => {
                                  e.preventDefault();
                                  handleBrokerClick(broker._id) 
                                }} style={{ maxWidth: '400px' }}>
                         <div className="row g-0">

                       {/* Image Section */}
           <div
  className="col-5 d-flex align-items-center justify-content-center p-2"
  style={{ minHeight: "150px", height: "180px", marginTop:"5%"}}
>
  <img
    className=""
    style={{
      height: "150px",
      width: "150px",
    }}
    src={brokImageList.find(item => item._id === broker._id)?.imageBase64 || maleavatar}
    alt="Profile"
  />
</div>
                        <div className="col-7">
                          <div className="card-body p-2">
                            <h5 className="text-success">
                              <a
                                href="#"
                                className="text-success text-decoration-none"
                              >
                                {broker.name}
                              </a></h5>

                            <p className="mb-1" style={{display:"none"}}><strong>{broker.oppositeGenderCount|| 0} Profiles</strong></p>
                            <p className="mb-1"><span>Matrimony Name: </span><h6>{broker.matrimonyName}</h6></p>

                            <p className="mb-1" ><span>District:</span> <h6>{broker.district}</h6></p>

                             <p className="mb-1"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#6564a1" class="bi bi-telephone-fill" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z"/>
</svg> {broker.phoneNumber} </p>
{broker.whatsAppNumber && (
<p>
<span>
  <svg style={{ marginInlineEnd: 0 }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#0c9e4bff" viewBox="0 0 16 16">
   <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/>
  </svg>  {broker.whatsAppNumber}
</span>
</p>
)}

                            {!userExists.some(profile => profile._id.toString() === broker._id.toString()) && (

                              <button className="btn btn-outline-success mb-3" style={{ width: 212 ,display:"none"}} onClick={() => { setShow(false); onRegisterClick(broker._id) }}>Register</button>
                            )}
                          </div>

                        </div>
                      </div>
                    </div>
                  </div>
                ))}


              </div>
            }
          </div>

        ) : null
        }


        <div style={{ display: 'flex', justifyContent: 'left', alignItems: 'left', marginTop: '20px' }}>
          <nav aria-label="Page navigation example">
            <ul className="pagination">
              <li className="page-item" onClick={handlePrevious} disabled={currentPage === 1}>
                <a className="page-link" style={{ backgroundColor: '#ffffff', color: '#1aa179' }} href="#" aria-label="Previous">
                  <span aria-hidden="true">&laquo;</span>
                </a>
              </li>

              {Array.from({ length: Math.min(brokerTotal, 5) }, (_, index) => {
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

              <li className="page-item" onClick={handleNext} disabled={currentPage === brokerTotal}>
                <a className="page-link" style={{ backgroundColor: '#ffffff', color: '#1aa179' }} href="#" aria-label="Next">
                  <span aria-hidden="true">&raquo;</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>


  

        <div>
          <Modal show={showModal} onHide={handleClose} style={{ marginTop: '15%' }}>
            <Modal.Header closeButton>
              <h5>Welcome {Name}!</h5>
            </Modal.Header>
            <Modal.Body>
              {step === "initial" ? (
                <div className="form-group">
                  Let's get started on your profile setup!
                </div>
              ) : (
                <>
                  <div className="form-group">
                    Update your profile to help brokers find the best matches for you!
                  </div>
                </>
              )}
            </Modal.Body>
            <Modal.Footer>
              {step === "initial" ? (
                <>
                  <Button variant="outline-dark" onClick={handleClose}>
                    Close
                  </Button>
                  <Button variant="success" onClick={handleNextClick}>
                    <strong>Next</strong>
                  </Button>
                </>

              ) : (
                <>
                  <Button variant="outline-dark" onClick={handleClose}>
                    I will do it later
                  </Button>
                  <Button variant="success" onClick={onAddProfileClick}>
                    <strong>Update Profile</strong>
                  </Button>
                </>
              )}
            </Modal.Footer>
          </Modal>

        </div>

      </div>

      <div>

        {/* <Modal show={plan} onHide={handleClosePlan} style={{ marginTop: '15%' }}>
          <Modal.Header closeButton>
            <h5>Hello {Name}!</h5>
          </Modal.Header>
  <div>
    {getplanName.map((plan) => (
      <div key={plan}>
        <p>{plan.planName}<input type="radio"></input></p>
      </div>
    ))}
  </div>
          <Modal.Body>
            <div className="form-group">
                 {alreadyExists === false
        ? "Please update your plan!"
        : planExists === false
        ? "Your plan has expired. Please update your plan!"
        : ""}
            </div>

          </Modal.Body>
          <Modal.Footer>
            <Button variant="outline-dark" onClick={handleClosePlan}>
              Cancel
            </Button>
            <Button type="submit" variant="success" onClick={updatPlan}>
              Plan update
            </Button>
          </Modal.Footer>

        </Modal> */}

         <Modal show={plan} onHide={handleClosePlan} style={{ marginTop: "15%" }}>
      <Modal.Header closeButton>
        <h5>Hello {Name}!</h5>
      </Modal.Header>

      <div>
        { getplanName && getplanName.map((plan) => (
          <div key={plan._id}>
            <p className="mt-1 ms-3">
              {plan.planName}
              <input
                type="radio"
                name="plan"
                className="mx-2"
                value={plan.planName}
                onChange={(e) => setSelectedPlan(e.target.value)} // store selection
              />
            </p>
          </div>
        ))}
      </div>

      <Modal.Body>
        <div className="form-group">
  
    {alreadyExists === false ? (
      "Please update your plan!"
    )  : planactive === true ? (
      "Your old plan is expired.Select your existing plan."
    ) : planExists === false ? (
      "Your plan has expired. Please update your plan!"
    ): null}

        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="outline-dark" onClick={handleClosePlan}>
          Cancel
        </Button>

        {/* Conditionally show button based on selectedPlan */}
        {selectedPlan === "" ? (
          <Button type="submit" variant="success" onClick={updatPlan}>
            Plan update
          </Button>
        ) : (
          <Button variant="success" onClick={showActivePlan}>
            Select Plan
          </Button>
        )}
      </Modal.Footer>
    </Modal>
 
      </div>

       {(isPUProfileRegisterleLoading ) && (

        <div className="overlay">
          <div className="loading-spinner"></div>
        </div>
      )}

    </>
  )
}