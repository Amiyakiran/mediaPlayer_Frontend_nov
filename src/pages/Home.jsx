import { faStackOverflow } from '@fortawesome/free-brands-svg-icons'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import titleImage from '../assets/designer.svg'
import ProjectCard from '../components/ProjectCard'
import { Link } from 'react-router-dom'
import { HomeProjectApi } from '../services/allApi'


function Home() {
  const [islogin, setIsLogin] = useState(false)
  const [project, setProject]= useState([])

  useEffect(()=>{
     if(sessionStorage.getItem("token")){
      setIsLogin(true)
     }
  },[])

  const gethomeProject = async()=>{
    const result = await HomeProjectApi()
    setProject(result.data)

  }
  console.log(project);

  useEffect(()=>{
     gethomeProject()
  },[])
  return (
   <>
      <div style={{width:'100%', height:'100vh',backgroundColor:'green'}}>
          <div className="container-fluid rounded">
              <Row className='align-items-center p-5 text-light'>
                <Col sm={12} md={6}>
                  <h1><FontAwesomeIcon icon={faStackOverflow} className='me-2' />Project Fair</h1>
  
                  <p className='mt-5'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit incidunt amet doloribus minus soluta itaque</p>
                 {islogin? <Link to={'/dashboard'}> <button className='btn btn-warning mt-3'>Manage Project <FontAwesomeIcon icon={faArrowRight} /></button></Link>
                    :
                 <Link to={'/login'}> <button className='btn btn-warning mt-3'>Get start <FontAwesomeIcon icon={faArrowRight} /></button></Link>}
                </Col>
                <Col sm={12} md={6}>
                    <img src={titleImage} alt="image" className='w-75' style={{marginTop:'100px'}} />
                </Col>
              </Row>
          </div>
      </div>
      
      <div className='mt-5'>
       <h1 className='text-center'>Explore Our Project</h1>

     <marquee scrollAmount={20}>

        <div className='d-flex mt-5 mb-5'>
         { project?.length>0? 
         <div className="row">
           
          {project.map((item)=>( <div className="col-md-4"><ProjectCard pro={item} /></div>)) }
            
           
          </div>:null
           }
      
    
        </div>
  
     </marquee>
     <div className='text-center mb-5'> 
     <Link to={'/project'} >See More Project</Link>
     </div>

      </div>
      
   </>
  )
}

export default Home