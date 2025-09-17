import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { viewplan,viewplanActive,resetviewplanActive,resetViewPlanlist,resetBalanceQuota } from "../../Features/Slices/PublicUser/publicUserSlice"
import {  useNavigate, useSearchParams } from "react-router-dom"
import { toast } from "react-toastify"


export function ViewPlan (){

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [SearchParams] = useSearchParams()
    const profileId = SearchParams.get('id')
    // const planIds = SearchParams.get('planId')
    const [selectedPlanId, setSelectedPlanId] = useState(SearchParams.get('planId') || '');
// alert(planIds)
            const { isViewPlanlistLoading, isViewPlanlistSuccess, ViewPlanlist,viewplanActiveMessage ,isviewplanActiveSuccess,
            planId } = useSelector((state) => state.public)

    useEffect(() =>{
        if(!isViewPlanlistLoading && !isViewPlanlistSuccess) {
            debugger
            dispatch(viewplan())
            
        }

        if(isViewPlanlistSuccess)
        {
          dispatch(resetViewPlanlist())
        }

        if(!isViewPlanlistSuccess && isviewplanActiveSuccess)
        {
          dispatch(resetViewPlanlist())
        }

    },[isViewPlanlistLoading,isViewPlanlistSuccess,dispatch])

   const backuButtonUrl = () => {
     navigate('/PublicUserHome')
    }

    const [planData, setPlanData] = useState({
        planID: '',
    })

    const { planID } = planData

        const onchange = (e) => {
        const selectedId = e.target.value;
        setSelectedPlanId(selectedId)
        const plan = ViewPlanlist.find(plan => plan._id === selectedId)
        if (plan) {
            setPlanData({
                planID: plan._id,  
                
            })
        }
        else {
            setPlanData('')
        }
    }

     const planUpgrade = (clickedPlanID) => {

         if (clickedPlanID !== planID) {
            return toast.error("Please click the Upgrade button on the selected plan.");
        }
        dispatch(viewplanActive({profileId,planID}))
     }

    useEffect(() =>{

        if(isviewplanActiveSuccess == true && viewplanActiveMessage) {
            toast.success(viewplanActiveMessage)
            dispatch(resetviewplanActive())
            dispatch(resetViewPlanlist())
            dispatch(resetBalanceQuota())
             navigate('/PublicUserHome', 5000)
        }

        if(isviewplanActiveSuccess == false && viewplanActiveMessage){
            toast.error(viewplanActiveMessage)
            dispatch(resetviewplanActive())
            dispatch(resetViewPlanlist())
        }
    },[isviewplanActiveSuccess,viewplanActiveMessage,dispatch])

//     const onchanges = (e) => {
//     setSelectedPlanId(e.target.value);
// };

return(<>
       
       <div>
         <div className="dropdown-item d-flex align-items-center" >
                <svg onClick={backuButtonUrl} style={{ cursor: 'pointer' }} xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="#1aa179" className="bi bi-arrow-left-circle" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z" />
                </svg>
                <p className="h6 mb-0 ms-2" onClick={backuButtonUrl} style={{ cursor: 'pointer' }}>Go Back</p>
            </div>

               <div className="container" id="dvuPlan">
                <h4 className="text-center mb-3">Select your plan</h4>
                <div className="row row-cols-1 row-cols-lg-5 g-5 g-lg-3 " style={{ justifyContent: "center" }}>
                           {(isViewPlanlistLoading) && (
                    <>
                            {/* <div className="card-skeleton col">
                                    <div className="skeleton skeleton-image"></div>
                                    <div className="skeleton skeleton-title"></div>
                                    <div className="skeleton skeleton-description"></div>
                                    <div className="skeleton skeleton-description"></div>
                                </div>
                                    <div className="card-skeleton col">
                                    <div className="skeleton skeleton-image"></div>
                                    <div className="skeleton skeleton-title"></div>
                                    <div className="skeleton skeleton-description"></div>
                                    <div className="skeleton skeleton-description"></div>
                                </div>
                                 <div className="card-skeleton col">
                                   <div className="skeleton skeleton-image"></div>
                                    <div className="skeleton skeleton-title"></div>
                                    <div className="skeleton skeleton-description"></div>
                                    <div className="skeleton skeleton-description"></div>
                                </div> */}
                    </>
                )}
                    {ViewPlanlist.map((planList, index) => (
                        <div key={index} className="col">
                            <div className="p-3 rounded Plancard">
                                <label style={{ width: "100%", cursor: "pointer" }}>
                                    <input
                                        className="text-center"
                                        type="radio"
                                        name="planID"
                                        id="planID"
                                        value={planList._id}
                                        onChange={onchange}
                                        // checked={planList._id === planIds}
                                        checked={String(planList._id) === selectedPlanId}
                                    />

                                    <div><b><h5 className="text-center">{planList.planName}</h5></b></div>
                                    <hr />

                                    <p> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#1aa179" className="bi bi-people" viewBox="0 0 16 16">
                                        <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1zm-7.978-1L7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002-.014.002zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4m3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0M6.936 9.28a6 6 0 0 0-1.23-.247A7 7 0 0 0 5 9c-4 0-5 3-5 4q0 1 1 1h4.216A2.24 2.24 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816M4.92 10A5.5 5.5 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275ZM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0m3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4" />
                                    </svg> You can view an unlimited number of profiles per day.</p>

                                    <p> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#1aa179" className="bi bi-image" viewBox="0 0 16 16">
                                        <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
                                        <path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1z" />
                                    </svg> You can view up to <strong>{planList.viewImageCountLimit}</strong> images per day.</p>

                                    <p> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#1aa179" className="bi bi-cloud-arrow-down" viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="M7.646 10.854a.5.5 0 0 0 .708 0l2-2a.5.5 0 0 0-.708-.708L8.5 9.293V5.5a.5.5 0 0 0-1 0v3.793L6.354 8.146a.5.5 0 1 0-.708.708z" />
                                        <path d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383m.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z" />
                                    </svg> You can download up to <strong>{planList.downloadCountLimit}</strong> profiles per day.
                                    </p>
                                    <hr />
                                    <div className="float-end">
                                        <button className="btn btn-success" type="submit" onClick={() => planUpgrade(planList._id)} >
                                            Active Plan
                                        </button>
                                    </div>
                                    {/* <h5>₹ {planList.planCost}</h5> */}
                                </label>
                            </div>
                        </div>
                    ))}     
                </div>
                <div className="col text-center mt-5" style={{fontSize:'80%'}}>
                    <b>Note:</b><span> Our platform is in early stages, some profiles may be under review or incomplete. Please confirm with the broker before proceeding.</span>
                </div>

            </div>
       </div>
</>)
}