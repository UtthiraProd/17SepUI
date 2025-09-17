import React from 'react';
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { getUserMenuDetailsById,logoutTrue ,loginuser} from "../../Features/Slices/authSlice"
import { useEffect,useState } from "react";
import { useNavigate ,useSearchParams} from 'react-router-dom'
// import logo from '../../img/UthiraLogo.svg'
import logo from '../../img/UtthiraLogo.png'
import logout from '../../img/logout.jpg'
import sessionData from "../../sessionData";
import "../../scss/login.css"
export function NavBar() {

   const [searchParams] = useSearchParams();
   const id = searchParams.get('id');

  const dispatch = useDispatch()
  const navigate = useNavigate();
  const nabBar =
    useSelector(
      (state) => state.auth
    )
   
    //nabBar =[]
   // dispatch(getUserMenuDetailsById())
  useEffect(() => {

    
    dispatch(getUserMenuDetailsById())

    // if(nabBar.isLoading == false && nabBar.isSuccess == false){
    //   dispatch(loginuser())
    // }
    
  }, [])

  const onLogoutClick = () =>{

    const logout ={_id:nabBar.logout,isLoggedin:false}
    dispatch(logoutTrue(logout));

    sessionStorage["user"] = ""
    sessionStorage["timer"] = ""
    localStorage["User"] = ""
    localStorage["timer"] = ""

    navigate('/')

}


  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
    <div className="container-fluid">
      <a className="navbar-brand" href="#">
        <img src={logo} className="logoimage" alt="Love" />
      </a>
  
      <Link to="/Dashboard" style={{ color: "#1aa179", fontSize: 20, fontWeight: "bold" }} className="nav-link active" aria-current="page">
      Utthira™
      </Link>
  
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
  
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mx-auto mb-2 mb-lg-0 justify-content-center">
          {
            nabBar.menuItems && nabBar.menuItems.menuDetails
              ? nabBar.menuItems.menuDetails.map((menu) => (
                  menu.menuLink !== "" ? (
                    <li className="nav-item" key={menu.menuName + menu.menuLink}>
                      <Link to={menu.menuLink} className={`nav-link ${window.location.pathname === menu.menuLink ? 'active' : ''}`} aria-current="page">
                        {menu.menuName}
                      </Link>
                    </li>
                  ) : (
                    menu.subMenu ? (
                      <li className="nav-item dropdown" key={menu.menuName + menu.menuLink}>
                        <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                          {menu.menuName}
                        </a>
                        <ul className="dropdown-menu">
                          {menu.subMenu.map((submenu) => (
                            <li key={submenu.menuName + submenu.menuLink}>
                              <Link to={submenu.menuLink} className="dropdown-item">
                                {submenu.menuName}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </li>
                    ) : null
                  )
                ))
              : null
          }
        </ul>
      </div>
      
      {(sessionData!=undefined && sessionData!=null) && (
<div style={{ color: "#1aa179", fontSize: 20, fontWeight: "bold" }}>         Welcome { }
       <span>{sessionData?.getUserData()?.name}</span> </div>)}

      <button onClick={onLogoutClick} className="btn-transparent">
        {/* Bootstrap icon for sign-out */}
        <i className="bi bi-box-arrow-right" style={{ color: "#1aa179", fontSize: 20, fontWeight: "bold" }}></i>
 Log Out
      </button>


    </div>
  </nav>
  )
}