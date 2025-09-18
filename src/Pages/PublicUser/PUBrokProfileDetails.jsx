import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { replace, useNavigate } from 'react-router-dom'
import { useLocation, useSearchParams } from 'react-router-dom'
import { getMarriageProfileDetailById, getProfileImageUrl,getPUProfileViewedImageURL, getHoroscopeDetailsById, resetHoroscopeDetailsById,
   resetgetMarriageProfileDetailById, resetGetPUProfileImageUrl,resetGetPUProfileImageMessage,resetGetProfileImageUrl, resetGetProfiles} from "../../Features/Slices/PublicUser/publicUserSlice";
import { formatToTwoDigits, formatDateDayMonthYear, returnEmptyIfNull } from '../../Utils/formatters'
import { Link } from "react-router-dom";
import pdfMake from "pdfmake/build/pdfmake"
import { toast } from "react-toastify";
import { Carousal } from "../Common/Carousal"


export function PUBrokProfileDetails() {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const search = useLocation().search
  const [searchParams] = useSearchParams();

  const profileId = searchParams.get('id')
  const brokerId = searchParams.get('brokID')
  const pageIndex = searchParams.get('pageIndex')
  const pageStartIndex = searchParams.get('pageStartIndex')
  const backScreenName = searchParams.get('name')
  let hasImage;
  let imageParm = searchParams.get('image');


   if(imageParm == "1")
    hasImage = true
  else
    hasImage = false


  // const [currentPage, setCurrentPage] = useState(1);

  const profileID =
    useSelector(
      (state) => state.public
    )

  useEffect(() => {
    dispatch(getMarriageProfileDetailById({ profileId: profileId }))
     dispatch(getPUProfileViewedImageURL({ profileId: profileId }))

  }, [profileId, dispatch])

  const formatDate = (dateTime) => {

    const date = new Date(dateTime);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(date.getDate()).padStart(2, '0');
    return `${day}/${month}/${year}`; // Format as YYYY-MM-DD

  }

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
     // horoScope?.profileId?.trim()
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
    useEffect(() => {

    // if (pageIndex && pageIndex != undefined && pageIndex != null && pageIndex != 'null') {
    //   setCurrentPage(pageIndex)
    //   // onPageChange(parseInt(pageIndex))
    // }

    if (profileID.isgetHoroscopeDetailsByIdSuccess)
       {
      generateHoroscope();
      dispatch(resetHoroscopeDetailsById())
    }

      if(profileID.isgetHoroscopeDetailsByIdError){
          toast.error(profileID.isGetHoroscopeMessage)
          dispatch(resetHoroscopeDetailsById())
        }
    

        if(profileID.isgetHoroscopeDetailsByIdSuccess)
       {
          toast.success(profileID.isGetHoroscopeMessage, {
               position: "top-center"
              });
    
          dispatch(resetHoroscopeDetailsById())
       }

       if(profileID.isImageSuccess && profileID.imageMessage!=""){
        toast.success(profileID.imageMessage)
        dispatch(resetGetPUProfileImageMessage())
       }

       if(profileID.isImageSuccess == false && profileID.imageMessage){
          toast.error(profileID.imageMessage)
          //  dispatch(getMarriageProfileDetailById())
            dispatch(resetGetProfileImageUrl())
            dispatch(resetGetPUProfileImageMessage())
       }


  }, [profileID.isgetHoroscopeDetailsByIdSuccess, profileID.isGetHoroscopeMessage,profileID.isgetHoroscopeDetailsByIdError,
    profileID.isImageSuccess, profileID.imageMessage
  ])


 function onPrintClick() {
  dispatch(getHoroscopeDetailsById({ profileId }));
}

  function generateHoroscope() {
    rasiNames = [
      profileID?.MarriageprofileDetail?.horoScope?.meenaR, profileID?.MarriageprofileDetail?.horoScope?.meshaR, profileID?.MarriageprofileDetail?.horoScope?.vrishbaR, profileID?.MarriageprofileDetail?.horoScope?.mithunaR,
      profileID?.MarriageprofileDetail?.horoScope?.karkataR, profileID?.MarriageprofileDetail?.horoScope?.simhaR, profileID?.MarriageprofileDetail?.horoScope?.kanyaR, profileID?.MarriageprofileDetail?.horoScope?.tulaR,
      profileID?.MarriageprofileDetail?.horoScope?.vrishikaR, profileID?.MarriageprofileDetail?.horoScope?.dhanuR, profileID?.MarriageprofileDetail?.horoScope?.makaraR, profileID?.MarriageprofileDetail?.horoScope?.khumbhaR
    ];
    amsamNames = [
      profileID?.MarriageprofileDetail?.horoScope?.meenaA, profileID?.MarriageprofileDetail?.horoScope?.meshaA, profileID?.MarriageprofileDetail?.horoScope?.vrishbaA, profileID?.MarriageprofileDetail?.horoScope?.mithunaA,
      profileID?.MarriageprofileDetail?.horoScope?.karkataA, profileID?.MarriageprofileDetail?.horoScope?.simhaA, profileID?.MarriageprofileDetail?.horoScope?.kanyaA, profileID?.MarriageprofileDetail?.horoScope?.tulaA,
      profileID?.MarriageprofileDetail?.horoScope?.vrishikaA, profileID?.MarriageprofileDetail?.horoScope?.dhanuA, profileID?.MarriageprofileDetail?.horoScope?.makaraA, profileID?.MarriageprofileDetail?.horoScope?.khumbhaA
    ];
    const content = [
      [{ text: rasiNames[0], alignment: 'center', bold: true, margin: [0, 20],fontSize: 10 }, { text: rasiNames[1], alignment: 'center', bold: true, margin: [0, 20],fontSize: 10 }, { text: rasiNames[2], alignment: 'center', bold: true, margin: [0, 20],fontSize: 10 }, { text: rasiNames[3], alignment: 'center', bold: true, margin: [0, 20] ,fontSize: 10}],
      [{ text: rasiNames[11], alignment: 'center', bold: true, margin: [0, 20],fontSize: 10 }, { text: 'ராசி', alignment: 'center', bold: true, margin: [0, 40], colSpan: 2, rowSpan: 2 ,fontSize: 10}, {}, { text: rasiNames[4], alignment: 'center', bold: true, margin: [0, 20] ,fontSize: 10}],
      [{ text: rasiNames[10], alignment: 'center', bold: true, margin: [0, 20],fontSize: 10 }, {}, {}, { text: rasiNames[5], alignment: 'center', bold: true, margin: [0, 20],fontSize: 10 }],
      [{ text: rasiNames[9], alignment: 'center', bold: true, margin: [0, 20],fontSize: 10 }, { text: rasiNames[8], alignment: 'center', bold: true, margin: [0, 20] ,fontSize: 10}, { text: rasiNames[7], alignment: 'center', bold: true, margin: [0, 20],fontSize: 10 }, { text: rasiNames[6], alignment: 'center', bold: true, margin: [0, 20] ,fontSize: 10}]
    ];

    const content1 = [
      [{ text: amsamNames[0], alignment: 'center', bold: true, margin: [0, 20],fontSize: 10 }, { text: amsamNames[1], alignment: 'center', bold: true, margin: [0, 20] ,fontSize: 10}, { text: amsamNames[2], alignment: 'center', bold: true, margin: [0, 20],fontSize: 10 }, { text: amsamNames[3], alignment: 'center', bold: true, margin: [0, 20],fontSize: 10 }],
      [{ text: amsamNames[11], alignment: 'center', bold: true, margin: [0, 20],fontSize: 10 }, { text: 'அம்சம்', alignment: 'center', bold: true, margin: [0, 40], colSpan: 2, rowSpan: 2,fontSize: 10 }, {}, { text: amsamNames[4], alignment: 'center', bold: true, margin: [0, 20] ,fontSize: 10}],
      [{ text: amsamNames[10], alignment: 'center', bold: true, margin: [0, 20],fontSize: 10 }, {}, {}, { text: amsamNames[5], alignment: 'center', bold: true, margin: [0, 20] ,fontSize: 10}],
      [{ text: amsamNames[9], alignment: 'center', bold: true, margin: [0, 20],fontSize: 10 }, { text: amsamNames[8], alignment: 'center', bold: true, margin: [0, 20],fontSize: 10 }, { text: amsamNames[7], alignment: 'center', bold: true, margin: [0, 20],fontSize: 10 }, { text: amsamNames[6], alignment: 'center', bold: true, margin: [0, 20] ,fontSize: 10}]
    ];

    pdfMake.fonts = {
      TiroTamilRegular: {
        normal: 'TiroTamil-Regular.ttf',
        bold: 'TiroTamil-Regular.ttf',
        italics: 'TiroTamil-Regular.ttf',
        bolditalics: 'TiroTamil-Regular.ttf'
      } ,
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
          text: profileID.BrokerDetails.matrimonyName,
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
              //   { text: 'Name: ', bold: true }, profileID.BrokerDetails.name + '\n',
              //   { text: 'Phone: ', bold: true }, profileID.BrokerDetails.phoneNumber + '\n',
              // ],
               text: [
    { text: 'Name: ', bold: true }, profileID?.BrokerDetails?.name || ' - ','\n',

    { text: 'Phone: ', bold: true },
    ((profileID?.BrokerDetails?.phoneNumber || '') + (profileID?.BrokerDetails?.additionalNumber ? ' , ' + profileID.BrokerDetails.additionalNumber : '')) || ' - ','\n',

    { text: 'Whatsapp Number: ', bold: true },profileID?.BrokerDetails?.whatsAppNumber || ' - ',
     ],font: 'Roboto',
            },
            {
              width: '50%',
              text: [
                { text: 'Address: ', bold: true }, profileID.BrokerDetails.address1 + ',' + profileID.BrokerDetails.address2 + '\n',
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
                { text: profileID.MarriageprofileDetail.name || "-", bold: true, margin: [0, 0, 0, 6] },
                // { text: profileID.MarriageprofileDetail.profileID || "-", margin: [0, 0, 0, 6] },
                {
                  text: profileID.MarriageprofileDetail.sex === 'Male' ? `UM${profileID.MarriageprofileDetail.profileID || "-"}`
                    : profileID.MarriageprofileDetail.sex === 'Female' ? `UF${profileID.MarriageprofileDetail.profileID || "-"}`
                      : null, margin: [0, 0, 0, 6]
                },
                 { text: profileID.MarriageprofileDetail.sex || "-", margin: [0, 0, 0, 6] },
                //  { text: (profile?.profileDetails?.DOB.split('T')[0]) || "-", margin: [0, 0, 0, 8] },
                // { text: (formatDateDayMonthYear(profileID?.MarriageprofileDetail?.DOB)) || "-", margin: [0, 0, 0, 6] },
                {text: (profileID?.MarriageprofileDetail?.DOB? new Date(profileID.MarriageprofileDetail.DOB).toLocaleDateString('en-GB'): "-"),margin: [0, 0, 0, 6],font: 'Roboto',fontSize:11 },
                //{ text: profile.profileDetails.birthTime || "-", margin: [0, 0, 0, 8] },
                {text: returnEmptyIfNull(profileID.MarriageprofileDetail.birthHour) || returnEmptyIfNull(profileID.MarriageprofileDetail.birthMin) || returnEmptyIfNull(profileID.MarriageprofileDetail.meridiem)
    ? `${returnEmptyIfNull(profileID.MarriageprofileDetail.birthHour)}:${formatToTwoDigits(returnEmptyIfNull(profileID.MarriageprofileDetail.birthMin))} ${returnEmptyIfNull(profileID.MarriageprofileDetail.meridiem)}`
    : "-",
  margin: [0, 0, 0, 6]},
                { text: profileID.MarriageprofileDetail.height || "-", margin: [0, 0, 0, 6] },
                { text: profileID.MarriageprofileDetail.weight || "-", margin: [0, 0, 0, 6] },
                { text: profileID.MarriageprofileDetail.colour || "-", margin: [0, 0, 0, 6] },
                { text: profileID.MarriageprofileDetail.motherTongue || "-", margin: [0, 0, 0, 6] },
                { text: profileID.MarriageprofileDetail.star || "-", bold: true, margin: [0, 0, 0, 6] },
                { text: profileID.MarriageprofileDetail.rasi || "-", margin: [0, 0, 0, 6] },
                { text: profileID.MarriageprofileDetail.qualification || "-", margin: [0, 0, 0, 6] },
                { text: profileID.MarriageprofileDetail.job || "-", bold: true, margin: [0, 0, 0, 6] },
                { text: profileID.MarriageprofileDetail.salary || "-", margin: [0, 0, 0, 6] },
                { text: profileID.MarriageprofileDetail.fatherName || "-", margin: [0, 0, 0, 6] },
                { text: profileID.MarriageprofileDetail.fatherOccupation || "-", margin: [0, 0, 0, 6] },
                { text: profileID.MarriageprofileDetail.motherName || "-", margin: [0, 0, 0, 6] },
                { text: profileID.MarriageprofileDetail.motherOccupation || "-", margin: [0, 0, 0, 6] },
                 { text: `${profileID?.MarriageprofileDetail?.sistersMarried || "0"} Married , ${profileID?.MarriageprofileDetail?.sistersUnmarried || "0"} Unmarried`,margin: [0, 0, 0, 6]},
                 { text: `${profileID?.MarriageprofileDetail?.brothersMarried || "0"} Married , ${profileID?.MarriageprofileDetail?.brothersUnmarried || "0"} Unmarried`,margin: [0, 0, 0, 6]}
                // { text: profileID.MarriageprofileDetail.sistersMarried || "-", margin: [0, 0, 0, 6] },
                // { text: profileID.MarriageprofileDetail.sistersUnmarried || "-", margin: [0, 0, 0, 6] },
                // { text: profileID.MarriageprofileDetail.brothersMarried || "-", margin: [0, 0, 0, 6] },
                // { text: profileID.MarriageprofileDetail.brothersUnmarried || "-", margin: [0, 0, 0, 6] },
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
              stack: [{ text: profileID?.MarriageprofileDetail?.horoScope?.dhasa, bold: true, margin: [0, 10, 0, 0] }, // Added margin bottom

              ]
            },
            {
              width: '3%',
              stack: [
                { text: profileID?.MarriageprofileDetail?.horoScope?.year, bold: true, margin: [0, 10, 0, 0] },

              ],
            },
            {
              width: '15%',
              stack: [
                { text: 'வருடம் ', bold: true, margin: [0, 10, 0, 0] },

              ],
            },
            {
              width: '3%',
              stack: [
                { text: profileID?.MarriageprofileDetail?.horoScope?.month, bold: true, margin: [0, 10, 0, 0] },

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
                { text: profileID?.MarriageprofileDetail?.horoScope?.day, bold: true, margin: [0, 10, 0, 0] },

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
    let fileName = profileID.MarriageprofileDetail.name + "_Biodata.pdf"
    pdfMake.createPdf(docDefinition).download(fileName);
  }
  const onCancelClick = () => {
       dispatch(resetGetProfileImageUrl())
       navigate('/PUProfileList?pageIndex=' + pageIndex +"&id="+brokerId + "&pageStartIndex="+pageStartIndex, { replace: true });
       
  }

   const backuButtonUrl = () => { 
    
      dispatch(resetGetProfileImageUrl())
      // dispatch(resetGetProfiles())
      navigate('/PUProfileList?pageIndex=' + pageIndex +"&id="+brokerId + "&pageStartIndex="+pageStartIndex, { replace: true });
  };


    //*START - Related to view image logic*//
  
    const [showImage, setShowImage] = useState(false);
    const [currentImageUrl, setCurrentImageUrl] = useState('');
  
  
    useEffect(() => {
      setShowImage(false);
      setCurrentImageUrl(null);
    }, [profileId]);
  
  
  
    const handleShowImage = () => {
      dispatch(getProfileImageUrl({ profileId }));
      if ([profileID].Images && profileID.Images.length > 0) {
        setShowImage(true);
        setCurrentImageUrl(profileID.Images[0]);
      }
      else{
         setShowImage(false);
      }
    };
  
    const handleImageChange = (imageUrl) => {
      setCurrentImageUrl(imageUrl);
    };
  
    //*END - Related to view image logic*//
  return (<>
    <div>
      <div className="dropdown-item d-flex align-items-center" >
        <svg onClick={backuButtonUrl} style={{ cursor: 'pointer' }} xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#1aa179" className="bi bi-arrow-left-circle" viewBox="0 0 16 16">
          <path fillRule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z" />
        </svg>
        <p className="h6 mb-0 ms-2" onClick={backuButtonUrl} style={{ cursor: 'pointer' }}>Go Back</p>
      </div>
      <div> <br /> </div>
      <p className="h4">Profile Details</p>

      <div className="row">
        <div className="col-md-8">

          <div className="card-container">
            {profileID.isMarriageProfileDetailLoading && (
              <>
                <div className="section-skeleton">
                  <div className="skeleton skeleton-Detail-section1"></div>
                </div>
              </>

            )} </div>


          {!profileID.isMarriageProfileDetailLoading && profileID.isMarriageProfileDetailSuccess && (
            <>

              <p className="h5">1. Personal details</p><br />

              <div className="row">
                <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Name</label>
                <div className="col-8">
                  <label className="form-control-plaintext">: {profileID.MarriageprofileDetail.name}</label>
                </div>
              </div>

              <div className="row">
                <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Sex</label>
                <div className="col-8">
                  <label className="form-control-plaintext">: {profileID.MarriageprofileDetail.sex}</label>
                </div>
              </div>

              <div className="row">
                <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Marital Status</label>
                <div className="col-8">
                  <label className="form-control-plaintext">: {profileID.MarriageprofileDetail.maritalstatus}</label>
                </div>
              </div>

              <div className="row">
                <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Blood group</label>
                <div className="col-8">
                  <label className="form-control-plaintext">: {profileID.MarriageprofileDetail.bloodGroup}</label>
                </div>
              </div>

              <div className="row">
                <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Height (cm)</label>
                <div className="col-8">
                  <label className="form-control-plaintext">: {profileID.MarriageprofileDetail.height}</label>
                </div>
              </div>

              <div className="row">
                <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Weight (kg)</label>
                <div className="col-8">
                  <label className="form-control-plaintext">: {profileID.MarriageprofileDetail.weight}</label>
                </div>
              </div>

              <div className="row">
                <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Colour</label>
                <div className="col-8">
                  <label className="form-control-plaintext">: {profileID.MarriageprofileDetail.colour}</label>
                </div>
              </div>

              <div className="row">
                <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Food preference</label>
                <div className="col-8">
                  <label className="form-control-plaintext">: {profileID.MarriageprofileDetail.foodPreference}</label>
                </div>
              </div>

              <div className="row">
                <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Mother tongue</label>
                <div className="col-8">
                  <label className="form-control-plaintext">: {profileID.MarriageprofileDetail.motherTongue}</label>
                </div>
              </div>

              <div className="row">
                <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Religion</label>
                <div className="col-8">
                  <label className="form-control-plaintext">: {profileID.MarriageprofileDetail.religion}</label>
                </div>
              </div>

              <div className="row">
                <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Caste</label>
                <div className="col-8">
                  <label className="form-control-plaintext">: {profileID.MarriageprofileDetail.caste}</label>
                </div>
              </div>

              <div className="row">
                <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Sub Caste</label>
                <div className="col-8">
                  <label className="form-control-plaintext">: {profileID.MarriageprofileDetail.subcaste}</label>
                </div>
              </div>

            </>
          )}
        </div>
         <div className="col-md-4">
       
                   <div className="card-container">
                     {profileID.isImageLoading && (
                       <div className="section-skeleton">
                         <div className="skeleton skeleton-Detail-section1"></div>
                       </div>
                     )}
                   </div>
       
       
                   {profileID.isMarriageProfileDetailSuccess && !profileID.isMarriageProfileDetailLoading && !profileID?.Images?.length && (
                     <>
                       <div>
                         { !showImage && hasImage ? (
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
                     profileID?.isImageSuccess ? (
                       <>
       
                         {profileID?.Images?.length > 0 ? (
                           <Carousal
                             key={profileId}
                             imageUrls={profileID.Images}
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
          {profileID.isMarriageProfileDetailLoading && (
            <>
              <div className="section-skeleton">
                <div className="skeleton skeleton-Detail-section1"></div>
              </div>
            </>

          )} </div>

        {!profileID.isMarriageProfileDetailLoading && profileID.isMarriageProfileDetailSuccess && (
          <>

            <p className="h5">2. Education and Occupation</p><br /><br />

            <div className="row">
              <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Qualification</label>
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
          <span id="#click" className={profileID?.MarriageprofileDetail?.horoScope && hasHoroScopeDataR(profileID?.MarriageprofileDetail?.horoScope) }>
            {profileID?.MarriageprofileDetail?.horoScope && hasHoroScopeDataR(profileID?.MarriageprofileDetail?.horoScope)
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
          <span id="#click" className={profileID?.MarriageprofileDetail?.horoScope && hasHoroScopeDataR(profileID?.MarriageprofileDetail?.horoScope) }>
            {profileID?.MarriageprofileDetail?.horoScope && hasHoroScopeDataR(profileID?.MarriageprofileDetail?.horoScope)
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
                <label className="form-control-plaintext">: {profileID.MarriageprofileDetail.jobDescription}</label>
              </div>
            </div>

            <div className="row">
              <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Salary per month</label>
              <div className="col-8">
                <label className="form-control-plaintext">: {profileID.MarriageprofileDetail.salary}</label>
              </div>
            </div>

            
{profileID?.MarriageprofileDetail?.jobInAbroad &&
  !profileID?.MarriageprofileDetail?.jobLocation &&
  !profileID?.MarriageprofileDetail?.foreignCountry && (
    <div className="row">
      <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Job in abroad ?</label>
      <div className="col-8">
        <label className="form-control-plaintext">: {profileID.MarriageprofileDetail.jobInAbroad}</label>
      </div>
    </div>
)}

{/* Job Location */}
{profileID?.MarriageprofileDetail?.jobLocation &&
  !profileID?.MarriageprofileDetail?.jobInAbroad &&
  !profileID?.MarriageprofileDetail?.foreignCountry && (
    <div className="row">
      <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Job location</label>
      <div className="col-8">
        <label className="form-control-plaintext">: {profileID.MarriageprofileDetail.jobLocation}</label>
      </div>
    </div>
)}

{/* Job Country */}
{profileID?.MarriageprofileDetail?.foreignCountry &&
  !profileID?.MarriageprofileDetail?.jobInAbroad &&
  !profileID?.MarriageprofileDetail?.jobLocation && (
    <div className="row">
      <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Job Country</label>
      <div className="col-8">
        <label className="form-control-plaintext">: {profileID.MarriageprofileDetail.foreignCountry}</label>
      </div>
    </div>
)}

          </>
        )}
      </div>

      <div id="dvpublicProfile" className="row">

        <div className="card-container">
          {profileID.isMarriageProfileDetailLoading && (
            <>
              <div className="section-skeleton">
                <div className="skeleton skeleton-Detail-section1"></div>
              </div>
            </>

          )} </div>

        {!profileID.isMarriageProfileDetailLoading && profileID.isMarriageProfileDetailSuccess && (
          <>

            <p className="h5">3. Family Details</p> <br /><br />

            <div className="row">
              <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Father Name</label>
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
          <span id="#click" className={profileID?.MarriageprofileDetail?.horoScope && hasHoroScopeDataR(profileID?.MarriageprofileDetail?.horoScope) }>
            {profileID?.MarriageprofileDetail?.horoScope && hasHoroScopeDataR(profileID?.MarriageprofileDetail?.horoScope)
              ? "Print profile & horoscope"
              : "Print profile"}
          </span>
          </a>
        
        </span>
      </div>
            </div>

            <div className="row">
              <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Father occupation</label>
              <div className="col-8">
                <label className="form-control-plaintext">: {profileID.MarriageprofileDetail.fatherOccupation}</label>
              </div>
            </div>

            <div className="row">
              <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Mother Name</label>
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
          <span id="#click" className={profileID?.MarriageprofileDetail?.horoScope && hasHoroScopeDataR(profileID?.MarriageprofileDetail?.horoScope) }>
            {profileID?.MarriageprofileDetail?.horoScope && hasHoroScopeDataR(profileID?.MarriageprofileDetail?.horoScope)
              ? "Print profile & horoscope"
              : "Print profile"}
          </span>
          </a>
        
        </span>
      </div>
            </div>

            <div className="row">
              <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Mother occupation</label>
              <div className="col-8">
                <label className="form-control-plaintext">: {profileID.MarriageprofileDetail.motherOccupation}</label>
              </div>
            </div>

            <div className="row">
              <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Sister(s) Married</label>
              <div className="col-8">
                <label className="form-control-plaintext">: {profileID.MarriageprofileDetail.sistersMarried}</label>
              </div>
            </div>

            <div className="row">
              <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Sister(s) Unmarried</label>
              <div className="col-8">
                <label className="form-control-plaintext">: {profileID.MarriageprofileDetail.sistersUnmarried}</label>
              </div>
            </div>

            <div className="row">
              <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Brother(s) Married</label>
              <div className="col-8">
                <label className="form-control-plaintext">: {profileID.MarriageprofileDetail.brothersMarried}</label>
              </div>
            </div>
            <div className="row">
              <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Brother(s) Unmarried</label>
              <div className="col-8">
                <label className="form-control-plaintext">: {profileID.MarriageprofileDetail.brothersUnmarried}</label>
              </div>
            </div>

            <div className="row">
              <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Settled Location</label>
              <div className="col-8">
                <label className="form-control-plaintext">: {profileID.MarriageprofileDetail.settledLocation}</label>
              </div>
            </div>

          </>
        )}
      </div>


      <div id="dvpublicProfile" className="row">

        <div className="card-container">
          {profileID.isProfileDetailsByIdLoading && (
            <>
              <div className="section-skeleton">
                <div className="skeleton skeleton-Detail-section1"></div>
              </div>
            </>

          )} </div>

        {profileID.isMarriageProfileDetailSuccess && !profileID.isMarriageProfileDetailLoading && (
          <>

            <p className="h5">4. Additional Information</p><br /><br />

            <div className="row">
              <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Self Description</label>
              <div className="col-8">
                <label className="form-control-plaintext">: {profileID.MarriageprofileDetail.selfDescription}</label>
              </div>
            </div>

            <div className="row">
              <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Expectation from marriage</label>
              <div className="col-8">
                <label className="form-control-plaintext">: {profileID.MarriageprofileDetail.expectationFromMarriage}</label>
              </div>
            </div>

            {/* <div className="row">
              <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Notes</label>
              <div className="col-8">
                <label className="form-control-plaintext">: {profileID.MarriageprofileDetail.notes}</label>
              </div>
            </div> */}

          </>
        )}


      </div><br />  <br />


     
{/* 
      <div className="card-container">
        {profileID.isgetHoroscopeDetailsByIdLoading && (
          <>
            <div className="section-skeleton">
              <div className="skeleton skeleton-Detail-section2"></div>
            </div>
          </>

        )} </div> */}

      {/* {profileID.isgetHoroscopeDetailsByIdSuccess && profileID.isgetHoroscopeDetailsByIdLoading && ( */}
        {/* <> */}
         <p className="h4">Horoscope Details
      </p>
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
          <span id="#click" className={profileID?.MarriageprofileDetail?.horoScope && hasHoroScopeDataR(profileID?.MarriageprofileDetail?.horoScope) }>
            {profileID?.MarriageprofileDetail?.horoScope && hasHoroScopeDataR(profileID?.MarriageprofileDetail?.horoScope)
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
          <a href="#click" className="me-2" style={{ color: 'red' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-cloud-download" viewBox="0 0 16 16">
              <path d="M4.406 1.342A5.53 5.53 0 0 1 8 0c2.69 0 4.923 2 5.166 4.579C14.758 4.804 16 6.137 16 7.773 16 9.569 14.502 11 12.687 11H10a.5.5 0 0 1 0-1h2.688C13.979 10 15 8.988 15 7.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 2.825 10.328 1 8 1a4.53 4.53 0 0 0-2.941 1.1c-.757.652-1.153 1.438-1.153 2.055v.448l-.445.049C2.064 4.805 1 5.952 1 7.318 1 8.785 2.23 10 3.781 10H6a.5.5 0 0 1 0 1H3.781C1.708 11 0 9.366 0 7.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383"/>
              <path d="M7.646 15.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 14.293V5.5a.5.5 0 0 0-1 0v8.793l-2.146-2.147a.5.5 0 0 0-.708.708z"/>
            </svg>
          </a>
            <a href="#click" className="me-2 text-danger text-decoration-none">
          <span id="#click" className={profileID?.MarriageprofileDetail?.horoScope && hasHoroScopeDataR(profileID?.MarriageprofileDetail?.horoScope) }>
            {profileID?.MarriageprofileDetail?.horoScope && hasHoroScopeDataR(profileID?.MarriageprofileDetail?.horoScope)
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
          <a href="#click" className="me-2" style={{ color: 'red' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-cloud-download" viewBox="0 0 16 16">
              <path d="M4.406 1.342A5.53 5.53 0 0 1 8 0c2.69 0 4.923 2 5.166 4.579C14.758 4.804 16 6.137 16 7.773 16 9.569 14.502 11 12.687 11H10a.5.5 0 0 1 0-1h2.688C13.979 10 15 8.988 15 7.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 2.825 10.328 1 8 1a4.53 4.53 0 0 0-2.941 1.1c-.757.652-1.153 1.438-1.153 2.055v.448l-.445.049C2.064 4.805 1 5.952 1 7.318 1 8.785 2.23 10 3.781 10H6a.5.5 0 0 1 0 1H3.781C1.708 11 0 9.366 0 7.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383"/>
              <path d="M7.646 15.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 14.293V5.5a.5.5 0 0 0-1 0v8.793l-2.146-2.147a.5.5 0 0 0-.708.708z"/>
            </svg>
          </a>
            <a href="#click" className="me-2 text-danger text-decoration-none">
          <span id="#click" className={profileID?.MarriageprofileDetail?.horoScope && hasHoroScopeDataR(profileID?.MarriageprofileDetail?.horoScope) }>
            {profileID?.MarriageprofileDetail?.horoScope && hasHoroScopeDataR(profileID?.MarriageprofileDetail?.horoScope)
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
          <a href="#click" className="me-2" style={{ color: 'red' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-cloud-download" viewBox="0 0 16 16">
              <path d="M4.406 1.342A5.53 5.53 0 0 1 8 0c2.69 0 4.923 2 5.166 4.579C14.758 4.804 16 6.137 16 7.773 16 9.569 14.502 11 12.687 11H10a.5.5 0 0 1 0-1h2.688C13.979 10 15 8.988 15 7.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 2.825 10.328 1 8 1a4.53 4.53 0 0 0-2.941 1.1c-.757.652-1.153 1.438-1.153 2.055v.448l-.445.049C2.064 4.805 1 5.952 1 7.318 1 8.785 2.23 10 3.781 10H6a.5.5 0 0 1 0 1H3.781C1.708 11 0 9.366 0 7.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383"/>
              <path d="M7.646 15.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 14.293V5.5a.5.5 0 0 0-1 0v8.793l-2.146-2.147a.5.5 0 0 0-.708.708z"/>
            </svg>
          </a>
            <a href="#click" className="me-2 text-danger text-decoration-none">
          <span id="#click" className={profileID?.MarriageprofileDetail?.horoScope && hasHoroScopeDataR(profileID?.MarriageprofileDetail?.horoScope) }>
            {profileID?.MarriageprofileDetail?.horoScope && hasHoroScopeDataR(profileID?.MarriageprofileDetail?.horoScope)
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
          <a href="#click" className="me-2" style={{ color: 'red' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-cloud-download" viewBox="0 0 16 16">
              <path d="M4.406 1.342A5.53 5.53 0 0 1 8 0c2.69 0 4.923 2 5.166 4.579C14.758 4.804 16 6.137 16 7.773 16 9.569 14.502 11 12.687 11H10a.5.5 0 0 1 0-1h2.688C13.979 10 15 8.988 15 7.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 2.825 10.328 1 8 1a4.53 4.53 0 0 0-2.941 1.1c-.757.652-1.153 1.438-1.153 2.055v.448l-.445.049C2.064 4.805 1 5.952 1 7.318 1 8.785 2.23 10 3.781 10H6a.5.5 0 0 1 0 1H3.781C1.708 11 0 9.366 0 7.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383"/>
              <path d="M7.646 15.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 14.293V5.5a.5.5 0 0 0-1 0v8.793l-2.146-2.147a.5.5 0 0 0-.708.708z"/>
            </svg>
          </a>
            <a href="#click" className="me-2 text-danger text-decoration-none">
          <span id="#click" className={profileID?.MarriageprofileDetail?.horoScope && hasHoroScopeDataR(profileID?.MarriageprofileDetail?.horoScope) }>
            {profileID?.MarriageprofileDetail?.horoScope && hasHoroScopeDataR(profileID?.MarriageprofileDetail?.horoScope)
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

        {/* </>
      )} */}

      <p className="h4">Broker Contact Details</p><br />

      {profileID.isMarriageProfileDetailSuccess && !profileID.isMarriageProfileDetailLoading && (
        <>
          {profileID && profileID.BrokerDetails ? (
            <div id="dvbrokerDetails" className="row">
              <div className="col-md-12">
                <div className="row">
                  <label style={{ fontWeight: 'bold' }} className="col-3 col-form-label">Broker Name</label>
                  <div className="col-9">
                    <label className="form-control-plaintext">: {profileID.BrokerDetails.name}</label>
                  </div>
                </div>

                <div className="row">
                  <label style={{ fontWeight: 'bold' }} className="col-3 col-form-label">Contact Number</label>
                  <div className="col-9">
                    <label className="form-control-plaintext">: {profileID.BrokerDetails.phoneNumber}</label>
                  </div>
                </div>

                <div className="row">
                  <label style={{ fontWeight: 'bold' }} className="col-3 col-form-label">Matrimony Name</label>
                  <div className="col-9">
                    <label className="form-control-plaintext">: {profileID.BrokerDetails.matrimonyName}</label>
                  </div>
                </div>

                <div className="row">
                  <label style={{ fontWeight: 'bold' }} className="col-3 col-form-label">Address</label>
                  <div className="col-9">
                    <label className="form-control-plaintext">: {profileID.BrokerDetails.address1} </label>
                  </div>
                </div>
                <div className="row">
                  <label style={{ fontWeight: 'bold' }} className="col-3 col-form-label">Registration Number</label>
                  <div className="col-9">
                    <label className="form-control-plaintext">: {profileID.BrokerDetails.registrationNumber} </label>
                  </div>
                </div> 
                 <div className="row">
                  <label style={{ fontWeight: 'bold' }} className="col-3 col-form-label">Commission Percentage</label>
                  <div className="col-9">
                    <label className="form-control-plaintext">: {profileID.BrokerDetails.commissionPercentage} </label>
                  </div>
                </div>                                
              </div>

            </div>) : null
          }

        </>
      )}
    </div> <br />

    <div className="row cols-1">
      <div className="button-container">
        {
          (profileID?.MarriageprofileDetail?.horoScope && hasHoroScopeDataR(profileID?.MarriageprofileDetail?.horoScope)) ? (
            <button onClick={() => onPrintClick()} className="primarybutton print-btn" id="click">Print profile & horoscope</button>
          ) : (
            <button onClick={() => onPrintClick()} className="primarybutton" id="click">Print profile</button>
          )
        }
        <button onClick={() => onCancelClick()} className="secondarybutton">Close</button>
      </div>
    </div>

  </>)

}