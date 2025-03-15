import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import React, { useContext } from 'react'
import HomePage from './HomePage/HomePage'
import MxRep from './MxRep/Main'
import TECBooks from './TECBooks/TECBooks'
import Survey from './Survey/Survey'
import TempUpload from './Homepage/TempUpload'
import ProjEval from './Sims/Investments/Simulator'
// import ErrorPage from './Global Components/ErrorPage'
import { Navigate } from 'react-router-dom'
// import { AuthContext } from './Components/AuthContext'
// import ProtectedRoute from './Components/ProtectedRoute'
// import simData from './Global Components/example_sim_data'
// import { SimDataProvider } from './MxRep/SimDataContext'

function App() {
  console.log("app loaded")
  // const { auth } = useContext(AuthContext)

  return (
    <Router>
      <div className="App blue-to-white"> 
        <Routes>
          <Route path="/" element={ <Navigate to="/home" /> } />
          <Route path="/home" element={ <HomePage /> } />
          <Route path="survey" element={<Survey />} />
          <Route path="/template-upload" element={ <TempUpload />} />

          <Route path="/mxrep-dashboard/*" element={ 
              // <SimDataProvider>
                <MxRep />
              // </SimDataProvider>
            } 
          />

          <Route path="/tecbooks/*" element={<TECBooks />} />

          <Route path="/project-evaluation-simulator" element={<ProjEval />} />

          {/* <Route path="/error" element={ <ErrorPage /> } /> */}

        </Routes>
      </div>
    </Router>
  )
}

export default App