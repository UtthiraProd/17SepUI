import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getForgotUserOTP, forgotUser, reset } from '../../Features/Slices/authSlice';
import Forgotuser from "../../img/Forgot-user.png";
import ReCAPTCHA from "react-google-recaptcha";
import { ValidateFields } from "../../Validation/Common/fieldValidation"
var RegisterProfileValidation = require('../../Validation/Config/ForgotUser.json')

export function ForgotUser() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [captchaToken, setToken] = useState(null);

  // Reference to the reCAPTCHA widget
  const recaptchaRef = useRef();
  
  const [formData, setFormData] = useState({
    phoneNumber: "",
    otp: "",
  });
  const [otpSent, setOtpSent] = useState(false);  // Track OTP sent state

  const { phoneNumber, otp } = formData;

  const { isLoading, isSuccess, isError, ismessage,isForgotUserLoading,
    isForgotUserError,isForgotUserMessage,isForgotUserSuccess
   } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(ismessage);
      setOtpSent(false);
    }
    if(isSuccess){
      toast.success(ismessage)
      setOtpSent(true)
    }
   if(isForgotUserError){
       toast.error(isForgotUserMessage)
   }
  
    if (isForgotUserSuccess) {
      toast.success(isForgotUserMessage);
      navigate("/SentSuccess", { replace: true });
    }
    dispatch(reset());

    }, [isError, isSuccess, ismessage,isForgotUserError,isForgotUserMessage,isForgotUserSuccess,
     dispatch, navigate]); // Add otpSent as a dependency
  

  const onchange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };


const requestOtp = async (e) => {
    e.preventDefault();

    let hasRequiredfieldValidation = false
    let hasOtherfieldValidation = false

    const userReqFields = {
      phoneNumber
    }

    for (const [key, value] of Object.entries(userReqFields)) {

      if (value == "") {
        hasRequiredfieldValidation = true;
        return toast.error('Please fill Phone Number')
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

                if (hasRequiredfieldValidation == false) {
                  for (const [key, value] of Object.entries(userData)) {
                    let arrValidation = RegisterProfileValidation.filter(validateprofile => validateprofile.fieldName === key)
                    for (const currentObject of arrValidation) {
                      let message = ValidateFields(currentObject, value);
                      if (message != '') {
                        hasOtherfieldValidation = true
                        toast.error(message)
                        return
                      }
                    }
                  }
                }

                // Dispatch sendOtp to request OTP
                if (!hasRequiredfieldValidation && !hasOtherfieldValidation){
                dispatch(getForgotUserOTP(userData));  
                setOtpSent(true);}

            } else {
                toast.error("reCAPTCHA verification failed!");
            }
        } catch (error) {
            console.log("Error executing reCAPTCHA:", error);
        }
    }
};


const verifyOtp = async (e) => {
  e.preventDefault();

  let hasRequiredfieldValidation = false
  let hasOtherfieldValidation = false

  const userReqFields = {
    phoneNumber,otp
  }

  for (const [key, value] of Object.entries(userReqFields)) {

    if (value == "") {
      hasRequiredfieldValidation = true;
      return toast.error('Please fill all (*)required field')
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
              const data = {
                phoneNumber,
                otp,
                captchaToken: recaptchaToken, // Pass token here
              };

              if (hasRequiredfieldValidation == false) {
                for (const [key, value] of Object.entries(data)) {
                  let arrValidation = RegisterProfileValidation.filter(validateprofile => validateprofile.fieldName === key)
                  for (const currentObject of arrValidation) {
                    let message = ValidateFields(currentObject, value);
                    if (message != '') {
                      hasOtherfieldValidation = true
                      toast.error(message)
                      return
                    }
                  }
                }
              }
              
              if (!hasRequiredfieldValidation && !hasOtherfieldValidation){
              dispatch(forgotUser(data));}
               
          } else {
              toast.error("reCAPTCHA verification failed!");
          }
      } catch (error) {
          console.log("Error executing reCAPTCHA:", error);
      }
  }
};

  

  return (
    <div className="container" id="dvuforgotuser">
      <div className="row">
        <div className="col-md-6">
          <div className="app-container">
            <img src={Forgotuser} alt="Reset Password" className="responsive-image" />
          </div>
        </div>
        <div className="col-md-6" id="forgot">
          <div className="app-container">
            <form className="mt-5">
              <h3>Forgot Your Username?</h3>
              <p>Enter your Phone Number below to continue</p>

              {/* Phone Number input */}
              <div className="form-group col-12">
                <input
                  type="text"
                  name="phoneNumber"
                  placeholder="Enter your Phone Number"
                  className="form-control"
                  required
                  value={phoneNumber}
                  onChange={onchange}
                />
                {/* Already have an account? <a href="Login" className="mx-4">Log in</a> */}
              </div>

              <ReCAPTCHA
                  sitekey="6LfOt60qAAAAAC7D3mqw1FwDQVGDcsWUwTX8PXXy"
                  size="invisible"
                  ref={recaptchaRef} // Add ref to the component
              />
              
              {/* OTP input after OTP is sent */}
              {otpSent && (
                <div className="col-12">
                  <input
                    type="text"
                    name="otp"
                    placeholder="Enter your OTP"
                    className="form-control"
                    required
                    value={otp}
                    onChange={onchange}
                  />
                  <p>Don't receive the OTP ? <a onClick={(e) => requestOtp(e)} href="">Resend</a></p> 
                </div>
                
              
              )}
              
              {/* <br /> */}
              {/* Conditional buttons */}
              {!otpSent ? (
                <button className="btn" style={{ backgroundColor: "#1aa179", color: "white" }} onClick={requestOtp}>
                  {"Send"}
                </button>
              ) : (
                <button className="btn" style={{ backgroundColor: "#1aa179", color: "white" }} type="submit" onClick={verifyOtp}>
                  {"Submit"}
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
