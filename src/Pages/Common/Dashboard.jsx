
import {useDispatch, useSelector} from  'react-redux'
import { useEffect, useState } from "react";
import { getDashboardDetailByBrokerId } from "../../Features/Slices/dashboardSlice"
import sessionData from "../../sessionData";
import "../../scss/broker.scss"
import "../../scss/dashboard.scss"
import "../../scss/profileList.scss"
import { Link } from 'react-router-dom';
import maleavatar from '../../img/Male_avatar.svg'
import femaleavatar from '../../img/Female_avatar.svg'
import ProfilesAdded from '../../img/ProfilesAdded.svg'
import ProfilesLeftToAdd from '../../img/ProfilesLeftToAdd.svg'
import React from 'react';
import { useNavigate } from 'react-router-dom'
import { setFilters } from "../../Features/Slices/profSlice";

export function Dashboard() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const userName = sessionData.getUserData()?.name
    const dashboardInfo =
    useSelector(
        (state) => state.dash
    )

useEffect(() => {
    dispatch(getDashboardDetailByBrokerId());
}, [dispatch]);

useEffect(() => {
    dispatch(setFilters())
    
    console.log('Updated Dashboard Info:', dashboardInfo);
}, [dashboardInfo]);  // Log whenever dashboardInfo updates

const onNavigateClick = (filter) =>{
   navigate('/profileList?search='+ filter,{ replace: false })
}

    return (<>  

{( (dashboardInfo!=null && dashboardInfo.dashboardDetails !=null) &&
    <div>


        <div style={{ display: 'flex', alignItems: 'center' }}>
            <p className="h4" style={{ marginRight: '15px' }}>Welcome </p>
            <p className="h2" style={{ color: '#1aa179' }}>{userName}...</p>
        </div>
        <br/>

        <p className="h5">Profile Summary</p>

        <div className="card-container"> 
                {dashboardInfo.isDashboardLoading && ( 
                        <> 
                        
                        <div className="card-skeleton">

                        <div className="skeleton skeleton-title"></div>
                        <div className="skeleton skeleton-dashboardKPI"></div>
                        <div className="skeleton skeleton-description"></div>
                        </div>

                        <div className="card-skeleton">
                        <div className="skeleton skeleton-title"></div>
                        <div className="skeleton skeleton-dashboardKPI"></div>
                        <div className="skeleton skeleton-description"></div>
                        </div>

                        <div className="card-skeleton">
                        <div className="skeleton skeleton-title"></div>
                        <div className="skeleton skeleton-dashboardKPI"></div>
                        <div className="skeleton skeleton-description"></div>
                        </div>

                        <div className="card-skeleton">
                        <div className="skeleton skeleton-title"></div>
                        <div className="skeleton skeleton-dashboardKPI"></div>
                        <div className="skeleton skeleton-description"></div>
                        </div>

                    </>

                    ) 



            } </div>

        {dashboardInfo.isDashboardError && dashboardInfo.isError ? <div>Error while loading</div> : null}


        {dashboardInfo.isDashboardSuccess && !dashboardInfo.isDashboardLoading && (
            <>

            {/*Listing KPIs related to profile summary*/}
            <div className="container py-0" >
                {
                    <div className="container py-0" >
                        <div className="row row-cols-1 row-cols-md-4 py-3 g-3">

                            {/*Adding KPI - Total profiles*/}
                            <div  className="col" >
                                
                                                        
                                <div  className="dashboardcard">
                                    <p className="h6">Total profiles</p>                                        
                                    <div  onClick={()=>onNavigateClick("TOT-A")} className='col-md-12 '>
                                        <Link  className="custom-link-cardtitle">
                                        {dashboardInfo.dashboardDetails.totalCount}
                                        </Link>
                                    </div>
                                    <hr />

                                    <div className="row">
                                            <div  onClick={()=>onNavigateClick("TOT-M")} className="col-6 parent-container">
                                            <div>
                                                <img src={maleavatar} alt="Male Avatar" className="responsive-img-dashboard"/>
                                            </div>
                                            <Link  className="custom-link-cardbody">
                                            {dashboardInfo.dashboardDetails.totalMale}</Link>
                                            </div>

                                            <div  onClick={()=>onNavigateClick("TOT-F")} className="col-6 parent-container">
                                            <div>
                                                <img src={femaleavatar} alt="Female Avatar" className="responsive-img-dashboard"/>
                                            </div>
                                            <Link  className="custom-link-cardbody">
                                            {dashboardInfo.dashboardDetails.totalFemale} </Link>
                                            </div>
                                    </div>
                                </div>
                            </div>


                            {/*Adding KPI - Available for match*/}
                            <div  className="col" >
                                                        
                                <div  className="dashboardcard">
                                    <p className="h6">Available for match</p>                                        
                                    <div className='col-md-12' onClick={()=>onNavigateClick("AM-A")}>
                                        <Link   className="custom-link-cardtitle">
                                        {dashboardInfo.dashboardDetails.totalAvailable}</Link>
                                    </div>
                                    <hr />

                                    <div className="row">
                                            <div onClick={()=>onNavigateClick("AM-M")} className="col-6 parent-container">
                                            <div>
                                                <img src={maleavatar} alt="Male Avatar" className="responsive-img-dashboard"/>
                                            </div>
                                            <Link  className="custom-link-cardbody">
                                            {dashboardInfo.dashboardDetails.totalAvailableMale}</Link>
                                            </div>

                                            <div onClick={()=>onNavigateClick("AM-F")} className="col-6 parent-container">
                                            <div>
                                                <img src={femaleavatar} alt="Female Avatar" className="responsive-img-dashboard"/>
                                            </div>
                                            <Link to="/profileList" className="custom-link-cardbody">
                                            {dashboardInfo.dashboardDetails.totalAvailableFemale}</Link>
                                            </div>
                                    </div>
                                </div>
                            </div>


                            {/*Adding KPI - Marriage fixed - Payment Incomplete*/}
                            <div  className="col" >
                                                
                                <div  className="dashboardcard">
                                    <p className="h6">Marriage fixed - Payment Incomplete</p>                                            
                                    <div onClick={()=>onNavigateClick("MPI-A")} className='col-md-12'>
                                        <Link to="/profileList" className="custom-link-cardtitle">
                                        {dashboardInfo.dashboardDetails.totalPayIncomplete}</Link>
                                    </div>
                                    <hr />

                                    <div className="row">
                                            <div onClick={()=>onNavigateClick("MPI-M")} className="col-6 parent-container">
                                            <div>
                                                <img src={maleavatar} alt="Male Avatar" className="responsive-img-dashboard" />
                                            </div>
                                            <Link  className="custom-link-cardbody">
                                            {dashboardInfo.dashboardDetails.totalPayIncompleteMale}</Link>
                                            </div>

                                            <div onClick={()=>onNavigateClick("MPI-F")} className="col-6 parent-container">
                                            <div>
                                                <img src={femaleavatar} alt="Female Avatar" className="responsive-img-dashboard" />
                                            </div>
                                            <Link  className="custom-link-cardbody">
                                            {dashboardInfo.dashboardDetails.totalPayIncompleteFemale}</Link>
                                            </div>
                                    </div>
                                </div>
                            </div>



                            {/*Adding KPI - Marriage fixed - Payment Complete*/}
                            <div  className="col" >
                                                        
                                <div  className="dashboardcard">
                                <p className="h6">Marriage fixed - Payment Complete</p>                                            
                                    <div onClick={()=>onNavigateClick("MPC-A")} className='col-md-12'>
                                        <Link  className="custom-link-cardtitle">
                                        {dashboardInfo.dashboardDetails.totalPayComplete}</Link>
                                    </div>
                                    <hr />

                                    <div className="row">
                                            <div onClick={()=>onNavigateClick("MPC-M")} className="col-6 parent-container">
                                            <div>
                                                <img src={maleavatar} alt="Male Avatar" className="responsive-img-dashboard" />
                                            </div>
                                            <Link  className="custom-link-cardbody">
                                            {dashboardInfo.dashboardDetails.totalPayCompleteMale}</Link>
                                            </div>

                                            <div onClick={()=>onNavigateClick("MPC-F")} className="col-6 parent-container">
                                            <div>
                                                <img src={femaleavatar} alt="Female Avatar" className="responsive-img-dashboard" />
                                            </div>
                                            <Link  className="custom-link-cardbody">
                                            {dashboardInfo.dashboardDetails.totalPayCompleteFemale}</Link>
                                            </div>
                                    </div>
                                </div>
                            </div>





                        </div>
                    </div>
                }
            </div>

            </> ) }
        


        <hr />
        <br />


        <p className="h5">Match Making</p>


        <div className="card-container"> 
                {dashboardInfo.isDashboardLoading && ( 
                        <> 
                        
                        <div className="card-skeleton">

                        <div className="skeleton skeleton-title"></div>
                        <div className="skeleton skeleton-dashboardKPI"></div>
                        <div className="skeleton skeleton-description"></div>
                        </div>

                        <div className="card-skeleton">
                        <div className="skeleton skeleton-title"></div>
                        <div className="skeleton skeleton-dashboardKPI"></div>
                        <div className="skeleton skeleton-description"></div>
                        </div>

                        <div className="card-skeleton">
                        <div className="skeleton skeleton-title"></div>
                        <div className="skeleton skeleton-dashboardKPI"></div>
                        <div className="skeleton skeleton-description"></div>
                        </div>

                        <div className="card-skeleton">
                        <div className="skeleton skeleton-title"></div>
                        <div className="skeleton skeleton-dashboardKPI"></div>
                        <div className="skeleton skeleton-description"></div>
                        </div>

                    </>

                    ) 



            } </div>

        {dashboardInfo.isDashboardError && dashboardInfo.isError ? <div>Error while loading</div> : null}

        {dashboardInfo.isDashboardSuccess && !dashboardInfo.isDashboardLoading && (
            <>

            {/*Listing KPIs related to marriage getting fixed*/}
            <div className="container py-0" >
                {
                    <div className="container py-0" >
                        <div className="row row-cols-1 row-cols-md-4 py-3 g-3">

                            {/*Adding KPI - Available for match*/}
                            <div  className="col">
                                                        
                                <div  className="dashboardcard">
                                <p className="h6">Available for match</p>                                            
                                    <div onClick={()=>onNavigateClick("AM-A")} className='col-md-12'>
                                        <Link  className="custom-link-cardtitle">
                                        {dashboardInfo.dashboardDetails.totalAvailable}</Link>
                                    </div>
                                    <hr />

                                    <div className="row">
                                            <div onClick={()=>onNavigateClick("AM-M")} className="col-6 parent-container">
                                            <div>
                                                <img src={maleavatar} alt="Male Avatar" className="responsive-img-dashboard"/>
                                            </div>
                                            <Link  className="custom-link-cardbody">
                                            {dashboardInfo.dashboardDetails.totalAvailableMale}</Link>
                                            </div>

                                            <div onClick={()=>onNavigateClick("AM-F")} className="col-6 parent-container">
                                            <div>
                                                <img src={femaleavatar} alt="Female Avatar" className="responsive-img-dashboard"/>
                                            </div>
                                            <Link  className="custom-link-cardbody">
                                            {dashboardInfo.dashboardDetails.totalAvailableFemale}</Link>
                                            </div>
                                    </div>
                                </div>
                            </div>


                            {/*Adding KPI - Unmarried profiles*/}
                            <div  className="col" >
                                                        
                                <div  className="dashboardcard">
                                <p className="h6">Unmarried profiles</p>                                            
                                    <div onClick={()=>onNavigateClick("UM-A")} className='col-md-12'>
                                        <Link  className="custom-link-cardtitle">
                                        {dashboardInfo.dashboardDetails.totalUnMarriedCount}</Link>
                                    </div>
                                    <hr />

                                    <div className="row">
                                            <div onClick={()=>onNavigateClick("UM-M")} className="col-6 parent-container">
                                            <div>
                                                <img src={maleavatar} alt="Male Avatar" className="responsive-img-dashboard"/>
                                            </div>
                                            <Link  className="custom-link-cardbody">
                                            {dashboardInfo.dashboardDetails.totalUnMarriedMale}</Link>
                                            </div>

                                            <div onClick={()=>onNavigateClick("UM-F")} className="col-6 parent-container">
                                            <div>
                                                <img src={femaleavatar} alt="Female Avatar" className="responsive-img-dashboard"/>
                                            </div>
                                            <Link  className="custom-link-cardbody">
                                            {dashboardInfo.dashboardDetails.totalUnMarriedFemale}</Link>
                                            </div>
                                    </div>
                                </div>
                            </div>


                            {/*Adding KPI - Divorced/Awaiting Divorce*/}
                            <div  className="col" >
                                                        
                                <div  className="dashboardcard">
                                <p className="h6">Divorced/Awaiting Divorce</p>                                            
                                    <div onClick={()=>onNavigateClick("AD-A")} className='col-md-12'>
                                        <Link  className="custom-link-cardtitle">
                                        {dashboardInfo.dashboardDetails.totalDivorcedCount}</Link>
                                    </div>
                                    <hr />

                                    <div className="row">
                                            <div onClick={()=>onNavigateClick("AD-M")} className="col-6 parent-container">
                                            <div>
                                                <img src={maleavatar} alt="Male Avatar" className="responsive-img-dashboard" />
                                            </div>
                                            <Link  className="custom-link-cardbody">
                                            {dashboardInfo.dashboardDetails.totalDivorcedMale}</Link>
                                            </div>

                                            <div onClick={()=>onNavigateClick("AD-F")} className="col-6 parent-container">
                                            <div>
                                                <img src={femaleavatar} alt="Female Avatar" className="responsive-img-dashboard" />
                                            </div>
                                            <Link  className="custom-link-cardbody">
                                            {dashboardInfo.dashboardDetails.totalDivorcedFemale}</Link>
                                            </div>
                                    </div>
                                </div>
                            </div>



                            {/*Adding KPI - Widowed profiles*/}
                            <div  className="col" >
                                                        
                                <div  className="dashboardcard">
                                <p className="h6">Widowed profiles</p>                                            
                                    <div onClick={()=>onNavigateClick("WD-A")} className='col-md-12'>
                                        <Link  className="custom-link-cardtitle">
                                        {dashboardInfo.dashboardDetails.totalWidowCount}</Link>
                                    </div>
                                    <hr />

                                    <div className="row">
                                            <div onClick={()=>onNavigateClick("WD-M")} className="col-6 parent-container">
                                            <div>
                                                <img src={maleavatar} alt="Male Avatar" className="responsive-img-dashboard" />
                                            </div>
                                            <Link  className="custom-link-cardbody">
                                            {dashboardInfo.dashboardDetails.totalWidowMale}</Link>
                                            </div>

                                            <div onClick={()=>onNavigateClick("WD-F")} className="col-6 parent-container">
                                            <div>
                                                <img src={femaleavatar} alt="Female Avatar" className="responsive-img-dashboard" />
                                            </div>
                                            <Link  className="custom-link-cardbody">
                                            {dashboardInfo.dashboardDetails.totalWidowFemale} </Link>
                                            </div>
                                    </div>
                                </div>
                            </div>





                        </div>
                    </div>
                }
            </div>

        </> ) }


        <hr />
        <br />


        {/* <p className="h5">User information</p>


        <div className="container py-0" >
            {
                <div className="container py-0" >
                    <div className="row row-cols-1 row-cols-md-4 py-3 ">

                     
                        <div  className="col" >
                                                    
                            <div  className="dashboardcard">
                            <p className="h6">User limit</p>                                            
                                <div onClick={()=>onNavigateClick("AM-A")} className='col-md-12'>
                                    <Link  className="custom-link-cardtitle">
                                    50</Link>
                                </div>
                                <hr />

                                <div className="row">
                                        <div onClick={()=>onNavigateClick("AM-M")} className="col-6 parent-container">
                                        <div>
                                        <p className="h6">Profiles added</p> 
                                        </div>
                                        <Link  className="custom-link-cardbody">
                                        25</Link>
                                        </div>

                                        <div onClick={()=>onNavigateClick("AM-F")} className="col-6 parent-container">
                                        <div>
                                        <p className="h6">Profiles left to add</p> 
                                        </div>
                                        <Link  className="custom-link-cardbody">
                                        25</Link>
                                        </div>
                                </div>
                            </div>
                        </div>


                        
                        <div  className="col" >
                                                    
                            <div  className="dashboardcard">
                            <p className="h6">In use</p>                                            
                                <div onClick={()=>onNavigateClick("AM-A")} className='col-md-12'>
                                    <Link  className="custom-link-cardtitle">
                                    25</Link>
                                </div>
                                <hr />

                                <div className="row">
                                        <div onClick={()=>onNavigateClick("AM-M")} className="col-6 parent-container">
                                        <div>
                                        <p className="h6">Employees</p> 
                                        </div>
                                        <Link  className="custom-link-cardbody">
                                        12</Link>
                                        </div>

                                        <div onClick={()=>onNavigateClick("AM-F")} className="col-6 parent-container">
                                        <div>
                                        <p className="h6">Clients</p> 
                                        </div>
                                        <Link  className="custom-link-cardbody">
                                        13</Link>
                                        </div>
                                </div>
                            </div>
                        </div>




                    </div>
                </div>
            }
        </div> */}



    </div>

    
)}
   </>
  )
}
