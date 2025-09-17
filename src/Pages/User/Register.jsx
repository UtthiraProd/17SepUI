import { useEffect, useState, useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registeruser, getRegisterUserOTP, reset, VerifyRegisterOTP, verifyRegEmailOTP, resentEmailOTP } from "../../Features/Slices/authSlice";
import { toast } from "react-toastify";
import "../../scss/register.css";
import signup from "../../img/signup.png";
import logo from "../../img/Utthira_logo.svg";
import loginCoverimage from "../../img/login_svg_cover.svg";
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import { ValidateFields } from "../../Validation/Common/fieldValidation"
import { setMinutes } from "date-fns";
var RegisterProfileValidation = require('../../Validation/Config/RegisterUser.json')

export function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [DOBDate, setDOBDate] = useState(null);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [captchaToken, setToken] = useState(null);


 

  // Reference to the reCAPTCHA widget
  const recaptchaRef = useRef();

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    sex: '',
    DOB: '',
    profileFor: '',
    district: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    otp: '',
    emailotp: '',
    terms: ''
  });

  const { name, email, sex, DOB, district, profileFor, phoneNumber, password, confirmPassword, otp, emailotp, terms } = formData;

  const formatDate = (dateTime) => {

    const date = new Date(dateTime);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(date.getDate()).padStart(2, '0');
    return `${day}/${month}/${year}`; // Format as YYYY-MM-DD

  }

  // Handle form input changes
  const onchange = (e) => {
    const { name, value } = e.target;

    let updatedData = { ...formData, [name]: value };

    if (name === "profileFor") {
      if (value === "Son" || value === "Brother") {
        updatedData.sex = "Male";
      }
      else if (value === "Daughter" || value === "Sister") {
        updatedData.sex = "Female";
      }
      else {
        updatedData.sex = ""; // Clear it for Relative, Friend, Myself
      }
    }

    setFormData(updatedData);
  };

  function backToOTP(){
    setIsOtpVisible(false)
    setFormData({
    name: '',
    sex: '',
    DOB: '',
    profileFor: '',
    district: '',
    email: '',
    phoneNumber: '',
    otp:'',
    emailotp:''
    })
     setDOBDate(null)
  }

  const { user, isError, isSuccess, isLoading, message, isSuccessMessage, isOTPLoading, isOTPSuccess, isOTPError,
    messageOTP, isVerifyLoading, isVerifySuccess, isVerifyMessage, isVerifyError, isEmailVerifyLoading, isEmailVerifySuccess, isEmailVerifyError,
    isEmailVerifyMessage, isResentOtpLoading, isResentOtpSuccess, isResentOtpError, isResentOtpMessage } = useSelector(
      (state) => state.auth
    );

  useEffect(() => {
    dispatch(reset());

    if (!isSuccessMessage && message !== '') {
      toast.error(message);
    }
    if (isSuccess) {
      toast.success(isSuccessMessage)
    }
    if (isError) {
      toast.error(message)
      return
    }
    if (isOTPError) {
      toast.error(messageOTP)
      setIsOtpVisible(false)
    }

    if (isOTPSuccess) {
      toast.success(messageOTP)
      setIsOtpVisible(true)
    }

    if (isSuccessMessage && message !== '') {
      toast.success(message);
      navigate('/PublicUserBrokerList', { state: { from: "register" } });
    }

    if (isVerifyError) {
      toast.error(isVerifyMessage)
      setIsOtpVerified(false);
    }
    if (isVerifySuccess) {
      toast.success(isVerifyMessage)
      setIsOtpVerified(true);
      setIsEmailOTPVisible(true);
    }

    if (isEmailVerifySuccess) {
      toast.success(isEmailVerifyMessage)
      setIsEmailOtpVerified(true)
    }

    if (isEmailVerifyError) {
      toast.error(isEmailVerifyMessage)
      setIsEmailOtpVerified(false)
    }

    if(isResentOtpSuccess){
      toast.success(isResentOtpMessage)
    }
    if(isResentOtpError){
      toast.error(isResentOtpMessage)
    }
  }, [user, isError, isSuccess, message, isSuccessMessage, isOTPSuccess, messageOTP, isVerifySuccess, isVerifyMessage,
    isVerifyError, isEmailVerifySuccess, isEmailVerifyError, isEmailVerifyMessage,isResentOtpSuccess,isResentOtpError,isResentOtpMessage, navigate, dispatch]);


  // Handle form submission for registration
  const [termsAccepted, setTermsAccepted] = useState(false);
  const onSubmit = async (e) => {
    e.preventDefault();

    let hasRequiredfieldValidation = false
    let hasOtherfieldValidation = false

    // const userReqFields = {
    //   password, confirmPassword
    // }

    // for (const [key, value] of Object.entries(userReqFields)) {

    //   if (value == "") {
    //     hasRequiredfieldValidation = true;
    //     return toast.error('Please create a new password..!')
    //   }
    // }

    if (!termsAccepted) {
      toast.error("Please accept the terms and conditions before continuing.");
      return;
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

          const data = {
            name,
            email,
            phoneNumber,
            password,
            confirmPassword,
            profileFor,
            sex,
            DOBDate,
            district,

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

          console.log("Form data:", data); // Log the user data for debugging

          if (!hasRequiredfieldValidation && !hasOtherfieldValidation) {
            dispatch(registeruser(data));
          }


        } else {
          toast.error("reCAPTCHA verification failed!");
        }
      } catch (error) {
        console.log("Error executing reCAPTCHA:", error);
      }
    }
  };

  // OTP section visibility and form state
  const [isVerifying, setIsVerifying] = useState(false);

  const [isOtpVisible, setIsOtpVisible] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [isemailOTPVisible, setIsEmailOTPVisible] = useState(false);
  const [isEmailOtpVerified, setIsEmailOtpVerified] = useState(false);

  //GETOTP
  const getOTP = async (e) => {
    e.preventDefault();

    let hasRequiredfieldValidation = false
    let hasOtherfieldValidation = false

    const userReqFields = { DOBDate }

    for (const [key, value] of Object.entries(userReqFields)) {

      if (!value) {
        hasRequiredfieldValidation = true;
        return toast.error("Please fill Date of Birth field..")
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
          const data = {
            name,
            profileFor,
            sex,
            DOBDate,
            district,
            email,
            phoneNumber,
            captchaToken: recaptchaToken, // Pass token here
          };

          console.log("Form data:", data); // Log the user data for debugging

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
          const calculateAge = (dobString) => {
            const today = new Date();
            const dob = new Date(dobString);
            let age = today.getFullYear() - dob.getFullYear();
            const m = today.getMonth() - dob.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
              age--;
            }
            return age;
          };

          if (sex === "Male" && calculateAge(DOBDate) < 21) {
            return toast.error("Age should be atleast 21 years old");
          }
          if (sex === "Female" && calculateAge(DOBDate) < 18) {
            return toast.error("Age should be atleast 18 years old.");
          }
          else {
            if (!hasRequiredfieldValidation && !hasOtherfieldValidation) {
              dispatch(getRegisterUserOTP(data))
            }
            // setIsOtpVisible(true); // Show OTP input field
            // setIsFormSubmitted(true)
            
          }
        }
        else {
          toast.error("reCAPTCHA verification failed!");
        }
      }
      catch (error) {
        console.log("Error executing reCAPTCHA:", error);
      }
    }
  };

  const [phoneOtp, setPhoneOtp] = useState(["", "", "", "", "", ""]);
  const [emailOtp, setEmailOtp] = useState(["", "", "", "", "", ""]);


  const handleOtpChange = (e, index, otpArraySetter, otpArray) => {
    const inputValue = e.target.value.replace(/\D/g, ""); // Only digits
    const updatedOtp = [...otpArray];

    // Handle Backspace or Delete
    if (e.nativeEvent.inputType === "deleteContentBackward") {
      updatedOtp[index] = "";
      otpArraySetter(updatedOtp);

      //Move to previous input
      const prev = e.target.previousSibling;
      if (prev && prev.tagName === "INPUT") {
        prev.focus();
      }
    }

    // Handle input
    if (inputValue) {
      updatedOtp[index] = inputValue[0]; // Use only first digit
      otpArraySetter(updatedOtp);

      // Move to next input
      const next = e.target.nextSibling;
      if (next && next.tagName === "INPUT") {
        next.focus();
      }
    }
  };

  //verifyOTP
  const verifyOTP = async (e) => {
    e.preventDefault();

    const otp = phoneOtp.join("");

    if (otp.length !== 6) {
      toast.error("Please enter all 6 digits of the OTP.");
      return;
    }

    let hasRequiredfieldValidation = false
    let hasOtherfieldValidation = false

    const userReqFields = {
      otp
    }

    for (const [key, value] of Object.entries(userReqFields)) {

      if (value == "") {
        hasRequiredfieldValidation = true;
        return toast.error('Please enter the valid OTP')
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
          const data = {
            phoneNumber,
            email,
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
            // console.log("Form datas:", data); // Log the user data for debugging
          }
          if (!hasRequiredfieldValidation && !hasOtherfieldValidation) {
            dispatch(VerifyRegisterOTP(data))
          }
        } else {
          toast.error("reCAPTCHA verification failed!");
        }
      } catch (error) {
        console.log("Error executing reCAPTCHA:", error);
      }
    }
  };

  const resentEmailOtp = async (e) => {
    e.preventDefault();

    let hasRequiredfieldValidation = false;
    let hasOtherfieldValidation = false;

    const userReqFields = { email, captchaToken };

     for (const [key, value] of Object.entries(userReqFields)) {

      if (value == "") {
        hasRequiredfieldValidation = true;
        return toast.error('Please fill the required Fileds')
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
          const data = {
            name,
            email,
            phoneNumber,
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
            // console.log("Form datas:", data); // Log the user data for debugging
          }

          if (!hasRequiredfieldValidation && !hasOtherfieldValidation) {
            dispatch(resentEmailOTP(data))
          }
        }
        else {
          toast.error("reCAPTCHA verification failed!")
        }
      }
      catch (error) {
        console.log("Error executing reCAPTCHA:", error)

      }
    }
  };

  const verifyEmailOTP = async (e) => {
    e.preventDefault();

    const emailotp = emailOtp.join("");

    if (emailotp.length !== 6) {
      toast.error("Please enter all 6 digits of the OTP.");
      return;
    }

    let hasRequiredfieldValidation = false
    let hasOtherfieldValidation = false

    const userReqFields = {
      emailotp
    }

    for (const [key, value] of Object.entries(userReqFields)) {

      if (value == "") {
        hasRequiredfieldValidation = true;
        return toast.error('Please enter the valid Email OTP')
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
          const data = {
            phoneNumber,
            email,
            emailotp,
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
            console.log("Form datas:", data); // Log the user data for debugging
          }

          if (!hasRequiredfieldValidation && !hasOtherfieldValidation) {
            dispatch(verifyRegEmailOTP(data))
          }
        } else {
          toast.error("reCAPTCHA verification failed!");
        }
      } catch (error) {
        console.log("Error executing reCAPTCHA:", error);
      }
    }
  };

  /**Select Date Format */
  const dateOfBirthOnchange = (date) => {
    setDOBDate(date)
    // if (date == "" || date == null)
    //   document.getElementById("DOB").style.borderColor = "red";
    // else
    //   document.getElementById("DOB").style.borderColor = "";
  }

  const onReset =()=>{
    setFormData({
    name: '',
    sex: '',
    DOB: '',
    profileFor: '',
    district: '',
    email: '',
    phoneNumber: '',
    })
     setDOBDate(null)
  }


  return (
    <>

      {(isOTPLoading || isVerifyLoading || isEmailVerifyLoading || isLoading) && (
        <div className="overlay">
          <div className="loading-spinner"></div>
        </div>
      )}
      <div className="page-content page-container container" id="dvuserregister">
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

              <div className="col-md-4 logincompanyName">
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



          <div className="col-md-6">
            <div className="row">
              <div className="card-body">
                <form>
                  {!isOtpVisible && !isOtpVerified && (
                    <div className="form-container">
                      <h5 className="fs-5 text-center mb-3" style={{ color: "#1aa179" }}>
                        Create your profile
                      </h5>
                      <div>
                        <hr />

                      </div>


                      <div className="row justify-content-center mb-1">
                        <div className="col-12 col-md-6 col-lg-8">
                          <label htmlFor="profileFor">This Profile is for <span style={{ color: 'red' }}><b>*</b></span></label>
                          <select
                            name="profileFor"
                            id="profileFor"
                            className="form-control"
                            onChange={onchange}
                            value={profileFor}
                          >
                            <option value="">Select</option>
                            <option value="Myself">Myself</option>
                            <option value="Daughter">Daughter</option>
                            <option value="Son">Son</option>
                            <option value="Sister">Sister</option>
                            <option value="Brother">Brother</option>
                            <option value="Relative">Relative</option>
                            <option value="Friend">Friend</option>
                          </select>
                        </div>
                      </div>

                      {(profileFor === "Myself" || profileFor === "Relative" || profileFor === "Friend") && (
                        <div className="row justify-content-center mb-1">
                          <div className="col-12 col-md-6 col-lg-8">
                            <label htmlFor="sex">Gender<span style={{ color: 'red' }}><b>*</b></span></label>
                            <select
                              name="sex"
                              id="sex"
                              className="form-control"
                              onChange={onchange}
                              value={sex}
                            >
                              <option value="">Select</option>
                              <option value="Female">Female</option>
                              <option value="Male">Male</option>
                            </select>
                          </div>
                        </div>
                      )}

                      <div className="row justify-content-center mb-1">
                        <div className="col-12 col-md-6 col-lg-8">
                          <label htmlFor="name">Name <span style={{ color: 'red' }}><b>*</b></span></label>
                          <input
                            type="text"
                            className="form-control"
                            id="name"
                            name="name"
                            placeholder="Enter Your Name"
                            onChange={onchange}
                          />
                        </div>
                      </div>

                      <div className="row justify-content-center mb-1">
                        <div className="col-6 col-md-3 col-lg-4">
                          <label htmlFor="DOB">Date of Birth <span style={{ color: 'red' }}><b>*</b>(dd/mm/yyyy)</span></label>
                          
                           <DatePicker
                            className="form-control"
                            id="DOB"
                            selected={DOBDate}
                            onChange={(date) => dateOfBirthOnchange(date)}
                            dateFormat="dd/MM/yyyy"
                            placeholderText={formatDate(new Date())}
                            //open={false}
                            yearDropdownItemNumber={50} 
                            showYearDropdown
                             scrollableYearDropdown
                              maxDate={new Date()}
                          /> 
                        
  
                        </div>
                        <div className="col-6  col-md-3 col-lg-4">
                          <label htmlFor="district">District <span style={{ color: 'red' }}><b>*</b></span></label>
                          <select
                            className="form-control"
                            name="district"
                            id="district"
                            onChange={onchange}
                          >
                            <option value="">Select</option>
                            <option value="Kanyakumari">Kanyakumari</option>
                            <option value="Tirunelveli">Tirunelveli</option>
                          </select>
                        </div>
                      </div>

                      <div className="row justify-content-center mb-1">
                        <div className="col-12 col-md-6 col-lg-8">
                          <label htmlFor="email">Email <span style={{ color: 'red' }}><b>*</b>(User name)</span></label>
                          <input
                            type="email"
                            className="form-control"
                            name="email"
                            id="email"
                            onChange={onchange}
                            placeholder="Enter your Email"
                          />
                        </div>
                      </div>

                      <div className="row justify-content-center mb-3">
                        <div className="col-12 col-md-6 col-lg-8">
                          <label htmlFor="phoneNumber">Phone Number <span style={{ color: 'red' }}><b>*</b></span></label>
                          <input
                            type="tel"
                            name="phoneNumber"
                            id="phoneNumber"
                            className="form-control"
                            onChange={onchange}
                            placeholder="Enter your Phone Number"
                          />
                        </div>
                      </div>

                      <div className="row justify-content-center mb-1">
                        <div className="col-md-6 text-center">
                          <ReCAPTCHA
                            sitekey="6LfOt60qAAAAAC7D3mqw1FwDQVGDcsWUwTX8PXXy"
                            size="invisible"
                            ref={recaptchaRef}
                          />
                          {isOTPLoading && (
                            <div className="overlay">
                              <div className="loading-spinner"></div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Button Row */}
                      <div className="row justify-content-center gap-2 gap-md-0">
                        <div className="col-12 col-md-3">
                          <button
                            type="reset"
                            onClick={onReset}
                            className="btn btn-outline-dark w-100"
                            style={{ borderColor: "#1aa179", }}
                          >
                            Reset
                          </button>
                        </div>
                        <div className="col-12 col-md-3">
                          <button
                           type="submit"
                            onClick={getOTP}
                            className="btn w-100"
                            style={{ backgroundColor: "#1aa179", color: "white" }}
                          >
                            Get OTP
                          </button>
                        </div>
                      </div>


                      <div className="d-flex justify-content-center mt-2">
                        <p>
                          Already have an account?{" "}
                          <a href="Login" className="ms-2">Login</a>
                        </p>
                      </div>
                    </div>
                  )}



                  {/* OTP Input Section */}
                  {isOtpVisible && !isOtpVerified && (
                    <>
                      <h2 className="card-title card-varify text-success text-center">OTP Verification</h2>
                      <div className="d-flex justify-content-center mb-3 mt-3">
                        {phoneOtp.map((digit, index) => (
                          <input
                            key={index}
                            type="number"
                            maxLength="1"
                            className="form-control text-center mx-1"
                            style={{ width: "30px", fontSize: "18px", padding: "2px" }}
                            value={digit}
                            onChange={(e) => handleOtpChange(e, index, setPhoneOtp, phoneOtp)}
                          />
                        ))}
                      </div>

                      <ReCAPTCHA
                        sitekey="6LfOt60qAAAAAC7D3mqw1FwDQVGDcsWUwTX8PXXy"
                        size="invisible"
                        ref={recaptchaRef}
                      />

                      <p className="text-center">
                        Don't receive the OTP?{" "}
                        <a onClick={(e) => getOTP(e)} href="#">
                          Resend
                        </a>
                      </p>
                      <div className="d-flex justify-content-center">
                        <button
                          onClick={() => backToOTP()}
                          className="btnVerify mx-2 btn btn-outline-dark broder"
                          disabled={isLoading}
                        >
                          Back
                        </button>
                        <button
                          onClick={verifyOTP}
                          className="btnVerify mx-2 btn"
                          style={{ backgroundColor: "#1aa179", color: "white" }}
                          disabled={isLoading}
                        >
                          {isVerifying ? "Verifying..." : "Verify OTP"}
                        </button>
                      </div>
                    </>
                  )}


                  {/* Email OTP Verification */}
                  {isOtpVerified && isemailOTPVisible && !isEmailOtpVerified && (
                    <>
                      <h2 className="card-title card-varify text-success text-center">Verify Email</h2>

                      <div className="d-flex justify-content-center mb-3 mt-3">
                        {emailOtp.map((digit, index) => (
                          <input
                            key={index}
                            type="number"
                            maxLength="1"
                            className="form-control text-center mx-1"
                            style={{ width: "30px", fontSize: "18px", padding: "2px" }}
                            value={digit}
                            onChange={(e) => handleOtpChange(e, index, setEmailOtp, emailOtp)}
                          />
                        ))}
                      </div>

                      <p className="text-center">
                        Don't receive the Email?
                        <a onClick={(e) => resentEmailOtp(e)} href="#">
                          Resend
                        </a>
                      </p>

                      <ReCAPTCHA
                        sitekey="6LfOt60qAAAAAC7D3mqw1FwDQVGDcsWUwTX8PXXy"
                        size="invisible"
                        ref={recaptchaRef}
                      />

                      {/* Fix typo and center buttons */}
                      <div className="d-flex justify-content-center">
                        <button
                          onClick={() => backToOTP()}
                          className="btnVerify mx-2 btn btn-outline-dark border"
                          disabled={isLoading}
                        >
                          Back
                        </button>

                        <button
                          onClick={verifyEmailOTP}
                          className="btnVerify mx-2 btn"
                          style={{ backgroundColor: "#1aa179", color: "white" }}
                          disabled={isLoading}
                        >
                          {isVerifying ? "Verifying..." : "Verify OTP"}
                        </button>
                      </div>
                    </>
                  )}


                  {isEmailOtpVerified && (
                    <div>
                      <h2 className="card-title text-success text-center card-end">Create a New Password..!</h2>

                      {/* Center content using Bootstrap flex utilities */}
                      <div className="d-flex justify-content-center">
                        <div className="col-12 col-md-6">
                          <label htmlFor="email">Email</label>
                          <input
                            type="email"
                            name="email"
                            id="email"
                            className="form-control mb-2"
                            onChange={onchange}
                            value={email}
                            disabled
                          />

                          <label htmlFor="password" className="form-label">Password</label>
                          <input
                            type="password"
                            name="password"
                            id="password"
                            className="form-control mb-2"
                            onChange={onchange}
                            placeholder="Enter Password"
                          />

                          <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                          <input
                            type="password"
                            name="confirmPassword"
                            id="confirmPassword"
                            className="form-control mb-2"
                            onChange={onchange}
                            placeholder="Confirm Password"
                          />
<p>
 <ul style={{color: "#dc3545"}}>
  <li>At least 8 characters</li>
  <li>1 uppercase letter</li>
  <li>1 lowercase letter</li>
  <li>1 number</li>
  <li>1 special character</li>
</ul>
 </p>

                          <ReCAPTCHA
                            sitekey="6LfOt60qAAAAAC7D3mqw1FwDQVGDcsWUwTX8PXXy"
                            size="invisible"
                            ref={recaptchaRef}
                          />

                          <div className="form-check mb-3">
                            <input
                              type="checkbox"
                              className="form-check-input border border-dark"
                              name="terms"
                              id="terms"
                              checked={termsAccepted}
                              onChange={(e) => setTermsAccepted(e.target.checked)}
                            />
                            <label htmlFor="terms" className="form-check-label">
                              <a href="/TermsOfUse" target="_blank">I accept terms & conditions</a>
                            </label>
                          </div>

                          {isLoading && (
                            <div className="overlay">
                              <div className="loading-spinner"></div>
                            </div>
                          )}

                          {/* Buttons centered */}
                          <div className="d-flex justify-content-center mt-3">
                            <button
                              className="btn btn-outline-dark mx-2"
                              disabled={isLoading}
                              onClick={() => backToOTP()}
                            >
                              Back
                            </button>
                            <button
                              onClick={onSubmit}
                              className="btn mx-2"
                              style={{ backgroundColor: "#1aa179", color: "white" }}
                            >
                              Register
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </form>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}
