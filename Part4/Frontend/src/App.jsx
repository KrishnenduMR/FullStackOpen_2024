import React from 'react'
import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Blog from './components/Blog'
import {Error, Success} from './components/alert'
//import Navbar from './components/Navbar'
//import Footer from './components/Footer'
import Add from './components/Add'
function App() {
  
  const[updateBlog, setupdateBlog] = useState(null);
  const[error, seterror] = useState(null);
  const[success, setsuccess] = useState(null);
  return (
    <>
      {error && <Error message={error} />}
      {success && <Success message={success} />}
      <div className="container mt-4">
        <h1 className="text-center mb-4">Blog Lists</h1>
        <Blog setupdateBlog={setupdateBlog} seterror={seterror} setsuccess={setsuccess} />
        <Add updateBlog={updateBlog} seterror={seterror} setsuccess={setsuccess} />
      </div>
    </>
  )
}

export default App
