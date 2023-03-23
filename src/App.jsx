import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { Navbar, Home, Cats, Dogs, PetInfo, Footer } from './components/index'
import styles from './style'

function App() {

  return (
    <div className={`overflow-hidden bg-gray-900 font-poppins text-white ${styles.paddingX}`}>
      <BrowserRouter>
        <Routes>
            Hello React
            <Route path='/' element={<><Navbar /> <Outlet/></>}>
              <Route index element={<><Home /> <Footer /></>}/>
              <Route path="cats" element={<><Cats /> <Footer /></>}/>
              <Route path="cats/:id" element={<><PetInfo /> <Footer /></>} />
              <Route path="dogs" element={<><Dogs /> <Footer /></>}/>
              <Route path="dogs/:id" element={<><PetInfo /> <Footer /></>} />
            </Route> 
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
