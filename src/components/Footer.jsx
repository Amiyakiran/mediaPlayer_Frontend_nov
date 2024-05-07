import { faFacebookF, faInstagram, faLinkedinIn, faStackOverflow, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from 'react-router-dom'


function Footer() {
  return (
    <>
     <div className="row p-5 text-light" style={{backgroundColor:'green'}}>
        <div className="col-md-4">
            <h3><FontAwesomeIcon icon={faStackOverflow} className='me-2' />Project Fair</h3>
            <p className='mt-4'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore magni alias ipsam possimus quis, ullam fugiat nostrum exercitationem! Tenetur nam repellat provident debitis. Quam reiciendis, officia eveniet doloribus rem nihil!</p>
        </div>
        <div className="col-md-1"></div>
        <div className="col-md-2 ">
            <h3>Links</h3>
            <Link to={'/'} style={{textDecoration:'none',color:'white'}}><h6 className='mt-4'>Home</h6></Link>
            <h6>Login</h6>
            <h6>Register</h6>
        </div>
        <div className="col-md-2">
            <h3>Guides</h3>
            <h6 className='mt-4'>React</h6>
            <h6>React Bootstrap</h6>
            <h6>Bootswatch</h6>
        </div>
        <div className="col-md-3">
            <h3>Contact Us</h3>
            <div className='d-flex mt-4'>
                <input type="text" className='form-control' placeholder='Enter Mail Id' />
                <button className='btn btn-warning ms-3'>Subscribe</button>
            </div>
            <div className='mt-4 d-flex justify-content-between'>
            <FontAwesomeIcon icon={faInstagram} size='2xl' />
            <FontAwesomeIcon icon={faLinkedinIn} size='2xl' />
            <FontAwesomeIcon icon={faTwitter} size='2xl' />
            <FontAwesomeIcon icon={faFacebookF} size='2xl' />
            </div>
        </div>
     </div>
    </>
   
  )
}

export default Footer