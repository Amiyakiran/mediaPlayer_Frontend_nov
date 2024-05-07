import React, { useContext, useEffect, useState } from 'react'
import AddProject from './AddProject'
import EditProject from './EditProject'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { deleteUserProjectApi, userProjectApi } from '../services/allApi'
import { addProjectResponseContext, editProjectResponseContext } from '../context/ContextShare'
import { Link } from 'react-router-dom'


function MyProject() {
  const {addProjectResponse} = useContext(addProjectResponseContext)
  const {editProjectResponse} = useContext(editProjectResponseContext)

  const [userProject, setUserProject] = useState([])

  const getUserProject = async () => {
    const token = sessionStorage.getItem("token")
    const reqHeader = {
      "Content-Type": 'application/json',
      "Authorization": `Bearer ${token}`
    }
    const result = await userProjectApi(reqHeader)
    /* console.log(result.data); */
    if (result.status == 200) {
      setUserProject(result.data)
    } else {
      console.log(result.response.data);
    }

  }
  console.log(userProject);


  const handleDelete = async(id)=>{
    const token = sessionStorage.getItem("token")
    const reqHeader = {
      "Content-Type": 'application/json',
      "Authorization": `Bearer ${token}`
    }  
    const result = await  deleteUserProjectApi(id,reqHeader)
    console.log(result);
    if(result.status==200){
      getUserProject()
    }
    else{
      console.log(result.response.data);
    }
  }

  useEffect(() => {
    getUserProject()
  }, [addProjectResponse,editProjectResponse])

  return (
    <div className='border shadow p-4 rounded'>

      <div className='mt-4 d-flex'>
        <h3 className='text-success'>My Project</h3>
        <div className='ms-auto'>
          <AddProject />
        </div>
      </div>

      <div className='mt-4'>

       {userProject?.length>0?
       userProject?.map((item)=>(
       <div className='border bg-light rounded p-3 d-flex mt-3'>
       <h5>{item.title}</h5>
       <div className='d-flex ms-auto'>
         <EditProject project={item} />
         <button className='btn'> <Link to={item.github} target='_blank'><FontAwesomeIcon icon={faGithub} className='text-success ms-2' /></Link></button>
         <button onClick={()=>handleDelete(item._id)} className='btn'> <FontAwesomeIcon icon={faTrash} className='text-danger ms-2' /></button>
       </div>
     </div>))
        :

        <h5 className='text-warning mt-5'>No Project Added Yet.....</h5>}

      </div>

    </div>
  )
}

export default MyProject