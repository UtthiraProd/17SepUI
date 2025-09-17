
import { Carousal } from "../Common/Carousal"
import "../../scss/publicProfile.scss"
import { useEffect, useState } from "react";
import {
  deleteProfile, resetdeleteProfile, getProfileDetailsById,
  resetGetProfileImageUrl, resetGetProfileDetailsById, getPUImageUrl,resetUpdatedProfile
} from "../../Features/Slices/PublicUser/publicUserSlice"
import sessionData from "../../sessionData";
import { useDispatch, useSelector } from 'react-redux'
import { replace, useNavigate } from 'react-router-dom'
import { useLocation, useSearchParams } from 'react-router-dom'
import { Link } from "react-router-dom";
import { toast } from "react-toastify"
import backaero from '../../img/arrow-left-circle-fill.svg'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { ShareImageToWhatsApp } from "../Common/ShareImageToWhatsApp"
//importing pdfmake to generate our PDF file
import pdfMake from "pdfmake/build/pdfmake"
//importing the fonts whichever present inside vfs_fonts file
import pdfFonts from "pdfmake/build/vfs_fonts"
//importing the encoded font file into our project
// import tamilFont from './TamilFontBase64'
import "../../scss/profileList.scss"
import { ValidateFields } from "../../Validation/Common/fieldValidation"
import { formatToTwoDigits } from '../../Utils/formatters'
// import { direction } from "html2canvas/dist/types/css/property-descriptors/direction";

// import { userLoginCreate,resetUserLoginCreate,getBrokerUserOTP,resetGetUserLoginOtp, brokerUserOTPVerify,resetBrokerUserOtpVerify} from "../../Features/Slices/userProfileSlice";
// var RegisterProfileValidation = require('../../Validation/Config/RegisterUser.json')
// import "./pdfmake.scss"
//Making use of all the fonts defined
pdfMake.vfs = pdfFonts.pdfMake.vfs
//Adding our own font into the vfs
// window.pdfMake.vfs["TiroTamil-Regular.ttf"] = tamilFont




export function PublicUserProfile() {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const search = useLocation().search

  const [searchParams] = useSearchParams();

  // console.log(searchParams);
  const profileId = searchParams.get('id')
  const brokerId = searchParams.get('brId')
  const pageIndex = searchParams.get('pageIndex')
  const backScreenName = searchParams.get('name')


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
      (state) => state.public
    )

  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  useEffect(() => {

    dispatch(getProfileDetailsById({ profileId: profileId }))
    dispatch(resetGetProfileImageUrl())
  }, [])

  useEffect(() => {
    dispatch(getPUImageUrl({ profileId: profileId }))
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

  }, [profile.isdeleteProfileSuccess, profile.messagedeleteProfile, profile.isdeleteProfileError]);


  // useEffect(() => {
  //   // dispatch(getProfileImageUrl({ brokerId, profileId }));
  // }, [brokerId, profileId]);

  const [formData, setFormData] = useState({
    deleteName: ''
  })

  let deleteName = "";

  const onProfileBackbuttonClick = (e) => {
    e.preventdefault()
    // navigate('/ProfileList?id='+ brokerId);
    navigate('/BrokerList')
  }

  const [show, setShow] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onDeleteNamechange = (e) => {
    if (e.target.value != profile.profileDetails.name) {
      setHasError(true)
    }
    else {
      setHasError(false)
    }
  }

  const onDeleteClick = (e) => {
    if (document.getElementById("deleteName").value != profile.profileDetails.name) {
      setHasError(true)
      handleShow()
    }
    else {
      handleClose()
      const data = { "profileId": profileId }
      dispatch(deleteProfile(data))
      setIsFormSubmitted(true);

      setTimeout(function () {
        navigate('/PublicUserHome?pageIndex=' + pageIndex, { replace: true });
      }, 5000);

    }
  }

  const [currentImageUrl, setCurrentImageUrl] = useState('');
  const handleImageChange = (imageUrls) => {
    setCurrentImageUrl(imageUrls);
  };

  // function onPrintClick() {
  //    rasiNames = [
  //     profile?.profileDetails?.horoScope?.meenaR, profile?.profileDetails?.horoScope?.meshaR, profile?.profileDetails?.horoScope?.vrishbaR, profile?.profileDetails?.horoScope?.mithunaR,
  //     profile?.profileDetails?.horoScope?.karkataR, profile?.profileDetails?.horoScope?.simhaR, profile?.profileDetails?.horoScope?.kanyaR, profile?.profileDetails?.horoScope?.tulaR,
  //     profile?.profileDetails?.horoScope?.vrishikaR, profile?.profileDetails?.horoScope?.dhanuR, profile?.profileDetails?.horoScope?.makaraR, profile?.profileDetails?.horoScope?.khumbhaR
  //   ];
  //   amsamNames = [
  //     profile?.profileDetails?.horoScope?.meenaA, profile?.profileDetails?.horoScope?.meshaA, profile?.profileDetails?.horoScope?.vrishbaA, profile?.profileDetails?.horoScope?.mithunaA,
  //     profile?.profileDetails?.horoScope?.karkataA, profile?.profileDetails?.horoScope?.simhaA, profile?.profileDetails?.horoScope?.kanyaA, profile?.profileDetails?.horoScope?.tulaA,
  //     profile?.profileDetails?.horoScope?.vrishikaA, profile?.profileDetails?.horoScope?.dhanuA, profile?.profileDetails?.horoScope?.makaraA, profile?.profileDetails?.horoScope?.khumbhaA
  //   ];
  //   const content = [
  //     [{ text: rasiNames[0], alignment: 'center', bold: true, margin: [0, 20] }, { text: rasiNames[1], alignment: 'center', bold: true, margin: [0, 20] }, { text: rasiNames[2], alignment: 'center', bold: true, margin: [0, 20] }, { text: rasiNames[3], alignment: 'center', bold: true, margin: [0, 20] }],
  //     [{ text: rasiNames[11], alignment: 'center', bold: true, margin: [0, 20] }, { text: 'ராசி', alignment: 'center', bold: true, margin: [0, 40], colSpan: 2, rowSpan: 2 }, {}, { text: rasiNames[4], alignment: 'center', bold: true, margin: [0, 20] }],
  //     [{ text: rasiNames[10], alignment: 'center', bold: true, margin: [0, 20] }, {}, {}, { text: rasiNames[5], alignment: 'center', bold: true, margin: [0, 20] }],
  //     [{ text: rasiNames[9], alignment: 'center', bold: true, margin: [0, 20] }, { text: rasiNames[8], alignment: 'center', bold: true, margin: [0, 20] }, { text: rasiNames[7], alignment: 'center', bold: true, margin: [0, 20] }, { text: rasiNames[6], alignment: 'center', bold: true, margin: [0, 20] }]
  //   ];

  //   const content1 = [
  //     [{ text: amsamNames[0], alignment: 'center', bold: true, margin: [0, 20] }, { text: amsamNames[1], alignment: 'center', bold: true, margin: [0, 20] }, { text: amsamNames[2], alignment: 'center', bold: true, margin: [0, 20] }, { text: amsamNames[3], alignment: 'center', bold: true, margin: [0, 20] }],
  //     [{ text: amsamNames[11], alignment: 'center', bold: true, margin: [0, 20] }, { text: 'அம்சம்', alignment: 'center', bold: true, margin: [0, 40], colSpan: 2, rowSpan: 2 }, {}, { text: amsamNames[4], alignment: 'center', bold: true, margin: [0, 20] }],
  //     [{ text: amsamNames[10], alignment: 'center', bold: true, margin: [0, 20] }, {}, {}, { text: amsamNames[5], alignment: 'center', bold: true, margin: [0, 20] }],
  //     [{ text: amsamNames[9], alignment: 'center', bold: true, margin: [0, 20] }, { text: amsamNames[8], alignment: 'center', bold: true, margin: [0, 20] }, { text: amsamNames[7], alignment: 'center', bold: true, margin: [0, 20] }, { text: amsamNames[6], alignment: 'center', bold: true, margin: [0, 20] }]
  //   ];

  //   pdfMake.fonts = {
  //     TiroTamilRegular: {
  //       normal: 'TiroTamil-Regular.ttf',
  //       bold: 'TiroTamil-Regular.ttf',
  //       italics: 'TiroTamil-Regular.ttf',
  //       bolditalics: 'TiroTamil-Regular.ttf'
  //     }

  //   }
  //    var docDefinition = {
  //     content: [
  //       {
  //         text: profile.brokerDetails.description,
  //         style: 'header',
  //         alignment: 'center',
  //       },
  //       {
  //         text: 'Broker Detail',
  //         style: 'subheader',
  //       },
  //       {
  //         columns: [
  //           {
  //             width: '50%',
  //             text: [
  //               { text: 'Name: ', bold: true }, profile.brokerDetails.name + '\n',
  //               { text: 'Phone: ', bold: true }, profile.brokerDetails.phoneNumber + '\n',
  //             ],
  //           },
  //           {
  //             width: '50%',
  //             text: [
  //               { text: 'Address: ', bold: true }, profile.brokerDetails.address1 + ',' + profile.brokerDetails.address2 + '\n',
  //               // { text: 'Email: ', bold: true }, profile.brokerDetails+'\n\n',
  //             ],
  //           },
  //         ],
  //       },
  //       {
  //         text: 'Profile Details',
  //         style: 'subheader',
  //       },


  //       {
  //         columns: [
  //           {
  //             width: '25%',
  //             stack: [
  //               { text: 'Name ', bold: true, margin: [0, 0, 0, 6] }, // Added margin bottom
  //               { text: 'Profile ID ', margin: [0, 0, 0, 6] }, // Added margin bottom
  //               { text: 'Gender ', margin: [0, 0, 0, 6] }, // Added margin bottom
  //               { text: 'Date of birth', margin: [0, 0, 0, 6] },
  //               { text: 'Time of birth', margin: [0, 0, 0, 6] },
  //               { text: 'Height(feet)', margin: [0, 0, 0, 6] },
  //               { text: 'Weight(kg)', margin: [0, 0, 0, 6] },
  //               { text: 'Colour', margin: [0, 0, 0, 6] },
  //               { text: 'Mother Tongue ', margin: [0, 0, 0, 6] },
  //               { text: 'Star ', bold: true, margin: [0, 0, 0, 6] },
  //               { text: 'Rasi', margin: [0, 0, 0, 6] },
  //               { text: 'Qualification', margin: [0, 0, 0, 6] }, // Added margin bottom
  //               { text: 'Job Title ', bold: true, margin: [0, 0, 0, 6] },
  //               { text: 'Salary per month', margin: [0, 0, 0, 6] },
  //               { text: 'Father Name', margin: [0, 0, 0, 6] },
  //               { text: 'Father Occupation', margin: [0, 0, 0, 6] },
  //               { text: 'Mother Name', margin: [0, 0, 0, 6] },
  //               { text: 'Mother Occupation', margin: [0, 0, 0, 6] },
  //               { text: 'Sister(s) Married', margin: [0, 0, 0, 6] },
  //               { text: 'Sister(s) Unmarried', margin: [0, 0, 0, 6] },
  //               { text: 'Brother(s) Married', margin: [0, 0, 0, 6] },
  //               { text: 'Brother(s) Unmarried', margin: [0, 0, 0, 6] },
  //             ],
  //           },
  //           {
  //             width: '5%',
  //             stack: [
  //               { text: ':', bold: true, margin: [0, 0, 0, 6] }, // Added margin bottom
  //               { text: ':', margin: [0, 0, 0, 6] }, // Added margin bottom
  //               { text: ':', margin: [0, 0, 0, 6] },
  //               { text: ':', margin: [0, 0, 0, 6] },
  //               { text: ':', margin: [0, 0, 0, 6] },
  //               { text: ':', margin: [0, 0, 0, 6] },
  //               { text: ':', margin: [0, 0, 0, 6] },
  //               { text: ':', margin: [0, 0, 0, 6] },
  //               { text: ':', margin: [0, 0, 0, 6] },
  //               { text: ':', bold: true, margin: [0, 0, 0, 6] },
  //               { text: ':', margin: [0, 0, 0, 6] },
  //               { text: ':', margin: [0, 0, 0, 6] },
  //               { text: ':', bold: true, margin: [0, 0, 0, 6] },
  //               { text: ':', margin: [0, 0, 0, 6] },
  //               { text: ':', margin: [0, 0, 0, 6] },
  //               { text: ':', margin: [0, 0, 0, 6] },
  //               { text: ':', margin: [0, 0, 0, 6] },
  //               { text: ':', margin: [0, 0, 0, 6] },
  //               { text: ':', margin: [0, 0, 0, 6] },
  //               { text: ':', margin: [0, 0, 0, 6] },
  //               { text: ':', margin: [0, 0, 0, 6] },
  //               { text: ':', margin: [0, 0, 0, 6] }
  //             ]
  //           },
  //           {
  //             width: '70%',
  //             stack: [
  //               { text: profile?.profileDetails?.name || "-", bold: true, margin: [0, 0, 0, 6] },
  //               { text: profile?.profileDetails?.sex === 'Male'? `UM${profile?.profileDetails?.profileID || "-"}`
  //                     : profile?.profileDetails?.sex === 'Female'? `UF${profile?.profileDetails?.profileID || "-"}`
  //                     : null,margin: [0, 0, 0, 6]},
  //               { text: profile?.profileDetails?.sex || "-", margin: [0, 0, 0, 6] },
  //               { text: (profile?.profileDetails?.DOB.split('T')[0]) || "-", margin: [0, 0, 0, 6] },
  //               // { text: profile.profileDetails.birthTime || "-", margin: [0, 0, 0, 8] },
  //               { text: `${(profile?.profileDetails?.birthHour==null||profile?.profileDetails?.birthHour==undefined || profile?.profileDetails?.birthHour=='null')?'': profile?.profileDetails?.birthHour +':'}${formatToTwoDigits(profile?.profileDetails?.birthMin )} ${profile?.profileDetails?.meridiem }` ||  "-",margin: [0, 0, 0, 6]},
  //               { text: profile?.profileDetails?.height || "-", margin: [0, 0, 0, 6] },
  //               { text: profile?.profileDetails?.weight || "-", margin: [0, 0, 0, 6] },
  //               { text: profile?.profileDetails?.colour || "-", margin: [0, 0, 0, 6] },
  //               { text: profile?.profileDetails?.motherTongue || "-", margin: [0, 0, 0, 6] },
  //               { text: profile?.profileDetails?.star || "-", bold: true, margin: [0, 0, 0, 6] },
  //               { text: profile?.profileDetails?.rasi || "-", margin: [0, 0, 0, 6] },
  //               { text: profile?.profileDetails?.qualification || "-", margin: [0, 0, 0, 6] },
  //               { text: profile?.profileDetails?.job || "-", bold: true, margin: [0, 0, 0, 6] },
  //               { text: profile?.profileDetails?.salary || "-", margin: [0, 0, 0, 6] },
  //               { text: profile?.profileDetails?.fatherName || "-", margin: [0, 0, 0, 6] },
  //               { text: profile?.profileDetails?.fatherOccupation || "-", margin: [0, 0, 0, 6] },
  //               { text: profile?.profileDetails?.motherName || "-", margin: [0, 0, 0, 6] },
  //               { text: profile?.profileDetails?.motherOccupation || "-", margin: [0, 0, 0, 6] },
  //               { text: profile?.profileDetails?.sistersMarried || "-", margin: [0, 0, 0, 6] },
  //               { text: profile?.profileDetails?.sistersUnmarried || "-", margin: [0, 0, 0, 6] },
  //               { text: profile?.profileDetails?.brothersMarried || "-", margin: [0, 0, 0, 6] },
  //               { text: profile?.profileDetails?.brothersUnmarried || "-", margin: [0, 0, 0, 6] },
  //             ],
  //           },
  //         ],
  //       },
  //       {

  //         columns: [
  //           {
  //             width: '50%',
  //             style: 'table',
  //             table: {
  //               widths: [50, 50, 50, 50],
  //               body: content
  //             },
  //             layout: {
  //               hLineColor: () => '#000000',
  //               vLineColor: () => '#000000',
  //               hLineWidth: () => 1,
  //               vLineWidth: () => 1
  //             }
  //           },
  //           {
  //             width: '50%',
  //             style: 'table',
  //             table: {
  //               widths: [50, 50, 50, 50],
  //               body: content1
  //             },
  //             layout: {
  //               hLineColor: () => '#000000',
  //               vLineColor: () => '#000000',
  //               hLineWidth: () => 1,
  //               vLineWidth: () => 1
  //             }
  //           }
  //         ]

  //       },

  //       {
  //         columns: [
  //           {
  //             width: '20%',
  //             stack: [
  //               { text: 'திசை இருப்பு : ', bold: true, margin: [0, 10, 0, 0] }, // Added margin bottom

  //             ],
  //           },
  //           {
  //             width: '20%',
  //             stack: [{ text: profile?.profileDetails?.horoScope?.dhasa, bold: true, margin: [0, 10, 0, 0] }, // Added margin bottom

  //             ]
  //           },
  //           {
  //             width: '3%',
  //             stack: [
  //               { text: profile?.profileDetails?.horoScope?.year, bold: true, margin: [0, 10, 0, 0] },

  //             ],
  //           },
  //           {
  //             width: '15%',
  //             stack: [
  //               { text: 'வருடம்', bold: true, margin: [0, 10, 0, 0] },

  //             ],
  //           },
  //           {
  //             width: '3%',
  //             stack: [
  //               { text: profile?.profileDetails?.horoScope?.month, bold: true, margin: [0, 10, 0, 0] },

  //             ],
  //           },
  //           {
  //             width: '10%',
  //             stack: [
  //               { text: 'மாதம்', bold: true, margin: [0, 10, 0, 0] },

  //             ],
  //           },
  //           {
  //             width: '3%',
  //             stack: [
  //               { text: profile?.profileDetails?.horoScope?.day, bold: true, margin: [0, 10, 0, 0] },

  //             ],
  //           },
  //           {
  //             width: '10%',
  //             stack: [
  //               { text: 'நாள்', bold: true, margin: [0, 10, 0, 0] },

  //             ],
  //           },
  //         ],
  //       },

  //     ],
  //     styles: {
  //       header: {
  //         fontSize: 22,
  //         bold: true,
  //         margin: [0, 0, 0, 10],
  //       },
  //       subheader: {
  //         fontSize: 16,
  //         bold: true,
  //         margin: [0, 10, 0, 5],
  //       },
  //       tableHeader: {
  //         bold: true,
  //         fontSize: 13,
  //         color: 'black',
  //       },
  //       table: {
  //         margin: [0, 5, 0, 1]
  //       }
  //     },
  //     defaultStyle: {
  //       font: 'TiroTamilRegular',
  //     },
  //   };
  //   let fileName = profile.profileDetails.name + "_Biodata.pdf"
  //   pdfMake.createPdf(docDefinition).download(fileName);
  // }
  const onCancelClick = (e) => {
    //   if(backScreenName == "userProfile"){
    //     navigate('/UserProfileList');
    //  }
    // else if(backScreenName == "profileList"){
    //    //navigate('/ProfileList');
    //      navigate('/ProfileList?pageIndex='+ pageIndex, { replace: true });
    // }
    navigate('/PublicUserHome', { replace: true });
  }

  const formatDate = (dateTime) => {

    const date = new Date(dateTime);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(date.getDate()).padStart(2, '0');
    return `${day}/${month}/${year}`; // Format as YYYY-MM-DD

  }

  const backEditHoroscope = () => {
    //  if(backScreenName == "userProfile"){
    //      navigate('/PUAddProfileImage?id=' + profileId +  "&name=userProfile");
    //   }
    //  else 
    //  if(backScreenName == "profileList"){
    //     navigate('/AddProfileImage?id=' + profileId + "&name=profileList&pageIndex="+ pageIndex);
    //  }
    // navigate('/PUAddProfileImage?id=' + profileId +  "&name=VieProDetails");
    navigate('/PUAddProfileImage?id=' + profileId + "&name=VieProDetails");
  }

  const backEditProfile = () => {
    // //  dispatch(resetGetProfileImageUrl())
    //    if(backScreenName == "userProfile"){
    //        navigate('/EditProfile?id=' + profileId +  "&name=userProfile");
    //     }
    //    else 
    //    if(backScreenName == "profileList"){
    //       navigate('/EditProfile?id=' + profileId + "&name=profileList&pageIndex="+ pageIndex);
    //    }
    navigate('/PUEditProfile?id=' + profileId);
    dispatch(resetUpdatedProfile())
  }

  const backuButtonUrl = () => {
    //  dispatch(resetGetProfileImageUrl())
    //  dispatch(resetGetProfileDetailsById())
    //  if(backScreenName == "userProfile"){
    //      navigate('/UserProfileList');
    //   }
    //  else if(backScreenName == "profileList"){
    //    // navigate('/ProfileList');
    //      navigate('/ProfileList?pageIndex='+ pageIndex, { replace: true });
    //  }
    navigate('/PublicUserHome', { replace: true });
  }

  const backToAddImage =() =>{
    navigate('/PUAddProfileImage?id=' + profileId + "&name=VieProDetails");
  }

  return (
    <>

      <div>

        <div className="dropdown-item d-flex align-items-center" >
          <svg onClick={backuButtonUrl} style={{ cursor: 'pointer' }} xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#1aa179" className="bi bi-arrow-left-circle" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z" />
          </svg>
          <p className="h6 mb-0 ms-2" onClick={backuButtonUrl} style={{ cursor: 'pointer' }}>Go Back</p>
        </div>

        <div> <br /> </div>

        <div onClick={backEditProfile}>
          <Link className="dropdown-item">
            <p className="h4">Profile Details
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
              </svg>
            </p>
          </Link>
        </div>


        <div id="dvpublicProfile" className="row">
          <div className="col-md-8">

            {profile.isProfileDetailsByIdError && profile.isError ? <div>Error while loading</div> : null}

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

                <p className="h5">1. Personal details</p><br />

                <div className="row">
                  {/* <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Profile ID</label> */}
                  <div className="col-8">
                    {/* <label className="form-control-plaintext">:
                      {profile?.profileDetails?.sex === 'Male' ? (
                        `UM${profile?.profileDetails?.profileID}`
                      ) : profile?.profileDetails?.sex === 'Female' ? (
                         `UF${profile?.profileDetails?.profileID}`
                      ): (
                        
                        <p>null</p>
                    )}               
                       
                       </label> */}
                  </div>
                </div>

                <div className="row">
                  <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Name</label>
                  <div className="col-8">
                    <label className="form-control-plaintext">: {profile?.profileDetails?.name}</label>
                  </div>
                </div>

                <div className="row">
                  <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Sex</label>
                  <div className="col-8">
                    <label className="form-control-plaintext">: {profile?.profileDetails?.sex}</label>
                  </div>
                </div>

                <div className="row">
                  <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Marital Status</label>
                  <div className="col-8">
                    <label className="form-control-plaintext">: {profile?.profileDetails?.maritalstatus}</label>
                  </div>
                </div>

                <div className="row">
                  <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Blood group</label>
                  <div className="col-8">
                    <label className="form-control-plaintext">: {profile?.profileDetails?.bloodGroup}</label>
                  </div>
                </div>

                <div className="row">
                  <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Height (cm)</label>
                  <div className="col-8">
                    <label className="form-control-plaintext">: {profile?.profileDetails?.height}</label>
                  </div>
                </div>

                <div className="row">
                  <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Weight (kg)</label>
                  <div className="col-8">
                    <label className="form-control-plaintext">: {profile?.profileDetails?.weight} </label>
                  </div>
                </div>

                <div className="row">
                  <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Colour</label>
                  <div className="col-8">
                    <label className="form-control-plaintext">: {profile?.profileDetails?.colour}</label>
                  </div>
                </div>

                <div className="row">
                  <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Food preference</label>
                  <div className="col-8">
                    <label className="form-control-plaintext">: {profile?.profileDetails?.foodPreference}</label>
                  </div>
                </div>

                <div className="row">
                  <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Mother tongue</label>
                  <div className="col-8">
                    <label className="form-control-plaintext">: {profile?.profileDetails?.motherTongue}</label>
                  </div>
                </div>

                <div className="row">
                  <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Religion</label>
                  <div className="col-8">
                    <label className="form-control-plaintext">: {profile?.profileDetails?.religion}</label>
                  </div>
                </div>

                <div className="row">
                  <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Caste</label>
                  <div className="col-8">
                    <label className="form-control-plaintext">: {profile?.profileDetails?.caste}</label>
                  </div>
                </div>

                <div className="row">
                  <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Sub Caste</label>
                  <div className="col-8">
                    <label className="form-control-plaintext">: {profile?.profileDetails?.subcaste}</label>
                  </div>
                </div>



              </>
            )}


          </div>



          <div className="col-md-4">

            {profile.isProfileDetailsByIdError && profile.isError ? <div>Error while loading</div> : null}

            <div className="card-container">
              {profile.isProfileDetailsByIdLoading && (
                <>
                  <div className="section-skeleton">
                    <div className="skeleton skeleton-Detail-section1"></div>
                  </div>
                </>

              )}
            </div>

            {profile.isProfileDetailsByIdSuccess && !profile.isProfileDetailsByIdLoading && (
            profile && profile.isGetPUImageSuccess && profile.getPUImageList.length > 0 ? (
              <div>

                <Carousal imageUrls={profile.getPUImageList} onImageChange={handleImageChange} />
              </div>
            ):(
              <div onClick={backToAddImage}>
                  <Link className="dropdown-item">
                    <br /><br /><br />
                    <p>
                      <span style={{ fontWeight: 'bold', color: '#ff5722' }}>Image</span> not available.
                      <span
                        style={{ cursor: 'pointer', color: '#1aa179', display: 'inline-flex', alignItems: 'center', marginLeft: '8px' }}
                      >
                        Add Image
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-plus-square" viewBox="0 0 16 16" style={{ marginLeft: '8px' }}>
                          <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
                          <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                        </svg>
                      </span>
                    </p>
                  </Link>
                </div>
            )
            )}




            {/* {profile.isProfileDetailsByIdSuccess && !profile.isProfileDetailsByIdLoading && (
              profile && profile.getPUImageList && profile.getPUImageList.length > 0 ? (
                <div>
                  <img src={profile.getPUImageList} alt="" />
                </div>
              ) : (
                <div onClick={backEditHoroscope}>
                  <Link className="dropdown-item">
                    <br /><br /><br />
                    <p>
                      <span style={{ fontWeight: 'bold', color: '#ff5722' }}>Image</span> not available.
                      <span
                        style={{ cursor: 'pointer', color: '#1aa179', display: 'inline-flex', alignItems: 'center', marginLeft: '8px' }}
                      >
                        Add Image
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-plus-square" viewBox="0 0 16 16" style={{ marginLeft: '8px' }}>
                          <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
                          <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                        </svg>
                      </span>
                    </p>
                  </Link>
                </div>
              )
            )} */}


          </div>
        </div>

        <div id="dvpublicProfile" className="row">


          {profile.isProfileDetailsByIdError && profile.isError ? <div>Error while loading</div> : null}

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
                <div className="col-8">
                  <label className="form-control-plaintext">:  {profile?.profileDetails?.additionalQualification ? `${profile?.profileDetails?.additionalQualification},${profile?.profileDetails?.qualification}`:
                  profile?.profileDetails?.qualification}</label>
                </div>
              </div>

              

              <div className="row">
                <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Job Title</label>
                <div className="col-8">
                  <label className="form-control-plaintext">: {profile?.profileDetails?.job}</label>
                </div>
              </div>

              <div className="row">
                <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Job Description</label>
                <div className="col-8">
                  <label className="form-control-plaintext">: {profile?.profileDetails?.jobDescription}</label>
                </div>
              </div>

              <div className="row">
                <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Salary per month</label>
                <div className="col-8">
                  <label className="form-control-plaintext">: {profile?.profileDetails?.salary}</label>
                </div>
              </div>

              <div className="row">
                <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Job in abroad ?</label>
                <div className="col-8">
                  <label className="form-control-plaintext">: {profile?.profileDetails?.jobInAbroad}</label>
                </div>
              </div>

              <div className="row">
                <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Job location</label>
                <div className="col-8">
                  <label className="form-control-plaintext">: {profile?.profileDetails?.jobLocation}</label>
                </div>
              </div>

              <div className="row">
                <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Job Country</label>
                <div className="col-8">
                  <label className="form-control-plaintext">: {profile?.profileDetails?.foreignCountry}</label>
                </div>
              </div>




            </>
          )}


        </div>



        <div id="dvpublicProfile" className="row">


          {profile.isProfileDetailsByIdError && profile.isError ? <div>Error while loading</div> : null}

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
                  <label className="form-control-plaintext">: {profile?.profileDetails?.fatherName}</label>
                </div>
              </div>

              <div className="row">
                <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Father occupation</label>
                <div className="col-8">
                  <label className="form-control-plaintext">: {profile?.profileDetails?.fatherOccupation}</label>
                </div>
              </div>

              <div className="row">
                <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Mother Name</label>
                <div className="col-8">
                  <label className="form-control-plaintext">: {profile?.profileDetails?.motherName}</label>
                </div>
              </div>

              <div className="row">
                <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Mother occupation</label>
                <div className="col-8">
                  <label className="form-control-plaintext">: {profile?.profileDetails?.motherOccupation}</label>
                </div>
              </div>

              <div className="row">
                <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Sister(s) Married</label>
                <div className="col-8">
                  <label className="form-control-plaintext">: {profile?.profileDetails?.sistersMarried}</label>
                </div>
              </div>

              <div className="row">
                <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Sister(s) Unmarried</label>
                <div className="col-8">
                  <label className="form-control-plaintext">: {profile?.profileDetails?.sistersUnmarried}</label>
                </div>
              </div>

              <div className="row">
                <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Brother(s) Married</label>
                <div className="col-8">
                  <label className="form-control-plaintext">: {profile?.profileDetails?.brothersMarried}</label>
                </div>
              </div>

              <div className="row">
                <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Brother(s) Unmarried</label>
                <div className="col-8">
                  <label className="form-control-plaintext">: {profile?.profileDetails?.brothersUnmarried}</label>
                </div>
              </div>

              <div className="row">
                <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Settled Location</label>
                <div className="col-8">
                  <label className="form-control-plaintext">: {profile?.profileDetails?.settledLocation}</label>
                </div>
              </div>




            </>
          )}


        </div>




        <div id="dvpublicProfile" className="row">


          {profile.isProfileDetailsByIdError && profile.isError ? <div>Error while loading</div> : null}

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

              <p className="h5">4. Family Contact details</p>

              <div className="row">
                <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Contact person</label>
                <div className="col-8">
                  <label className="form-control-plaintext">: {profile?.profileDetails?.contactPerson}</label>
                </div>
              </div>

              <div className="row">
                <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Contact number</label>
                <div className="col-8">
                  <label className="form-control-plaintext">: {profile?.profileDetails?.phoneNumber}</label>
                </div>
              </div>

              <div className="row">
                <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Address of family's Residence</label>
                <div className="col-8">
                  <label className="form-control-plaintext">: {profile?.profileDetails?.address1}, {profile?.profileDetails?.address2}, {profile?.profileDetails?.district}, {profile?.profileDetails?.state}</label>
                </div>
              </div>

            </>
          )}


        </div>


        <div id="dvpublicProfile" className="row">


          {profile.isProfileDetailsByIdError && profile.isError ? <div>Error while loading</div> : null}

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

              <p className="h5">5. Additional Information</p>

              <div className="row">
                <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Self Description</label>
                <div className="col-8">
                  <label className="form-control-plaintext">: {profile?.profileDetails?.selfDescription}</label>
                </div>
              </div>

              <div className="row">
                <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Expectation from marriage</label>
                <div className="col-8">
                  <label className="form-control-plaintext">: {profile?.profileDetails?.expectationFromMarriage}</label>
                </div>
              </div>

              <div className="row">
                <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Notes</label>
                <div className="col-8">
                  <label className="form-control-plaintext">: {profile?.profileDetails?.notes}</label>
                </div>
              </div>

            </>
          )}
        </div>





        <br></br>
        <div onClick={backEditHoroscope}>
          <Link className="dropdown-item">
            <br /><br />
            <p className="h4">Horoscope Details
              <span>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                  <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                </svg>
              </span>
            </p>
          </Link>
        </div>


        {profile.isProfileDetailsByIdError && profile.isError ? <div>Error while loading</div> : null}

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
                  <div className="col-8">
                    <label className="form-control-plaintext">: {formatDate(profile?.profileDetails?.DOB)}</label>
                  </div>
                </div>

                <div className="row">
                  <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Birth Time</label>
                  {/* <div className="col-8">
                    <label className="form-control-plaintext">: {formatToTwoDigits(profile?.profileDetails?.birthHour)}{formatToTwoDigits(profile?.profileDetails?.birthMin)} {profile?.profileDetails?.meridiem}</label>
                  </div> */}
<div className="col-8">
  <label className="form-control-plaintext">:
    {
      profile?.profileDetails?.birthHour != null &&
      profile?.profileDetails?.birthMin != null &&
      profile?.profileDetails?.meridiem
        ? ` ${formatToTwoDigits(profile.profileDetails.birthHour)}:${formatToTwoDigits(profile.profileDetails.birthMin)} ${profile.profileDetails.meridiem}`
        : ''
    }
  </label>
</div>                  
                </div>

                <div className="row">
                  <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Place of Birth</label>
                  <div className="col-8">
                    <label className="form-control-plaintext">: {profile?.profileDetails?.POB}</label>
                  </div>
                </div>

                <div className="row">
                  <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Star</label>
                  <div className="col-8">
                    <label className="form-control-plaintext">: {profile?.profileDetails?.star}</label>
                  </div>
                </div>

                <div className="row">
                  <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Rasi</label>
                  <div className="col-8">
                    <label className="form-control-plaintext">: {profile?.profileDetails?.rasi}</label>
                  </div>
                </div>

                <div className="row">
                  <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Dhosam</label>
                  <div className="col-8">
                    <label className="form-control-plaintext">: {profile?.profileDetails?.dhosam}</label>
                  </div>
                </div>

                <div className="row">
                  <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">திசைஇருப்பு</label>
                  <div className="col-8">
                    <label className="form-control-plaintext">: {profile?.profileDetails?.horoScope?.dhasa}</label>
                  </div>
                </div>

                <div className="row">
                  <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">வருடம்</label>
                  <div className="col-8">
                    <label className="form-control-plaintext">: {profile?.profileDetails?.horoScope?.year}</label>
                  </div>
                </div>

                <div className="row">
                  <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">மாதம்</label>
                  <div className="col-8">
                    <label className="form-control-plaintext">: {profile?.profileDetails?.horoScope?.month}</label>
                  </div>
                </div>

                <div className="row">
                  <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">நாள்</label>
                  <div className="col-8">
                    <label className="form-control-plaintext">: {profile?.profileDetails?.horoScope?.day}</label>
                  </div>
                </div>

                <br /><br />
              </div>

              <div className="col-md-8">
                {profile?.profileDetails?.horoScope && hasHoroScopeDataR(profile.profileDetails.horoScope) ? (
                  <div className="row">
                    <div className="row">
                      <div className="col-3 horo-column">&nbsp;
                        {profile?.profileDetails?.horoScope?.meenaR?.split(' ').map((item, index) => (
                          <span className={item === 'ல' ? 'red-text' : ''} key={index}>
                            {item === ' ' ? '\u00A0' : item} {/* Handle spaces */}
                          </span>
                        ))}
                      </div>

                      <div className="col-3 horo-column">&nbsp;
                        {profile?.profileDetails?.horoScope?.meshaR?.split(' ').map((item, index) => (
                          <span className={item === 'ல' ? 'red-text' : ''} key={index}>
                            {item === ' ' ? '\u00A0' : item} {/* Handle spaces */}
                          </span>
                        ))}
                      </div>

                      <div className="col-3 horo-column">&nbsp;
                        {profile?.profileDetails?.horoScope?.vrishbaR?.split(' ').map((item, index) => (
                          <span className={item === 'ல' ? 'red-text' : ''} key={index}>
                            {item === ' ' ? '\u00A0' : item} {/* Handle spaces */}
                          </span>
                        ))}
                      </div>

                      <div className="col-3 horo-column">&nbsp;
                        {profile?.profileDetails?.horoScope?.mithunaR?.split(' ').map((item, index) => (
                          <span className={item === 'ல' ? 'red-text' : ''} key={index}>
                            {item === ' ' ? '\u00A0' : item} {/* Handle spaces */}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-3 horo-column">&nbsp;
                        {profile?.profileDetails?.horoScope?.khumbhaR?.split(' ').map((item, index) => (
                          <span className={item === 'ல' ? 'red-text' : ''} key={index}>
                            {item === ' ' ? '\u00A0' : item} {/* Handle spaces */}
                          </span>
                        ))}
                      </div>

                      <div className="col-6 text-center"><br /><h5><b>ராசி</b></h5></div>
                      <div className="col-3 horo-column">&nbsp;
                        {profile?.profileDetails?.horoScope?.karkataR?.split(' ').map((item, index) => (
                          <span className={item === 'ல' ? 'red-text' : ''} key={index}>
                            {item === ' ' ? '\u00A0' : item} {/* Handle spaces */}
                          </span>
                        ))}
                      </div>
                    </div>


                    <div className="row">
                      <div className="col-3 horo-column">&nbsp;
                        {profile?.profileDetails?.horoScope?.makaraR?.split(' ').map((item, index) => (
                          <span className={item === 'ல' ? 'red-text' : ''} key={index}>
                            {item === ' ' ? '\u00A0' : item} {/* Handle spaces */}
                          </span>
                        ))}
                      </div>


                      <div className="col-6"></div>
                      <div className="col-3 horo-column">&nbsp;
                        {profile?.profileDetails?.horoScope?.simhaR?.split(' ').map((item, index) => (
                          <span className={item === 'ல' ? 'red-text' : ''} key={index}>
                            {item === ' ' ? '\u00A0' : item} {/* Handle spaces */}
                          </span>
                        ))}
                      </div>
                    </div>


                    <div className="row">
                      <div className="col-3 horo-column">&nbsp;
                        {profile?.profileDetails?.horoScope?.dhanuR?.split(' ').map((item, index) => (
                          <span className={item === 'ல' ? 'red-text' : ''} key={index}>
                            {item === ' ' ? '\u00A0' : item} {/* Handle spaces */}
                          </span>
                        ))}
                      </div>


                      <div className="col-3 horo-column">&nbsp;
                        {profile?.profileDetails?.horoScope?.vrishikaR?.split(' ').map((item, index) => (
                          <span className={item === 'ல' ? 'red-text' : ''} key={index}>
                            {item === ' ' ? '\u00A0' : item} {/* Handle spaces */}
                          </span>
                        ))}
                      </div>


                      <div className="col-3 horo-column">&nbsp;
                        {profile?.profileDetails?.horoScope?.tulaR?.split(' ').map((item, index) => (
                          <span className={item === 'ல' ? 'red-text' : ''} key={index}>
                            {item === ' ' ? '\u00A0' : item} {/* Handle spaces */}
                          </span>
                        ))}
                      </div>


                      <div className="col-3 horo-column">&nbsp;
                        {profile?.profileDetails?.horoScope?.kanyaR?.split(' ').map((item, index) => (
                          <span className={item === 'ல' ? 'red-text' : ''} key={index}>
                            {item === ' ' ? '\u00A0' : item} {/* Handle spaces */}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                ) : (
                  // Display this message if no horoscope data is found or all values are empty
                  <div className="row" onClick={backEditHoroscope}>

                    <Link className="dropdown-item">
                      <p>
                        <span style={{ fontWeight: 'bold', color: '#ff5722' }}>ராசி</span> not available.
                        <span
                          style={{ cursor: 'pointer', color: '#1aa179', display: 'inline-flex', alignItems: 'center', marginLeft: '8px' }}
                        >
                          Add Horoscope
                          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-plus-square" viewBox="0 0 16 16" style={{ marginLeft: '8px' }}>
                            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                          </svg>
                        </span>
                      </p>
                    </Link>
                  </div>
                )}

                <br></br><br /><br />

                {profile?.profileDetails?.horoScope && hasHoroScopeDataA(profile?.profileDetails?.horoScope) ? (

                  <div className="row">
                    <div className="row">
                      <div className="col-3 horo-column">&nbsp;
                        {profile?.profileDetails?.horoScope?.meenaA?.split(' ').map((item, index) => (
                          <span style={{ color: item === 'ல' ? 'red' : 'black' }} key={index}>
                            {item === ' ' ? '\u00A0' : item} {/* Handle spaces as well */}
                          </span>
                        ))}
                      </div>


                      <div className="col-3 horo-column">&nbsp;
                        {profile?.profileDetails?.horoScope?.meshaA?.split(' ').map((item, index) => (
                          <span style={{ color: item === 'ல' ? 'red' : 'black' }} key={index}>
                            {item === ' ' ? '\u00A0' : item} {/* Handle spaces as well */}
                          </span>
                        ))}
                      </div>


                      <div className="col-3 horo-column">&nbsp;
                        {profile?.profileDetails?.horoScope?.vrishbaA?.split(' ').map((item, index) => (
                          <span style={{ color: item === 'ல' ? 'red' : 'black' }} key={index}>
                            {item === ' ' ? '\u00A0' : item} {/* Handle spaces as well */}
                          </span>
                        ))}
                      </div>


                      <div className="col-3 horo-column">&nbsp;
                        {profile?.profileDetails?.horoScope?.mithunaA?.split(' ').map((item, index) => (
                          <span style={{ color: item === 'ல' ? 'red' : 'black' }} key={index}>
                            {item === ' ' ? '\u00A0' : item} {/* Handle spaces as well */}
                          </span>
                        ))}
                      </div>
                    </div>


                    <div className="row">
                      <div className="col-3 horo-column">&nbsp;
                        {profile?.profileDetails?.horoScope?.khumbhaA?.split(' ').map((item, index) => (
                          <span style={{ color: item === 'ல' ? 'red' : 'black' }} key={index}>
                            {item === ' ' ? '\u00A0' : item} {/* Handle spaces as well */}
                          </span>
                        ))}
                      </div>


                      <div className="col-6 text-center"><br /><h5><b>அம்சம்</b></h5></div>

                      <div className="col-3 horo-column">&nbsp;
                        {profile?.profileDetails?.horoScope?.karkataA?.split(' ').map((item, index) => (
                          <span style={{ color: item === 'ல' ? 'red' : 'black' }} key={index}>
                            {item === ' ' ? '\u00A0' : item} {/* Handle spaces as well */}
                          </span>
                        ))}
                      </div>
                    </div>


                    <div className="row">
                      <div className="col-3 horo-column">&nbsp;
                        {profile?.profileDetails?.horoScope?.makaraA?.split(' ').map((item, index) => (
                          <span style={{ color: item === 'ல' ? 'red' : 'black' }} key={index}>
                            {item === ' ' ? '\u00A0' : item} {/* Handle spaces as well */}
                          </span>
                        ))}
                      </div>


                      <div className="col-6"></div>
                      <div className="col-3 horo-column">&nbsp;
                        {profile?.profileDetails?.horoScope?.simhaA?.split(' ').map((item, index) => (
                          <span style={{ color: item === 'ல' ? 'red' : 'black' }} key={index}>
                            {item === ' ' ? '\u00A0' : item} {/* Handle spaces as well */}
                          </span>
                        ))}
                      </div>
                    </div>


                    <div className="row">
                      <div className="col-3 horo-column">&nbsp;
                        {profile?.profileDetails?.horoScope?.dhanuA?.split(' ').map((item, index) => (
                          <span style={{ color: item === 'ல' ? 'red' : 'black' }} key={index}>
                            {item === ' ' ? '\u00A0' : item} {/* Handle spaces as well */}
                          </span>
                        ))}
                      </div>


                      <div className="col-3 horo-column">&nbsp;
                        {profile?.profileDetails?.horoScope?.vrishikaA?.split(' ').map((item, index) => (
                          <span style={{ color: item === 'ல' ? 'red' : 'black' }} key={index}>
                            {item === ' ' ? '\u00A0' : item} {/* Handle spaces as well */}
                          </span>
                        ))}
                      </div>


                      <div className="col-3 horo-column">&nbsp;
                        {profile?.profileDetails?.horoScope?.tulaA?.split(' ').map((item, index) => (
                          <span style={{ color: item === 'ல' ? 'red' : 'black' }} key={index}>
                            {item === ' ' ? '\u00A0' : item} {/* Handle spaces as well */}
                          </span>
                        ))}
                      </div>


                      <div className="col-3 horo-column">&nbsp;
                        {profile?.profileDetails?.horoScope?.kanyaA?.split(' ').map((item, index) => (
                          <span style={{ color: item === 'ல' ? 'red' : 'black' }} key={index}>
                            {item === ' ' ? '\u00A0' : item} {/* Handle spaces as well */}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                ) : (
                  // Display this message if no horoscope data is found or all values are empty
                  <div className="row" onClick={backEditHoroscope}>
                    <Link className="dropdown-item">
                      <p>
                        <span style={{ fontWeight: 'bold', color: '#ff5722' }}>அம்சம்</span> not available.
                        <span
                          style={{ cursor: 'pointer', color: '#1aa179', display: 'inline-flex', alignItems: 'center', marginLeft: '8px' }}
                        >
                          Add Horoscope
                          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-plus-square" viewBox="0 0 16 16" style={{ marginLeft: '8px' }}>
                            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                          </svg>
                        </span>
                      </p>
                    </Link>
                  </div>
                )}


              </div>

            </div>

          </>
        )}
        <br />

        <div className="row" >
          <div className="button-container">
            <button className="secondarybutton" onClick={handleShow}>Delete</button>
            <button onClick={() => onCancelClick()} className="secondarybutton">Close</button>
          </div>

        </div>
        <br />
        <br />


      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          {(hasError == true ? (<p className="errorText">Name should be profile name</p>) : null)}
          <form action="">
            <div className="form-group">
              <input className="form-control" onKeyUpCapture={onDeleteNamechange} onChange={onchange} name="deleteName" id="deleteName" type="text" placeholder="Enter the name" />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={onDeleteClick}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
