import React from 'react'
import { Route, Routes } from 'react-router-dom'

import StuDashboard from './pages/Student/StuDashboard'
import MentorDashboard from './pages/Mentor/MentorDashboard'
import StuDoubtSupport from './components/Student/StuDoubtSupport'
import StuAssignmentView from './components/Student/StuAssignmentView'
import StuProjectsView from './components/Student/StuProjectsView'
import StuQuizzesView from './components/Student/StuQuizzesView'
import StuNotesView from './components/Student/StuNotesView'
import StuCloudIDEView from './components/Student/StuCloudIDEView'
import SchoolAdminPage from './pages/School/SchoolAdminPage'
import ChooseRole from './components/ChooseRole.jsx'


const App = () => {
  return (
    <div>
      <Routes>

        <Route path='/login' element={<ChooseRole/>} />
        <Route path='/student' element={<StuDashboard/>} />
        <Route path='/mentor' element={<MentorDashboard/>} />
        <Route path='/school-admin' element={<SchoolAdminPage/>} />
        <Route path='/student-doubt' element={<StuDoubtSupport/>}/>
        <Route path='/student-assignment' element={<StuAssignmentView/>}/>
        <Route path='/student-projects' element={<StuProjectsView/>}/>
        <Route path='/student-quizzes' element={<StuQuizzesView/>}/>
        <Route path='/student-notes' element={<StuNotesView/>}/>
        <Route path='/student-cloudide' element={<StuCloudIDEView/>}/>

      </Routes>
    </div>
  )
}

export default App
