
import './css/App.css'
import Navbar from './components/Navbar'
import Home from './pages/home'
import { Route, Routes } from 'react-router-dom'
import MealDetail from './pages/MealDetails'
import Search from './pages/Search'
import Category from './pages/Category'
import ScrollToTop from './components/ScrollToTop'
import Footer from './components/Footer'


function App() {
  

  return (
    <>
      <ScrollToTop/>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path="/meal/:idMeal" element={<MealDetail />} />
        <Route path="/search" element={<Search />} />
        <Route path="/category/:category" element={<Category />} />
        {/* <Route path="/category/:category" element={<Category />} /> */}
        {/* <Route path="/meal/:id" element={<MealDetail />} /> */}
        {/* <Route path="/search" element={<Search />} /> */}
        {/* <Route path="/category/:category" element={<Category />} /> */}
      </Routes>
      <Footer/>
      {/* <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/meal/:id" element={<MealDetail />} /> */}
    </>
  )
}

export default App
