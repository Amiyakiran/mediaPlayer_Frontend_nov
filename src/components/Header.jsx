import { faStackOverflow } from '@fortawesome/free-brands-svg-icons';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext } from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { logoutResponseContext } from '../context/ContextShare';




function Header() {
  const {authorToken , setAuthorToken} = useContext(logoutResponseContext)

  const navigate = useNavigate()

  const handleLogout = ()=>{
    sessionStorage.removeItem("existingUser")
    sessionStorage.removeItem("token")
    setAuthorToken(false)
    navigate('/')

  }
  return (
    <Navbar style={{backgroundColor:'green'}}>
    <Container>
      <Link to={'/'} style={{textDecoration:'none'}}>
        <Navbar.Brand className='text-light fs-3 w-100'>
        <FontAwesomeIcon icon={faStackOverflow} />{' '}
         Project Fair
        </Navbar.Brand>
        
      </Link>
      <button onClick={handleLogout} className='btn btn-warning ms-auto'>LogOut <FontAwesomeIcon icon={faPowerOff} /></button>
    </Container>
  </Navbar>
  )
}

export default Header