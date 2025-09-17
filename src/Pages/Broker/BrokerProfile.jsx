import { Carousal } from "../Common/Carousal"
import "../../scss/publicProfile.scss"
import { useEffect, useState } from "react";
import {
  deleteProfile, resetdeleteProfile, getProfileDetailsById, getbrokerDetailsById,
  getProfileImageUrl, resetGetAlreadyExistsUser, userFind, resetGetProfileImageUrl, resetGetProfileDetailsById,addCommand,
  resetaddcommand,getallcommand,deleteCommand,PUProfileBrokerAllow,resetPUProfileBrokerAllow,PUViewImageBrokerAllow,resetPUViewImageBrokerAllow
} from "../../Features/Slices/profSlice"
import { resetgetMatchProfile } from '../../Features/Slices/brokSlice';
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
import tamilFont from './TamilFontBase64'
import "../../scss/profileList.scss"
import { ValidateFields } from "../../Validation/Common/fieldValidation"
import { formatToTwoDigits } from '../../Utils/formatters'

import {
  userLoginCreate, resetUserLoginCreate, getBrokerUserOTP, resetGetUserLoginOtp, brokerUserOTPVerify,
  resetBrokerUserOtpVerify
} from "../../Features/Slices/userProfileSlice";
var RegisterProfileValidation = require('../../Validation/Config/RegisterUser.json')
// import "./pdfmake.scss"
//Making use of all the fonts defined
pdfMake.vfs = pdfFonts.pdfMake.vfs
//Adding our own font into the vfs
window.pdfMake.vfs["TiroTamil-Regular.ttf"] = tamilFont




export function BrokerProfile() {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const search = useLocation().search

  const [searchParams] = useSearchParams();

  // console.log(searchParams);
  const profileId = searchParams.get('id')
  const brokerId = searchParams.get('brId')
  const pageIndex = searchParams.get('pageIndex')
  const backScreenName = searchParams.get('name')
  const pageStartIndex = searchParams.get('pageStartIndex')

  


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
    console.log(profile.profileDetails)

    dispatch(userFind(profileId))
    console.log(profile.alreadyExists)
  }, [])

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

  }, [profile.isdeleteProfileSuccess, profile.messagedeleteProfile, profile.isdeleteProfileError]);


  useEffect(() => {
    dispatch(getProfileImageUrl({ brokerId, profileId }));
  }, [brokerId, profileId]);

  const [formData, setFormData] = useState({
    deleteName: ''
  })

  let deleteName = "";

  const onProfileBackbuttonClick = (e) => {
    e.preventdefault()
    // navigate('/ProfileList?id='+ brokerId);
    navigate('/BrokerList')
  }

  const [isOpen, setIsOpen] = useState(false);

  const openPopup = () => setIsOpen(true);
  const closePopup = () => setIsOpen(false);

  const[addData,setaddData]=useState({
  command:''
})
const {command}=addData;
const onChange=(e)=>{
setaddData((prevState)=>({
  ...prevState,
  [e.target.name]:e.target.value
}))
}

const submit = (e) => {
  e.preventDefault();
  dispatch(addCommand({ command, profileId }));
  setIsOpen(false)
  dispatch(getProfileDetailsById(profileId))

};

const commanddelete = (id) =>{
  dispatch(deleteCommand({command:id,profileId}))
 toast.success("Command deleted Successfully")
 dispatch(getProfileDetailsById(profileId))
} 
  const {isAddcommandLoading,isAddcommandSuccess,CommandMessage,AllCommand,isAllcommandSuccess,isAllcommandLoading,isDeleteCommandLoading,isDeleteCommandSuccess,
    DeleteCommandMessage
  } =
    useSelector(
      (state) => state.prof
    )
  useEffect(() => {
    if(isAddcommandSuccess == true && CommandMessage){
      toast.success(CommandMessage)
      dispatch(resetaddcommand())
    }
    if(isAddcommandSuccess == false && CommandMessage ){
      toast.error(CommandMessage)
    }
    if(isDeleteCommandLoading == true && DeleteCommandMessage){
      toast.success(DeleteCommandMessage)
    }
    if(isAllcommandLoading == false && isAllcommandSuccess == false){
      dispatch(getallcommand())
    }
  },[isAddcommandLoading,CommandMessage,AllCommand],dispatch);


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
        navigate('/ProfileList?pageIndex=' + pageIndex + '&pageStartIndex' + pageStartIndex, { replace: true });
      }, 5000);

    }
  }

  const [currentImageUrl, setCurrentImageUrl] = useState('');
  const handleImageChange = (imageUrl) => {
    setCurrentImageUrl(imageUrl);
  };

  function onPrintClick() {
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
      [{ text: rasiNames[0], alignment: 'center', bold: true, margin: [0, 20],fontSize: 10 }, { text: rasiNames[1], alignment: 'center', bold: true, margin: [0, 20] ,fontSize: 10}, { text: rasiNames[2], alignment: 'center', bold: true, margin: [0, 20] ,fontSize: 10}, { text: rasiNames[3], alignment: 'center', bold: true, margin: [0, 20],fontSize: 10 }],
      [{ text: rasiNames[11], alignment: 'center', bold: true, margin: [0, 20],fontSize: 10 }, { text: 'ராசி', alignment: 'center', bold: true, margin: [0, 40], colSpan: 2, rowSpan: 2,fontSize: 10 }, {}, { text: rasiNames[4], alignment: 'center', bold: true, margin: [0, 20] ,fontSize: 10}],
      [{ text: rasiNames[10], alignment: 'center', bold: true, margin: [0, 20],fontSize: 10 }, {}, {}, { text: rasiNames[5], alignment: 'center', bold: true, margin: [0, 20],fontSize: 10 }],
      [{ text: rasiNames[9], alignment: 'center', bold: true, margin: [0, 20],fontSize: 10 }, { text: rasiNames[8], alignment: 'center', bold: true, margin: [0, 20],fontSize: 10 }, { text: rasiNames[7], alignment: 'center', bold: true, margin: [0, 20] ,fontSize: 10}, { text: rasiNames[6], alignment: 'center', bold: true, margin: [0, 20],fontSize: 10 }]
    ];

    const content1 = [
      [{ text: amsamNames[0], alignment: 'center', bold: true, margin: [0, 20],fontSize: 10 }, { text: amsamNames[1], alignment: 'center', bold: true, margin: [0, 20] ,fontSize: 10}, { text: amsamNames[2], alignment: 'center', bold: true, margin: [0, 20],fontSize: 10 }, { text: amsamNames[3], alignment: 'center', bold: true, margin: [0, 20] ,fontSize: 10}],
      [{ text: amsamNames[11], alignment: 'center', bold: true, margin: [0, 20],fontSize: 10 }, { text: 'அம்சம்', alignment: 'center', bold: true, margin: [0, 40], colSpan: 2, rowSpan: 2,fontSize: 10 }, {}, { text: amsamNames[4], alignment: 'center', bold: true, margin: [0, 20] ,fontSize: 10}],
      [{ text: amsamNames[10], alignment: 'center', bold: true, margin: [0, 20] ,fontSize: 10}, {}, {}, { text: amsamNames[5], alignment: 'center', bold: true, margin: [0, 20],fontSize: 10 }],
      [{ text: amsamNames[9], alignment: 'center', bold: true, margin: [0, 20],fontSize: 10 }, { text: amsamNames[8], alignment: 'center', bold: true, margin: [0, 20] ,fontSize: 10}, { text: amsamNames[7], alignment: 'center', bold: true, margin: [0, 20],fontSize: 10 }, { text: amsamNames[6], alignment: 'center', bold: true, margin: [0, 20],fontSize: 10 }]
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
          color:"#32a852",margin: [0, 0, 0, 6]
        },
        {
          text: 'Broker Detail',
          style: 'subheader',
        },
        {
          columns: [
            {
               width: '50%',
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
                // { text: 'Sister(s) Unmarried', margin: [0, 0, 0, 6] },
                { text: 'Brother', margin: [0, 0, 0, 6] },
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
                { text: profile?.profileDetails?.name || "-", bold: true, margin: [0, 0, 0, 6] },
                {
                  text: profile?.profileDetails?.sex === 'Male' ? `UM${profile?.profileDetails?.profileID || "-"}`
                    : profile?.profileDetails?.sex === 'Female' ? `UF${profile?.profileDetails?.profileID || "-"}`
                      : null, margin: [0, 0, 0, 6]
                },
                { text: profile?.profileDetails?.sex || "-", margin: [0, 0, 0, 6] },
                // { text: (profile?.profileDetails?.DOB.split('T')[0]) || "-", margin: [0, 0, 0, 6] },
                {text: (profile?.profileDetails?.DOB? new Date(profile.profileDetails.DOB).toLocaleDateString('en-GB'): "-"),margin: [0, 0, 0, 6],font: 'Roboto' },
                // { text: profile.profileDetails.birthTime || "-", margin: [0, 0, 0, 8] },
                { text: `${(profile?.profileDetails?.birthHour == null || profile?.profileDetails?.birthHour == undefined || profile?.profileDetails?.birthHour == 'null') ? '' : profile?.profileDetails?.birthHour + ':'}${formatToTwoDigits(profile?.profileDetails?.birthMin)} ${profile?.profileDetails?.meridiem}` || "-", margin: [0, 0, 0, 6] },
                { text: profile?.profileDetails?.height || "-", margin: [0, 0, 0, 6] },
                { text: profile?.profileDetails?.weight || "-", margin: [0, 0, 0, 6] },
                { text: profile?.profileDetails?.colour || "-", margin: [0, 0, 0, 6] },
                { text: profile?.profileDetails?.motherTongue || "-", margin: [0, 0, 0, 6] },
                { text: profile?.profileDetails?.star || "-", bold: true, margin: [0, 0, 0, 6] },
                { text: profile?.profileDetails?.rasi || "-", margin: [0, 0, 0, 6] },
                  {text : profile?.profileDetails?.additionalQualification ? `${profile?.profileDetails?.additionalQualification},${profile?.profileDetails?.qualification}`:
                  profile?.profileDetails?.qualification || "-", bold: true, margin: [0, 0, 0, 6] },
                // {text :`${ profile?.profileDetails?.additionalQualification }, ${profile?.profileDetails?.qualification}`|| "-", bold: true, margin: [0, 0, 0, 6] },
                { text: profile?.profileDetails?.job || "-", bold: true, margin: [0, 0, 0, 6] },
                { text: profile?.profileDetails?.salary || "-", margin: [0, 0, 0, 6] },
                { text: profile?.profileDetails?.fatherName || "-", margin: [0, 0, 0, 6] },
                { text: profile?.profileDetails?.fatherOccupation || "-", margin: [0, 0, 0, 6] },
                { text: profile?.profileDetails?.motherName || "-", margin: [0, 0, 0, 6] },
                { text: profile?.profileDetails?.motherOccupation || "-", margin: [0, 0, 0, 6] },
                { text: `${profile?.profileDetails?.sistersMarried || "0"} Married , ${profile?.profileDetails?.sistersUnmarried || "0"} Unmarried`, margin: [0, 0, 0, 6]},
                 { text: `${profile?.profileDetails?.brothersMarried || "0"} Married , ${profile?.profileDetails?.brothersUnmarried || "0"} Unmarried`, margin: [0, 0, 0, 8]}
                // { text: profile?.profileDetails?.sistersMarried || "-", margin: [0, 0, 0, 6] },
                // { text: profile?.profileDetails?.sistersUnmarried || "-", margin: [0, 0, 0, 6] },
                // { text: profile?.profileDetails?.brothersMarried || "-", margin: [0, 0, 0, 6] },
                // { text: profile?.profileDetails?.brothersUnmarried || "-", margin: [0, 0, 0, 6] },
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
      navigate('/UserProfileList?pageIndex='+ pageIndex + '&pageStartIndex=' + pageStartIndex,);
    }
    else if (backScreenName == "profileList") {
       navigate('/ProfileList?pageIndex=' + pageIndex + '&pageStartIndex=' + pageStartIndex, { replace: true });
    }
     else if(backScreenName == "AddProfileImage"){
          navigate('/ProfileList')
      }
  }
  const onMatchClick = (profileId) =>{
    navigate('/MatchProfile?id=' + profileId +'&pageIndex=' + pageIndex + '&pageStartIndex=' + pageStartIndex, { replace: true })
        dispatch(resetgetMatchProfile())
    
  }


  const formatDate = (dateTime) => {

    const date = new Date(dateTime);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(date.getDate()).padStart(2, '0');
    return `${day}/${month}/${year}`; // Format as YYYY-MM-DD

  }

  const backEditHoroscope = () => {
    if (backScreenName == "userProfile") {
      navigate('/AddProfileImage?id=' + profileId + "&name=userProfile" +"&pageIndex=" + pageIndex + "&pageStartIndex="+ pageStartIndex , );
    }
    else
      if (backScreenName == "profileList") {
        navigate('/AddProfileImage?id=' + profileId + "&name=profileList&pageIndex=" + pageIndex + '&pageStartIndex=' + pageStartIndex);
      }
       else if(backScreenName == "AddProfileImage"){
          navigate('/AddProfileImage?id=' + profileId + "&name=AddProfileImage")
      }
  }

  const backEditProfile = () => {
    //  dispatch(resetGetProfileImageUrl())
    if (backScreenName == "userProfile") {
      navigate('/EditProfile?id=' + profileId + "&name=userProfile" +"&pageIndex=" + pageIndex + "&pageStartIndex="+ pageStartIndex , );
    }
    else
      if (backScreenName == "profileList") {
        navigate('/EditProfile?id=' + profileId + "&name=profileList&pageIndex=" + pageIndex + '&pageStartIndex=' + pageStartIndex, { replace: false });
      }
       else if(backScreenName == "AddProfileImage"){
          navigate('/EditProfile?id=' + profileId + "&name=AddProfileImage")
      }
  }

  const backuButtonUrl = () => {
    dispatch(resetGetProfileImageUrl())
    dispatch(resetGetProfileDetailsById())
    if (backScreenName == "userProfile") {
      navigate('/UserProfileList?pageIndex='+ pageIndex + '&pageStartIndex=' + pageStartIndex,);
    }
    else if (backScreenName == "profileList") {
      // navigate('/ProfileList');
       navigate('/ProfileList?pageIndex=' + pageIndex + '&pageStartIndex=' + pageStartIndex, { replace: false });

    }
     else if(backScreenName == "AddProfileImage"){
         navigate('/ProfileList')
      }
  }

  const userDetails = (e) => {
    navigate('/UserDetails?id=' + profileId + '&name=brokerProfile&pageIndex=' + pageIndex + '&pageStartIndex=' + pageStartIndex ); // sending profileId
  };

  //Create User Login 

  const [createShow, setCreateShow] = useState(false)

  const handleClose1 = () => setCreateShow(false)

  const handleShow1 = () => {
    setCreateShow(true)
    setCreateData("")
    setOTPSent(false)
    setIsOtpVerified(false)
  }

  const { isCreateLoginSuccess, isCreateLoginLoading, isCreateLoginMessage, isCreateLoginError, isGetOtpLoading, isGetOtpSuccess, isGetOtpMessage, isGetOtpError,
    isOtpVerifyLoading, isOtpVerifySuccess, isOtpVerifyError, otpVerified
  } = useSelector((state) => state.userPro)

  useEffect(() => {
    if (isCreateLoginSuccess) {
      toast.success(isCreateLoginMessage)
      dispatch(resetUserLoginCreate())
      dispatch(userFind())
      setCreateShow(false)
      setCreateData("")
      setOTPSent(false)
      setIsOtpVerified(false)

    }
    if (isCreateLoginError) {
      toast.error(isCreateLoginMessage)
      setIsSuccess(false)
      setIsOtpVerified(true)
      dispatch(resetUserLoginCreate())
    }
    if (isGetOtpSuccess) {
      toast.success(isGetOtpMessage)
      setOTPSent(true)

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

  useEffect(() => {
    if (profile?.profileDetails?.phoneNumber) {
      setCreateData((prev) => ({
        ...prev,
        phoneNumber: profile.profileDetails.phoneNumber,
      }));
    }
  }, [profile?.profileDetails?.phoneNumber]);

  const getOTP = (e) => {
    e.preventDefault();

    let hasRequiredfieldValidation = false;
    let hasOtherfieldValidation = false;

    // Always get the latest phone number from profile if createData is empty
    const effectivePhoneNumber = createData.phoneNumber || profile?.profileDetails?.phoneNumber;

    const userReqFields = {
      email: createData.email,
      phoneNumber: effectivePhoneNumber,
    };

    for (const [key, value] of Object.entries(userReqFields)) {
      if (!value) {
        hasRequiredfieldValidation = true;
        return toast.error("Please fill all (*) required fields");
      }
    }

    const getOtp = {
      email: createData.email,
      phoneNumber: effectivePhoneNumber,
    };

    if (!hasRequiredfieldValidation) {
      for (const [key, value] of Object.entries(getOtp)) {
        let arrValidation = RegisterProfileValidation.filter(
          (validateprofile) => validateprofile.fieldName === key
        );
        for (const currentObject of arrValidation) {
          let message = ValidateFields(currentObject, value);
          if (message !== "") {
            hasOtherfieldValidation = true;
            toast.error(message);
            return;
          }
        }
      }
    }

    if (!hasRequiredfieldValidation && !hasOtherfieldValidation) {
      dispatch(getBrokerUserOTP(getOtp));
      // setOTPSent(true);
    }
  };


  const verifyOTP = (e) => {
    e.preventDefault();

    let hasRequiredfieldValidation = false
    let hasOtherfieldValidation = false

    const effectivePhoneNumber = createData.phoneNumber || profile?.profileDetails?.phoneNumber;

    const userReqFields = {
      emailotp, otp
    }

    for (const [key, value] of Object.entries(userReqFields)) {
      if (!value) {
        hasRequiredfieldValidation = true;
        return toast.error("Please Enter the Valid OTP");
      }
    }

    const OTP = { emailotp, otp, email, phoneNumber: effectivePhoneNumber }

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
      // setIsOtpVerified(true)
    }
  }

  const onsubmit = (e) => {
    e.preventDefault();

    const effectivePhoneNumber = createData.phoneNumber || profile?.profileDetails?.phoneNumber;

    let hasRequiredfieldValidation = false
    let hasOtherfieldValidation = false

    const userReqFields = {
      password, confirmPassword
    }

    for (const [key, value] of Object.entries(userReqFields)) {

      if (value == "") {
        hasRequiredfieldValidation = true;
        return toast.error('Please Enter the Valid Password..')
      }
    }

  //     if (password !== confirmPassword) {
  //   toast.error("Passwords do not match");
  //   return;
  // }

    const userLogin = { email, password, confirmPassword, phoneNumber: effectivePhoneNumber, profID: profileId }

    if (hasRequiredfieldValidation == false) {
      for (const [key, value] of Object.entries(userLogin)) {
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
      dispatch(userLoginCreate(userLogin))
    }
  }

  //*----OTP Function----*//
  const [isOTPSent, setOTPSent] = useState(false)
  const [isOtpVerified, setIsOtpVerified] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)


  const [isPublic, setIsPublic] = useState(false);
  const [isImage, setIsImage] = useState(false)

  const handleChange = (e) => {
      const isChecked = e.target.checked;
      setIsPublic(isChecked)
      dispatch(PUProfileBrokerAllow({ profileId, isPublicProfile: isChecked }));
    };
  
   useEffect(() => {
    if (profile.profileDetails && profile.profileDetails.isPublicProfile != null) {
      setIsPublic(profile.profileDetails.isPublicProfile === true)
    }    
  }, [profile.profileDetails])
  
  
    const handleChanges = (e) => {
      const isChecked = e.target.checked;
      setIsImage(isChecked)
      dispatch(PUViewImageBrokerAllow({ profileId, isPublicProfile: isChecked }));
  
    };
  
     useEffect(() => {
    if (profile.profileDetails && profile.profileDetails.isPublicImage != null) {
      setIsImage(profile.profileDetails.isPublicImage === true )
    }
  }, [profile.profileDetails])
  

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

                <p className="h5">1. Personal details</p>

                <div className="row">
                  <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Profile ID</label>
                  <div className="col-8">
                    <label className="form-control-plaintext">:
                      {profile?.profileDetails?.sex === 'Male' ? (
                        ` UM${profile?.profileDetails?.profileID}`
                      ) : profile?.profileDetails?.sex === 'Female' ? (
                        ` UF${profile?.profileDetails?.profileID}`
                      ) : (

                        <p>null</p>
                      )}
                      {/* {profile?.profileDetails?.profileID} */}
                    </label>
                  </div>
                </div>

                <div className="row">
                  <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Name</label>
                  <div className="col-8">
                    <label className="form-control-plaintext">: {profile?.profileDetails?.name}</label>
                  </div>
                </div>
                {/* <div className="row">
                  <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">பெயர்</label>
                  <div className="col-8">
                    <label className="form-control-plaintext">: {profile?.profileDetails?.name}</label>
                  </div>
                </div>                 */}

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

                <div className="row">
                  <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Public view Profile allow</label>
                  <div className="col-8">
                  <label className="form-control-plaintext" style={{ display: 'inline-flex', alignItems: 'center' }}>  :  <input type="checkbox" className="ms-2" checked={isPublic} style={{width:20,height:20,}} onChange={handleChange}  /></label>
               
                  </div>
                </div>

                 <div className="row">
                  <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Public view image allow</label>
                  <div className="col-8">
                  <label className="form-control-plaintext" style={{ display: 'inline-flex', alignItems: 'center' }}>  :  <input type="checkbox" className="ms-2"  style={{width:20,height:20,}} checked={isImage} onChange={handleChanges} /></label>
               
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
              profile && profile.Images && profile.Images.length > 0 ? (
                <div>
                  <Carousal imageUrls={profile.Images} onImageChange={handleImageChange} />
                  <ShareImageToWhatsApp imageUrl={currentImageUrl} />
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
            )}


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
<div className="row">
  <div className="col-md-6">
              <p className="h5">2. Education and Occupation</p>

              <div className="row">
                <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Qualification</label>
                <div className="col-8">
                  <label className="form-control-plaintext">: {profile?.profileDetails?.additionalQualification ? `${profile?.profileDetails?.additionalQualification},${profile?.profileDetails?.qualification}`:
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

              

           {profile?.profileDetails?.jobLocation && !profile?.profileDetails?.foreignCountry && (
  <div className="row">
    <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Job location</label>
    <div className="col-8">
      <label className="form-control-plaintext">: {profile.profileDetails.jobLocation}</label>
    </div>
  </div>
)}

{profile?.profileDetails?.foreignCountry && !profile?.profileDetails?.jobLocation && (
  <div className="row">
    <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Job Country</label>
    <div className="col-8">
      <label className="form-control-plaintext">: {profile.profileDetails.foreignCountry}</label>
    </div>
  </div>
)}

              </div>

<div className="col-2" style={{display:"none"}}>
{/* <p>
<span>Add Command </span>
  <svg className="ms-5" onClick={openPopup}xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-plus-square-dotted" viewBox="0 0 16 16">
  <path d="M2.5 0q-.25 0-.487.048l.194.98A1.5 1.5 0 0 1 2.5 1h.458V0zm2.292 0h-.917v1h.917zm1.833 0h-.917v1h.917zm1.833 0h-.916v1h.916zm1.834 0h-.917v1h.917zm1.833 0h-.917v1h.917zM13.5 0h-.458v1h.458q.151 0 .293.029l.194-.981A2.5 2.5 0 0 0 13.5 0m2.079 1.11a2.5 2.5 0 0 0-.69-.689l-.556.831q.248.167.415.415l.83-.556zM1.11.421a2.5 2.5 0 0 0-.689.69l.831.556c.11-.164.251-.305.415-.415zM16 2.5q0-.25-.048-.487l-.98.194q.027.141.028.293v.458h1zM.048 2.013A2.5 2.5 0 0 0 0 2.5v.458h1V2.5q0-.151.029-.293zM0 3.875v.917h1v-.917zm16 .917v-.917h-1v.917zM0 5.708v.917h1v-.917zm16 .917v-.917h-1v.917zM0 7.542v.916h1v-.916zm15 .916h1v-.916h-1zM0 9.375v.917h1v-.917zm16 .917v-.917h-1v.917zm-16 .916v.917h1v-.917zm16 .917v-.917h-1v.917zm-16 .917v.458q0 .25.048.487l.98-.194A1.5 1.5 0 0 1 1 13.5v-.458zm16 .458v-.458h-1v.458q0 .151-.029.293l.981.194Q16 13.75 16 13.5M.421 14.89c.183.272.417.506.69.689l.556-.831a1.5 1.5 0 0 1-.415-.415zm14.469.689c.272-.183.506-.417.689-.69l-.831-.556c-.11.164-.251.305-.415.415l.556.83zm-12.877.373Q2.25 16 2.5 16h.458v-1H2.5q-.151 0-.293-.029zM13.5 16q.25 0 .487-.048l-.194-.98A1.5 1.5 0 0 1 13.5 15h-.458v1zm-9.625 0h.917v-1h-.917zm1.833 0h.917v-1h-.917zm1.834-1v1h.916v-1zm1.833 1h.917v-1h-.917zm1.833 0h.917v-1h-.917zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3z"/>
</svg> {isOpen && (
        <div className="mt-2">
            <input type="text" className="border border-success rounded" onChange={onChange} id="command" name="command" style={{width:350,height:40}} />
       <button onClick={closePopup} className="btn btn-success mt-2" style={{marginLeft:1}}>Close</button>
            <button onClick={submit} className="btn btn-success mt-2" style={{marginLeft:20}}>Submit</button>
 
        </div>
      )}
 </p> */}

 <p style={{ display: "flex", alignItems: "center", position: "relative" }}>
   <p className="h5">Add Command</p> 
  <svg
    onClick={openPopup}
    xmlns="http://www.w3.org/2000/svg"
    width="30"
    height="30"
    fill="currentColor"
    className="bi bi-plus-square-dotted ms-2"
    viewBox="0 0 16 16"
    style={{ cursor: "pointer" }}
  >
     <path d="M2.5 0q-.25 0-.487.048l.194.98A1.5 1.5 0 0 1 2.5 1h.458V0zm2.292 0h-.917v1h.917zm1.833 0h-.917v1h.917zm1.833 0h-.916v1h.916zm1.834 0h-.917v1h.917zm1.833 0h-.917v1h.917zM13.5 0h-.458v1h.458q.151 0 .293.029l.194-.981A2.5 2.5 0 0 0 13.5 0m2.079 1.11a2.5 2.5 0 0 0-.69-.689l-.556.831q.248.167.415.415l.83-.556zM1.11.421a2.5 2.5 0 0 0-.689.69l.831.556c.11-.164.251-.305.415-.415zM16 2.5q0-.25-.048-.487l-.98.194q.027.141.028.293v.458h1zM.048 2.013A2.5 2.5 0 0 0 0 2.5v.458h1V2.5q0-.151.029-.293zM0 3.875v.917h1v-.917zm16 .917v-.917h-1v.917zM0 5.708v.917h1v-.917zm16 .917v-.917h-1v.917zM0 7.542v.916h1v-.916zm15 .916h1v-.916h-1zM0 9.375v.917h1v-.917zm16 .917v-.917h-1v.917zm-16 .916v.917h1v-.917zm16 .917v-.917h-1v.917zm-16 .917v.458q0 .25.048.487l.98-.194A1.5 1.5 0 0 1 1 13.5v-.458zm16 .458v-.458h-1v.458q0 .151-.029.293l.981.194Q16 13.75 16 13.5M.421 14.89c.183.272.417.506.69.689l.556-.831a1.5 1.5 0 0 1-.415-.415zm14.469.689c.272-.183.506-.417.689-.69l-.831-.556c-.11.164-.251.305-.415.415l.556.83zm-12.877.373Q2.25 16 2.5 16h.458v-1H2.5q-.151 0-.293-.029zM13.5 16q.25 0 .487-.048l-.194-.98A1.5 1.5 0 0 1 13.5 15h-.458v1zm-9.625 0h.917v-1h-.917zm1.833 0h.917v-1h-.917zm1.834-1v1h.916v-1zm1.833 1h.917v-1h-.917zm1.833 0h.917v-1h-.917zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3z"/>

  </svg>

  {isOpen && (
    <div
      className="ms-3"
      style={{
        position: "absolute",
        left: "100%",
        top: 0,
        background: "white",
        padding: "10px",
        border: "1px solid #28a745",
        borderRadius: "5px",
        display: "flex",
        flexDirection: "column",
        zIndex: 1000,
      }}
    >
      <input
        type="text"
        className="border border-success rounded"
        onChange={onChange}
        id="command"
        name="command"
        style={{ width: 350, height: 40 }}
      />
      <div>
        <button onClick={closePopup} className="btn btn-success mt-2 me-2">
          Close
        </button>
        <button onClick={submit} className="btn btn-success mt-2">
          Submit
        </button>
      </div>
    </div>
  )}
</p>
      <div className="col-8">
         {profile?.profileDetails?.command?.length > 0 ? (
  profile.profileDetails.command.map((cmd, index) => (
    <label key={index}>
 <p style={{width:500}}>  {index + 1}.{cmd.command}<svg style={{marginLeft:30}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
  <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
</svg> 

<svg style={{marginLeft:20}}onClick={()=>commanddelete(cmd._id)} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
</svg></p>
    </label>
  ))
) : (
  <label className="form-control-plaintext">
  <p>  No commands</p>
  </label>
)}

    </div>
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
                    <label className="form-control-plaintext">: {formatToTwoDigits(profile?.profileDetails?.birthHour)}:{formatToTwoDigits(profile?.profileDetails?.birthMin)} {profile?.profileDetails?.meridiem}</label>
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



        <br /><br />

        <p className="h4">Broker Contact Details</p>

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
            {profile && profile.brokerDetails ? (
              <div id="dvbrokerDetails" className="row">
                <div className="col-md-12">
                  <div className="row">
                    <label style={{ fontWeight: 'bold' }} className="col-3 col-form-label">Broker Name</label>
                    <div className="col-9">
                      <label className="form-control-plaintext">: {profile?.brokerDetails?.name}</label>
                    </div>
                  </div>

                  <div className="row">
                    <label style={{ fontWeight: 'bold' }} className="col-3 col-form-label">Contact Number</label>
                    <div className="col-9">
                      <label className="form-control-plaintext">: {profile?.brokerDetails?.phoneNumber}</label>
                    </div>
                  </div>

                  <div className="row">
                    <label style={{ fontWeight: 'bold' }} className="col-3 col-form-label">Matrimony Name</label>
                    <div className="col-9">
                      <label className="form-control-plaintext">: {profile?.brokerDetails?.matrimonyName}</label>
                    </div>
                  </div>

                  <div className="row">
                    <label style={{ fontWeight: 'bold' }} className="col-3 col-form-label">Address</label>
                    <div className="col-9">
                      <label className="form-control-plaintext">: {profile?.brokerDetails?.address1} </label>
                    </div>
                  </div>
                </div>

              </div>) : null
            }

          </>
        )}




        <br /><br />
        <p className="h4">History Details</p>

        <div id="dvbrokerDetails" className="row">

          <div className="col-md-12">
            <div className="row">
              <label style={{ fontWeight: 'bold' }} className="col-3 col-form-label">Created Date</label>
              <div className="col-9">
                <label className="form-control-plaintext">: {formatDate(profile.profileDetails.createdAt)}</label>
              </div>
            </div>
            <div className="row">
              <label style={{ fontWeight: 'bold' }} className="col-3 col-form-label">Created By</label>
              <div className="col-9">
                <label className="form-control-plaintext">: {profile?.createdBy?.name}</label>
              </div>
            </div>

            <div className="row">
              <label style={{ fontWeight: 'bold' }} className="col-3 col-form-label">Last Updated Date</label>
              <div className="col-9">
                <label className="form-control-plaintext">: {formatDate(profile.profileDetails.updatedAt)}</label>
              </div>
            </div>

            <div className="row">
              <label style={{ fontWeight: 'bold' }} className="col-3 col-form-label">Last Updated By</label>
              <div className="col-9">
                <label className="form-control-plaintext">: {profile?.updatedBy?.name} </label>
              </div>
            </div>
          </div>
        </div>



        <br /><br />

        {profile.isGetUserLoading && (
          <p className='text-muted'>Checking login status...</p>
        )}

        {profile.isGetUserSuccess && profile.alreadyExists && (
          <div className='col-10 bg-secondary bg-gradient text-light p-2'>
            Login has been created for the user.
            <a href="" className='text-decoration-none text-dark mx-3' onClick={userDetails}>
              Click to view details
            </a>
          </div>
        )}
        <br />

        <div className="row" >
          <div className="button-container">

            <button onClick={() => onPrintClick()} className="primarybutton">Print</button>
            <button className="secondarybutton" onClick={handleShow}>Delete</button>
            <button onClick={() => onCancelClick()} className="secondarybutton">Close</button>
            <button onClick={() => onMatchClick(profileId)} className="secondarybutton">Match Profile</button>

            {profile.isGetUserSuccess && !profile.alreadyExists && (
              <button className="secondarybutton" onClick={handleShow1}>Create login</button>)}
          </div>

        </div>
        <br />
        <br />
        {(isGetOtpLoading || isOtpVerifyLoading || isCreateLoginLoading) && (
          <div className="overlay">
            <div className="loading-spinner"></div>
          </div>
        )}

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

      <div>
        <Modal show={createShow} onHide={handleClose1} style={{ marginTop: 100 }}>
          <Modal.Header closeButton>
            <Modal.Title>
              <h5>Create Login</h5></Modal.Title>
          </Modal.Header>
          <form onSubmit={onsubmit}>
            <Modal.Body>
              {!isOTPSent && !isOtpVerified && (
                <>
                  <div className="form-group">
                    <label htmlFor="email">Mail ID</label>
                    <input className="form-control border border-dark" name="email" id="email" type="text" value={email} onChange={onchange} />
                    <p class="fw-bold fst-italic">Please ask the user to use this mail ID as login username</p>
                  </div>
                  <div className="form-group">
                    <label htmlFor="phoneNumber">Phone Number</label>
                    <input className="form-control border border-dark" name="phoneNumber" id="phoneNumber" disabled value={profile?.profileDetails?.phoneNumber} type="text" />
                  </div>
                </>
              )}
              {isOTPSent && !isOtpVerified && (
                <>
                  <div className="form-group">
                    <label htmlFor="otp">OTP</label>
                    <input className="form-control border border-dark" name="otp" id="otp" type="text" onChange={onchange} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="emailotp">Email OTP</label>
                    <input className="form-control border border-dark" name="emailotp" id="emailotp" type="text" onChange={onchange} />
                  </div>
                </>)}

              {isOtpVerified && !isSuccess && (
                <>
                  <div className="form-group">
                    <label htmlFor="password">Login Password</label>
                    <input className="form-control border border-dark" name="password" id="password" type="password" onChange={onchange} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Login Password</label>
                    <input className="form-control border border-dark" name="confirmPassword" id="confirmPassword" type="password" value={confirmPassword} onChange={onchange} />
                  </div>
                </>)}
            </Modal.Body>
            <Modal.Footer>

              <Button className="btn btn-dark" type='reset' onClick={handleClose1}>Close</Button>
              {!isOTPSent && !isOtpVerified && (
                <Button className="btn btn-success" onClick={getOTP}>{"GetOTP"}</Button>
              )}

              {isOTPSent && !isOtpVerified && (
                <Button className="btn btn-success" onClick={verifyOTP}>{"Verify"}</Button>
              )}

              {isOtpVerified && !isSuccess && (

                <Button type="submit" className="btn btn-success">{"Submit"}</Button>

              )}

            </Modal.Footer>


          </form>
        </Modal>
      </div>
    </>
  )
}
