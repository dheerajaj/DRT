import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './component/pages/Home'
import Register from './component/pages/Register'
import { ToastContainer} from 'react-toastify';
import DashboardPage from './component/pages/DashboardPage'
import ReportSubmissionForm from './component/pages/ReportSubmissionForm'
import ReportListPage from './/component/pages/ReportListPage'
import ContactUs from './component/pages/ContactUs'



function App() {

  return (
    <div>
      <ToastContainer position='top-right' />

      <BrowserRouter>
                    <Routes>
                            <Route index element={<Home />} />
                            <Route path='/login' element={<Home/>}></Route>
                            <Route path='/register' element={<Register />} />
                            <Route path='/login/dashboard' element={<DashboardPage />} />
                            
                            <Route path='dashboard/list' element={<ReportListPage />} />
                            <Route path='dashboard/reportsub' element={<ReportSubmissionForm />} />
                            
                            <Route path='/contact-us' element={<ContactUs/>} />
                            
                  </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App




