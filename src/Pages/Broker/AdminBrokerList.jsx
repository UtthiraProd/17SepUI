
import { useEffect, useState } from "react";
import "../../scss/broker.css"
import { fetchBrokers, getAllBrokers, resetRegisterBroker } from "../../Features/Slices/brokSlice"
import { getAllDistricts, resetProfileList, searchProfile } from "../../Features/Slices/profSlice"
import { adminGetBrokerByID } from "../../Features/Slices/adminBrokerSlice"
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from "react-toastify"
import { Link } from "react-router-dom";
import matimage1 from '../../img/matimage1.jpg'
import maleavatar from '../../img/Male_avatar.svg'



export function AdminBrokerList() {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [currentPage, setCurrentPage] = useState(1);
  const [startPage, setStartPage] = useState(1);

  const [searchData, setFormData] = useState({
    name: '',
    district: '',
    matrimonyName: '',
    phoneNumber: '',
  })

  const { name, district, matrimonyName, phoneNumber } = searchData


  const {
    isDistrictListLoading, isDistrictListSuccess, districts } =useSelector((state) => state.prof)

  // const brokerList = brokerList
  const { brokers, isError, isSuccess, isLoading, message, brokerImageList, brokerTotal, isfetchBrokerLoading, isfetchBrokerSuccess } =
    useSelector(
      (state) => state.brok
    )

  useEffect(() => {
    const searchData = {
      name, district, matrimonyName, phoneNumber,
      "skip": currentPage, "pagesize": 9
    }
    dispatch(fetchBrokers(searchData))

    if (!isDistrictListLoading && !isDistrictListSuccess) {
      dispatch(getAllDistricts())
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

    // dispatch(resetProfileList())
    dispatch(fetchBrokers(searchData))

    //alert(page)
    //alert(currentPage)
    // dispatch(getAllProfilesByBrokerId({"brokerId":brokerId,"skip":page,"pagesize":10}))
    // You could also fetch data for the new page here
  };

  const onSearchchange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const onSearchClick = () => {
    const searchData = {
      name, district, matrimonyName, phoneNumber,
      "skip": currentPage, "pagesize": 9
    }

    //dispatch(resetProfileList())
    dispatch(fetchBrokers(searchData))
  }

  const onResetClick = () => {
    setFormData({
      name: '',
      district: '',
      matrimonyName: '',
      phoneNumber: ''
    })

    // const searchData = {
    //   name, district, matrimonyName, phoneNumber
    // }
    dispatch(fetchBrokers())
    //  dispatch(searchProfile(searchData))
  }


  const onBrokerClick = (brokerId) => {
    navigate('/BrokerDetails?id=' + brokerId, { replace: true });
  }

  const onRegisterClick = (brokerId) => {
    navigate('/RegisterProfile?id=' + brokerId)
  }

  const cardStyle = {
    width: "10rem"
  }

  const onclickAddBroker = () => {
    navigate('/registerbroker')
  }

  return (
    <>
      <div id="btnbrokerlist">
        <div className="navbar ">
          <div> <h1>Brokers</h1>
          </div>
          <button className="float-end  btn btn-success" type="submit " onClick={onclickAddBroker}>Add Broker</button>
        </div>


        <div className="row mb-4">
          <div className="col-md-2 col-sm-6">
            <label className="font-weight-bold form-label " htmlFor="district">District</label>
            <select value={searchData.district} onChange={onSearchchange} className="form-control border border-success" name="district" id="district" aria-label=".form-select-sm example">
              <option value="">Select</option>
              {((districts != null && districts.length > 0) &&

                districts.map((district) => (
                  <option key={district._id} value={district.district}>{district.district}</option>
                ))
              )}
            </select>
          </div>
          <div className="col-md-2 form-group">
            <label className="font-weight-bold form-label" htmlFor="name">Broker Name</label>
            <input value={searchData.name} onChange={onSearchchange} type="text" className="form-control border border-success" name="name" id="name" placeholder="Enter name"></input>
          </div>
          <div className="col-md-2">
            <label className="font-weight-bold form-label" htmlFor="phoneNumber">Phone number</label>
            <input type="text" value={searchData.phoneNumber} onChange={onSearchchange} className="form-control border border-success" name="phoneNumber" id="phoneNumber" placeholder="Enter Phone No"></input>
          </div>
          <div className="col-md-2">
            <label className="font-weight-bold form-label" htmlFor="matrimonyName">Matrimony</label>
            <input type="text" value={searchData.matrimonyName} onChange={onSearchchange} className="form-control border border-success" name="matrimonyName" id="matrimonyName" placeholder="Enter Matrimony"></input>
          </div>
          <div className="col-md-2 mt-4">
            <button className="btn btn-outline-success  btn1" onClick={() => onSearchClick()} type="submit">Search Broker</button>
          </div>
          <div className="col-md-2 mt-4">
            <button className="btn btn-outline-success btn2" onClick={() => onResetClick()} type="submit">Reset Filters</button>
          </div>


        </div>



        <div>

          {(brokers && !isLoading && brokerTotal && (brokerTotal > 0)) ? (


            <nav aria-label="Page navigation example">
              <ul className="pagination" >
                <li className="page-item" onClick={handlePrevious} disabled={currentPage === 1}>
                  <a className="page-link" style={{ backgroundColor: '#ffffff', color: '#1aa179' }} href="#" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                  </a>
                </li>

                {

                  Array.from({ length: Math.min(brokerTotal, 5) }, (_, index) => {
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

                <li className="page-item" onClick={handleNext} disabled={currentPage === brokerTotal}>
                  <a className="page-link" style={{ backgroundColor: '#ffffff', color: '#1aa179' }} href="#" aria-label="Previous">
                    <span aria-hidden="true">&raquo;</span>
                  </a>
                </li>
              </ul>
            </nav>) : null}


        </div>

        {isLoading && <div>Loading...</div>}
        {isLoading && isError ? <div>Error while loading</div> : null}
        {!isLoading && brokers ? (

          <div className="container py-3" >
            {

              <div className="row row-cols-1 row-cols-md-3 py-3 " >

                {brokers.map((broker) => (
                  <div key={broker._id} className="col-md-4 mb-4 " >
                    <div className="border border-dark rounded p-2" style={{ width: '400px', height: '210px' }} >
                      <div className="row ps-3 g-2">

                        <div className="col-4 pb-4">

                          <img
                            src={(brokerImageList.find(item => item.brokerId === broker._id).imageUrl || maleavatar) }
                            alt="broker"
                            style={{ width: 225 }}
                            className="rounded"
                          />
                        </div>
                        <div className="col pb-4">
                          <div className="card-body">
                            <h4>     <a href="" onClick={() =>
                              onBrokerClick(broker._id)} className=" text-success text-decoration-none">{broker.name}</a></h4>
                            <p className="card-text"><span>Matrimony Name: </span><h6>{broker.matrimonyName}</h6>
                            </p>
                            <p className="card-text " ><span>District:</span> <h6>{broker.district}</h6>

                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>  
                ))}


              </div>
            }
          </div>
          // {/* <div className="container">
          //   <div className="row">
          //     {brokers.map((broker) => (
          //       <div key={broker._id} className="col-md-4 mb-4">
          //         <div className="border border-dark rounded p-3" style={{ height: '200px' }}>
          //           <div className="row ">
          //             <div className="col-4 ms-3 g-2">
          //               <img src={maleavatar} alt="avatar" className="img-fluid" />
          //             </div>
          //             <div className="col ms-5 g-2">
          //               <div className="card-body p-0">
          //                 <h4>
          //                   <a
          //                     href="#"
          //                     onClick={() => onBrokerClick(broker._id)}
          //                     className="text-success text-decoration-none"
          //                   >
          //                     {broker.name}
          //                   </a>
          //                 </h4>
          //                 <p className="card-text mb-1">
          //                   <strong>Matrimony Name:</strong> <br />
          //                   <span>{broker.description}</span>
          //                 </p>
          //                 <p className="card-text mb-0">
          //                   <strong>District:</strong> <br />
          //                   <span>{broker.district}</span>
          //                 </p>
          //               </div>
          //             </div>
          //           </div>
          //         </div>
          //       </div>
          //     ))}
          //   </div>
          // </div> */}

        ) : null
        }
        <div>

          {(brokers && !isLoading && brokerTotal && (brokerTotal > 0)) ? (


            <nav aria-label="Page navigation example">
              <ul className="pagination" >
                <li className="page-item" onClick={handlePrevious} disabled={currentPage === 1}>
                  <a className="page-link" style={{ backgroundColor: '#ffffff', color: '#1aa179' }} href="#" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                  </a>
                </li>

                {

                  Array.from({ length: Math.min(brokerTotal, 5) }, (_, index) => {
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

                <li className="page-item" onClick={handleNext} disabled={currentPage === brokerTotal}>
                  <a className="page-link" style={{ backgroundColor: '#ffffff', color: '#1aa179' }} href="#" aria-label="Previous">
                    <span aria-hidden="true">&raquo;</span>
                  </a>
                </li>
              </ul>
            </nav>) : null}


        </div>
      </div>
    </>
  )
}