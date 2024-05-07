import { faStackOverflow } from '@fortawesome/free-brands-svg-icons'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loginApi, registerAPI } from '../services/allApi'
import { logoutResponseContext } from '../context/ContextShare'


function Authentication({ register }) {

  const {authorToken , setAuthorToken }= useContext(logoutResponseContext)

  //state to store data
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: ""
  })
  const navigate = useNavigate()

  console.log(userData);


  const RegisterForm = register ? true : false

  //function to register an user

  const handleRegister = async (e) => {
    //inorder to prevent the data Lost
    e.preventDefault()
    const { username, email, password } = userData

    if (!username || !email || !password) {
      toast.info('please fill the form completely')
    }
    else {
      //api call
      const result = await registerAPI(userData)
      console.log(result);
      if (result.status == 200) {
        toast.success('Registration successfull')
        setUserData({
          username: "",
          email: "",
          password: ""
        })
        navigate('/login')
      }
      else{
        toast.error(result.response.data)
      }
    }
  }

  //function to login

  const handlelogin = async(e)=>{
    e.preventDefault()

    const {email, password} = userData

    if(!email || !password){
      toast.info('Please fill the form completely')
    }else{
      const result = await loginApi(userData)
      console.log(result);
      if(result.status==200){
        //adding data to session storage
        sessionStorage.setItem("existingUser",JSON.stringify(result.data.existingUser
        ))
        sessionStorage.setItem("token", result.data.token)
        
        toast.success('Login successfull')
        setAuthorToken(true)
        setUserData({
          username: "",
          email: "",
          password: ""
        })
        setTimeout(()=>{
          navigate('/')
        },2000)
      }
    }

  }



  return (
    <>
      <div className='w-100 d-flex justify-content-center align-items-center' style={{ height: '100vh' }}>

        <div className='w-75 '>
          <Link to={'/'} style={{ textDecoration: 'none', color: 'blue' }}> <h5 className='mb-3'><FontAwesomeIcon className='me-3' icon={faArrowLeft} />Back to Home</h5></Link>
          <div className=' p-md-5 rounded text-light shadow' style={{ backgroundColor: 'green' }}>
            <div className="row align-items-center">
              <div className="col-md-6">
                <img src="https://www.pngkey.com/png/full/367-3670351_access-login-icon.png" alt="login images" className='w-100 p-4' />
              </div>
              <div className="col-md-6 d-flex justify-content-center align-items-center flex-column p-md-3">
                <h2><FontAwesomeIcon icon={faStackOverflow} className='me-3 fs-1' />Project Fair</h2>

                <h5 className='mt-3'>
                  {
                    RegisterForm ? 'Sign Up to Your Account' : 'Sign In to Your Account'
                  }
                </h5>

                <form className='mt-3 w-100 p-3 p-md-5'>
                  {RegisterForm && <input type="text" placeholder='Enter Username' value={userData.username} className='form-control ' onChange={(e) => setUserData({ ...userData, username: e.target.value })} />}
                  <input type="text" value={userData.email} placeholder='Enter Email Id' className='form-control mt-3' onChange={(e) => setUserData({ ...userData, email: e.target.value })} />
                  <input type="text" value={userData.password} placeholder='Enter Password' className='form-control mt-3' onChange={(e) => setUserData({ ...userData, password: e.target.value })} />

                  {RegisterForm ?
                    <div>
                      <button onClick={handleRegister} className='btn btn-warning mt-4 w-100'>Register</button>
                      <p className='mt-2'>Already a User? click Here to <Link to={'/login'} style={{ color: 'red' }}>Login</Link></p>
                    </div> :
                    <div>
                      <button onClick={handlelogin} className='btn btn-warning mt-4 w-100'>Login</button>
                      <p className='mt-2'>New User? click Here to <Link to={'/register'} style={{ color: 'red' }}> Register</Link></p>
                    </div>
                  }
                </form>
              </div>
            </div>
          </div>

        </div>
      </div>
      <ToastContainer theme='colored' position='top-center' autoClose={2000} />
    </>
  )
}

export default Authentication