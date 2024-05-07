import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Project from './pages/Project'
import Dashboard from './pages/Dashboard'
import Footer from './components/Footer'
import Authentication from './components/Authentication'
import { useContext } from 'react'
import { logoutResponseContext } from './context/ContextShare'

function App() {

  const {authorToken , setAuthorToken} = useContext(logoutResponseContext)
 

  return (
    <>
      <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/project' element={<Project/>}/>
          <Route path='/dashboard' element={authorToken?<Dashboard/>:<Home/>} />
          <Route path='/login' element={<Authentication/>} />
          <Route path='/register' element={<Authentication register />}/>
      </Routes>
      <Footer/>
    </>
  )
}

export default App
