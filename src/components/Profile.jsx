import { faAngleUp, faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { Collapse } from 'react-bootstrap'
import { BASE_URL } from '../services/baseUrl';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { updateProfileApi } from '../services/allApi';


function Profile() {

    const [open, setOpen] = useState(false);
    const [existingImage, setExistingImage]= useState("")
    const [ preview , setPreview] = useState("")
    const [update, setUpdate] = useState(false)

    const [userProfile, setUserProfile] = useState({
        username:"",
        emailid:"",
        password:"",
        github:"",
        linkedin:"",
        profile:""
    })
  console.log(userProfile);


    useEffect(()=>{
       const user = JSON.parse(sessionStorage.getItem('existingUser'))
       setUserProfile({...userProfile, username:user.username,emailid:user.mailId,password:user.password,github:user.github,linkedin:user.linkedIn})

       //if there is any uploaded image
       setExistingImage(user.profile)

    },[update])

    useEffect(()=>{
        userProfile.profile &&
        setPreview(URL.createObjectURL(userProfile.profile))//to convert the file into url.

    },[userProfile.profile])

    console.log(preview)

    const handleUpdate = async(e)=>{
     e.preventDefault()


     const {username,emailid,password,github,linkedin,profile} = userProfile

      if(!github || !linkedin){
       toast.info('Please fill the form completely')
      }
      else{
        const reqBody = new FormData()
        //To add data to the body - use append() - can add only one item at a time
        reqBody.append("username",username)
        reqBody.append("emailid",emailid)
        reqBody.append("password",password)
        reqBody.append("github",github)
        reqBody.append("linkedin",linkedin)
        preview?reqBody.append("profile",profile):reqBody.append("profile",existingImage)
    
       const token = sessionStorage.getItem("token")

       if(preview){
        //uploaded content
        const reqHeader = {
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${token}` //bearer - no other credential/document is  requried to verify the request holder
          }
          const result = await updateProfileApi(reqBody,reqHeader)
          console.log(result);
          if(result.status==200){
            toast.success('profile updated successfully')
            setUpdate(true)
            sessionStorage.setItem("existingUser",JSON.stringify(result.data))
          }
       }
       else{
        const reqHeader = {
            "Content-Type": 'application/json',
            "Authorization": `Bearer ${token}`
          }
          const result = await updateProfileApi(reqBody,reqHeader)
          if(result.status==200){
            toast.success('profile updated successfully')
            setUpdate(true)
            sessionStorage.setItem("existingUser",JSON.stringify(result.data))
          }
       }
    }
    }

  return (
    <div className='border p-4 rounded shadow' onMouseEnter={()=>setOpen(true)} >

        <div className='d-flex justify-content-between'>
            <h3>Profile</h3>
            <button   onClick={() => setOpen(!open)}  className='btn btn-outline-info'>{open?<FontAwesomeIcon icon={faAngleUp} />:<FontAwesomeIcon icon={faChevronDown} />}</button>
        </div>
       <Collapse in={open}>
            <div className="row p-3 text-center mt-4">
                <label htmlFor="profile">
                    <input id='profile' type="file" style={{display:'none'}} onChange={(e)=>setUserProfile({...userProfile, profile:e.target.files[0]})} />
                   {existingImage ==""?
                    <img src={preview?preview:'https://www.kindpng.com/picc/m/357-3575561_girl-young-beautiful-people-female-person-woman-user.png'} alt="profile" style={{width:'200px', height:'200px', borderRadius:'50%'}}/> :
                    <img src={preview?preview:`${BASE_URL}/uploads/${existingImage}`} alt="profile" style={{width:'200px', height:'200px', borderRadius:'50%'}}/>
                
                }

                </label>
    
                <div className="mb-3 mt-5">
                    <input type="text" value={userProfile.github} onChange={(e)=>setUserProfile({...userProfile,github:e.target.value})} placeholder='GitHub' className='form-control' />
                </div>
                <div className="mb-3">
                <input type="text" value={userProfile.linkedin} onChange={(e)=>setUserProfile({...userProfile,linkedin:e.target.value})} placeholder='LinkedIn' className='form-control' />
                </div>
                <div className="mb-3">
               <button onClick={(e)=>handleUpdate(e)} className='btn w-100' style={{backgroundColor:'green', color:'white'}}>Update</button>
                </div>
    
    
            </div>
       </Collapse>
       <ToastContainer theme='colored' position='top-center' autoClose={2000} />
    </div>
  )
}

export default Profile