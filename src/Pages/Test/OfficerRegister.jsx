// import { useState,useEffect} from "react";
// import { useDispatch ,useSelector} from "react-redux";
// import{officerregister,resetOfficerRegister,getallofficer} from'../../Features/Slices/officerSlice'
// import { toast } from "react-toastify";
// import { useNavigate} from 'react-router-dom'
// import maleavatar from '../../img/Male_avatar.svg'


// export function OfficerRegister(){
// const dispatch=useDispatch()
// const navigate=useNavigate()

// const[formData,setFormData]=useState({
//     name:'',
//     branch:'',
//     age:'',
//     gender:'',
//     nationality:''
// })    
// const{name,branch,age,gender,nationality}=formData

// const onchange=(e)=>{
//     setFormData((prevState)=>({
//         ...prevState,
//         [e.target.name]:e.target.value
//     }))
//    }

//    const {isOfficerRegisterSuccess,OfficerRegisterMessage,isOfficerRegisterLoading,isOfficerRegisterError,officerlist}=
//    useSelector((state)=>state.officer)

//    useEffect(()=>{
//     if(isOfficerRegisterSuccess){
//     toast.success(OfficerRegisterMessage)
//     dispatch(resetOfficerRegister())
//     }

//     if(isOfficerRegisterLoading== false && isOfficerRegisterSuccess==false)
//      dispatch(getallofficer())

//     },[isOfficerRegisterSuccess,OfficerRegisterMessage,isOfficerRegisterLoading,isOfficerRegisterError,officerlist],dispatch)

//    const onsubmit=(e)=>{
//     e.preventDefault();

// const officerDatasubmit={name,branch,age,gender,nationality}
// console.log(officerDatasubmit)
// dispatch(officerregister(officerDatasubmit))
// }
// const cardstyle={
//     width:"18rem"
// };
// const onOfficerClick = (id) => {
//     navigate('/EditOfficer?id='+ id, { replace: true });
// }



// return(<>

//     <center><h2>  INDIAN ARMY REGISTRATION...!!!  </h2><br /></center>
 
//            {/* <center> <h5>Jai Hindhu...</h5> </center> */}
//            <form onSubmit={onsubmit}>
//   <div className="row">
//     <div className="form-group col-6">
//         <label  htmlFor="name">Name</label>
//         <input className="form-control" type="text"  name="name" id="id" onChange={onchange}/>
//     </div>
//     <div className="form-group col-6" >
//         <label htmlFor="branch">Branch</label>
//         <select className="form-control" name="branch" id="branch" onChange={onchange}>
//             <option value="select">select</option>
//             <option value="BSF">BSF</option>
//             <option value="CRPF">CRPF</option>
//             <option value="Coast Guard">Coast Guard</option>
//             <option value="Space Force">Space Force</option>
//             <option value="National Guard">National Guard</option>
//         </select>
//     </div>
//   </div>
//   <div className="row">
//     <div className="form-group col-6">
//         <label htmlFor="age">Age</label><br />
//         <select className="form-control" name="age" id="age" onChange={onchange}>
//             <option value="select">select</option>
//             <option value="18">18</option>
//             <option value="19">19</option>
//             <option value="20">20</option>
//             <option value="21">21</option>
//             <option value="22">22</option>
//             <option value="23">23</option>
//             <option value="24">24</option>
//             <option value="25">25</option>
//             <option value="26">26</option>
//             <option value="27">27</option>
//         </select>
//     </div>

//     <div className="form-group col-6">
//         <label htmlFor="gender">Gender</label>
//         <select  className="form-control" name="gender" id="gender" onChange={onchange}>
//             <option value="select">select</option>
//             <option value="male">Male</option>
//             <option value="female">Female</option>
//         </select>
//     </div>

//     <div className="form-group col-12">
//        <label htmlFor="nationality">Nationality</label>
//      <input type="text"  className="form-control" name="nationality" id="nationality" onChange={onchange}/>
//     </div>
//   </div>
  
  

//    <button type="sumbit" className="btn btn-success">Apply</button>
// </form>

// <br />

// <br />



// <div>
// <h2>Officers List</h2>
//     <div className="container py-0">
//     <div className="container py-0">  
//      <div className="row row-cols-1 row-cols-md-4 py-3 ">
//         {officerlist.map((officer,index)=>(
//             <div key={index}  className="col">
    
//                 <div className="card" style={cardstyle}>
//                 <img src={maleavatar} className="card-img-top" alt="..."></img><br />
//                 <div className="card-body">
//                     <center><a href="#" onClick={()=>onOfficerClick(officer._id)} ><h5 className="card-title">{officer.name}</h5></a></center>
//                </div>

//      <ul className="list-group list-group-flush">
//         <center>
//      <li className="list-group-item">Branch : {officer.branch}</li>
//      <li className="list-group-item">Nationality : {officer.nationality}</li></center>
//      </ul>
        
//                 </div>
//             </div>
//         ))}

//         </div>
//     </div>
//     </div>
//  </div>


 
// </>)}

