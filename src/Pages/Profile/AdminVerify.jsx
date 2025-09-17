import { useEffect, useState } from "react";
import "../../scss/broker.scss"
import { fetchBrokers, getAllBrokers, resetRegisterBroker } from "../../Features/Slices/brokSlice"
import {getAllDistricts} from "../../Features/Slices/profSlice"
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from "react-toastify"
import { Link } from "react-router-dom";
import matimage1 from '../../img/matimage1.jpg'
import maleavatar from '../../img/Male_avatar.svg'

export function AdminVerify() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [currentPage, setCurrentPage] = useState(1);
    const [startPage, setStartPage] = useState(1);

    const [searchData,setFormData] = useState({
        name:'',
        district:'',
        description:'',
        phoneNumber:''
        })

    const {name,district,description,phoneNumber} = searchData

  
    const {
        isDistrictListLoading,isDistrictListSuccess,districts} =
      useSelector(
        (state) => state.prof
      )
  



    // const brokerList = brokerList
    const {brokers,isError,isSuccess,isLoading,message,brokerImageList,brokerTotal} =
    useSelector(
      (state) => state.brok
    )

    useEffect(()=>{ 
        dispatch(fetchBrokers())

   if(!isDistrictListLoading && !isDistrictListSuccess)
     {
       dispatch(getAllDistricts())
    }

      
      },[] )

      const handleNext = () => {
        if(brokerTotal)
        {
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
  
  
          const searchData ={
            name, district, description,phoneNumber,
            "skip":page,"pagesize":10
        }
        
       // dispatch(resetProfileList())
       dispatch(fetchBrokers(searchData))
  
          //alert(page)
          //alert(currentPage)
         // dispatch(getAllProfilesByBrokerId({"brokerId":brokerId,"skip":page,"pagesize":10}))
          // You could also fetch data for the new page here
        };

        const onSearchchange = (e) => {
            setFormData((prevState)=>({
                    ...prevState,
                    [e.target.name]:e.target.value
            }))
        }

        const onSearchClick=()=>{
            const searchData ={
                name,district,description,phoneNumber,
                "skip":currentPage,"pagesize":10
            }
            
            //dispatch(resetProfileList())
            dispatch(fetchBrokers(searchData))
        }
    
       const onResetClick=()=>{
          setFormData({
            name:'',
            district:'',
            description:'',
             phoneNumber:''
            })
    
          const searchData ={
            name,district,description,phoneNumber
        }
          //dispatch(resetProfileList())
         // dispatch(searchProfile(searchData))
      }


    const onBrokerClick = (brokerId) => {
        navigate('/AdminPendingList?id='+ brokerId, { replace: true });
    }

    const onRegisterClick = (brokerId) =>{
        navigate('/AdminPendingList?id='+brokerId)
    }

     const cardStyle={
      width:"10rem"
     }
    return (
        <>
            <div id="dvbrokerlist"> 
                <h1>Broker List</h1>

                <div  className="row mb-4">
                <div className="col-md-2 col-sm-6">
                <label className="font-weight-bold form-label" htmlFor="district">District</label>
                <select value={searchData.district} onChange={onSearchchange} className={ district =='' ? "form-control": "form-select form-select-sm"} name="district" id="district"  aria-label=".form-select-sm example">
                <option value="">Select</option>
                {( (districts!=null && districts.length > 0) &&
                
                districts.map((district) => (
                <option key={district._id} value={district.district}>{district.district}</option>
                  ))
                )}
                </select>
                </div>
                <div className="col-md-2 form-group">
                <label className="font-weight-bold form-label" htmlFor="name">Broker Name</label>
                <input value={searchData.name} onChange={onSearchchange} type="text" className="form-control" name="name" id="name" placeholder="Enter name"></input>
                </div>
                <div className="col-md-2">
                <label className="font-weight-bold form-label" htmlFor="phoneNumber">Phone number</label>
                <input type="text" value={searchData.phoneNumber} onChange={onSearchchange} className="form-control" name="phonenumber" id="phonenumber" placeholder="Enter Phone No"></input>
                </div>
                <div className="col-md-2">
                <label className="font-weight-bold form-label" htmlFor="description">Matrimony</label>
                <input type="text" value={searchData.description} onChange={onSearchchange} className="form-control" name="description" id="description" placeholder="Enter Matrimony"></input>
                </div>
                <div className="col-md-2 mt-3"> 
                    <button className="secondarybutton" onClick={()=>onSearchClick()} type="submit">Search</button>
                </div>
                <div className="col-md-2 mt-3">
                    <button className="secondarybutton" onClick={()=>onResetClick()} type="submit">Reset</button>
                </div>

                </div>
                 
                

                <div>

{(brokers && !isLoading  && brokerTotal &&(brokerTotal>0)) ?(


  <nav aria-label="Page navigation example">
  <ul className="pagination" >
    <li className="page-item" onClick={handlePrevious} disabled={currentPage === 1}>
      <a className="page-link" style={{ backgroundColor: '#ffffff', color: '#1aa179' }} href="#" aria-label="Previous">
        <span aria-hidden="true">&laquo;</span>
      </a>
    </li>

    {
    
    Array.from({ length: Math.min(brokerTotal, 5) }, (_, index) => (
          <li key={startPage + index} className={`page-item ${currentPage === startPage + index ? 'active' : ''}`}>
            <button className="page-link" onClick={() => onPageChange(startPage + index)} style={{
                          backgroundColor: currentPage === startPage ? '#1aa179' : '#ffffff',
                          color: currentPage === startPage ? 'white' : '#1aa179',
                        }}>{startPage + index} </button>
          </li>
        ))
        
        }

    <li className="page-item" onClick={handleNext} disabled={currentPage === brokerTotal}>
      <a className="page-link" style={{ backgroundColor: '#ffffff', color: '#1aa179' }} href="#" aria-label="Next">
        <span aria-hidden="true">&raquo;</span>
      </a>
    </li>
  </ul>
</nav>):null}


</div>

                {isLoading && <div>Loading...</div>}
                {isLoading && isError ? <div>Error while loading</div> : null}
                {!isLoading && brokers ? (
                    <div className="container py-4" >
                        {
                            <div  className="container py-4" >
                                <div className="row row-cols-1 row-cols-md-4 py-3 ">
                                    {brokers.
                                        map((broker) => (
                                            <div key={broker._id} className="col">
                                                <div  className="card" >
                                                <div >
                                                <img  src={maleavatar} className="card-img-top" alt="..." style={cardStyle}></img>
                                                {/* /<img  className="centered-image"   src={ brokerImageList?(brokerImageList.find(item => item.brokerID === broker._id)).imageUrl:matimage1 }  alt="..."></img> */}
                                                </div>
                                                <p className="card-title text-success fs-5" >{broker.description}</p>
                                                
                                                    <div  className="card-body" >
                                                    
                                                        <p className="card-text"><span>Name: </span>{broker.name}</p>
                                                        
                                                        <p className="card-text"> <span>Contact No:</span> {broker.phoneNumber}</p>
                                                        
                                                        <a href="#" onClick={()=>onBrokerClick(broker._id)} className="btn btn-outline-success me-md-2">View profiles</a>
                                                        
                                                        <a href="#"  onClick={()=>onRegisterClick(broker._id)} className="btn btn-success" >Pending </a>
                                                        
                                                        <span class="position-absolute top-80 start-80 translate-middle badge rounded-pill bg-danger">
                                                         99+
                                                        <span class="visually-hidden">unread messages</span>
                                                        </span>
                                                        

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

{(brokers && !isLoading  && brokerTotal &&(brokerTotal>0)) ?(


  <nav aria-label="Page navigation example">
  <ul className="pagination" >
    <li className="page-item" onClick={handlePrevious} disabled={currentPage === 1}>
      <a className="page-link" style={{ backgroundColor: '#ffffff', color: '#1aa179' }} href="#" aria-label="Previous">
        <span aria-hidden="true">&laquo;</span>
      </a>
    </li>

    {
    
    Array.from({ length: Math.min(brokerTotal, 5) }, (_, index) => (
          <li key={startPage + index} className={`page-item ${currentPage === startPage + index ? 'active' : ''}`}>
            <button className="page-link"  onClick={() => onPageChange(startPage + index)} style={{
                          backgroundColor: currentPage === startPage ? '#1aa179' : '#ffffff',
                          color: currentPage === startPage ? 'white' : '#1aa179',
                        }}>{startPage + index}</button>
          </li>
        ))
        
        }

    <li className="page-item" onClick={handleNext} disabled={currentPage === brokerTotal}>
      <a className="page-link" style={{ backgroundColor: '#ffffff', color: '#1aa179' }}href="#" aria-label="Next">
        <span aria-hidden="true">&raquo;</span>
      </a>
    </li>
  </ul>
</nav>):null}


</div>
            </div>
        </>
    )
}