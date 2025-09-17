import { useEffect, useState, useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getResetPasswordOTP, resetUserPassword, reset } from "../../Features/Slices/authSlice";
import { toast } from "react-toastify";
import "../../scss/resetPassword.css";
import resetpassword from "../../img/resetpassword.png";
import { Form, Overlay, Popover } from 'react-bootstrap';

import { ValidateFields } from "../../Validation/Common/fieldValidation"
var ResetPassword = require('../../Validation/Config/ResetPassword.json')



export function ResetUser() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [captchaToken, setToken] = useState(null);

  // Reference to the reCAPTCHA widget
  const recaptchaRef = useRef();
  
  // Step state to track the current step in the process
  const [step, setStep] = useState("phoneNumber");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    otp: ''
  });

  const { name, email, password, confirmPassword, otp } = formData;

  // Redux state for OTP reset and password reset
  const { isOTPResetSuccess, messageResetOTP, isOTPResetError, isSubmitResetSuccess, isSubmitResetError, messageResetSubmit } = useSelector((state) => state.auth);

  useEffect(() => {

    dispatch(reset());  
    if (isOTPResetSuccess) {
      toast.success(messageResetOTP);
      setStep("verifyOTP");
    }
    if (isOTPResetError) {
      toast.error(messageResetOTP);
      setStep("phoneNumber");
    }

    if (isSubmitResetSuccess) {
      toast.success(messageResetSubmit);
      navigate("/Login");
    }
    
    if (isSubmitResetError) {
      toast.error(messageResetSubmit);
      setStep("verifyOTP");
    }
    
    
  }, [isOTPResetSuccess,messageResetOTP,isOTPResetError,isSubmitResetSuccess,
    isSubmitResetError,messageResetSubmit,navigate,dispatch
  ]);
  
  useEffect(() => {
   dispatch(reset()); // Runs only once when component mounts
  }, [dispatch]);

  // Handle form input changes
  const onchange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };



// Submit form for resetting password
const onSubmit = async (e) => {
  e.preventDefault();

  let hasRequiredfieldValidation = false
  let hasOtherfieldValidation = false

  const ResetUserReqField ={ phoneNumber,captchaToken}
  for (const [key,value] of Object.entries(ResetUserReqField)){
    if(value === ''){
      hasRequiredfieldValidation = true;
      return toast.error("Please Fill all (*) required field")

    }
  }

  // Trigger reCAPTCHA to get the token
  if (recaptchaRef.current) {
      try {
          // Execute reCAPTCHA to get the token
          const recaptchaToken = await recaptchaRef.current.execute();
          console.log("reCAPTCHA token received:", recaptchaToken);
          setToken(recaptchaToken); // Store the token in the state

          // Proceed with submitting the form data
          if (recaptchaToken) {

              // Prepare user data 
              const userData = {
                name,
                email,
                phoneNumber,
                password,
                confirmPassword,
                otp,
                captchaToken: recaptchaToken, // Pass token here
              };

              console.log("Form data:", userData); // Log the user data for debugging
              if(hasRequiredfieldValidation === false){
                for (const [key,value] of Object.entries(userData)){
                  let arrValidation = ResetPassword.filter(ValidatePlan =>ValidatePlan.fieldName ===key)
                  for (const currentObject of arrValidation){
                    let message =ValidateFields(currentObject, value);
                    if(message !== ''){
                      hasOtherfieldValidation = true
                      toast.error(message)
                      return
                    }
                  }
                }
              }
              // Dispatch the login action
              if (!hasRequiredfieldValidation && !hasOtherfieldValidation) {
                dispatch(resetUserPassword(userData));
            }
             
          } else {
              toast.error("reCAPTCHA verification failed!");
          }
      } catch (error) {
          console.log("Error executing reCAPTCHA:", error);
      }
  }
};



// Send OTP request and transition to OTP step
const onSendOTPClick = async (e) => {
    e.preventDefault();

            let hasRequiredfieldValidation = false
            let hasOtherfieldValidation = false
    
            const ResetUserReqField ={ phoneNumber}
    
            for (const [key,value] of Object.entries(ResetUserReqField)){
              if(value === ''){
                hasRequiredfieldValidation = true;
                return toast.error("Please fill 'Phone Number'")
      
              }
            }
   
    // Trigger reCAPTCHA to get the token
    if (recaptchaRef.current) {
        try {
            // Execute reCAPTCHA to get the token
            const recaptchaToken = await recaptchaRef.current.execute();
            console.log("reCAPTCHA token received:", recaptchaToken);
            setToken(recaptchaToken); // Store the token in the state

            // Proceed with submitting the form data
            if (recaptchaToken) {
                // Prepare user data (email, password, token)
                const userData = {
                  phoneNumber,
                  captchaToken: recaptchaToken, // Pass token here
                };


                if(hasRequiredfieldValidation === false){
                  for (const [key,value] of Object.entries(userData)){
                    let arrValidation = ResetPassword.filter(ValidatePlan =>ValidatePlan.fieldName ===key)
                    for (const currentObject of arrValidation){
                      let message =ValidateFields(currentObject, value);
                      if(message !== ''){
                        hasOtherfieldValidation = true
                        toast.error(message)
                        return
                      }
                    }
                  }
                }
                // Dispatch the login action
                if (!hasRequiredfieldValidation && !hasOtherfieldValidation) {
                  dispatch(getResetPasswordOTP(userData));
              }

                console.log("Form data:", userData); // Log the user data for debugging

            } else {
                toast.error("reCAPTCHA verification failed!");
            }
        } catch (error) {
            console.log("Error executing reCAPTCHA:", error);
        }
    }
};
  

// Handle OTP verification and transition to reset password - Method is incomplete
const onVerifyOTPClick = async (e) => {
  e.preventDefault();
    if (!otp) {
      toast.error("Please enter the OTP.");
      return;
    }
    setStep("resetPassword"); 

};

const [showRequirements, setShowRequirements] = useState(false);

  return (
    <div className="page-content page-container" id="dvuserreset">
      <div className="row">
        <div className="col-md-6">
          <div className="row">
            <div className="app-container">
              <img src={resetpassword} alt="Reset Password" className="responsive-image" />
            </div>
          </div>
        </div>

        <div className="col-md-6 app-container">
          
          <div className="row">
         
          {/* Step 1: Phone Number */}
          {step === "phoneNumber" && (
            
            <form className="form-login text-center">
              <div>
              <h2>Reset Password..!</h2>
              <pre> Please enter your phone number </pre>
              <pre>to receive verification code</pre>
              </div>
            
              <input
                type="text"
                required
                className="form-control mb-3"
                name="phoneNumber"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Enter Mobile Number"
              />
              <button
                type="button"
                onClick={onSendOTPClick}
                className="btn button1"
                style={{ backgroundColor: "#1aa179", color: "white" }}
              >
                Get OTP
              </button>
              <p>Already have an account?  <a href="Login">Log in</a></p>
            </form>
          )}

          <ReCAPTCHA
              sitekey="6LfOt60qAAAAAC7D3mqw1FwDQVGDcsWUwTX8PXXy"
              size="invisible"
              ref={recaptchaRef} // Add ref to the component
          />

          {/* Step 2: OTP Verification */}
          {step === "verifyOTP" && (
            <form className="form-login text-center">
              <h2>Verify OTP</h2><br />
              <input
                type="text"
                name="otp"
                id="otp"
                value={otp}
                onChange={onchange}
                placeholder="Enter OTP"
                className="form-control mb-3 otp"
              />
               
            <p>Don't receive the OTP ? <a   onClick={(e) => onSendOTPClick(e)} href="">Resend</a></p> 
           
              <button
                type="button"
                onClick={onVerifyOTPClick}
                className="btn button2" style={{ backgroundColor: "#1aa179", color: "white" }}
              >
                Next
              </button>       
            </form>
          )}

          {/* Step 3: Reset Password */}
          {step === "resetPassword" && (
            <form className="form-login ">
              <h2>Reset Password</h2><br />
              <input
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={onchange}
                placeholder="Enter New Password"
                className="form-control mb-3"
                onFocus={() => setShowRequirements(true)}
              />

              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                value={confirmPassword}
                onChange={onchange}
                placeholder="Enter Confirm Password"
                className="form-control mb-3"
                onFocus={() => setShowRequirements(true)}
              />

              <p>Already have an account?  <a href="Login">Log in</a></p>

              {showRequirements && (
                <div style={{ marginTop: 10, paddingLeft: 20, fontSize:10}} className="text-danger">
               <p>i. At least 8 characters long & Contains at least one digit,<br />ii. Contains at least one uppercase letter,
               <br /> iii. Contains at least one lowercase letter, <br />
               iv. Contains at least one special character </p></div>
              )}
              <button
                type="button"
                onClick={onSubmit}
                className="btn button2" style={{ backgroundColor: "#1aa179", color: "white" }}
              >
                Change
              </button> 
               </form>
          )}         
        </div>
        </div>        
      </div>
    </div>

    
  );
}
