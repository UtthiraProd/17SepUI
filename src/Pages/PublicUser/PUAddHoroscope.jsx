import { useState, useRef, useEffect } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updatePUHoroscope, resetUpdateHoroscope, getPUImageUrl } from "../../Features/Slices/PublicUser/publicUserSlice"
import { Carousal } from "../Common/Carousal"
import { toast } from "react-toastify";
import maleavatar from '../../img/Male_avatar.svg'
    import femaleavatar from '../../img/Female_avatar.svg'
import "../../scss/horoscopeCheckboxGrid.scss"

export function PUAddHoroscope() {

    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const profileIdParam = searchParams.get('id')
    const backScreenName = searchParams.get('name')

    const profile =
        useSelector(
            (state) => state.public
        )


    useEffect(() => {
        dispatch(getPUImageUrl({ profileId: profileIdParam }))
    }, [])

    useEffect(() => {
        if (profile.isUpdateHoroscopeSuccess) {
            toast.success(profile.messageUpdateHoroscope)
            dispatch(resetUpdateHoroscope())
            setTimeout(function () {
                navigate('/PUPlanSchedule?id=' + profileIdParam + "&name=PUNewProfile", { replace: true })
            }, 2000);
        }
        if (profile.isUpdateHoroscopeProfileError) {
            toast.error(profile.messageUpdateHoroscope)
        }
    }, [profile.isUpdateHoroscopeProfileError, profile.isUpdateHoroscopeSuccess, profile.isUpdateHoroscopeProfileError, dispatch])
    const backViewDetailsUrl = () => {
        navigate('/PURegisterImage?id=' + profileIdParam + "&name=PUNewProfile", { replace: true })
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

    const rasis = [
        'மேஷம்', 'ரிஷபம்', 'மிதுனம்', 'கடகம்', 'சிம்மம்', 'கன்னி',
        'துலாம்', 'விருச்சிகம்', 'தனுசு', 'மகரம்', 'கும்பம்', 'மீனம்'
    ];
    const rasiEng = ['mesha', 'vrishba', 'mithuna', 'karkata', 'simha', 'kanya',
        'tula', 'vrishika', 'dhanu', 'makara', 'khumbha', 'meena'
    ]
    const planates = [
        'லக்கினம்', 'சூரியன்', 'சந்திரன்', 'செவ்வாய்', 'புதன்',
        'குரு', 'சுக்கிரன்', 'சனி', 'இராகு', 'கேது','மாந்தி'
    ];
    const planatesPdf = [
        'ல', 'சூ', 'சந்', 'செ', 'பு',
        'குரு', 'சுக்', 'சனி', 'ராகு', 'கேது','மா'
    ];

    const options = ['ல', 'சூ', 'சந்', 'செ', 'பு', 'குரு', 'சுக்', 'சனி', 'ராகு', 'கேது','மா'];

    const horoscopeDataRef = useRef({
        profileId: profileIdParam,
        meshaR: "", vrishbaR: "", mithunaR: "", karkataR: "", simhaR: "", kanyaR: "",
        tulaR: "", vrishikaR: "", dhanuR: "", makaraR: "", khumbhaR: "", meenaR: "",
        meshaA: "", vrishbaA: "", mithunaA: "", karkataA: "", simhaA: "", kanyaA: "",
        tulaA: "", vrishikaA: "", dhanuA: "", makaraA: "", khumbhaA: "", meenaA: "",
        dhasa: "", year: "", month: "", day: ""
    });

    function constructRasi(index, value) {
        const data = horoscopeDataRef.current;
        if (index === 0) data.meshaR = value;
        if (index === 1) data.vrishbaR = value;
        if (index === 2) data.mithunaR = value;
        if (index === 4) data.karkataR = value;
        if (index === 6) data.simhaR = value;
        if (index === 10) data.kanyaR = value;
        if (index === 9) data.tulaR = value;
        if (index === 8) data.vrishikaR = value;
        if (index === 7) data.dhanuR = value;
        if (index === 5) data.makaraR = value;
        if (index === 3) data.khumbhaR = value;
        if (index === 11) data.meenaR = value;
    }

    function constructAmsam(index, value) {
        const data = horoscopeDataRef.current;
        if (index === 12) data.meshaA = value;
        if (index === 13) data.vrishbaA = value;
        if (index === 14) data.mithunaA = value;
        if (index === 16) data.karkataA = value;
        if (index === 18) data.simhaA = value;
        if (index === 22) data.kanyaA = value;
        if (index === 21) data.tulaA = value;
        if (index === 20) data.vrishikaA = value;
        if (index === 19) data.dhanuA = value;
        if (index === 17) data.makaraA = value;
        if (index === 15) data.khumbhaA = value;
        if (index === 23) data.meenaA = value;
    }

    const [dropdowns, setDropdowns] = useState(
        Array.from({ length: 24 }, () => ({
            selected: [],
            isOpen: false,
        }))
    );

    const dropdownRefs = useRef([]);

    const toggleDropdown = (index) => {
        setDropdowns((prev) =>
            prev.map((d, i) =>
                i === index ? { ...d, isOpen: !d.isOpen } : { ...d, isOpen: false }
            )
        );
    };

    const handleCheckboxChangeR = (index, option) => {
        setDropdowns((prev) =>
            prev.map((d, i) => {
                if (i !== index) return d;
                const selected = d.selected.includes(option)
                    ? d.selected.filter((item) => item !== option)

                    : [...d.selected, option];
                constructRasi(index, selected.join(','))
                return { ...d, selected };
            })
        );
    };


    const handleCheckboxChangeA = (index, option) => {
        setDropdowns((prev) =>
            prev.map((d, i) => {
                if (i !== index) return d;
                const selected = d.selected.includes(option)
                    ? d.selected.filter((item) => item !== option)
                    : [...d.selected, option];
                constructAmsam(index, selected.join(','))
                return { ...d, selected };
            })
        );
    };

      useEffect(() => {
        const handleClickOutside = (e) => {
          if (!dropdownRefs.current.some((ref) => ref?.contains(e.target))) {
            setDropdowns((prev) => prev.map((d) => ({ ...d, isOpen: false })));
          }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
      }, []);

    const clearRasiDropdowns = (indices) => {
        setDropdowns((prev) =>
            prev.map((d, i) =>
                indices.includes(i) ? { ...d, selected: [] } : d
            )
        );
        const data = horoscopeDataRef.current;
        data.meshaR = null;
        data.vrishbaR = null;
        data.mithunaR = null;
        data.karkataR = null;
        data.simhaR = null;
        data.kanyaR = null;
        data.tulaR = null;
        data.vrishikaR = null;
        data.dhanuR = null;
        data.makaraR = null;
        data.khumbhaR = null;
        data.meenaR = null;
    };

    const clearAmsamDropdowns = (indices) => {
        setDropdowns((prev) =>
            prev.map((d, i) =>
                indices.includes(i) ? { ...d, selected: [] } : d
            )
        );
        const data = horoscopeDataRef.current;
        data.meshaA = null;
        data.vrishbaA = null;
        data.mithunaA = null;
        data.karkataA = null;
        data.simhaA = null;
        data.kanyaA = null;
        data.tulaA = null;
        data.vrishikaA = null;
        data.dhanuA = null;
        data.makaraA = null;
        data.khumbhaA = null;
        data.meenaA = null;
    };

    /**Rasi */
    function grahasFromRasi(dropdowns, options) {
        const grahasRasiCount = {};
        options.forEach(opt => grahasRasiCount[opt] = 0);

        for (let i = 0; i < 12; i++) {
            dropdowns[i].selected.forEach(value => {
                grahasRasiCount[value] = (grahasRasiCount[value] || 0) + 1;
            });
        }
        const existsRasi = options.filter(opt => grahasRasiCount[opt] > 1);
        const selectedGrahas = options.filter(opt => grahasRasiCount[opt] > 0);

        return { existsRasi, selectedGrahas };
    }

    /**Amsam */
    function grahasFromAmsam(dropdowns, options) {
        const grahasAmsamCount = {}

        options.forEach(opt => grahasAmsamCount[opt] = 0)

        for (let i = 12; i < 24; i++) {
            dropdowns[i].selected.forEach(value => {
                grahasAmsamCount[value] = (grahasAmsamCount[value] || 0) + 1;
            });
        }

        const existsAmsam = options.filter(opt => grahasAmsamCount[opt] > 1);
        const selectedAmsam = options.filter(opt => grahasAmsamCount[opt] > 0);

        return { selectedAmsam, existsAmsam }
    }

  const [formTextData, setformTextData] = useState({
    dhasa: '',
    year: '',
    month: '',
    day: ''
  })

  const { dhasa, year, month, day } = formTextData

  const onchange = (e) => {
    setformTextData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }


    function constructHoroscope() {

          horoscopeDataRef.current.dhasa = dhasa;
          horoscopeDataRef.current.year = year;
          horoscopeDataRef.current.month = month;
          horoscopeDataRef.current.day = day;

        console.log(horoscopeDataRef.current)


        const { existsRasi, selectedGrahas } = grahasFromRasi(dropdowns, options);

        if (selectedGrahas.length === 1) {
            const remainingGrahas = options.filter(opt => !selectedGrahas.includes(opt));
            // toast.error(`Please select the remaining: ${remainingGrahas.join(', ')}`);
             toast.error(`Please select the remaining Grahas in ராசி`)
            return;
        }

        // If more than 1 Graha selected, but still not enough (e.g., less than 10)
        if (selectedGrahas.length > 1 && selectedGrahas.length < 10) {
            const remainingGrahas = options.filter(opt => !selectedGrahas.includes(opt));
            toast.error(`Please select all 10 Grahas in ராசி. Missing: ${remainingGrahas.join(', ')}`);
            return;
        }

        // If any Rasi has duplicate Grahas
        if (existsRasi.length > 0) {
            toast.error(`${existsRasi.join(', ')} already added in ராசி`);
            return;
        }

        const { selectedAmsam, existsAmsam } = grahasFromAmsam(dropdowns, options);

        if (selectedAmsam.length === 1) {
            const remainingAmsam = options.filter(opt => !selectedAmsam.includes(opt));
            // toast.error(`Please select the remaining: ${remainingAmsam.join(', ')}`);
            toast.error(`Please select the remaining Grahas in அம்சம்`)
            return;
        }

        if (selectedAmsam.length > 1 && selectedAmsam.length < 10) {
            const remainingAmsam = options.filter(opt => !selectedAmsam.includes(opt));
            toast.error(`Please select all 10 Grahas in அம்சம். Missing: ${remainingAmsam.join(', ')}`);
            return;
        }

        if (existsAmsam.length > 0) {
            toast.error(`${existsAmsam.join(', ')} already added in அம்சம்`);
            return;
        }

        dispatch(updatePUHoroscope(horoscopeDataRef.current))

    }

    const onClickNext = () => {
        navigate('/PUPlanSchedule?id=' + profileIdParam + "&name=PUNewProfile", { replace: true })
    }

    const [currentImageUrl, setCurrentImageUrl] = useState('');
    const handleImageChange = (imageUrls) => {
        setCurrentImageUrl(imageUrls);
    };

    return (<>
        <div>
        <div className="dropdown-item d-flex align-items-center" >
                <svg onClick={backViewDetailsUrl} style={{ cursor: 'pointer' }} xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#1aa179" className="bi bi-arrow-left-circle" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z" />
                </svg>
                <p className="h5 mb-0 ms-2" onClick={backViewDetailsUrl} style={{ cursor: 'pointer' }}>Go Back</p>
            </div>
            <br />

            <h5>3. Horoscope Information</h5>

            <div className="row" id="dvuhoroscope">
                <div className="row row-cols-1 row-cols-lg-3 gx-md-5 gy-3">
                <div className="col">
                    <div className="border border-success rounded ps-2 pb-3">
                        <div className="row ">
                            <div className='col-4 mt-1' style={{ height: "140px", paddingTop: '10px' }}>
                                {profile.profileDetails.sex === "Male" ? (
                                    <img
                                    className="centered-image"
                                    src={profile.getPUImageList && profile.getPUImageList.length > 0
                                        ? (profile.getPUImageList[0]): maleavatar
    }
                                    alt="Profile"
                                    style={{
                                        width: '100%',
                                        height: '200px',
                                        objectFit: 'cover'
                                    }}
                                />
                                ): profile.profileDetails.sex === "Female" ? (
                                     <img
                                    className="centered-image"
                                   src={profile.getPUImageList && profile.getPUImageList.length > 0
                                       ? (profile.getPUImageList[0]): femaleavatar
    }
                                    alt="Profile"
                                    style={{
                                        width: '100%',
                                        height: '200px',
                                        objectFit: 'cover'
                                    }}
                                />

                                ):(
                                    <p>Gender not specified.</p>
                                )}
                                

                            </div>
                          
                            <div className='col-8'>
                                <div className='row'>
                                    <h5>
                                        <label htmlFor="" className='name text-success mt-2'><b>{profile.profileDetails.name}</b> </label><br /> </h5>
                                    <div className='col-5'>
                                        <label htmlFor="" className=''>Age</label><br />
                                        <label htmlFor=""><b>{calculateAge(profile.profileDetails.DOB)}</b></label>
                                    </div>
                                    <div className='col-6'>
                                        <label htmlFor="" className=''>District</label>
                                        <label htmlFor=""><b>{profile.profileDetails.district}</b></label>
                                    </div>
                                    <div>
                                        <label htmlFor="" className='mt-2'>Job</label><br />
                                        <label htmlFor=""><b>{profile.profileDetails.job}</b></label>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <div className="col">
                    <button className="btn btn-outline-success p-1 mb-1">
                        <p onClick={() => clearRasiDropdowns([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11])} className="mb-0" >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="20" fill="currentColor" class="bi bi-arrow-clockwise" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z" />
                            <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466" />
                        </svg>  Refresh ராசி</p>
                    </button>
                   
                    <div>
                        <div className="row">
                             
                            <div className="col-3 border-box">12.

                                {/* Grid 12. மீனம்*/}
                                <div ref={(el) => (dropdownRefs.current[11] = el)} >
                                    <div
                                        onClick={() => toggleDropdown(11)}
                                        className={`custom-dropdown-toggle ${dropdowns[11].selected.length === 0 ||
                                            dropdowns[11].selected.join(', ').toLowerCase() === 'select'
                                            ? 'select-placeholder'
                                            : ''
                                            }`}
                                    >
                                        {dropdowns[11].selected.length > 0
                                            ? dropdowns[11].selected.join(', ')
                                            : 'Select'}
                                        <span className="dropdown-arrow">{dropdowns[11].isOpen ? '▲' : '▼'}</span>
                                    </div>

                                    {dropdowns[11].isOpen && (
                                        <div className="custom-dropdown-menu">
                                            {options.map((option) => (
                                                <label key={option} className="dropdown-option">
                                                    <input
                                                        type="checkbox"
                                                        checked={dropdowns[11].selected.includes(option)}
                                                        onChange={() => handleCheckboxChangeR(11, option)}
                                                    />{' '}
                                                    {option}
                                                </label>
                                            ))}
                                        </div>
                                    )}
                                </div>




                            </div>
                            <div className="col-3 border-box">1.


                                {/* Grid 1. மேஷம்*/}
                                <div ref={(el) => (dropdownRefs.current[0] = el)}>
                                    <div
                                        onClick={() => toggleDropdown(0)}
                                        className={`custom-dropdown-toggle ${dropdowns[0].selected.length === 0 ||
                                            dropdowns[0].selected.join(', ').toLowerCase() === 'select'
                                            ? 'select-placeholder'
                                            : ''
                                            }`}
                                    >
                                        {dropdowns[0].selected.length > 0
                                            ? dropdowns[0].selected.join(', ')
                                            : 'Select'}
                                        <span className="dropdown-arrow">{dropdowns[0].isOpen ? '▲' : '▼'}</span>
                                    </div>

                                    {dropdowns[0].isOpen && (
                                        <div className="custom-dropdown-menu">
                                            {options.map((option) => (
                                                <label key={option} className="dropdown-option">
                                                    <input
                                                        type="checkbox"
                                                        checked={dropdowns[0].selected.includes(option)}
                                                        onChange={() => handleCheckboxChangeR(0, option)}
                                                    />{' '}
                                                    {option}
                                                </label>
                                            ))}
                                        </div>
                                    )}
                                </div>



                            </div>
                            <div className="col-3 border-box">2.

                                {/* Grid 2. ரிஷபம்*/}
                                <div ref={(el) => (dropdownRefs.current[1] = el)}>
                                    <div
                                        onClick={() => toggleDropdown(1)}
                                        className={`custom-dropdown-toggle ${dropdowns[1].selected.length === 0 ||
                                            dropdowns[1].selected.join(', ').toLowerCase() === 'select'
                                            ? 'select-placeholder'
                                            : ''
                                            }`}
                                    >
                                        {dropdowns[1].selected.length > 0
                                            ? dropdowns[1].selected.join(', ')
                                            : 'Select'}
                                        <span className="dropdown-arrow">{dropdowns[1].isOpen ? '▲' : '▼'}</span>
                                    </div>

                                    {dropdowns[1].isOpen && (
                                        <div className="custom-dropdown-menu">
                                            {options.map((option) => (
                                                <label key={option} className="dropdown-option">
                                                    <input
                                                        type="checkbox"
                                                        checked={dropdowns[1].selected.includes(option)}
                                                        onChange={() => handleCheckboxChangeR(1, option)}
                                                    />{' '}
                                                    {option}
                                                </label>
                                            ))}
                                        </div>
                                    )}
                                </div>





                            </div>
                            <div className="col-3 border-box">3.


                                {/* Grid 3. மிதுனம்*/}
                                <div ref={(el) => (dropdownRefs.current[2] = el)}>
                                    <div
                                        onClick={() => toggleDropdown(2)}
                                        className={`custom-dropdown-toggle ${dropdowns[2].selected.length === 0 ||
                                            dropdowns[2].selected.join(', ').toLowerCase() === 'select'
                                            ? 'select-placeholder'
                                            : ''
                                            }`}
                                    >
                                        {dropdowns[2].selected.length > 0
                                            ? dropdowns[2].selected.join(', ')
                                            : 'Select'}
                                        <span className="dropdown-arrow">{dropdowns[2].isOpen ? '▲' : '▼'}</span>
                                    </div>

                                    {dropdowns[2].isOpen && (
                                        <div className="custom-dropdown-menu">
                                            {options.map((option) => (
                                                <label key={option} className="dropdown-option">
                                                    <input
                                                        type="checkbox"
                                                        checked={dropdowns[2].selected.includes(option)}
                                                        onChange={() => handleCheckboxChangeR(2, option)}
                                                    />{' '}
                                                    {option}
                                                </label>
                                            ))}
                                        </div>
                                    )}
                                </div>



                            </div>
                        </div>
                        <div className="row">
                            <div className="col-3 border-box">11.


                                {/* Grid 11. கும்பம்*/}
                                <div ref={(el) => (dropdownRefs.current[3] = el)}>
                                    <div
                                        onClick={() => toggleDropdown(3)}
                                        className={`custom-dropdown-toggle ${dropdowns[3].selected.length === 0 ||
                                            dropdowns[3].selected.join(', ').toLowerCase() === 'select'
                                            ? 'select-placeholder'
                                            : ''
                                            }`}
                                    >
                                        {dropdowns[3].selected.length > 0
                                            ? dropdowns[3].selected.join(', ')
                                            : 'Select'}
                                        <span className="dropdown-arrow">{dropdowns[3].isOpen ? '▲' : '▼'}</span>
                                    </div>

                                    {dropdowns[3].isOpen && (
                                        <div className="custom-dropdown-menu">
                                            {options.map((option) => (
                                                <label key={option} className="dropdown-option">
                                                    <input
                                                        type="checkbox"
                                                        checked={dropdowns[3].selected.includes(option)}
                                                        onChange={() => handleCheckboxChangeR(3, option)}
                                                    />{' '}
                                                    {option}
                                                </label>
                                            ))}
                                        </div>
                                    )}
                                </div>


                            </div>
                            <div className="col-6 text-center"><br /><br /><h5><b>ராசி</b></h5>
                            
                        </div>
                            <div className="col-3 border-box">4.

                                {/* Grid 4. கடகம்*/}
                                <div ref={(el) => (dropdownRefs.current[4] = el)}>
                                    <div
                                        onClick={() => toggleDropdown(4)}
                                        className={`custom-dropdown-toggle ${dropdowns[4].selected.length === 0 ||
                                            dropdowns[4].selected.join(', ').toLowerCase() === 'select'
                                            ? 'select-placeholder'
                                            : ''
                                            }`}
                                    >
                                        {dropdowns[4].selected.length > 0
                                            ? dropdowns[4].selected.join(', ')
                                            : 'Select'}
                                        <span className="dropdown-arrow">{dropdowns[4].isOpen ? '▲' : '▼'}</span>
                                    </div>

                                    {dropdowns[4].isOpen && (
                                        <div className="custom-dropdown-menu">
                                            {options.map((option) => (
                                                <label key={option} className="dropdown-option">
                                                    <input
                                                        type="checkbox"
                                                        checked={dropdowns[4].selected.includes(option)}
                                                        onChange={() => handleCheckboxChangeR(4, option)}
                                                    />{' '}
                                                    {option}
                                                </label>
                                            ))}
                                        </div>
                                    )}
                                </div>


                            </div>
                        </div>
                        <div className="row">
                            <div className="col-3 border-box">10.

                                {/* Grid 10. மகரம்*/}
                                <div ref={(el) => (dropdownRefs.current[5] = el)}>
                                    <div
                                        onClick={() => toggleDropdown(5)}
                                        className={`custom-dropdown-toggle ${dropdowns[5].selected.length === 0 ||
                                            dropdowns[5].selected.join(', ').toLowerCase() === 'select'
                                            ? 'select-placeholder'
                                            : ''
                                            }`}
                                    >
                                        {dropdowns[5].selected.length > 0
                                            ? dropdowns[5].selected.join(', ')
                                            : 'Select'}
                                        <span className="dropdown-arrow">{dropdowns[5].isOpen ? '▲' : '▼'}</span>
                                    </div>

                                    {dropdowns[5].isOpen && (
                                        <div className="custom-dropdown-menu">
                                            {options.map((option) => (
                                                <label key={option} className="dropdown-option">
                                                    <input
                                                        type="checkbox"
                                                        checked={dropdowns[5].selected.includes(option)}
                                                        onChange={() => handleCheckboxChangeR(5, option)}
                                                    />{' '}
                                                    {option}
                                                </label>
                                            ))}
                                        </div>
                                    )}
                                </div>


                            </div>
                            <div className="col-6"></div>
                            <div className="col-3 border-box">5.
                                {/* Grid 5. சிம்மம்*/}
                                <div ref={(el) => (dropdownRefs.current[6] = el)}>
                                    <div
                                        onClick={() => toggleDropdown(6)}
                                        className={`custom-dropdown-toggle ${dropdowns[6].selected.length === 0 ||
                                            dropdowns[6].selected.join(', ').toLowerCase() === 'select'
                                            ? 'select-placeholder'
                                            : ''
                                            }`}
                                    >
                                        {dropdowns[6].selected.length > 0
                                            ? dropdowns[6].selected.join(', ')
                                            : 'Select'}
                                        <span className="dropdown-arrow">{dropdowns[6].isOpen ? '▲' : '▼'}</span>
                                    </div>

                                    {dropdowns[6].isOpen && (
                                        <div className="custom-dropdown-menu">
                                            {options.map((option) => (
                                                <label key={option} className="dropdown-option">
                                                    <input
                                                        type="checkbox"
                                                        checked={dropdowns[6].selected.includes(option)}
                                                        onChange={() => handleCheckboxChangeR(6, option)}
                                                    />{' '}
                                                    {option}
                                                </label>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-3 border-box">9.


                                {/* Grid 9. தனுசு*/}
                                <div ref={(el) => (dropdownRefs.current[7] = el)}>
                                    <div
                                        onClick={() => toggleDropdown(7)}
                                        className={`custom-dropdown-toggle ${dropdowns[7].selected.length === 0 ||
                                            dropdowns[7].selected.join(', ').toLowerCase() === 'select'
                                            ? 'select-placeholder'
                                            : ''
                                            }`}
                                    >
                                        {dropdowns[7].selected.length > 0
                                            ? dropdowns[7].selected.join(', ')
                                            : 'Select'}
                                        <span className="dropdown-arrow">{dropdowns[7].isOpen ? '▲' : '▼'}</span>
                                    </div>

                                    {dropdowns[7].isOpen && (
                                        <div className="custom-dropdown-menu">
                                            {options.map((option) => (
                                                <label key={option} className="dropdown-option">
                                                    <input
                                                        type="checkbox"
                                                        checked={dropdowns[7].selected.includes(option)}
                                                        onChange={() => handleCheckboxChangeR(7, option)}
                                                    />{' '}
                                                    {option}
                                                </label>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="col-3 border-box">8.
                                {/* Grid 8. விருச்சிகம்*/}
                                <div ref={(el) => (dropdownRefs.current[8] = el)}>
                                    <div
                                        onClick={() => toggleDropdown(8)}
                                        className={`custom-dropdown-toggle ${dropdowns[8].selected.length === 0 ||
                                            dropdowns[8].selected.join(', ').toLowerCase() === 'select'
                                            ? 'select-placeholder'
                                            : ''
                                            }`}
                                    >
                                        {dropdowns[8].selected.length > 0
                                            ? dropdowns[8].selected.join(', ')
                                            : 'Select'}
                                        <span className="dropdown-arrow">{dropdowns[8].isOpen ? '▲' : '▼'}</span>
                                    </div>

                                    {dropdowns[8].isOpen && (
                                        <div className="custom-dropdown-menu">
                                            {options.map((option) => (
                                                <label key={option} className="dropdown-option">
                                                    <input
                                                        type="checkbox"
                                                        checked={dropdowns[8].selected.includes(option)}
                                                        onChange={() => handleCheckboxChangeR(8, option)}
                                                    />{' '}
                                                    {option}
                                                </label>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="col-3 border-box">7.
                                {/* Grid 7. துலாம்*/}
                                <div ref={(el) => (dropdownRefs.current[9] = el)}>
                                    <div
                                        onClick={() => toggleDropdown(9)}
                                        className={`custom-dropdown-toggle ${dropdowns[9].selected.length === 0 ||
                                            dropdowns[9].selected.join(', ').toLowerCase() === 'select'
                                            ? 'select-placeholder'
                                            : ''
                                            }`}
                                    >
                                        {dropdowns[9].selected.length > 0
                                            ? dropdowns[9].selected.join(', ')
                                            : 'Select'}
                                        <span className="dropdown-arrow">{dropdowns[9].isOpen ? '▲' : '▼'}</span>
                                    </div>

                                    {dropdowns[9].isOpen && (
                                        <div className="custom-dropdown-menu">
                                            {options.map((option) => (
                                                <label key={option} className="dropdown-option">
                                                    <input
                                                        type="checkbox"
                                                        checked={dropdowns[9].selected.includes(option)}
                                                        onChange={() => handleCheckboxChangeR(9, option)}
                                                    />{' '}
                                                    {option}
                                                </label>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="col-3 border-box">6.


                                {/* Grid 6. கன்னி*/}
                                <div ref={(el) => (dropdownRefs.current[10] = el)}>
                                    <div
                                        onClick={() => toggleDropdown(10)}
                                        className={`custom-dropdown-toggle ${dropdowns[10].selected.length === 0 ||
                                            dropdowns[10].selected.join(', ').toLowerCase() === 'select'
                                            ? 'select-placeholder'
                                            : ''
                                            }`}
                                    >
                                        {dropdowns[10].selected.length > 0
                                            ? dropdowns[10].selected.join(', ')
                                            : 'Select'}
                                        <span className="dropdown-arrow">{dropdowns[10].isOpen ? '▲' : '▼'}</span>
                                    </div>

                                    {dropdowns[10].isOpen && (
                                        <div className="custom-dropdown-menu">
                                            {options.map((option) => (
                                                <label key={option} className="dropdown-option">
                                                    <input
                                                        type="checkbox"
                                                        checked={dropdowns[10].selected.includes(option)}
                                                        onChange={() => handleCheckboxChangeR(10, option)}
                                                    />{' '}
                                                    {option}
                                                </label>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <button  className="btn btn-outline-success p-1 mb-1">
                           <p className="mb-0" onClick={() => clearAmsamDropdowns([12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24])}>
                            <svg  xmlns="http://www.w3.org/2000/svg" width="16" height="20" fill="currentColor" class="bi bi-arrow-clockwise" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z" />
                            <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466" />
                        </svg> Refresh அம்சம்</p>
                    </button>
                         
                    <div>
                        <div className="row">
                            
                            <div className="col-3 border-box">12.

                                {/* Grid 12. மீனம்*/}
                                <div ref={(el) => (dropdownRefs.current[23] = el)}>
                                    <div
                                        onClick={() => toggleDropdown(23)}
                                        className={`custom-dropdown-toggle ${dropdowns[23].selected.length === 0 ||
                                            dropdowns[23].selected.join(', ').toLowerCase() === 'select'
                                            ? 'select-placeholder'
                                            : ''
                                            }`}
                                    >
                                        {dropdowns[23].selected.length > 0
                                            ? dropdowns[23].selected.join(', ')
                                            : 'Select'}
                                        <span className="dropdown-arrow">{dropdowns[23].isOpen ? '▲' : '▼'}</span>
                                    </div>

                                    {dropdowns[23].isOpen && (
                                        <div className="custom-dropdown-menu">
                                            {options.map((option) => (
                                                <label key={option} className="dropdown-option">
                                                    <input
                                                        type="checkbox"
                                                        checked={dropdowns[23].selected.includes(option)}
                                                        onChange={() => handleCheckboxChangeA(23, option)}
                                                    />{' '}
                                                    {option}
                                                </label>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="col-3 border-box">1.
                                {/* Grid 1. மேஷம்*/}
                                <div ref={(el) => (dropdownRefs.current[12] = el)}>
                                    <div
                                        onClick={() => toggleDropdown(12)}
                                        className={`custom-dropdown-toggle ${dropdowns[12].selected.length === 0 ||
                                            dropdowns[12].selected.join(', ').toLowerCase() === 'select'
                                            ? 'select-placeholder'
                                            : ''
                                            }`}
                                    >
                                        {dropdowns[12].selected.length > 0
                                            ? dropdowns[12].selected.join(', ')
                                            : 'Select'}
                                        <span className="dropdown-arrow">{dropdowns[12].isOpen ? '▲' : '▼'}</span>
                                    </div>

                                    {dropdowns[12].isOpen && (
                                        <div className="custom-dropdown-menu">
                                            {options.map((option) => (
                                                <label key={option} className="dropdown-option">
                                                    <input
                                                        type="checkbox"
                                                        checked={dropdowns[12].selected.includes(option)}
                                                        onChange={() => handleCheckboxChangeA(12, option)}
                                                    />{' '}
                                                    {option}
                                                </label>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="col-3 border-box">2.
                                {/* Grid 2. ரிஷபம்*/}
                                <div ref={(el) => (dropdownRefs.current[13] = el)}>
                                    <div
                                        onClick={() => toggleDropdown(13)}
                                        className={`custom-dropdown-toggle ${dropdowns[13].selected.length === 0 ||
                                            dropdowns[13].selected.join(', ').toLowerCase() === 'select'
                                            ? 'select-placeholder'
                                            : ''
                                            }`}
                                    >
                                        {dropdowns[13].selected.length > 0
                                            ? dropdowns[13].selected.join(', ')
                                            : 'Select'}
                                        <span className="dropdown-arrow">{dropdowns[13].isOpen ? '▲' : '▼'}</span>
                                    </div>

                                    {dropdowns[13].isOpen && (
                                        <div className="custom-dropdown-menu">
                                            {options.map((option) => (
                                                <label key={option} className="dropdown-option">
                                                    <input
                                                        type="checkbox"
                                                        checked={dropdowns[13].selected.includes(option)}
                                                        onChange={() => handleCheckboxChangeA(13, option)}
                                                    />{' '}
                                                    {option}
                                                </label>
                                            ))}
                                        </div>
                                    )}
                                </div>

                            </div>
                            <div className="col-3 border-box">3.
                                {/* Grid 3. மிதுனம்*/}
                                <div ref={(el) => (dropdownRefs.current[14] = el)}>
                                    <div
                                        onClick={() => toggleDropdown(14)}
                                        className={`custom-dropdown-toggle ${dropdowns[14].selected.length === 0 ||
                                            dropdowns[14].selected.join(', ').toLowerCase() === 'select'
                                            ? 'select-placeholder'
                                            : ''
                                            }`}
                                    >
                                        {dropdowns[14].selected.length > 0
                                            ? dropdowns[14].selected.join(', ')
                                            : 'Select'}
                                        <span className="dropdown-arrow">{dropdowns[14].isOpen ? '▲' : '▼'}</span>
                                    </div>

                                    {dropdowns[14].isOpen && (
                                        <div className="custom-dropdown-menu">
                                            {options.map((option) => (
                                                <label key={option} className="dropdown-option">
                                                    <input
                                                        type="checkbox"
                                                        checked={dropdowns[14].selected.includes(option)}
                                                        onChange={() => handleCheckboxChangeA(14, option)}
                                                    />{' '}
                                                    {option}
                                                </label>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-3 border-box">11.
                                {/* Grid 11. கும்பம்*/}
                                <div ref={(el) => (dropdownRefs.current[15] = el)}>
                                    <div
                                        onClick={() => toggleDropdown(15)}
                                        className={`custom-dropdown-toggle ${dropdowns[15].selected.length === 0 ||
                                            dropdowns[15].selected.join(', ').toLowerCase() === 'select'
                                            ? 'select-placeholder'
                                            : ''
                                            }`}
                                    >
                                        {dropdowns[15].selected.length > 0
                                            ? dropdowns[15].selected.join(', ')
                                            : 'Select'}
                                        <span className="dropdown-arrow">{dropdowns[15].isOpen ? '▲' : '▼'}</span>
                                    </div>

                                    {dropdowns[15].isOpen && (
                                        <div className="custom-dropdown-menu">
                                            {options.map((option) => (
                                                <label key={option} className="dropdown-option">
                                                    <input
                                                        type="checkbox"
                                                        checked={dropdowns[15].selected.includes(option)}
                                                        onChange={() => handleCheckboxChangeA(15, option)}
                                                    />{' '}
                                                    {option}
                                                </label>
                                            ))}
                                        </div>
                                    )}
                                </div>



                            </div>
                            <div className="col-6 text-center"><br /><br /><h5><b>அம்சம்</b></h5>
                        </div>
                            <div className="col-3 border-box">4.

                                {/* Grid 4. கடகம்*/}
                                <div ref={(el) => (dropdownRefs.current[16] = el)}>
                                    <div
                                        onClick={() => toggleDropdown(16)}
                                        className={`custom-dropdown-toggle ${dropdowns[16].selected.length === 0 ||
                                            dropdowns[16].selected.join(', ').toLowerCase() === 'select'
                                            ? 'select-placeholder'
                                            : ''
                                            }`}
                                    >
                                        {dropdowns[16].selected.length > 0
                                            ? dropdowns[16].selected.join(', ')
                                            : 'Select'}
                                        <span className="dropdown-arrow">{dropdowns[16].isOpen ? '▲' : '▼'}</span>
                                    </div>

                                    {dropdowns[16].isOpen && (
                                        <div className="custom-dropdown-menu">
                                            {options.map((option) => (
                                                <label key={option} className="dropdown-option">
                                                    <input
                                                        type="checkbox"
                                                        checked={dropdowns[16].selected.includes(option)}
                                                        onChange={() => handleCheckboxChangeA(16, option)}
                                                    />{' '}
                                                    {option}
                                                </label>
                                            ))}
                                        </div>
                                    )}
                                </div>



                            </div>
                        </div>
                        <div className="row">
                            <div className="col-3 border-box">10.

                                {/* Grid 10. மகரம்*/}
                                <div ref={(el) => (dropdownRefs.current[17] = el)}>
                                    <div
                                        onClick={() => toggleDropdown(17)}
                                        className={`custom-dropdown-toggle ${dropdowns[17].selected.length === 0 ||
                                            dropdowns[17].selected.join(', ').toLowerCase() === 'select'
                                            ? 'select-placeholder'
                                            : ''
                                            }`}
                                    >
                                        {dropdowns[17].selected.length > 0
                                            ? dropdowns[17].selected.join(', ')
                                            : 'Select'}
                                        <span className="dropdown-arrow">{dropdowns[17].isOpen ? '▲' : '▼'}</span>
                                    </div>

                                    {dropdowns[17].isOpen && (
                                        <div className="custom-dropdown-menu">
                                            {options.map((option) => (
                                                <label key={option} className="dropdown-option">
                                                    <input
                                                        type="checkbox"
                                                        checked={dropdowns[17].selected.includes(option)}
                                                        onChange={() => handleCheckboxChangeA(17, option)}
                                                    />{' '}
                                                    {option}
                                                </label>
                                            ))}
                                        </div>
                                    )}
                                </div>



                            </div>
                            <div className="col-6"></div>
                            <div className="col-3 border-box">5.


                                {/* Grid 5. சிம்மம்*/}
                                <div ref={(el) => (dropdownRefs.current[18] = el)}>
                                    <div
                                        onClick={() => toggleDropdown(18)}
                                        className={`custom-dropdown-toggle ${dropdowns[18].selected.length === 0 ||
                                            dropdowns[18].selected.join(', ').toLowerCase() === 'select'
                                            ? 'select-placeholder'
                                            : ''
                                            }`}
                                    >
                                        {dropdowns[18].selected.length > 0
                                            ? dropdowns[18].selected.join(', ')
                                            : 'Select'}
                                        <span className="dropdown-arrow">{dropdowns[18].isOpen ? '▲' : '▼'}</span>
                                    </div>

                                    {dropdowns[18].isOpen && (
                                        <div className="custom-dropdown-menu">
                                            {options.map((option) => (
                                                <label key={option} className="dropdown-option">
                                                    <input
                                                        type="checkbox"
                                                        checked={dropdowns[18].selected.includes(option)}
                                                        onChange={() => handleCheckboxChangeA(18, option)}
                                                    />{' '}
                                                    {option}
                                                </label>
                                            ))}
                                        </div>
                                    )}
                                </div>



                            </div>
                        </div>
                        <div className="row">
                            <div className="col-3 border-box">9.


                                {/* Grid 9. தனுசு*/}
                                <div ref={(el) => (dropdownRefs.current[19] = el)}>
                                    <div
                                        onClick={() => toggleDropdown(19)}
                                        className={`custom-dropdown-toggle ${dropdowns[19].selected.length === 0 ||
                                            dropdowns[19].selected.join(', ').toLowerCase() === 'select'
                                            ? 'select-placeholder'
                                            : ''
                                            }`}
                                    >
                                        {dropdowns[19].selected.length > 0
                                            ? dropdowns[19].selected.join(', ')
                                            : 'Select'}
                                        <span className="dropdown-arrow">{dropdowns[19].isOpen ? '▲' : '▼'}</span>
                                    </div>

                                    {dropdowns[19].isOpen && (
                                        <div className="custom-dropdown-menu">
                                            {options.map((option) => (
                                                <label key={option} className="dropdown-option">
                                                    <input
                                                        type="checkbox"
                                                        checked={dropdowns[19].selected.includes(option)}
                                                        onChange={() => handleCheckboxChangeA(19, option)}
                                                    />{' '}
                                                    {option}
                                                </label>
                                            ))}
                                        </div>
                                    )}
                                </div>

                            </div>
                            <div className="col-3 border-box">8.


                                {/* Grid 8. விருச்சிகம்*/}
                                <div ref={(el) => (dropdownRefs.current[20] = el)}>
                                    <div
                                        onClick={() => toggleDropdown(20)}
                                        className={`custom-dropdown-toggle ${dropdowns[20].selected.length === 0 ||
                                            dropdowns[20].selected.join(', ').toLowerCase() === 'select'
                                            ? 'select-placeholder'
                                            : ''
                                            }`}
                                    >
                                        {dropdowns[20].selected.length > 0
                                            ? dropdowns[20].selected.join(', ')
                                            : 'Select'}
                                        <span className="dropdown-arrow">{dropdowns[20].isOpen ? '▲' : '▼'}</span>
                                    </div>

                                    {dropdowns[20].isOpen && (
                                        <div className="custom-dropdown-menu">
                                            {options.map((option) => (
                                                <label key={option} className="dropdown-option">
                                                    <input
                                                        type="checkbox"
                                                        checked={dropdowns[20].selected.includes(option)}
                                                        onChange={() => handleCheckboxChangeA(20, option)}
                                                    />{' '}
                                                    {option}
                                                </label>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="col-3 border-box">7.


                                {/* Grid 7. துலாம்*/}
                                <div ref={(el) => (dropdownRefs.current[21] = el)}>
                                    <div
                                        onClick={() => toggleDropdown(21)}
                                        className={`custom-dropdown-toggle ${dropdowns[21].selected.length === 0 ||
                                            dropdowns[21].selected.join(', ').toLowerCase() === 'select'
                                            ? 'select-placeholder'
                                            : ''
                                            }`}
                                    >
                                        {dropdowns[21].selected.length > 0
                                            ? dropdowns[21].selected.join(', ')
                                            : 'Select'}
                                        <span className="dropdown-arrow">{dropdowns[21].isOpen ? '▲' : '▼'}</span>
                                    </div>

                                    {dropdowns[21].isOpen && (
                                        <div className="custom-dropdown-menu">
                                            {options.map((option) => (
                                                <label key={option} className="dropdown-option">
                                                    <input
                                                        type="checkbox"
                                                        checked={dropdowns[21].selected.includes(option)}
                                                        onChange={() => handleCheckboxChangeA(21, option)}
                                                    />{' '}
                                                    {option}
                                                </label>
                                            ))}
                                        </div>
                                    )}
                                </div>



                            </div>
                            <div className="col-3 border-box">6.


                                {/* Grid 6. கன்னி*/}
                                <div ref={(el) => (dropdownRefs.current[22] = el)}>
                                    <div
                                        onClick={() => toggleDropdown(22)}
                                        className={`custom-dropdown-toggle ${dropdowns[22].selected.length === 0 ||
                                            dropdowns[22].selected.join(', ').toLowerCase() === 'select'
                                            ? 'select-placeholder'
                                            : ''
                                            }`}
                                    >
                                        {dropdowns[22].selected.length > 0
                                            ? dropdowns[22].selected.join(', ')
                                            : 'Select'}
                                        <span className="dropdown-arrow">{dropdowns[22].isOpen ? '▲' : '▼'}</span>
                                    </div>

                                    {dropdowns[22].isOpen && (
                                        <div className="custom-dropdown-menu">
                                            {options.map((option) => (
                                                <label key={option} className="dropdown-option">
                                                    <input
                                                        type="checkbox"
                                                        checked={dropdowns[22].selected.includes(option)}
                                                        onChange={() => handleCheckboxChangeA(22, option)}
                                                    />{' '}
                                                    {option}
                                                </label>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    
            <div className="row mt-3">
                <div className="col-md-4"></div>
                <div className="col-md-8" style={{fontSize:'80%', fontWeight:'50%'}}>
                    <div className="row">
                        <div className="col-md-3">
                            <label>திசை இருப்பு</label>
                            <div className='col-md-10'>
                                <select className={"form-select form-select-sm"} name="dhasa" id="dhasa" onChange={onchange} aria-label=".form-select-sm example">
                                    <option value="">Select</option>
                                    <option value={"சூரியன்"}>சூரியன்</option>
                                    <option value={"சந்திரன் "}>சந்திரன் </option>
                                    <option value={"செவ்வாய்"}>செவ்வாய்</option>
                                    <option value={"புதன் "}>புதன்</option>
                                    <option value={"குரு"}>குரு</option>
                                    <option value={"சுக்ரன் "}>சுக்ரன் </option>
                                    <option value={"சனி"}>சனி</option>
                                    <option value={"இராகு "}>இராகு</option>
                                    <option value={"கேது"}>கேது</option>

                                </select>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <label >வருடம்</label>
                            <div className='col-md-10'>
                                <select className={"form-select form-select-sm"} name="year" id="year" onChange={onchange} aria-label=".form-select-sm example">
                                    <option value="">Select</option>
                                    {
                                       [...Array(20)].map((_, i) => (
                                         <option key={i} value={i}>{i}</option>))
                                     }
                                </select>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <label>மாதம்</label>
                            <div className='col-md-10'>
                                <select className={"form-select form-select-sm"} name="month" onChange={onchange} id="month" aria-label=".form-select-sm example">
                                    <option value="">Select</option>
                                    {
                                        [...Array(13)].map((_, i) => (
                                         <option key={i} value={i}>{i}</option>))
                                    }
                                </select>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <label >நாள்</label>
                            <div className='col-md-10'>
                                <select className={"form-select form-select-sm"} name="day" id="day" onChange={onchange} aria-label=".form-select-sm example">
                                    <option value="">Select</option>
                                    {
                                       [...Array(61)].map((_, i) => (
                                         <option key={i} value={i}>{i}</option>))
                                    }
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
                </div>
             

            <div className="row">
                <div className="button-container mt-3" style={{ justifyContent: 'center' }}>
                    <button onClick={() => constructHoroscope()} className="primarybutton" >Save and close</button>
                    <button
                        // onClick={() => onProfileBackbuttonClick()}
                        className="secondarybutton" onClick={onClickNext}>Skip</button>
                </div>
            </div>
        </div>
        {(profile.isUpdateHoroscopeLoading) && (
            <div className="overlay">
                <div className="loading-spinner"></div>
            </div>
        )}
    </>)

}