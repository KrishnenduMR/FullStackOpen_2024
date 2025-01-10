import  { lazy, Suspense, useState, useEffect } from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
const Blogs = lazy(() => import("./pages/Blogs"))
const Login = lazy(() => import("./pages/Login"))
const Register = lazy(() => import("./pages/Register"))
const Home = lazy(() => import("./pages/Home"))
const Loading = lazy(() => import("./components/Loading"))

function App() { 

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const token = localStorage.getItem('token');

  const home = () => {
    window.location.href = "/";
  }
  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    window.location.href = "/";
};
  useEffect(() => {
    setIsAuthenticated(!!token);
  } , [token]);

  return (
    <Suspense fallback={<Loading />}>
      <Router>
        {/* navbar */}
        <Button onClick={home} style={{ margin: 20, width:120 }}> Home </Button>
        <Routes>
          <Route path="/" element={<Home logout={logout} isAuthenticated={isAuthenticated} token={token}/>} />
          <Route path="/blogs" element={isAuthenticated ? <Blogs token={token} /> : <Login />} />
          <Route path="/login" element={isAuthenticated ? <Blogs token={token}/> : <Login />}/>
          <Route path="/register" element={isAuthenticated ? <Blogs token={token}/> : <Register />} />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
      </Router>
    </Suspense>
  )
}

export default App