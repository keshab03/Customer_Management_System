import React from "react"
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Footer from "./Footer/Footer"
import Edit from "./Edit/Edit"
import Coustomerlist from "./Coustomer_List/Coustomerlist"
import Addcoustomer from "./Add_Coustomer/Addcoustomer"
import Home from "./Home/Home"
const App=()=>
{   
    return(
        <div>
            <BrowserRouter>
            <Home/>
            <Routes>
                <Route path='/customerlist'element={<Coustomerlist/>}/>
                <Route path='/addcoustomer'element={<Addcoustomer/>}/>  
                <Route path='/edit/:index' element={<Edit/>}/>
            </Routes>            
              <Footer/>
            </BrowserRouter>
        </div>
    )
}
export default App