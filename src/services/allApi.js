import { BASE_URL } from "./baseUrl"
import { commonAPI } from "./commonApi"


//request to register an user
export const registerAPI = async(reqBody)=>{
   return  await commonAPI('POST',`${BASE_URL}/user/register`,reqBody,"")
}


//request to login

export const loginApi = async(reqBody)=>{
   return await commonAPI('POST', `${BASE_URL}/user/login`,reqBody,"")
}

//request to add project

export const addProjectApi = async(reqBody,reqHeader)=>{
   return await commonAPI('POST',`${BASE_URL}/add-project`,reqBody,reqHeader)
}


//request to get home project

export const HomeProjectApi = async()=>{
   return await commonAPI('GET',`${BASE_URL}/home-project`,"","")
}

//request to get all project

//query parameter = path?key=value
//https://www.google.com/search?q=india

export const allProjectApi = async(searchKey,reqHeader)=>{
   return await commonAPI('GET',`${BASE_URL}/all-project?search=${searchKey}`,"",reqHeader)
}


//request to get user project

export const userProjectApi = async(reqHeader)=>{
   return await commonAPI('GET',`${BASE_URL}/user/all-project`,"",reqHeader)
}

//request to delete userProject
export const deleteUserProjectApi = async(id,reqHeader)=>{
   return await commonAPI('DELETE',`${BASE_URL}/user-project/delete/${id}`,{},reqHeader)
}

//request to edit the user project

export const editUserProject = async(projectId,reqBody,reqHeader)=>{
   return await commonAPI('PUT',`${BASE_URL}/project/edit/${projectId}`,reqBody,reqHeader)
}

//request to update userProfile
export const updateProfileApi = async(reqBody,reqHeader)=>{
   return await commonAPI('PUT',`${BASE_URL}/profile-update`,reqBody,reqHeader)
}