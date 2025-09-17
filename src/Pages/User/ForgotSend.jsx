import { useState } from "react"
import { useNavigate } from "react-router-dom"


export function ForgotSend(){
   
    const navigate=useNavigate()

    const login=(e)=>{
        navigate('/Login')
    }


    return(<>

    <center className="mt-5" id="dvuforgotsuccess">
        <div className="container">
        <h3 className="text-success ff-italic">Verified Successfully...!!</h3><br />
         <h6 className="mx-5 text">Your Mobile OTP verified Successfully... Your Usename & email sent to your email Address..</h6><br />
         <p className="fs-6">Please go check & Login</p>
         <button type="button" className="btn btn-success pt-1" onClick={login}>Login</button>
        </div>
    
    </center>
        
    </>)

}