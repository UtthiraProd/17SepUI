import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { getPUprofileById, getallMatName, getallBrokerName,PUProfileImageUrl } from "../../Features/Slices/adminBrokerSlice";
import { getAllDistricts } from "../../Features/Slices/profSlice"
import { toast } from "react-toastify";
import maleavatar from '../../img/Male_avatar.svg'
import { Carousal } from "../Common/Carousal"



export function PUprofileDetails() {
  const [searchParams] = useSearchParams()
  const profileID = searchParams.get('id')
  const [currentImageUrl, setCurrentImageUrl] = useState('')
  const pageIndex = searchParams.get('pageIndex')
  const pageStartIndex= searchParams.get('pageStartIndex')
 

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formdata, setFormData] = useState({
    matrimonyName: '',
    name: '',
  })

  // const { matrimonyName, name } = formdata;

  const {
    isDistrictListLoading, isDistrictListSuccess, isgetallMatNameLoading,
    isgetallMatNameSuccess } = useSelector((state) => state.prof)

  const { isgetPUprofileDetailLoading, isgetPUprofileDetailSuccess, PUprofileDetail, MatName,
          BrokerName, isgetallBrokerNameLoading, isgetallBrokerNameSuccess, ImageUrl, isPUProfileImageUrlSuccess,
          isPUProfileImageUrlLoading} = useSelector((state) => state.admin)

  useEffect(() => {
    if (isgetPUprofileDetailLoading == false && isgetPUprofileDetailSuccess == false) {
      dispatch(getPUprofileById(profileID))
    }
    if (!isDistrictListLoading && !isDistrictListSuccess) {
      dispatch(getAllDistricts())
    }
    if (!isgetallMatNameLoading && !isgetallMatNameSuccess) {
      dispatch(getallMatName())
    }
    if (isgetallBrokerNameLoading == false && isgetallBrokerNameSuccess == false) {
      dispatch(getallBrokerName())
    }
  }, [dispatch])

  useEffect(() => {
    dispatch(PUProfileImageUrl({ profileID }));
  }, [profileID])

    const onSearchchange = (e) => {
    const { name, value } = e.target;

    let selected;
    if (name === 'name') {
      // User selected a broker name (value = broker._id)
      selected = BrokerName.find(broker => broker._id === value);
    }
    if (name === 'matrimonyName') {
      // User selected a matrimony name (value = broker._id)
      selected = BrokerName.find(broker => broker.matrimonyName === value);
    }
    if (selected) {
      setFormData({
        name: selected._id,
        matrimonyName: selected.matrimonyName
      });
    }
  };

  const onResetClick = () => {
    setFormData({
      matrimonyName: '',
      name: ''
    })
  }

  const handleImageChange = (imageUrl) => {
  setCurrentImageUrl(imageUrl);
  };

  const GoBack = () => {
    navigate('/PublicUserProfileList?id='+"&pageIndex="+ pageIndex +"&pageStartIndex="+pageStartIndex)
  }

  const Reject= () =>{
    navigate ('/PublicUserProfileList?id='+"&pageIndex="+ pageIndex +"&pageStartIndex="+pageStartIndex)
  }

  const onClickSubmit = () => {
    if( !formdata.name || !formdata.matrimonyName){
      toast.error('Please enter both Broker Name & Matrimony Name.')
      return;
    }
      navigate('/PUBrokerDetails?id=' + formdata.name + "&profileID=" +profileID +"&pageIndex="+ pageIndex +"&pageStartIndex="+pageStartIndex)
  }


  return (<>

    <div onClick={GoBack} >
      <Link className="dropdown-item d-flex align-items-center"  >
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#1aa179" className="bi bi-arrow-left-circle" viewBox="0 0 16 16">
          <path fillRule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z" />
        </svg><p className="mb-0 ms-2" >Go Back</p></Link></div>
    <br />
    <p className="h3">User Details</p><br />
    <div className="row">

      <div className="col-8">
    <div className="row">
    
      <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Name</label>
      <div className="col-8">
        <label className="form-control-plaintext">: {PUprofileDetail?.name}</label>
      </div>
    </div>

    <div className="row">
      <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Gender</label>
      <div className="col-8">
        <label className="form-control-plaintext">: {PUprofileDetail?.sex}</label>
      </div>
    </div>

    <div className="row">
      <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Marital Status</label>
      <div className="col-8">
        <label className="form-control-plaintext">: {PUprofileDetail?.maritalstatus}</label>
      </div>
    </div>

    <div className="row">
      <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Date of Birth</label>
      <div className="col-8">
        <label className="form-control-plaintext">: {PUprofileDetail?.DOB?.split('T')[0]}</label>
      </div>
    </div>

    <div className="row">
      <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Father Name</label>
      <div className="col-8">
        <label className="form-control-plaintext">: {PUprofileDetail?.fatherName}</label>
      </div>
    </div>

    <div className="row">
      <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Mother Name</label>
      <div className="col-8">
        <label className="form-control-plaintext">: {PUprofileDetail?.motherName}</label>
      </div>
    </div>

    <div className="row">
      <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Mother tongue</label>
      <div className="col-8">
        <label className="form-control-plaintext">: {PUprofileDetail?.mothertongue}</label>
      </div>
    </div>

    <div className="row">
      <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Religion</label>
      <div className="col-8">
        <label className="form-control-plaintext">: {PUprofileDetail?.religion}</label>
      </div>
    </div>

    <div className="row">
      <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Caste</label>
      <div className="col-8">
        <label className="form-control-plaintext">: {PUprofileDetail?.caste}</label>
      </div>
    </div>

    <div className="row">
      <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Qualification</label>
      <div className="col-8">
        <label className="form-control-plaintext">: {PUprofileDetail?.qualification}</label>
      </div>
    </div>

    <div className="row">
      <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Job Title</label>
      <div className="col-8">
        <label className="form-control-plaintext">: {PUprofileDetail?.job}</label>
      </div>
    </div>

    <div className="row">
      <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Job Description</label>
      <div className="col-8">
        <label className="form-control-plaintext">: {PUprofileDetail?.jobDescription}</label>
      </div>
    </div>

    <div className="row">
      <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">Address</label>
      <div className="col-8">
        <label className="form-control-plaintext">: {PUprofileDetail?.address1}</label>
      </div>
    </div>

    <div className="row">
      <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">District</label>
      <div className="col-8">
        <label className="form-control-plaintext">: {PUprofileDetail?.district}</label>
      </div>
    </div>

    <div className="row">
      <label style={{ fontWeight: 'bold' }} className="col-4 col-form-label">State</label>
      <div className="col-8">
        <label className="form-control-plaintext">: {PUprofileDetail?.state}</label>
      </div>
    </div>
    </div>
    

    {/* <div className="col-4">
      <img   src={ImageUrl}
      onError={(e) => {
        e.target.onerror = null;
        e.target.src = maleavatar;
      }} style={{ width: 450 }} className=" rounded- " alt="profile" />
    </div> */}

<div className="col-4">
                {isPUProfileImageUrlSuccess && !isPUProfileImageUrlLoading && (
                  ImageUrl && ImageUrl.length > 0 ? (
                    <div>
                      <Carousal imageUrls={ImageUrl} onImageChange={handleImageChange} />
                      {/* <ShareImageToWhatsApp imageUrl={currentImageUrl} /> */}
                    </div>
                  ) : (
                    <div>
                      <Link className="dropdown-item">
                        <br /><br /><br />
                        <p>
                          <span style={{ fontWeight: 'bold', color: '#ff5722' }}>Image</span> not available.
                          <span
                            style={{ cursor: 'pointer', color: '#1aa179', display: 'inline-flex', alignItems: 'center', marginLeft: '8px' }}
                          >
                          </span>
                        </p>
                      </Link>
                    </div>
                  )
                )}
                 </div>

</div>
    <div className="row mt-5">
       <button type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight" style={{ width: 250 }} className="btn ms-md-2 mt-2 btn-outline-success " >Assign</button>
       <button type="submit" style={{ width: 250 }} className="btn btn-outline-danger ms-md-2 mt-2 rounded-2" onClick={Reject}>Reject</button>
    </div>

    <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
      <div class="offcanvas-header">
        <h5 className="mt-5" id="offcanvasRightLabel">Broker Details</h5>
        <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div class="offcanvas-body">

        <label htmlFor="">Broker Name</label><br />
        <select onChange={onSearchchange} className="form-control border border-success" value={formdata.name} name="name" id="name" aria-label=".form-select-sm example">
          <option value="">Select</option>
          {((BrokerName != null && BrokerName.length > 0) &&

            BrokerName.map((name) => (
              <option key={name._id} value={name._id}>{name.name}</option>
            ))
          )}
        </select><br />

        <label htmlFor="">Matrimony Name</label><br />
        <select onChange={onSearchchange} className="form-control border border-success" value={formdata.matrimonyName} name="matrimonyName" id="matrimonyName" aria-label=".form-select-sm example">
          <option value="">Select</option>
          {((BrokerName != null && BrokerName.length > 0) &&

            BrokerName.map((matrimonyName) => (
              <option key={matrimonyName._id} value={matrimonyName.matrimonyName}>{matrimonyName.matrimonyName}</option>
            ))
          )}
        </select><br />
      </div>

        <button type="submit" className="btn btn-outline-success" data-bs-dismiss="offcanvas" style={{ width: 200, marginBottom: 10, marginLeft: 100 }} onClick={() => onClickSubmit()} >Submit</button>
        <button type="submit" className="btn btn-outline-success" style={{ width: 200, marginBottom: 80, marginLeft: 100 }} onClick={onResetClick}>Reset</button>
    </div>
  </>)
}