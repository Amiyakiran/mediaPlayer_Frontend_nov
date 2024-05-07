import React from 'react'
import { createContext } from 'react'
import { useState } from 'react'



//context to add project
export const addProjectResponseContext = createContext()
export const editProjectResponseContext = createContext()
export const logoutResponseContext = createContext()


function ContextShare({children}) {
    //children is a predefined  props used to share data between the components

    const [addProjectResponse, setAddProjectResponse] = useState({})

    const [editProjectResponse, setEditProjectResponse] = useState({})

    const [authorToken , setAuthorToken] = useState(true)

  return (
    <>
     <addProjectResponseContext.Provider value={{addProjectResponse, setAddProjectResponse}}>
       <editProjectResponseContext.Provider value={{editProjectResponse, setEditProjectResponse}}> 
        <logoutResponseContext.Provider value={{authorToken , setAuthorToken}}>
          {children}
          </logoutResponseContext.Provider>
        </editProjectResponseContext.Provider>
     </addProjectResponseContext.Provider>
    
    </>
  )
}

export default ContextShare