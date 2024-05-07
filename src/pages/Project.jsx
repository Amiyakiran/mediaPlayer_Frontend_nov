import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { Col, Row } from 'react-bootstrap'
import ProjectCard from '../components/ProjectCard'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { allProjectApi } from '../services/allApi'


function Project() {
   const [isToken, setIsToken] = useState(false)
   const [allproject, setAllProject] = useState([])
   const [searchKey, setSearchKey] = useState("")


   const getAllProject = async()=>{
      if(sessionStorage.getItem("token")){
         const token = sessionStorage.getItem("token")

         const reqHeader = {
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`
         }

         const result = await allProjectApi(searchKey,reqHeader)
         /* console.log(result); */
         if(result.status==200){
            setAllProject(result.data)
         }
         else{
            console.log(result.response.data);
         }
      }

   }


  /*  console.log(allproject); */
   console.log(searchKey);

   useEffect(()=>{
       getAllProject()
   },[searchKey])

   useEffect(() => {
      if (sessionStorage.getItem("token")) {
         setIsToken(true)
      }
   }, [])
   return (
      <>
         <Header />

         <h2 className='mt-5 mb-3 text-center'>All Project</h2>

        {isToken?
         <div className='d-flex justify-content-center align-items-center flex-column w-100'>

            <div className='row  w-100 '>

               <div className="col-md-4"></div>
               <div className="col-md-4 d-flex justify-content-center align-items-center p-4">
                  <input onChange={(e)=>setSearchKey(e.target.value)} type="text" className='form-control mt-4 mb-5' placeholder='Search by Technologies' />
                  <FontAwesomeIcon icon={faMagnifyingGlass} style={{ marginLeft: '-35px', marginTop: '-20px', color: 'lightgrey' }} />
               </div>
               <div className="col-md-4"></div>

            </div>
            <Row className='container-fluid mb-5'>
              {allproject?.length>0?
              allproject?.map(item=>(
               <Col sm={12} md={6} lg={4} >
              <ProjectCard pro ={item}/> 
            </Col>
              ))
              : 
               <p>no projects</p>
               }
            </Row>
         </div>

     :
         <div className='d-flex justify-content-center align-items-center flex-column mb-5 mt-5'>
            <img src="https://cdn.pixabay.com/animation/2023/06/13/15/12/15-12-30-710_512.gif" alt="lock image" style={{ width: '200px' }} />

            <h3 className='text-danger mt-5'>Please <span className='text-success'>Login</span> to See More Project</h3>

         </div>
         }



      </>
   )
}

export default Project