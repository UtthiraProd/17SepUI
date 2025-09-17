import { useEffect, useState, useRef } from "react";
import "../../scss/login.css";
import { loginuser, reset } from "../../Features/Slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import sessionData from "../../sessionData";
import logo from "../../img/Utthira_logo.svg";
import loginCoverimage from "../../img/login_svg_cover.svg";
import internship from "../../img/internship.jpeg"
import ReCAPTCHA from "react-google-recaptcha";
import {setFilterBrokList} from "../../Features/Slices/PublicUser/publicUserSlice"
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/esm/Button";
import { isLabelWithInternallyDisabledControl } from "@testing-library/user-event/dist/utils";

export function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [captchaToken, setToken] = useState(null);
    const BROKER_USER_ROLE = "BrokerUser"
    const PUBLIC_USER_ROLE = "User"

const [isButtonDisabled, setIsButtonDisabled] = useState(true); // start disabled
const [showSpinner, setShowSpinner] = useState(true);
//  const [buttonText, setButtonText] = useState("Login");
    // Reference to the reCAPTCHA widget
    const recaptchaRef = useRef();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const { email, password } = formData;

    const onchange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const { user, isError, isSuccess, isLoading, message } = useSelector(
        (state) => state.auth
    );
     useEffect(() => {
        // Start a 60s timer on page load
        const timer = setTimeout(() => {
            setIsButtonDisabled(false); // enable button
            setShowSpinner(false)
            // setButtonText("✔️"); // show tick
        }, 5000); // 60,000ms = 1 min

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {

        if (isError) {
            toast.error(message);
        }
        if (isSuccess) {
            
            let _role = sessionData.getUserData()?.role
            // let _role = sessionData.getLocalUser()?.role
           if(_role == BROKER_USER_ROLE)
           {
            let brokerId = sessionData.getUserData()?.brokerId
            // let brokerId = sessionData.getLocalUser()?.brokerId
            navigate("/BUProfileList?id="+ brokerId, { replace: true });
           }

           else if(_role == PUBLIC_USER_ROLE)
           {
             navigate("/PublicUserBrokerList",  { state: { from: "login" } });
             dispatch(setFilterBrokList())
           }
           else
           {
            navigate("/Dashboard", { replace: true });
           }
          
        }

        dispatch(reset());
    }, [user, isError, isSuccess, isLoading, message, navigate]);

    const onSubmit = async (e) => {
        e.preventDefault(); 

      
        if (isButtonDisabled) return; // prevent click during first 1 min

        // 👉 your captcha + login logic goes here
        console.log("Login submitted ✅");
        let token = sessionData.getUserData()?.token
        // Trigger reCAPTCHA to get the token
        if (recaptchaRef.current) {
            try {
                // Execute reCAPTCHA to get the token
                const recaptchaToken = await recaptchaRef.current.execute();
                // console.log("reCAPTCHA token received:", recaptchaToken);
                setToken(recaptchaToken); // Store the token in the state

                // Proceed with submitting the form data
                if (recaptchaToken) {
                    // Prepare user data (email, password, token)
                    const userData = {
                        email,
                        password,
                        captchaToken: recaptchaToken, // Pass token here
                        token:token
                    };

                    console.log("Form data:", userData); // Log the user data for debugging

                    // Dispatch the login action
                    dispatch(loginuser(userData));
                } else {
                    toast.error("reCAPTCHA verification failed!");
                }
            } catch (error) {
                console.log("Error executing reCAPTCHA:", error);
            }
        }
    };

    const signup=()=>{
        navigate('/Registeruser',{replace:false})
    }
    const ForgotUser=()=>{
        navigate('/ForgotUser')
    }
    const ResetUser=()=>{
        navigate('/ResetUser')
    }
  const [show, setShow] = useState(true);
  const onHandleClose =() =>{
    setShow(false)
  }


    return (
        <>
            <div className="container" id="dvulogin">
                <div className="row">
                    <div className="col-md-6">
                        <div className="row">
                            <div className="app-container">
                                <img
                                    src={loginCoverimage}
                                    alt="Example"
                                    className="responsive-image"
                                />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-4">
                                <img
                                    src={logo}
                                    className="login-responsive-image"
                                    alt="Love"
                                ></img>
                            </div>

                            <div className="col-md-8 logincompanyName">
                                Utthira Marriage service
                                <br />
                                <div className="logincompanyTagline">
                                    Find your soulmate
                                    <br />
                                    <br />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6 app-container">
                        <form
                            action=""
                            onSubmit={onSubmit}
                            className="form-login text-center"
                        >
                            <input
                                type="text"
                                required
                                className="form-control mb-3"
                                name="email"
                                id="email"
                                onChange={onchange}
                                placeholder="Enter your user name/e-mail"
                            />
                            <input
                                type="password"
                                required
                                className="form-control mb-3"
                                name="password"
                                id="password"
                                onChange={onchange}
                                placeholder="Enter your password"
                            />
                            <ReCAPTCHA
                                sitekey="6LfOt60qAAAAAC7D3mqw1FwDQVGDcsWUwTX8PXXy"
                                size="invisible"
                                ref={recaptchaRef} // Add ref to the component
                            />
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "3px" }}>
            {/* Tick appears to the left of the button */}
           {/* <button
        type="submit"
        className="btn"
        disabled={isButtonDisabled}
        style={{
            backgroundColor: isButtonDisabled ? "#89bd91ff" : "#1aa179",
            color: "white",
            cursor: isButtonDisabled ? "not-allowed" : "pointer",
            padding: "5px 15px",
        }}
    >
        Login
        
    </button> */}

   <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
      <button
        type="submit"
        className="btn"
        disabled={isButtonDisabled}
        style={{
          backgroundColor: isButtonDisabled ? "#89bd91ff" : "#1aa179",
          color: "white",
          cursor: isButtonDisabled ? "not-allowed" : "pointer",
          padding: "5px 15px",
        }}
      >
        Login
      </button>

      {/* show round loader outside the button */}
      {showSpinner && (
        <span
          style={{
            border: "3px solid #f3f3f3",
            borderTop: "3px solid #1aa179",
            borderRadius: "50%",
            width: "22px",
            height: "22px",
            animation: "spin 1s linear infinite",
          }}
        ></span>
      )}

      {/* After spinner finish → show tick */}
      {!showSpinner && <span style={{ fontSize: "18px", }}>✔️</span>}
    </div>
        {/* {buttonText === "✔️" && <span style={{ color: "#1aa179", fontSize: "20px", fontWeight: "bold" }}>✔️</span>} */}
</div>
                          
                            <p>Don't You have an Account ? <a href="" onClick={signup} style={{textDecoration:"none"}}>Signup</a></p>
                            <a href="" className="mx-3" onClick={ForgotUser} style={{textDecoration:"none"}}>Forgot User ?</a>
                            <a href="" onClick={ResetUser} style={{textDecoration:"none"}}>Reset User Password</a>
                        
                        </form>
                    </div>
                </div>
                {/* <br />
                <br /> */}
                {/* <br />
                <br /> */}
            </div>
<Modal show={show} className="non-blocking-modal" keyboard={false} style={{ pointerEvents: "none" }}>
  <Modal.Header>
    <h5 style={{ fontFamily: "'Roboto', sans-serif", fontWeight: 'bold' }}>
      Explore Our Additional Internship Services for Engineering Students.!
    </h5>
    
    <button
      type="button"
      onClick={onHandleClose}
      aria-label="Close"
      style={{
        background: 'none',
        border: 'none',
        fontSize: '2.5rem',
        fontWeight: 'bold',
        color: 'red',
        cursor: 'pointer',
        padding: 0,
        lineHeight: 0,
      }}
    >
      ×
    </button>
  </Modal.Header>

  <Modal.Body style={{ pointerEvents: "auto" }}>
    <p className="btn btn-outline-success continue-btn" onClick={onHandleClose}>
      Continue to Login
    </p>
    <div className="responsive-image">
      <img src={internship} alt="Internship Poster" />
    </div>
  </Modal.Body>
</Modal>
        </>
    );
}
