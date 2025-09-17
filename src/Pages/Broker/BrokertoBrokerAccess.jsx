import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getBrokerToBroker,adminAssignBrokertoBroker,getallBrokerName, resetBrokertoBroker} from "../../Features/Slices/adminBrokerSlice"
import { use } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import maleavatar from '../../img/Male_avatar.svg'
import { toast } from "react-toastify";




export function BrokertoBrokerAccess () {
    const navigate =useNavigate()
        const [searchParams] = useSearchParams();
        const brokerId = searchParams.get('id')
        // alert(brokerId)
        const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [startPage, setStartPage] = useState(1);

const [searchData,setFormData]=useState({
      name: '',
    matrimonyName: '',
    phoneNumber: '',
})
const [selectedBrokerIds, setSelectedBrokerIds] = useState([]);
const {name, matrimonyName, phoneNumber} =searchData

const onSearchchange =(e)=>{
    setFormData((prevState)=>({
        ...prevState,[e.target.name]:e.target.value
    }))
}    


   const { BrokerToBroker,brokerTotal, isBrokertoBrokerLoading, isBrokertoBrokerSuccess,selectedBrokerIdList,brokImageList } = useSelector((state) => state.admin)
  const { brokers} =
    useSelector(
      (state) => state.brok
    )

    useEffect(() => {
        if (isBrokertoBrokerLoading === false && isBrokertoBrokerSuccess === false) {
            dispatch(getBrokerToBroker({brokerId:brokerId}))
            dispatch(resetBrokertoBroker())
        }
        if (isBrokertoBrokerLoading === false && isBrokertoBrokerSuccess === true) {

             let onlyIds=[]
             
  selectedBrokerIdList.map((num, index) => (
    onlyIds.push(num)
    ))

  setSelectedBrokerIds(onlyIds);
        }


    }, [isBrokertoBrokerLoading, isBrokertoBrokerSuccess,selectedBrokerIdList],dispatch)

    useEffect(()=>{
        const searchData={brokerId,
        name, matrimonyName, phoneNumber,"skip": currentPage, "pagesize": 6
        }
        dispatch(getBrokerToBroker({brokerId:brokerId,searchData}))
            dispatch(resetBrokertoBroker())
    }, [dispatch])    
   
const onSearchClick =()=>{
  setCurrentPage(1)
  const searchData ={brokerId,
  name, matrimonyName, phoneNumber,
  }
  dispatch(getBrokerToBroker(searchData))
}


const handleChange = (e, BrokerId) => {
  const isChecked = e.target.checked;

  if (isChecked) {
    setSelectedBrokerIds(prev => [...prev, BrokerId]);
    dispatch({ type: 'SELECT_BROKER', payload: BrokerId });
  } else {
    setSelectedBrokerIds(prev => prev.filter(id => id !== BrokerId));
    dispatch({ type: 'DESELECT_BROKER', payload: BrokerId });
  }

  dispatch(adminAssignBrokertoBroker({brokerId:brokerId,brokID:BrokerId}))
};
    const onResetClick =()=>{
      setFormData({
        name:'',
        matrimonyName:'',
        phoneNumber:''
      })
      dispatch(getBrokerToBroker({brokerId:brokerId}))
      dispatch(resetBrokertoBroker())

    }

  const handleNext = () => {
    if (brokerTotal) {
      if (currentPage < brokerTotal) {
        onPageChange(currentPage + 1);
        if (currentPage >= startPage + 4) {
          setStartPage(startPage + 1);
        }
      }
    }
    // dispatch(getBrokerToBroker({brokerId:brokerId}))
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
      if (currentPage <= startPage) {
        setStartPage(startPage - 1);
      }
    }
      //     dispatch(getBrokerToBroker({brokerId:brokerId}))
      // dispatch(resetBrokertoBroker())
  };

    const onPageChange = (page) => {
    setCurrentPage(page);


    const searchData = {brokerId,
      name, matrimonyName, phoneNumber,
      "skip": page, "pagesize": 6
    }
   dispatch(getBrokerToBroker(searchData))
  }

    const backclick =(e)=>{
        e.preventDefault();
        navigate('/BrokerDetails?id='+ brokerId)
    }

    
return (<>

    <Link onClick={backclick} className="dropdown-item  d-flex text-decoration-none">
<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#189f45ff" class="bi bi-house-fill" viewBox="0 0 16 16">
  <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L8 2.207l6.646 6.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293z"/>
  <path d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293z"/>
</svg><p className="h4 mt-1 ms-2">Go Back</p></Link>

        <br /><br /> 
        <div className="navbar" id="">
           <div className="col-md-2 form-group">
            <label className="font-weight-bold form-label" htmlFor="name">Broker Name</label>
             <select name="name" id="name" className="form-control border border-success" value={searchData.name} onChange={onSearchchange}>
                <option value="Select">Select</option>
                 {((brokers != null && brokers.length > 0) &&

            brokers.map((name) => (
              <option key={name._id} value={name.name}>{name.name}</option>
            ))
          )}
            </select>
           
          </div>
                     <div className="col-md-2 form-group">
            <label className="font-weight-bold form-label" htmlFor="name">Matrimony</label>
            <select name="matrimonyName" id="matrimonyName" className="form-control border border-success" value={searchData.matrimonyName} onChange={onSearchchange}>
                <option value="Select">Select</option>
                 {((brokers != null && brokers.length > 0) &&

            brokers.map((name) => (
              <option key={name._id} value={name.matrimonyName}>{name.matrimonyName}</option>
            ))
          )}
            </select>
          </div>
                     <div className="col-md-2 form-group">
            <label className="font-weight-bold form-label" htmlFor="name">Phone Number  </label>
           <select name="phoneNumber" id="phoneNumber" className="form-control border border-success" value={searchData.phoneNumber} onChange={onSearchchange}>
                <option value="Select">Select</option>
                 {((brokers != null && brokers.length > 0) &&

            brokers.map((name) => (
              <option key={name._id} value={name.phoneNumber}>{name.phoneNumber}</option>
            ))
          )}
            </select>
          </div>
                    {/* <div className="col-md-2 form-group">
          <label className="font-weight-bold form-label me-3" htmlFor="name">Checked</label> 
                 <input type="checkbox" className="mt-5" style={{width:20,height:20,display:"none"}} placeholder=""></input>

          </div>  */}
          <div className="col-md-2 mt-3">
          <button className="btn  btn-outline-success button1" type="submit" onClick={() => onSearchClick()} >Search</button></div>
              <div className="col-md-2 mt-3">
          <button className=" btn  btn-outline-success button1" type="button" onClick={()=>onResetClick()}>Reset</button></div>      
          </div>
        <br />
        <div>

       


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
            </nav>


        </div>

        <div className="container ms-4">
        <div className="row rows-col-12 rows-col-md-3">
                    {BrokerToBroker.map((broker) =>(
                  <div className="col-md-4 mb-4 " >
                        
                    <div className="border border-success rounded-2 " style={{ width: '400px', height: '200px' }} key={broker._id}>
                        <div className="card-body ">
                            <div className="row g-3" >
                                <div className="col-5" style={{width: '150px',height: '170px',alignItems: 'center',justifyContent: 'center',overflow: 'hidden'}}>
                                    {/* <img src={maleavatar} alt='broker' /> */}
                                      <img  style={{height: "150px",width: "150px", borderRadius: '4px'}}
    src={brokImageList.find(item => item._id === broker._id)?.imageBase64 || maleavatar}
    alt="Profile"
  />
                                </div>
                                <div className="col"> <h5 >{broker.name} <div className="float-end">
                                   <input type="checkbox"  style={{width:20,height:20}}   checked={selectedBrokerIds.includes(broker._id)}
              onChange={(e) => handleChange(e, broker._id)}  /> </div></h5>
                              <span>Matrimony Name: </span><h6>{broker.matrimonyName}</h6>
                            
                             <span> District: </span><h6>{broker.district}</h6>
                             <span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#0d6f72ff" class="bi bi-telephone-fill" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z"/>
</svg> {broker.phoneNumber }</span>
                            </div>
                            </div>
                           
                            </div>  
                              </div>
                              </div>
                    ) )}
                </div></div>

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
            </nav>



</>)
}
