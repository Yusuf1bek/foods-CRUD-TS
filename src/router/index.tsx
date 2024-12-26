import { Route, Routes } from 'react-router-dom'
import Layout from '../pages/Layout'
import Home from '../pages/Home'
import About from '../pages/About'

const Router = () => {
  return (
    <>
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route path='/' element={<Home/>}/>
                <Route path='/about' element={<About/>}/>
            </Route>
        </Routes>
    </>
  )
}

export default Router