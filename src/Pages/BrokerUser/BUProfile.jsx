import { Carousal } from "../Common/Carousal"
import "../../scss/publicProfile.scss"
import { useEffect, useState } from "react";
import {resetdeleteProfile, getProfileDetailsById,
   getbrokerDetailsById, getProfileImageUrl, getBrokerUserProfileViewedImageUrl,
   resetGetProfileImageUrl,getProfileHoroscopeDetailsById, userFind, 
   resetProfileHoroscopeDetailsById,resetMessage} from "../../Features/Slices/profSlice"
import { useDispatch, useSelector } from 'react-redux'
import { replace, useNavigate } from 'react-router-dom'
import { useLocation, useSearchParams } from 'react-router-dom'
import { Link } from "react-router-dom";
import { toast } from "react-toastify"

//importing pdfmake to generate our PDF file
import pdfMake from "pdfmake/build/pdfmake"
//importing the fonts whichever present inside vfs_fonts file
import pdfFonts from "pdfmake/build/vfs_fonts"
//importing the encoded font file into our project
import tamilFont from './TamilFontBase64'
import "../../scss/profileList.scss"
import { ValidateFields } from "../../Validation/Common/fieldValidation"

import { userLoginCreate, resetUserLoginCreate, getBrokerUserOTP, resetGetUserLoginOtp, brokerUserOTPVerify, resetBrokerUserOtpVerify
} from "../../Features/Slices/userProfileSlice";


import { formatToTwoDigits,formatDateDayMonthYear ,returnEmptyIfNull} from '../../Utils/formatters'

var RegisterProfileValidation = require('../../Validation/Config/RegisterUser.json')
// import "./pdfmake.scss"
//Making use of all the fonts defined
pdfMake.vfs = pdfFonts.pdfMake.vfs
//Adding our own font into the vfs
window.pdfMake.vfs["TiroTamil-Regular.ttf"] = tamilFont



export function BUProfile() {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const search = useLocation().search

  const [searchParams] = useSearchParams();
  const [SearchParams] = useSearchParams();
  // console.log(searchParams);
  const profileId = searchParams.get('id')
  const brokerId = searchParams.get('brId')
  const pageIndex = searchParams.get('pageIndex')
  const pageStartIndex = searchParams.get('pageStartIndex')
  const backScreenName = searchParams.get('name')
  let hasImage;
  let imageParm = searchParams.get('image');

  if(imageParm == "1")
    hasImage = true
  else
    hasImage = false

  var rasiNames = []
  var amsamNames = []

  const hasHoroScopeDataR = (horoScope) => {
    return (
      horoScope?.meenaR?.trim() ||
      horoScope?.meshaR?.trim() ||
      horoScope?.vrishbaR?.trim() ||
      horoScope?.mithunaR?.trim() ||
      horoScope?.khumbhaR?.trim() ||
      horoScope?.karkataR?.trim() ||
      horoScope?.makaraR?.trim() ||
      horoScope?.simhaR?.trim() ||
      horoScope?.dhanuR?.trim() ||
      horoScope?.vrishikaR?.trim() ||
      horoScope?.tulaR?.trim() ||
      horoScope?.kanyaR?.trim() 
    );
  };


  const hasHoroScopeDataA = (horoScope) => {
    return (
      horoScope?.meenaA?.trim() ||
      horoScope?.meshaA?.trim() ||
      horoScope?.vrishbaA?.trim() ||
      horoScope?.mithunaA?.trim() ||
      horoScope?.khumbhaA?.trim() ||
      horoScope?.karkataA?.trim() ||
      horoScope?.makaraA?.trim() ||
      horoScope?.simhaA?.trim() ||
      horoScope?.dhanuA?.trim() ||
      horoScope?.vrishikaA?.trim() ||
      horoScope?.tulaA?.trim() ||
      horoScope?.kanyaA?.trim()
    );
  };

  const profile =
    useSelector(
      (state) => state.prof
    )

  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

 useEffect(() => {
  
   dispatch(getProfileDetailsById(profileId))
     dispatch(getBrokerUserProfileViewedImageUrl({ profileId }));
 
 
   
   }, [profileId, dispatch])
 
   useEffect(() => {
     dispatch(getbrokerDetailsById(brokerId))
 
   }, [])

  useEffect(() => {

    if (profile.isdeleteProfileSuccess && profile.messagedeleteProfile != undefined && profile.messagedeleteProfile) {
      toast.success(profile.messagedeleteProfile)
      dispatch(resetdeleteProfile())
      //dispatch(getProfileImageUrl({ "brokerId": null, "profileId": profileId }))
    }
    else if (profile.isdeleteProfileError == true) {
      toast.error("Network Error!!!")
      dispatch(resetdeleteProfile())
    }

    if(!profile.isImageSuccess && profile.imageMessage!="")
    {
      toast.error(profile.imageMessage)
      dispatch(resetGetProfileImageUrl())
    }
    else if(profile.isImageSuccess && profile.imageMessage!="")
    {
      toast.success(profile.imageMessage)
      dispatch(resetMessage())
    }

    if(profile.isProfileHoroscopeDetailsByIdSuccess)
    {
      generateHoroscope();
      dispatch(resetProfileHoroscopeDetailsById())
    }

    if(!profile.isProfileHoroscopeDetailsByIdSuccess && profile.ProfileHoroscopeDetailsByIdmessage !="")
    {
      toast.error(profile.ProfileHoroscopeDetailsByIdmessage)
      dispatch(resetProfileHoroscopeDetailsById())
    }

    if(profile.isProfileHoroscopeDetailsByIdSuccess && profile.ProfileHoroscopeDetailsByIdmessage !="")
   {
      toast.success(profile.ProfileHoroscopeDetailsByIdmessage, {
           position: "top-center"
          });

      dispatch(resetProfileHoroscopeDetailsById())
   }


  }, [profile.isdeleteProfileSuccess, profile.messagedeleteProfile, profile.isdeleteProfileError,
    profile.isImageSuccess,profile.imageMessage,profile.isProfileHoroscopeDetailsByIdSuccess,profile.ProfileHoroscopeDetailsByIdmessage]);




  const [formData, setFormData] = useState({
    deleteName: ''
  })

  let deleteName = "";


  const [show, setShow] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function onPrintClick() {
  dispatch(getProfileHoroscopeDetailsById(profileId))
  }


  function generateHoroscope()
  {
    rasiNames = [
      profile?.profileDetails?.horoScope?.meenaR, profile?.profileDetails?.horoScope?.meshaR, profile?.profileDetails?.horoScope?.vrishbaR, profile?.profileDetails?.horoScope?.mithunaR,
      profile?.profileDetails?.horoScope?.karkataR, profile?.profileDetails?.horoScope?.simhaR, profile?.profileDetails?.horoScope?.kanyaR, profile?.profileDetails?.horoScope?.tulaR,
      profile?.profileDetails?.horoScope?.vrishikaR, profile?.profileDetails?.horoScope?.dhanuR, profile?.profileDetails?.horoScope?.makaraR, profile?.profileDetails?.horoScope?.khumbhaR
    ];
    amsamNames = [
      profile?.profileDetails?.horoScope?.meenaA, profile?.profileDetails?.horoScope?.meshaA, profile?.profileDetails?.horoScope?.vrishbaA, profile?.profileDetails?.horoScope?.mithunaA,
      profile?.profileDetails?.horoScope?.karkataA, profile?.profileDetails?.horoScope?.simhaA, profile?.profileDetails?.horoScope?.kanyaA, profile?.profileDetails?.horoScope?.tulaA,
      profile?.profileDetails?.horoScope?.vrishikaA, profile?.profileDetails?.horoScope?.dhanuA, profile?.profileDetails?.horoScope?.makaraA, profile?.profileDetails?.horoScope?.khumbhaA
    ];
    const content = [
      [{ text: rasiNames[0], alignment: 'center', bold: true, margin: [0, 20] ,fontSize: 10 }, { text: rasiNames[1], alignment: 'center', bold: true, margin: [0, 20] ,fontSize: 10 }, { text: rasiNames[2], alignment: 'center', bold: true, margin: [0, 20] ,fontSize: 10 }, { text: rasiNames[3], alignment: 'center', bold: true, margin: [0, 20],fontSize: 10  }],
      [{ text: rasiNames[11], alignment: 'center', bold: true, margin: [0, 20] ,fontSize: 10 }, { text: 'ராசி', alignment: 'center', bold: true, margin: [0, 40], colSpan: 2, rowSpan: 2 ,fontSize: 10}, {}, { text: rasiNames[4], alignment: 'center', bold: true, margin: [0, 20],fontSize: 10  }],
      [{ text: rasiNames[10], alignment: 'center', bold: true, margin: [0, 20] ,fontSize: 10 }, {}, {}, { text: rasiNames[5], alignment: 'center', bold: true, margin: [0, 20] ,fontSize: 10}],
      [{ text: rasiNames[9], alignment: 'center', bold: true, margin: [0, 20] ,fontSize: 10 }, { text: rasiNames[8], alignment: 'center', bold: true, margin: [0, 20] ,fontSize: 10 }, { text: rasiNames[7], alignment: 'center', bold: true, margin: [0, 20] ,fontSize: 10 }, { text: rasiNames[6], alignment: 'center', bold: true, margin: [0, 20] ,fontSize: 10 }]
    ];

    const content1 = [
      [{ text: amsamNames[0], alignment: 'center', bold: true, margin: [0, 20], fontSize: 10 }, { text: amsamNames[1], alignment: 'center', bold: true, margin: [0, 20], fontSize: 10 }, { text: amsamNames[2], alignment: 'center', bold: true, margin: [0, 20], fontSize: 10 }, { text: amsamNames[3], alignment: 'center', bold: true, margin: [0, 20], fontSize: 10 }],
      [{ text: amsamNames[11], alignment: 'center', bold: true, margin: [0, 20], fontSize: 10 }, { text: 'அம்சம்', alignment: 'center', bold: true, margin: [0, 40], colSpan: 2, rowSpan: 2, fontSize: 10 }, {}, { text: amsamNames[4], alignment: 'center', bold: true, margin: [0, 20] , fontSize: 10}],
      [{ text: amsamNames[10], alignment: 'center', bold: true, margin: [0, 20], fontSize: 10 }, {}, {}, { text: amsamNames[5], alignment: 'center', bold: true, margin: [0, 20], fontSize: 10 }],
      [{ text: amsamNames[9], alignment: 'center', bold: true, margin: [0, 20], fontSize: 10 }, { text: amsamNames[8], alignment: 'center', bold: true, margin: [0, 20] , fontSize: 10}, { text: amsamNames[7], alignment: 'center', bold: true, margin: [0, 20] , fontSize: 10}, { text: amsamNames[6], alignment: 'center', bold: true, margin: [0, 20], fontSize: 10 }]
    ];

    pdfMake.fonts = {
      TiroTamilRegular: {
        normal: 'TiroTamil-Regular.ttf',
        bold: 'TiroTamil-Regular.ttf',
        italics: 'TiroTamil-Regular.ttf',
        bolditalics: 'TiroTamil-Regular.ttf'
      },
       Roboto: {
    normal: 'Roboto-Regular.ttf',
    bold: 'Roboto-Medium.ttf',
    italics: 'Roboto-Italic.ttf',
    bolditalics: 'Roboto-MediumItalic.ttf'
  }

    }
    var docDefinition = {
      content: [
        {
          text: profile.brokerDetails.matrimonyName,
          style: 'header',
          alignment: 'center',
        },
        {
          text: 'Broker Detail',
          style: 'subheader',
        },
        {
          columns: [
            {
              width: '50%',
              // text: [
              //   { text: 'Name: ', bold: true }, profile.brokerDetails.name + '\n',
              //   { text: 'Phone: ', bold: true }, profile.brokerDetails.phoneNumber + '\n',
              // ],
                text: [
    { text: 'Name: ', bold: true }, profile?.brokerDetails?.name || ' - ','\n',

    { text: 'Phone: ', bold: true },
    ((profile?.brokerDetails?.phoneNumber || '') + (profile?.brokerDetails?.additionalNumber ? ' , ' + profile.brokerDetails.additionalNumber : '')) || ' - ','\n',

    { text: 'Whatsapp Number: ', bold: true },profile?.brokerDetails?.whatsAppNumber || ' - ',
     ],font: 'Roboto',
            },
            {
              width: '50%',
              text: [
                { text: 'Address: ', bold: true }, profile.brokerDetails.address1 + ',' + profile.brokerDetails.address2 + '\n',
                // { text: 'Email: ', bold: true }, profile.brokerDetails+'\n\n',
              ],
            },
          ],
        },
        {
          text: 'Profile Details',
          style: 'subheader',
        },


        {
          columns: [
            {
              width: '25%',
              stack: [
                { text: 'Name ', bold: true, margin: [0, 0, 0, 6] }, // Added margin bottom
                { text: 'Profile ID ', margin: [0, 0, 0, 6] }, // Added margin bottom
                { text: 'Gender ', margin: [0, 0, 0, 6] }, // Added margin bottom
                { text: 'Date of birth', margin: [0, 0, 0, 6] },
                { text: 'Time of birth', margin: [0, 0, 0, 6] },
                { text: 'Height(cm)', margin: [0, 0, 0, 6] },
                { text: 'Weight(kg)', margin: [0, 0, 0, 6] },
                { text: 'Colour', margin: [0, 0, 0, 6] },
                { text: 'Mother Tongue ', margin: [0, 0, 0, 6] },
                { text: 'Star ', bold: true, margin: [0, 0, 0, 6] },
                { text: 'Rasi', margin: [0, 0, 0, 6] },
                { text: 'Qualification', margin: [0, 0, 0, 6] }, // Added margin bottom
                { text: 'Job Title ', bold: true, margin: [0, 0, 0, 6] },
                { text: 'Salary per month', margin: [0, 0, 0, 6] },
                { text: 'Father Name', margin: [0, 0, 0, 6] },
                { text: 'Father Occupation', margin: [0, 0, 0, 6] },
                { text: 'Mother Name', margin: [0, 0, 0, 6] },
                { text: 'Mother Occupation', margin: [0, 0, 0, 6] },
                { text: 'Sister', margin: [0, 0, 0, 6] },
                { text: 'Brother', margin: [0, 0, 0, 6] },
                // { text: 'Brother(s) Married', margin: [0, 0, 0, 6] },
                // { text: 'Brother(s) Unmarried', margin: [0, 0, 0, 6] },
              ],
            },
            {
              width: '5%',
              stack: [
                { text: ':', bold: true, margin: [0, 0, 0, 6] }, // Added margin bottom
                { text: ':', margin: [0, 0, 0, 6] }, // Added margin bottom
                { text: ':', margin: [0, 0, 0, 6] },
                { text: ':', margin: [0, 0, 0, 6] },
                { text: ':', margin: [0, 0, 0, 6] },
                { text: ':', margin: [0, 0, 0, 6] },
                { text: ':', margin: [0, 0, 0, 6] },
                { text: ':', margin: [0, 0, 0, 6] },
                { text: ':', margin: [0, 0, 0, 6] },
                { text: ':', bold: true, margin: [0, 0, 0, 6] },
                { text: ':', margin: [0, 0, 0, 6] },
                { text: ':', margin: [0, 0, 0, 6] },
                { text: ':', bold: true, margin: [0, 0, 0, 6] },
                { text: ':', margin: [0, 0, 0, 6] },
                { text: ':', margin: [0, 0, 0, 6] },
                { text: ':', margin: [0, 0, 0, 6] },
                { text: ':', margin: [0, 0, 0, 6] },
                { text: ':', margin: [0, 0, 0, 6] },
                { text: ':', margin: [0, 0, 0, 6] },
                { text: ':', margin: [0, 0, 0, 6] },
                // { text: ':', margin: [0, 0, 0, 6] },
                // { text: ':', margin: [0, 0, 0, 6] }
              ]
            },
            {
              width: '70%',
              stack: [
                { text: profile.profileDetails.name || "-", bold: true, margin: [0, 0, 0, 6] },
                { text: profile.profileDetails.profileID || "-", margin: [0, 0, 0, 6] },
                { text: profile.profileDetails.sex === 'Male' ? `UM${profile.profileDetails.profileID || "-"}`
                      : profile.profileDetails.sex === 'Female' ? `UF${profile.profileDetails.profileID || "-"}`
                      : null, margin: [0, 0, 0, 6]},
                //  { text: (profile?.profileDetails?.DOB.split('T')[0]) || "-", margin: [0, 0, 0, 8] },
                // { text: (formatDateDayMonthYear(profile?.profileDetails?.DOB)) || "-", margin: [0, 0, 0, 6] },
               {text: (profile?.profileDetails?.DOB? new Date(profile.profileDetails.DOB).toLocaleDateString('en-GB'): "-"),margin: [0, 0, 0, 6],font: 'Roboto' },
                //{ text: profile.profileDetails.birthTime || "-", margin: [0, 0, 0, 8] },
                { text: `${returnEmptyIfNull(profile.profileDetails.birthHour) }:${formatToTwoDigits(returnEmptyIfNull(profile.profileDetails.birthMin) )} ${returnEmptyIfNull(profile.profileDetails.meridiem) }` ||  "-",margin: [0, 0, 0, 6]},
                { text: profile.profileDetails.height || "-", margin: [0, 0, 0, 6] },
                { text: profile.profileDetails.weight || "-", margin: [0, 0, 0, 6] },
                { text: profile.profileDetails.colour || "-", margin: [0, 0, 0, 6] },
                { text: profile.profileDetails.motherTongue || "-", margin: [0, 0, 0, 6] },
                { text: profile.profileDetails.star || "-", bold: true, margin: [0, 0, 0, 6] },
                { text: profile.profileDetails.rasi || "-", margin: [0, 0, 0, 6] },
                { text: profile.profileDetails.qualification || "-", margin: [0, 0, 0, 6] },
                { text: profile.profileDetails.job || "-", bold: true, margin: [0, 0, 0, 6] },
                { text: profile.profileDetails.salary || "-", margin: [0, 0, 0, 6] },
                { text: profile.profileDetails.fatherName || "-", margin: [0, 0, 0, 6] },
                { text: profile.profileDetails.fatherOccupation || "-", margin: [0, 0, 0, 6] },
                { text: profile.profileDetails.motherName || "-", margin: [0, 0, 0, 6] },
                { text: profile.profileDetails.motherOccupation || "-", margin: [0, 0, 0, 6] },
                 { text: `${profile?.profileDetails?.sistersMarried || "0"} Married , ${profile?.profileDetails?.sistersUnmarried || "0"} Unmarried`,margin: [0, 0, 0, 6]},
                 { text: `${profile?.profileDetails?.brothersMarried || "0"} Married , ${profile?.profileDetails?.brothersUnmarried || "0"} Unmarried`,margin: [0, 0, 0, 6]}
                // { text: profile.profileDetails.sistersMarried || "-", margin: [0, 0, 0, 6] },
                // { text: profile.profileDetails.sistersUnmarried || "-", margin: [0, 0, 0, 6] },
                // { text: profile.profileDetails.brothersMarried || "-", margin: [0, 0, 0, 6] },
                // { text: profile.profileDetails.brothersUnmarried || "-", margin: [0, 0, 0, 6] },
              ],
            },
          ],
        },
        {

          columns: [
            {
              width: '50%',
              style: 'table',
              table: {
                widths: [50, 50, 50, 50],
                body: content
              },
              layout: {
                hLineColor: () => '#000000',
                vLineColor: () => '#000000',
                hLineWidth: () => 1,
                vLineWidth: () => 1
              }
            },
            {
              width: '50%',
              style: 'table',
              table: {
                widths: [50, 50, 50, 50],
                body: content1
              },
              layout: {
                hLineColor: () => '#000000',
                vLineColor: () => '#000000',
                hLineWidth: () => 1,
                vLineWidth: () => 1
              }
            }
          ]

        },

        {
          columns: [
            {
              width: '20%',
              stack: [
                { text: 'திசை இருப்பு : ', bold: true, margin: [0, 10, 0, 0] }, // Added margin bottom

              ],
            },
            {
              width: '20%',
              stack: [{ text: profile?.profileDetails?.horoScope?.dhasa, bold: true, margin: [0, 10, 0, 0] }, // Added margin bottom

              ]
            },
            {
              width: '3%',
              stack: [
                { text: profile?.profileDetails?.horoScope?.year, bold: true, margin: [0, 10, 0, 0] },

              ],
            },
            {
              width: '15%',
              stack: [
                { text: 'வருடம்', bold: true, margin: [0, 10, 0, 0] },

              ],
            },
            {
              width: '3%',
              stack: [
                { text: profile?.profileDetails?.horoScope?.month, bold: true, margin: [0, 10, 0, 0] },

              ],
            },
            {
              width: '10%',
              stack: [
                { text: 'மாதம்', bold: true, margin: [0, 10, 0, 0] },

              ],
            },
            {
              width: '3%',
              stack: [
                { text: profile?.profileDetails?.horoScope?.day, bold: true, margin: [0, 10, 0, 0] },

              ],
            },
            {
              width: '10%',
              stack: [
                { text: 'நாள்', bold: true, margin: [0, 10, 0, 0] },

              ],
            },
          ],
        },

      ],
      styles: {
        header: {
          fontSize: 22,
          bold: true,
          margin: [0, 0, 0, 10],
        },
        subheader: {
          fontSize: 16,
          bold: true,
          margin: [0, 10, 0, 5],
        },
        tableHeader: {
          bold: true,
          fontSize: 13,
          color: 'black',
        },
        table: {
          margin: [0, 5, 0, 1]
        }
      },
      defaultStyle: {
        font: 'TiroTamilRegular',
      },
    };
    let fileName = profile.profileDetails.name + "_Biodata.pdf"
    pdfMake.createPdf(docDefinition).download(fileName);
  }
  const onCancelClick = (e) => {
    if (backScreenName == "userProfile") {
      navigate('/UserProfileList');
    }
    else if (backScreenName == "profileList") {
      navigate('/BUProfileList?pageIndex='+ pageIndex + "&pageStartIndex="+ pageStartIndex);
    }
  }

  const formatDate = (dateTime) => {

    const date = new Date(dateTime);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(date.getDate()).padStart(2, '0');
    return `${day}/${month}/${year}`; // Format as YYYY-MM-DD

  }

  const backuButtonUrl = () => {
    dispatch(resetGetProfileImageUrl())
   navigate('/BUProfileList?pageIndex='+ pageIndex + "&pageStartIndex="+ pageStartIndex);
  }

  const userDetails = (e) => {
    navigate('/UserDetails?id=' + profileId); // sending profileId
  };

  //Create User Login 

  const [createShow, setCreateShow] = useState(false)

  const handleClose1 = () => setCreateShow(false)

  const handleShow1 = () => {
    setCreateShow(true)
    setCreateData("")
  }

  const { isCreateLoginSuccess, isCreateLoginMessage, isCreateLoginError, isGetOtpLoading, isGetOtpSuccess, isGetOtpMessage, isGetOtpError,
    isOtpVerifyLoading, isOtpVerifySuccess, isOtpVerifyError, otpVerified
  } = useSelector((state) => state.userPro)

  useEffect(() => {
    if (isCreateLoginSuccess) {
      toast.success(isCreateLoginMessage)
      dispatch(resetUserLoginCreate())
      dispatch(userFind())
    }
    if (isCreateLoginError) {
      toast.error(isCreateLoginMessage)
      handleShow1(true)
      dispatch(resetUserLoginCreate())
    }
    if (isGetOtpSuccess) {
      toast.success(isGetOtpMessage)
      // setOTPSent(true)
      dispatch(resetGetUserLoginOtp())
    }
    if (isGetOtpError) {
      toast.error(isGetOtpMessage)
      dispatch(resetGetUserLoginOtp())
      setOTPSent(false)
    }
    if (isOtpVerifySuccess) {
      toast.success(otpVerified)
      setIsOtpVerified(true)
      dispatch(resetBrokerUserOtpVerify())
    }
    if (isOtpVerifyError) {
      toast.error(otpVerified)
      setIsOtpVerified(false)
      dispatch(resetBrokerUserOtpVerify())
    }

  }, [isCreateLoginSuccess, isCreateLoginMessage, isCreateLoginError, isGetOtpLoading, isGetOtpSuccess, isGetOtpMessage,
    isGetOtpError, isOtpVerifyLoading, isOtpVerifySuccess, isOtpVerifyError, otpVerified], dispatch)

  const [createData, setCreateData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    otp: "",
    emailotp: ""
  })

  const { email, password, confirmPassword, phoneNumber, emailotp, otp } = createData

  const onchange = (e) => {
    setCreateData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }
  const getOTP = (e) => {
    e.preventDefault();


    let hasRequiredfieldValidation = false
    let hasOtherfieldValidation = false

    const userReqFields = {
      email, phoneNumber
    }

    for (const [key, value] of Object.entries(userReqFields)) {

      if (value == "") {
        hasRequiredfieldValidation = true;
        return toast.error('Please fill all (*)required field')
      }
    }

    const getOtp = { email, phoneNumber }

    if (hasRequiredfieldValidation == false) {
      for (const [key, value] of Object.entries(getOtp)) {
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

    if (!hasRequiredfieldValidation && !hasOtherfieldValidation) {
      dispatch(getBrokerUserOTP(getOtp))
      setOTPSent(true)
    }
  }

  const verifyOTP = (e) => {
    e.preventDefault();

    let hasRequiredfieldValidation = false
    let hasOtherfieldValidation = false

    const userReqFields = {
      emailotp, otp, email, phoneNumber
    }

    for (const [key, value] of Object.entries(userReqFields)) {

      if (value == "") {
        hasRequiredfieldValidation = true;
        return toast.error('Please fill all (*)required field')
      }
    }

    const OTP = { emailotp, otp, email, phoneNumber }

    if (hasRequiredfieldValidation == false) {
      for (const [key, value] of Object.entries(OTP)) {
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

    if (!hasRequiredfieldValidation && !hasOtherfieldValidation) {
      dispatch(brokerUserOTPVerify(OTP))
      setIsOtpVerified(true)
    }
  }

  const onsubmit = (e) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      handleShow1(true)
      toast.error("Invaild Data")
    }


    const userLogin = { email, password, confirmPassword, phoneNumber, profID: profileId }
    dispatch(userLoginCreate(userLogin))
  }

  //*----OTP Function----*//
  const [isOTPSent, setOTPSent] = useState(false)
  const [isOtpVerified, setIsOtpVerified] = useState(false)


  //*START - Related to view image logic*//

  const [showImage, setShowImage] = useState(false);
  const [currentImageUrl, setCurrentImageUrl] = useState('');


  useEffect(() => {
    setShowImage(false);
    setCurrentImageUrl(null);
  }, [profileId]);



  const handleShowImage = () => {
    dispatch(getProfileImageUrl({ profileId }));
    if (profile.Images && profile.Images.length > 0) {
      setShowImage(true);
      setCurrentImageUrl(profile.Images[0]);
    }
  };

  const handleImageChange = (imageUrl) => {
    setCurrentImageUrl(imageUrl);
  };

  //*END - Related to view image logic*//

  return (
    <>

      <div>

          <div className="dropdown-item d-flex align-items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          fill="#1aa179"
          className="bi bi-arrow-left-circle"
          viewBox="0 0 16 16"
          onClick={backuButtonUrl}
          style={{ cursor: 'pointer' }}
        >
          <path
            fillRule="evenodd"
            d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z"
          />
        </svg>
        <p
          className="h6 mb-0 ms-2"
          onClick={backuButtonUrl}
          style={{ cursor: 'pointer' }}
        >
          Go Back
        </p>
      </div>


        <div> 
          
          <br /> </div>


      
          <p className="h4">Profile Details
          </p>
       


        <div id="dvpublicProfile" className="row">
          <div className="col-md-8">

            <div className="card-container">
              {profile.isProfileDetailsByIdLoading && (
                <>
                  <div className="section-skeleton">
                    <div className="skeleton skeleton-Detail-section1"></div>
                  </div>
                </>

              )} </div>

            {profile.isProfileDetailsByIdSuccess && !profile.isProfileDetailsByIdLoading && (
              <>

                <p className="h5">1. Personal details</p>

                <div className="row">
                  <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Name</label>
                  <div className="col-8">
                    <label className="form-control-plaintext">: {profile.profileDetails.name}</label>
                  </div>
                </div>

                <div className="row">
                  <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Sex</label>
                  <div className="col-8">
                    <label className="form-control-plaintext">: {profile.profileDetails.sex}</label>
                  </div>
                </div>

                <div className="row">
                  <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Marital Status</label>
                  <div className="col-8">
                    <label className="form-control-plaintext">: {profile.profileDetails.maritalstatus}</label>
                  </div>
                </div>

                <div className="row">
                  <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Blood group</label>
                  <div className="col-8">
                    <label className="form-control-plaintext">: {profile.profileDetails.bloodGroup}</label>
                  </div>
                </div>

                <div className="row">
                  <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Height (cm)</label>
                  <div className="col-8">
                    <label className="form-control-plaintext">: {profile.profileDetails.height}</label>
                  </div>
                </div>

                <div className="row">
                  <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Weight (kg)</label>
                  <div className="col-8">
                    <label className="form-control-plaintext">: {profile.profileDetails.weight}</label>
                  </div>
                </div>

                <div className="row">
                  <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Colour</label>
                  <div className="col-8">
                    <label className="form-control-plaintext">: {profile.profileDetails.colour}</label>
                  </div>
                </div>

                <div className="row">
                  <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Food preference</label>
                  <div className="col-8">
                    <label className="form-control-plaintext">: {profile.profileDetails.foodPreference}</label>
                  </div>
                </div>

                <div className="row">
                  <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Mother tongue</label>
                  <div className="col-8">
                    <label className="form-control-plaintext">: {profile.profileDetails.motherTongue}</label>
                  </div>
                </div>

                <div className="row">
                  <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Religion</label>
                  <div className="col-8">
                    <label className="form-control-plaintext">: {profile.profileDetails.religion}</label>
                  </div>
                </div>

                <div className="row">
                  <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Caste</label>
                  <div className="col-8">
                    <label className="form-control-plaintext">: {profile.profileDetails.caste}</label>
                  </div>
                </div>

                <div className="row">
                  <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Sub Caste</label>
                  <div className="col-8">
                    <label className="form-control-plaintext">: {profile.profileDetails.subcaste}</label>
                  </div>
                </div>

              </>
            )}

          </div>

          <div className="col-md-4">

            <div className="card-container">
              {profile.isProfileDetailsByIdLoading && (
                <div className="section-skeleton">
                  <div className="skeleton skeleton-Detail-section1"></div>
                </div>
              )}
            </div>


            {profile.isProfileDetailsByIdSuccess && !profile.isProfileDetailsByIdLoading && !profile?.Images?.length && (
              <>
                <div>
                  {

                    !showImage && hasImage ? (
                      <div className="section-skeleton">
                        <div
                          className="skeleton skeleton-Detail-section1"
                          style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '500px', // adjust if needed
                            position: 'relative'
                          }}
                        >
                          <button onClick={handleShowImage} className="primarybutton">
                            View Image
                          </button>
                        </div>
                      </div>


                    ):(
                    <div>
                        <br /><br /><br />
                        <p>
                          <span style={{ fontWeight: 'bold', color: '#ff5722' }}>Profile Image</span> not available.
                        </p>
                          <p style={{color:'#ff2222ff',fontWeight: 'bold'}} className="ms-3">Please contact broker</p>
                    </div>
                  )
                  }
                
                </div>
              </>

            )}

            {
              profile?.isImageSuccess ? (
                <>

                  {profile?.Images?.length > 0 ? (
                    <Carousal
                      key={profileId}
                      imageUrls={profile.Images}
                      onImageChange={handleImageChange}
                    />
                  ) : null
                  }
                </>
              ) : null

            }


          </div>

        </div>

        <div id="dvpublicProfile" className="row">

          <div className="card-container">
            {profile.isProfileDetailsByIdLoading && (
              <>
                <div className="section-skeleton">
                  <div className="skeleton skeleton-Detail-section1"></div>
                </div>
              </>

            )} </div>

          {profile.isProfileDetailsByIdSuccess && !profile.isProfileDetailsByIdLoading && (
            <>

              <p className="h5">2. Education and Occupation</p>

              <div className="row">
                <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Qualification</label>
               <div className="col-8 d-flex align-items-center">
    <span className="form-control-plaintext d-flex align-items-center">
      :&nbsp;
      <a href="#click" className="me-2 " style={{ color: 'red' }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-cloud-download" viewBox="0 0 16 16">
          <path d="M4.406 1.342A5.53 5.53 0 0 1 8 0c2.69 0 4.923 2 5.166 4.579C14.758 4.804 16 6.137 16 7.773 16 9.569 14.502 11 12.687 11H10a.5.5 0 0 1 0-1h2.688C13.979 10 15 8.988 15 7.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 2.825 10.328 1 8 1a4.53 4.53 0 0 0-2.941 1.1c-.757.652-1.153 1.438-1.153 2.055v.448l-.445.049C2.064 4.805 1 5.952 1 7.318 1 8.785 2.23 10 3.781 10H6a.5.5 0 0 1 0 1H3.781C1.708 11 0 9.366 0 7.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383"/>
          <path d="M7.646 15.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 14.293V5.5a.5.5 0 0 0-1 0v8.793l-2.146-2.147a.5.5 0 0 0-.708.708z"/>
        </svg>
      </a>
         <a href="#click" className="me-2 text-danger text-decoration-none">
      <span id="#click" className={profile?.profileDetails?.horoScope && hasHoroScopeDataR(profile?.profileDetails?.horoScope) }>
        {profile?.profileDetails?.horoScope && hasHoroScopeDataR(profile?.profileDetails?.horoScope)
          ? "Print profile & horoscope"
          : "Print profile"}
      </span>
      </a>
     
    </span>
  </div>
              </div>

              <div className="row">
                <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Job Title</label>
               <div className="col-8 d-flex align-items-center">
    <span className="form-control-plaintext d-flex align-items-center">
      :&nbsp;
      <a href="#click" className="me-2" style={{ color: 'red' }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-cloud-download" viewBox="0 0 16 16">
          <path d="M4.406 1.342A5.53 5.53 0 0 1 8 0c2.69 0 4.923 2 5.166 4.579C14.758 4.804 16 6.137 16 7.773 16 9.569 14.502 11 12.687 11H10a.5.5 0 0 1 0-1h2.688C13.979 10 15 8.988 15 7.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 2.825 10.328 1 8 1a4.53 4.53 0 0 0-2.941 1.1c-.757.652-1.153 1.438-1.153 2.055v.448l-.445.049C2.064 4.805 1 5.952 1 7.318 1 8.785 2.23 10 3.781 10H6a.5.5 0 0 1 0 1H3.781C1.708 11 0 9.366 0 7.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383"/>
          <path d="M7.646 15.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 14.293V5.5a.5.5 0 0 0-1 0v8.793l-2.146-2.147a.5.5 0 0 0-.708.708z"/>
        </svg>
      </a>
         <a href="#click" className="me-2 text-danger text-decoration-none">
      <span id="#click" className={profile?.profileDetails?.horoScope && hasHoroScopeDataR(profile?.profileDetails?.horoScope) }>
        {profile?.profileDetails?.horoScope && hasHoroScopeDataR(profile?.profileDetails?.horoScope)
          ? "Print profile & horoscope"
          : "Print profile"}
      </span>
      </a>
     
    </span>
  </div>
              </div>

              <div className="row">
                <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Job Description</label>
                <div className="col-8">
                  <label className="form-control-plaintext">: {profile.profileDetails.jobDescription}</label>
                </div>
              </div>

              <div className="row">
                <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Salary per month</label>
                <div className="col-8">
                  <label className="form-control-plaintext">: {profile.profileDetails.salary}</label>
                </div>
              </div>

             

              {profile?.profileDetails?.jobInAbroad &&
  !profile?.profileDetails?.jobLocation &&
  !profile?.profileDetails?.foreignCountry && (
    <div className="row">
      <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Job in abroad ?</label>
      <div className="col-8">
        <label className="form-control-plaintext">: {profile.profileDetails.jobInAbroad}</label>
      </div>
    </div>
)}

{!profile?.profileDetails?.jobInAbroad &&
  profile?.profileDetails?.jobLocation &&
  !profile?.profileDetails?.foreignCountry && (
    <div className="row">
      <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Job location</label>
      <div className="col-8">
        <label className="form-control-plaintext">: {profile.profileDetails.jobLocation}</label>
      </div>
    </div>
)}

{!profile?.profileDetails?.jobInAbroad &&
  !profile?.profileDetails?.jobLocation &&
  profile?.profileDetails?.foreignCountry && (
    <div className="row">
      <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Job Country</label>
      <div className="col-8">
        <label className="form-control-plaintext">: {profile.profileDetails.foreignCountry}</label>
      </div>
    </div>
)}


            </>
          )}

        </div>


        <div id="dvpublicProfile" className="row">

          <div className="card-container">
            {profile.isProfileDetailsByIdLoading && (
              <>
                <div className="section-skeleton">
                  <div className="skeleton skeleton-Detail-section1"></div>
                </div>
              </>

            )} </div>

          {profile.isProfileDetailsByIdSuccess && !profile.isProfileDetailsByIdLoading && (
            <>

              <p className="h5">3. Family Details</p>

              <div className="row">
                <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Father Name</label>
                <div className="col-8">
                  <label className="form-control-plaintext">: {profile.profileDetails.fatherName }</label>
                </div>
              </div>



              <div className="row">
                <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Father occupation</label>
                <div className="col-8">
                  <label className="form-control-plaintext">: {profile.profileDetails.fatherOccupation}</label>
                </div>
              </div>

              <div className="row">
                <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Mother Name</label>
                <div className="col-8">
                  <label className="form-control-plaintext">: {profile.profileDetails.motherName}</label>
                </div>
              </div>

              <div className="row">
                <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Mother occupation</label>
                <div className="col-8">
                  <label className="form-control-plaintext">: {profile.profileDetails.motherOccupation}</label>
                </div>
              </div>

              <div className="row">
                <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Sister(s) Married</label>
                <div className="col-8">
                  <label className="form-control-plaintext">: {profile.profileDetails.sistersMarried}</label>
                </div>
              </div>

              <div className="row">
                <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Sister(s) Unmarried</label>
                <div className="col-8">
                  <label className="form-control-plaintext">: {profile.profileDetails.sistersUnmarried}</label>
                </div>
              </div>

              <div className="row">
                <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Brother(s) Married</label>
                <div className="col-8">
                  <label className="form-control-plaintext">: {profile.profileDetails.brothersMarried}</label>
                </div>
              </div>

              <div className="row">
                <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Brother(s) Unmarried</label>
                <div className="col-8">
                  <label className="form-control-plaintext">: {profile.profileDetails.brothersUnmarried}</label>
                </div>
              </div>

              <div className="row">
                <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Settled Location</label>
                <div className="col-8">
                  <label className="form-control-plaintext">: {profile.profileDetails.settledLocation}</label>
                </div>
              </div>




            </>
          )}


        </div>

        <div id="dvpublicProfile" className="row">

          <div className="card-container">
            {profile.isProfileDetailsByIdLoading && (
              <>
                <div className="section-skeleton">
                  <div className="skeleton skeleton-Detail-section1"></div>
                </div>
              </>

            )} </div>


        </div>


        <div id="dvpublicProfile" className="row">

          <div className="card-container">
            {profile.isProfileDetailsByIdLoading && (
              <>
                <div className="section-skeleton">
                  <div className="skeleton skeleton-Detail-section1"></div>
                </div>
              </>

            )} </div>

          {profile.isProfileDetailsByIdSuccess && !profile.isProfileDetailsByIdLoading && (
            <>

              <p className="h5">4. Additional Information</p>

              <div className="row">
                <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Self Description</label>
                <div className="col-8">
                  <label className="form-control-plaintext">: {profile.profileDetails.selfDescription}</label>
                </div>
              </div>

              <div className="row">
                <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Expectation from marriage</label>
                <div className="col-8">
                  <label className="form-control-plaintext">: {profile.profileDetails.expectationFromMarriage}</label>
                </div>
              </div>

              <div className="row">
                <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Notes</label>
                <div className="col-8">
                  <label className="form-control-plaintext">: {profile.profileDetails.notes}</label>
                </div>
              </div>

            </>
          )}


        </div>



        <br></br>

       
          <br /><br />
          <p className="h4">Horoscope Details
          </p>

        <div className="card-container">
          {profile.isProfileDetailsByIdLoading && (
            <>
              <div className="section-skeleton">
                <div className="skeleton skeleton-Detail-section2"></div>
              </div>
            </>

          )} </div>

        {profile.isProfileDetailsByIdSuccess && !profile.isProfileDetailsByIdLoading && (
          <>
            <div id="dvhoroscope" className="row">

              <div className="col-md-4">
                <div className="row">
                  <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Date of Birth</label>
                   <div className="col-8 d-flex align-items-center">
    <span className="form-control-plaintext d-flex align-items-center">
      :&nbsp;
      <a href="#click" className="me-2" style={{ color: 'red' }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-cloud-download" viewBox="0 0 16 16">
          <path d="M4.406 1.342A5.53 5.53 0 0 1 8 0c2.69 0 4.923 2 5.166 4.579C14.758 4.804 16 6.137 16 7.773 16 9.569 14.502 11 12.687 11H10a.5.5 0 0 1 0-1h2.688C13.979 10 15 8.988 15 7.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 2.825 10.328 1 8 1a4.53 4.53 0 0 0-2.941 1.1c-.757.652-1.153 1.438-1.153 2.055v.448l-.445.049C2.064 4.805 1 5.952 1 7.318 1 8.785 2.23 10 3.781 10H6a.5.5 0 0 1 0 1H3.781C1.708 11 0 9.366 0 7.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383"/>
          <path d="M7.646 15.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 14.293V5.5a.5.5 0 0 0-1 0v8.793l-2.146-2.147a.5.5 0 0 0-.708.708z"/>
        </svg>
      </a>
         <a href="#click" className="me-2 text-danger text-decoration-none">
      <span id="#click" className={profile?.profileDetails?.horoScope && hasHoroScopeDataR(profile?.profileDetails?.horoScope) }>
        {profile?.profileDetails?.horoScope && hasHoroScopeDataR(profile?.profileDetails?.horoScope)
          ? "Print profile & horoscope"
          : "Print profile"}
      </span>
      </a>
     
    </span>
  </div>
                </div>

                <div className="row">
                  <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Birth Time</label>
                   <div className="col-8 d-flex align-items-center">
    <span className="form-control-plaintext d-flex align-items-center">
      :&nbsp;
      <a href="#click" className="me-2" style={{color:'red'}}>
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-cloud-download" viewBox="0 0 16 16">
          <path d="M4.406 1.342A5.53 5.53 0 0 1 8 0c2.69 0 4.923 2 5.166 4.579C14.758 4.804 16 6.137 16 7.773 16 9.569 14.502 11 12.687 11H10a.5.5 0 0 1 0-1h2.688C13.979 10 15 8.988 15 7.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 2.825 10.328 1 8 1a4.53 4.53 0 0 0-2.941 1.1c-.757.652-1.153 1.438-1.153 2.055v.448l-.445.049C2.064 4.805 1 5.952 1 7.318 1 8.785 2.23 10 3.781 10H6a.5.5 0 0 1 0 1H3.781C1.708 11 0 9.366 0 7.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383"/>
          <path d="M7.646 15.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 14.293V5.5a.5.5 0 0 0-1 0v8.793l-2.146-2.147a.5.5 0 0 0-.708.708z"/>
        </svg>
      </a>
         <a href="#click" className="me-2 text-danger text-decoration-none">
      <span id="#click" className={profile?.profileDetails?.horoScope && hasHoroScopeDataR(profile?.profileDetails?.horoScope) }>
        {profile?.profileDetails?.horoScope && hasHoroScopeDataR(profile?.profileDetails?.horoScope)
          ? "Print profile & horoscope"
          : "Print profile"}
      </span>
      </a>
     
    </span>
  </div>
                </div>

                <div className="row">
                  <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Star</label>
                <div className="col-8 d-flex align-items-center">
    <span className="form-control-plaintext d-flex align-items-center">
      :&nbsp;
      <a href="#click" className="me-2" style={{color:"red"}}>
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-cloud-download" viewBox="0 0 16 16">
          <path d="M4.406 1.342A5.53 5.53 0 0 1 8 0c2.69 0 4.923 2 5.166 4.579C14.758 4.804 16 6.137 16 7.773 16 9.569 14.502 11 12.687 11H10a.5.5 0 0 1 0-1h2.688C13.979 10 15 8.988 15 7.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 2.825 10.328 1 8 1a4.53 4.53 0 0 0-2.941 1.1c-.757.652-1.153 1.438-1.153 2.055v.448l-.445.049C2.064 4.805 1 5.952 1 7.318 1 8.785 2.23 10 3.781 10H6a.5.5 0 0 1 0 1H3.781C1.708 11 0 9.366 0 7.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383"/>
          <path d="M7.646 15.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 14.293V5.5a.5.5 0 0 0-1 0v8.793l-2.146-2.147a.5.5 0 0 0-.708.708z"/>
        </svg>
      </a>
         <a href="#click" className="me-2 text-danger text-decoration-none">
      <span id="#click" className={profile?.profileDetails?.horoScope && hasHoroScopeDataR(profile?.profileDetails?.horoScope) }>
        {profile?.profileDetails?.horoScope && hasHoroScopeDataR(profile?.profileDetails?.horoScope)
          ? "Print profile & horoscope"
          : "Print profile"}
      </span>
      </a>
     
    </span>
  </div>
                </div>

                <div className="row">
                  <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Rasi</label>
                  <div className="col-8 d-flex align-items-center">
    <span className="form-control-plaintext d-flex align-items-center">
      :&nbsp;
      <a href="#click" className="me-2" style={{color:"red"}}>
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-cloud-download" viewBox="0 0 16 16">
          <path d="M4.406 1.342A5.53 5.53 0 0 1 8 0c2.69 0 4.923 2 5.166 4.579C14.758 4.804 16 6.137 16 7.773 16 9.569 14.502 11 12.687 11H10a.5.5 0 0 1 0-1h2.688C13.979 10 15 8.988 15 7.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 2.825 10.328 1 8 1a4.53 4.53 0 0 0-2.941 1.1c-.757.652-1.153 1.438-1.153 2.055v.448l-.445.049C2.064 4.805 1 5.952 1 7.318 1 8.785 2.23 10 3.781 10H6a.5.5 0 0 1 0 1H3.781C1.708 11 0 9.366 0 7.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383"/>
          <path d="M7.646 15.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 14.293V5.5a.5.5 0 0 0-1 0v8.793l-2.146-2.147a.5.5 0 0 0-.708.708z"/>
        </svg>
      </a>
         <a href="#click" className="me-2 text-danger text-decoration-none">
      <span id="#click" className={profile?.profileDetails?.horoScope && hasHoroScopeDataR(profile?.profileDetails?.horoScope) }>
        {profile?.profileDetails?.horoScope && hasHoroScopeDataR(profile?.profileDetails?.horoScope)
          ? "Print profile & horoscope"
          : "Print profile"}
      </span>
      </a>
     
    </span>
  </div>
                </div>

                <div className="row">
                  <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Dhosam</label>
     <div className="col-8 d-flex align-items-center">
    <span className="form-control-plaintext d-flex align-items-center">
      :&nbsp;
      <a href="#click" className="me-2" style={{color:"red"}}>
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-cloud-download" viewBox="0 0 16 16">
          <path d="M4.406 1.342A5.53 5.53 0 0 1 8 0c2.69 0 4.923 2 5.166 4.579C14.758 4.804 16 6.137 16 7.773 16 9.569 14.502 11 12.687 11H10a.5.5 0 0 1 0-1h2.688C13.979 10 15 8.988 15 7.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 2.825 10.328 1 8 1a4.53 4.53 0 0 0-2.941 1.1c-.757.652-1.153 1.438-1.153 2.055v.448l-.445.049C2.064 4.805 1 5.952 1 7.318 1 8.785 2.23 10 3.781 10H6a.5.5 0 0 1 0 1H3.781C1.708 11 0 9.366 0 7.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383"/>
          <path d="M7.646 15.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 14.293V5.5a.5.5 0 0 0-1 0v8.793l-2.146-2.147a.5.5 0 0 0-.708.708z"/>
        </svg>
      </a>
         <a href="#click" className="me-2 text-danger text-decoration-none">
      <span id="#click" className={profile?.profileDetails?.horoScope && hasHoroScopeDataR(profile?.profileDetails?.horoScope) }>
        {profile?.profileDetails?.horoScope && hasHoroScopeDataR(profile?.profileDetails?.horoScope)
          ? "Print profile & horoscope"
          : "Print profile"}
      </span>
      </a>
     
    </span>
  </div>
                </div>

                <br /><br />
              </div>
            </div>

          </>
        )}



        <br /><br />

        <p className="h4">Broker Contact Details</p>

        <div className="card-container">
          {profile.isProfileDetailsByIdLoading && (
            <>
              <div className="section-skeleton">
                <div className="skeleton skeleton-Detail-section2"></div>
              </div>
            </>

          )} </div>

        {profile.isProfileDetailsByIdSuccess && !profile.isProfileDetailsByIdLoading && (
          <>
            {profile && profile.brokerDetails ? (
              <div id="dvbrokerDetails" className="row">
                <div className="col-md-12">
                  <div className="row">
                    <label style={{ fontWeight: 'bold' }} className="col-3 col-form-label">Broker Name</label>
                    <div className="col-9">
                      <label className="form-control-plaintext">: {profile.brokerDetails.name}</label>
                    </div>
                  </div>

                  <div className="row">
                    <label style={{ fontWeight: 'bold' }} className="col-3 col-form-label">Contact Number</label>
                    <div className="col-9">
                      <label className="form-control-plaintext">: {profile.brokerDetails.phoneNumber}</label>
                    </div>
                  </div>

                  <div className="row">
                    <label style={{ fontWeight: 'bold' }} className="col-3 col-form-label">Matrimony Name</label>
                    <div className="col-9">
                      <label className="form-control-plaintext">: {profile.brokerDetails.matrimonyName}</label>
                    </div>
                  </div>

                  <div className="row">
                    <label style={{ fontWeight: 'bold' }} className="col-3 col-form-label">Address</label>
                    <div className="col-9">
                      <label className="form-control-plaintext">: {profile.brokerDetails.address1} </label>
                    </div>
                  </div>
                  <div className="row">
                    <label style={{ fontWeight: 'bold' }} className="col-3 col-form-label">Registration Number</label>
                    <div className="col-9">
                      <label className="form-control-plaintext">: {profile.brokerDetails.registrationNumber} </label>
                    </div>
                  </div>
                  <div className="row">
                    <label style={{ fontWeight: 'bold' }} className="col-3 col-form-label">Commission Percentage</label>
                    <div className="col-9">
                      <label className="form-control-plaintext">: {profile.brokerDetails.commissionPercentage} </label>
                    </div>
                  </div>                                    
                </div>

              </div>) : null
            }

          </>
        )}

        <br /><br />
        {/* <br /> */}

   <div className="row cols-1">
   <div className="button-container">
    {
      (profile?.profileDetails?.horoScope && hasHoroScopeDataR(profile?.profileDetails?.horoScope)) ? (
        <button onClick={() => onPrintClick()} className="primarybutton print-btn" id='click'>Print profile & horoscope</button>
      ) : (
        <button onClick={() => onPrintClick()} className="primarybutton" id='click'>Print profile</button>
      )
    }
    <button onClick={() => onCancelClick()} className="secondarybutton">Close</button>
  </div>
</div>
        <br />
        <br />


      </div>
    </>
  )
}