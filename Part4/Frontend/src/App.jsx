import React, { lazy, Suspense } from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';
const BlogList = lazy(() => import("./pages/BlogList"))
const Home = lazy(() => import("./pages/Home"))
const Loading = lazy(() => import("./components/Loading"))

function App() { 
  return (
    <Suspense fallback={<Loading />}>
      <Router>
        {/* navbar */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/bloglist" element={<BlogList />} />
        </Routes>
      </Router>
    </Suspense>
  )
}

export default App